
var PluginLog = new Logger('PluginManager');

// var isDev = ('localhost' === window.location.hostname);
// Logger.setLevel('useraccounts', isDev ? 'trace' : 'info');
Logger.setLevel('debug');


// ------------------------------------------
//  Logs the start of execution of this file
// ------------------------------------------
PluginLog.debug('Loading PluginManager');

// ------------------------
//  Base Class Declaration
// ------------------------


// Constructor
var PluginManager = function() {
  var self = this;
  self.log.debug('Instantiating PluginManager');

  self.__startup();
};

var p = PluginManager.prototype;
// Logger
p.log = PluginLog;


p.__startupHooks = [];



p.__startup = function(){
  var self = this;

  // run the startup hooks. other calls to startup() during this can still
  // add hooks to the end.
  while (self.__startupHooks.length) {
    var hook = self.__startupHooks.shift();
    hook();
  }
  // Setting this to null tells Meteor.startup to call hooks immediately.
  self.__startupHooks = null;
}


p.hook = function (callback) {
  var self = this;

  if (self.__startupHooks) {
    __self.__startupHooks.push(callback);
  } else {
    // We already started up. Just call it now.
    callback();
  }
};

PM = new PluginManager();

