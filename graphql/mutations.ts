import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation CreateUser($email: String!, $password: String!, $name: String!, $role: String!, $orgId: ID!) {
        createUser(email: $email, password: $password, name: $name, role: $role, orgId: $orgId) {
            id
            email
            name
            role
            orgId
        }
    }
`;

export const EDIT_USER = gql`
mutation EditUser($id: Int!, $name: String!, $email: String!, $role: UserRole!, $orgId: Int!) {
    editUser(id: $id, name: $name, email: $email, role: $role, orgId: $orgId) {
      id
      name
      email
      role
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
    mutation CreatePost($content: String!, $authorId: ID!, $orgId: ID!) {
        createPost(content: $content, authorId: $authorId, orgId: $orgId) {
            id
            content
            authorId
            orgId
        }
    }
`;

export const UPDATE_POST = gql`
    mutation UpdatePost($id: ID!, $content: String!) {
        updatePost(id: $id, content: $content) {
            id
            content
        }
    }
`;

export const DELETE_POST = gql`
    mutation DeletePost($id: ID!) {
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

