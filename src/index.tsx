import React, { useState } from "react";
import { View, Dimensions, Text, TouchableOpacity, Image } from "react-native";
import tailwind from "tailwind-rn";

import { openImagePicker } from "./utils";
import { Camera, Button, EditablePicture } from "./components";

const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");

interface SelectPictureProps {
  displayCamera: () => void;
  displayControls: boolean;
  setDisplayControls: () => void;
  setPicture: (picture: object) => void;
}

const SelectPicture: React.FC<SelectPictureProps> = ({
  displayCamera,
  displayControls,
  setDisplayControls,
  setPicture
}) => {
  if (!displayControls) {
    return (
      <TouchableOpacity
        onPress={setDisplayControls}
        style={tailwind("p-1 bg-blue-800")}
      >
        <Text style={tailwind("text-white text-center")}>Display controls</Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={tailwind("flex flex-row")}>
      <View style={tailwind("w-1/2")}>
        <Button
          style={tailwind("bg-green-600")}
          onPress={() => {
            displayCamera();
          }}
          label="Open camera"
        />
      </View>
      <View style={tailwind("w-1/2")}>
        <Button
          onPress={() =>
            openImagePicker((picture: object) => {
              setPicture(picture);
            })
          }
          label="Show my pictures"
        />
      </View>
    </View>
  );
};

const App: React.FC = () => {
  const [displayCamera, setDisplayCamera] = useState<boolean>(false);
  const [picture, setPicture] = useState<object>({});
  const [displayControls, setDisplayControls] = useState<boolean>(true);
  const [displayEditor, setDisplayEditor] = useState<boolean>(false);
  return (
    <View
      style={{
        height: screenHeight,
        width: screenWidth
      }}
    >
      {displayEditor && <EditablePicture picture={picture} />}
      {displayCamera && (
        <View
          style={{
            position: "relative",
            top: 0,
            left: 0,
            width: screenWidth,
            height: screenHeight
          }}
        >
          <Camera
            onClose={() => {
              setDisplayCamera(false);
            }}
            onSnap={picture => {
              setPicture(picture);
              setDisplayControls(false);
            }}
          />
        </View>
      )}
      <View style={tailwind("pb-4 px-2 pt-8")}>
        <SelectPicture
          setPicture={(picture: object) => {
            setPicture(picture);
            setDisplayControls(false);
          }}
          setDisplayControls={() => {
            setDisplayControls(true);
            setTimeout(() => {
              setDisplayControls(false);
            }, 3000);
          }}
          displayControls={displayControls}
          displayCamera={() => {
            setDisplayCamera(true);
          }}
        />
        {!Object.keys(picture).length && (
          <Text style={tailwind("text-xl text-gray-800 text-center mt-4")}>
            Please select a picture to edit
          </Text>
        )}
        {picture && (
          <TouchableOpacity
            onPress={() => {
              setDisplayEditor(true);
            }}
          >
            <Image
              source={picture}
              resizeMode="contain"
              style={{
                ...tailwind("h-full w-full"),
                height: (screenHeight / 100) * 80
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default App;
