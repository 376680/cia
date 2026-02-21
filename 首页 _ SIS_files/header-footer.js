(function ($) {

  const elements = document.querySelectorAll('.values-block,.divider');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('grow');
        observer.unobserve(entry.target); // Stops observing after animation triggers
      }
    });
  }, {
    threshold: 0.1 // Adjust threshold as needed (10% in view)
  });

  elements.forEach(element => observer.observe(element));




  $('.mobile-menu').on('click', function () {
    $(this).toggleClass('open');
    if($(this).hasClass('open')) {
      $('.level-0').removeClass('hidden');
      $('.level-0').addClass('display');
      $('.top-site').addClass('menu-open');
      $(this).attr('aria-expanded',true);
      $(this).attr('aria-label','Close navigation menu');
      $('body').css('overflow', 'hidden');

    }else {
      $(this).attr('aria-expanded',false);
      $('.top-site').removeClass('menu-open');
      $('.level-0').addClass('hidden');
      $('.level-0').removeClass('display');
      $(this).attr('aria-label','Open navigation menu');
      $('body').css('overflow', 'auto');
    }

  });

  let open_menu = null;

  $('.modal-backdrop').on('click', function (e) {
    $('.level-0 .open a').click();
  });

  $('.top-site .level-0 ul a').on('click', function (e) {
    $('.level-0 .open a').click();
  });

  // Close menu when tabbing off dropdown links
  if(window.innerWidth > 1289) {
    $('.top-site .level-0 > li > a').on('focus', function (e) {
      if (!$(this).parent().hasClass('open')) {
        $('.level-0 .open a').click();
      }
    });
  }
  $(document).keyup(function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
      $('.level-0 .open a').click();
    }
  });
  // @todo set up aria attributes
  $('.top-site .level-0 > li:not(".no-children") > a').on('click', function (e) {
    e.preventDefault();

    if (open_menu == this) {
      open_menu = null;
      $('.top-site .level-0 > .open').removeClass('open');
      doBackDrop();
      return;
    }else {
      $('.top-site .level-0 > .open').removeClass('open');
    }

    $(this).parent().toggleClass('open');
    open_menu = this;
    doBackDrop();

    return false;

  });

  function doBackDrop()
  {
    if(window.innerWidth > 1289 ) {
      if ($('.open', '.level-0').length > 0) {
        $('.modal-backdrop').addClass('show');
        $('.modal-backdrop').removeClass('hidden');
        $('#page-wrapper').css('overflow', 'scroll');
        $('body').css('overflow', 'hidden');
      } else {
        $('.modal-backdrop').removeClass('show');
        $('.modal-backdrop').addClass('hidden');
        $('#page-wrapper').css('overflow', 'auto');
        $('body').css('overflow', 'auto');
      }
    }
  }

  $('.footer .level-0 > li:not(".no-children") > a').on('click', function (e) {
    if(window.innerWidth > 1023 ) {
      return;
    }
    e.preventDefault();
    $(this).parent().toggleClass('open');
    return false;

  });

  $(document.links).filter(function() {
    return this.hostname !== window.location.hostname;
  }).attr({'target':'_blank' , 'class':'external', 'rel': "noopener"});


  if (navigator.userAgent.includes('Edg') && navigator.userAgent.includes('Macintosh')) {
    document.body.classList.add('edge-macos');
  }

}(jQuery));
