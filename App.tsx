import { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Camera, CameraType } from "expo-camera";
import { Video } from "expo-av";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

import { IPermissionExponseResponse } from "./src/interfaces";
import { PERMISSION_EXPONSE_DEFAULT } from "./src/constantes";

export default function App() {
  const [permissions, setPermissions] = useState<IPermissionExponseResponse>(PERMISSION_EXPONSE_DEFAULT);
  const requestPermissions = async () => {
    const cameraPermissionRequest = await Camera.requestCameraPermissionsAsync();
    const microfonePermissionRequest = await Camera.requestMicrophonePermissionsAsync();
    const mediaLibraryPermissionRequest = await MediaLibrary.requestPermissionsAsync();
    setPermissions({
      camera: cameraPermissionRequest.status === "granted",
      microfone: microfonePermissionRequest.status === "granted",
      mediaLibrary: mediaLibraryPermissionRequest.status === "granted",
    });
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  if (permissions.camera === false || permissions.microfone === false) {
    return <Text>Não tem permissão de camera ou microfone</Text>;
  }

  if (permissions.mediaLibrary === false) {
    return <Text>Não tem acesso a bibliotecas</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
