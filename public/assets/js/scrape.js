var axios = require("axios");
var cheerio = require("cheerio");

//Scrape New York Times website
var scrape = function (cb) {
     axios("http://www.nytimes.com/").then(function(response) {
          
          var $ = cheerio.load(response.data);

          var articles = [];
          
          $("article").each(function(i,element) {

               var result = {};
               //scrape title of article
               result.headline = $(element).find("h2").text().trim();
               //scrape link
               result.summary = "https://www.nytimes.com" + $(element).find("a").attr("href");
               //push article to articles array
               articles.push(result);
          });
          console.log(articles);
          cb(articles);
     });
};

module.exports =  scrape;