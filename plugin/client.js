document.onload = function () {
  function pageExpired() {
    window.fetch(window.domain).then(_r => _r.text()).then(html => {
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

  function throttle() {
    let timer = null
    return () => {
      if (timer) {
        return
      } else {
        pageExpired()
        timer = setTimeout(() => {
          clearTimeout(timer)
        }, 1e5)
      }
    }
  }

  pageExpired()

  const _tfn = throttle()

  window.addEventListener('click', _tfn)

  window.addEventListener('scroll', _tfn)

}