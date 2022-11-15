$(document).ready(function(){
    //임시용
    $('.uniList>ul>li').each(function(index){
        $(this).children('input').attr('id', 'uni' + (index + 1));
        $(this).children('input').attr('name', 'uni');
        $(this).children('label').attr('for', 'uni' + (index + 1));
    });

    $('.uniList>ul>li input:checkbox[name=uni]').change(function(){
        if($(this).is(":checked")){
            $(this).parent().addClass('on');
        }else{
            $(this).parent().removeClass('on');
        }
    });
    
    //드래그 리스트 구현
    if($('.uniListW').length){
        new Sortable(sortItem1, {
            group: 'shared', 
            animation: 150
        });
        
        new Sortable(sortItem2, {
            group: 'shared',
            animation: 150
        });
    }

    //quertion
    $('.question').click(function(e){
        e.preventDefault();
        if($(this).hasClass('on')){
            $(this).removeClass('on');
            $(this).next().fadeOut();
        }else{
            $(this).addClass('on');
            $(this).next().fadeIn();
        }     
    })
});