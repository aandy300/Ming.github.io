// card 元件

const url = 'https://vue3-course-api.hexschool.io/v2'
const path = 'ming123'



const app = Vue.createApp({
  data() {
    return {
      cartData: {},
      products: [],
      productsID: '',  
      isLoadingItem: '',        
    }
  },
  methods: {
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
  props:[ 'id' ],
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
  },
})

app.mount('#app');