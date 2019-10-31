import { openStoryPage } from '../../../cypress/utils/open-storybook-page';

/** Cypress is global object by cypress lib */
declare const Cypress;
declare const cy;
declare const context;
declare const before;

interface ComponentInfoFixtureData {
  [key: string]: {
    testPath: string;
    componentPath: string;
    componentName: string;
    data: string[];
  };
}

interface SpecifiedCase {
  description: string;
  dataName?: string;
  callback(): void;
}

export class TestComponent {
  private description: string;
  private componentName: string;
  private componentPath: string;
  private testPath: string;
  private data: string[];
  private specifiedCases: SpecifiedCase[];

  constructor(data?: string) {
    console.log('`````````` runninggg....');
    const info = this.getComponentInfo();
    const componentInfo = this.getComponentInfo();
    this.componentPath = componentInfo.componentPath;
    this.componentName = componentInfo.componentName;
    this.testPath = componentInfo.testPath;
    this.description = `[Component: ${this.componentName}]: Visual Regression`;
    this.data = data ? [].concat(data) : componentInfo.data;
  }

  private getComponentInfo() {
    const path = Cypress.spec.relative;
    const fixtureData: ComponentInfoFixtureData = require('../../../cypress/fixtures/vr-test-data.json');

    if (!fixtureData) {
      throw new Error('No test data available in fixture dir');
    }

    return fixtureData[path];
  }

  specifyCase(specifiedCase: SpecifiedCase) {
    this.specifiedCases.push(specifiedCase);

    return this;
  }

  test() {
    // We need to wrap our actual tests in `it` so we can access cy.task
    context(this.description, () => {
      this.data.forEach((datum) => {
        const expectation = `Data: ${datum} => Should take new screenshot and match with expected`;

        it(expectation, () => {
          const screenshotName = `${this.componentName}-${datum}`;

          // open storybook page for datum
          openStoryPage(this.componentPath, datum);

          // take screenshot
          cy.matchImageSnapshot(screenshotName);
        });
      });
    });
  }
}
