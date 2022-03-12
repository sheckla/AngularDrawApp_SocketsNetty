export function scrollToBottomOf_li() {
  setTimeout(function(){
    /* var lis = document.getElementById("ss_elem_list").getElementsByTagName('li');

    if (lis.length < 3) return;
    for (var i = 0; i < lis.length; i++) {
      lis[i].tabIndex = i;
    }
    console.log(lis); */
    //$('ul').animate({scrollTop: $('.scrolltome').offset().top}, "slow");
    $('li').last().addClass('active-li').focus();
    focusChatBoxInput();
}, 300);
}


function focusChatBoxInput() {
  document.getElementById("chatBox").focus();
}
