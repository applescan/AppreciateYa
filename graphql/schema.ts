export const typeDefs = `#graphql 
type User {
    id: ID!
    email: String!
    name: String!
    role: UserRole!
    posts: [Post!]!
    organization: Organization!
    createdAt: String!
    updatedAt: String!
  }
  
  type Post {
    id: ID!
    content: String!
    author: User!
    organization: Organization!
    createdAt: String!
    updatedAt: String!
  }
  
  type Organization {
    id: ID!
    name: String!
    users: [User!]!
    posts: [Post!]!
  }
  
  enum UserRole {
    USER
    ADMIN
  }
  
  type Query {
    users: [User!]!
    posts: [Post!]!
    organizations: [Organization!]!
  }
  
  type Mutation {
    createUser(email: String!, password: String!, name: String!, role: UserRole!, orgId: Int!): User!
    editUser(id: Int!, name: String!, email: String!, role: UserRole!, orgId: Int!): User!
    deleteUser(id: ID!): User!
    createPost(content: String!, authorId: Int!, orgId: Int!): Post!
    updatePost(id: ID!, content: String!): Post!
    deletePost(id: ID!): Post!
  }
`;
