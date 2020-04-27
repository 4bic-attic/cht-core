angular.module('inboxControllers').controller('AnalyticsTargetsCtrl', function (
  $log,
  $timeout,
  RulesEngine
) {

  'use strict';
  'ngInject';

  const ctrl = this;

  ctrl.targets = [];
  ctrl.loading = true;
  ctrl.targetsDisabled = false;

  RulesEngine.isEnabled()
    .then(isEnabled => {
      ctrl.targetsDisabled = !isEnabled;
      return isEnabled ? RulesEngine.fetchTargets() : [];
    })
    .catch(err => {
      $log.error('Error getting targets', err);
      return [];
    })
    .then(targets => {
      $timeout(() => {
        ctrl.loading = false;
        ctrl.targets = targets;
      });
    });
}
);
