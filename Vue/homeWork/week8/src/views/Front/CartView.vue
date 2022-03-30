<template>
    購物車頁面
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
