const express = require("express");
const path = require("path");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001

app.use(express.json());
app.use(express.urlencoded({ extend: true }));

app.use(express.static("public"));

app.get("/" , function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

app.get("/notes" , function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

app.use(routes);

app.listen(PORT, () => console.log("Listing notes"))

