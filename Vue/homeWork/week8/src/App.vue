<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="about">About</router-link> |
    <router-link to="products">products</router-link>
  </nav> -->
  <NavBar></NavBar>
  <router-view/>
  <Footer></Footer>

<!-- <button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" class="btn btn-dark">Dark</button>
<button type="button" class="btn btn-link">Link</button>
<i class="bi bi-cart"></i> -->

</template>

<script>
import NavBar from '@/components/NavbarView.vue'
import Footer from '@/components/FooterView.vue'
export default {
    components: {
    NavBar,
    Footer
  }
}
</script>

<style lang="scss">
@import "./assets/stylesheets/all" // 已經是 lang="scss" 了 所以不用 .scss
</style>
