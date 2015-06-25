'use strict';

// Declare app level module which depends on views, and components
angular.module('app', []).controller('ctrl', ['$scope', '$q', '$timeout', function ($scope, $q, $timeout) {
    $scope.fastBoy = "";
    $scope.slowBoy = "";

    $scope.getNewsAsyn = function (goodNews) {
        getSlowResultAsyn(goodNews);
        getFastResult(goodNews);
    };

    $scope.getNewsSyn = function (goodNews) {
        getSlowResultSyn(goodNews);

    };

    $scope.cleanResult = function () {
        $scope.fastBoy = "";
        $scope.slowBoy = "";
    };

    function getSlowResultSyn(success) {
        var result;
        $timeout(function () {
            if (success) {
                $scope.slowBoy = "This is great!";
            } else {
                $scope.slowBoy = "Really bad";
            }
            getFastResult(success);
        }, 2000);
        return result
    }

    function getSlowResultAsyn(success) {
        deferredTimer(success).then(function (response) {
                $scope.slowBoy = response.message;
            }, function (response) {
                $scope.slowBoy = response.message;
            }
        );
    }

    function getFastResult(success){
        if(success){
            $scope.fastBoy = "This is great!";
        }else{
            $scope.fastBoy = "Really bad";
        }
    }

    function deferredTimer(success) {
        var deferred = $q.defer();
        $timeout(function () {
            if (success) {
                deferred.resolve({message: "This is great!"});
            } else {
                deferred.reject({message: "Really bad"});
            }
        }, 2000);
        return deferred.promise;
    }
}]);
