angular
  .module("myApp")
  .controller("ProductController", function ($scope, $http, $location) {
    $scope.products = [];

    // Fetch products on page load
    $http
      .get("/products")
      .then(function (response) {
        $scope.products = response.data;
      })
      .catch(function (error) {
        console.error("Error fetching products:", error);
      });

    $scope.addToCart = function (product) {
      $http
        .post("/cart",{ productId: product.id, quantity: 1 },
          {
            // Send productId and quantity
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then(function (response) {
          console.log("Product added to cart:", response.data);
           
        })
        .catch(function (error) {
          console.error("Error adding product to cart:", error);
        });
    };

    $scope.goToAddProduct = function () {
      $location.path("/add-product");
    };

    $scope.backToProducts = function () {
      $location.path("/products");
    };

    $scope.addProduct = function () {
        const token = localStorage.getItem('token'); // Get token from localStorage
        $http
            .post("/products", $scope.newProduct, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(function (response) {
                
                $location.path("/products");
            })
            .catch(function (error) {
                console.error("Error adding product:", error);
            });
    };
  });
