<template>
    <div class="container">
      <div class="row align-items-center">
        <!-- 中斷點後面的數字代表甚麼?? -->
        <div class="col-12 col-sm-11 col-md-6">
          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <!-- <div class="carousel-item active">
                <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" class="d-block w-100" alt="...">
              </div> -->
            <!-- 如果用 `url(${product.imageUrl})` 會出現抓不到結構 ? or 先訂好結構解決 -->
            <!-- <div style="height: 550px; width: 400px; background-size: cover; background-position:center center" class="card border-0 mb-4 position-relative"> -->
            <div style="height: 550px; background-size: cover; background-position:center center" class="card border-0 mb-4 position-relative">
            <div :style="{backgroundImage: `url(${product.imageUrl})`}"
            style="height: 550px; background-size: cover; background-position:center center">
            </div>

            </div>
            <!-- 圖片調整 要再寫 CSS 先用上面的 -->
            <!-- <dir style="height:200px; width:200px;">
              <img :src="product.imageUrl" alt="">
            </dir> -->
              <!-- 原本多圖 左右看 改用 swiper? -->
              <!-- <div class="carousel-item">
                <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" class="d-block w-100" alt="...">
              </div> -->
            </div>
            <!-- 左右按鈕 -->
            <!-- <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a> -->
          </div>
        </div>
        <!-- <div class="col-md-5"> -->
        <div class="col-md-6">
          <!-- 商品位置 結構連結 -->
          <!-- 這個可能不想要 改一下版面配置 -->
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-white px-0 mb-0 py-3">
              <router-link class="breadcrumb-item" to="/">首頁</router-link>
              <router-link class="breadcrumb-item" to="/products">產品列表</router-link>
              <!-- pointer-events: none; 無效手掌 evnt-->
              <router-link class="breadcrumb-item text-primary" style="text-decoration:none;  cursor: text;" aria-current="page" :to="`/product/${id}`">商品細項</router-link>
            </ol>
          </nav>
          <!-- 商品詳細項目 -->
          <h2 class="fw-bold h1 mb-1">{{product.title}}</h2>
          <p class="mb-0 text-muted text-end"><del>NT$ {{product.origin_price}}</del></p>
          <p class="h4 fw-bold text-end">NT$ {{product.price}}</p>
          <div class="row align-items-center">
            <!-- + - 按鈕 -->
            <div class="col-6">
              <div class="input-group my-3 bg-light rounded">
                <!-- 加入購物車 數量 -->
                <div class="input-group-prepend">
                  <!-- - btn -->
                  <button class="btn btn-outline-dark border-0 py-2" @click="qtyCount('-')" type="button" id="button-addon1" :disabled="qty === 1">
                    <i class="bi bi-dash-lg"></i>
                  </button>
                </div>
                <input v-model="qty" type="text" class="form-control border-0 text-center my-auto shadow-none bg-light" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
                <div class="input-group-append">
                  <!-- + btn -->
                  <button class="btn btn-outline-dark border-0 py-2" @click="qtyCount('+')" type="button" id="button-addon2">
                    <i class="bi bi-plus-lg"></i>
                  </button>
                </div>
              </div>
            </div>
            <!-- 加入購物車 btn -->
            <div class="col-6">
              <a href="./checkout.html" @click.prevent="addToCart(), qtyCount('reset')" class="text-nowrap btn btn-dark w-100 py-2">加入購物車</a>
            </div>
          </div>
        </div>
      </div>
      <!-- 商品說明 -->
      <!-- v-html for 文字換行問題 -->
      <div class="row my-5">
        <div class="col-md-6">
          <p v-html="product.description"></p>
        </div>
        <div class="col-md-6">
          <p v-html="product.content" class="text-muted"></p>
        </div>
      </div>
    </div>
</template>

<script>

import emitter from '@/libs/emitter'

export default {
  data() {
    return {
      id: '', // 產品細項轉址自己用
      qty: 1,
      product: {
        imageUrl: '',
        content: '',
        description: ''
      }
    }
  },
  methods: {
    getProduct() {
      console.log('getProducts')
      const id = this.$route.params.id
      // const { id } = this.$route.params  // 解構的寫法
      this.$http.get(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/product/${id}`)
        .then(res => {
          console.log(res)
          this.product = res.data.product
          this.product.description = this.product.description.replace(/\n/g, '<br>')
          this.product.content = this.product.content.replace(/\n/g, '<br>')
        })
        .catch((err) => {
          console.dir(err)
        })
      console.log('123')
    },
    addToCart(qty = this.qty){
      const data = {
        product_id: this.$route.params.id,
        qty
      }
      this.$http.post(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/cart`, { data })
      .then((res) => {
        console.log('addToCart()', res)
        emitter.emit('get-cart') // 此處觸發 NAVBAR接收
      })
      .catch((err) => {
        console.dir(err.data.message)
      })
    },
    qtyCount(status){
      if (status === '+'){
        this.qty += 1
      } else if (status === '-'){
        if (this.qty <= 1){
          console.log('已經是最小數量啦~~~')
        } else {
          this.qty -= 1
        }
      } else if (status === 'reset'){
        this.qty = 1
      }
    }
  },
  mounted() {
    this.getProduct()
    this.id = this.$route.params.id // 產品細項轉址自己用
  }
}
</script>
