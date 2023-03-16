<template>
  <div class="attendance-year-statistic-search">
    <header class="flex items-center text-white text-22px my-26px">
      <el-image
        :src="require('@/assets/images/left-arrow.png')"
        class="cursor-pointer"
        @click="back"></el-image>
      <div class="ml-20px p-10px rounded-6px bg-blue flex items-center flex-1">
        <el-image :src="require('@/assets/images/student.png')" class="w-28px"></el-image>
        <p class="ml-20px">班級年度出勤率統計</p>
      </div>
    </header>

    <main class="pl-54px">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-position="top">
        <header class="text-333 text-22px font-bold my-26px">搜索條件</header>
        <el-form-item prop="year">
          <template #label>
            <div class="inline-grid">
              <div class="text-16px text-333 font-bold">選擇年份</div>
            </div>
          </template>
          <el-date-picker
            type="year"
            style="width: 320px"
            class="rounded-40px"
            v-model="form.year"
            start-placeholder="开始日期">
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
  import qs from 'qs'
  import dayjs from 'dayjs'
  export default {
    name: 'Home',
    components: {},
    data() {
      return {
        form: {
          slectedClassList: [],
          year: ''
        },
        // rule
        rules: {
          slectedClassList: [{ required: true, message: '請選擇班級', trigger: 'submit' }],
          year: [{ required: true, message: '請選擇年份', trigger: 'submit' }]
        },
        // checkbox
        classList: []
      }
    },
    mounted() {
      this.getClassList()
    },
    methods: {
      onConfirm() {
        this.$refs.ruleForm.validate(valid => {
          if (!valid) return

          const obj = {
            classInfoIds: this.form.slectedClassList.join(';'),
            year: dayjs(this.form.year).format('YYYY')
          }
          window.location.href =
            process.env.VUE_APP_PUBLIC_PATH +
            '/attendance-year-statistic-report.html?' +
            qs.stringify(obj)
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
        window.location.href = process.env.VUE_APP_PUBLIC_PATH + 'attendance-report.html'
      }
    }
  }
</script>
<style lang="scss">
  .attendance-year-statistic-search {
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
