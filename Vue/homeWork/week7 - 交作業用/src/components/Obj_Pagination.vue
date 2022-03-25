<template>
    <nav aria-label="Page navigation example">
      <!-- 至中ver -->
        <ul class="pagination justify-content-center">
      <!-- 靠左ver -->
        <!-- <ul class="pagination"> -->
        <li class="page-item" :class="{ disabled : !pages.has_pre }" >
            <a class="page-link" href="#" aria-label="Previous" @click.prevent=" $emit('get-data', inside_pages.current_page - 1)" >
            <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li class="page-item"
        v-for=" page in pages.total_pages " :key=" page + 'page' "
        :class=" { active: page === pages.current_page } "
        >
            <!-- 追加 .prevent 無效 a link 轉址 -->
            <a class="page-link" href="" @click.prevent=" $emit('get-data', page) "> {{ page }} </a>
        </li>
        <li class="page-item" :class="{ disabled : !pages.has_next }" >
            <a class="page-link" href="#" aria-label="Next" @click.prevent=" $emit('get-data', inside_pages.current_page + 1)" >
            <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
  </nav>
</template>

<script>
export default {
    data(){
      return {
        inside_pages: {}
      }
    },
    updated() {
      this.inside_pages = this.pages
    },
    props: ['pages']
}
</script>
