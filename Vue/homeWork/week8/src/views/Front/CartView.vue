<template>
<div class="container">
  <!-- 購物車列表 - ALL -->
  <div class="text-end">
    <button  @click="removeAllCartItem" :class=" {'disabled' :cartData.carts.length === 0 }"
      class="btn btn-outline-danger" type="button">清空購物車</button>
  </div>

  <!-- 購物車列表 架構 -->
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
      <!-- 購物車 - 架構 綁 V -->
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
    <!-- 上面綁 V 結束 -->
    <!-- 總計 -->
    <tfoot>
      <tr>
        <td></td>
        <!-- colspan = 要跨行的列數 -->
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ cartData.total }}</td>
      </tr>
      <tr>
        <!-- <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{  }}</td> -->
      </tr>
    </tfoot>

  </table>
  <!-- 購物車架構 結束 -->

  <!-- 表單驗證 -->
  <div class="my-5 row justify-content-center">
    <!-- @submit="createOrder" -->
    <v-form @submit="createOrder" ref="form" class="col-md-6" v-slot="{ errors }" >
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <v-field v-model="form.user.email" id="email" name="email" type="email" class="form-control"
                  :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="email"
                ></v-field>
        <error-message name="email" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <v-field v-model="form.user.name" id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                  placeholder="請輸入姓名" rules="required"></v-field>
        <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <v-field v-model="form.user.tel" id="tel" name="電話" type="number" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                  placeholder="請輸入電話" :rules="isPhone" ></v-field>
        <error-message name="電話" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <v-field v-model="form.user.address" id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
                  placeholder="請輸入地址" rules="required" ></v-field>
        <error-message name="地址" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea v-model="form.message" id="message" class="form-control" cols="30" rows="10" ></textarea>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-danger" :disabled="Object.keys(errors).length > 0 || cartData.carts.length === 0 "
                >送出訂單</button>
      </div>
    </v-form>

  </div>
</div>
</template>

<script>

import emitter from '@/libs/emitter'

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
  components: {
  },
  methods: {
    // 以下購物車相關
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
        // 這是通知 致行 navbar 的
        emitter.emit('get-cart', () => {
          this.getCart()
        })
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
        // 這是通知 致行 navbar 的
        emitter.emit('get-cart', () => {
          this.getCart()
        })
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
        // 這是通知 致行 navbar 的
        emitter.emit('get-cart', () => {
          this.getCart()
        })
      })
      .catch((err) => {
        alert(err.data.message)
      })
    },
    createOrder(){
      const order = this.form
      this.$http.post(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/order`, { data: order })
      .then((res) => {
        console.log('createOrder()', res)
        this.$refs.form.resetForm()
        this.getCart()
        this.form.message = ''
        // 這是通知 致行 navbar 的
        emitter.emit('get-cart', () => {
          this.getCart()
        })
        this.$router.push(`/pay/${res.data.orderId}`)
        console.log('已送出訂單')
      })
      .catch((err) => {
        console.log(err.data.message)
      })
    },
    // 購物車相關結束
    // 以下表單驗證用
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼' // phoneNumber.test(外面表單輸入的值?) ? true的結果 : false的結果 嗎
    }
  },
  mounted() {
    this.getCart()
  }
}
</script>
