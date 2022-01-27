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
      },
      text: '123',
      addProduct:{        
        "data": {
          "title": "[賣]動物園造型衣服3",
          "category": "衣服2",
          "origin_price": 100,
          "price": 300,
          "unit": "個",
          "description": "Sit down please 名設計師設計",
          "content": "這是內容",
          "is_enabled": 1,
          "imageUrl": "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80",
          "imagesUrl": [
            "",
            "",
            "",
            "",
            ""
          ]
        }        
      }
    }
  },
  methods: {  
    testfunc(){
      console.log(this.temp)
    },
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
        console.log(delTargetId)
      })
      .catch((err) =>{
        console.dir(err)
        console.log(err)
      })
    },
    addProductPOST(){
      axios.post( `${url}/api/${ path }/admin/product`, this.addProduct)
      .then((res) =>{                
        console.dir('新增商品成功')
        this.getData()     
      })
      .catch((err) =>{
        console.dir(err)
        console.log(err)
        alert(err.status + ' 請正確填寫商品資訊')
      })  
    },
    openModal(){      
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
    this.openModal()
  },


})
app.mount('#app')
