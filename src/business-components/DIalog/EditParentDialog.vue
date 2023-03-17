<template>
  <el-dialog
    title="填寫家長信息"
    :visible.sync="dialogVisible"
    width="50%"
    top="10vh"
    v-bind="$attrs"
    v-on="$listeners"
    center
    append-to-body
    @open="handleOpen"
    @close="handleClose">
    <main class="flex">
      <div class="flex-1">
        <el-form :model="form" :rules="rules" ref="formRef" label-position="left">
          <el-form-item label="家長姓名" prop="parentName">
            <el-input v-model="form.parentName"></el-input>
          </el-form-item>
          <el-form-item label="家庭關係" prop="releationShip">
            <el-select class="w-full" v-model="form.releationShip" placeholder="">
              <el-option
                v-for="item in relationShipList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="聯繫電話" prop="telephone">
            <el-input v-model="form.telephone"></el-input>
          </el-form-item>
          <el-form-item label="聯繫郵箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="上傳照片" prop="headImg">
            <!-- <el-input v-model="form.headImg"></el-input> -->
            <div
              class="w-140px h-140px flex flex-col justify-center items-center border border-999 rounded-2xl mr-10px">
              <cn6-image :src="avatar" class="w-80px h-80px"></cn6-image>
              <upload @onFile="onReadFile">
                <el-button size="small" round type="primary" class="mt-10px">上传图片</el-button>
              </upload>
            </div>
          </el-form-item>
          <el-form-item label="設為主家長片" prop="isMain">
            <el-switch v-model="form.isMain"></el-switch>
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
  import { inSchoolStatusList, relationShipList } from '@/constant'
  import { updateParentInfo, imgUpload } from '@/api'
  export default {
    name: '',
    components: {},
    data() {
      const rules = Object.freeze({
        status: [],
        statusTime: []
      })
      return {
        avatar: '',
        form: {
          parentName: '',
          releationShip: '',
          telephone: '',
          email: '',
          // headImg: '',
          avatarFile: '',
          isMain: false
        },
        rules,
        inSchoolStatusList,
        relationShipList
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
        this.form = {
          releationShip: this.info.family_relations,
          parentName: this.info.name,
          telephone: this.info.tel,
          email: this.info.email,
          headImg: this.info.head_img,
          isMain: false
        }
      },
      handleClose() {
        this.form = {
          parentName: '',
          releationShip: '',
          telephone: '',
          email: '',
          headImg: '',
          isMain: false
        }
        this.avatar = ''
      },
      async clickSave() {
        // const data = {
        //   id: this.info.uid,
        //   name: this.form.parentName,
        //   family_relations: this.form.releationShip,
        //   tel: this.form.telephone,
        //   email: this.form.email,
        //   studentnum: this.info.student_num,
        //   is_main: this.form.isMain
        // }
        const formData1 = new FormData()
        formData1.append('id', this.info.id)
        formData1.append('name', this.form.parentName)
        formData1.append('family_relations', this.form.releationShip)
        formData1.append('tel', this.form.telephone)
        formData1.append('studentnum', this.info.student_num)
        formData1.append('is_main', this.form.isMain ? 1 : 0)

        await updateParentInfo(formData1).catch(console.log)

        const formData2 = new FormData()
        formData2.append('file', this.avatarFile)
        formData2.append('id', this.form.cardNum)
        formData2.append('flag', '1-2')

        await imgUpload(formData2)

        this.$message('修改成功')
        this.dialogVisible = false
        this.$emit('update')
      },
      onReadFile(imgFile) {
        this.form.avatarFile = imgFile
        const reader = new FileReader()
        reader.readAsDataURL(imgFile)

        reader.addEventListener('load', () => {
          this.avatar = reader.result
        })
      }
    },
    mounted() {}
  }
</script>
<style scoped></style>
