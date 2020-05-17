import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import tailwind from "tailwind-rn";

interface Props {
  onClose: () => void;
  onSnap: (picture: object) => void;
}

const CameraView: React.FC<Props> = ({ onClose, onSnap }) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const cameraRef = useRef<object | null>();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={ref => {
          cameraRef.current = ref;
        }}
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
      >
        <TouchableOpacity onPress={onClose} style={tailwind("mt-4 ml-2")}>
          <Text style={tailwind("text-lg text-white")}>Close</Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row"
          }}
        >
          <View
            style={tailwind(
              "h-full flex justify-end w-full items-center bg-transparent"
            )}
          >
            <TouchableOpacity
              onPress={async () => {
                if (cameraRef.current) {
                  // @ts-ignore
                  const picture = await cameraRef.current.takePictureAsync();
                  onSnap(picture);
                  onClose();
                }
              }}
              style={tailwind(
                "w-16 h-16 bg-gray-100 rounded-full opacity-50 flex justify-center items-center mb-4"
              )}
            >
              <View
                style={tailwind(
                  "w-12 h-12 bg-gray-600 rounded-full opacity-75"
                )}
              ></View>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
};

export default CameraView;
