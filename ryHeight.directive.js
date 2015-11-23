angular.module('ryHeightDemo')
.directive('ryHeight', ['$animate', '$timeout', '$window', function($animate, $timeout, $window) {
  return {
    restrict: 'A',
    transclude: true,
    template: '<div ng-transclude></div>',
    link: function postLink(scope, element, attributes) {
      var domElement = element[0];
      var innerDomElement = element.children()[0];
      //hook to define the CSS height transition
      element.addClass('ry-height');
      //wait until next digest cycle
      $timeout(function() {
        updateHeight();
      });
      //run in parallel with animations of entering children
      $animate.on('enter', domElement, function enter(element, phase) {
        if (phase === 'start') {
          updateHeight();
        }
      });
      //run after element leaves
      $animate.on('leave', domElement, function leave(element, phase) {
        if (phase === 'close') {
          updateHeight();
        }
      });
      //convert auto height to explicit height
      function updateHeight() {
        domElement.style.height = $window.getComputedStyle(innerDomElement).height;
      }
    }
  };
}]);
