const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

/**
 * This utility will generate fixture for cypress which is json file.
 * The file will contain information and data of all components which will be visually testsed.
 * It act as visual test generator, as cypress tests will be generated from data available in this file.
 *
 * To Explain how data will be used, let's consider one component ui-button.
 *  * Each component has __test directory with data directory
 *  * Data dir contains test cases of component, covering all possibilities of different usage. So, it contains
 *    several files, each file is test case and in it, having props passed to component.
 *  * Each file is a story which will be shown in storybook.
 *  * Cypress we use to take screenshots of visual components, where we should test visual component with all of visual styles covered,
 *    which is what each story is doing.
 *  * So we can re-use that test files to generate cypress tests and cypress can visit all stories and take screenshot.
 *
 * Currently cypress has limitation of:
 *  * As test is fully run in browser, we cannot access fs. So we cannot get file names exist in __test/data
 *  * One way is to get thos info in plugins and get in test using cy.task. But we cannot execute cy.task to generate tests.
 *
 * So this utility will be executed before running cypress test and gathers all components' all data and export it as json.
 * In test file, we can require this exported json and generate tests.
 */

if (process.argv.length <= 2) {
  console.error('[Err] Argument for src dir is missing');
  process.exit(-1);
}

if (process.argv.length <= 3) {
  console.error('[Err] Argument for cypress dir is missing');
  process.exit(-1);
}

const args = process.argv.slice(2);

// Source directory should be passed as arg
const SRC_DIR = args[0];
// Cypress directory to save generated fixture file
const CYPRESS_DIR = args[1];
// Regexp to search for vr spec files
const VR_SPEC_REGEX = /[\w-]+\.vr-spec\.[j|t]s/g;

function searchVisualTestComponents() {
  return shell.find(SRC_DIR).filter((file) => file.match(VR_SPEC_REGEX));
}

function getComponentTestData(componentPath: string) {
  const dataDir = path.join(componentPath, '__test', 'data');
  const data = fs.existsSync(dataDir) ? fs.readdirSync(dataDir) : [];

  return data.map((item) => item.replace(/\.[t|j]s/, ''));
}

function getFixtureData() {
  const visualTests = searchVisualTestComponents();
  const fixture = visualTests.reduce((fixtureData, specFile) => {
    const testPath = path.dirname(specFile);
    const componentName = path.basename(path.dirname(path.dirname(specFile)));
    const componentPath = path.dirname(path.dirname(specFile));
    const data = getComponentTestData(componentPath);

    return {
      [specFile]: {
        testPath,
        componentPath,
        componentName,
        data,
      },
      ...fixtureData,
    };
  }, {});

  return fixture;
}

function generateFixtureJSON() {
  const fixtureData = JSON.stringify(getFixtureData(), null, 2);
  const fixtureFilePath = path.join(CYPRESS_DIR, 'fixtures', 'vr-test-data.json');

  // save in file
  fs.writeFile(fixtureFilePath, fixtureData, (err) => {
    if (err) {
      console.error('There was error saving fixture data \n', err);
      process.exit(-1);
    }

    console.log(`Fixture file ${fixtureFilePath} was saved and tests are ready to be generated...`);
  });
}

generateFixtureJSON();
