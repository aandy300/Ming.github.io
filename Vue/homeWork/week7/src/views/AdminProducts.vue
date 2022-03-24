<template>
    <div class="container">
        <br>
        <!-- 想做最後更新通知 待處理 -->
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>{{  }} lastInfo </strong> You should check in on some of those fields below.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <div class="text-end mt-4">
          <button class="btn btn-primary" @click="openModal('new'), isNew = true">
            建立新的產品
          </button>
        </div>

        <table class="table mt-4">
          <thead>
            <tr>
              <th>產品名稱</th>
              <th width="120">
                原價
              </th>
              <th width="120">
                售價
              </th>
              <th width="150">
                是否啟用
              </th>
              <th width="120">
                查看細項
              </th>
              <th width="120">
                刪除
              </th>
            </tr>
          </thead>

          <tbody id="productList">
            <tr v-for=" (item, index) in products" :key="item.id">
              <td>{{ item.title }}</td>
              <td width="120">
                {{ item.origin_price }}
              </td>
              <td width="120">
                {{ item.price }}
              </td>
              <td width="100">
                <span v-if="products[index].is_enabled" class="text-success">啟用</span>
                <span v-else class="text-danger">未啟用</span>
              </td>
              <td>
                <button @click="checkInfo(item)" type="button" class="btn btn-primary">查看細節</button>
              </td>
              <td width="120">
                <div class="btn-group">
                  <button @click="openModal('edit', item), isNew = false, checkInfo(item)" type="button" class="btn btn-outline-primary btn-sm">
                    編輯
                  </button>
                  <button @click="openModal('del', item), checkInfo(item)" type="button" class="btn btn-outline-danger btn-sm">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
            <p>目前顯示 <span id="productCount">{{ products.length }}</span> 項產品</p>
    </div>
    <!-- ************************************************************************************** -->
    <!-- 分頁元件 -->
    <ObjPagination :pages="pagination" @get-data="getData"></ObjPagination>
    <!-- 新增、編輯modal元件 -->

    <!-- 刪除modal元件 -->
    <ObjDelButtonModal :temp="temp" ref="delModal" @close-modal="closeModal" @del-data="delData"></ObjDelButtonModal>
    <!-- 查看細項 -->
    <button @click="openModal('del', item), checkInfo(item)" type="button" class="btn btn-outline-danger btn-sm">刪除</button>
</template>

<script>
    import ObjPagination from '@/components/Obj_Pagination.vue'
    import ObjDelButtonModal from '@/components/Obj_DelButtonModal.vue'
    // import ObjAdminProductsList from '@/components/Obj_AdminProducts.vue'
export default {
    data() {
        return {
            nowInfo: {},
            products: {},
            pagination: '',
            temp: {
                // eslint-disable-next-line quote-props
                'data': {}
            }
        }
    },
    components: {
        ObjPagination,
        ObjDelButtonModal
        // ObjAdminProductsList
    },
    methods: {
        // 確認登入
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
                alert(`${err.status}, ${err.data.message}`)
                this.$router.push('/admin/login') // $router.push() 取代原先跳轉頁面
            })
        },
        // 抓後台商品資料
        getData(page = 1){
            this.$http.get(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/admin/products/?page=${page}`)
            .then((res) => {
                console.log('getData()', res)
                this.nowInfo = {}
                this.products = res.data.products
                this.pagination = res.data.pagination
            })
            .catch((err) => {
                alert(err.data.message)
            })
        },
        delData(){
            console.log('delData...')
            // this.$http.delete(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/admin/product/${this.temp.data.id}`)
            // .then((res) => {
            // this.temp.data = {
            //     imagesUrl: []
            // }
            // this.getData()
            //     console.log(` ${this.temp.data.id}` + ' 已刪除此id商品')
            // })
            // .catch((err) => {
            //     alert(err.data.message)
            // })
        },
        openModal(status, item){
            // this.temp.data = { ...item }
            if (status === 'edit'){
                // myModal.show()
                this.modal.show()
            } else if (status === 'del'){
                console.log(this.$refs)
                const DelButtonModal = this.$refs.delModal
                console.log(this.DelButtonModal)
                DelButtonModal.openModal()
                // console.log(item.id, item)
            } else if (status === 'new'){
                this.temp.data = {}
                this.temp.data = {
                imagesUrl: []
                }
                // myModal.show()
                this.modal.show()
            }
        },
        closeModal(status){
        if (status === 'del'){
            console.log('mydelModal.hide()')
        } else {
            console.log('mydelModal.hide() else')
            }
        }
    },
    mounted() {
        this.checkLogin()
        this.getData()
        // myModal = new bootstrap.Modal(document.querySelector('#productModal'))
        // mydelModal = new bootstrap.Modal(document.querySelector('#delProductModal'))
        // this.modal = new Modal(this.$refs.modal)
    }
}
</script>
