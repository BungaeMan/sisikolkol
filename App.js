import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {SafeAreaProvider} from "react-native-safe-area-context";
import Navigation from "./Navigation/Navigator";
import {RecoilRoot} from 'recoil';


export default function App() {
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
