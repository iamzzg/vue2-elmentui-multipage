<template>
  <div class="attendance-month-statistic-class-search">
    <header class="flex items-center text-white text-22px my-26px">
      <el-image
        :src="require('@/assets/images/left-arrow.png')"
        class="cursor-pointer"
        @click="back"></el-image>
      <div class="ml-20px p-10px rounded-6px bg-cyan flex items-center flex-1">
        <el-image :src="require('@/assets/images/student.png')" class="w-28px"></el-image>
        <p class="ml-20px">班級月度考勤統計</p>
      </div>
    </header>

    <main class="pl-54px">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-position="top">
        <header class="text-333 text-22px font-bold my-26px">搜索條件</header>
        <el-form-item prop="dates">
          <template #label>
            <div class="inline-grid">
              <div class="text-16px text-333 font-bold">選擇時間</div>
              <p class="text-14px text-999 my-4"
                >註：建議選擇時間跨度不超過3個月，數據過多會增加加載時間</p
              >
            </div>
          </template>
          <el-date-picker
            style="width: 644px"
            class="rounded-40px"
            v-model="form.dates"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="slectedClassList">
          <template #label>
            <div class="inline-grid">
              <div class="text-16px text-333 font-bold">選擇班級學生</div>
              <p class="text-14px text-999 my-4"
                >註：建議選擇班級不多於3個，數據過多會增加加載時間</p
              >
            </div>
          </template>
          <el-checkbox-group v-model="form.slectedClassList" size="small">
            <el-checkbox-button v-for="item in classList" :label="item.id" :key="item.id">
              {{ item.name }}
              <el-image
                :src="require('@/assets/images/checked-arrow.png')"
                class="absolute top-0px right-0px checked-arrow"></el-image>
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="attendanceType">
          <template #label>
            <div class="inline-grid">
              <div class="text-16px text-333 font-bold">選擇類型</div>
            </div>
          </template>
          <el-checkbox-group v-model="form.attendanceType" size="small">
            <el-checkbox-button v-for="item in attendanceTypeList" :label="item.id" :key="item.id">
              {{ item.name }}
              <el-image
                :src="require('@/assets/images/checked-arrow.png')"
                class="absolute top-0px right-0px checked-arrow"></el-image>
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            round
            style="color: #000"
            class="w-100px"
            size="small"
            @click="onConfirm">
            确定
          </el-button>
          <el-button
            type="primary"
            plain
            round
            style="color: #000"
            class="w-100px"
            size="small"
            @click="resetForm">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </main>
  </div>
</template>

<script>
  import { getClassInfoList } from '@/api'
  import { attendanceTypeList } from '@/constant'
  import { changeLocationHref, getLocationSearchObject } from '@/utils/location'

  import dayjs from 'dayjs'
  export default {
    name: 'Home',
    components: {},
    data() {
      return {
        form: {
          slectedClassList: [],
          dates: '',
          attendanceType: []
        },
        // rule
        rules: {
          slectedClassList: [{ required: true, message: '請選擇班級', trigger: 'submit' }],
          dates: [{ required: true, message: '請選擇時間', trigger: 'submit' }],
          attendanceType: [{ required: true, message: '請選擇類型', trigger: 'submit' }]
        },
        // checkbox
        classList: [],
        attendanceTypeList: attendanceTypeList
      }
    },
    mounted() {
      this.getClassList()
      this.initSearchForm()
    },
    methods: {
      // 保存上次搜索条件
      initSearchForm() {
        this.routeQuery = getLocationSearchObject()
        if (Object.keys(this.routeQuery).length > 0) {
          this.form.attendanceType = this.routeQuery.attendanceTypes.split(';')
          this.form.dates = [new Date(this.routeQuery.start), new Date(this.routeQuery.end)]
          this.form.slectedClassList = this.routeQuery.classInfoIds.split(';')
        }
      },
      onConfirm() {
        this.$refs.ruleForm.validate(valid => {
          if (!valid) return

          const obj = {
            classInfoIds: this.form.slectedClassList.join(';'),
            start: dayjs(this.form.dates[0]).format('YYYY-MM-DD'),
            end: dayjs(this.form.dates[1]).format('YYYY-MM-DD'),
            attendanceTypes: this.form.attendanceType.join(';')
          }
          changeLocationHref('attendance-month-statistic-class-report.html', obj)
        })
      },
      resetForm() {
        this.$refs.ruleForm.resetFields()
      },
      async getClassList() {
        const { data } = await getClassInfoList()
        this.classList = data.map(item => ({ id: item.id, name: item.class_name }))
      },
      back() {
        changeLocationHref('attendance-report.html')
      }
    }
  }
</script>
<style lang="scss">
  .attendance-month-statistic-class-search {
    padding: 10px;
    height: 100%;
    background-color: #ffffff;

    // 修改checkbox样式
    .el-checkbox {
      &-group {
        display: flex;
        flex-wrap: wrap;
      }
      &-button {
        position: relative;
        display: block;
        overflow: hidden;
        margin-right: 10px;
        margin-bottom: 10px;
        width: 180px;
        height: 60px;
        border: 1px solid #e5e5e5;
        border-radius: 8px;
        &__inner {
          display: flex;
          align-items: center;
          padding: 0;
          padding-left: 10px;
          width: 100%;
          height: 100%;
          font-size: 16px;
          border: none;
          color: #333333 !important;

          .checked-arrow {
            display: none;
          }
        }
        &.is-checked {
          border-color: $cyan;
          .el-checkbox-button__inner {
            background-color: transparent;
            .checked-arrow {
              display: block;
            }
          }
        }
      }
    }
  }
</style>
