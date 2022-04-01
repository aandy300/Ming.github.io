<template>
    <div class="container-fluid mt-3 position-relative">
        <table class="table mt-9">
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
    </div>

    <!-- 元件 -->
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
            // 這邊解構 轉存置 orderTemp 傳入 Moadl 裡面 該筆的資訊
            this.orderTemp = { ...item }
            if (status === 'edit'){
                const orderEditMoadl = this.$refs.orderEditMoadl
                orderEditMoadl.openModal()
            } else if (status === 'del'){
                console.log(this.$refs)
                const orderDelModal = this.$refs.orderDelMoadl
                orderDelModal.openModal()
            }
        }
    },
    mounted() {
        this.getOrders()
    }
}
</script>
