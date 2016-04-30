/**
 * Created by luis on 30/04/16.
 */
'use strict';

// json file will simplify the process of working with the json file
var jsonFile = require('jsonfile');

// get our json file (our database)
var menuFile = './menu.json';

// object variable to hold our json content
var menuObj = jsonFile.readFileSync(menuFile);

// Get pizzas by query
exports.getPizzas = function (query) {

    // There is no query so return all pizzas
    if (Object.keys(query).length === 0) {

        return menuObj;
    } // Get the results that match the query
    else {
        // Array to keep the results of the query search
        var filteredPizzas = [];

        // For each pizza in our menu
        for (var i = 0; i < menuObj.pizzas.length; i++) {

            // If there is a pizza with the key/value of the query add it to our filtered pizzas
            if (menuObj.pizzas[i][Object.keys(query)[0]] === query[Object.keys(query)[0]])
                filteredPizzas.push(menuObj.pizzas[i]);
        }
        return filteredPizzas;
    }
};

// Get pizza by id
exports.getPizzaById = function (pizzaId) {

    for (var i = 0; i < menuObj.pizzas.length; i++) {

        if (menuObj.pizzas[i].id === parseInt(pizzaId)) {

            return menuObj.pizzas[i];
        }
    }
};

// Add new pizza
exports.postNewPizza = function (newPizza) {

    newPizza.id = (menuObj.pizzas.length + 1);
    menuObj.pizzas.push(newPizza);

    jsonFile.writeFile(menuFile, menuObj, {spaces: 2}, function (err) {
        // for now we will not handle the error
    });

    return newPizza;
};


// Update pizza by id
exports.putUpdatePizza = function (pizzaId, pizzaToUpdate) {

    for (var i = 0; i < menuObj.pizzas.length; i++) {

        if (menuObj.pizzas[i].id === parseInt(pizzaId)) {

            menuObj.pizzas[i] = pizzaToUpdate;
            menuObj.pizzas[i].id = parseInt(pizzaId);
        }
    }

    jsonFile.writeFile(menuFile, menuObj, {spaces: 2}, function (err) {

    });

    return pizzaToUpdate;
};

// Remove pizza by id
exports.deleteRemovePizza = function (pizzaId) {

    for (var i = 0; i < menuObj.pizzas.length; i++) {

        if (menuObj.pizzas[i].id === parseInt(pizzaId)) {
            menuObj.pizzas.splice(i, 1);
        }
    }

    jsonFile.writeFile(menuFile, menuObj, {spaces: 2}, function (err) {

    });

    return {"result": "success"};
};

