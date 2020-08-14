var scrape = require("../public/assets/js/scrape");
var makeDate = require("../public/assets/js/date");
var Headline = require("./../models/headline");

module.exports = {
     fetch: function (cb) {
          scrape((data) => {
               var articles = data;
                    for (let i = 0; i < articles.length; i++) {
                         articles[i].date = makeDate;
                         articles[i].saved = false;
                    }
                    Headline.collection.insertMany(articles, {ordered: false}, function(err, docs) {
                         cb(err, docs);
                    })
          })
     },
     delete: function(query,cb) {
          Headline.remove(query,cb);
     },
     get: function(query, cb) {
          Headline.find(query).sort({_id: -1}).exec(function(err, doc) {
               cb(doc);
          }); 
     },
     update: function(query,cb) {
          Headline.update({_id: query._id}, {$set: query}, {}, cb);
     }
}