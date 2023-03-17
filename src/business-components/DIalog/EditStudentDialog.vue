<template>
  <el-dialog
    title="編輯學生信息"
    :visible.sync="dialogVisible"
    width="70%"
    v-bind="$attrs"
    v-on="$listeners"
    center
    append-to-body
    @open="handleOpen"
    @close="handleClose">
    <main class="flex">
      <div
        class="w-250px h-300px flex flex-col justify-center items-center border border-999 rounded-2xl mr-10px">
        <cn6-image :src="avatar" class="w-150px h-150px"></cn6-image>
        <upload @onFile="onReadFile">
          <el-button round type="primary" class="mt-10px">上传图片</el-button>
        </upload>
      </div>
      <div class="min-w-600px flex-1">
        <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="姓名" prop="nickname">
                <el-input v-model="form.nickname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="學號" prop="cardNum">
                <el-input v-model="form.cardNum"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="性別" prop="gender">
                <el-select v-model="form.gender" class="w-full">
                  <el-option
                    v-for="item in genderList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="生日" prop="birthday">
                <el-date-picker
                  v-model="form.birthday"
                  type="date"
                  class="!w-full"
                  placeholder="请选择生日"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="入學時間" prop="inSchoolTime">
                <el-date-picker
                  v-model="form.inSchoolTime"
                  type="date"
                  class="!w-full"
                  placeholder="请选择入学时间"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="班級" prop="class">
                <el-select v-model="form.class" class="w-full">
                  <el-option
                    v-for="item in classList"
                    :key="item.id"
                    :label="item.classname"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </main>
    <span slot="footer" class="dialog-footer">
      <el-button round type="primary" @click="clickSave">确 定</el-button>
      <el-button round @click="dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import { genderList } from '@/constant'
  import { getClassInfoList, updateStudentInfo, imgUpload } from '@/api'
  import { Form } from 'element-ui'
  export default {
    name: '',
    components: {},
    data() {
      const rules = Object.freeze({
        nickname: [],
        cardNum: [],
        gender: [],
        birthday: [],
        inSchoolTime: [],
        class: []
      })
      return {
        avatar: '',
        avatarFile: '',
        form: {
          nickname: '',
          cardNum: '',
          gender: '',
          birthday: '',
          inSchoolTime: '',
          class: ''
        },
        rules,
        classList: [],
        genderList
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
      async getClassList() {
        const { data } = await getClassInfoList()
        this.classList = data.map(item => ({
          id: item.id,
          classname: item.class_name,
          value: item.id
        }))
      },
      handleOpen() {
        this.form = {
          nickname: this.info.name,
          cardNum: this.info.student_num,
          gender: this.info.sex,
          birthday: this.info.birthday,
          inSchoolTime: this.info.join_date,
          class: this.info.classinfo.id
        }
      },
      handleClose() {
        this.form = {
          nickname: '',
          cardNum: '',
          gender: '',
          birthday: '',
          inSchoolTime: '',
          class: ''
        }
      },
      async clickSave() {
        const data = {
          uid: this.info.uid,
          name: this.form.nickname,
          student_num: this.form.cardNum,
          sex: this.form.gender,
          birthday: this.form.birthday,
          join_date: this.form.inSchoolTime
        }

        await updateStudentInfo(data).catch(console.log)

        const formData = new FormData()
        formData.append('file', this.avatarFile)
        formData.append('id', this.form.cardNum)
        formData.append('flag', '1-1')

        await imgUpload(formData)

        this.$message('修改成功')
        this.dialogVisible = false
        this.$emit('update')
      },
      onReadFile(imgFile) {
        this.avatarFile = imgFile
        const reader = new FileReader()
        reader.readAsDataURL(imgFile)

        reader.addEventListener('load', () => {
          this.avatar = reader.result
        })
      }
    },
    mounted() {
      this.getClassList()
    }
  }
</script>
<style scoped></style>
