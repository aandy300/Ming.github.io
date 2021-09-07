$(document).ready(function () {
    $(".like").click(function (e) { 
        e.preventDefault();
        $(this).find(".fa-heart").toggleClass("fas");
    });
});