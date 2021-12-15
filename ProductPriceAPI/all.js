// API先把資料抓下來 > 資料儲存 > 把資料篩進去(HTML)

let ary = [];
let state = 'all';
axios.get('https://hexschool.github.io/js-filter-data/data.json')
.then(function (response) {
    console.log('資料有回傳了')
    ary = response.data;
    console.log(`ary`, ary)
    renderCoin(ary);
});




const showList = document.querySelector('.showList')
const vegetablesBtn = document.querySelector('.vegetablesBtn')
const fruitsBtn = document.querySelector('.fruitsBtn')
const flowersBtn = document.querySelector('.flowersBtn')
const inputTxt = document.querySelector('.rounded-end')
const searchBtn = document.querySelector('.search')


// 監聽類

searchBtn.addEventListener('click', e =>{
  // #搜尋render
  console.log(inputTxt.value)
  console.log(typeof(inputTxt.value))

  let str = ''
  // filterAry = ary.filter(item => item.作物名稱 == inputTxt.value)
  filterAry = ary.filter((item) => {
    // return item.作物名稱.match(inputTxt.value); // 不知道為啥不被當作是str 用typeof測試 是str
    // 救星 JavaScript 錯誤：“val.match 不是函數”: https://stackoverflow.com/questions/4882691/javascript-error-val-match-is-not-a-function
    // 正則篩選參考: https://cythilya.github.io/2017/05/08/javascript-find-item-in-an-array/
    return String(item.作物名稱).match(inputTxt.value)
    console.log('item123',item.作物名稱)
    console.log(typeof(item.作物名稱))
  })
  console.log('filterAry',filterAry)
  console.log(inputTxt.value)
  filterAry.forEach(item => str+= strTemplate(item))
  showList.innerHTML = str;     
  console.log(inputTxt.value)
})

// 監聽 - 蔬果按鈕
vegetablesBtn.addEventListener('click', e =>  {  
  let oldActive = document.querySelector('.active');  
  console.log('123',oldActive);  
  vegetablesBtn.classList.toggle('active');
  listen_tate_active_Check('Vegetables', oldActive)
  renderData_Chick();
})
// 監聽 - 水果按鈕
fruitsBtn.addEventListener('click', e =>  {  
  let oldActive = document.querySelector('.active');  
  console.log('123',oldActive);
  fruitsBtn.classList.toggle('active');  
  listen_tate_active_Check('Fruits', oldActive)
  renderData_Chick();
})
// 監聽 - 花朵按鈕
flowersBtn.addEventListener('click', e =>  {  
  let oldActive = document.querySelector('.active');  
  console.log('123',oldActive);
  flowersBtn.classList.toggle('active');
  
  listen_tate_active_Check('Flowers', oldActive)
  renderData_Chick();
})

function listen_tate_active_Check(Chose_state, oldActive){
  if(state == Chose_state){
    state = 'all'    
  }else{
    state = Chose_state;
  } 
  if (oldActive == null){  
  }else{
    oldActive.classList.remove('active');
    console.log(`remove('active');`)
  } 
}


// 功能類

function renderData_Chick(){
  console.log(`renderData_Chick()`)  
  if(state == 'all'){
    renderCoin(ary);
    console.log(`renderData();`)
  }else if (state == 'Vegetables'){
    renderCoin(ary, 'N04')
    console.log(`renderData_Vegetables();`)
  }else if (state == 'Fruits'){
    renderCoin(ary, 'N05')
    console.log(`renderData_Fruits();`)
  }else if (state == 'Flowers'){
    renderCoin(ary, 'N06')
    console.log(`renderData_Flowers();`)
  }    
}

// 寫入用的html格式 str樣板 +=用
function strTemplate(item){
  let style = 
  `
  <tr>
    <td>${item.作物名稱}</td>
    <td>${item.市場名稱}</td>
    <td>${item.上價}</td>
    <td>${item.中價}</td>
    <td>${item.下價}</td>
    <td>${item.平均價}</td>
    <td>${item.交易量}</td>
  </tr>
  `
  return style
}

// 渲染 - 蔬果類
// function renderData_Vegetables(){
//   // let str = "";
//   // // let vegetablesList = ary.filter(function(item){
//   // //   return item.種類代碼 == 'N05';
//   // // })
//   // let vegetablesList = ary.filter(item => item.種類代碼 == 'N04')   
//   // vegetablesList.forEach(function(item, index){
//   //   str+= strTemplate(item)
//   // })
//   // showList.innerHTML = str;  
//   renderCoin(ary, 'N04')
// }
// 渲染 - 水果類
// function renderData_Fruits(){
//   // let str = "";  
//   // let vegetablesList = ary.filter(item => item.種類代碼 == 'N05')   
//   // vegetablesList.forEach(function(item, index){
//   //   str+= strTemplate(item)
//   // })
//   // showList.innerHTML = str;  
//   renderCoin(ary, 'N05')
// }
// 渲染 - 花朵類
// function renderData_Flowers(){
//   // let str = "";  
//   // let flowersList = ary.filter(item => item.種類代碼 == 'N06')   
//   // flowersList.forEach(function(item, index){
//   //   str+= strTemplate(item)
//   // })
//   // showList.innerHTML = str;
//   renderCoin(ary, 'N06')
// }

// 渲染 - 硬幣
function renderCoin(datas, filterNum){
  let str = "";
  let aryTemp = [];
  console.log(datas, aryTemp, filterNum, typeof(filterNum))
  if(filterNum == undefined){
    // all render #渲染 普通
    ary.forEach(function(item, index){
      str+= strTemplate(item)
    })
    showList.innerHTML = str;
    console.log(`redercoin if();` )
  }else if(filterNum !== 'underfined'){
    aryTemp = datas.filter(item => item.種類代碼 == filterNum)
    aryTemp.forEach((item => str+= strTemplate(item)))
    showList.innerHTML = str;
  }  
}
// renderCoin(ary, 'flower')
// 渲染 - 普通
// function renderData(){
  // let str = "";
  // ary.forEach(function(item, index){
  //   str+= `
  //         <tr>
  //           <td>${item.作物名稱}</td>
  //           <td>${item.市場名稱}</td>
  //           <td>${item.上價}</td>
  //           <td>${item.中價}</td>
  //           <td>${item.下價}</td>
  //           <td>${item.平均價}</td>
  //           <td>${item.交易量}</td>
  //         </tr>
  //         `
  // })
  // showList.innerHTML = str;     
  // console.log(`rederData();`, ary)
  // renderCoin(ary)
// }
// renderData();
renderCoin(ary)