import React, { Dispatch, SetStateAction } from "react";
import { useMutation } from "react-query";
import { queryClient } from "../../../App";
import { useCurrentUser } from "../../../components/context/AuthContext";
import Cover from "../../../components/Cover";
import { removeImageFromAlbum } from "../helper/api";

interface IProps {
  image: Image;
  albumId: number;
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
  console.log({ user: user, albumOwnerId });
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
        onClick={() => {
          console.log("here");
          setEditImage(image);
        }}
      ></Cover>
    </>
  );
}

export default ImageCover;
