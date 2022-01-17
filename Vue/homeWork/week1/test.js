const data = {
    ming:{
        name: 'ming',
        price: '100'
    },
}
console.log(data?.jax?.age) // undefined
console.log(data.jax.age) // Uncaught TypeError: Cannot read properties of undefined (reading 'age') at test.js:10:22


const app ={
    //關注點分離    
    data(){        
        // function return 得用傳統函式 箭頭和傳統函式是不一樣的
        return{

        }
    }
}