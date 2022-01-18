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
        .then((res) => {
          console.log(res)
          const {token, expired} = res.data
          document.cookie = `mingToken=${ token }; expires=${ new Date(expired) }`          
          window.location = 'list.html'
        })
        .catch((err) => {
          console.dir(err)
          console.log(err)
        })
    },
    getToken(){
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)mingToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = token      
    },
    checkLogin(){
      axios.post( 'https://vue3-course-api.hexschool.io/v2/api/user/check' )
      .then((res) =>{
        console.log('checkLogin()', res)
      })
      .catch((err) =>{
        console.dir(err)
        console.log(err)
      })
    },
    getData(){
      axios.get( `${url}/api/${ path }/admin/products`)
      .then((res) =>{                
        this.products = res.data.products
      })
      .catch((err) =>{
        console.dir(err)
        console.log(err)
      })
    },
    delData(delTargetId){
      axios.delete( `${url}/api/${ path }/admin/product/${ delTargetId }`)
      .then((res) =>{        
        this.temp = {}
      })
      .catch((err) =>{
        console.dir(err)
        console.log(err)
      })
    }
  },
  mounted() {
    this.getToken()
    this.checkLogin()
    this.getData()    
  },  
})
app.mount('#app')
