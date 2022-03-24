<!--
// origin
// <template>
//           <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel" aria-hidden="true">
//         <div class="modal-dialog">
//           <div class="modal-content border-0">
//             <div class="modal-header bg-danger text-white">
//               <h5 id="delProductModalLabel" class="modal-title">
//                 <span>刪除產品</span>
//               </h5>
//               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div class="modal-body">
//               是否刪除
**//               <strong class="text-danger"> {{ temp.data.title }} </strong> 商品(刪除後將無法恢復)。
//             </div>
//             <div class="modal-footer">
//               <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
//                 取消
//               </button>
**//               確定刪除按鍵
//               <button type="button" class="btn btn-danger" @click="$emit( 'closeModal', 'del'), $emit( 'delData')">確認刪除</button>
//             </div>
//           </div>
//         </div>
//       </div>
// </template>
  -->
<template>
  <div class="modal fade" id="delModal" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <!-- <span>刪除 {{ item.title }}</span> -->
          </h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- 是否刪除 <strong class="text-danger">{{ item.title }}</strong> (刪除後將無法恢復)。 -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
                  data-bs-dismiss="modal">取消
          </button>
          <button type="button" class="btn btn-danger"
                  @click="$emit('del-item')">確認刪除
          </button>
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
        // inside_isNew: false
      }
    },
    updated() {
        // this.inside_isNew = this.isNew
    },
    props: ['temp', 'isNew'],
    watch: {
        temp(){
            this.newTemp = this.temp
        }
    },
    methods: {
        openModal(){
            this.modal.show()
        }
    },
    created() {
        this.newTemp = this.temp
    },
    mounted() {
        this.modal = new Moadl(this.$refs.modal)
    }
}
</script>
