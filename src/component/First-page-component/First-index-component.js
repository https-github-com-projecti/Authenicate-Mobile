import React, { useState, useRef, useEffect } from "react";
import { ImageBackground, Text, View, Animated } from "react-native";
import { styles } from "../../style/styleSheetFirstPages";
import { imageFirstPage } from "../../config/image-variable";
import Router from "../../router/router";

const FirstPageComponent = () => {
  const [loadingPage, setLoadingPage] = useState(true);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
      }).start();
    }, 3000);
    setTimeout(() => {
      setLoadingPage(false);
    }, 4000);
  }, []);

  return (
    <View style={styles.container}>
      {loadingPage ? (
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <ImageBackground source={imageFirstPage} style={styles.image}>
            <Text style={styles.text}>Check Name</Text>
          </ImageBackground>
        </Animated.View>
      ) : (
        <Router />
      )}
    </View>
  );
};

export default FirstPageComponent;
