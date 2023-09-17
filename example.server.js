const http = require("http");
const fs = require("fs");
const _ = require('lodash')

// creating a server
const server = http.createServer((req, res) => {
  // console.log(req);

  // set header content type
  res.setHeader("Content-Type", "text/html");

  // check the path that user visits
  let path = "./views/";

  // routing system
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      res.statusCode = 200;
      path += "about.html";
      break;
    default:
      res.statusCode = 404;
      path += "404.html";
      break;
  }
  // write the content to be sent into the browser
  // reading from a file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening for requests on port 3000");
});
