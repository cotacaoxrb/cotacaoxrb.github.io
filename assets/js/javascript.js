var app = angular.module('cotacaoApp',['720kb.socialshare']);

app.controller('cotacaoCtrl', ['$scope', '$http', 'Socialshare', function($scope, $http, Socialshare) {
  var api_bitgrail = "https://bitgrail.com/api/v1/markets";
  $scope.valor_cotacao = 100.35;
  $scope.getCotacao = function(){
    $http.get(api_bitgrail)
    .then(function(response) {
      console.log(response);
    });
  }
  //$scope.getCotacao();
}]);
