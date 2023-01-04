import {
  Button,
  FormControl,
  Input,
  Modal,
  ScrollView,
  TextArea,
} from "native-base";
import React, { useMemo, useState } from "react";
import { Dimensions } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "react-query";
import { queryClient } from "../../../App";
import { editImage, ImageEditParams } from "../helper/api";

type IProps = {
  open: boolean;
  image: Image;
  onClose: () => void;
  albumId: string;
};

function EditImageModal({ open, image, onClose, albumId }: IProps) {
  const [editImageData, setEditImageData] = useState<ImageEditParams>({
    title: image.title ?? "",
    description: image.description ?? "",
  });

  const imageWidth = useMemo(() => {
    return Dimensions.get("window").width * 0.7;
  }, []);

  const { mutate } = useMutation({
    mutationFn: () => editImage(editImageData, image.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["albumData", albumId]);
      onClose();
    },
  });

  function onChangeFormData(key: keyof ImageEditParams) {
    return (newValue: string) => {
      const newData = { ...editImageData };
      newData[key] = newValue;
      setEditImageData(newData);
    };
  }

  const canSubmit =
    image.description !== editImageData.description ||
    image.title !== editImageData.title;

  return (
    <Modal isOpen={open} onClose={onClose}>
      <SafeAreaView></SafeAreaView>
      <ScrollView
        width="100%"
        contentContainerStyle={{
          alignItems: "center",
          padding: 4,
          width: "100%",
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <Modal.CloseButton />
        <AutoHeightImage
          width={imageWidth}
          source={{ uri: image.image }}
        ></AutoHeightImage>
        <FormControl>
          <FormControl.Label>Image title</FormControl.Label>
          <Input
            placeholder="title"
            value={editImageData.title}
            onChangeText={onChangeFormData("title")}
          />
          <FormControl.Label>Image description</FormControl.Label>
          <TextArea
            autoCompleteType={"none"}
            placeholder="description"
            value={editImageData.description}
            onChangeText={onChangeFormData("description")}
            mb="4"
          />
          <Button
            disabled={!canSubmit}
            onPress={() => {
              mutate();
            }}
            color="primary"
          >
            Edit Image
          </Button>
        </FormControl>
      </ScrollView>
    </Modal>
  );
}

export default EditImageModal;
