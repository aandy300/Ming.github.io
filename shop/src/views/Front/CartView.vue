<template>
<div v-if="ready === true" class="container">
  <!-- card 付款狀態 -->
  <div v-if="cartData.carts.length === 0" class="d-flex justify-content-center my-5">
    <div class="col-md-6 card text-center" style="">
      <div class="card-body">
        <strong ><p class="m-0 text-primary" style="font-size: 2rem;">購物車目前沒有東西哦</p></strong>
        <router-link to="/products">
        <button type="button" class="col-4 btn btn-outline-primary mt-2">前去購買</button>
        </router-link>
      </div>
    </div>
  </div>
  <!-- 購買步驟狀態 -->
  <div v-else class="row d-flex flex-nowrap justify-content-center align-items-center">
    <!-- style="max-width: 18rem;" -->
    <!-- OKver -->
    <!-- <div style="max-width: 18rem;" class="col-3 d-flex align-items-center card text-white bg-secondary my-5 mx-4 rounded ">
      <i class="bi bi-check2-circle mt-2" style="font-size:40px"></i>
        <p class="card-text text-center m-0">Step1</p>
        <p class="card-text text-center mb-2">確認訂單</p>
    </div> -->
    <!-- wait ver -->
    <!-- <div style="max-width: 18rem;" class="col-3 d-flex align-items-center card text-balck bg-info my-5 mx-4 rounded">
      <i class="bi bi-dash-circle-dotted mt-2" style="font-size:40px"></i>
        <p class="card-text text-center m-0">Step2</p>
        <p class="card-text text-center mb-2">建立訂單</p>
    </div> -->
    <div style="max-width: 18rem;" class="col-3 d-none d-sm-block card text-white bg-secondary my-5 mx-4 rounded ">
      <div class="d-flex flex-column flex-nowrap justify-content-center align-items-center">
      <i class="bi bi-check2-circle mt-2" style="font-size:40px"></i>
        <p class="card-text text-center m-0">Step1</p>
        <p class="card-text text-center mb-2">確認訂單</p>
      </div>
    </div>
    <div style="max-width: 18rem;" class="col-3 d-none d-sm-block card text-balck bg-info my-5 mx-4 rounded">
      <div class="d-flex flex-column flex-nowrap justify-content-center align-items-center">
        <i class="bi bi-dash-circle-dotted mt-2" style="font-size:40px"></i>
        <p class="card-text text-center m-0">Step2</p>
        <p class="card-text text-center mb-2">建立訂單</p>
      </div>
    </div>
    <div style="max-width: 18rem;" class="col-3 d-none d-sm-block card text-balck bg-info my-5 mx-4 rounded">
      <div class="d-flex flex-column flex-nowrap justify-content-center align-items-center">
        <i class="bi bi-dash-circle-dotted mt-2" style="font-size:40px"></i>
        <p class="card-text text-center m-0">Step3</p>
        <p class="card-text text-center mb-2">付款</p>
      </div>
    </div>
    <!-- for rwd 顯示 單個 購買狀態 -->
    <div style="max-width: 18rem;" class="col-10 d-flex align-items-center d-block d-sm-none card text-balck bg-info my-5 mx-4 rounded">
      <i class="bi bi-dash-circle-dotted mt-2" style="font-size:40px"></i>
        <p class="card-text text-center m-0">Step2</p>
        <p class="card-text text-center mb-2">建立訂單</p>
    </div>
  </div>
  <div class="row">
    <!-- 購物車列表 - 商品列表 -->
    <div class="col-xl-6">
      <div class="d-flex justify-content-between mb-2">
      <h4>訂單內容</h4>
      <!-- 清空購物車 - 按鈕 -->
      <div class="text-end">
        <button type="button" @click="removeAllCartItem" :class=" {'disabled' :cartData.carts.length === 0 }"
          class="btn btn-outline-primary">清空購物車</button>
      </div>
      <!-- 清空購物車 - 按鈕 結束 -->
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th class="d-none d-sm-block">圖片</th>
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
                type="button" class="btn btn-outline-danger btn-sm px-2 py-1">
                  x
                </button>
              </td>
              <!-- d-none d-sm-block  = 手機板隱藏圖片 -->
              <td class="d-none d-sm-block">
                <!-- 購物車 - 商品圖片 -->
                <img style="height: 100px;" class="img-fluid" :src="item.product.imageUrl" alt="">
                <!-- <div class="img-fluid"
                :style="{ backgroundImage: `url( ${ item.product.imageUrl })`}"
                style="height: 100px; background-size: cover; background-position: center">
                </div> -->
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
                    <select id="" class="form-select mt-3"
                    v-model=" item.qty" @change=" updataCartItem( item )" :disabled="isLoadingItem === item.id">
                      <!-- :selected="item.qty === num" -->
                      <option :value="num" v-for=" num in 20" :key="`${num} + ${item.id}`" > {{ num }} </option>
                    </select>
                    <span class="input-group-text mt-3" id="basic-addon2">{{ item.product.unit }}</span>
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
            <td colspan="3" class="text-end fs-3">總計</td>
            <td class="text-end fs-3">{{ cartData.total }}</td>
          </tr>
          <tr>
            <!-- <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">{{  }}</td> -->
          </tr>
        </tfoot>
      </table>
    </div>
    <!-- 購物車列表 - 商品列表 結束 -->

    <!-- 表單驗證 -->
    <div class="col-xl-6">
    <h4 class="ms-3 d-none d-xl-block">收件人資訊</h4>
    <h4 class="d-xl-none">收件人資訊</h4>
      <div class="my-3 row justify-content-center">
        <!-- @submit="createOrder" -->
        <v-form @submit="createOrder" ref="form" class="col-md-9" v-slot="{ errors }" >
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
            <v-field v-model="form.user.tel" id="number" name="電話" type="number" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                      placeholder="請輸入電話" :rules="isPhone" style="-webkit-appearance: none;" ></v-field>
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
            <button type="submit" class="col-12 btn btn-primary" :disabled="Object.keys(errors).length > 0 || cartData.carts.length === 0 "
                    >送出訂單</button>
          </div>
        </v-form>

      </div>
    </div>
    <!-- 表單驗證 結束 -->
  </div>
</div>
</template>

<script>

import emitter from '@/libs/emitter'

export default {
  data() {
    return {
      ready: false,
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
        this.ready = true
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

<style lang="sass">
  input::-webkit-outer-spin-button
  input::-webkit-inner-spin-button
    -webkit-appearance: none
    margin: 0
</style>
