import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import tailwind from "tailwind-rn";

const { height: screenHeight } = Dimensions.get("screen");

interface Props {
  picture: object;
}

const EditablePicture: React.FC<Props> = ({ picture }) => {
  return (
    <View>
      <Text>EditablePicture</Text>
      <Image
        source={picture}
        resizeMode="contain"
        style={{
          ...tailwind("h-full w-full"),
          height: (screenHeight / 100) * 80
        }}
      />
    </View>
  );
};

export default EditablePicture;
