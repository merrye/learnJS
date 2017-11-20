const express = require("express"),
    bodyParser = require("body-parser"),
    expressNunjucks = require("express-nunjucks"),
    session = require("express-session"),
    cookieParser = require("cookie-parser"),
    app = express(),
    rootdir = process.cwd();

app.set("views" , `${rootdir}\\views`);

const njk = expressNunjucks(app , {
    watch: true,
    noCache: true
});

app.use(express.static(`${rootdir}\\static`));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser("Merry"));

app.use(session({
    secret: "Merry"
}));

app.use("/" , require(`${rootdir}/router/index`));

app.listen(3003 , () => {
    console.log("app start at port 3003");
});