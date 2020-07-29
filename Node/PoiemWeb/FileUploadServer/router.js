// router.js
const route = (handle, pathname, res) => {
  console.log("About to route a request for " + pathname)
  if (typeof handle[pathname] === 'function') {
    // server로 붙어 반은 res객체를 handler로 넘겨준다.
    handle[pathname](res) 
  } else {
    console.log("No request handler found for" + pathname)
    res.writeHead(404, { "Content-Type": "text/palin" })
    res.write("404 Not Foun ")
    res.end()
  }
}

exports.route = route