import React from "react";
import { Button, View } from "react-native";
import * as ImagePickerExpo from "expo-image-picker";

interface IProps {
  onImageChange: (arg: string) => void;
}

export default function ImagePicker({ onImageChange }: IProps) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePickerExpo.launchImageLibraryAsync({
      mediaTypes: ImagePickerExpo.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      onImageChange(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
    </View>
  );
}
