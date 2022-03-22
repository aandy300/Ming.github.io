<template>
    <h2>商品列表123</h2>
    <div class="container"><!-- b5 container 起手式 b5容器 -->
      <!-- row-cols-* row 決定內層數量 -->
      {{ product.title }}
      <div >
        <img :src="product.imageUrl" alt="">
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
