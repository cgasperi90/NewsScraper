var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var saveSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    }
});

var Save = mongoose.model("Save", saveSchema);
module.exports = Save;