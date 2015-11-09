(function($) {
  var $$ = jQuery;
  // Smooooooth scrolling
  $$(window).scroll(function() {
    // find the id with class 'active' and remove it
    $$(".to-top").addClass("do-it");
    // get the amount the window has scrolled
    var scroll = $$(window).scrollTop();
    // add the 'active' class to the correct id based on the scroll amount
    if (scroll <=300) {
      $$(".to-top").removeClass("do-it");
    }
  });

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') || location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
       if (target.length) {
         $('html,body').animate({
           scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });

  $(window).scroll( function(){ // For use with automattic
    $('.eleven').each( function(){
      var bottom_of_object = $(this).position().top;
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      if( bottom_of_window > bottom_of_object ){
        $(this).addClass("all-the-way-up");
      }
    });
  });
})(jQuery);
