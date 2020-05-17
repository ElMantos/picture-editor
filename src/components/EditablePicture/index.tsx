import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import tailwind from "tailwind-rn";
import * as ImageManipulator from "expo-image-manipulator";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";

import { ImageInterface } from "~/interfaces";

const { width: screenWidth } = Dimensions.get("screen");

interface Props {
  picture: ImageInterface;
  onClose: () => void;
}

const EditablePicture: React.FC<Props> = ({ picture, onClose }) => {
  const [image, setImage] = useState<ImageInterface>({ uri: "" });

  useEffect(() => {
    setImage(picture);
  }, []);

  const _rotate90andFlip = async () => {
    const rotatedImage: ImageInterface = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ rotate: 90 }]
    );
    setImage(rotatedImage);
  };
  return (
    <View
      style={tailwind("absolute top-0 left-0 bg-blue-800 w-full h-full z-20")}
    >
      <View style={tailwind("bg-blue-900")}>
        <TouchableOpacity
          style={tailwind("mt-6 ml-2")}
          onPress={() => {
            onClose();
          }}
        >
          <Text style={tailwind("text-white text-lg")}>Close</Text>
        </TouchableOpacity>
      </View>
      <View style={tailwind("w-full h-full relative")}>
        {image.uri ? (
          <Image
            source={{
              uri: image.uri
            }}
            resizeMode="contain"
            style={{
              ...tailwind("h-full absolute w-full"),
              width: screenWidth
            }}
          />
        ) : null}
        <View style={tailwind("px-2 mt-2 flex flex-row justify-between")}>
          <TouchableOpacity onPress={_rotate90andFlip}>
            <FontAwesomeIcon size={32} color="white" icon={faRetweet} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EditablePicture;
