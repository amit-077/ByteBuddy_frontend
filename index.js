/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {vexo} from 'vexo-analytics';

vexo('46d1b433-1355-4efc-bc0e-c9ef00f6be3d');

AppRegistry.registerComponent(appName, () => App);
