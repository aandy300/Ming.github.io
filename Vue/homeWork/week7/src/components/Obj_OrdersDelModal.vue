<template>
  <div class="modal fade" id="delModal" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <span>刪除 {{ neworderTemp.id }}</span>
          </h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除 <strong class="text-danger">{{ neworderTemp.id }}</strong> (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
                  data-bs-dismiss="modal">取消
          </button>
          <button type="button" class="btn btn-danger"  @click="delOrder(neworderTemp)">確認刪除</button>
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
        neworderTemp: {}
      }
    },
    methods: {
      checkLogin(){
        // token處理
        // eslint-disable-next-line no-useless-escape
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)mingToken\s*\=\s*([^;]*).*$)|^.*$/, '$1')
        // eslint-disable-next-line dot-notation
        this.$http.defaults.headers.common['Authorization'] = token
        // token處理結束
        this.$http.post('https://vue3-course-api.hexschool.io/v2/api/user/check')
        .then((res) => {
            console.log('checkLogin()', '確認登入成功', res)
        })
        .catch((err) => {
            console.dir(err)
            // alert(`${err.status}, ${err.data.message}`)
            this.$router.push('/admin/login') // $router.push() 取代原先跳轉頁面
        })
      },
      delOrder(item) {
        this.$http.delete(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/admin/order/${item.id}`)
        .then((res) => {
          this.closeModal()
          this.$emit('resetorderlist')
          console.log(res, res.status, '已刪除:', item.id, '該筆訂單')
        })
        .catch((err) => {
          console.dir(err.response, '錯誤訊息')
          console.log(err.response.data.message)
        })
      },
      openModal(){
        this.modal.show()
      },
      closeModal(){
        this.modal.hide()
      }
    },
    // props 抓外層的資料
    props: ['orderTemp'],
    // $emit 因為外面傳進來，但是使用的地方在func()且在 modal 裡面 button (modal按按鈕才會出現) 所以傳進來的時候沒有地方存會噴錯，需要下面這一段當作暫存的地方
    emits: ['resetorderlist'],
    watch: {
      orderTemp(){
        this.neworderTemp = this.orderTemp
      }
    },
    created() {
        // props抓進來的資料 轉存到本身元件裡面
        this.neworderTemp = this.orderTemp
    },
    mounted() {
        this.modal = new Moadl(this.$refs.modal)
        this.checkLogin()
    }
}
</script>
