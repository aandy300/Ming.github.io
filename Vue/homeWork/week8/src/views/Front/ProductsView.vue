<template>
    <!-- 分類 -->
    <nav class="navbar navbar-expand-lg navbar-light justify-content-center border border-start-0 border-end-0 border-top border-bottom">
      <div class="navbar-nav flex-row overflow-auto navbar-custom-scroll">
        <a class="nav-item nav-link text-nowrap px-2" href="#">Lorem ipsum</a>
        <a class="nav-item nav-link text-nowrap px-2" href="#">Lorem ipsum</a>
        <a class="nav-item nav-link text-nowrap px-2 active" href="#">Lorem ipsum <span class="sr-only">(current)</span></a>
      </div>
    </nav>
    <div class="container mt-md-5 mt-3 mb-7">
      <div class="row">
        <!-- 商品單項 -->
        <!-- V-FOR -->
        <div class="col-md-3" v-for="item in products" :key="item.id" >
          <div class="card border-0 mb-4 position-relative">
            <!-- <img :src="item.imageUrl" class="card-img-top rounded-0" alt="..."> -->
            <div :style="{backgroundImage: `url(${item.imageUrl})`}"
            style="height: 325px; background-size: cover; background-position:center center">
            </div>
            <!-- 商品單向頁面 ${id} -->
            <!-- 我的最愛 icon -->
            <router-link to="" >
              <i class="bi bi-heart-fill position-absolute" style="right: 10px; top: 10px"></i>
            </router-link>
            <!-- 商品資料 -->
            <div class="card-body p-0">
              <h4 class="mb-0 mt-3">
                <!-- text-decoration:none; 去除底線 -->
                <router-link class="card-text text-muted" to="" style="text-decoration:none;">
                  <!-- 限制title size得用p、英文字跟中文 rem不太一樣、滑鼠hover顏色 -->
                  <p style="height: 1.8rem; overflow:hidden;" onmouseover="this.style.color='#B08968';" onmouseout="this.style.color='';">{{item.title}}</p>
                </router-link>
              </h4>
              <p class="card-text text-muted mb-0" style="height: 4.5rem; overflow:hidden;">{{item.description}}</p>
              <p class="text-muted mt-3">NT$ {{item.price}} / {{item.unit}}</p>
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
      console.log('123')
    }
  },
  mounted() {
    this.getData()
  }
}
</script>
