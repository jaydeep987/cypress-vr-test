import { configure, addParameters } from '@storybook/angular';

addParameters({
  options: {
    showPanel: true,
    panelPosition: 'right',
    hierarchySeparator: /\//,
    theme: {
      brandTitle: 'Angular ui components',
      brandUrl: '<GIT URL>'
    }
  },
});

configure(() => {
  require('./stories').stories;
}, module);
