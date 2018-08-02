/* ==============================================================================
 * app.js -- Main application file.
 * 
 * This chunk performs the following actions:
 *  * initialize the angular module
 *  * define routing behavior with ui.router
 * 
 * The 'gulp' utility will concatenate and minify this and other javascript code
 * and place in the app/dist/ directory as per directions in gulpfile.js.
 * 
 * Code style mostly follows: https://github.com/johnpapa/angular-styleguide
 */

(function() {
  'use strict';

  // Define our application, 'App', and list module dependencies (all found in dependencies.js)
  angular
    .module('App', ['ui.router', 'ui.bootstrap', 'rzModule'])
    .config(configure)
    .filter('unsafe', function($sce) {
      // This allows for injecting unescaped html (which can be dangerous!) using the 'unsafe' filter
      return function(val) {
        return $sce.trustAsHtml(val);
      };
    });

  // dependency injections
  // $stateProvider lets us define states and routes for ui.router
  // $urlRouterProvider lets us change the route
  configure.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configure($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state("index", {
        url: "/",
        templateUrl: "main.html"
      })
      .state("help", {
        url: "/help",
        templateUrl: "help.html"
      });

    $urlRouterProvider.otherwise("/");

  }

})();

/* ==============================================================================
 * controllers/simpleController.js -- Controller for simple page
 *
 * From https://docs.angularjs.org/guide/controller:
 *   Use controllers to:
 *     * Set up the initial state of the vm object.
 *     * Add behavior to the vm object.
 *
 * This controller controls the leaflet map.
 */

(function() {
  'use strict';

  angular.module('App')
    .controller('MainCtrl', MainCtrl);

  // Dependency Injection:
  //   $window -- for opening a new window
  //   DataService -- stores overall state data and settings
  MainCtrl.$inject = ['$window', 'DataService'];

  function MainCtrl($window, DataService) {

    // ------------------------------------------------------------------------
    //     BEGIN MainCtrl definition     --------------------------------------

    // view model
    var vm = this;

    // All UI state information is contained in the DataService
    vm.data = DataService;

    // method definitions -----------------------------------------------------

    vm.assembleUrl = assembleUrl;
    vm.currentDate = new Date();
    vm.dateFunc = dateFunc;
    vm.openUrl = openUrl;
    vm.startDate = new Date(new Date().getTime() - (vm.data.lookBackDays * 24 * 60 * 60 * 1000));

    vm.slider = {
      value: 7,
      options: {
        floor: 2,
        ceil: 21,
        step: 1,
        minLimit: 2,
        maxLimit: 21,
        onChange: vm.dateFunc,
        showSelectionBar: true,
        rightToLeft: true,
        translate: function(value) {
          return value + " days";
        }
      }
    };

    //     END MainCtrl definition     ----------------------------------------
    // ------------------------------------------------------------------------

    // Initialization
    // 
    // nothing to do

    // ------------------------------------------------------------------------
    //     BEGIN method definitions     ---------------------------------------
    // ------------------------------------------------------------------------

    // Open a URL in a new window
    function openUrl(url) {
      $window.open(url, "_blank");
    }

    // Assemble a plot URL from user settings
    function assembleUrl() {
      // e.g. https://test-c1.airfire.org/monitor-custom/v1/uptime?serverid=tools-c3
      var url = vm.data.plotService + "?serverid=" + vm.data.serverid + "&lookbackdays=" + vm.data.lookBackDays + "&ymax=" + vm.data.yMax;
      return(url);
    }

    function dateFunc() {
      vm.startDate = new Date(new Date().getTime() - (vm.data.lookBackDays * 24 * 60 * 60 * 1000));
    }

  }

})();

/* ============================================================================
 * services/dataService.js -- Service containing state data.
 *
 * Services are always 'singleton'. Controllers pull from and modify this data.
 * 
 */

(function() {
  'use strict';

  angular.module('App')
    .factory('DataService', DataService);

  // Dependency Injection:
  //   none
  DataService.$inject = [];

  function DataService() {

    // ------------------------------------------------------------------------
    //     BEGIN DataService definition     -----------------------------------
    
    var Factory = this;
    
    // Data service state variables
    Factory.plotService = 'https://test-c1.airfire.org/monitor-custom/v1/uptime';
    Factory.serverids = ['tools-c2','tools-c3','tools-c4'];
    Factory.serverid = 'tools-c2';
    Factory.lookBackDays = 7;
    Factory.yMaxs = [{label: "Auto",  value: 0},
                     {label: "1",     value: 1},
                     {label: "2",     value: 2},
                     {label: "5",     value: 5},
                     {label: "10",    value: 10},
                     {label: "50",    value: 50}];
    Factory.yMax = 0;

    return Factory;

    //     END DataService definition     -------------------------------------
    // ------------------------------------------------------------------------

  }

})();

/* ==============================================================================
 * directives/popup.js -- Full page popup that fades out when clicked.
 *
 * Relies on CSS rules from app/css/5_components.scss
 */

(function() {
  'use strict';

  angular.module('App')
  	.directive('popup', popup);

  function popup() {

    var directive = {
      restrict: 'E',		// Is an element <popup> </popup>
      transclude: true,	// Allows HTML content inside
      scope: {
        visible: '='		// Binds it to some boolean attribute, will show when true
        					      // Because this is binded with "=" when the popup is clicked
        					      // The external variable this is bound to will change to false
      },
      template: '<div class="popup-wrapper" ng-click="visible=false" ng-class="{visible: visible}"><div class="row popup" ng-transclude></div></div>'
    };

    return directive;

  }

})();
