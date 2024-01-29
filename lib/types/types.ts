export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  role: UserRole;
  posts: Post[];
  organization: Organization;
  createdAt: string;
  updatedAt: string;
}


export interface Post {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  recipient: User;
  organization: Organization;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  postId: string;
}

export interface Organization {
  id: string;
  name: string;
  address: string;
  country: string;
  organizationType: string;
  users: User[];
  admins: User[];
  posts: Post[];
}

export interface Query {
  users: User[];
  posts: Post[];
  organizations: Organization[];
}

export interface Mutation {
  createUser: (email: string, password: string, name: string, role: UserRole, orgId: number) => User;
  createPost: (content: string, authorId: number, orgId: number) => Post;
  updatePost: (id: string, content: string) => Post;
  deletePost: (id: string) => Post;
  createComment: (content: string, authorId: string, postId: string) => Comment;
  updateComment: (id: string, content: string) => Comment;
  deleteComment: (id: string) => Comment;
}
