// 這個是首頁?
<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
  {{ name }}
  <button type="button" class="btn btn-primary">Primary</button>
</template>

<style lang="scss">
@import "bootstrap";
</style>

<script>
export default {
  data() {
    return {
      name: process.env.VUE_APP_NAME
    }
  }
}
</script>
