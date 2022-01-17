// const { get } = require("lodash")

const url = 'https://vue3-course-api.hexschool.io/v2'
const path = 'ming123'
const app = Vue.createApp({
  data(){
    return{
      user : {
        "username": "",
        "password": ""
      },
      products : {        
      },
      temp:{        
      }
    }
  },
  methods: {
    testConsolelog(){
      console.log(this.user)
    },
    siginIn(){
      axios.post( `${url}/admin/signin`,this.user)
        .then(function(res){
          console.log(res)
          const {token, expired} = res.data
          document.cookie = `mingToken=${ token }; expires=${ new Date(expired) }`
          console.log('8 8 8 ')            
          window.location = 'list.html'
        })
        .catch(function(err){
          console.dir(err)
          console.log(err)
        })
    },
    getToken(){
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)mingToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = token
      console.log('getToken()')
    },
    checkLogin(){
      // axios.get( `${url}/api/user/check`)
      // https://vue3-course-api.hexschool.io/v2/api/user/check
      axios.post( 'https://vue3-course-api.hexschool.io/v2/api/user/check' )
      .then(function(res){
        console.log('checkLogin()', res)
      })
      .catch(function(err){
        console.dir(err)
        console.log(err)
      })
    },
    getData(){
      axios.get( `${url}/api/${ path }/admin/products`)
      .then((res) =>{
        console.log('getData()', res)
        console.log(typeof( res.data.products))

        this.products = res.data.products
        // this.temp = {name : ming}
        console.log('123', this.products[0])        
      })
      .catch(function(err){
        console.dir(err)
        console.log(err)
      })
    },
    delData(delTargetId){
      axios.delete( `${url}/api/${ path }/admin/product/${ delTargetId }`)
      .then((res) =>{
        console.log('delData()', res)
        this.temp = {}
      })
      .catch(function(err){
        console.dir(err)
        console.log(err)
      })
    }
  },
  
})
app.mount('#app')



user = {
  "username": "ming123@gmail.com",
  "password": "ming123"
}
// axios.post('https://vue3-course-api.hexschool.io/admin/signin',user)
// axios.post('https://vue3-course-api.hexschool.io​/admin​/signin',user) // 這行不知道為啥 404? U+200b隱藏字元的關係?


// axios.post( `${url}/admin/signin`,user)
// .then(function(res){
//   const {token, expired} = res.data
//   console.log(res)
//   console.log(`token: ${token}`)
//   console.log(`expired: ${expired}`)
//   document.cookie = `mingToken=${ token }; expires=${ new Date(expired) }`
// })
// .catch(function(err){
//   console.dir(err)
//   console.log(err)
// })
