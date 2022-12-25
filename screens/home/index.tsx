import { FlatList, Heading, View } from "native-base";
import React from "react";
import { useQuery } from "react-query";
import AlbumCover from "./components/AlbumCover";
import { fetchAllAlbums } from "./helper/api";

function HomeScreen() {
  const { data: albums } = useQuery({
    queryKey: ["albums"],
    queryFn: fetchAllAlbums,
  });

  return (
    <View p="5" flex={1}>
      {/* <div className="flex justify-between mb-10 flex-col md:flex-row">
        <h1>Your albums</h1>
        <AddModal />
      </div> */}
      {albums?.length && albums.length > 0 ? (
        <FlatList
          data={albums}
          renderItem={(item) => <AlbumCover {...item.item} />}
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
