var http = require("http");
var server = http.createServer(function(request, response) {
  response.writeHead(200, { "Content-Type": "textplain" });
  if (request.method == "GET") {
    response.end("received GET request.");
  } else if (request.method == "POST") {
    let body = [];
    request
      .on("data", chunk => {
        body.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(body).toString();
        // at this point, `body` has the entire request body stored in it as a string
      });
    console.log(body);

    response.end(request.body);
  } else {
    response.end("Undefined request .");
  }
});

server.listen(8000);
console.log("Server running on port 8000");
