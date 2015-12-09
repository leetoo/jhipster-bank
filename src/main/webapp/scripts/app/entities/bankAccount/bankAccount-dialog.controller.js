'use strict';

angular.module('bankApp').controller('BankAccountDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'BankAccount', 'Transfer', 'User',
        function($scope, $stateParams, $modalInstance, entity, BankAccount, Transfer, User) {

        $scope.bankAccount = entity;
        $scope.transfers = Transfer.query();
        $scope.users = User.query();
        $scope.load = function(id) {
            BankAccount.get({id : id}, function(result) {
                $scope.bankAccount = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('bankApp:bankAccountUpdate', result);
            $modalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.bankAccount.id != null) {
                BankAccount.update($scope.bankAccount, onSaveSuccess, onSaveError);
            } else {
                BankAccount.save($scope.bankAccount, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
