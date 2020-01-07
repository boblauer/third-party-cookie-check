(function(name, definition) {
  if (typeof module !== 'undefined') module.exports = definition();
  else if (typeof define === 'function' && typeof define.amd === 'object') define(definition);
  else this[name] = definition();
})('tpc', function() {
  var supported = null;

  return function() {
    if (supported !== null) return Promise.resolve(supported);

    return new Promise(function(resolve) {
      var frame = document.createElement('iframe');
      frame.id = '3pc';
      frame.src = 'https://thirdpartycookie.monster';
      frame.style.display = 'none';
      frame.style.position = 'fixed';

      window.addEventListener(
        'message',
        function listen(event) {
          if (event.data === '3pc.supported' || event.data === '3pc.unsupported') {
            supported = event.data === '3pc.supported';
            resolve({ supported, timedOut: false });
            document.body.removeChild(frame);
            window.removeEventListener('message', listen);
          }
        },
        false
      );

      setTimeout(function() {
        if (supported === null) {
          supported = false;
          resolve({ supported, timedOut: true });
          document.body.removeChild(frame);
        }
      }, 1e3);

      document.body.appendChild(frame);
    });
  };
});
