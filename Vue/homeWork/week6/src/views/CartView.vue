<template>
  <h2>購物車</h2>
  <table class="table align-middle">
    <thead>
      <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td style="width: 200px">
          <div
            :style="{ backgroundImage: `url( ${item.imageUrl})` }"
            style="
              height: 100px;
              background-size: cover;
              background-position: center;
            "
          ></div>
        </td>
        <td>
          {{ item.title }}
        </td>
        <td>
          <div v-if="item.price == item.origin_price">
            <div class="h5">{{ item.price }} 元</div>
          </div>
          <div v-else>
            <del class="h6">原價 {{ item.origin_price }} 元</del>
            <div class="h5">現在只要 {{ item.price }} 元</div>
          </div>
        </td>
        <td>
          <div class="btn-group btn-group-sm">
            <button
              @click="openProductMoadl(item.id)"
              type="button"
              class="btn btn-outline-secondary"
            >
              <!-- <i v-show="isLoadingItem === item.id" class="fas fa-spinner fa-pulse"></i> -->
              查看更多
            </button>
            <button
              @click="addToCart(item.id)"
              type="button"
              class="btn btn-outline-danger"
            >
              加到購物車
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

import emitter from '@/libs/emitter'

export default {
    data() {
        return {
            cartData: {},
            products: []
        }
    },
    methods: {
        // rules 中可自訂函式來驗證結果 - 使用 v-bind 綁定 :rules="isPhone"
        // 正則表達來自定規則
        isPhone(value) {
        const phoneNumber = /^(09)[0-9]{8}$/
        return phoneNumber.test(value) ? true : '需要正確的電話號碼' // phoneNumber.test(外面表單輸入的值?) ? true的結果 : false的結果 嗎
        },
        getData() {
        this.$http.get(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/products/all`)
            .then((res) => {
            this.products = res.data.products
            console.log('getData()', res)
            })
            .catch((err) => {
            alert(err.data.message)
            })
        },

        addToCart(id, qty = 1) {
        const data = {
            product_id: id,
            qty
        }
        // :disabled用
        // this.isLoadingItem = id
        this.$http.post(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/cart`, { data })
            .then((res) => {
            console.log('addToCart()', res)
            emitter.emit('get-cart')
            // this.getCart()
            // :disabled停止用
            // this.isLoadingItem = ''
            // this.$refs.productModal.closeMoadl()
            })
            .catch((err) => {
            alert(err.data.message)
            })
        }
    },
    mounted() {
        this.getData()
        // this.getCart()
    }
}
</script>
