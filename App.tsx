import { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Camera, CameraRecordingOptions, CameraType } from "expo-camera";
import { Video } from "expo-av";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

import { IPermissionExponseResponse } from "./src/interfaces";
import { PERMISSION_EXPONSE_DEFAULT } from "./src/constantes";
import { CameraView } from "./src/components/CameraView";
import { VideoPlayer } from "./src/components/VideoPlayer";

export default function App() {
  const cameraRef = useRef<Camera>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [permissions, setPermissions] = useState<IPermissionExponseResponse>(PERMISSION_EXPONSE_DEFAULT);
  const [video, setVideo] = useState<any>();

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

  const stopRecording = () => {
    if (cameraRef && cameraRef.current) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  const recordVideo = () => {
    setIsRecording(true);
    const options: CameraRecordingOptions = {
      quality: "1080p",
      maxDuration: 60,
      mute: false,
    };
    if (cameraRef && cameraRef.current) {
      cameraRef.current.recordAsync(options).then((recordedVideo) => {
        setVideo(recordedVideo);
        setIsRecording(false);
      });
    }
  };
  const shareVideo = () => {
    shareAsync(video.uri).then(() => {
      discardVideo();
    });
  };
  const saveVideo = () => {
    MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
      discardVideo();
    });
  };
  const discardVideo = () => {
    setVideo(undefined);
  };
  if (video) {
    return <VideoPlayer video={video} onShare={shareVideo} onSave={saveVideo} onDiscard={discardVideo} />;
  }

  return <CameraView cameraRef={cameraRef} isRecording={isRecording} onRecord={recordVideo} onStopRecording={stopRecording}></CameraView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
