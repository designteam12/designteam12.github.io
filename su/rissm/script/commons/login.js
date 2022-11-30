$(document).ready(function(){

  let winWidth = window.innerWidth || document.documentElement.clientWidth;
  // login input
  $(".loginW .rissLogin .login ul li").on("click",function(){
    $(this).addClass("active");
    $(this).children(".inputW").children("input").focus();
  });
  $(".loginW .rissLogin .login ul li input").on("focus",function(){
      $(this).parents("li").addClass("active");
  });
  $(".loginW .rissLogin .login ul li input").on("focusout",function(){
      if($(this).val()=='')
      $(this).parents("li").removeClass("active");
  });

  if( $(".loginW .rissLogin .login ul li #id").val() != ''){
      $(".loginW .rissLogin .login ul li #id").parents("li").addClass("active");
  }
  if( $(".loginW .rissLogin .login ul li #pw").val() != ''){
      $(".loginW .rissLogin .login ul li #pw").parents("li").addClass("active");
  }
});    