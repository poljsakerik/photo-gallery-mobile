import {
  Button,
  FormControl,
  Image,
  Input,
  Modal,
  TextArea,
} from "native-base";
import React, { ChangeEvent, FormEvent, useState } from "react";
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

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate();
  }

  const canSubmit =
    image.description !== editImageData.description ||
    image.title !== editImageData.title;

  return (
    <Modal isOpen={open} onClose={onClose}>
      <Image src={image.image}></Image>
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
        />
        <Button disabled={!canSubmit} color="primary">
          Edit Image
        </Button>
      </FormControl>
    </Modal>
  );
}

export default EditImageModal;
