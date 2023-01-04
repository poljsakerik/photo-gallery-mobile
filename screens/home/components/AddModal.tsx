import { Button, FormControl, Heading, Input, Modal, View } from "native-base";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "react-query";
import { queryClient } from "../../../App";
import ImagePicker from "../../../components/ImagePicker";
import useOpen from "../../../components/useOpen";
import { createAlbum } from "../helper/api";

function AddModal() {
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState<string | undefined>(undefined);
  const { open, onClose, onOpen } = useOpen();
  const addAlbum = useMutation({
    mutationFn: createAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries(["albums"]);
      onClose();
    },
  });

  function submitData() {
    addAlbum.mutate({ title, cover: cover ?? "" });
  }
  return (
    <>
      <Modal size={"full"} isOpen={open} onClose={onClose}>
        <SafeAreaView></SafeAreaView>
        <Modal.Body bg={"white"}>
          <View flexDir={"row"} justifyContent="space-between">
            <Heading>Add a new Album</Heading>
            <Modal.CloseButton></Modal.CloseButton>
          </View>
          <FormControl.Label mt={"3"}>Album name</FormControl.Label>
          <Input
            mt={"3"}
            value={title}
            onChangeText={(value) => setTitle(value)}
          />
          <ImagePicker mt={"3"} onImageChange={setCover}></ImagePicker>
          <Button mt={"3"} color="primary" onPress={submitData}>
            Add New Album
          </Button>
        </Modal.Body>
      </Modal>
      <Button color="primary" onPress={onOpen}>
        Add
      </Button>
    </>
  );
}

export default AddModal;
