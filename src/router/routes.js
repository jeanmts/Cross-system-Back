const express = require("express");
const routes = express();

const controllerUsers = require("../controllers/users");
const controllerProducts = require("../controllers/products");
const controllersRequests = require('../controllers/requests')


routes.get('/users', controllerUsers.listUsers);
routes.get('/users/:id', controllerUsers.user);
routes.post('/register', controllerUsers.addUser);
routes.post('/sign-in', controllerUsers.loginUser);
routes.patch('/users/:id', controllerUsers.detailUser);
routes.delete('/users/:id', controllerUsers.deleteUser);

routes.get('/products', controllerProducts.listProducts);
routes.get('/products/:id', controllerProducts.product);
routes.post('/products', controllerProducts.addProducts);
routes.patch('/products/:id', controllerProducts.editProduct)
routes.delete('/produts/:id', controllerProducts.deleteProduct);

routes.get('/users/requests',controllersRequests.listRequests);
routes.get('/users/requests/:id',controllersRequests.requests);
routes.post('/users/requests/:id',controllersRequests.addRequests);
routes.patch('/users/requests/:id',controllersRequests.editRequests);
routes.delete('/users/requests/:id',controllersRequests.deleteRequest);


module.exports = routes;