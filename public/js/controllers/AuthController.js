angular.module('myApp')
  .controller('AuthController', function($scope, $http, $location) {
    $scope.credentials = {}; // Onde vamos guardar o username e a senha
    $scope.error = false; // Começamos sem erros
    $scope.errorMessage = '';
    $scope.isLogado = false; // Variável para verificar se o usuário está logado

    $scope.login = function() { // A função que é chamada quando o usuário clica em "Login"
      $http.post('/auth/login', $scope.credentials) // Envia os dados para a nossa API
        .then(function(response) { // Se a API responder com sucesso
          
          localStorage.setItem('token', response.data.token); // Armazena o token no localStorage após o login
          $scope.isLogado = true; // Atualiza a variável de estado de login
          $location.path('/products'); // Redireciona para a página de produtos
        })
        .catch(function(error) { // Se a API responder com erro
          $scope.error = true; // Mostra a mensagem de erro
          $scope.errorMessage = 'Credenciais inválidas';

          
        });

    };
    $scope.register = function() {
      $http.post('/auth/register', $scope.credentials)
        .then(function(response) {
          $location.path('/login');
        })
        .catch(function(error) {
          $scope.error = true;
          if (error.status === 400) {
            $scope.errorMessage = 'Dados inválidos. Verifique os campos.';
          } else if (error.status === 409) {
            $scope.errorMessage = 'Usuário já existe.';
          } else {
            $scope.errorMessage = 'Erro ao registrar. Tente novamente.';
            console.error('Erro de registro:', error); // Log do erro para depuração
          }
        });
    }
    });