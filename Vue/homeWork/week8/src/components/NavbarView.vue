<template>
     <div class="bg-white sticky-top">
      <div class="container">
        <nav class="navbar px-0 navbar-expand-lg navbar-light bg-white">
          <!-- 中央名稱 -->
          <router-link class="navbar-brand position-absolute" style="left: 50%; transform: translate(-50%, -50%); top: 50%;" to="/">品牌名稱</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon">123</span>
            <i class="bi bi-cart"></i>
          </button>
          <!-- 連結 -->
          <div class="collapse navbar-collapse bg-white custom-header-md-open" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <router-link class="nav-link ps-0" to="about">關於我們</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="product">品牌特色</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="products">產品列表</router-link>
              </li>
            </ul>
          </div>
          <!-- 右邊icon -->
          <div class="d-flex">
              <router-link class="nav-link" to="product">
                <i class="bi bi-heart-fill"></i>
              </router-link>
              <router-link class="nav-link" to="product">
                <i class="bi bi-cart"></i>
              </router-link>
            <!-- <a href="#"><i class="fas fa-heart me-5"></i></a>
            <a href="./cart-2.html"><i class="fas fa-shopping-cart"></i></a> -->
          </div>
        </nav>
      </div>
    </div>
</template>
