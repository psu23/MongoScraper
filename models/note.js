var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//save note Schema to be added to mongo db
var noteSchema = new Schema({
     _headlineId: {
          type: Schema.Types.ObjectId,
          ref: "Headline"
     },
     date: String,
     noteText: String
})

var Note = mongoose.model("Note", noteSchema);

module.exports = Note;