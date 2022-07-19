window.onload = function () {
  function pageExpired() {
    window.fetch(location.href).then(_r => _r.text()).then(html => {
      const kissdev = document.querySelector('#kissdev')
      const hash = (kissdev.getAttribute('hash'))
      if (html.indexOf(hash) === -1) {
        kissdev.style.position = 'fixed'
        kissdev.style.background = 'red'
        kissdev.style.top = '10px'
        kissdev.style.right = '10px'
        kissdev.style.width = '10px'
        kissdev.style.height = '10px'
        kissdev.style.borderRadius = '5px'
        kissdev.style.boxShadow = '0px 0 3px 2px #011100'
      }
    })
  }

  function throttle(fn, wait) {
    let callback = fn;
    let timerId = null;

    // 是否是第一次执行
    let firstInvoke = true;

    function throttled() {
      let context = this;
      let args = arguments;

      // 如果是第一次触发，直接执行
      if (firstInvoke) {
        callback.apply(context, args);
        firstInvoke = false;
        return;
      }

      // 如果定时器已存在，直接返回。        
      if (timerId) {
        return;
      }

      timerId = setTimeout(function () {
        // 注意这里 将 clearTimeout 放到 内部来执行了
        clearTimeout(timerId);
        timerId = null;

        callback.apply(context, args);
      }, wait);
    }

    // 返回一个闭包
    return throttled;
  }


  pageExpired()

  const _tfn = throttle(pageExpired, 1e4)

  window.addEventListener('click', _tfn)

  window.addEventListener('scroll', _tfn)

}