angular.module('myApp')
    .controller('CartController', function($scope, $http) {
        $scope.cartItems = [];

        // Fetch cart items on page load
        function fetchCartItems() {
            $http.get('/cart') // Adjust the URL if needed
                .then(function(response) {
                    $scope.cartItems = response.data;
                })
                .catch(function(error) {
                    console.error('Error fetching cart items:', error);
                });
        }

        fetchCartItems();

        $scope.removeFromCart = function(item) {
            $http.delete('/cart/' + item.id) // Adjust the URL and method if needed
                .then(function(response) {
                    // Optionally, remove the item from the local array
                    $scope.cartItems = $scope.cartItems.filter(i => i.id !== item.id);
                    console.log('Item removed from cart:', item);
                    fetchCartItems(); // Refresh the cart
                })
                .catch(function(error) {
                    console.error('Error removing item from cart:', error);
                });
        };
    });