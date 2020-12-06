import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './screens/Login';
import { Register } from './screens/Register';
import { Dashboard } from './screens/Dashboard';
import { EditTasks } from './screens/EditTasks';
import { NewTask } from './screens/NewTask';
import { Profile } from './screens/Profile';
import { Statistics } from './screens/Statistics';
import { Messages } from './screens/Messages';
import { Results } from './screens/Results';
import { EditProfile } from './screens/EditProfile';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="EditTasks" component={EditTasks} />
      <Stack.Screen name="NewTask" component={NewTask} />
      <Stack.Screen name="Statistics" component={Statistics} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="Results" component={Results} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}