$(document).ready(() => {

    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    initialize();

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

    function handleArticleScrape() {
         $.get("/api/fetch").then((data) => {
              initialize();
              bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "</h3>");
         });
    };

    function renderArticles(articles) {
         var articlePanels = [];

         for (let i = 0; i < articles.length; i++) {
              articlePanels.push(createPanel(articles[i]));
         };

         articleContainer.append(articlePanels);
    };



    function emptyArticles() {
         var alert = $(["<div class='alert alert-warning text-center'>",
                        "<h4>Hmm... apparently there no new articles.</h4>",
                        "</div>",
                        "<div class='panel panel-default'>",
                        "<div class='panel-heading text-center'>",
                        "<h3>What do you want to do?</h3>",
                        "</div>",
                        "<div class='panel-body text-center'>",
                        "<h4><a class='scrape-new'>Try Scraping Again</a></h4>",
                        "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
                        "</div>",
                        "</div>"
                        ].join(""));
                        articleContainer.append(alert);
    };

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