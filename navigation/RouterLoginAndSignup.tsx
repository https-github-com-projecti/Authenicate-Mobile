import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/LoginSceen";
import CreateUser from "../screens/CreateUserScreen";

const Stack = createStackNavigator();

const RouterLogin = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CreateUser"
        component={CreateUser}
      />
    </Stack.Navigator>
  );
};

export default RouterLogin;
