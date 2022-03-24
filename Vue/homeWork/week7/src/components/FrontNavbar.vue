<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/"><h2>首頁</h2></router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/admin/login" >後台</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="products" >商品列表</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="cart" >購物車</router-link>
                </li>
                <!-- <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li> -->
            </ul>
            </div>
        </div>
        <button type="button" class="btn btn-primary">
            結帳
            <span class="badge  rounded-pill bg-danger">{{ cartData.carts.length }}</span>
            <!-- 抓不到結構解法 ? 版本 -->
            <!-- <span class="badge  rounded-pill bg-danger">{{ cartData?.carts?.length }}</span> -->
        </button>
    </nav>
</template>

<script>

import emitter from '@/libs/emitter'

export default {
    data() {
        return {
            cartData: {
                carts: []
            }
        }
    },
    methods: {
        getCart() {
          this.$http.get(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/cart`)
            .then((res) => {
              this.cartData = res.data.data
              console.log('getCart()', res)
            })
            .catch((err) => {
              alert(err.data.message)
            })
        }
    },
    mounted() {
        this.getCart()
        // 監聽目標 get-cart 觸發時 執行以下
        emitter.on('get-cart', () => {
            this.getCart()
        })
    }
}
</script>
