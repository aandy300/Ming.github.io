<template>
<div class="modal fade" id="vertCentModal" tabindex="-1" aria-labelledby="basicModalLabel" aria-hidden="true" ref="modal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="basicModalLabel">購買者資訊</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <!-- {{inside_singleOrderDataTemp}} -->
          <v-form @submit="createOrder" ref="form" class="col-md-6" v-slot="{ errors }">
                  <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <v-field v-model="inside_singleOrderDataTemp.user.email" id="email" name="email" type="email" class="form-control"
                  :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="email"
                ></v-field>
        <error-message name="email" class="invalid-feedback"></error-message>
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
        inside_singleOrderDataTemp: {
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
    props: ['singleOrderDataTemp'],
    watch: {
        singleOrderDataTemp(){
            this.inside_singleOrderDataTemp.user = this.singleOrderDataTemp.user
            console.log('watch()', this.singleOrderDataTemp)
            console.log('this.inside_singleOrderDataTemp.user', this.inside_singleOrderDataTemp.user)
        }
    },
    methods: {
        openModal(){
            this.modal.show()
        },
        closeModal(){
            this.modal.hide()
        }
    },
    mounted() {
        this.modal = new Moadl(this.$refs.modal)
        // this.openModal()
    }
}
</script>
