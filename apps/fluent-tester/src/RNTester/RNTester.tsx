'use strict';

import { ThemeProvider } from '@uifabricshared/theming-react-native';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { FluentTester, IFluentTesterProps } from './FluentTester';
import { customRegistry } from './TestComponents/Theme/CustomThemes';
import { Tests } from './Tests';

const RNTesterApp: React.FunctionComponent<IFluentTesterProps> = props => {
  return (
    <ThemeProvider registry={customRegistry}>
      <FluentTester enabledTests={Tests} {...props} />
    </ThemeProvider>
  );
};

AppRegistry.registerComponent('RNTesterApp', () => RNTesterApp);

export default RNTesterApp;
