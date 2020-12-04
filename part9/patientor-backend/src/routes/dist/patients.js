"use strict";
exports.__esModule = true;
var express = require("express");
var patientService_1 = require("../services/patientService");
var router = express.Router();
router.get('/', function (_req, res) {
    res.status(200).send(patientService_1.getAllSecretPatients());
});
exports["default"] = router;
