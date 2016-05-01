/**
 * Created by luis on 30/04/16.
 */
'use strict';

const Hapi = require('hapi');

// Require our json file / "database" controller
var menuController = require('./db_menu_controller');

// Create a new server instance
const server = new Hapi.Server();

// Set the connection 
server.connection({
    host: 'localhost',
    port: 3000
});

// Get all pizzas or pizzas by query
server.route({
    method: 'GET',
    path: '/menu',
    config: {
        handler: function (request, reply) {
            return reply(menuController.getPizzas(request.query));
        }
    }
});

// Get pizza by id
server.route({
    method: 'GET',
    path: '/menu/{pizzaId}',
    config: {
        handler: function (request, reply) {
            return reply(menuController.getPizzaById(request.params.pizzaId));
        }
    }
});

// Add new pizza
server.route({
    method: 'POST',
    path: '/menu',
    config: {
        handler: function (request, reply) {
            return reply(menuController.postNewPizza(request.payload));
        }
    }
});

// Update pizza by id
server.route({
    method: 'PUT',
    path: '/menu/{pizzaId}',
    config: {
        handler: function (request, reply) {
            return reply(menuController.putUpdatePizza(request.params.pizzaId, request.payload));
        }
    }
});

// Remove pizza by id
server.route({
    method: 'DELETE',
    path: '/menu/{pizzaId}',
    config: {
        handler: function (request, reply) {
            return reply(menuController.deleteRemovePizza(request.params.pizzaId));
        }
    }
});

// handle all other routes (404)
server.route({
    method: '*', // catch all methods
    path: '/{p*}', // catch-all other paths
    handler: function (request, reply) {
        return reply({result: 'NOT FOUND'});
    }
});

// Start the server
server.start((err) => {
    console.log('Server running at:', server.info.uri);
});