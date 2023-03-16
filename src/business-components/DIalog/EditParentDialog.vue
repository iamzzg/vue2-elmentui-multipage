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
            <el-input v-model="form.releationShip"></el-input>
          </el-form-item>
          <el-form-item label="聯繫電話" prop="telephone">
            <el-input v-model="form.telephone"></el-input>
          </el-form-item>
          <el-form-item label="聯繫郵箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="上傳照片" prop="headImg">
            <el-input v-model="form.headImg"></el-input>
          </el-form-item>
          <el-form-item label="設為主家長片" prop="isMain">
            <el-switch v-model="form.isMain"></el-switch>
          </el-form-item>
        </el-form>
      </div>
    </main>
    <span slot="footer" class="dialog-footer">
      <el-button round type="primary" @click="dialogVisible = false"> 保 存</el-button>
      <el-button round @click="dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import { inSchoolStatusList } from '@/constant'
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
          parentName: '',
          releationShip: '',
          telephone: '',
          email: '',
          headImg: '',
          isMain: false
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
      }
    },
    mounted() {}
  }
</script>
<style scoped></style>
