<template>
  <div class="attendance-month-statistic-class-report">
    <header class="flex items-center text-white text-22px my-26px">
      <el-image
        :src="require('@/assets/images/left-arrow.png')"
        @click="back"
        class="cursor-pointer"></el-image>
      <div class="ml-20px p-10px rounded-6px bg-cyan flex items-center flex-1">
        <el-image :src="require('@/assets/images/class-month.png')" class="w-28px"></el-image>
        <p class="ml-20px">班級月度考勤統計</p>

        <div class="text-18px ml-auto">{{ `${routeQuery.start}~${routeQuery.end}` }}</div>
        <el-divider direction="vertical" class="mx-30px"></el-divider>
        <span class="text-18px mr-20px">學生：{{ tableData.length }}</span>
        <el-button type="info" round class="ml-50px" style="color: #333; background-color: #fff">
          導出Excel
        </el-button>
      </div>
    </header>

    <main>
      <el-table
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
          <template #default="{ row }">
            <div v-html="row[col.prop]" />
          </template>
        </el-table-column>
      </el-table>
    </main>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  import qs from 'qs'
  import { getClassMonthReport } from '@/api/index'
  import { changeLocationHref, getLocationSearchObject } from '@/utils/location'

  export default {
    name: 'Home',
    data() {
      return {
        columns: [{ label: '', prop: '' }],
        tableData: [{ student: '' }],

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
    },
    methods: {
      // 請求數據
      async getReportData() {
        const { data } = await getClassMonthReport(this.routeQuery).catch(console.log)

        this.columns = this.generateColumns(data)
        this.tableData = this.generateTableData(data)
      },
      generateColumns(data = [[]]) {
        const startDate = dayjs(this.routeQuery.start)

        return [
          { label: '班級', prop: 'class', fixed: true },
          { label: '统计', prop: 'statistic', fixed: true }
        ].concat(
          data[0].slice(2).map((_, index) => {
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
            class: record[0],
            statistic: record[1]
          }
          record.slice(2).map((_, index) => {
            obj[startDate.add(index, 'day').format('YYYY-MM-DD')] = record[index + 2]
          })

          return obj
        })
      },
      hanldeRowClick(row, column, event) {
        // this.selectedStudentId = row.key
        // this.studentDrawer = true
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
        changeLocationHref('attendance-month-statistic-class-search.html', this.routeQuery)
      }
    },
    watch: {
      $route: {
        handler(route) {
          this.routeQuery = getLocationSearchObject()
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>
<style lang="scss">
  .attendance-month-statistic-class-report {
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
