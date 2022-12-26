import React from "react";
import {} from "react-native";
import * as ImagePickerExpo from "expo-image-picker";
import { Button, View } from "native-base";
import { InterfaceViewProps } from "native-base/lib/typescript/components/basic/View/types";

interface IProps extends InterfaceViewProps {
  onImageChange: (arg: ImageFile) => void;
}

export type ImageFile = {
  uri: string;
  name: "media";
  type: `image/${string}`;
};

export default function ImagePicker({ onImageChange, ...rest }: IProps) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePickerExpo.launchImageLibraryAsync({
      mediaTypes: ImagePickerExpo.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      onImageChange({
        uri: result.base64 ?? "",
        name: "media",
        type: `image/${result.type}`,
      });
    }
  };

  return (
    <View {...rest}>
      <Button onPress={pickImage}>Open gallery</Button>
    </View>
  );
}
