// 不能改訂單資訊 > 驗證部分白做了
<template>
<div class="modal fade" id="vertCentModal" tabindex="-1" aria-labelledby="basicModalLabel" aria-hidden="true" ref="modal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="basicModalLabel">收件人資訊</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body d-flex flex-column  justify-content-center align-items-center">
          <!-- 內文 -->
          <v-form ref="user" class="col-md-6 " v-slot="{ errors }">
            <div class="container d-flex flex-column justify-content-center align-items-center">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                  <v-field v-model="inside.user.email"
                  id="email" name="email" type="email" class="form-control" disabled="disabled"
                  :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="email">
                  </v-field>
                  <error-message name="email" class="invalid-feedback"></error-message>
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">收件人姓名</label>
                <v-field v-model="inside.user.name"
                  id="name" name="姓名" type="text" class="form-control" disabled="disabled"
                  :class="{ 'is-invalid': errors['姓名'] }"
                  placeholder="請輸入姓名" rules="required"></v-field>
                <error-message name="姓名" class="invalid-feedback"></error-message>
              </div>
              <div class="mb-3">
                <label for="tel" class="form-label">收件人電話</label>
                <v-field v-model="inside.user.tel"
                  id="tel" name="電話" type="text" class="form-control" disabled="disabled"
                  :class="{ 'is-invalid': errors['電話'] }" placeholder="請輸入電話" :rules="isPhone" ></v-field>
                <error-message name="電話" class="invalid-feedback"></error-message>
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">收件人地址</label>
                <v-field v-model="inside.user.address"
                  id="address" name="地址" type="text" class="form-control" disabled="disabled"
                  :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入地址" rules="required" ></v-field>
                <error-message name="地址" class="invalid-feedback"></error-message>
              </div>
              <div class="mb-3">
                <label for="message" class="form-label">留言</label>
                <textarea disabled="disabled" v-model="inside.message" style="height: 100px" id="message" class="form-control" cols="30" rows="10" ></textarea>
              </div>
              <div class="text-end">
                <!-- 原本 :disabled="Object.keys(errors).length > 0 || cartData.carts.length === 0 " -->
                <!-- 想要物件比對來 disable 可是 現在 data 被雙向綁定 比對不能 -->
                <button type="submit" @click.prevent="closeModal()" class="btn btn-secondary">確認</button>
              </div>
            </div>
          </v-form>
      </div>
      <!-- 案扭曲 -->
      <div class="modal-footer"></div>
        <!-- <button type="button" class="btn btn-primary">Yes</button>
        <button type="button" class="btn btn-primary">No</button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button> -->
      </div>
      <div class="my-5 row justify-content-center">
    <!-- @submit="createOrder" -->

  </div>
    </div>
  </div>
</template>

<script>

import Moadl from 'bootstrap/js/dist/modal'

export default {
    data(){
      return {
        newTemp: '',
        cartData: {
          // length 無校關係 生命週期原因 所以這裡事先寫好結構
          carts: []
        },
        inside: {
          user: {
            name: '',
            email: '',
            tel: '',
            address: ''
          },
          message: ''
        }
        // sinsideForUse: {}
      }
    },
    props: ['singleOrderDataTemp'],
    watch: {
        singleOrderDataTemp(){
            // 同個記憶體原因? 會變成跟外層的 singleOrderDataTemp 改modal字也會改到外面 明明裡面是用裡面的資料 外面是用外面的資料?
            this.inside = this.singleOrderDataTemp
            // 用 mitter 解決吧 外面觸發 傳進來裡面轉存
            console.log('watch()', this.singleOrderDataTemp)
        }
    },
    methods: {
        openModal(){
            this.modal.show()
        },
        closeModal(){
            this.modal.hide()
        },
        // 以下表單驗證用
        isPhone(value) {
          const phoneNumber = /^(09)[0-9]{8}$/
          return phoneNumber.test(value) ? true : '需要正確的電話號碼' // phoneNumber.test(外面表單輸入的值?) ? true的結果 : false的結果 嗎
        }
    },
    created() {
      // this.inside = this.singleOrderDataTemp
    },
    mounted() {
        this.modal = new Moadl(this.$refs.modal)
        console.log('2123', this.singleOrderDataTemp)
        // this.inside = this.singleOrderDataTemp
        // this.openModal()
    }
}
</script>
