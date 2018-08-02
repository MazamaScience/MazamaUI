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
