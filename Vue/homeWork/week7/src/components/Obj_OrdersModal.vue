<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>訂單細節</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h3>用戶資料</h3>
              <table class="table">
                <tbody v-if="neworderTemp.user">
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td>{{ neworderTemp.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ neworderTemp.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ neworderTemp.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ neworderTemp.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-8">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ neworderTemp.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ neworderTemp.create_at}}</td>
                    <!-- <td>{{ $filters.date(neworderTemp.create_at) }}</td> -->
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="neworderTemp.paid_date">
                        <!-- {{ $filters.date(neworders.paid_date) }} -->
                      </span>
                      <span v-else>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="neworderTemp.is_paid" class="text-success"
                        >已付款</strong
                      >
                      <span v-else class="text-muted">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>
                      <!-- {{ $filters.currency(neworders.total) }} -->
                      {{ neworderTemp.total }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr v-for="item in neworderTemp.products" :key="item.id">
                    <th>
                      {{ item.product.title }}
                    </th>
                    <td>{{ item.qty }} / {{ item.product.unit }}</td>
                    <td class="text-end">
                      <!-- {{ $filters.currency(item.final_total) }} -->
                      {{ item.final_total }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-end">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    v-model="neworders.is_paid"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <span v-if="neworders.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-paid', neworders)"
          >
            修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
    132
  {{ neworderTemp}}
</template>

<script>

import Moadl from 'bootstrap/js/dist/modal'

export default {
    data(){
      return {
        neworders: [],
        neworderTemp: {}
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
    props: ['orders', 'orderTemp'],
    watch: {
      orders(){
        this.neworders = this.orders
      },
      orderTemp(){
        this.neworderTemp = this.orderTemp
      }
    },
    created() {
        // props抓進來的資料 轉存到本身元件裡面
        this.neworders = this.orders
        this.neworderTemp = this.orderTemp
    },
    mounted() {
        this.modal = new Moadl(this.$refs.modal)
    }
}
</script>
