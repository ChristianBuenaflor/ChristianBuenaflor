 (function (d, s, id) {
    var js, el = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.async = true;
    js.src = 'https://cdn.conferbot.com/dist/v1/widget.min.js';
    js.id = id;
    js.charset = 'UTF-8';
    el.parentNode.insertBefore(js, el);
    js.onload = function () {
      var w = window.ConferbotWidget("6a874d5008866ae95fc7a55c", "live_chat");
    };
    
  })(document, 'script', 'conferbot-js');