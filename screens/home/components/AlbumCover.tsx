import { useNavigation } from "@react-navigation/native";
import { useMutation } from "react-query";
import { queryClient } from "../../../App";
import { useCurrentUser } from "../../../components/context/AuthContext";
import Cover from "../../../components/Cover";
import { Routes } from "../../../helper/globalTypes";
import { deleteAlbum } from "../helper/api";

interface AlbumCover {
  id: number;
  title: string;
  cover?: string;
  created: string;
  owner: number;
}

function AlbumCover({ id, cover, title, owner }: AlbumCover) {
  const { user } = useCurrentUser();
  const navigate = useNavigation<Routes>();
  const { mutate } = useMutation({
    mutationFn: () => deleteAlbum(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["albums"]);
    },
  });
  return (
    <Cover
      image={cover}
      onDelete={owner === user?.user_id ? () => mutate() : undefined}
      title={title}
    ></Cover>
  );
}

export default AlbumCover;
