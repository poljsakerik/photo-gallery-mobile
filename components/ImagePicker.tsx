import React from "react";
import {} from "react-native";
import * as ImagePickerExpo from "expo-image-picker";
import { Button, View } from "native-base";
import { InterfaceViewProps } from "native-base/lib/typescript/components/basic/View/types";

interface IProps extends InterfaceViewProps {
  onImageChange: (arg: string) => void;
}

export default function ImagePicker({ onImageChange, ...rest }: IProps) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePickerExpo.launchImageLibraryAsync({
      mediaTypes: ImagePickerExpo.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.cancelled && result.base64) {
      console.log(result);
      const prefix = `data:image/${result.uri.split(".").pop()};base64,`;
      onImageChange(prefix + result.base64);
    }
  };
  return (
    <View {...rest}>
      <Button onPress={pickImage}>Open gallery</Button>
    </View>
  );
}
