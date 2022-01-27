// 課程 API 申請：https://vue3-course-api.hexschool.io/
const url = 'https://vue3-course-api.hexschool.io/v2'
const path = 'ming123'
const app = Vue.createApp({
  data(){
    return{
      user : {
        "username": "",
        "password": ""
      },
    }
  },
  methods: {
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
          alert(`${err.status}, ${err.data.message}`)
        })
    },    
  },
})
app.mount('#app')
