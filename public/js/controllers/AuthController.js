angular.module('myApp')
  .controller('AuthController', function($scope, $http, $location) {
    $scope.credentials = {}; // Onde vamos guardar o username e a senha
    $scope.error = false; // Começamos sem erros
    $scope.errorMessage = '';

    $scope.login = function() { // A função que é chamada quando o usuário clica em "Login"
      $http.post('/auth/login', $scope.credentials) // Envia os dados para a nossa API
        .then(function(response) { // Se a API responder com sucesso
          // Aqui você vai SALVAR o token JWT (por enquanto, vamos só mostrar)
          console.log("Token recebido:", response.data.token);
          $location.path('/products'); // Redireciona para a página de produtos
        })
        .catch(function(error) { // Se a API responder com erro
          $scope.error = true; // Mostra a mensagem de erro
          $scope.errorMessage = 'Credenciais inválidas';
        });
    };
  });