import { ImageFile } from "../../../components/ImagePicker";
import { axiosPrivate } from "../../../helper/axiosPrivate";

export type ImageUploadParams = {
  title: string;
  description: string;
  image: ImageFile;
};

export type ImageEditParams = {
  title: string;
  description: string;
};

export async function fetchAllAlbumData(albumId?: string): Promise<Album> {
  const response = await axiosPrivate.get(`/album/${albumId}?format=json`);
  return response.data;
}

export async function addImageToAlbum(photo: FormData): Promise<Image> {
  return axiosPrivate.post("/photos-upload/", photo);
}

export async function removeImageFromAlbum(id: number): Promise<Image> {
  return axiosPrivate.delete(`/photos/${id}`);
}

export async function editImage(
  photo: ImageEditParams,
  id: number
): Promise<Image> {
  return axiosPrivate.patch(`/photos/${id}/`, photo);
}
