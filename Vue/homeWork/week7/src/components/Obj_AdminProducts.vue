<template>
    <div class="container">
      <div id="app" class="container">
        <br>
        <!-- 想做最後更新通知 待處理 -->
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>{{  }} lastInfo </strong> You should check in on some of those fields below.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <div class="text-end mt-4">
          <button class="btn btn-primary" @click="openModal('new'), isNew = true">
            建立新的產品
          </button>
        </div>

        <table class="table mt-4">
          <thead>
            <tr>
              <th>產品名稱</th>
              <th width="120">
                原價
              </th>
              <th width="120">
                售價
              </th>
              <th width="150">
                是否啟用
              </th>
              <th width="120">
                查看細項
              </th>
              <th width="120">
                刪除
              </th>
            </tr>
          </thead>

          <tbody id="productList">
            <tr v-for=" (item, index) in products" :key="item.id">
              <td>{{ item.title }}</td>
              <td width="120">
                {{ item.origin_price }}
              </td>
              <td width="120">
                {{ item.price }}
              </td>
              <td width="100">
                <span v-if="products[index].is_enabled" class="text-success">啟用</span>
                <span v-else class="text-danger">未啟用</span>
              </td>
              <td>
                <button @click="checkInfo(item)" type="button" class="btn btn-primary">查看細節</button>
              </td>
              <td width="120">
                <div class="btn-group">
                  <button @click="openModal('edit', item), isNew = false, checkInfo(item)" type="button" class="btn btn-outline-primary btn-sm">
                    編輯
                  </button>
                  <button @click="openModal('del', item), checkInfo(item)" type="button" class="btn btn-outline-danger btn-sm">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p>目前顯示 <span id="productCount">{{ products.length }}</span> 項產品</p>
        <!-- 分頁元件 -->
        <pagination_obj :pages="pagination" @get-data="getData"></pagination_obj>
        <!-- 新增、編輯modal元件 -->
        <new_edit_obj :temp="temp" :is-new="isNew"
        @create-images="createImages"
        @add-product-post="addProductPost" @edit-product="editProduct">
        </new_edit_obj>
        <!-- 刪除modal元件 -->
        <del_obj :temp="temp" @close-modal="closeModal" @del-data="delData"></del_obj>
        <!-- 查看細項 -->
        <template v-if="nowInfo.id">
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">
                {{ nowInfo.title }}
                <span class="badge bg-primary ms-2">{{ nowInfo.category }}</span>
              </h5>
              <p class="card-text">商品描述：{{ nowInfo.description }}</p>
              <p class="card-text">商品內容：{{ nowInfo.content }}</p>
              <div class="d-flex">
                <p class="card-text me-2">{{ nowInfo.price }} 元</p>
                <p class="card-text text-secondary"><del>{{ nowInfo.origin_price }} 元</del></p>
              </div>
            </div>
          </div>
          <ul class="list-unstyled d-flex">
              <img :src="nowInfo.imageUrl"  class="images ms-2 img-fluid max-width: 10%" width="500" height="500" alt="">
            <li v-for="img in nowInfo.imagesUrl" :key="img+1">
                <img :src="img"  class="images m-2 img-fluid max-width: 30%" alt="">
            </li>
          </ul>
        </template>
      </div>
    </div>
</template>
