<template>
  <div class="modal fade" id="delModal" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <span>刪除 {{ newTemp.data.title }}</span>
          </h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除 <strong class="text-danger">{{ newTemp.data.title }}</strong> (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
                  data-bs-dismiss="modal">取消
          </button>
          <button type="button" class="btn btn-danger"  @click="$emit('delData'), closeModal()">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Moadl from 'bootstrap/js/dist/modal'

export default {
    data(){
      return {
        newTemp: ''
      }
    },
    // props 抓外層的資料
    props: ['temp'],
    methods: {
        openModal(){
            this.modal.show()
        },
        closeModal(){
            this.modal.hide()
        }
    },
    // 下面兩個都期都不能換，只能在各自的週期作用不然會 噴錯
    created() {
        // props抓進來的資料 轉存到本身元件裡面
        this.newTemp = this.temp
    },
    mounted() {
        this.modal = new Moadl(this.$refs.modal)
    }
}
</script>
