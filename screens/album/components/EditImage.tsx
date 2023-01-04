import {
  Button,
  FormControl,
  Input,
  Modal,
  ScrollView,
  TextArea,
  View,
} from "native-base";
import React, { FormEvent, useState } from "react";
import AutoHeightImage from "react-native-auto-height-image";
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
      <View
        p={"4"}
        justifyItems={"center"}
        width={"100%"}
        background={"white"}
        borderRadius="2xl"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Modal.CloseButton />
        <AutoHeightImage
          width={300}
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
      </View>
    </Modal>
  );
}

export default EditImageModal;
