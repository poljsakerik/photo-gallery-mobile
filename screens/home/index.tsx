import { FlatList, Heading, View } from "native-base";
import React from "react";
import { useQuery } from "react-query";
import ItemSeperator from "../../components/ItemSeperator";
import AddModal from "./components/AddModal";
import AlbumCover from "./components/AlbumCover";
import { fetchAllAlbums } from "./helper/api";

function HomeScreen() {
  const { data: albums } = useQuery({
    queryKey: ["albums"],
    queryFn: fetchAllAlbums,
  });

  return (
    <View bg={"gray.800"} p="5" flex={1}>
      <View flexDir={"row"} justifyContent="space-between" py={"3"}>
        <Heading size={"2xl"} color={"white"}>
          Your albums
        </Heading>
        <AddModal></AddModal>
      </View>
      {albums?.length && albums.length > 0 ? (
        <FlatList
          data={albums}
          renderItem={(item) => <AlbumCover {...item.item} />}
          ItemSeparatorComponent={ItemSeperator}
        ></FlatList>
      ) : (
        <Heading textAlign={"center"} alignSelf="center" mt={"10"}>
          Click on the button above to create you first Album
        </Heading>
      )}
    </View>
  );
}

export default HomeScreen;
