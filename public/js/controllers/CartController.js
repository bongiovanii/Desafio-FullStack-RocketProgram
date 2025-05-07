angular.module('myApp')
    .controller('CartController', function($scope, $http, $location) {
        $scope.cartItems = [];

        // Fetch cart items on page load
        function fetchCartItems() {
            $http.get('/cart', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token') // Get token
                }
            })
            .then(function(response) {
                $scope.cartItems = response.data;
            })
            .catch(function(error) {
                console.error('Error fetching cart items:', error);
            });
        }

        fetchCartItems();

        $scope.addToCart = function(product) {
          $http.post('/cart', { productId: product.id, quantity: 1 }, { // Send productId and quantity
              headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
              }
          })
          .then(function(response) {
              console.log('Product added to cart:', response.data);
              fetchCartItems(); // Refresh cart
          })
          .catch(function(error) {
              console.error('Error adding product to cart:', error);
          });
        };

        $scope.removeFromCart = function(item) {
            console.log(item.id);
            $http.delete('/cart/' + item.id, {  // Use item.id
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(function(response) {
                $scope.cartItems = $scope.cartItems.filter(i => i.id !== item.id);
                console.log('Item removed from cart:', item);
                fetchCartItems();
            })
            .catch(function(error) {
                console.error('Error removing item from cart:', error);
            });
        };

        $scope.updateQuantity = function(item, quantity) {
          $http.put('/cart/' + item.id, { quantity: quantity }, { // Send itemId and quantity
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then(function(response) {
            item.quantity = quantity; // Update quantity locally
            console.log('Quantity updated:', response.data);
          })
          .catch(function(error) {
            console.error('Error updating quantity:', error);
          });
        };

        $scope.backToProducts = function () {
            $location.path("/products");
        };
    });