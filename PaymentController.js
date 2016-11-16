/**
 * CallBack Controller
 */

var app = angular.module('Payment', ['angular.filter']);

app.controller('PaymentCtrl', function($scope, $http, $filter){
		
	$scope.paymentlist = function() {
		$scope.promish = false;		
		$scope.filterPay = false;
		$scope.addPay = false;
		$scope.payme = true;
		$http.get('http://localhost:3000/payments').then(function(response){			
			$scope.payments = response.data;
			console.log("$scope.payments :", $scope.payments);
		});		
	}
	
	$scope.getPromise = function() {
		$scope.payme = false;		
		$scope.filterPay = false;
		$scope.addPay = false;
		$scope.promish = true;
		$scope.merchants = [];
		$http.get('http://localhost:3000/payments').then(function(response){			
			$scope.payments = response.data;			
			angular.forEach($scope.payments, function(payment){
				if(payment.merchant == "Ginger"){
					$scope.merchants.push(payment);
				}
			});
			console.log("$scope.payments :", $scope.payments);
			console.log("$scope.merchants :", $scope.merchants);
		});		
	}
	
	$scope.getFilterPayment = function(){
		$scope.payme = false;
		$scope.promish = false;
		$scope.addPay = false;
		$scope.filterPay = true;
		
		$http.get('http://localhost:3000/payments').then(function(response){
			$scope.payments = response.data;			
		});
		console.log("$scope.payments :", $scope.payments);
	}
	
	$scope.addPayment = function(){
		$scope.payme = false;
		$scope.promish = false;
		$scope.filterPay = false;
		$scope.addPay = true;
		$scope.payments= [];
		$scope.processForm = function(){
		
		var dataObj = $.param({
				  id:$scope.id,
				  method: $scope.method,
				  amount:$scope.amount,
				  currency: $scope.currency,
		          created: $scope.created,
		          status: $scope.status,
		          merchant: $scope.merchant
		});
		
		
		
		var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
		
		var res = $http.post('http://localhost:3000/payments', dataObj, config);
		
		res.success(function(data, status, headers, config) {			
			$scope.message = data;
		});
		
		res.error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });		
		// Making the fields empty
		$scope.id = '';
		$scope.method = '';
		$scope.amount = '';
		$scope.currency = '';
		$scope.created ='';
		$scope.status= '';
		$scope.merchant= '';
		}		
	}
	
	
}).filter("emptyToEnd", function () {
    return function (array, key) {
    	if(!angular.isArray(array)) return;
        var present = array.filter(function (item) {
            return item[key];
        });
        var empty = array.filter(function (item) {
            return !item[key]
        });
        return present.concat(empty);
    };
});


