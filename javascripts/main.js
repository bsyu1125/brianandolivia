console.log('This would be the main JS file.');

function initParse() {
	Parse.initialize("dQVhd2C0XZucdG7Amm767FDW1Ri1sXlK59A8twon", "SOXzgEhvZfr8EhAO7hXlyft4s61lRo8K4IMb02TU");
}

function setRows(results, person) {

	var Item = Backbone.Model.extend({
      	initialize: function () {
		    Backbone.Model.prototype.initialize.apply(this, arguments);
		    this.on("change", function (model, options) {
		    if (options && options.save === false) return;
		      model.save();
		    });
		  }
    });

    var ItemCollection = Backbone.Collection.extend({
        model: Item
    });	

    var itemArray = [];

    for (var i = 0; i < results.length; i++) {

	    var t = new Item({
	    	need: 		 parseInt(results[i].get("Need")),
	    	description: results[i].get("Description"),
	    	url: 		 encodeURI(results[i].get("URL"))
	    });
	    itemArray.push(t);
	}
	// console.log("array");
	console.log(itemArray);

	var items = new ItemCollection(itemArray);

	// Suppose you want to highlight the entire row when an editable field is focused
	var FocusableRow = Backgrid.Row.extend({
	  highlightColor: "lightYellow",
	  events: {
	    focusin: "rowFocused",
	    focusout: "rowLostFocus"
	  },
	  rowFocused: function() {
	    this.el.style.backgroundColor = this.highlightColor;
	  },
	  rowLostFocus: function() {
	    delete this.el.style.backgroundColor;
	  }
	});

	var DeleteCell = Backgrid.Cell.extend({
	    template: _.template('<button>Delete</button>'),
	    events: {
	      "click": "deleteRow"
	    },
	    deleteRow: function (e) {
	      var flag = confirm("Are you sure you want to delete that?");
	      if (flag == true) {
	      	console.log(e);
	      	e.preventDefault();
	      	console.log(this.model);

	      	var items = Parse.Object.extend("wishlist");
			var query = new Parse.Query(items);
			query.equalTo("Description", this.model.get("description"));
			query.equalTo("URL", this.model.get("url"));
			query.find({
				success: function(object) {
					console.log("Found it to delete");
					console.log(object);
					object[0].destroy({
						success: function(obj) {
							console.log("Deleted");
						},
						error: function(obj) {	
							console.log("Not deleted");
						}
					});
				},
				error: function(error) {
					console.log("Couldn't find to delete");
				}
			})

	      	this.model.collection.remove(this.model);

	      }
	    },
	    render: function () {
	      this.$el.html(this.template());
	      this.delegateEvents();
	      return this;
	    }
	});

	var columns = [{
	  name: "description",
	  label: "Description/Details",
	  // cell: "date"
	  cell: "string"
	}, {
	  name: "url",
	  label: "URL",
	  cell: "uri" // Renders the value in an HTML anchor element
	}, {
	  name: "need",
	  label: "How much you want it (1-10)",
	  cell: "number" // A cell type for floating point value, defaults to have a precision 2 decimal numbers
	  // cell: "string"
	},{
		name: "description",
		label: "Delete?",
		cell: DeleteCell
	}];

	// Initialize a new Grid instance
	var grid = new Backgrid.Grid({
		row: FocusableRow,
		columns: columns,
		collection: items
	});

	// Render the grid and attach the root to your HTML document
	if (person == "Brian")
		$("#brians_grid").append(grid.render().el);
	else
		$("#olivias_grid").append(grid.render().el);

	// Fetch some countries from the url
	items.fetch({reset: true});
}

function showTable() {
	updateTableBrian();
	updateTableOlivia();
	
}

function updateTableBrian() {
	$("#brians_grid").empty();
	var item = Parse.Object.extend("wishlist");

	var query = new Parse.Query(item);
	query.equalTo("For", "Brian");
	query.ascending("updatedAt");
	query.find( {
	  success: function(results) {
	    // The object was retrieved successfully.
	    console.log("success");
	    console.log(results.length);

		for (var i = 0; i < results.length; i++) {
    		var object = results[i];
	    	console.log(object.id + ' - ' + object.get('name'));
	    }	    
	    console.log(results);
	    setRows(results, "Brian");
	  },
	  error: function(error) {
	    // The object was not retrieved successfully.
	    // error is a Parse.Error with an error code and message.
	    console.log("fail");
	  }  
	});
}

function updateTableOlivia() {

	$("#olivias_grid").empty();

	var item = Parse.Object.extend("wishlist");

	var query = new Parse.Query(item);
	query.equalTo("For", "Olivia");
	query.ascending("updatedAt");

	query.find( {
	  success: function(results) {
	    // The object was retrieved successfully.
	    console.log("success");
	    console.log(results.length);

		for (var i = 0; i < results.length; i++) {
    		var object = results[i];
	    	console.log(object.id + ' - ' + object.get('name'));
	    }	    
	    console.log(results);
	    setRows(results, "Olivia");
	  },
	  error: function(error) {
	    // The object was not retrieved successfully.
	    // error is a Parse.Error with an error code and message.
	    console.log("fail");
	  }  
	});
}

function addRowBrian() {
	// Create the object.
	var newItem = Parse.Object.extend("wishlist");
	var item = new newItem();
	
	item.set("Description", $("#brian_desc").val());
	item.set("URL", $("#brian_url").val());
	item.set("For", "Brian");
	item.set("Need", parseInt($("#brian_need").val()));

	console.log($("#brian_need").val());

	item.save(null, {
		success: function(response) {
			console.log("new created object");
			updateTableBrian();
		},
		error: function(gameScore, error) {
		    // Execute any logic that should take place if the save fails.
		    // error is a Parse.Error with an error code and message.
		    alert('Failed to create new object, with error code: ' + error.message);
		  }
	});
}