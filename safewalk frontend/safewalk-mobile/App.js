import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import TrackMeScreen from './src/screens/TrackMeScreen';
import EmergencySmsScreen from './src/screens/EmergencySmsScreen';
import HelplineScreen from './src/screens/HelplineScreen'; // ✅ NEW
import SupportChatScreen from './src/screens/SupportChatScreen';
import RecordScreen from './src/screens/RecordScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TrackMe"
            component={TrackMeScreen}
            options={{ title: 'Live Location Tracker' }}
          />
          <Stack.Screen
            name="EmergencySms"
            component={EmergencySmsScreen}
            options={{ title: 'Emergency SMS' }}
          />
          <Stack.Screen
            name="Helpline"
            component={HelplineScreen}
            options={{ title: 'Helpline Numbers' }} // ✅ NEW
          />
          <Stack.Screen
             name="Support"
             component={SupportChatScreen}
             options={{ title: 'Support Chatbot' }}
          />
          <Stack.Screen
             name="Record"
             component={RecordScreen}
            options={{ title: 'Audio Recorder' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
