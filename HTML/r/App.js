/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.hotal}>
          <View style={styles.lcr}>
            <Text>1</Text>
          </View>
          <View style={styles.lcr}>
            <Text>2</Text>
          </View>
          <View style={styles.lcr}>
            <Text>3</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  hotal: {
    flex: 1,
    height: 90,
    flexDirection: 'row',
    backgroundColor: 'lime'
  },
  lcr: {
    flex: 1
  }
});
