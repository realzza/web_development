const express = require("express");
const app = express();
const Datastore = require("nedb");
const fs = require("fs");

const database = new Datastore("entries.db");

database.loadDatabase();

//listen on a port
const server = app.listen(3000, listening);

function listening() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("The server is starting and listening at:" + host + ":" + port);
}

app.use(express.static("public"));
//need to parse any incoming data
app.use(express.json({ limit: "1mb" }));

app.post("/addEntry", (request, response) => {
  const data = request.body;
  const saveImage = request.body.img.replace(/^data:image\/png;base64,/, "");
  const timestamp = Date.now();
  const imgPath = `public/images/img_${timestamp}.png`;
  fs.writeFileSync(imgPath, saveImage, "base64");
  data.img = imgPath.slice(7);

  database.insert(data);
  response.json(data);
});

app.get("/all", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      console.log(err);
      return;
    } else {
      response.json(data);
    }
  });
});
