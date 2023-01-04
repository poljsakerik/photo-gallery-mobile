import {
  Button,
  FormControl,
  Heading,
  Input,
  Modal,
  TextArea,
  View,
} from "native-base";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { queryClient } from "../../../App";
import ImagePicker from "../../../components/ImagePicker";
import useOpen from "../../../components/useOpen";
import { addImageToAlbum, ImageUploadParams } from "../helper/api";

interface IProps {
  albumId: string;
}

function AddModal({ albumId }: IProps) {
  const [newImageData, setNewImageData] = useState<ImageUploadParams>({
    title: "",
    description: "",
    image: "",
  });
  const { open, onClose, onOpen } = useOpen();
  const { mutate } = useMutation({
    mutationFn: addImageToAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries(["albumData", albumId]);
      onClose();
    },
  });

  function onChangeFormData(key: keyof Omit<ImageUploadParams, "image">) {
    return (newValue: string) => {
      const newData = { ...newImageData };
      newData[key] = newValue;
      setNewImageData(newData);
    };
  }

  function onFileInputChange(file: string) {
    const newData = { ...newImageData };
    newData.image = file;
    setNewImageData(newData);
  }

  function onSubmit() {
    const formData = new FormData();
    if (newImageData.image) {
      formData.append("image", newImageData.image);
    } else {
      return;
    }
    formData.append("description", newImageData.description);
    formData.append("title", newImageData.title);
    formData.append("album", albumId);
    mutate(formData);
  }

  return (
    <>
      <Modal isOpen={open} onClose={onClose}>
        <View background={"white"} p="4" borderRadius={"2xl"} width={"100%"}>
          <Modal.CloseButton />
          <Heading>Add a new Picture to your Album</Heading>
          <FormControl>
            <FormControl.Label>Upload Image</FormControl.Label>
            <ImagePicker onImageChange={onFileInputChange}></ImagePicker>
            <FormControl.Label>Image Title</FormControl.Label>
            <Input
              placeholder="title"
              value={newImageData.title}
              onChangeText={onChangeFormData("title")}
            />
            <FormControl.Label>Image Description</FormControl.Label>

            <TextArea
              autoCompleteType="none"
              placeholder="description"
              value={newImageData.description}
              onChangeText={onChangeFormData("description")}
              mb="4"
            />
            <Button color="primary" onPress={onSubmit}>
              Add New Image
            </Button>
          </FormControl>
        </View>
      </Modal>
      <Button my={"4"} color="primary" onPress={onOpen}>
        Add Image
      </Button>
    </>
  );
}

export default AddModal;
