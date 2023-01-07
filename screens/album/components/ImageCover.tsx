import React, { Dispatch, SetStateAction } from "react";
import { useMutation } from "react-query";
import { queryClient } from "../../../App";
import { useCurrentUser } from "../../../components/context/AuthContext";
import Cover from "../../../components/Cover";
import { removeImageFromAlbum } from "../helper/api";

interface IProps {
  image: Image;
  albumId: string;
  albumOwnerId: number;
  setEditImage: Dispatch<SetStateAction<Image | null | undefined>>;
}

function ImageCover({ image, albumId, setEditImage, albumOwnerId }: IProps) {
  const { user } = useCurrentUser();
  const { mutate } = useMutation({
    mutationFn: removeImageFromAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries(["albumData", albumId]);
    },
  });
  return (
    <>
      <Cover
        title={image.title}
        image={image.image}
        onDelete={
          user?.user_id === albumOwnerId
            ? () => {
                mutate(image.id);
              }
            : undefined
        }
        onClick={
          user?.user_id === albumOwnerId
            ? () => {
                setEditImage(image);
              }
            : undefined
        }
      ></Cover>
    </>
  );
}

export default ImageCover;
