import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation CreateUser($email: String!, $password: String!, $name: String!, $role: String!, $orgId: Int!, $image: String) {
        createUser(email: $email, password: $password, name: $name, role: $role, orgId: $orgId, image: $image) {
            id
            email
            name
            role
            orgId
            image
        }
    }
`;

export const EDIT_USER = gql`
mutation EditUser($id: Int!, $name: String!, $email: String!, $role: UserRole!, $orgId: Int!, $image: String, $password: String) {
    editUser(id: $id, name: $name, email: $email, role: $role, orgId: $orgId, image: $image, password: $password) {
      id
      name
      email
      role
      image
      organization {
        id
        name
      }
    }
}
`;

export const DELETE_USER = gql`
    mutation DeleteUser($id: Int!) {
        deleteUser(id: $id) {
            id
        }
    }
`;

export const CREATE_POST = gql`
  mutation CreatePost($content: String!, $authorId: Int!, $orgId: Int!, $recipientId: Int!) {
    createPost(content: $content, authorId: $authorId, orgId: $orgId, recipientId: $recipientId) {
      id
    }
  }
`;

export const UPDATE_POST = gql`
    mutation UpdatePost($id: Int!, $content: String!) {
        updatePost(id: $id, content: $content) {
            id
            content
        }
    }
`;

export const DELETE_POST = gql`
    mutation DeletePost($id: Int!) {
        deletePost(id: $id) {
            id
        }
    }
`;

export const CREATE_ORGANIZATION = gql`
    mutation CreateOrganization($name: String!, $address: String!, $country: String!, $organizationType: String!) {
        createOrganization(data: {name: $name, address: $address, country: $country, organizationType: $organizationType}) {
            id
            name
            address
            country
            organizationType
        }
    }
`;

export const EDIT_ORGANIZATION = gql`
    mutation EditOrganization($data: EditOrganizationInput!) {
        editOrganization(data: $data) {
            id
            name
            address
            country
            organizationType
        }
    }
`;

export const VERIFY_CURRENT_PASSWORD = gql`
    mutation VerifyCurrentPassword($userId: Int!, $password: String!) {
        verifyCurrentPassword(userId: $userId, password: $password)
    }
`;