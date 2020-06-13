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
import BluetoothSerial from 'react-native-bluetooth-serial';

import { PermissionsAndroid, StyleSheet } from 'react-native';
import { Button, Card, Layout, Spinner, Text } from '@ui-kitten/components';
import { dimens } from '../utils/variables';

const Devices: React.FC = () => {
  const [_bluetooth, _setBluetooth] = useState<boolean>(false);
  const [_devices, _setDevices] = useState<any[]>([]);
  const [_loading, _setLoading] = useState<boolean>(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      await requestPermission();
      const bluetoothEnabled = await BluetoothSerial.isEnabled();
      _setBluetooth(bluetoothEnabled);
      if (bluetoothEnabled) {
        await discoverDevices();
      }
    };
    bootstrapAsync().then();
    BluetoothSerial.on('bluetoothEnabled', async () => {
      _setBluetooth(true);
      await discoverDevices();
    });
    BluetoothSerial.on('bluetoothDisabled', () => {
      _setBluetooth(false);
      _setDevices([]);
    });
  }, []);

  const requestPermission = async () => {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);
  };

  const deleteDuplicate = (obj) => {
    const newObj: any = [];
    let ok = true;
    obj.forEach((o: any) => {
      newObj.forEach(({ name }) => {
        if (name === o.name) {
          ok = false;
        }
      });
      if (ok) {
        newObj.push(o);
      }
      ok = true;
    });
    return newObj;
  };

  const discoverDevices = async () => {
    _setLoading(true);
    try {
      const unpaired = await BluetoothSerial.discoverUnpairedDevices();
      const paired = await BluetoothSerial.list();
      const connected = _devices.filter(({ connected }) => connected);
      const devices = [
        ...connected,
        ...cleanFilter(unpaired).filter(({ name }) =>
          connected.length === 1 ? name !== connected[0].name : true,
        ),
        ...cleanFilter(paired).filter(({ name }) =>
          connected.length === 1 ? name !== connected[0].name : true,
        ),
      ];
      console.log(devices);
      _setDevices(deleteDuplicate(devices));
    } catch (e) {
      alert('Unable to scan for nearby devices');
    } finally {
      _setLoading(false);
    }
  };

  const cleanFilter = (arr: any[]): any[] => arr.filter(({ name }) => name);

  const connect = async (address) => {
    try {
      await BluetoothSerial.disconnect();
      await BluetoothSerial.connect(address);
      _setDevices((prevState) =>
        prevState.map((d) => {
          if (d.address === address) {
            return { ...d, connected: true };
          }
          return d;
        }),
      );
      alert('Bluetooth connection established');
    } catch (e) {
      alert('Unable to establish a bluetooth connection');
    }
  };

  return (
    <Layout style={styles.container}>
      {_bluetooth && (
        <Button
          status="control"
          onPress={discoverDevices}
          style={styles.topButton}
        >
          Scan
        </Button>
      )}
      {_loading && (
        <Layout style={styles.loader}>
          <Spinner />
          <Text category="c2">Scanning for devices...</Text>
        </Layout>
      )}
      {_bluetooth &&
        _devices.map(({ address, name, connected }) => (
          <Card status="warning" style={styles.card}>
            <Layout style={styles.cardContainer}>
              <Text category="h6">{name}</Text>
              <Button
                appearance="ghost"
                size="small"
                disabled={connected}
                onPress={() => connect(address)}
              >
                {connected ? 'Connected' : 'Connect'}
              </Button>
            </Layout>
          </Card>
        ))}
      {!_bluetooth && (
        <Text style={styles.empty} category="p2">
          Turn on bluetooth to scan for nearby devices
        </Text>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: dimens.d8,
  },
  card: {
    marginTop: dimens.d4,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topButton: {
    marginTop: dimens.d4,
    alignSelf: 'flex-end',
  },
  empty: {
    marginTop: dimens.d24,
    alignSelf: 'center',
  },
  loader: {
    alignItems: 'center',
    marginVertical: dimens.d4,
  },
});

export default Devices;
