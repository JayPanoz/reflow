r(function() {
  'use strict';

  var menu;
  var reflowedStyles = [
    {st: "font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', 'Roboto', sans-serif;", ui: "font-ui", bt: "sans-font-ui"}, 
    {st: "font-size: 1.25rem;", ui: "size-ui", bt: "increase-size-ui"}, 
    {st: "font-size: 1.5rem;", ui: "size-ui", bt: "increase-size-ui"}, 
    {st: "font-size: 1.25rem;", ui: "size-ui", bt: "decrease-size-ui"}, 
    {st: "font-family: 'Vollkorn', 'Sitka Text', Georgia, serif;", ui: "font-ui", bt: "serif-font-ui"},
    {st: "font-family: 'Vollkorn', 'Sitka Text', Georgia, serif;", ui: "size-ui", bt: "decrease-size-ui"}
  ];

  (function initFrames() {
    var frames = document.getElementsByTagName('iframe');

    frames[0].contentWindow.document.body.classList.toggle('styled');
    frames[0].contentWindow.document.body.classList.toggle('paginated');
    frames[1].contentWindow.document.body.classList.toggle('paginated');
  })();

  (function createPseudoMenu() {
    var menuStyles = document.createElement('style');
    menuStyles.setAttribute("type", "text/css");
    menuStyles.textContent = "@-webkit-keyframes pressed {"
      + "0% {"
        + "background-color: #232222;"
        + "color: #F6F6F6;"
      + "}"
      + "100% {"
          + "background-color: inherit;"
          + "color: #232222;"
      + "}"
    +"}"
      + "@keyframes pressed {"
      + "0% {"
        + "background-color: #232222;"
        + "color: #F6F6F6;"
      + "}"
      + "100% {"
          + "background-color: inherit;"
          + "color: #232222;"
      + "}"
    +"}"
    +"#settings-ui {"
      + "position: absolute;"
      + "top: 1.25rem;"
      + "right: 1.25rem;"
      + "border: 2px solid currentColor;"
      + "box-shadow: 0 2px 10px #D4D4D4;"
      + "border-radius: 0.25rem;"
      + "z-index: 30;"
      + "-moz-user-select: none;"
      + "-webkit-user-select: none;"
      + "-ms-user-select: none;"
      + "user-select: none;"
      + "cursor: default;"
      + "opacity: 0;"
      + "transition: opacity 500ms;"
      + "background-color: #F6F6F6;"
      + "color: #232222;"
    + "}"
    +".sepia #settings-ui {"
      + "background-color: #f8f1e3;"
    + "}"
    + "#settings-ui.displayed {"
      + "display: block;"
      + "opacity: 1;"
      + "transition: opacity: 500ms;"
    + "}"
    + ".group-ui {"
      + "display: flex;"
      + "justify-content: stretch;"
      + "padding: 0.75rem;"
    + "}"
    + ".group-ui:first-child {"
      + "border-bottom: 1px solid currentColor;"
    + "}"
    + ".button-ui {"
      + "flex: 1 0 auto;"
      + "margin: 0 0.25rem;"
      + "border: 1px solid #232222;"
      + "padding: 0.25rem;"
      + "border-radius: 0.125rem;"
      + "text-align: center;"
      + "display: flex;"
      + "align-items: center;"
      + "justify-content: center;"
      + "min-width: 5rem;"
      + "transition: all 300ms;"
    + "}"
    + "#serif-font-ui {"
      + "font-family: 'Vollkorn', 'Sitka Text', Georgia, serif;"
      + "padding-top: 0.375rem"
    + "}"
    + "#sans-font-ui {"
      + "font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', 'Roboto', sans-serif;"
      + "font-size: 0.875rem;"
    + "}"
    + "#decrease-size-ui {"
      + "font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', 'Roboto', sans-serif;"
      + "padding: 0.3125rem 0.25rem;"
    + "}"
    + "#increase-size-ui {"
      + "font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', 'Roboto', sans-serif;"
      + "padding: 0.3125rem 0.25rem;"
    + "}"
    + "#font-ui .active-ui {"
      + "background-color: #232222;"
      + "color: #F6F6F6;"
      + "transition: all 300ms;"
    + "}"
    + "#size-ui .active-ui {"
      + "-webkit-animation: pressed 500ms normal ease-in-out;"
      + "animation: pressed 500ms normal ease-in-out;"
    + "}";

    document.head.appendChild(menuStyles);

    var frag = document.createDocumentFragment();
    var groups = ["font-ui", "size-ui"];
    var buttons = [
      {grp: "font-ui", label: "serif-font-ui", txt: "Serif"},
      {grp: "font-ui", label: "sans-font-ui", txt: "Sans"},
      {grp: "size-ui", label: "decrease-size-ui", txt: "Aa-"},
      {grp: "size-ui", label: "increase-size-ui", txt: "Aa+"}
    ];

    menu = document.createElement('div');
    menu.id = "settings-ui";
    menu.setAttribute("aria-hidden", "true");
    frag.appendChild(menu);

    for (var i = 0; i < groups.length; i++) {
      var group = document.createElement('div');
        group.classList.add('group-ui');
        group.id = groups[i];

      for (var j = 0; j < buttons.length; j++) {
        if (buttons[j].grp === groups[i]) {
          var button = document.createElement('span');
          var buttonText = document.createTextNode(buttons[j].txt);
          button.appendChild(buttonText);
          button.classList.add('button-ui');
          if (buttons[j].label == "serif-font-ui") {
            button.classList.add('active-ui');
          }
          button.id = buttons[j].label;
          group.appendChild(button);
        }
      }
    menu.appendChild(group);
    }
    document.body.insertBefore(frag, document.body.firstChild);
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
    menu.classList.add('displayed');
    var counter = 0;
    var delayMenu = setTimeout(function() {
      choregraphy(counter);

      var loopStyles = setInterval(function () {
        counter++;
        choregraphy(counter);

        if (counter === 5) {
          header.removeAttribute('style');
          clearInterval(loopStyles);
          var smoothScroll = setTimeout(function() {
            if (isFirefox) {
    	        scrollTo(document.getElementsByTagName('html')[0], section.offsetTop, 600);
		        } else {
			        scrollTo(document.body, section.offsetTop, 600);
		        };
            header.removeEventListener('click', scrollCover, false);
            clearTimeout(smoothScroll);
            menu.classList.remove('displayed');
            var killMenu = setTimeout(function() {
              menu.parentElement.removeChild(menu);
              clearTimeout(killMenu);
            }, 500);
          }, 1000);
        }
      }, 1000);
      clearTimeout(delayMenu);
    }, 1000);
    yoloMode();
  }

  function choregraphy(step) {
    header.style.cssText += reflowedStyles[step].st;
    var group = document.getElementById(reflowedStyles[step].ui);
    var oldButton = group.getElementsByClassName('active-ui')[0];
    if (oldButton) {
      oldButton.classList.remove('active-ui');
    }
    var newButton = document.getElementById(reflowedStyles[step].bt);
    newButton.classList.add('active-ui');
    if (group.id == "size-ui") {
      var forceRemoveClass = setTimeout(function() {
        newButton.classList.remove('active-ui');
        clearTimeout(forceRemoveClass);
      }, 500);
    }
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

  function yoloMode() {
    if (document.body.classList.contains('sepia')) {
      var els = document.querySelectorAll('section p, h2, figcaption, ul');
      document.body.style.overflowX = "hidden";
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var rot = Math.random() * 1 - 0.5;
        var tltX = Math.floor(Math.random() * 6) - 1;
        var tltY = Math.floor(Math.random() * 10) - 1;
        el.style.cssText = "transform: rotate("+rot+"deg) translate3d("+tltX+"px, "+tltY+"px, 0)";
      }
    } else {
      return;
    }
  }

});
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}