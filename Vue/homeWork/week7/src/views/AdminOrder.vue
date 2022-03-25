<template>
    <div class="container-fluid mt-3 position-relative">
    <!-- <div class="toast-container position-fixed pe-3 top-0 end-0" style="z-index: 1500;"></div> -->
    <!-- <div tabindex="0" class="vld-overlay is-active is-full-page" aria-busy="false" aria-label="Loading"
        style="z-index: 1060; display: none;">
        <div class="vld-background" style="backdrop-filter: blur(2px);"></div>
        <div class="vld-icon">
            <svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" width="64" height="64"
            stroke="#000" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke:#f7f4ef;">
            <g fill="none" fill-rule="evenodd">
            <g transform="translate(1 1)" stroke-width="2">
                <circle stroke-opacity=".25" cx="18" cy="18" r="18"></circle>
                <path d="M36 18c0-9.94-8.06-18-18-18">
                <animatetransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.8s"
                    repeatCount="indefinite"></animatetransform>
                </path>
            </g>
            </g>
        </svg>
        </div>
    </div> -->
        <table class="table mt-4">
            <thead>
            <tr>
                <th>購買時間</th>
                <th>Email</th>
                <th>購買款項</th>
                <th>應付金額</th>
                <th>是否付款</th>
                <th>編輯</th>
            </tr>
            </thead>
            <tbody></tbody>
    <!-- 購買時間 Email 購買款項 應付金額 是否付款 編輯 -->
    <!-- 想抓物件屬性名稱 印出商品名稱 如何略過or直接抓到品項id -->
    <!-- to orders modal -->
            <tbody id="productList">
                <tr v-for=" item in orders" :key="item.id">
                    <!-- ! 傻眼 可以直接使用在下面這行 不需要 func() 去轉換 or 物件轉陣列再轉換 暈倒.... -->
                    <!-- 轉換成ISO格式 > 以T分隔轉換成陣列 > 轉乘字串 > 刪除尾巴五個字元 0, -5 > 文字取代 , to - -->
                    <td width="120">{{ new Date(item.create_at * 1000).toISOString().split('T').toString().slice(0, -5).replace(',', '-') }}</td>
                    <td width="120"> {{ item.user.email }} </td>
                        <td width="120">
                            <div v-for=" item in item.products" :key="item.id" width="100">
                                <td> {{ item.product.title }}</td>
                            </div>
                        </td>
                        <!-- <th v-for=" item in item.products" :key="item.id" width="100">
                            <td> {{ item.product.title }}</td>123
                        </th> -->
                    <td width="100"> $ {{ item.total }}  </td>
                    <td width="100">
                        <span v-if="item.is_paid" class="text-success">已付款</span>
                        <span v-else class="text-danger">尚未付款</span>
                    </td>
                    <td width="120">
                        <div class="btn-group">
                        <button @click="openModal('edit', item)" type="button" class="btn btn-outline-primary btn-sm">
                            編輯
                        </button>
                        <button @click="openModal('del', item)" type="button" class="btn btn-outline-danger btn-sm">
                            刪除
                        </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    <!-- <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel"><span>訂單細節</span></h5><button type="button" class="btn-close"
                data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div class="row">
                <div class="col-md-4">
                <h3>用戶資料</h3>
                <table class="table">
                </table>
                </div>
                <div class="col-md-8">
                <h3>訂單細節</h3>
                <table class="table">
                    <tbody>
                    <tr>
                        <th style="width: 100px;">訂單編號</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>下單時間</th>
                        <td>Invalid Date</td>
                    </tr>
                    <tr>
                        <th>付款時間</th>
                        <td><span>時間不正確</span></td>
                    </tr>
                    <tr>
                        <th>付款狀態</th>
                        <td><span class="text-muted">尚未付款</span></td>
                    </tr>
                    <tr>
                        <th>總金額</th>
                        <td>NaN</td>
                    </tr>
                    </tbody>
                </table>
                <h3>選購商品</h3>
                <table class="table">
                    <thead>
                    <tr></tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <div class="d-flex justify-content-end">
                    <div class="form-check"><input class="form-check-input" type="checkbox" value=""
                        id="flexCheckDefault"><label class="form-check-label"
                        for="flexCheckDefault"><span>未付款</span></label></div>
                </div>
                </div>
            </div>
            </div>
            <div class="modal-footer"><button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"> 取消
            </button><button type="button" class="btn btn-primary"> 修改付款狀態 </button></div>
        </div>
        </div>
    </div>
    <div class="modal fade" id="delModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
            <h5 class="modal-title"><span>刪除 </span></h5><button type="button" class="btn-close" data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body"> 是否刪除 <strong class="text-danger"></strong> (刪除後將無法恢復)。 </div>
            <div class="modal-footer"><button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消
            </button><button type="button" class="btn btn-danger">確認刪除 </button></div>
        </div>
        </div>
    </div> -->

    <!-- 分頁至中範例 -->
    <!-- <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
        <li class="disabled page-item"><a class="page-link" href="https://hexschool.github.io/live-vue3-dashboard/#"
            aria-label="Previous"><span aria-hidden="true">«</span></a></li>
        <li class="page-item disabled"><a class="page-link" href="https://hexschool.github.io/live-vue3-dashboard/#"
            aria-label="Next"><span aria-hidden="true">»</span></a></li>
        </ul>
    </nav> -->
    </div>
    <!-- {{ orders }} -->
    <!-- obj orders in props -->
    <!-- props 搞錯 以為是 data 結構 媽的結果浪費一堆時間 是 裡面的 props: [這個名稱] -->
    <!-- @get-orders="getOrders" -->
    <ObjOrdersEditModal :orderTemp="orderTemp" ref="orderEditMoadl" @resetorderlist="getOrders"></ObjOrdersEditModal>
    <ObjOrdersDelModal :orderTemp="orderTemp" ref="orderDelMoadl" @resetorderlist="getOrders"></ObjOrdersDelModal>
    <ObjPagination :pages="pagination" @get-data="getOrders"></ObjPagination>
</template>

<script>

import ObjOrdersEditModal from '@/components/Obj_OrdersEditModal.vue'
import ObjOrdersDelModal from '@/components/Obj_OrdersDelModal.vue'
import ObjPagination from '@/components/Obj_Pagination.vue'

export default {
    data() {
        return {
            orders: [],
            orderTemp: {},
            pagination: ''
        }
    },
    components: {
        ObjOrdersEditModal,
        ObjOrdersDelModal,
        ObjPagination
    },
    methods: {
        getOrders(page = 1){
            console.log('getOrders()')
            // const { id } = this.$route.params  // 解構的寫法
            this.$http(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/orders?page=${page}`)
            .then(res => {
                // console.log(res)
                // console.log(this.orders)
                this.orders = res.data.orders
                this.pagination = res.data.pagination
            })
            .catch(err => {
                console.log(err)
                console.dir(err)
            })
        },
        // 這裡需要分流 $ref上面的元件引用都一樣 現在編輯也開到了刪除  待解決
        openModal(status, item){
            // 做分流
            // 這邊解構 轉存置 orderTemp 傳入 Moadl 裡面 該筆的資訊
            this.orderTemp = { ...item }
            if (status === 'edit'){
                const orderEditMoadl = this.$refs.orderEditMoadl
                orderEditMoadl.openModal()
            } else if (status === 'del'){
                console.log(this.$refs)
                const orderDelModal = this.$refs.orderDelMoadl
                orderDelModal.openModal()
                // console.log(item.id, item)
            }
        }
    },
    mounted() {
        this.getOrders()
        // this.timeChange()
    }
}
</script>
