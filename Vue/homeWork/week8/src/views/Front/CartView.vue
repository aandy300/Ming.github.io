<template>
<!-- 購物車列表 -->
  <div class="text-end">
    <button  @click="removeAllCartItem" :class=" {'disabled' :cartData.carts.length === 0 }"
      class="btn btn-outline-danger" type="button">清空購物車</button>
  </div>

  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>圖片</th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
      </tr>
    </thead>

    <tbody>
      <!-- 折扣卷 購物車有資料時才顯示 -->
      <template v-if="cartData.carts">
        <tr v-for=" item in cartData.carts" :key="item.id">
          <td>
            <!-- 購物車 - x 移除購物車商品按鈕 -->
            <button @click="removeCartItem( item.id )" :disabled="isLoadingItem === item.id"
            type="button" class="btn btn-outline-danger btn-sm">
              x
            </button>
          </td>
          <td>
            <!-- 購物車 - 商品圖片 -->
            <div :style="{ backgroundImage: `url( ${ item.product.imageUrl })`}"
            style="height: 100px; background-size: cover; background-position: center">
            </div>
          </td>
          <td>
            {{ item.product.title }}
            <!-- <div class="text-success">已套用優惠券</div> -->
          </td>
          <td>
            <!-- 購物車 - 商品數量 -->
            <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <!-- <input v-model=" item.qty " min="1" type="number" class="form-control"> -->
                <select id="" class="form-select"
                v-model=" item.qty" @change=" updataCartItem( item )" :disabled="isLoadingItem === item.id">
                  <!-- :selected="item.qty === num" -->
                  <option :value="num" v-for=" num in 20" :key="`${num} + ${item.id}`" > {{ num }} </option>
                </select>
                <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
              </div>
            </div>
          </td>
          <td class="text-end">
            {{ item.total }}
            <!-- <small class="text-success">折扣價：</small> -->
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td></td>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ cartData.total }}</td>
      </tr>
      <tr>
        <!-- <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{  }}</td> -->
      </tr>
    </tfoot>
  </table>

</template>

<script>

// import emitter from '@/libs/emitter'

export default {
  data() {
    return {
      cartData: {
        // length 無校關係 生命週期原因 所以這裡事先寫好結構
        carts: []
      },
      products: [],
      productsID: '',
      isLoadingItem: '',
      form: {
          user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    // 抓購物車資料
    getCart(){
      this.$http.get(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/cart`)
      .then((res) => {
        this.cartData = res.data.data
        console.log('getCart()', res)
      })
      .catch((err) => {
        alert(err.data.message)
      })
    },
    // 更改購物車商品數量
    updataCartItem(item){
      const data = {
        product_id: item.id,
        qty: item.qty
      }
      this.isLoadingItem = item.id
      this.$http.put(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/cart/${item.id}`, { data })
      .then((res) => {
        console.log('updataCartItem()', res)
        this.getCart()
        this.isLoadingItem = ''
      })
      .catch((err) => {
        console.dir(err.data.message)
        alert(err.data.message)
      })
    },
    // 刪除購物車 單體
    removeCartItem(id){
      this.isLoadingItem = id
      this.$http.delete(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/cart/${id}`)
      .then((res) => {
        console.log('removeCartItem()', res)
        this.getCart()
        this.isLoadingItem = ''
      })
      .catch((err) => {
        alert(err.data.message)
      })
    },
    // 刪除購物車 全部
    removeAllCartItem(){
      this.$http.delete(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/carts`)
      .then((res) => {
        console.log('removeAllCartItem()', res)
        this.getCart()
      })
      .catch((err) => {
        alert(err.data.message)
      })
    }
    // getProduct() {
    //   console.log('getProducts')
    //   const id = this.$route.params.id
    //   // const { id } = this.$route.params  // 解構的寫法
    //   this.$http.get(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/product/${id}`)
    //     .then(res => {
    //       console.log(res)
    //       this.product = res.data.product
    //       this.product.description = this.product.description.replace(/\n/g, '<br>')
    //       this.product.content = this.product.content.replace(/\n/g, '<br>')
    //     })
    //     .catch((err) => {
    //       console.dir(err)
    //     })
    //   console.log('123')
    // },
    // addToCart(qty = this.qty){
    //   const data = {
    //     product_id: this.$route.params.id,
    //     qty
    //   }
    //   this.$http.post(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/cart`, { data })
    //   .then((res) => {
    //     console.log('addToCart()', res)
    //     emitter.emit('get-cart')
    //   })
    //   .catch((err) => {
    //     console.dir(err.data.message)
    //   })
    // }
  },
  mounted() {
    this.getCart()
  }
}
</script>
