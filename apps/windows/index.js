'use strict';

import { customRegistry, FluentTester as FluentTesters } from '@fluentui-react-native/tester';
import { ThemeProvider } from '@uifabricshared/theming-react-native';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { windowsTests } from './WindowsTests';

const FluentTester = props => {
  return (
    <ThemeProvider registry={customRegistry}>
      <FluentTesters enabledTests={windowsTests} {...props} />
    </ThemeProvider>
  );
};

AppRegistry.registerComponent('FluentTester', () => FluentTester);

export default FluentTester;
