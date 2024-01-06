import { Camera } from "expo-camera";

export interface IPermissionExponseResponse {
  camera: boolean;
  microfone: boolean;
  mediaLibrary: boolean;
}

export interface ICameraView {
  cameraRef: React.MutableRefObject<Camera | null>;
  isRecording: boolean;
  onRecord: () => void;
  onStopRecording: () => void;
}

export interface IVideoPlayer {
  video: any;
  onShare: () => void;
  onSave: () => void;
  onDiscard: () => void;
}
