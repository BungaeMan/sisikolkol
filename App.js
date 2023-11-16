import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {SafeAreaProvider} from "react-native-safe-area-context";
import Navigation from "./Navigation/Navigator";
import {useEffect} from "react"
import {RecoilRoot} from 'recoil';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from "react-native-device-info";



export default function App() {
    
    useEffect(() => { //앱 실행 시 deviceId 저장
        async function getDeviceUniqueId () { // deviceId 정보 저장
            if (await AsyncStorage.getItem('deviceId') === null) {
                await DeviceInfo.getUniqueId()
                .then(async (id) => {
                    await AsyncStorage.setItem('deviceId', id);
                    console.log("deviceId saved in AsyncStorage")
                    console.log(id);
                })
                .catch((err) => {
                    console.log('Error in getUniqueId', err)
                })
            }
        }
        getDeviceUniqueId();
    },[]);
    
    
  return (
      // <MenuProvider>
      <RecoilRoot>
          <SafeAreaProvider>
              {/*<Text>Open up App.js to start working on your app!</Text>*/}
              <Navigation />
              <StatusBar />
          </SafeAreaProvider>
      </RecoilRoot>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
