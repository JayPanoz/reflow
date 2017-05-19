r(function() {
  'use strict';

  (function initFrames() {
    var frames = document.getElementsByTagName('iframe');

    frames[0].contentWindow.document.body.classList.toggle('styled');
    frames[0].contentWindow.document.body.classList.toggle('paginated');
    frames[1].contentWindow.document.body.classList.toggle('paginated');
  })();

	var isFirefox = false;

  (function checkFirefox() {
		if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
			isFirefox = true;
		}
	})();

  var main = document.getElementsByTagName('main')[0];

  main.addEventListener('change', function(e) {
    if (e.target.tagName.toUpperCase() === 'INPUT') {
      var el = e.target;
      var scope = el.name;
      var addedClass = el.value;

      if (scope == 'article') {
        document.body.classList.toggle(addedClass); 
      } else {
        var frame = document.getElementById(scope);
        var frameBody = frame.contentWindow.document.body;
        frameBody.classList.toggle(addedClass);
      }
    }
  });

  var header = document.getElementsByTagName('header')[0];
  header.style.cursor = "pointer";
  var section = document.getElementsByTagName('section')[0];

  header.addEventListener('click', scrollCover, false);

  function scrollCover() {
    var reflowedStyles = ["font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', 'Roboto', sans-serif;", "font-size: 1.25rem;", "font-size: 1.5rem;", "font-size: 1.25rem;", "font-family: 'Vollkorn', 'Sitka Text', Georgia, serif;"];
    var counter = 0;
    header.style.cssText = reflowedStyles[counter];
    var loopStyles = setInterval(function () {
      counter++;
      header.style.cssText += reflowedStyles[counter];
      if (counter === 5) {
        header.removeAttribute('style');
        clearInterval(loopStyles);
        setTimeout(function() {
          if (isFirefox) {
    	      scrollTo(document.getElementsByTagName('html')[0], section.offsetTop, 600);
		      } else {
			      scrollTo(document.body, section.offsetTop, 600);
		      };
          header.removeEventListener('click', scrollCover, false);
        }, 1000);
      }
    }, 1000);
  }

	function scrollTo(element, to, duration) {
		if (duration <= 0) return;
		var difference = to - element.scrollTop;
		var perTick = difference / duration * 10;
		setTimeout(function() {
			element.scrollTop = element.scrollTop + perTick;
			if (element.scrollTop == to) return;
			scrollTo(element, to, duration - 10);
		}, 10);
	};

});
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}