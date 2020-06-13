// Copyright 2020 Andrew Cen
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
// limitations under the License.

import React from 'react';

import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import Speech from '../screens/Speech';
import Devices from '../screens/Devices';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar: React.FC<BottomTabBarProps> = ({ navigation, state }) => {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab title="DEVICES" />
      <BottomNavigationTab title="SPEECH" />
    </BottomNavigation>
  );
};

const RootNavigator = () => {
  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen name="Devices" component={Devices} />
      <Screen name="Speech" component={Speech} />
    </Navigator>
  );
};

export default RootNavigator;
