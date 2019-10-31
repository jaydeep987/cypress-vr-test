import { storiesOf } from '@storybook/angular';
import { dirname, basename, sep } from 'path';
import {
  text,
  number,
  boolean,
  object,
} from '@storybook/addon-knobs';

import { withKnobs } from '@storybook/addon-knobs';

// these are defined in ./webpack.config
declare const ROOT_DIR;
declare const ALL_DATA_MODULES_REGEXP;
declare const COMPONENT_MODULES_REGEXP;

// tslint:disable-next-line:no-string-literal
const allDataModules = require.context(
  ROOT_DIR,
  true,
  ALL_DATA_MODULES_REGEXP,
);

// tslint:disable-next-line:no-string-literal
const componentModules = require.context(
  ROOT_DIR,
  true,
  COMPONENT_MODULES_REGEXP,
);

console.log('-----------------------', allDataModules.keys());
console.log('-----------------------', componentModules.keys());

// TODO: Better name ?
function wordifyKebabName(kebabName: string) {
  return kebabName.replace(/-/g, ' ');
}

function removeExtension(str: string): string {
  return str.replace(/\.tsx?/, '');
}

function getStoryName(componentPath) {
  const componentName = basename(componentPath);
  const componentsLibraryName = basename(dirname(componentPath));

  return `${(wordifyKebabName(componentsLibraryName) + '/')}${wordifyKebabName(componentName)}`;
}

componentModules.keys().forEach((path) => {
  const componentDir = dirname(path);
  const name = basename(dirname(path));
  const storybookObject = storiesOf(getStoryName(componentDir), module);
  const componentName = basename(dirname(dirname(path))) + sep + name;

  console.log('path-----------------------', path);
  console.log('componentDir-----------------------', componentDir);
  console.log('name-----------------------', name);
  console.log('componentName-----------------------', componentName);

  storybookObject.addParameters({
    knobs: {
      disableDebounce: true,
    },
  });
  // Storybook Addon Knobs allow you to edit props dynamically using the Storybook UI
  // But this won't work if we don't use types provided by addons-knobs plugin
  // https://github.com/storybookjs/storybook/blob/master/examples/angular-cli/src/stories/addon-knobs.stories.ts
  storybookObject.addDecorator(withKnobs);

  allDataModules.keys().filter((item) => item.startsWith(`${componentDir}${sep}`)).forEach((dataPath) => {
    const storyName = removeExtension(basename(wordifyKebabName(dataPath)));
    console.log('dataPath-----------------------', dataPath);
    console.log('storyName-----------------------', storyName);

    storybookObject.add(storyName, () => {
      // Get exported member: test (it is object having props)
      const exportedDataName = Object.keys(allDataModules(dataPath))[0];
      // Get all keys of exported member object
      const dataModule = allDataModules(dataPath)[exportedDataName];

      console.log('exportedDataName-----------------------', exportedDataName);
      console.log('dataModule-----------------------', dataModule);

      // Returns object having component as one of key
      const componentModule = require(
        `${ROOT_DIR}/${componentName}/${name}.component.ts`,
      );
      // Get that key
      const exportedComponentName = Object.keys(componentModule)[0];
      // Using that key, get value, which is our component
      const component = componentModule[exportedComponentName];

      console.log('component-----------------------', component);

      // Return story
      return {
        component,
        props: {
          ...knobify(dataModule),
        },
      };
    });
  });
});

export function knobify(props) {
  const groupName = 'Props';
  return Object.keys(props).reduce((res, name) => {
    const prop = props[name];

    if (typeof prop === 'boolean') {
      res[name] = boolean(name, prop, groupName);
      return res;
    }

    if (typeof prop === 'string') {
      res[name] = text(name, prop, groupName);
      return res;
    }

    if (typeof prop === 'number') {
      res[name] = number(name, prop);
      return res;
    }

    if (typeof prop === 'object') {
      res[name] = object(name, prop, groupName);
    }

    if (isJSONCompatible(props[name])) {
      res[name] = object(name, prop, groupName);
      return res;
    }

    res[name] = props[name];
    return res;
  }, {});
}

function isJSONCompatible(prop) {
  if (typeof prop !== 'object' && typeof prop !== 'function') {
    return true;
  }

  if (prop && prop.constructor === Object) {
    return Object.values(prop).every(isJSONCompatible);
  }

  if (Array.isArray(prop)) {
    return prop.every(isJSONCompatible);
  }

  return false;
}
