import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MonthSelect } from "../tools/MonthAndDay";
import { userForm } from "../tools/Form";
import { uploadImage } from "../services/CreateUserServices";

// @ts-ignore
const CreateUser = ({ navigation }) => {
  const [image, setImage] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [changDate, setChangDate] = useState("");

  useEffect(() => {
    getPermissionAsync();
  });

  // @ts-ignore
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setChangDate(
      `${currentDate.getDate()}-${MonthSelect(
        currentDate.getMonth()
      )}-${currentDate.getFullYear()}`
    );
    setDate(currentDate);
  };

  // @ts-ignore
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const getPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
        uploadImage(result);
      }
    } catch (E) {
      // console.log(E);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.containerView}>
          <Text style={styles.logo}>Create User</Text>
          {image === "" && (
            <TouchableOpacity style={styles.imageBtn} onPress={_pickImage}>
              <Text style={styles.loginText}>Image</Text>
            </TouchableOpacity>
          )}
          {image !== "" && (
            <View style={styles.images}>
              <Image
                source={{ uri: image }}
                style={{
                  width: 200,
                  height: 200,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              />

              <TouchableOpacity
                style={styles.btn_cancel_image}
                onPress={() => setImage("")}
              >
                <Text style={styles.loginText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="E-mail"
              placeholderTextColor="white"
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Username"
              placeholderTextColor="white"
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="white"
              secureTextEntry
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Confirm Password"
              placeholderTextColor="white"
              secureTextEntry
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Phone Number"
              placeholderTextColor="white"
            />
          </View>
          <TouchableOpacity style={styles.inputView} onPress={showDatepicker}>
            <Text style={styles.loginText}>
              {changDate !== "" ? changDate : "Show date picker!"}
            </Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              // @ts-ignore
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginText}>SIGNUP</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={styles.loginText}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  imageBtn: {
    width: "80%",
    backgroundColor: "#f5821f",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "white",
  },
  images: {
    width: 220,
    height: 220,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  btn_cancel_image: {
    color: "white",
    width: "100%",
    backgroundColor: "#fb5b5a",
    borderBottomRightRadius: 10,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 10,
  },
  scrollView: {
    width: "100%",
  },
  containerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    marginBottom: "10%",
  },
});

export default CreateUser;
