var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function (cb) {
     axios("http://www.nytimes.com/").then(function(response) {
          
          var $ = cheerio.load(response.data);

          var articles = [];
          
          $("article").each(function(i,element) {

               var result = {};

               result.headline = $(element).find("h2").text().trim();
               
               result.summary = 'https://www.nytimes.com' + $(element).find("a").attr("href");

               articles.push(result);
          });
          console.log(articles);
          cb(articles);
     });
};

module.exports =  scrape;