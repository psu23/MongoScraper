var Note = require("./../models/note");
var makeDate = require("../public/assets/js/date");

module.exports = {
     //find notes associate with specific id
     get: function(data,cb) {
          Note.find({_headlineId: data._id},cb);
     },
     //save notes and associate them with specific article
     save: function(data,cb) {
          var newNote = {
               _headlineId: data._id,
               date: makeDate(),
               noteText: data.notText
          };
          //create note
          Note.create(newNote,function(err,doc) {
               if(err) {
                    console.log(err);
               }
               else {
                    console.log(doc);
                    cb(doc);
               }
          }); 
     },
     //delete note associated with a specific article
     delete: function(data,cb) {
          Note.remove({_id:data._id},cb)
     }
}