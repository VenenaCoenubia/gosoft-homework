const http = require("http");

function handle(request, response){
    response.write("Chinnawat Uthaisawak " + new Date().toISOString());
    response.end();
}

http.createServer(handle).listen(2337);
