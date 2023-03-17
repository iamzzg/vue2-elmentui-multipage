<template>
  <div class="attendance-month-statistic-report">
    <header class="flex items-center text-white text-22px my-26px">
      <el-image
        :src="require('@/assets/images/left-arrow.png')"
        @click="back"
        class="cursor-pointer"></el-image>
      <div class="ml-20px p-10px rounded-6px bg-warning flex items-center flex-1">
        <el-image :src="require('@/assets/images/student.png')" class="w-28px"></el-image>
        <p class="ml-20px">學生月度考勤統計</p>

        <div class="text-18px ml-auto">{{ `${routeQuery.start}~${routeQuery.end}` }}</div>
        <el-divider direction="vertical" class="mx-30px"></el-divider>
        <span class="text-18px mr-20px">學生：{{ tableData.length }}</span>
        <el-button
          type="info"
          round
          class="ml-50px"
          style="color: #333; background-color: #fff"
          @click="exportExcel"
          >導出Excel</el-button
        >
      </div>
    </header>

    <main>
      <el-table
        ref="tableRef"
        :data="tableData"
        style="width: 100%"
        height="100%"
        :cell-style="getTdStyle"
        stripe
        border
        @row-click="hanldeRowClick">
        <el-table-column
          v-for="col in columns"
          :prop="col.prop"
          :label="col.label"
          :fixed="col.fixed"
          :key="col.label"
          width="180"
          align="left">
          <template #default="{ row }" v-if="col.prop == 'student'">
            <div>
              <div
                class="text-center font-bold nickname"
                :class="selectedStudentId == row.key ? 'focus' : ''">
                <div v-html="row.student"></div>
              </div>
            </div>
          </template>
          <template #default="{ row }" v-else>
            <div v-html="row[col.prop]" />
          </template>
        </el-table-column>
      </el-table>

      <StudentDetailsDrawer
        :student-id="selectedStudentId"
        :visible.sync="studentDrawer"
        @close="selectedStudentId = ''"></StudentDetailsDrawer>
    </main>
  </div>
</template>

<script>
  import StudentDetailsDrawer from '@/business-components/StudentDetailsDrawer/StudentDetailsDrawer.vue'
  import dayjs from 'dayjs'
  import qs from 'qs'
  import { getStudentMonthReport, exportStudentMonthReport } from '@/api/index'
  import { changeLocationHref, getLocationSearchObject } from '@/utils/location'
  import { useDownLoad } from '@/utils'

  export default {
    name: 'Home',
    components: { StudentDetailsDrawer },
    data() {
      return {
        columns: [{ label: '', prop: '' }],
        tableData: [{ student: '' }],
        // drawer
        studentDrawer: false,
        selectedStudentId: '',
        // search參數
        routeQuery: {
          classInfoIds: '', //'402880d17f0c0c13017f24bb0912000a'
          start: '', // 2023-03-01
          end: '', // 2023-03-01
          attendanceTypes: '' //'ontime;belate;early;leave;absent;'
        }
      }
    },
    mounted() {
      this.getReportData()
      this.routeQuery = getLocationSearchObject()
    },
    methods: {
      // 請求數據
      async getReportData() {
        const { data } = await getStudentMonthReport(this.routeQuery).catch(console.log)

        this.columns = this.generateColumns(data)
        this.tableData = this.generateTableData(data)
      },
      generateColumns(data = [[]]) {
        const startDate = dayjs(this.routeQuery.start)
        return [
          { label: '学生', prop: 'student', fixed: true },
          { label: '班级', prop: 'class', fixed: true },
          { label: '统计', prop: 'statistic', fixed: true }
        ].concat(
          data[0].slice(4).map((_, index) => {
            return {
              label: startDate.add(index, 'day').format('M月D日'),
              prop: startDate.add(index, 'day').format('YYYY-MM-DD')
            }
          })
        )
      },
      generateTableData(data = [[]]) {
        const startDate = dayjs(this.routeQuery.start)

        return data.map(record => {
          const obj = {
            key: record[0],
            student: record[1],
            class: record[2],
            statistic: record[3]
          }
          record.slice(4).map((_, index) => {
            obj[startDate.add(index, 'day').format('YYYY-MM-DD')] = record[index + 4]
          })

          return obj
        })
      },
      hanldeRowClick(row, column, event) {
        this.selectedStudentId = row.key
        this.studentDrawer = true
      },
      // 获取背景色
      getTdStyle({ row, column }) {
        const reg = /background:([^;]+);/
        const res = reg.exec(row[column.property])
        if (res) {
          const color = res[1]
          return { background: color.trim() }
        }
        return {}
      },
      back() {
        changeLocationHref('attendance-month-statistic-search.html', this.routeQuery)
      },
      async exportExcel() {
        const res = await exportStudentMonthReport(this.routeQuery)
        useDownLoad(res)
      }
    },
    watch: {
      $route: {
        handler(route) {
          this.routeQuery = qs.parse(window.location.search.slice(1))
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>
<style lang="scss">
  .attendance-month-statistic-report {
    display: flex;
    flex-direction: column;
    padding: 10px;
    height: calc(100% - 15px * 2);
    background-color: #ffffff;
    main {
      height: calc(100vh - 112px - 25px);
      .student-operation {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
        margin-bottom: 20px;
        width: 110px;
        height: 110px;
        border: 1px solid #e5e5e5;
        border-radius: 10px;
        color: #999999;
        transition: all 0.2s linear;
        flex-direction: column;
        cursor: pointer;
        &:nth-child(3n) {
          margin-right: 0;
        }
        &:hover {
          border-color: $gold;
          color: $gold;
          img {
            filter: sepia(1) saturate(6) brightness(1.2) !important;
          }
        }
      }

      // element table hover color
      .el-table__row {
        &.hover-row {
          .nickname {
            color: $gold;
          }
        }
        .nickname.focus {
          color: $gold;
        }
      }
    }
  }
</style>
