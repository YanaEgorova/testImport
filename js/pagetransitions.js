var PageTransitions = (function () {

  var $main = $('#pt-main'),
    $pages = $main.children('div.pt-page'),
    $iterate = $('#iterateEffects'),
    animcursor = 1,
    pagesCount = $pages.length,
    current = 0,
    isAnimating = false,
    endCurrPage = false,
    endNextPage = false,
    animEndEventNames = {
      'WebkitAnimation': 'webkitAnimationEnd',
      'OAnimation': 'oAnimationEnd',
      'msAnimation': 'MSAnimationEnd',
      'animation': 'animationend'
    },
    // animation end event name
    animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],
    // support css animations
    support = Modernizr.cssanimations;

  function init() {

    $pages.each(function () {
      var $page = $(this);
      $page.data('originalClassList', $page.attr('class'));
    });

    $pages.eq(current).addClass('pt-page-current');

    $('#dl-menu').dlmenu({
      animationClasses: {
        in: 'dl-animate-in-2',
        out: 'dl-animate-out-2'
      },
      onLinkClick: function (el, ev) {
        ev.preventDefault();
        nextPage(el.data('animation'));
      }
    });
    $('#dl-menu2').dlmenu({
      animationClasses: {
        in: 'dl-animate-in-2',
        out: 'dl-animate-out-2'
      },
      onLinkClick: function (el, ev) {
        ev.preventDefault();
        prevPage(el.data('animation'));
      }
    });
    $('#dl-menu3').dlmenu({
      animationClasses: {
        in: 'dl-animate-in-2',
        out: 'dl-animate-out-2'
      },
      onLinkClick: function (el, ev) {
        ev.preventDefault();
        nextPage(el.data('animation'));
      }
    });
    $('#dl-menu4').dlmenu({
      animationClasses: {
        in: 'dl-animate-in-2',
        out: 'dl-animate-out-2'
      },
      onLinkClick: function (el, ev) {
        ev.preventDefault();
        prevPage(el.data('animation'));
      }
    });
    $('#dl-menu5').dlmenu({
      animationClasses: {
        in: 'dl-animate-in-2',
        out: 'dl-animate-out-2'
      },
      onLinkClick: function (el, ev) {
        ev.preventDefault();
        nextPage(el.data('animation'));
      }
    });
    $('#dl-menu6').dlmenu({
      animationClasses: {
        in: 'dl-animate-in-2',
        out: 'dl-animate-out-2'
      },
      onLinkClick: function (el, ev) {
        ev.preventDefault();
        prevPage(el.data('animation'));
      }
    });

    $iterate.on('click', function () {
      if (isAnimating) {
        return false;
      }
      // if (animcursor > 67) {
      //   animcursor = 1;
      // }
      nextPage(animcursor);
      ++animcursor;
      prevPage(animcursor) +
        -animcursor;
    });

  }

  function nextPage(animation) {

    if (isAnimating) {
      return false;
    }

    isAnimating = true;

    var $currPage = $pages.eq(current);

    if (current < pagesCount - 1) {
      ++current;
    } else {
      current = 0;
    }

    var $nextPage = $pages.eq(current).addClass('pt-page-current'),
      outClass = '',
      inClass = '';

    switch (animation) {

      case 1:
        outClass = 'pt-page-moveToLeft';
        inClass = 'pt-page-moveFromRight';
        break;
      case 2:
        outClass = 'pt-page-moveToRight';
        inClass = 'pt-page-moveFromLeft';
        break;
      case 13:
        outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
        inClass = 'pt-page-moveFromRight';
        break;
      case 14:
        outClass = 'pt-page-moveToRightEasing pt-page-ontop';
        inClass = 'pt-page-moveFromLeft';
        break;
      case 23:
        outClass = 'pt-page-moveToLeft pt-page-ontop';
        inClass = 'pt-page-scaleUp';
        break;
      case 24:
        outClass = 'pt-page-moveToRight pt-page-ontop';
        inClass = 'pt-page-scaleUp';
        break;

    }

    $currPage.addClass(outClass).on(animEndEventName, function () {
      $currPage.off(animEndEventName);
      endCurrPage = true;
      if (endNextPage) {
        onEndAnimation($currPage, $nextPage);
      }
    });

    $nextPage.addClass(inClass).on(animEndEventName, function () {
      $nextPage.off(animEndEventName);
      endNextPage = true;
      if (endCurrPage) {
        onEndAnimation($currPage, $nextPage);
      }
    });

    if (!support) {
      onEndAnimation($currPage, $nextPage);
    }

  }

  function prevPage(animation) {

    if (isAnimating) {
      return false;
    }

    isAnimating = true;

    var $currPage = $pages.eq(current);

    if (current < pagesCount - 1) {
      console.log(current);
      current -= 1;
    } else {
      current = pagesCount - 2;
    }

    var $prevPage = $pages.eq(current).addClass('pt-page-current'),
      outClass = '',
      inClass = '';

    switch (animation) {

      case 1:
        outClass = 'pt-page-moveToLeft';
        inClass = 'pt-page-moveFromRight';
        break;
      case 2:
        outClass = 'pt-page-moveToRight';
        inClass = 'pt-page-moveFromLeft';
        break;
      case 13:
        outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
        inClass = 'pt-page-moveFromRight';
        break;
      case 14:
        outClass = 'pt-page-moveToRightEasing pt-page-ontop';
        inClass = 'pt-page-moveFromLeft';
        break;
      case 23:
        outClass = 'pt-page-moveToLeft pt-page-ontop';
        inClass = 'pt-page-scaleUp';
        break;
      case 24:
        outClass = 'pt-page-moveToRight pt-page-ontop';
        inClass = 'pt-page-scaleUp';
        break;

    }

    $currPage.addClass(outClass).on(animEndEventName, function () {
      $currPage.off(animEndEventName);
      endCurrPage = true;
      if (endNextPage) {
        onEndAnimation($currPage, $prevPage);
      }
    });

    $prevPage.addClass(inClass).on(animEndEventName, function () {
      $prevPage.off(animEndEventName);
      endNextPage = true;
      if (endCurrPage) {
        onEndAnimation($currPage, $prevPage);
      }
    });

    if (!support) {
      onEndAnimation($currPage, $prevPage);
    }

  }

  function onEndAnimation($outpage, $inpage) {
    endCurrPage = false;
    endNextPage = false;
    resetPage($outpage, $inpage);
    isAnimating = false;
  }

  function resetPage($outpage, $inpage) {
    $outpage.attr('class', $outpage.data('originalClassList'));
    $inpage.attr('class', $inpage.data('originalClassList') + ' pt-page-current');
  }

  init();

  return {
    init: init
  };

})();