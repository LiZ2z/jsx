const resolveApp = require('./path-resolve')

// config after eject: we're in ./config/
module.exports = {
  appRoot: resolveApp(''),
  appDist: resolveApp('lib'),
  appPublic: resolveApp('public'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
};
