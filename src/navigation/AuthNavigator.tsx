// src/navigation/AuthNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from './types';
import IPhone1642 from '../screens/auth/IPhone1642';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import MobileLogin from '../screens/auth/mobilelogin';
import Verification from '../screens/auth/Verification';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import HomeRent from '../screens/auth/HomeRent';
import PropertyList from '../screens/auth/PropertyList';
import Lists from '../screens/auth/Lists';
import VisitScheduled from '../screens/auth/VisitScheduled';
import ThankYou from '../screens/auth/ThankYou';
import Saved from '../screens/auth/Saved';
import Saved1 from '../screens/auth/Saved1';

const Stack = createStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="IPhone1642"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
        gestureEnabled: false,
      }}
    >
      <Stack.Screen 
        name="IPhone1642" 
        component={IPhone1642}
      />
      <Stack.Screen 
        name="Login" 
        component={Login}
      />
      <Stack.Screen 
        name="Register" 
        component={Register}
      />
      <Stack.Screen 
        name="MobileLogin" 
        component={MobileLogin}
      />
      <Stack.Screen 
        name="Verification" 
        component={Verification}
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="HomeRent" 
        component={HomeRent}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="PropertyList" 
        component={PropertyList}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="Lists" 
        component={Lists}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="VisitScheduled" 
        component={VisitScheduled}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="ThankYou" 
        component={ThankYou}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="Saved" 
        component={Saved}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="Saved1" 
        component={Saved1}
        options={{
          headerShown: false
        }} 
      />
    </Stack.Navigator>
  );
}