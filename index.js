/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
const AppWithProvider = () => (
    <App />
);

AppRegistry.registerComponent(appName, () => AppWithProvider);
