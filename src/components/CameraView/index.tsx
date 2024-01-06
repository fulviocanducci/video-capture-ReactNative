import React from "react";
import { Camera } from "expo-camera";
import { TouchableOpacity, View, Text } from "react-native";

import { styles } from "./styles";
import { ICameraView } from "../../interfaces";

export function CameraView({ cameraRef, isRecording, onRecord, onStopRecording }: ICameraView) {
  return (
    <Camera ref={cameraRef} style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonRecord} onPress={isRecording ? onStopRecording : onRecord}>
          <Text style={styles.buttonText}>{isRecording ? "Stop Recording" : "Start Record"}</Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}
