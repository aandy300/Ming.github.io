$(document).ready(function() {
   // 點到 指定class時候執行內容
   $('.showmenu').on('click',  function(e){
      // 停止<a>事件的默認動作 跳頁
      e.preventDefault();
      // 指定的 class 反向增加或刪除 指定 calss
      $('body').toggleClass('menu-show');
  });
});