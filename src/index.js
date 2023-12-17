const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

app.use(express.json());

app.get('/stock', (req, res) => {
    let stock = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "stock.json")).toString());
    
    res.status(200).send(stock);
});

app.post("/stock", (req, res) => {
    fs.writeFileSync(path.join(__dirname, "..", "stock.json"), JSON.stringify(req.body, null, 2));

    res.sendStatus(200);
});

app.use("/", express.static(path.join(__dirname, "pagina")));
app.listen(8080, () => console.log("Arranco la api en 8080"))