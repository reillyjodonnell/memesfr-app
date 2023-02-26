import * as ImagePicker from 'expo-image-picker';
import {useState, useEffect} from 'react';

export default function usePhotos() {
  const [promptUserToAllowAccessToPhotos, setPromptUserToAllowAccessToPhotos] =
    useState(false);
  const [photo, setPhoto] = useState<string | null>('');
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  useEffect(() => {
    if (status?.granted || status?.canAskAgain) {
      setPromptUserToAllowAccessToPhotos(false);
    }
  }, [status]);

  const pickPhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.PAGE_SHEET,
      selectionLimit: 1,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };
  function clearPhoto() {
    setPhoto(null);
  }

  const handleOpenPhotos = () => {
    if (status?.granted) {
      setPromptUserToAllowAccessToPhotos(false);
      pickPhoto();
    }
    if (status?.canAskAgain) {
      requestPermission();
    } else {
      setPromptUserToAllowAccessToPhotos(true);
    }
  };

  return {photo, clearPhoto, promptUserToAllowAccessToPhotos, handleOpenPhotos};
}
