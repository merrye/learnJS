const fs = require("fs"),
    express = require("express"),
    bodyParser = require("body-parser"),
    multer = require("./module/multer"),
    app = express();

app.set("views", ".\\views");                                                       

app.engine("html", require('ejs').renderFile);

app.set("view engine", "html");

app.use(bodyParser.json({limit: "50mb"}));

app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));

app.get("/upload", (req, res) => {
    res.render("upload");
});

app.post("/upload", multer.single("merry"), (req, res) => {
    res.json({
        result: "ok"
    });
});

app.listen(3000, () => console.log("app start at port 3000..."));