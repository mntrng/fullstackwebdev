"use strict";
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var diagnoses_1 = require("./routes/diagnoses");
var patients_1 = require("./routes/patients");
var app = express();
app.use(cors());
app.use(express.json());
app.get('/api/ping', function (_req, res) {
    res.send('Ping ping pong!');
});
app.use('/api/diagnoses', diagnoses_1["default"]);
app.use('/api/patients', patients_1["default"]);
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
