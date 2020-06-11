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

import React, { useEffect, useState } from 'react';
import * as eva from '@eva-design/eva';
import { StyleSheet } from 'react-native';
import {
  ApplicationProvider,
  Layout,
  Text,
  Button,
} from '@ui-kitten/components';
import * as theme from './custom-theme';

import Voice from '@react-native-community/voice';

const App = () => {
  const [_text, _setText] = useState('Hello');
  const [_recording, _setRecording] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = (event) => !event.error && _setRecording(true);
    Voice.onSpeechEnd = (event) => !event.error && _setRecording(false);
    Voice.onSpeechResults = (event) =>
      event.value?.length && _setText(event.value[0]);
  });

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <Layout style={styles.container}>
        <Text category="h1">{_text}</Text>
        <Button onPress={() => !_recording && Voice.start('id')}>
          {_recording ? 'Recording...' : 'Start'}
        </Button>
      </Layout>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
