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
    author: User;
    organization: Organization;
    createdAt: string;
    updatedAt: string;
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
  }
  