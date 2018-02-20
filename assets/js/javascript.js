var app = angular.module('cotacaoApp',['720kb.socialshare', 'ngMask']);

app.controller('cotacaoCtrl', ['$scope', '$http', 'Socialshare', function($scope, $http, Socialshare) {
  var api_bitgrail = "https://bitgrail.com/api/v1/markets";
  var api_mercatox = "https://mercatox.com/public/json24";
  var api_coinmarket = "https://api.coinmarketcap.com/v1/ticker/nano/";
  //var api_foxbit = "http://api.blinktrade.com/api/v1/BRL/ticker?crypto_currency=BTC";
  $scope.valor_cotacao = 0;
  $scope.carregando = true;
  $scope.amount_xrb = 1;
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
        $scope.setTotal();
      })
    });
  }
  $scope.getCotacao();
  setInterval(function(){
    $scope.getCotacao();
  }, 15000);

  $scope.setAmount = function(){
    $scope.amount_xrb = $scope.value_total/$scope.valor_cotacao;
    //$scope.amount_xrb = $scope.amount_xrb.toFixed(6);
    //console.log($scope.amount_xrb)
  }
  $scope.setTotal = function(){
    $scope.value_total = $scope.amount_xrb*$scope.valor_cotacao;
    //$scope.value_total.toFixed(2);
  }

}]);



app.directive("numberFormat", function ($filter) {
	return {
		require: "ngModel",
		link: function (scope, element, attrs, ctrl) {
			var _formatNumber = function (number) {
        var novo_numero = number.toString();
        novo_numero = novo_numero.replace(",", ".");
        return novo_numero;
			};

			element.bind("keyup", function () {
				ctrl.$setViewValue(_formatNumber(ctrl.$viewValue));
				ctrl.$render();
			});
      /*
			ctrl.$parsers.push(function (value) {
				if (value.length === 10) {
					var dateArray = value.split("/");
					return new Date(dateArray[2], dateArray[1]-1, dateArray[0]).getTime();
				}
			});
      */
      /*
			ctrl.$formatters.push(function (value) {
				return $filter("date")(value, "dd/MM/yyyy");
			});
      */
		}
	};
});

app.directive("moneyFormat", function ($filter) {
	return {
		require: "ngModel",
		link: function (scope, element, attrs, ctrl) {
			var _formatNumber = function (number) {
        var novo_numero = number.toString();
        novo_numero = novo_numero.replace(",", ".");
        return novo_numero;
			};

			element.bind("keyup", function () {
				ctrl.$setViewValue(_formatNumber(ctrl.$viewValue));
				ctrl.$render();
			});
      /*
			ctrl.$parsers.push(function (value) {
				if (value.length === 10) {
					var dateArray = value.split("/");
					return new Date(dateArray[2], dateArray[1]-1, dateArray[0]).getTime();
				}
			});
      */
      /*
			ctrl.$formatters.push(function (value) {
				return $filter("date")(value, "dd/MM/yyyy");
			});
      */
		}
	};
});
