export const typeDefs = `#graphql 
type User {
    id: ID!
    email: String!
    name: String!
    role: UserRole!
    image: String
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
    address: String!
    country: String!
    organizationType: String!
    admins: [User!]!
    users: [User!]!
    posts: [Post!]!
}

  input CreateOrganizationInput {
    name: String!
    address: String!
    country: String!
    organizationType: String!
  }

  input EditOrganizationInput {
    id: ID!
    name: String
    address: String
    country: String
    organizationType: String
}
  
  enum UserRole {
    USER
    ADMIN
  }
  
  type Query {
    user(id: Int!): User
    users(orderBy: UserOrderByInput): [User!]!
    posts: [Post!]!
    organizations: [Organization!]!
    organization(where: OrganizationWhereUniqueInput!): Organization
}

  input UserOrderByInput {
    createdAt: SortOrder
  }

  input OrganizationWhereUniqueInput {
    id: ID!
}

  enum SortOrder {
    asc
    desc
  }
  type Mutation {
    createUser(email: String!, password: String!, name: String!, role: UserRole!, orgId: Int!, image: String): User!
    editUser(id: Int!, name: String!, email: String!, role: UserRole!, orgId: Int!, image: String, password: String): User!
    deleteUser(id: Int!): User!
    createPost(content: String!, authorId: Int!, orgId: Int!): Post!
    updatePost(id: Int!, content: String!): Post!
    deletePost(id: Int!): Post!
    createOrganization(data: CreateOrganizationInput!): Organization!
    editOrganization(data: EditOrganizationInput!): Organization!
    verifyCurrentPassword(userId: Int!, password: String!): Boolean!
}
`;
