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
    Factory.yMax = 1;

    return Factory;

    //     END DataService definition     -------------------------------------
    // ------------------------------------------------------------------------

  }

})();
