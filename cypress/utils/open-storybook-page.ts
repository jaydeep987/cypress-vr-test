import * as path from 'path';

const storybookHost = 'http://localhost:9001';
const URL_POSTFIX = '/iframe.html?id=';

// http://localhost:9001/iframe.html?id=ui-components-ui-button--with-secondary

declare const cy;

export function openStoryPage(componentPath: string, dataName: string) {
  // baseUrl is set in vr-test.sh runner
  cy.visit(`/${URL_POSTFIX}${getStorySectionName(componentPath)}--${dataName}`);
}

function getStorySectionName(componentPath: string) {
  const componentName = path.basename(componentPath);
  const componentLibName = path.basename(path.dirname(componentPath));

  return `${componentLibName}-${componentName}`;
}
