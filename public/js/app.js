angular.module('myApp', ['ngRoute']) // Criamos o "módulo" da nossa aplicação
  .config(function($routeProvider) { // Configura as "rotas" (URLs)
    $routeProvider
      .when('/login', { // Quando o endereço for /login
        templateUrl: 'views/login.html', // Carrega este arquivo HTML
        controller: 'AuthController' // E usa este "controlador" para controlar a página
      })
      .when('/products', { // Quando o endereço for /products
        templateUrl: 'views/product-list.html',
        controller: 'ProductController'
      })
      .when('/cart', { // Quando o endereço for /cart
        templateUrl: 'views/cart.html',
        controller: 'CartController'
      })
      .when('/add-product', { // Quando o endereço for /add-product
        templateUrl: 'views/add-product.html',
        controller: 'ProductController'
      })
      .otherwise({ // Se o endereço não for nenhum dos acima
        redirectTo: '/login' // Redireciona para o /login
      });
  })
  .run(function($rootScope, $location) {
    $rootScope.goToCart = function() {
        $location.path('/cart');
    };
});