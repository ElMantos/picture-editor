import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import tailwind from "tailwind-rn";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

interface Props {
  picture: object;
}

const EditablePicture: React.FC<Props> = ({ picture }) => {
  return (
    <View
      style={tailwind("absolute top-0 left-0 bg-blue-300 w-full h-full z-20")}
    >
      <Text>Editable</Text>
      <Image
        source={picture}
        resizeMode="contain"
        style={{
          ...tailwind("h-full w-full"),
          width: screenWidth
        }}
      />
    </View>
  );
};

export default EditablePicture;
