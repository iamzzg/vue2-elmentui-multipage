<template>
  <el-dialog
    title="修改狀態"
    :visible.sync="dialogVisible"
    width="30%"
    v-bind="$attrs"
    v-on="$listeners"
    center
    append-to-body
    @open="handleOpen"
    @close="handleClose">
    <main class="flex">
      <div class="flex-1">
        <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
          <el-form-item label="狀態" prop="status">
            <el-select v-model="form.status" class="w-full">
              <el-option
                v-for="item in inSchoolStatusList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="狀態時間" prop="statusTime">
            <el-time-picker
              v-model="form.statusTime"
              class="!w-full"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }">
            </el-time-picker>
          </el-form-item>
        </el-form>
      </div>
    </main>
    <span slot="footer" class="dialog-footer">
      <el-button round type="primary" @click="clickSave"> 保 存</el-button>
      <el-button round @click="dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import { inSchoolStatusList } from '@/constant'
  import { changeInschool } from '@/api'
  import dayjs from 'dayjs'
  export default {
    name: '',
    components: {},
    data() {
      const rules = Object.freeze({
        status: [],
        statusTime: []
      })
      return {
        form: {
          status: '',
          statusTime: new Date()
        },
        rules,
        inSchoolStatusList
      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      info: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      dialogVisible: {
        get() {
          return this.visible
        },
        set(v) {
          this.$emit('update:visible', v)
        }
      }
    },
    methods: {
      handleOpen() {
        this.form.status = this.info.status
      },
      handleClose() {
        this.form.status = ''
      },
      async clickSave() {
        const data = {
          stuid: this.info.uid,
          in_school: this.form.status,
          changetime: dayjs(this.form.statusTime).format('HH:mm:ss')
        }
        const { massage, status } = await changeInschool(data)

        // this.$message(massage)
        if (status == 1) {
          this.dialogVisible = false
          this.$emit('update')
        }
      }
    },
    mounted() {}
  }
</script>
<style scoped></style>
