interface Image {
  title?: string;
  description?: string;
  image: string;
  n_likes?: number;
  n_downloads?: number;
  created: string;
  id: number;
}

interface Album {
  id: number;
  title: string;
  owner: number;
  cover?: string;
  created: string;
  pictures: Image[] | [];
}

interface User {
  id: number;
  title: string;
  cover?: string;
  created: string;
}
