// router.js
const route = (handle, pathname, res, req) => {
  console.log("About to route a request for " + pathname)
  if (typeof handle[pathname] === 'function') {
    handle[pathname](res, req) 
  } else {
    console.log("No request handler found for" + pathname)
    res.writeHead(404, { "Content-Type": "text/palin" })
    res.write("404 Not Foun ")
    res.end()
  }
}

exports.route = route
