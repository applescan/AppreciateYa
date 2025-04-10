import { User, Post, Organization } from "@prisma/client";

interface IUser extends User {
  posts: Post[];
  organization: Organization;
}

interface IPost extends Post {
  author: User;
  organization: Organization;
}

interface IOrganization extends Organization {
  users: User[];
  posts: Post[];
}
