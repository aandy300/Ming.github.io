// 備註的用掉才能看正常登入 css 樣式 看不懂B5
<template>
        <div class="container mt-5">
            <form class="row justify-content-center" @submit.prevent="signIn">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
                        <div class="mb-2">
                            <!-- <div class="col-4"> -->
                                <form id="form" class="form-signin">
                                <div class="form-floating mb-3">
                                    <input v-model="user.username" type="email" class="form-control" id="username"
                                    placeholder="name@example.com" required autofocus>
                                    <label for="username">Email address</label>
                                </div>
                                <div class="form-floating">
                                    <input v-model="user.password" type="password" class="form-control" id="password"
                                    placeholder="Password" required>
                                    <label for="password">Password</label>
                                </div>
                                <button v-on:click=" siginIn() " class="btn btn-lg btn-primary w-100 mt-3" type="button">
                                    登入
                                </button>
                                </form>
                            <!-- </div> -->
                        </div>
                    </div>
                </div>
            </form>
      </div>
</template>

// 主要登入而已
<script>
export default {
    data() {
        return {
            user: {
                // eslint-disable-next-line quote-props
                'username': '',
                 // eslint-disable-next-line quote-props
                'password': ''
            }
        }
    },
    methods: {
        siginIn(){
        this.$http.post(`${process.env.VUE_APP_url}/admin/signin`, this.user)
        .then((res) => {
          console.log(res)
          const { token, expired } = res.data // 抓出 token & 到期時間
          document.cookie = `mingToken=${token}; expires=${new Date(expired)}` // token有效時間
        //   window.location = 'products.html' // 原本跳轉頁面
        this.$router.push('/admin/products') // $router.push() 取代原先跳轉頁面
        })
        .catch((err) => {
          console.dir(err)
          console.log(err)
          alert(`${err.status}, ${err.data.message}`)
        })
    }
    },
    mounted() {
        console.log('跑登入', this.user.username, this.user.password)
    }
}
</script>
