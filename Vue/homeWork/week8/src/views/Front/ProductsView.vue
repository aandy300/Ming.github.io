<template>
    <!-- 分類 -->
    <nav class="navbar navbar-expand-lg navbar-light justify-content-center border border-start-0 border-end-0 border-top border-bottom">
      <div class="navbar-nav flex-row overflow-auto navbar-custom-scroll">
        <!-- 點擊後改 data === 會無效 一個 = 就好 -->
        <a class="nav-item nav-link text-nowrap px-2" @click="category = 'all'" onclick="event.preventDefault()" href="#">全部商品</a>
        <a class="nav-item nav-link text-nowrap px-2" @click="category = 'type1'" onclick="event.preventDefault()" href="#">文物書籍</a>
        <a class="nav-item nav-link text-nowrap px-2" @click="category = 'type2'" onclick="event.preventDefault()" href="#">周邊雜誌</a>
        <a class="nav-item nav-link text-nowrap px-2" @click="category = 'type3'" onclick="event.preventDefault()" href="#">其他用品<span class="sr-only">(current)</span></a>
      </div>
    </nav>
    <div class="container mt-md-5 mt-3 mb-7">
      <div class="row">
        <!-- 商品單項 -->
        <!-- V-FOR -->
        <!-- <div class="col-md-3" v-for="item in products" :key="item.id" > -->
        <!-- <div class="col-md-3" v-for="item in filterDate(products)" :key="item.id" > -->
        <div class="col-md-3" v-for="item in filterDate(products)" :key="item.id" >
          <div class="card border-0 mb-4 position-relative">
            <!-- <img :src="item.imageUrl" class="card-img-top rounded-0" alt="..."> -->
            <div :style="{backgroundImage: `url(${item.imageUrl})`}"
            style="height: 325px; background-size: cover; background-position:center center">
            </div>
            <!-- 商品單向頁面 ${id} -->
            <!-- 我的最愛 icon -->
            <router-link to="" >
              <!-- bi-heart-fill 實心 -->
              <i class="bi bi-suit-heart position-absolute btn btn-lg" style="right: 3px; top: 3px; color:red;"></i>
            </router-link>
            <!-- 商品資料 -->
            <div class="card-body p-0">
              <h4 class="mb-0 mt-3">
                <!-- text-decoration:none; 去除底線 -->
                <router-link class="card-text text-muted" :to="`/product/${item.id}`" style="text-decoration:none;">
                  <!-- 限制title size得用p、英文字跟中文 rem不太一樣、滑鼠hover顏色 -->
                  <p class="fs-6 m-0" style="height: 3rem; overflow:hidden;" onmouseover="this.style.color='#B08968';" onmouseout="this.style.color='';">{{item.title}}</p>
                </router-link>
              </h4>
              <p class="card-text text-muted mb-0" style="height: 4.5rem; overflow:hidden;">{{item.description}}</p>
              <!-- 原本的價目 -->
              <!-- <p class="text-muted mt-3">NT$ {{item.price}} / {{item.unit}}</p> -->
              <!-- <p class="text-muted mt-3">NT$ {{item.price}} / {{item.unit}}</p> -->
              <button type="button" class="btn btn-secondary position-absolute bottom-0 start-0 mb-2 disabled">加入購物車</button>
              <p class="mb-0 text-muted text-end mt-2"><del>NT$ {{item.origin_price}}</del></p>
              <p class="h4 fw-bold text-end mt-1 fs-5">NT$ {{item.price}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 分頁按鈕 -->
      <nav class="d-flex justify-content-center">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
</template>

<script>
export default {
  data() {
    return {
      category: 'all',
      products: []
    }
  },
  methods: {
    // 抓商品資料
    getData(){
      this.$http.get(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/products/all`)
      .then((res) => {
        console.log(res)
        this.products = res.data.products
        console.log(this.products)
      })
      .catch((err) => {
        console.dir(err)
      })
    },
    // 分流後 跑 商品array 篩選裡面物件的值 > 轉存篩選目標 > 回傳篩選目標
    filterDate(item){
      console.log('filterDate')
      if (this.category === 'all'){
        return item
      } else if (this.category === 'type1'){
        // 篩選另存 > 回傳篩選結果
        const newArray = item.filter(item =>
          item.category === '分類一'
        )
        return newArray
      } else if (this.category === 'type2'){
        // 篩選另存 > 回傳篩選結果
        const newArray = item.filter(item =>
          item.category === '分類二'
        )
        return newArray
      } else if (this.category === 'type3'){
        // 篩選另存 > 回傳篩選結果
        const newArray = item.filter(item =>
          item.category === '分類三'
        )
        return newArray
      }
    }
  },
  mounted() {
    this.getData()
  }
}
</script>
