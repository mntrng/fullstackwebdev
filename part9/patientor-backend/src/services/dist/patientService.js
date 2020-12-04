"use strict";
exports.__esModule = true;
exports.getAllSecretPatients = void 0;
var patients_json_1 = require("../data/patients.json");
exports.getAllSecretPatients = function () {
    return patients_json_1["default"].map(function (_a) {
        var id = _a.id, name = _a.name, dateOfBirth = _a.dateOfBirth, gender = _a.gender, occupation = _a.occupation;
        return ({
            id: id,
            name: name,
            dateOfBirth: dateOfBirth,
            gender: gender,
            occupation: occupation
        });
    });
};
