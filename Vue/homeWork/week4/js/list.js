// 課程 API 申請：https://vue3-course-api.hexschool.io/
const url = 'https://vue3-course-api.hexschool.io/v2'
const path = 'ming123'
// 換成老師的 Modal
const modal = document.querySelector('#productModal')
const delProductModal = document.querySelector('#delModal')

let myModal = ''
let mydelModal = ''


// 元件化 del temp 等幾絕 import export 問題
const del_obj ={
  data(){
    return{
      insideId: '',
      newTemp: ''
    }
  },
  props:[ 'temp' ],
  created(){
    this.newTemp = this.temp
  },
  methods:{
    closeModal(value){
      this.$emit('closeModal', value)
    },
    delData(){
      this.$emit('delData')
    },
  },
  template:  
  `
  <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{  }} 待 修正 外面要帶入 temp.data.title  </strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="closeModal('del') , delData()">確認刪除</button>
        </div>
      </div>
    </div>        
  </div>
  `  
}
const new_edit_obj ={
  data(){
    return{
      newTemp: '',
      inside_isNew: false
    }
  },
  methods:{
    closeModal(){
      this.$emit('closeModal')
    },
    addProductPost(){
      console.log('inside post add')
      this.$emit('addProductPost')
    },
    editProduct(){
      this.$emit('editProduct')
    }
  },
  updated () { 
    this.inside_isNew = this.isNew
  },
  props:[ 'temp', 'isNew' ],
  created() {
    this.newTemp = this.temp
    this.inside_isNew = this.isNew
  },
  template:  
  `
      <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span v-if="inside_isNew">新增產品</span>
              <span v-else>編輯產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">主要圖片</label>
                  <input v-model="temp.data.imageUrl" type="text" class="form-control mb-2" placeholder="請輸入圖片連結">
                  <img class="img-fluid" :src="temp.data.imageUrl">
                </div>
                <h3 class="mb-3">多圖新增</h3>
                <div v-if="Array.isArray(temp.data.imagesUrl)">
                  <div class="mb-1" v-for="(image, key) in temp.data.imagesUrl" :key="key">
                    <div class="mb-3">
                      <label for="imageUrl" class="form-label">圖片網址</label>
                      <input v-model="temp.data.imagesUrl[key]" type="text" class="form-control"
                        placeholder="請輸入圖片連結">
                    </div>
                    <img class="img-fluid" :src="image">
                  </div>
                  <div
                    v-if="!temp.data.imagesUrl.length || temp.data.imagesUrl[temp.data.imagesUrl.length - 1]">
                    <button class="btn btn-outline-primary btn-sm d-block w-100"
                      @click="temp.data.imagesUrl.push('')">
                      新增圖片
                    </button>
                  </div>
                  <div v-else>
                    <button class="btn btn-outline-danger btn-sm d-block w-100" @click="temp.data.imagesUrl.pop()">
                      刪除圖片
                    </button>
                  </div>
                </div>
                <div v-else>
                  <button class="btn btn-outline-primary btn-sm d-block w-100"
                    >@click="createImages" 移除的 這功能還沒做
                    新增圖片
                  </button>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input id="title" v-model="temp.data.title" type="text" class="form-control" placeholder="請輸入標題">
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input id="category" v-model="temp.data.category" type="text" class="form-control"
                      placeholder="請輸入分類">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位</label>
                    <input id="unit" v-model="temp.data.unit" type="text" class="form-control" placeholder="請輸入單位">
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input id="origin_price" v-model.number="temp.data.origin_price" type="number" min="0"
                      class="form-control" placeholder="請輸入原價">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input id="price" v-model.number="temp.data.price" type="number" min="0" class="form-control"
                      placeholder="請輸入售價">
                  </div>
                </div>
                <hr>

                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea id="description" v-model="temp.data.description" type="text" class="form-control"
                    placeholder="請輸入產品描述">
                </textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea id="description" v-model="temp.data.content" type="text" class="form-control"
                    placeholder="請輸入說明內容">
                </textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input id="is_enabled" v-model="temp.data.is_enabled" class="form-check-input" type="checkbox"
                      :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>            
            <button v-if="inside_isNew = inside_isNew" type="button" class="btn btn-primary" @click="closeModal() , addProductPost()">確認新增</button>            
            <button v-else type="button" class="btn btn-primary" @click="closeModal() , editProduct()">確認修改</button>
          </div>
        </div>
      </div>
      </div>
  `  
}
const app = Vue.createApp({
  data(){
    return{
      products : {        
      },
      lastInfo : '',
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
  components:{
    del_obj,
    new_edit_obj
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
    getData(){
      axios.get( `${url}/api/${ path }/admin/products`)
      .then((res) =>{                
        this.products = res.data.products
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

