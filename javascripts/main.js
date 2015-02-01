console.log('This would be the main JS file.');

function initParse() {
	Parse.initialize("dQVhd2C0XZucdG7Amm767FDW1Ri1sXlK59A8twon", "SOXzgEhvZfr8EhAO7hXlyft4s61lRo8K4IMb02TU");
}

function testTable() {
      var Territory = Backbone.Model.extend({
      	initialize: function () {
		    Backbone.Model.prototype.initialize.apply(this, arguments);
		    this.on("change", function (model, options) {
		    if (options && options.save === false) return;
		      model.save();
		    });
		  }
      });

      var Territories = Backbone.Collection.extend({
        model: Territory,
        url: "territories.json"
      });

      var territories = new Territories();

      var columns = [{
          name: "id", // The key of the model attribute
          label: "ID", // The name to display in the header
          editable: false, // By default every cell in a column is editable, but *ID* shouldn't be
          // Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
          cell: Backgrid.IntegerCell.extend({
            orderSeparator: ''
          })
        }, {
          name: "name",
          label: "Name",
          // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
          cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
        }, {
          name: "pop",
          label: "Population",
          cell: "integer" // An integer cell is a number cell that displays humanized integers
        }, {
          name: "percentage",
          label: "% of World Population",
          cell: "number" // A cell type for floating point value, defaults to have a precision 2 decimal numbers
        }, {
          name: "date",
          label: "Date",
          cell: "date"
        }, {
          name: "url",
          label: "URL",
          cell: "uri" // Renders the value in an HTML anchor element
      }];

      // Initialize a new Grid instance
      var grid = new Backgrid.Grid({
        columns: columns,
        collection: territories
      });

      // Render the grid and attach the root to your HTML document
      $("#grid").append(grid.render().el);

      // Fetch some countries from the url
      territories.fetch({reset: true});
}

function setRows(rows) {

	var Territory = Backbone.Model.extend({
      	initialize: function () {
		    Backbone.Model.prototype.initialize.apply(this, arguments);
		    this.on("change", function (model, options) {
		    if (options && options.save === false) return;
		      model.save();
		    });
		  }
    });

    var Territories = Backbone.Collection.extend({
        model: Territory
    });	

    var territory1 = new Territory({
    	name: "Adeline", 
    	pop: 2708,
    	date: "2015-01-31",
    	percentage: 76.2,
    	registered:"2014-09-20",
    	url: "www.wikipedia.com"
    });

	var territories = new Territories([territory1]);

	var columns = [{
	  name: "id", // The key of the model attribute
	  label: "ID", // The name to display in the header
	  editable: false, // By default every cell in a column is editable, but *ID* shouldn't be
	  // Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
	  cell: Backgrid.IntegerCell.extend({
	    orderSeparator: ''
	  })
	}, {
	  name: "name",
	  label: "Name",
	  // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
	  cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
	}, {
	  name: "pop",
	  label: "Population",
	  cell: "integer" // An integer cell is a number cell that displays humanized integers
	}, {
	  name: "percentage",
	  label: "% of World Population",
	  cell: "number" // A cell type for floating point value, defaults to have a precision 2 decimal numbers
	}, {
	  name: "date",
	  label: "Date",
	  cell: "date"
	}, {
	  name: "url",
	  label: "URL",
	  cell: "uri" // Renders the value in an HTML anchor element
	}];

	// Initialize a new Grid instance
	var grid = new Backgrid.Grid({
	columns: columns,
	collection: territories
	});

	// Render the grid and attach the root to your HTML document
	$("#grid").append(grid.render().el);

	// Fetch some countries from the url
	territories.fetch({reset: true});
}

function initTable() {
	var test = Parse.Object.extend("territory");

	var query = new Parse.Query(test);

	query.find( {
	  success: function(results) {
	    // The object was retrieved successfully.
	    console.log("success");
	    console.log(results.length);

		for (var i = 0; i < results.length; i++) {
    		var object = results[i];
	    	console.log(object.id + ' - ' + object.toJSON());
	    }	    

	    console.log(results);

	    setRows(results);
	  },
	  error: function(error) {
	    // The object was not retrieved successfully.
	    // error is a Parse.Error with an error code and message.
	    console.log("fail");
	  }  
	});
}