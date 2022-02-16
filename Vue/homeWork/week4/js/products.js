// 課程 API 申請：https://vue3-course-api.hexschool.io/
const url = 'https://vue3-course-api.hexschool.io/v2'
const path = 'ming123'

let myModal = ''
let mydelModal = ''

// 元件 import
import { del_obj, new_edit_obj } from '../component/modalComponent.js'
import { pagination_obj } from '../component/pagination.js'

const app = Vue.createApp({
  data(){
    return{
      products : {        
      },
      temp:{        
        "data": {},      
      },      
      isNew: false,
      pagination: {},
    }
  },
  components:{
    del_obj,
    new_edit_obj,
    pagination_obj,
  }
  ,
  methods: { 
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
    // 追加 更改成 抓資料分頁Ver
    // (page = 1) 預設值
    getData(page = 1){
      axios.get( `${url}/api/${ path }/admin/products/?page=${ page }`)
      .then((res) =>{                
        this.products = res.data.products
        this.pagination = res.data.pagination
      })
      .catch((err) =>{
        alert(err.data.message);
      })
    },
    delData(){
      axios.delete( `${url}/api/${ path }/admin/product/${ this.temp.id }`)
      .then((res) =>{        
        this.temp.data = {
          imagesUrl: [],     
        }
        this.getData()
        console.log(` ${ this.temp.id }`+ ' 已刪除此id商品')
      })
      .catch((err) =>{
        alert(err.data.message);
      })
    },
    // css面板調整 、 多圖片上傳問題
    addProductPost(){      
      console.log('addProductPost')
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
      console.log('editProduct')
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
    // 換成老師的 Modal 模板
    myModal = new bootstrap.Modal(document.querySelector('#productModal'))
    mydelModal = new bootstrap.Modal(document.querySelector('#delProductModal'))        
    // this.openModal('new')
  },


})
app.mount('#app')

