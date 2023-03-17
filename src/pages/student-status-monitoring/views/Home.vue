<template>
  <div class="student-status-monitoring">
    <header class="flex justify-between items-center mb-45px">
      <span class="text-333 text-18px font-bold">學生狀態監控</span>
      <div class="flex items-center p-20px bg-white">
        <div class="text-333 text-45px mr-20px font-bold">
          {{ currentTime }}
        </div>
        <div class="text-333 text-21px">
          <div>{{ currentDateText }}</div>
          <div>{{ currentDay }}</div>
        </div>
      </div>
    </header>

    <el-collapse v-model="activeNames" @change="handleChange" v-if="dataList.length > 0">
      <el-collapse-item
        v-for="(classItem, index) in dataList"
        :name="classItem.class_name"
        :key="classItem.class_id">
        <template #title>
          <div class="class-header" :class="'bg-' + bgColors[index % dataList.length]">
            <div>
              <div class="text-30px text-white font-bold">
                {{ classItem.class_name }}
              </div>
              <div class="flex items-center text-white">
                <span class="text-14px">班主任：</span>
                <cn6-image
                  class="mx-16px round w-30px h-30px"
                  :user-id="classItem.class_id"></cn6-image>
                <span class="text-14px">
                  {{ classItem.main_teacher_name }}
                </span>
              </div>
            </div>
            <!-- 出席率 -->
            <div class="flex justify-center items-center">
              <div class="w-80px h-80px" ref="attendance"></div>
              <div class="ml-10px">
                <div class="flex items-center">
                  <span class="w-10px h-10px round bg-white"></span>
                  <span class="mx-14px text-ccc">已到</span>
                  <span class="text-white">{{ classItem.arrived }}</span>
                </div>
                <div class="flex items-center">
                  <span class="w-10px h-10px round bg-ccc"></span>
                  <span class="mx-14px text-ccc">未到</span>
                  <span class="text-white">{{ classItem.notarrived }}</span>
                </div>
              </div>
            </div>
            <!-- 人数统计 -->
            <div class="flex justify-center items-center text-white">
              <el-divider direction="vertical"></el-divider>
              <div class="px-20px text-center">
                <div class="text-20px font-bold h-20px mb-8px">
                  {{ classItem.leave }}
                </div>
                <div class="text-14px">請假</div>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div class="px-20px text-center">
                <div class="text-20px font-bold h-20px mb-8px">
                  {{ classItem.out }}
                </div>
                <div class="text-14px">離園</div>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div class="px-20px text-center">
                <div class="text-20px font-bold h-20px mb-8px">
                  {{ classItem.in }}
                </div>
                <div class="text-14px">入園</div>
              </div>
            </div>

            <!-- 箭头 -->
            <el-image
              :src="require('@/assets/images/right-arrow.png')"
              class="right-arrow"></el-image>
          </div>
        </template>
        <main class="flex flex-wrap">
          <div
            class="student-info p-14px bg-white cursor-pointer"
            v-for="(student, index) in classItem.userinfoList"
            :key="index"
            @click="clickStudentCard(student.uid)">
            <div class="flex">
              <cn6-image class="round w-65px h-65px" :user-id="student.uid"></cn6-image>
              <div>
                <div class="mt-6px text-333 text-16px">
                  {{ student.name }}
                </div>
                <div class="mt-6px text-666 text-14px">
                  {{ student.student_num }}
                </div>
              </div>
            </div>
            <div class="my-4px">
              <div
                class="w-52px h-21px flex justify-center items-center rounded-21px text-white"
                :class="getStuCardStatus(student.card_status).bgClass">
                {{ getStuCardStatus(student.card_status).statusText }}
              </div>
            </div>
            <div class="text-333 text-14px">{{ student.card }}</div>
          </div>
        </main>
      </el-collapse-item>
    </el-collapse>

    <student-details-drawer
      :visible.sync="studentDrawer"
      :student-id="selectedStudentId"
      @updateData="fetchClassStudentList"></student-details-drawer>
  </div>
