var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//save all necessary information about article in mongo schema
//headline, url, date, whether it is saved or not (false by default)
var headLineSchema = new Schema({
     headline: {
          type: String,
          required: true,
          unique: true
     },
     summary: {
          type: String,
          required: true
     },
     date: String,
     saved: {
          type: Boolean,
          default: false
     }
});

var Headline = mongoose.model("Headline", headLineSchema);

module.exports = Headline;