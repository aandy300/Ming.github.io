<template>
    <NavBar/>
    <RouterView/>
    <Footer/>
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

<style lang="sass">
  @import "./assets/stylesheets/all" // 已經是 lang="scss" 了 所以不用 .scss
  .bk
    // 主要顏色 深>淺 #7F5539 #9C6644 #B08968 #E6CCB2 #EDE0D4
    // background-color: #FFF6EE
</style>
