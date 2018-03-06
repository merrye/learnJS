const fs = require("fs"),
    express = require("express"),
    bodyParser = require("body-parser"),
    upload = require("./module/upload"),
    app = express();
    
app.set("views", ".\\views");                                                       

app.engine("html", require('ejs').renderFile);

app.set("view engine", "html");

app.use(express.static(".\\static"));

app.use(bodyParser.json({limit: "50mb"}));

app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));

app.get("/upload", (req, res) => {
    res.render("upload");
});

app.post("/upload", upload.single("merry"), (req, res) => {
    console.log(req.files);
    console.log(req.file);
    // const fileData = req.body.fileData,
    //     fileName = req.body.fileName;
    // res.json({
    //     msg: "success"
    // });
});

app.listen(3000, () => console.log("app start at port 3000..."));