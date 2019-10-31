const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');
const fs = require('fs');
const path = require('path');
const webpackPreprocessor = require('@cypress/webpack-preprocessor');

const AFTER_SCREENSHOT_EVENT = 'after:screenshot';
const SCREENSHOT_DIR = 'expected';

module.exports = (on, config) => {
  const options = {
    webpackOptions: require('../webpack.config'),
  };

  on('file:preprocessor', webpackPreprocessor(options));

  const customOn = (eventName, config) => {
    on(eventName, config);

    // In case of after screenshot event, let their event execute first, so it can do match snapshot and stuff
    // Then we can inject our logic to change path of screenshot
    if (eventName === AFTER_SCREENSHOT_EVENT) {
      on(AFTER_SCREENSHOT_EVENT, (details) => {
        const specFileRegExp = new RegExp('[\\w-]+\\.vr-spec\\.[j|t]s', 'g');
        const specFileName = specFileRegExp.exec(details.path)[0];
        const specPath = `${details.path.substr(0, details.path.indexOf(specFileName))}`;

        // As default pattern, it saves screenshot under spec names dir
        // For e.g. spec name is index.spec.js then it saves screenshots under index.spec.js/screenshot.png
        // We want to save screenshots exactly under __test/expected/ dir
        // Changing specName in details probably not good idea, because we may need spec name somewhere in later in futre.
        // So just try something to remove specname from `path` and move file
        const newPath = `${details.path.replace(/[\w-]+\.vr-spec\.[j|t]s/g, SCREENSHOT_DIR)}`;

        // Create `expected` dir if not exist
        if (!fs.existsSync(`${specPath}${SCREENSHOT_DIR}`)) {
          fs.mkdirSync(`${specPath}${SCREENSHOT_DIR}`);
        }

        fs.copyFileSync(details.path, newPath);

        // After changing dir of screenshot, give it to snapshop lib's event function and it will use that path
        const newDetails = config({ ...details, path: newPath});

        return newDetails;
      });
    }
  };

  addMatchImageSnapshotPlugin(customOn, config);
};
