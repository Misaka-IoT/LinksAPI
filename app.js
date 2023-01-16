const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Console } = require("console");

const config = JSON.parse(fs.readFileSync("config.json"));
const app = express();
// app.use(cors())

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

let Links = JSON.parse(fs.readFileSync("Links.json"));

const verify = function (req, res, next) {
    console.log("Time:", Date.now());
    if (config.keyword == req.body.keyword) {
        next();
    } else {
        console.log(req.body.keyword)

        res.send("请输入正确的keyword");
    }
}

// 获取所有链接
app.get("/GetLinks", (req, res) => {
    res.json(JSON.parse(fs.readFileSync("Links.json")));
});

// 增加单个链接
app.post("/AddLink", verify, (req, res) => {
    let links = JSON.parse(fs.readFileSync("Links.json"));
    links.push({
        name: req.body.name,
        url: req.body.url,
        description: req.body.description,
    });
    fs.writeFileSync("Links.json", JSON.stringify(links));
    res.send("success");
});

// 删除单个链接
app.post("/DelLink", verify ,(req, res) => {
    let links = JSON.parse(fs.readFileSync("Links.json"));

    if (req.body.deleteId >= 0 || req.body.deleteId < links.length) {
        links.splice(req.body.deleteId - 1, 1)
        fs.writeFileSync("Links.json", JSON.stringify(links));
        res.send("success");

    }
    else {
        res.send("请输入正确要删除的id")
    }

});

app.listen(config.port, () => {
    console.log(`app listening on ${config.port}`);
});
