import { RouteProp, useRoute } from "@react-navigation/native";
import { FlatList, Heading, View } from "native-base";
import React, { useState } from "react";
import { useQuery } from "react-query";
import ItemSeperator from "../../components/ItemSeperator";
import AddModal from "./components/AddModal";
import EditImageModal from "./components/EditImage";
import ImageCover from "./components/ImageCover";
import { fetchAllAlbumData } from "./helper/api";
import { RootStackParamList } from "../../helper/globalTypes";

function Album() {
  const [editImage, setEditImage] = useState<Image | null | undefined>();
  const route = useRoute<RouteProp<RootStackParamList, "Album">>();
  const id = route.params.id;
  const { data, isSuccess } = useQuery(["albumData", id], () => {
    return fetchAllAlbumData(id);
  });

  if (!id) {
    return null;
  }
  return (
    <View p={"5"} flex={1} bg={"gray.800"}>
      <View>
        <Heading my={"2"} color={"white"} size={"2xl"}>
          {data?.title}
        </Heading>
        <AddModal albumId={id} />
      </View>
      {isSuccess && (
        <FlatList
          data={data.pictures}
          renderItem={({ item }) => (
            <ImageCover
              albumOwnerId={data.owner}
              setEditImage={setEditImage}
              image={item}
              albumId={+id}
            ></ImageCover>
          )}
          ItemSeparatorComponent={ItemSeperator}
        ></FlatList>
      )}
      {editImage && (
        <EditImageModal
          onClose={() => {
            setEditImage(null);
          }}
          open={true}
          image={editImage}
          albumId={id}
        />
      )}
    </View>
  );
}

export default Album;
