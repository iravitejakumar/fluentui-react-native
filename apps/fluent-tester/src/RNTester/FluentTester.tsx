import { StealthButton, Separator } from '@fluentui/react-native';
import { useTheme } from '@uifabricshared/theming-react-native';
import * as React from 'react';
import { Picker, ScrollView, View, Text } from 'react-native';
import { TestDescription } from './TestComponents';
import { BASE_TESTPAGE } from './TestComponents/Common/consts';
import { fluentTesterStyles } from './TestComponents/Common/styles';
import { registerThemes } from './TestComponents/Theme/CustomThemes';

// uncomment the below lines to enable message spy
/*
import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue';
MessageQueue.spy(true);
*/

registerThemes();

const EmptyComponent: React.FunctionComponent = () => {
  return <Text style={fluentTesterStyles.noTest}>Select a component from the left.</Text>;
};

export interface IFluentTesterProps {
  initialTest?: string;
  enabledTests: TestDescription[];
}

export let app = 'office';

const Header: React.FunctionComponent<{}> = () => {

  const [selectedPlatform, setSelectedPlatform] = React.useState('win32');
  const [selectedApp, setSelectedApp] = React.useState('office');
  const [selectedTheme, setSelectedTheme] = React.useState('default');

  const themeColor = () => {

    let color = 'black'; // default: office (black)

    if (selectedApp == 'office') color = 'black';
    if (selectedApp == 'word') color = '#2B579A';
    if (selectedApp == 'excel') color = '#217346';
    if (selectedApp == 'powerpoint') color = '#B7472A';
    if (selectedApp == 'outlook') color = '#106EBE';

    return { color: color };
  }

  const onAppChange = React.useCallback((appValue: string) => {
    app = appValue;
    setSelectedApp(appValue);
  }, []);

  return (
    <View style={fluentTesterStyles.header}>
      <Text style={[fluentTesterStyles.testHeader, themeColor()]} testID={BASE_TESTPAGE}>
        ⚛ FluentUI Tests
      </Text>

      <View style={fluentTesterStyles.pickerRoot}>
        <View style={fluentTesterStyles.picker}>
          <Text style={fluentTesterStyles.pickerLabel}>Platform:  </Text>
          <Picker
            selectedValue={selectedPlatform}
            style={fluentTesterStyles.dropdown}
            onValueChange={(platformValue) => setSelectedPlatform(platformValue)}
          >
            <Picker.Item label="Win32" value="win32" />
            <Picker.Item label="UWP" value="uwp" />
            <Picker.Item label="iOS" value="ios" />
            <Picker.Item label="macOS" value="mac" />
            <Picker.Item label="Android" value="android" />
          </Picker>
        </View>

        <View style={fluentTesterStyles.picker}>
          <Text style={fluentTesterStyles.pickerLabel}>App:  </Text>
          <Picker
            selectedValue={selectedApp}
            style={fluentTesterStyles.dropdown}
            onValueChange={(appValue) => onAppChange(appValue)}
          >
            <Picker.Item label="Office" value="office" />
            <Picker.Item label="Word" value="word" />
            <Picker.Item label="Excel" value="excel" />
            <Picker.Item label="Powerpoint" value="powerpoint" />
            <Picker.Item label="Outlook" value="outlook" />
          </Picker>
        </View>

        <View style={fluentTesterStyles.picker}>
          <Text style={fluentTesterStyles.pickerLabel}>Theme:  </Text>
          <Picker
            selectedValue={selectedTheme}
            style={fluentTesterStyles.dropdown}
            onValueChange={(themeValue) => setSelectedTheme(themeValue)}
          >
            <Picker.Item label="Default" value="default" />
            <Picker.Item label="Caterpillar" value="caterpillar" />
            <Picker.Item label="WhiteColors" value="white" />
          </Picker>
        </View>
      </View>
    </View>
  );
}

export const FluentTester: React.FunctionComponent<IFluentTesterProps> = (props: IFluentTesterProps) => {
  // sort tests alphabetically by name
  const sortedTestComponents = props.enabledTests.sort((a, b) => a.name.localeCompare(b.name));

  const { initialTest } = props;
  const initialSelectedTestIndex = sortedTestComponents.findIndex((description) => {
    return description.name === initialTest;
  });

  const [selectedTestIndex, setSelectedTestIndex] = React.useState(initialSelectedTestIndex);

  const TestComponent = selectedTestIndex == -1 ? EmptyComponent : sortedTestComponents[selectedTestIndex].component;

  const TestListSeparator = Separator.customize({
    tokens: {
      color: useTheme().colors.inputBorder,
      separatorWidth: 2,
    },
  });

  return (
    <View style={fluentTesterStyles.root}>
      <Header />

      <Separator />

      <View style={fluentTesterStyles.testRoot}>
        <ScrollView style={fluentTesterStyles.testList} contentContainerStyle={fluentTesterStyles.testListContainerStyle}>
          {sortedTestComponents.map((description, index) => {
            return (
              <StealthButton
                key={index}
                disabled={index == selectedTestIndex}
                content={description.name}
                onClick={() => setSelectedTestIndex(index)}
                style={fluentTesterStyles.testListItem}
                testID={description.testPage}
              />
            );
          })}
        </ScrollView>

        <TestListSeparator vertical style={{ marginHorizontal: 8, width: 2 }} />

        <View style={fluentTesterStyles.testSection}>
          <ScrollView>
            <TestComponent />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
