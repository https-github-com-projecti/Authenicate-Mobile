import { goAuthen } from "../config";
import axios from "react-native-axios";

// @ts-ignore
export const uploadImage = async (singleFile) => {
  //Check if any file is selected or not
  if (singleFile != null) {
    //If file selected then create FormData
    console.log(`${goAuthen}upload/uploadProfile`);
    const fileToUpload = singleFile;
    const data = new FormData();
    data.append(
      "name",
      `${singleFile.uri.split("/")[singleFile.uri.split("/").length - 1]}`
    );
    data.append("file", fileToUpload);
    // let res = await fetch(`0.tcp.ap.ngrok.io:14681/upload/uploadProfile`, {
    //   method: "post",
    //   body: data,
    //   headers: {
    //     "Content-Type": "multipart/form-data; ",
    //   },
    // });
    // let responseJson = await res.json();
    // if (responseJson.code == 200) {
    //   alert("Upload Successful");
    // }
    await axios
      .post(`0.tcp.ap.ngrok.io:14681/upload/uploadProfile`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      });
  } else {
    //if no file selected the show alert
    alert("Please Select File first");
  }
};
