var app = angular.module('cotacaoApp',['720kb.socialshare']);

app.controller('cotacaoCtrl', ['$scope', '$http', 'Socialshare', function($scope, $http, Socialshare) {
  var api_bitgrail = "https://bitgrail.com/api/v1/markets";
  var api_mercatox = "https://mercatox.com/public/json24";
  var api_coinmarket = "https://api.coinmarketcap.com/v1/ticker/raiblocks/";
  //var api_foxbit = "http://api.blinktrade.com/api/v1/BRL/ticker?crypto_currency=BTC";
  $scope.valor_cotacao = 0;
  $scope.carregando = true;
  $scope.getCotacao = function(){
    $http.get(api_coinmarket).then(function(response) {
      //console.log(response);
      //console.log(response);
      var dados_xrb = response.data[0];
      var cotacao_xrb = dados_xrb.price_btc;
      //console.log(cotacao_xrb);
      $http.get("https://www.mercadobitcoin.net/api/BTC/ticker/").then(function(response_fox){
        //console.log(response_fox);
        var cotacao_bitcoin = response_fox.data.ticker.last;
        //console.log();
        $scope.valor_cotacao = cotacao_bitcoin*cotacao_xrb;
        $scope.valor_cotacao = $scope.valor_cotacao.toFixed(2);
        $scope.carregando = false;
      })
    });
  }
  $scope.getCotacao();
  setInterval(function(){
    $scope.getCotacao();
  }, 15000);
}]);
