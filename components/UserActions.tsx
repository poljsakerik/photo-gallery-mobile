import {
  Actionsheet,
  Box,
  Center,
  Fab,
  HamburgerIcon,
  Heading,
} from "native-base";
import React, { useCallback } from "react";
import { useCurrentUser } from "./context/AuthContext";
import useOpen from "./useOpen";

function UserActions() {
  const { user, logout } = useCurrentUser();
  const { open, onOpen, onClose } = useOpen();
  const onLogout = useCallback(() => {
    logout();
    onClose();
  }, [logout, onClose]);
  return (
    <>
      {user && (
        <Fab
          renderInPortal={true}
          onPress={onOpen}
          shadow={2}
          size="sm"
          icon={<HamburgerIcon />}
        />
      )}
      <Center>
        <Actionsheet isOpen={open} onClose={onClose}>
          <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Heading size={"xl"}>PhotoGallery</Heading>
            </Box>
            <Actionsheet.Item onPress={onLogout}>Logout</Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
    </>
  );
}

export default UserActions;
