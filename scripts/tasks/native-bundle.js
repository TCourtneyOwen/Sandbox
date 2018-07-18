module.exports = function() {
  const path = require('path');
  const fs = require('fs');
  const merge = require('../utils/merge');

  const packagePath = path.resolve(process.cwd(), 'package.json');

  if (!fs.existsSync(packagePath)) {
    return;
  }

  const config = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  if (!config.nativeBundles) return;

  createBundles();

  function createBundles() {
    const haulBundle = require('../utils/haul-bundle');

    if (config.nativeBundles.platforms) {
      let platforms = ['ios', 'macos', 'uwp', 'win32', 'android'];

      // Either build all the platforms specfied by the command line, or build all the platforms specifed in package.json
      if (platforms.some(_ => process.argv.indexOf(_) !== -1)) {
        platforms = platforms.filter(_ => process.argv.indexOf(_) !== -1);
      } else {
        platforms = platforms.filter(_ => config.nativeBundles.platforms.indexOf(_) !== -1);
      }

      let devBundle = true;
      let shipBundle = true;
      if ((process.argv.indexOf('dev') !== -1 || process.argv.indexOf('debug') !== -1) && process.argv.indexOf('ship') === -1) {
        shipBundle = false;
      }
      if (process.argv.indexOf('dev') === -1 && process.argv.indexOf('debug') === -1 && process.argv.indexOf('ship') !== -1) {
        devBundle = false;
      }

      // throw new Error(`shipBundle:${shipBundle} devBundle:${devBundle}`);

      const promises = [];
      platforms.forEach(platform => {
        if (devBundle) {
          promises.push(createBundle({ platform: platform, dev: true }));
        }
        if (shipBundle) {
          promises.push(createBundle({ platform: platform, dev: false }));
        }
      });

      return Promise.all(promises);
    }

    function createBundle(bundle) {
      let bundleOptions = merge({ rootPath: process.cwd(), packageName: config.name, dev: false }, bundle);
      haulBundle(bundleOptions);

      if (bundleOptions.thirdPartyNotices) {
        const writeThirdPartyNotices = require('../utils/write-third-party-notices');
        return writeThirdPartyNotices(
          `${bundleOptions.output}.map`,
          `${bundleOptions.output}.tpn.txt`,
          bundleOptions.thirdPartyNoticesIgnoreScopes,
          bundleOptions.thirdPartyNoticesIgnoreModules
        );
      }

      return Promise.resolve();
    }
  }
};
