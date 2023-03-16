<template>
  <div class="attendance-report">
    <header class="text-333 text-38px mb-16px">考勤报表</header>
    <summary class="text-666 text-26px"> 根據需求選擇報表，查看相應報表 </summary>

    <main class="mt-40px flex justify-between">
      <div class="attendance-card bg-warning" @click="clickStatistic(1)">
        <header class="text-30px text-white">學生月度考勤統計</header>
        <summary class="text-18px text-white mt-10px mb-40px"> 查看班級學生每日考勤記錄 </summary>
        <el-image :src="require('@/assets/images/student.png')"></el-image>
      </div>
      <div class="attendance-card bg-cyan" @click="clickStatistic(2)">
        <header class="text-30px text-white">班級月度考勤統計</header>
        <summary class="text-18px text-white mt-10px mb-40px"> 查看班級每日考勤記錄 </summary>
        <el-image :src="require('@/assets/images/class-month.png')"></el-image>
      </div>
      <div class="attendance-card bg-blue" @click="clickStatistic(3)">
        <header class="text-30px text-white">班級年度出勤率統計</header>
        <summary class="text-18px text-white mt-10px mb-40px"> 查看班級每月出勤率 </summary>
        <el-image :src="require('@/assets/images/class-year.png')"></el-image>
      </div>
    </main>
  </div>
</template>

<script>
  import { getStudentMonitorList } from '@/api/index'
  export default {
    name: 'Home',
    components: {},
    data() {
      return {
        dataList: []
      }
    },
    mounted() {
      getStudentMonitorList()
    },
    methods: {
      clickStatistic(index) {
        switch (index) {
          case 1:
            window.location.href =
              process.env.VUE_APP_PUBLIC_PATH + 'attendance-month-statistic-search.html'
            break
          case 2:
            window.location.href =
              process.env.VUE_APP_PUBLIC_PATH + 'attendance-month-statistic-class-search.html'
            break
          case 3:
            window.location.href =
              process.env.VUE_APP_PUBLIC_PATH + 'attendance-year-statistic-search.html'
            break
          default:
            break
        }
      }
    }
  }
</script>

<style lang="scss">
  .attendance-report {
    padding: 30px;
    height: 100%;
    background-color: #ffffff;
    .attendance-card {
      margin-right: 30px;
      padding: 20px;
      width: 30%;
      min-width: 310px;
      border-radius: 8px;
      border-radius: 5px;
      box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
  }
</style>
