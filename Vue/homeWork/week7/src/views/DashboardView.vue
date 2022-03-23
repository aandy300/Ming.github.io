<template>
    <!-- navbar-dark bg-dark -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/"><h2>首頁</h2></router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/admin/login" >登入</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/admin/products" >商品列表</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/admin/coupon" >優惠卷</router-link>
                </li>
            </ul>
            </div>
        </div>
    </nav>
    <router-view></router-view>
</template>
