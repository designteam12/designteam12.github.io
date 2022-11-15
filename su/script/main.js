$(document).ready(function(){
  // const flicking = new Flicking("#slide1", {
  //   align: { camera: "20%", panel: "40px" },
  //   gap: 10,
  //   circular: true,
  //   bound: true,
  //   renderOnlyVisible: true
  // });
  


  //flicking.addPlugins(new Arrow());


  var scroll = $(window).scrollTop();
  if(scroll > 200){
    $('.progress-area').addClass('on');
  }else{
    $('.progress-area').removeClass('on');
  }
  $(window).scroll(function(){
      var scroll = $(window).scrollTop();
      var winH = $(window).height();
      var currentPer = (scroll / ($(document).height() - winH)) * 100;
      
      console.log(currentPer)
      $('.progress-bg').css('transform','rotate(' + window.pageYOffset/2 + 'deg)');
      $('.topPer').css('width',currentPer + '%')
      if(scroll > 200){
        $('.progress-area').addClass('on');
      }else{
        $('.progress-area').removeClass('on');
      }
  });

  $('.progress-area').click(function(){
    if($(this).hasClass('on')){
      $('html,body').animate({scrollTop:0},400);
    }else{
    
    }

    return false;

  });



});    