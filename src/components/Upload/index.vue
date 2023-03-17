<template>
  <div class="upload-component" @click="clickUpload">
    <input
      :accept="accept"
      ref="inputRef"
      type="file"
      v-show="false"
      class="w-0 h-0"
      @change="onFileInputChange" />
    <slot></slot>
  </div>
</template>
<script>
  //   import { imgUpload } from '@/api'
  export default {
    name: 'Upload',
    components: {},
    data() {
      return {}
    },
    props: {
      accept: {
        type: String,
        default: 'image/*'
      }
    },
    computed: {
      uploadUrl() {
        return process.env.VUE_APP_UPLOAD_URL + process.env.VUE_APP_UPLOAD_PREFIX
      }
    },
    methods: {
      onFileInputChange(e) {
        const files = e.target.files

        this.$emit('onFile', files[0])
      },
      clickUpload() {
        this.$refs.inputRef.click()
      }
    },
    mounted() {}
  }
</script>
<style lang="scss" scoped>
  .upload-component {
  }
</style>
