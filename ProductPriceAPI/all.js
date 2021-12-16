let ary = []; // 儲存用 - API抓下來的原始資料 
let nowData = []; // 儲存用 - 現在當下的資料
let state = 'all'; // 顯示分類狀態用

// 抓資料 axios
axios.get('https://hexschool.github.io/js-filter-data/data.json')
.then(function (response) {
    console.log('資料有回傳了')
    ary = response.data;
    console.log(`ary`, ary)    
    renderData(ary);
});

// DOM - 
const showList = document.querySelector('.showList')
const vegetablesBtn = document.querySelector('.vegetablesBtn')
const fruitsBtn = document.querySelector('.fruitsBtn')
const flowersBtn = document.querySelector('.flowersBtn')
const inputTxt = document.querySelector('.rounded-end')
const searchBtn = document.querySelector('.search')
const inputBox = document.querySelector('.rounded-end')
const js_sort_advanced = document.querySelector('.js-sort-advanced')
const js_select = document.querySelector('#js-select') 

// #監聽類

// 監聽 - 排序篩選 這裡只傳值
js_select.addEventListener('change',e => {
  console.log(js_select.value)
  let sortSelect = e.target.value
  sortSelectdatas(sortSelect)  
  console.log('js_select')
})

// 監聽 - 排序小三角按鈕
js_sort_advanced.addEventListener('click', e =>{
  sortData(e)
})
// 監聽 - 搜尋按鈕
searchBtn.addEventListener('click', e =>{      
  renderData(nowData, 'serach')
})
// 監聽 - 搜尋按鈕 Enter
inputBox.addEventListener('keypress', function (e) {
  if(e.key === 'Enter'){
    renderData(nowData, 'serach')
  }
})

// 監聽 - 蔬果按鈕
vegetablesBtn.addEventListener('click', e =>  {  
  let oldActive = document.querySelector('.active');  
  console.log('123',oldActive);  
  vegetablesBtn.classList.toggle('active');
  listen_state_active_Check('Vegetables', oldActive)
  renderData_Check();
})
// 監聽 - 水果按鈕
fruitsBtn.addEventListener('click', e =>  {  
  let oldActive = document.querySelector('.active');  
  console.log('123',oldActive);
  fruitsBtn.classList.toggle('active');  
  listen_state_active_Check('Fruits', oldActive)
  renderData_Check();
})
// 監聽 - 花朵按鈕
flowersBtn.addEventListener('click', e =>  {  
  let oldActive = document.querySelector('.active');  
  console.log('123',oldActive);
  flowersBtn.classList.toggle('active');
  listen_state_active_Check('Flowers', oldActive)
  renderData_Check();
})

// #功能類

// 反向分類狀態用 如果狀態一樣切回all 如果不是切換成選擇的狀態
function listen_state_active_Check(Chose_state, oldActive){
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

// 資料排序 - 拉霸 疑問 為啥物件可以[]?
function sortSelectdatas(sortSelect){
  console.log('sortSelectdatas()')
  let sortDatas = []
  sortDatas = nowData.sort((a,b) => {
    // console.log(a[sortSelect])
    return b[sortSelect] - a[sortSelect]
  })
  console.log(sortDatas, nowData)
  renderData(sortDatas, 'sortDatas')
}

// 資料排序 - 小三角
function sortData(e){  
  if(e.target.nodeName !== "I"){
    return
  }
    // 抓埋的資訊 price = 上價 sortName = up down
    let sortName = e.target.dataset.sort
    let price = e.target.dataset.price        
    // console.log('typeof', typeof(ary), typeof(ary[0]), typeof(ary[0][price]))
    let sortDatas =[]
    if(sortName == 'up'){
      sortDatas = nowData.sort((a,b)=>{
        return b[price] - a[price]
      })  
      console.log(sortDatas)
      renderData(sortDatas, 'sortDatas')
    }else{
      sortDatas = nowData.sort((a,b)=> a[price] - b[price])      
      renderData(sortDatas, 'sortDatas')
    }
}

// 渲染分流 - 狀態確認+輸入篩選條件
function renderData_Check(){
  console.log(`renderData_Check()`)  
  if(state == 'all'){
    renderData(ary);
    console.log(`renderData();`)
  }else if (state == 'Vegetables'){
    renderData(ary, 'N04')
    console.log(`renderData_Vegetables();`)
  }else if (state == 'Fruits'){
    renderData(ary, 'N05')
    console.log(`renderData_Fruits();`)
  }else if (state == 'Flowers'){
    renderData(ary, 'N06')
    console.log(`renderData_Flowers();`)
  }    
}

// 寫入用 str樣板 +=用
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

// 渲染 - 硬幣
function renderData(datas, filterNum){
  let str = "";
  let aryTemp = [];
  // console.log(datas, aryTemp, filterNum, typeof(filterNum))
  if(filterNum == undefined){ // 渲染 - 全部+原始資料
    aryTemp = datas
    aryTemp.forEach(item => str+= strTemplate(item))
    showList.innerHTML = str;
    nowData = ary
  }else if(filterNum == 'sortDatas'){ // 渲染 - 排序用 當下資料
    nowData.forEach(item => str+= strTemplate(item))
    showList.innerHTML = str;    
  }else if (filterNum == 'serach'){ // 渲染 - 搜尋用 當下資料挑輸入框內容
    aryTemp = nowData.filter((item => String(item.作物名稱).match(inputTxt.value)))
    if(inputTxt.value === ''){
      alert('請正確輸入查詢內容!')
    }else if(aryTemp.length == 0){      
      showList.innerHTML = `搜尋結果為:0 ，請正確輸入並搜尋想比價的作物名稱^＿^`
    }else{
      console.log(aryTemp)
      aryTemp.forEach(item => str+= strTemplate(item))
      showList.innerHTML = str;
      nowData = aryTemp
    }    
  }else if(filterNum !== 'underfined'){ // 渲染 - 種類代碼篩選
    aryTemp = datas.filter(item => item.種類代碼 == filterNum)
    aryTemp.forEach(item => str+= strTemplate(item))
    showList.innerHTML = str;
    nowData = aryTemp
    console.log(nowData)
  }
}

renderData(ary)