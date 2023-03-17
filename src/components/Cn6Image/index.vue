<template>
  <el-image v-bind="$attrs" :src="realSrc">
    <template #error>
      <div class="w-full h-full flex justify-center items-center">
        <el-image :src="require('@/assets/images/u-avatar.png')"></el-image>
      </div>
    </template>
  </el-image>
</template>
<script>
  export default {
    name: 'Cn6Image',
    props: {
      src: {
        type: String,
        default: ''
      },
      prefixUrl: {
        type: String,
        default: ''
      },
      userId: {
        type: String,
        default: ''
      }
    },
    computed: {
      realSrc() {
        return process.env.VUE_APP_UPLOAD_URL + this.src
          ? this.src
          : '/app/parent/img/render-' + this.userId
      }
    }
  }
</script>
<style scoped></style>
