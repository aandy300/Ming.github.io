<template>
     <div class="bg-white sticky-top">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-expand-lg navbar-light bg-white">
          <!-- 中央名稱 -->
          <router-link class="navbar-brand position-absolute" style="left: 50%; transform: translate(-50%, -50%); top: 50%;" to="/">日玥書坊</router-link>
          <!-- RWD icon -->
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            <!-- <i class="bi bi-cart"></i> -->
          </button>
          <!-- 連結 -->
          <div class="collapse navbar-collapse bg-white custom-header-md-open" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link" to="/">首頁</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/about">品牌特色</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/products">產品列表</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/myorders">我的訂單</router-link>
              </li>
            </ul>
          </div>
          <!-- 右邊icon -->
          <div class="d-flex">
              <router-link class="nav-link disabled" to="products">
                <i class="bi bi-heart-fill btn btn-sm fs-6"></i>
              </router-link>
              <router-link class="nav-link" to="/cart">
                <i class="bi bi-cart position-relative btn btn-sm px-1 fs-6">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{{ cartData.carts.length }}</span>
                </i>
              </router-link>
            <!-- <a href="#"><i class="fas fa-heart me-5"></i></a>
            <a href="./cart-2.html"><i class="fas fa-shopping-cart"></i></a> -->
          </div>
        </nav>
      </div>
    </div>
    <!-- 商品頁面的 NAV BAR 正常 參考用? -->
      <!-- <nav class="navbar navbar-expand-lg navbar-light px-0">
        <a class="navbar-brand" href="./index.html">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-item nav-link me-4 active" href="./index.html">Home <span class="sr-only">(current)</span></a>
            <a class="nav-item nav-link me-4" href="./product.html">Product</a>
            <a class="nav-item nav-link me-4" href="./detail.html">Detail</a>
            <a class="nav-item nav-link" href="./cart.html"><i class="fas fa-shopping-cart"></i></a>
          </div>
        </div>
      </nav> -->
    <!-- 商品頁面的 NAV BAR 正常 參考用? END -->
</template>

<script>

import emitter from '@/libs/emitter'

export default {
  data() {
        return {
            cartData: {
                carts: []
            }
        }
  },
  methods: {
    getCart() {
      this.$http.get(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/cart`)
        .then((res) => {
          this.cartData = res.data.data
          console.log('getCart()', res)
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted() {
    this.getCart()
    emitter.on('get-cart', () => {
      this.getCart()
    })
  }
}
</script>
