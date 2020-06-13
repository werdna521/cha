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
import Voice from '@react-native-community/voice';
import BluetoothSerial from 'react-native-bluetooth-serial';

import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import { dimens } from '../utils/variables';

const countryFlagCodes = ['id', 'gb', 'cn'];
const languageCode = ['id', 'en', 'zh'];

const Speech: React.FC = () => {
  const [_text, _setText] = useState<string>('Hello');
  const [_recording, _setRecording] = useState<boolean>(false);
  const [_selected, _setSelected] = useState<number>(0);

  useEffect(() => {
    Voice.onSpeechStart = (event) => !event.error && _setRecording(true);
    Voice.onSpeechEnd = (event) => !event.error && _setRecording(false);
    Voice.onSpeechResults = (event) => {
      event.value?.length && _setText(event.value[0]);
      event.value?.length && BluetoothSerial.write(event.value[0]);
    };
  }, []);

  const record = async () => {
    if (!_recording && (await BluetoothSerial.isConnected())) {
      await Voice.start(languageCode[_selected]);
    } else {
      alert('You are not connected to any device');
    }
  };

  return (
    <Layout style={styles.outer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (!_recording) {
            _setSelected(
              (prevState) => (prevState + 1) % countryFlagCodes.length,
            );
          } else {
            alert("Can't change language when recording");
          }
        }}
      >
        <Image
          resizeMode="cover"
          resizeMethod="auto"
          style={styles.flag}
          source={{
            uri: `https://www.countryflags.io/${countryFlagCodes[_selected]}/shiny/64.png`,
          }}
        />
      </TouchableOpacity>
      <Layout style={styles.container}>
        <Text category="h3" style={styles.text}>
          {_text}
        </Text>
        <Button onPress={record}>
          {_recording ? 'Recording...' : 'Start'}
        </Button>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flag: {
    width: 64,
    height: 48,
    alignSelf: 'flex-end',
    marginTop: dimens.d8,
    marginRight: dimens.d8,
  },
  text: {
    textAlign: 'center',
  },
});

export default Speech;
