//Get current domain
var domain = window.location.hostname
domain = domain
  .replace('http://', '')
  .replace('http://', '')
  .replace('www.', '')
  .split(/[/?#]/)[0]

chrome.runtime.sendMessage(
  { command: 'fetch', data: { domain: domain } },
  (response) => {
    parseCoupons(response.data, domain)
  }
)

const parseCoupons = function (coupons, domain) {
  try {
    var couponHTML = ''
    for (var key in coupons) {
      var coupon = coupons[key]
      // coupons.forEach(function (coupon, index) {
      couponHTML +=
        '<li><span class="code">' +
        coupon.code +
        '</span> ' +
        '<p>' +
        coupon.description +
        '</p></li>'
    }

    if (couponHTML == '') {
      couponHTML = '<p>Be the first to submit the coupon for this site</p>'
    }
    var couponDisplay = document.createElement('div')
    couponDisplay.className = 'coupon_list'
    couponDisplay.innerHTML =
      '<div class="submit_button">Submit coupon</div>' +
      '<h1>Coupons </h1> <p>Browse coupons that have been used for: <strong>' +
      domain +
      '</strong></p> <ul>' +
      couponHTML +
      '</ul>' +
      '<p style="font-style: italic;">Click any coupon to copy &amp; use </p>'
    document.body.appendChild(couponDisplay)

    var couponButton = document.createElement('div')
    couponButton.className = 'coupon_button'
    couponButton.innerHTML =
      '<i class="fa fa-money" style="font-size:48px;"></i>'
    document.body.appendChild(couponButton)

    var couponSubmitOverlay = document.createElement('div')
    couponSubmitOverlay.className = 'submit_overlay'
    couponSubmitOverlay.innerHTML =
      '<h3>Do you have a coupon for this site ?</h3>' +
      '<div><label>Code:</label><input type="text" class="code"></div>' +
      '<div><label>Description:</label><input type="text" class="desc"></div>' +
      '<div><button class="submit-coupon">Submit Coupon</button></div>'
    couponSubmitOverlay.style.display = 'none'
    document.body.append(couponSubmitOverlay)

    createEvents()
  } catch (e) {
    console.log('no coupons found for this domain', e)
  }
}

var createEvents = function () {
  document
    .querySelector('.coupon_list .submit_button')
    .addEventListener('click', function (event) {
      if (document.querySelector('.submit_overlay').style.display == 'block') {
        document.querySelector('.submit_overlay').style.display = 'none'
      } else {
        document.querySelector('.submit_overlay').style.display = 'block'
      }
    })

  document
    .querySelector('.coupon_button')
    .addEventListener('click', function (event) {
      if (document.querySelector('.coupon_list').style.display == 'block') {
        document.querySelector('.coupon_list').style.display = 'none'
      } else {
        document.querySelector('.coupon_list').style.display = 'block'
      }
    })
}
