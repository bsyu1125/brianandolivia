console.log('This would be the main JS file.');

function initParse() {
	Parse.initialize("dQVhd2C0XZucdG7Amm767FDW1Ri1sXlK59A8twon", "SOXzgEhvZfr8EhAO7hXlyft4s61lRo8K4IMb02TU");
}
function parseDate(from){
    from = from.replace('T', '').replace(/-/g,'/');
    return new Date(from);
}

function setRowsO(results) {

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
	    	percentage:  parseFloat(results[i].get("percentage")),
	    	url: 		 encodeURI(results[i].get("URL"))
	    });
	    itemArray.push(t);
	}
	// console.log("array");
	console.log(itemArray);

	var items = new ItemCollection(itemArray);


	// var t = new Territory({
 //    	name: 		results[0].get("name"), 
 //    	pop: 		parseInt(results[0].get("pop")),
 //    	date: 		results[0].get("date"),
 //    	percentage: parseFloat(results[0].get("percentage")),
 //    	registered: results[0].get("registered"),
 //    	url: 		encodeURI(results[0].get("url"))
 //    });

	// var t1 = new Territory({
 //    	name: "Adeline", 
 //    	pop: 2708,
 //    	date: "2015-01-31",
 //    	percentage: 76.2,
 //    	registered:"2014-09-20",
 //    	url: "www.wikipedia.com"
 //    });

	// var territories = new Territories([t]);

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
	}];

	// Initialize a new Grid instance
	var grid = new Backgrid.Grid({
		columns: columns,
		collection: items
	});

	// Render the grid and attach the root to your HTML document
	$("#olivias_grid").append(grid.render().el);

	// Fetch some countries from the url
	items.fetch({reset: true});
}

function setRowsB(results) {

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
	    	percentage:  parseFloat(results[i].get("percentage")),
	    	url: 		 encodeURI(results[i].get("URL"))
	    });
	    itemArray.push(t);
	}
	// console.log("array");
	console.log(itemArray);

	var items = new ItemCollection(itemArray);


	// var t = new Territory({
 //    	name: 		results[0].get("name"), 
 //    	pop: 		parseInt(results[0].get("pop")),
 //    	date: 		results[0].get("date"),
 //    	percentage: parseFloat(results[0].get("percentage")),
 //    	registered: results[0].get("registered"),
 //    	url: 		encodeURI(results[0].get("url"))
 //    });

	// var t1 = new Territory({
 //    	name: "Adeline", 
 //    	pop: 2708,
 //    	date: "2015-01-31",
 //    	percentage: 76.2,
 //    	registered:"2014-09-20",
 //    	url: "www.wikipedia.com"
 //    });

	// var territories = new Territories([t]);

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
	}];

	// Initialize a new Grid instance
	var grid = new Backgrid.Grid({
		columns: columns,
		collection: items
	});

	// Render the grid and attach the root to your HTML document
	$("#brians_grid").append(grid.render().el);

	// Fetch some countries from the url
	items.fetch({reset: true});
}

function initTable() {
	var item = Parse.Object.extend("wishlist");

	var query = new Parse.Query(item);
	query.equalTo("For", "Brian");
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
	    setRowsB(results);
	  },
	  error: function(error) {
	    // The object was not retrieved successfully.
	    // error is a Parse.Error with an error code and message.
	    console.log("fail");
	  }  
	});

	var query2 = new Parse.Query(item);
	query.equalTo("For", "Olivia");
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
	    setRowsO(results);
	  },
	  error: function(error) {
	    // The object was not retrieved successfully.
	    // error is a Parse.Error with an error code and message.
	    console.log("fail");
	  }  
	});
}