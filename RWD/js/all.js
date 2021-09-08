$(document).ready(function() {
   // 點到 指定class時候執行內容
   $('.showmenu').on('click',  function(e){
      // 停止<a>事件的默認動作 跳頁
      e.preventDefault();
      e.stopPropagation();
      // 指定的 class 反向增加或刪除 指定 calss
      $('body').toggleClass('menu-show');
  });
//   $(document).click(function(event){
//    if (!$(event.target).hasClass('menu-show')) {
//       //  $("#content").removeClass("mobile-open");
//       e.preventDefault();
//       $('body').removeClass('menu-show',false);
//    }
   // $('body').toggleClass('menu-show', false);
   // });
   // 點的如果不是特定clss 就  ...
   // $('body:not(.outherclass)').click(function(e){
   //    $('body').removeClass('menu-show');
   //  });
});