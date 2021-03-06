App.Controllers.Documents = Backbone.Router.extend({
  routes: {
    "":                     "indexAction",
    "new":                  "newAction",
    "documents/:id":        "editAction",
    "documents/:id/delete": "deleteAction"
  },

  indexAction: function() {
    var documents = new App.Collections.Documents();
    documents.fetch({
      success: function() {
        new App.Views.Index({ collection: documents });
      },
      error: function() {
        new Error({ message: "Error loading documents." });
      }
    });
  },

  newAction: function() {
    new App.Views.Edit({ model: new Document() });
  },

  editAction: function(id) {
    var doc = new Document({ id: id });
    doc.fetch({
      success: function(model, resp) {
        new App.Views.Edit({ model: doc });
      },
      error: function() {
        new Error({ message: 'Could not find that document.' });
        window.location.hash = '#';
      }
    });
  },

  deleteAction: function(id) {
    var doc = new Document({ id: id });
    doc.destroy({
      success: function(model, response) {
        new App.Views.Notice({ message: 'Document successfully deleted' });
        window.location.hash = '#';
      }
    });
  }
});
