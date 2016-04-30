/**
 * Created by luis on 30/04/16.
 */
'use strict';

const Hapi = require('hapi');

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
            return reply({result: 'Pizza API listened to your request'});
        }
    }
});

// Get pizza by id
server.route({
    method: 'GET',
    path: '/menu/{pizzaId}',
    config: {
        handler: function (request, reply) {
            return reply({result: 'So you will want a certain pizza here. OK'});
        }
    }
});

// Add new pizza
server.route({
    method: 'POST',
    path: '/menu',
    config: {
        handler: function (request, reply) {
            return reply({result: 'New pizzas!!!'});
        }
    }
});

// Update pizza by id
server.route({
    method: 'PUT',
    path: '/menu/{pizzaId}',
    config: {
        handler: function (request, reply) {
            return reply({result: 'Whant to change the pizza??, no problem!'});
        }
    }
});

// Remove pizza by id
server.route({
    method: 'DELETE',
    path: '/menu/{pizzaId}',
    config: {
        handler: function (request, reply) {
            return reply({result: 'Remove that old pizza men!'});
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