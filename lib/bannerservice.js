var banners;
var fs = require('fs');
var log = require('npmlog');

/**
 * Creates an instance of the Banner Service.
 * @constructor
 */
function BannerService() {
  this.banners = [];
}

BannerService.initialize = function() {
  var self = this;

  // Read settings file on initialization
  this.readSettingsFile();

  // Watch for changes to banners.json
  fs.watch(__dirname+'/../assets/banners/', function (event, filename) {
    if (filename === 'banners.json') {
      log.info("Change detected on banners.json.");
      self.readSettingsFile();
    }
  });
};

BannerService.readSettingsFile = function() {
  try {
    this.banners = [];
    var bannerObj = JSON.parse(fs.readFileSync(__dirname+'/../assets/banners/banners.json', 'utf8'));
    for (var i in bannerObj) {
      if (bannerObj[i].enabled) {
        this.banners.push(bannerObj[i]);
      }
    }
    log.info("New banners.json successfully loaded. "+bannerObj.length+" found.");
  } catch (err) {
    log.warn("Error while parsing banners.json..");
    this.banners = [];
  }
};

module.exports = BannerService;