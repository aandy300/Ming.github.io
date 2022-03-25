<template>
    <h2>商品列表</h2>
    <div class="container"><!-- b5 container 起手式 b5容器 -->
      <!-- row-cols-* row 決定內層數量 -->
      <div class="row row-cols-1 row-cols-lg-4 g-4"><!-- b5 row 格線系統 --> <!-- 前者手機板後者PC版  lg=桌面 看筆記class -->
      <!-- 內層不定義寬度 -->
        <div class="col" v-for=" item in products " :key="item.id"><!-- b5 col 要排的格線形式 b5欄 > columns -->
          <div class="card h-100"> <!-- b5 card template -->
            <img :src="item.imageUrl" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-text">{{ item.description }}</p>
            </div>
            <div>
              <div class="card-footer">
                <router-link class="btn btn-primary" :to="`/product/${item.id}`">詳細資訊</router-link>
              </div>
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
      products: []
    }
  },
  methods: {
    getProducts() {
      console.log('getProducts')
      this.$http(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/products/all`)
        .then(res => {
          console.log(res)
          this.products = res.data.products
        })
        .catch(err => {
         console.log(err)
        })
    }
  },
  mounted() {
    this.getProducts()
  }
}
</script>
