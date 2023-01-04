import { HamburgerIcon, Heading, Menu, Pressable, View } from "native-base";
import React, { useCallback, useState } from "react";
import AutoHeightImage from "react-native-auto-height-image";

export interface CoverProps {
  onClick?: () => void;
  dropDownItems?: JSX.Element[];
  title?: string;
  image?: string;
  onDelete?: () => void;
}

function Cover({ onClick, dropDownItems, title, image, onDelete }: CoverProps) {
  const [menuOpen, setMenuOpen] = useState<boolean | undefined>(undefined);

  const onDropDownItemPress = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <View flexDir="column" bg={"white"} borderRadius="lg">
      <View onTouchEnd={onClick}>
        <AutoHeightImage
          width={400}
          source={{
            uri:
              image ||
              "https://cdn-icons-png.flaticon.com/512/1160/1160358.png",
          }}
        ></AutoHeightImage>
      </View>
      <View
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems="center"
        p={"4"}
      >
        <Heading size={"lg"}>{title}</Heading>
        <Menu
          isOpen={menuOpen}
          trigger={CoverTrigger}
          onOpen={() => setMenuOpen(true)}
          onClose={() => {
            setMenuOpen(false);
          }}
        >
          {onDelete && <Menu.Item onPress={onDelete}>Delete</Menu.Item>}
          {dropDownItems}
        </Menu>
      </View>
    </View>
  );
}

export default Cover;

function CoverTrigger(
  triggerProps: any,
  state: {
    open: boolean;
  }
) {
  return (
    <Pressable accessibilityLabel="More options menu" {...triggerProps}>
      <HamburgerIcon />
    </Pressable>
  );
}
