// card 元件

const url = 'https://vue3-course-api.hexschool.io/v2'
const path = 'ming123'

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

// VeeValidateI18n-loadLocaleFromURL 載入 中文語系 的對應 驗證資訊訊息
loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

// VeeValidate 使用和相關設定 
configure({ 
  generateMessage: localize('zh_TW'), //啟用 locale
  validateOnInput: true, // 輸入文字時立刻驗證 
});

const app = Vue.createApp({
  data() {
    return {
      cartData: {
        // length 無校關係 生命週期原因 所以這裡事先寫好結構
        carts:[]
      },
      products: [],
      productsID: '',  
      isLoadingItem: '',
      form: {
				user: {
					name: '',
					email: '',
					tel: '',
					address: '',
				},
				message: '',
			},    
    }
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  methods: {
    // rules 中可自訂函式來驗證結果 - 使用 v-bind 綁定 :rules="isPhone"
    // 正則表達來自定規則
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼' // phoneNumber.test(外面表單輸入的值?) ? true的結果 : false的結果 嗎
    },
    getData(){      
      axios.get( `${ url }/api/${ path }/products/all`)
      .then((res) =>{                    
        this.products = res.data.products
        console.log('getData()', res)       
      })
      .catch((err) =>{
        alert(err.data.message);
      })
    },
    openProductMoadl(id){
      console.log('openProductMoadl(id)')
      this.productsID = id
      this.$refs.productModal.openMoadl()
    },
    getCart(){
      axios.get( `${ url }/api/${ path }/cart`)
      .then((res) =>{                    
        this.cartData = res.data.data
        console.log('getCart()', res)
      })
      .catch((err) =>{
        alert(err.data.message);
      })
    },    
    addToCart(id, qty = 1){
      const data = {
        product_id: id,
        qty,
      } 
      // :disabled用   
      this.isLoadingItem = id  
      axios.post( `${ url }/api/${ path }/cart`, {data} )
      .then((res) =>{                            
        console.log('addToCart()', res)
        this.getCart()
        // :disabled停止用
        this.isLoadingItem = ''
        this.$refs.productModal.closeMoadl()        
      })
      .catch((err) =>{
        alert(err.data.message);
      })
    },
    removeCartItem(id){
      this.isLoadingItem = id  
      axios.delete( `${ url }/api/${ path }/cart/${id}`)
      .then((res) =>{                            
        console.log('removeCartItem()', res)
        this.getCart()        
        this.isLoadingItem = ''
      })
      .catch((err) =>{
        alert(err.data.message);
      })
    },
    updataCartItem(item){
      const data = {
        product_id: item.id,
        qty: item.qty,
      }       
      this.isLoadingItem = item.id  
      axios.put( `${ url }/api/${ path }/cart/${item.id}`, {data} )
      .then((res) =>{                            
        console.log('updataCartItem()', res)
        this.getCart()        
        this.isLoadingItem = ''
      })
      .catch((err) =>{
        alert(err.data.message);
      })
    },
    removeAllCartItem(){
      axios.delete( `${ url }/api/${ path }/carts`)
      .then((res) =>{                            
        console.log('removeAllCartItem()', res)        
        this.getCart()
      })
      .catch((err) =>{
        alert(err.data.message);
      })
    },
    createOrder(){
      const order = this.form
      axios.post( `${ url }/api/${ path }/order`, { data: order } )      
      .then((res) =>{                            
        console.log('createOrder()', res)
        this.$refs.form.resetForm()        
        this.getCart()
        this.form.message = ''
        alert('已送出訂單')        
      })
      .catch((err) =>{
        alert(err.data.message);
      })
    }
  },
  mounted() {
    this.getData()
    this.getCart()
  },
  
})
// 元件 productModal
app.component('productModal', {
  data() {
    return {
      modal: {},
      product: {},
      qty: 1,
    }
  },
  props:[ 'id', 'isLoadingItem' ],
  template: '#userProductModal',
  watch:{
    id(){
      this.getInfo()
    }
  },
  methods: {
    openMoadl(){
      this.modal.show()
    },
    closeMoadl(){
      this.modal.hide()
    },
    getInfo(){
      axios.get( `${url}/api/${ path }/product/${ this.id }` )
      .then((res) =>{                                
        console.log(res)
        this.product = res.data.product
      })
      .catch((err) =>{    
        alert(err.data.message);
      })
    },
    addToCart(){
      this.$emit('add-cart', this.product.id, this.qty )
      this.qty = 1 
    }
  },
  mounted(){
    this.modal = new bootstrap.Modal(this.$refs.modal)
    console.log('VeeValidate', VeeValidate)
  },
})

app.mount('#app');

