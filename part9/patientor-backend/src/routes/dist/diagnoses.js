"use strict";
exports.__esModule = true;
var express = require("express");
var diagnoseService_1 = require("../services/diagnoseService");
var router = express.Router();
router.get('/', function (_req, res) {
    res.status(200).send(diagnoseService_1.getAllDiagnoses());
});
exports["default"] = router;
