import { Platform, ToastAndroid, Alert } from "react-native";

export const alert = (message: string) => {
  if (Platform.OS === "android") {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  } else {
    Alert.alert("Error", message);
  }
};
