'use strict';

var pseModule = angular.module('pseModule', []);

/*Menu*/
pseModule.directive('tree', function() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      tree: '='
    },
    templateUrl: 'navbar/template-ul.html'
  };
});

pseModule.directive('leaf', function($compile) {
  return {
    restrict: "E",
    replace: true,
    scope: {
      leaf: "="
    },
    templateUrl: 'navbar/template-li.html',
    link: function(scope, element, attrs) {
      if (angular.isArray(scope.leaf.subtree)) {
        element.append("<tree tree='leaf.subtree'></tree>");
        element.addClass('dropdown-submenu');
        $compile(element.contents())(scope);
      }
    }
  };
});
/*end for menu*/