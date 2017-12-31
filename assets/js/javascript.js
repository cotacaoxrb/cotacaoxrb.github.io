var app = angular.module('cotacaoApp',['720kb.socialshare']);

app.controller('cotacaoCtrl', ['$scope', '$http', 'Socialshare', function($scope, $http, Socialshare) {
  var api_bitgrail = "https://bitgrail.com/api/v1/markets";
  var api_mercatox = "https://mercatox.com/public/json24";
  var api_foxbit = "https://api.blinktrade.com/api/v1/BRL/ticker";
  $scope.valor_cotacao = 0;
  $scope.carregando = true;
  $scope.getCotacao = function(){
    $http.get(api_mercatox).then(function(response) {
      //console.log(response);
      var dados_xrb = response.data.pairs["XRB_BTC"];
      var cotacao_xrb = dados_xrb.last;
      //console.log(cotacao_xrb);
      $http.get(api_foxbit).then(function(response_fox){
        var cotacao_bitcoin = response_fox.data.last;
        //console.log();
        $scope.valor_cotacao = cotacao_bitcoin*cotacao_xrb;
        $scope.carregando = false;
      })
    });
  }
  $scope.getCotacao();
  setInterval(function(){
    $scope.getCotacao();
  }, 15000);
}]);
