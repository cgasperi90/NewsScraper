var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var saveSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

var Save = mongoose.model("Save", saveSchema);
module.exports = Save;