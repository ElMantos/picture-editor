import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import { ImageInterface } from "~/interfaces";

const getPermissionAsync = async () => {
  //@ts-ignore
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  }
};

const openImagePicker = async (callback: (picture: ImageInterface) => void) => {
  await getPermissionAsync();

  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      callback(result);
    }
  } catch (E) {
    console.error(E);
  }
};

export default openImagePicker;
