$(document).ready(() => {
    var articleContainer = $(".article-container");

    $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", ".btn.save", handleNoteSave);
    $(document).on("click", ".btn.note-delete", handleNoteDelete);

    initialize();

    function initialize() {
         articleContainer.empty();
         $.get("/api/headline?saved=true").then((data) => {
              
              if (data && data.length) {
                   renderArticles(data);
              } else {
                   emptyAlert();
              }
         });
    };

    //similar to index.js, articles will be rendered here if they were saved
    function renderArticles(articles) {
         console.log(articles);
         var articlePanels = [];

         for(let i = 0; i < articles.length; i++) {
              articlePanels.push(createPanel(articles[i]));
         }

         articleContainer.append(articlePanels);
    };

    //if no saved articles, list options for user of what they can do
    function emptyAlert() {
         var alert = $(["<div class='alert alert-warning text-center'>",
                        "<h4>No new articles.</h4>",
                        "</div>",
                        "<div class='panel panel-default'>",
                        "<div class='panel-heading text-center'>",
                        "<h3>Options: </h3>",
                        "</div>",
                        "<div class='panel-body text-center'>",
                        "<h4><a class='scrape-new'>Refresh Feed</a></h4>",
                        "<h4><a href='/'>Browse Articles</a></h4>",
                        "</div>",
                        "</div>"
                        ].join(""));
                        articleContainer.append(alert);
    };

    //each saved article will be posted with the following components
    function createPanel(article) {
         var panel = $(["<div class='panel panel-default>",
                        "<div class='panel-heading'>",
                        "<h3>",
                        "<a href=" +article.summary+" target='_blank' class='article-name'>",
                        article.headline,
                        "</a>",
                        "<br>",
                        "<a class='btn btn-danger delete'>",
                        "Delete",
                        "</a>",
                        "<a class='btn btn-success notes'>",
                        "Notes",
                        "</a>",
                        "</h3>",
                        "</div>",
                        "</div>"
                        ].join(""));

         panel.data("_id", article._id);

         return panel;
    };

    //if an article is deleted
    function handleArticleDelete() {
         
         var articleToDelete = $(this).parents(".panel").data();
         console.log("Deleting article: ")
         console.log(articleToDelete._id);
         $.ajax({
              method: "DELETE",
              url: "/api/headline/" + articleToDelete._id
         }).then((data) => {
              if (data.ok) {
                   initialize();
              }
         });
    };

    //when a note is being made for an article
    function handleArticleNotes() {
         var currentArticle = $(this).parents(".panel").data();
         $.get("/api/notes/" + currentArticle._id).then((data) => {
              var modalText = ["<div class='container-fluid text-center'>",
                               "<h4>Notes For Articles: ",
                               currentArticle._id,
                               "<hr/>",
                               "<ul class='list-group note-container'>",
                               "</ul>",
                               "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
                               "<button class='btn btn-success save'>Save Note</button>",
                               "</div>"].join("");

                               bootbox.dialog({
                                    message: modalText,
                                    closeButton: true
                               });
                               var noteData = {
                                    _id: currentArticle._id,
                                    notes: data || []
                               };

                               $(".btn.save").data("article", noteData);

                               renderNotesList(noteData);
         });
    };


    //list all notes for an article
    function renderNotesList(data) {
         var notesToRender = [];
         var currentNote;

         if(!data.notes.length) {
              currentNote = ["<li class='list-group-item'>",
                             "No notes for this article yet.",
                             "</li>"].join("");
                             notesToRender.push(currentNote);
         } else {
              for (let i = 0; i < data.notes.length; i++) {
                   currentNote = $(["<li class='list-group-item note'>",
                                  data.notes[i].noteText,
                                  "</li>"].join(""));
                                  notesToRender.push(currentNote)
              }
         };
         $(".note-container").append(notesToRender);
    };

    //when note is saved
    function handleNoteSave() {
         var noteData;
         var newNote = $(".bootbox-body textarea").val().trim();
         if(newNote) {
              noteData = {
                   _id: $(this).data("article")._id,
                   noteText: newNote
              };
              
              $.ajax({
                   method: "POST",
                   url: "/api/notes",
                   data: noteData
              }).then(() => {
                   bootbox.hideAll();
              });
         };
    };

    //if a note is deleted
    function handleNoteDelete() {
         var noteToDelete = $(this).data("_id");
         $.ajax({
              url: "/api/notes/" + noteToDelete,
              method: "DELETE"
         }).then(() => {
              bootbox.hideAll();
         });
    };
});