</template>

<script>
  import * as echarts from 'echarts/core'
  import { TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
  import { PieChart } from 'echarts/charts'
  import { LabelLayout } from 'echarts/features'
  import { CanvasRenderer } from 'echarts/renderers'
  import StudentDetailsDrawer from '@/business-components/StudentDetailsDrawer/StudentDetailsDrawer.vue'

  import dayjs from 'dayjs'
  import { getStudentMonitorList } from '@/api/index'

  echarts.use([
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout,
    TitleComponent
  ])

  export default {
    name: 'Home',
    components: { StudentDetailsDrawer },
    data() {
      return {
        activeNames: [''],
        attendance: null,
        currentDate: dayjs(),
        // drawer
        studentDrawer: false,
        selectedStudentId: '',
        // data
        dataList: [],
        bgColors: ['purple', 'blue', 'cyan', 'orange']
      }
    },
    computed: {
      currentTime() {
        return this.currentDate.format('HH:mm')
      },
      currentDateText() {
        return this.currentDate.format('YYYY-MM-DD')
      },
      currentDay() {
        const weekMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        return weekMap[this.currentDate.day()]
      }
    },
    mounted() {
      this.changeDate()
      this.fetchClassStudentList()
    },
    methods: {
      handleChange(val) {},
      initChart(dom, index) {
        echarts.init(dom).setOption(this.getOptions(index))
      },
      // 获取 echart 图配置
      getOptions(index) {
        const { arrived = 0, notarrived = 0 } = this.dataList[index]
        return {
          color: ['#fff', '#ccc'],
          tooltip: {
            trigger: 'item'
          },
          title: {
            text: `${Math.floor((arrived / (arrived + notarrived)) * 100)}%`,
            left: 'center',
            top: '30%',
            textStyle: {
              color: '#fff'
            },
            itemGap: 2,
            subtext: '出席率',
            subtextStyle: {
              color: '#fff'
            }
          },
          legend: {
            show: false
          },
          series: [
            {
              name: '出席率',
              type: 'pie',
              radius: ['80%', '100%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: 40,
                  fontWeight: 'bold'
                },
                scale: false
              },
              labelLine: {
                show: false
              },
              data: [
                { value: arrived, name: '已到' },
                { value: notarrived, name: '未到' }
              ]
            }
          ]
        }
      },
      changeDate() {
        setInterval(() => {
          this.currentDate = dayjs()
        }, 1000)
      },
      fetchClassStudentList() {
        getStudentMonitorList().then(data => {
          this.dataList = data.data
          this.activeNames = [this.dataList[0]?.class_name]
          this.$nextTick(() => {
            this.$refs.attendance.forEach((dom, index) => {
              this.initChart(dom, index)
            })
          })
        })
      },
      clickStudentCard(studentId) {
        this.selectedStudentId = studentId
        this.studentDrawer = true
      }
    }
  }
</script>
<style lang="scss">
  .student-status-monitoring {
    padding: 45px;
    height: 100%;
    background-color: #f7f7f7;
    .el-collapse-item {
      margin-bottom: 20px;
      &__header {
        height: 124px;
        .class-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          width: 100%;
          height: 124px;
          border-radius: 10px;
          .right-arrow {
            width: 40px;
            height: 40px;
            transform-origin: 50% 50%;
            transform: rotate(-90deg);
            transition: all 0.2s linear;
          }
        }
        &.is-active {
          .right-arrow {
            transform: rotate(0);
          }
        }
      }
      &__arrow {
        display: none !important;
      }
      &__content {
        padding: 10px 0;
        background-color: #f7f7f7;
        .student-info {
          width: 23%;
          margin-bottom: 20px;
          &:not(:nth-child(4n)) {
            margin-right: auto;
          }
        }
      }
    }
  }
</style>
