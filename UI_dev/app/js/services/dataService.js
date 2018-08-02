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
