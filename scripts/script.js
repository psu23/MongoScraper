var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function (cb) {
     axios("http://www.echojs.com/").then(function(response) {
          
          var $ = cheerio.load(response.data);

          var articles = [];
          
          $("article h2").each(function(i,element) {

               var result = {};

               result.headline = $(this).children("a").text();
               
               result.summary = $(this).children("a").attr("href");

               articles.push(result);
          });
          console.log(articles);
          cb(articles);
     });
};

module.exports =  scrape;