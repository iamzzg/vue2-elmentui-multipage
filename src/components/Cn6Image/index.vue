<template>
  <el-image v-bind="$attrs" :src="realSrc">
    <template #error>
      <div class="w-full h-full flex-center">
        <i class="el-icon-picture-outline text-20px"></i>
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
        return this.src ? this.src : '/app/parent/img/render-' + this.userId
      }
    }
  }
</script>
<style scoped></style>
