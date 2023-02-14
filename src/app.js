//Get current domain
var domain = window.location.hostname
domain = domain
  .replace('http://', '')
  .replace('http://', '')
  .replace('www.', '')
  .split(/[/?#]/)[0]

console.log(domain)
chrome.runtime.sendMessage(
  { command: 'fetch', data: { domain: domain } },
  (response) => {
    console.log(response)
  }
)
