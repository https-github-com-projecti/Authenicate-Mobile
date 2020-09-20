import React, { useState, useRef, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import { AsyncStorage } from "react-native";
import RouterLogin from "../navigation/RouterLoginAndSignup";

const image = {
  uri:
    "0.tcp.ap.ngrok.io:14681:3001/upload/assets/selective-focus-photo-of-brown-grass-1776268.jpg",
};

const FirstScreen = () => {
  const [screen, setScreen] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0.5)).current;
  const status = AsyncStorage.getItem("user_id");

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }).start();
    }, 2000);
    setTimeout(() => {
      setScreen(false);
    }, 7000);
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      {screen ? (
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <ImageBackground source={image} style={styles.image}>
            <Text style={styles.text}>Check Name</Text>
          </ImageBackground>
        </Animated.View>
      ) : (
        <View style={styles.container}>
          {status === null ? <BottomTabNavigator /> : <RouterLogin />}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "RobotoMono-VariableFont_wght",
    color: "white",
  },
  fadingContainer: {
    flex: 1,
  },
});

export default FirstScreen;
