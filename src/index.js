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
        function(event) {
          supported = event.data === '3pc.supported';
          resolve(supported);
          document.body.removeChild(frame);
        },
        false
      );

      setTimeout(function() {
        if (supported === null) {
          supported = false;
          resolve(false);
          document.body.removeChild(frame);
        }
      }, 1e3);

      document.body.appendChild(frame);
    });
  };
});
