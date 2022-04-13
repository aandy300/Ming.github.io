// 還沒使用
<template>
  <swiper :navigation="true" :modules="modules" class="mySwiper">
    <swiper-slide>Slide 1<i class="bi bi-123"></i></swiper-slide>
    <swiper-slide>Slide 2
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Windows_Settings_app_icon.png/1024px-Windows_Settings_app_icon.png
        " alt="" srcset="">
    </swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
  </swiper>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";

// import "./style.css";

// import required modules
import { Navigation } from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Navigation],
    };
  },
};
</script>

<style lang="sass">
    .swiper-button-prev
        color: red
</style>