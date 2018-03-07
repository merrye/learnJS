const express = require("express"),
    bodyParser = require("body-parser"),
    fs = require("fs"),
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

app.post("/upload", (req, res) => {
    const fileData = req.body.fileData,
        fileName = req.body.fileName;

    // fs.writeFile("1.png", Buffer.from(fileData, "base64"), (err, data) => {})
    // fs.writeFile(`./1.txt`, fileData, (err, data) => {
    //     fs.link("./1.txt", `./static/upload/1.txt`, (err, data) => {
    //        fs.unlinkSync("./1.txt");
    //     });
    // });
    res.json({
        msg: "success"
    });
});

app.listen(3000, () => console.log("app start at port 3000..."));