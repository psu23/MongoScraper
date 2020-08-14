$(document).ready(() => {

     //upon loading of site, create a container for all articles
    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    initialize();

    //get any unsaved articles
    function initialize() {
         articleContainer.empty();
         $.get("/api/headline?saved=false").then((data) => {
              if (data && data.length) {
                   renderArticles(data);
              } else {
                   emptyArticles();
              };
         });
    };

    //when articles are saved, patch them
    function handleArticleSave() {
         var articleToSave = $(this).parents(".panel").data();
         articleToSave.saved = true;

         $.ajax({
              method: "PATCH",
              url: "/api/headline",
              data: articleToSave
         }).then((data) => {
              console.log(data);
              if(data.ok) {
                   console.log();
                   console.log(data.ok)
                   initialize();
              }
         })
    };

    //when articles are scraped, alert user and obtain contents from api/fetch about how many new articles were scraped
    function handleArticleScrape() {
         $.get("/api/fetch").then((data) => {
              initialize();
              bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "</h3>");
         });
    };

    //render articles for user to see on page
    function renderArticles(articles) {
         var articlePanels = [];

         for (let i = 0; i < articles.length; i++) {
              articlePanels.push(createPanel(articles[i]));
         };

         articleContainer.append(articlePanels);
    };

    //if no new articles are available to be scraped, alert user
    function emptyArticles() {
         var alert = $(["<div class='alert alert-warning text-center'>",
                        "<h4>No new articles</h4>",
                        "</div>",
                        "<div class='panel panel-default'>",
                        "<div class='panel-heading text-center'>",
                        "<h3>Options: </h3>",
                        "</div>",
                        "<div class='panel-body text-center'>",
                        "<h4><a class='scrape-new'>Refresh Feed</a></h4>",
                        "<h4><a href='/saved'>Saved Articles</a></h4>",
                        "</div>",
                        "</div>"
                        ].join(""));
                        articleContainer.append(alert);
    };

    //each article will be listed as the title (which is a link to the article) and a save button associated with it
    function createPanel(article) {
         var panel = $(["<div class='panel panel-default>",
                        "<div class='panel-heading'>",
                        "<a href=" +article.summary+" target='_blank' class='article-name'>",          
                        "<h3>",
                        article.headline,
                        "</a>",
                        "<br>",
                        "<a class='btn btn-success save'>",
                        "Save Article",
                        "</a>",
                        "</h3>",
                        "</div>",
                        "</div>"
                        ].join(""));

         panel.data("_id", article._id);

         return panel;
    }

});