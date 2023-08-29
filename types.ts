export type ProfileWithTotalLikes = {
  id: string;
  userId: string;
  name: string;
  username: string | null;
  email: string;
  imageUrl: string;
  createdPosts: {
    id: string;
    title: string;
    description: string;
    tag: string;
    likes: {
      id: string;
      profileId: string;
      postId: string;
      createdAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
  }[];
  totalLikes: number;
  createdAt: Date;
  updatedAt: Date;
};
