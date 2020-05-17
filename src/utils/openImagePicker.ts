import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

const getPermissionAsync = async () => {
  //@ts-ignore
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  }
};

const openImagePicker = async (callback: (picture: object) => void) => {
  await getPermissionAsync();

  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    console.log(result);

    if (!result.cancelled) {
      callback(result);
    }
  } catch (E) {
    console.log(E);
  }
};

export default openImagePicker;
