import * as ImagePicker from 'expo-image-picker';
import {useState, useEffect} from 'react';

export default function useCamera() {
  const [promptUserToAllowAccessToCamera, setPromptUserToAllowAccessToCamera] =
    useState(false);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [cameraImage, setCameraImage] = useState<string | null>('');

  useEffect(() => {
    if (status?.granted || status?.canAskAgain) {
      setPromptUserToAllowAccessToCamera(false);
    }
  }, [status]);

  const pickCameraImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.PAGE_SHEET,
      selectionLimit: 1,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCameraImage(result.assets[0].uri);
    }
  };
  function clearCameraImage() {
    setCameraImage(null);
  }

  const handleOpenCamera = () => {
    if (status?.granted) {
      setPromptUserToAllowAccessToCamera(false);
      pickCameraImage();
    }
    if (status?.canAskAgain) {
      requestPermission();
    } else {
      setPromptUserToAllowAccessToCamera(true);
    }
  };

  return {
    cameraImage,
    clearCameraImage,
    promptUserToAllowAccessToCamera,
    handleOpenCamera,
  };
}
