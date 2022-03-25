<template>
<div class="container">
      <div class="row align-items-center mt-5">
        <div class="col-md-7">
          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <!-- IMG -->
              <div class="carousel-item active">
                <!-- origin 原本尺寸 CLASS-->
                <!-- <img  :src="product.imageUrl" class="d-block w-100" alt="..."> -->
                <img  :src="product.imageUrl" class="d-block" alt="..." height="600">
              </div>
              <div class="carousel-item">
                <!-- <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" class="d-block w-100" alt="..."> -->
              </div>
              <div class="carousel-item">
                <!-- <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" class="d-block w-100" alt="..."> -->
              </div>
            </div>
            <!-- 下一張圖 -->
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
        <div class="col-md-5">
          <nav aria-label="breadcrumb">
            <!-- 分類連結 -->
            <ol class="breadcrumb bg-white px-0 mb-0 py-3">
              <li class="breadcrumb-item"><a class="text-muted" href="./index.html">Home</a></li>
              <li class="breadcrumb-item"><a class="text-muted" href="./product.html">Product</a></li>
              <li class="breadcrumb-item active" aria-current="page">Detail</li>
            </ol>
          </nav>
          <h2 class="fw-bold h1 mb-1">{{ product.title }}</h2>
          <div class="mb-4"></div>
          <h4 class="h4 mb-1">商品描述</h4>
          {{product.description}}
          <div class="mb-3"></div>
          <h5 class="h5 mb-2">商品說明</h5>
          {{product.content}}
          <p class="mb-0 text-muted text-end"><del>NT${{ product.origin_price }}</del></p>
          <p class="h4 fw-bold text-end">NT${{product.price}}</p>
          <div class="row align-items-center">
            <div class="col-6">
              <div class="input-group my-3 bg-light rounded">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1">
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
                <input type="text" class="form-control border-0 text-center my-auto shadow-none bg-light" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" value="1">
                <div class="input-group-append">
                  <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon2">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-6">
              <a href="./checkout.html" class="text-nowrap btn btn-dark w-100 py-2">Lorem ipsum</a>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
      product: []
    }
  },
  methods: {
    getProduct() {
      console.log('getProducts')
      const id = this.$route.params.id
      // const { id } = this.$route.params  // 解構的寫法
      this.$http(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/product/${id}`)
        .then(res => {
          console.log(res)
          this.product = res.data.product
        })
        .catch(err => {
         console.log(err)
        })
    }
  },
  mounted() {
    this.getProduct()
  }
}
</script>
