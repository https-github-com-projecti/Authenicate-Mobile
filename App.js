import React from "react";
import { View } from "react-native";
import { stylesApp } from "./StyleSheet";
import FirstPageComponent from "./src/component/First-page-component/First-index-component";

const App = () => {
  return (
    <View style={stylesApp.container}>
      <FirstPageComponent />
    </View>
  );
};

export default App;
