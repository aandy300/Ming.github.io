// 這個先廢掉 沒辦法修正 footer 而且其實 直接轉到付款單頁就好
<template>
<div class="container">
    <!-- <div class="row"> -->
        <div class="container container-fluid mt-3 mb-2 position-relative">
        <h4 class="mb-5">我的訂單</h4>
        <!--  -->
        <div class="position-relative m-4">
            <div class="progress" style="height: 1px;">
                <div class="progress-bar" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <button type="button" class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill" style="width: 2rem; height:2rem;"></button>
            <button type="button" class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill" style="width: 2rem; height:2rem;">2</button>
            <button type="button" class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill" style="width: 2rem; height:2rem;">3</button>
        </div>
            <table class="table mt-3">
                <thead>
                <tr>
                    <th>購買時間</th>
                    <th>應付金額</th>
                    <th>是否付款</th>
                    <th>編輯</th>
                </tr>
                </thead>
                <tbody></tbody>
                <tbody id="productList">
                    <tr v-for=" item in orders" :key="item.id">
                        <!-- ! 傻眼 可以直接使用在下面這行 不需要 func() 去轉換 or 物件轉陣列再轉換 暈倒.... -->
                        <!-- 轉換成ISO格式 > 以T分隔轉換成陣列 > 轉乘字串 > 刪除尾巴五個字元 0, -5 > 文字取代 , to - -->
                        <td width="120">{{ new Date(item.create_at * 1000).toISOString().split('T').toString().slice(0, -5).replace(',', '-') }}</td>
                        <td width="100"> $ {{ item.total }}  </td>
                        <td width="100">
                            <span v-if="item.is_paid" class="text-success">已付款</span>
                            <span v-else class="text-danger">尚未付款</span>
                        </td>
                        <td width="120">
                            <div class="btn-group">
                            <button @click="openModal(item)" type="button" class="btn btn-outline-primary btn-sm">
                                收件資訊
                            </button>
                            <router-link :to="`/pay/${item.id}`">
                                <button type="button" class="btn btn-outline-danger btn-sm">
                                前去付款
                                </button>
                            </router-link>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mb-10"></div>
    <!-- </div> -->
</div>
    <ModalEdit ref="modaledit" :single-order-data-temp="singleOrderDataTemp"></ModalEdit>
    <!-- 元件 -->
    <!-- <ObjOrdersEditModal :orderTemp="orderTemp" ref="orderEditMoadl" @resetorderlist="getOrders"></ObjOrdersEditModal>
    <ObjOrdersDelModal :orderTemp="orderTemp" ref="orderDelMoadl" @resetorderlist="getOrders"></ObjOrdersDelModal>
    <ObjPagination :pages="pagination" @get-data="getOrders"></ObjPagination> -->
</template>

<script>

// import ObjOrdersEditModal from '@/components/Obj_OrdersEditModal.vue'
// import ObjOrdersDelModal from '@/components/Obj_OrdersDelModal.vue'
import ModalEdit from '@/components/ModalEdit.vue'

export default {
    data() {
        return {
            orders: [],
            singleOrderDataTemp: {},
            pagination: ''
        }
    },
    components: {
        // ObjOrdersEditModal,
        // ObjOrdersDelModal,
        ModalEdit
    },
    methods: {
        getOrders(page = 1){
            // const { id } = this.$route.params  // 解構的寫法
            this.$http(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/orders?page=${page}`)
            .then(res => {
                this.orders = res.data.orders
                this.pagination = res.data.pagination
            })
        },
        // 這裡需要分流 $ref上面的元件引用都一樣 現在編輯也開到了刪除  待解決
        openModal(data){
            // 這邊解構 轉存置 orderTemp 傳入 Moadl 裡面 該筆的資訊
            this.singleOrderDataTemp = { ...data }
            const ModalEdit = this.$refs.modaledit
            ModalEdit.openModal()
            // else if (status === 'del'){
            //     const orderDelModal = this.$refs.orderDelMoadl
            //     orderDelModal.openModal()
            // }
        }
    },
    mounted() {
        this.getOrders()
    }
}
</script>
