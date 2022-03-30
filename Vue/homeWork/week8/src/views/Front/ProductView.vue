<template>
    <div class="container">
      <div class="row align-items-center">
        <!-- 中斷點後面的數字代表甚麼?? -->
        <div class="col-12 col-sm-11 col-md-7 col-lg-20 col-xl-7">
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
        <div class="col-md-5">
          <!-- 商品位置 結構連結 -->
          <!-- 這個可能不想要 改一下版面配置 -->
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-white px-0 mb-0 py-3">
              <li class="breadcrumb-item"><a class="text-muted" href="./index.html">首頁</a></li>
              <li class="breadcrumb-item"><a class="text-muted" href="./product.html">商品列表</a></li>
              <li class="breadcrumb-item active" aria-current="page">商品細項</li>
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
                <div class="input-group-prepend">
                  <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1">
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
                <!-- 加入購物車 數量 -->
                <input v-model="qty" type="text" class="form-control border-0 text-center my-auto shadow-none bg-light" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
                <div class="input-group-append">
                  <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon2">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <!-- 加入購物車 -->
            <div class="col-6">
              <a href="./checkout.html" @click.prevent="addToCart()" class="text-nowrap btn btn-dark w-100 py-2">加入購物車</a>
            </div>
          </div>
        </div>
      </div>
      <div class="row my-5">
        <div class="col-md-7">
          <p v-html="product.description"></p>
        </div>
        <div class="col-md-4">
          <p v-html="product.content" class="text-muted"></p>
        </div>
      </div>
      <!-- SWIPER -->
      <!-- <h3 class="fw-bold">Lorem ipsum dolor sit amet</h3>
      <div class="swiper-container mt-4 mb-5">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="card border-0 mb-4 position-relative position-relative">
              <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" class="card-img-top rounded-0" alt="...">
              <a href="#" class="text-dark">
              </a>
              <div class="card-body p-0">
                <h4 class="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
                <p class="card-text mb-0">NT$1,080 <span class="text-muted "><del>NT$1,200</del></span></p>
                <p class="text-muted mt-3"></p>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card border-0 mb-4 position-relative position-relative">
              <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" class="card-img-top rounded-0" alt="...">
              <a href="#" class="text-dark">
              </a>
              <div class="card-body p-0">
                <h4 class="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
                <p class="card-text mb-0">NT$1,080 <span class="text-muted "><del>NT$1,200</del></span></p>
                <p class="text-muted mt-3"></p>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card border-0 mb-4 position-relative position-relative">
              <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" class="card-img-top rounded-0" alt="...">
              <a href="#" class="text-dark">
              </a>
              <div class="card-body p-0">
                <h4 class="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
                <p class="card-text mb-0">NT$1,080 <span class="text-muted "><del>NT$1,200</del></span></p>
                <p class="text-muted mt-3"></p>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card border-0 mb-4 position-relative position-relative">
              <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" class="card-img-top rounded-0" alt="...">
              <a href="#" class="text-dark">
              </a>
              <div class="card-body p-0">
                <h4 class="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
                <p class="card-text mb-0">NT$1,080 <span class="text-muted "><del>NT$1,200</del></span></p>
                <p class="text-muted mt-3"></p>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card border-0 mb-4 position-relative position-relative">
              <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" class="card-img-top rounded-0" alt="...">
              <a href="#" class="text-dark">
              </a>
              <div class="card-body p-0">
                <h4 class="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
                <p class="card-text mb-0">NT$1,080 <span class="text-muted "><del>NT$1,200</del></span></p>
                <p class="text-muted mt-3"></p>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <!-- SWIPER結束 -->
    </div>
    <!-- 最下面輸入區 -->
    <!-- <div class="bg-light py-4">
      <div class="container">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start">
          <p class="mb-0 fw-bold">Lorem ipsum dolor sit amet.</p>
          <div class="input-group w-md-50 mt-md-0 mt-3">
            <input type="text" class="form-control rounded-0" placeholder="" />
            <div class="input-group-append">
              <button class="btn btn-dark rounded-0" type="button" id="search">
                Lorem ipsum
              </button>
            </div>
          </div>
        </div>
      </div>
    </div> -->
</template>

<script>

import emitter from '@/libs/emitter'

export default {
  data() {
    return {
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
        emitter.emit('get-cart')
      })
      .catch((err) => {
        console.dir(err.data.message)
      })
    }
  },
  mounted() {
    this.getProduct()
  }
}
</script>
