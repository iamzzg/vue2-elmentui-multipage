<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link v-for="page in pageNames" :key="page" :to="`/${page}`">/{{ page }}</router-link>
    </div>

    <!-- <div id="nav">
      <a
        href="javascript:void(0);"
        v-for="page in pageNames"
        :key="page"
        @click="currentPage = page"
        >{{ page }}</a
      >
    </div>
    <iframe
      v-if="currentPage"
      :src="`./${currentPage}.html?foo=bar`"
      frameborder="0"
      class="w-screen h-screen"></iframe> -->

    <!-- <router-view /> -->
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        pageNames: pageNames,
        currentPage: ''
      }
    },
    created() {},
    methods: {}
  }
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
    a {
      display: block;
      margin-bottom: 10px;
      font-weight: bold;
      color: #2c3e50;
      font-size: 20px;

      &.router-link-exact-active {
        color: #42b983;
      }

      margin-left: 20px !important;
    }
  }
</style>
