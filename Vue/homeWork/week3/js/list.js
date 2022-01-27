// 課程 API 申請：https://vue3-course-api.hexschool.io/
const url = 'https://vue3-course-api.hexschool.io/v2'
const path = 'ming123'
const modal = document.querySelector('#exampleModal')
let myModal = ''
const app = Vue.createApp({
  data(){
    return{
      products : {        
      },
      temp:{        
      }
    }
  },
  methods: {   
    checkLogin(){
      // token處理
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)mingToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = token
      // token處理結束
      axios.post( 'https://vue3-course-api.hexschool.io/v2/api/user/check' )
      .then((res) =>{
        console.log('checkLogin()', res)
      })
      .catch((err) =>{        
        window.location = 'index.html'
        alert('token錯誤，將轉回登入頁面!')
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
        this.getData()
      })
      .catch((err) =>{
        console.dir(err)
        console.log(err)
      })
    },
    openModal(){
      console.log('first');
      myModal.show()      
    },
    closeModal(){      
      myModal.hide()
    },
  },
  mounted() {    
    this.checkLogin()
    this.getData()
    myModal = new bootstrap.Modal(document.querySelector('#exampleModal'))
  },


})
app.mount('#app')
