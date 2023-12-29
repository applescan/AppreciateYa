import { gql } from "@apollo/client";

export const GET_USERS = gql`
query Users {
	users {
	  id
	  name
	  email
	  role
	  image
	  createdAt
	  updatedAt
	  organization {
		id
		name
		posts {
		  id
		  content
		  author {
			id
			name
			email
			role
		  }
		}
	  }
	}
  }
`;

export const GET_USER_BY_ID = gql`
query GetUserById($id: Int!) {
    user(id: $id)  {
        id
        name
        email
        role
        image
        createdAt
        updatedAt
        organization {
            id
            name
        }
    }
}
`;

export const GET_USERS_BY_ORGANIZATION_ID = gql`
  query GetUsersByOrganizationId($orgId: Int!) {
    usersByOrganizationId(orgId: $orgId) {
	  id
      name
      email
      role
      image
    }
  }
`;

export const GET_USERS_AND_ORGANIZATIONS = gql`
query GET_USERS_AND_ORGANIZATIONS {
users(orderBy: { createdAt: asc }) {
    id
    name
    email
    role
    image
    createdAt
    updatedAt
    organization {
      id
      name
    }
  }
  organizations {
    id
    name
  }
}
`;


export const GET_ALL_POSTS = gql`
  query Posts {
    posts {
      id
      content
      createdAt
      updatedAt
      author {
        id
        name
        image
        organization {
          id
        }
      }
      recipient {
        name
        image
      }
    }
  }
`;

export const GET_ALL_POSTS_BY_ORG = gql`
  query GetPostsByOrganizationId($orgId: Int!, $filter: PostFilterInput) {
    postsByOrganizationId(orgId: $orgId, filter: $filter) {
      id
      content
      createdAt
      updatedAt
      author {
        id
        name
        image
        organization {
          id
        }
      }
      recipient {
        name
        image
      }
    }
  }
`;

export const GET_POSTS_BY_SPECIFIC_RECIPIENT = gql`
  query GetPostsBySpecificRecipient($orgId: Int!, $recipientId: Int!, $filter: PostFilterInput) {
    postsBySpecificRecipient(orgId: $orgId, recipientId: $recipientId, filter: $filter) {
      id
      content
      createdAt
      updatedAt
      author {
        id
        name
        image
        organization {
          id
        }
      }
      recipient {
        id
        name
        image
      }
    }
  }
`;

export const GET_POSTS_BY_SPECIFIC_AUTHOR = gql`
  query GetPostsBySpecificSender($orgId: Int!, $authorId: Int!, $filter: PostFilterInput) {
    postsBySpecificSender(orgId: $orgId, authorId: $authorId, filter: $filter) {
      id
      content
      createdAt
      updatedAt
      author {
        id
        name
        image
        organization {
          id
        }
      }
      recipient {
        id
        name
        image
      }
    }
  }
`;

export const GET_ORGANIZATIONS = gql`
query Organizations {
	organizations {
	  id
	  name
	  address
	  country
	  organizationType
	  users {
		id
		email
		name
		role
		image
	  }
	  admins {
		id
		email
		name
		role
		image
	  }
	}
  }
`;

export const GET_ORG_NAME_BY_IDS = gql`
query GET_ORG_NAME_BY_ID($id: ID!) {
	organization(where: { id: $id }) {
	  id
	  name
	}
  }
`;

export const GET_ORG_INFO = gql`
query GET_ORG_INFO {
	organizations {
	  id
	  name
	  address
	  country
	  organizationType
	  users {
		id
		name
		email
		role
		image
	  }
	  admins {
		id
		name
		email
		role
		image
	  }
	}
  }
`;
