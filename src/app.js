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
    parseCoupons(response.data)
  }
)

const parseCoupons = function (coupons) {
  try {
    var couponHTML = ''
    coupons.forEach(function (coupon, index) {
      couponHTML +=
        '<li>Code:' + coupon.code + '<em>' + coupon.description + '</em></li>'
    })

    var couponDisplay = document.createElement('div')
    couponDisplay.innerHTML = '<ul>' + couponHTML + '</ul>'
    document.body.appendChild(couponDisplay)
  } catch (e) {
    console.log('no coupons found for this domain', e)
  }
}
