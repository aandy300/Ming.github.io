// 課程 API 申請：https://vue3-course-api.hexschool.io/
const url = 'https://vue3-course-api.hexschool.io/v2'
const path = 'ming123'
const modal = document.querySelector('#exampleModal')
const delModal = document.querySelector('#delModal')
let myModal = ''
let mydelModal = ''
const app = Vue.createApp({
  data(){
    return{
      products : {        
      },
      temp:{        
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
          ],
          "id": ""
        },      
      },      
      isNew: false,
    }
  },
  methods: { 
    testt(){

    },
    checkInfo(item){            
      this.temp.data = item      
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
        alert(res.data.message);
      })
    },
    delData(delTargetId){
      axios.delete( `${url}/api/${ path }/admin/product/${ delTargetId }`)
      .then((res) =>{        
        this.temp = {}
        this.getData()
        console.log(delTargetId+ ' 已刪除此id商品')
      })
      .catch((err) =>{
        alert(res.data.message);
      })
    },
    // css面板調整 、 多圖片上傳問題
    addProductPOST(){      
      axios.post( `${url}/api/${ path }/admin/product`, this.temp)
      .then((res) =>{                
        console.dir('新增商品成功')
        this.getData()     
      })
      .catch((err) =>{
        alert(err.status + ' 請正確填寫商品資訊')
      })  
    },
    // 等改送出的OBJ格式
    // 因為openModal那邊已經更新資料(this.temp.data = { ...item } 包含ID了) 所以這裡直接引用TEMP的ID就可以了
    editProduct(){
      console.log(this.temp)
      axios.put( `${url}/api/${ path }/admin/product/${ this.temp.data.id }`, this.temp)
      .then((res) =>{        
        this.getData()
        console.log(res.status+ ' 成功修改商品')
      })
      .catch((err) =>{    
        alert(err.data.message);
      })
    },
    openModal(status, item){    
      if(status == 'edit'){
        myModal.show()
        this.temp.data = { ...item }        
      }
      else if(status == 'del'){
        mydelModal.show()
        console.log(item.id, item)
        this.temp.title = item.title
        this.temp.id = item.id
      }else if(status == 'new'){
        this.temp.data = {
          imagesUrl: [],     
        }
        myModal.show()
      } 
      
    },
    closeModal(status){      
      if(status == 'del'){
        mydelModal.hide()
      }else{
        myModal.hide()
      } 
    },
  },
  mounted() {    
    this.checkLogin()
    this.getData()
    myModal = new bootstrap.Modal(document.querySelector('#exampleModal'))
    // mydelModal = new bootstrap.Modal(document.querySelector('#exampleModal'))
    mydelModal = new bootstrap.Modal(document.querySelector('#delModal'))
    this.openModal('new')
  },


})
app.mount('#app')

