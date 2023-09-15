import { gql } from "@apollo/client";

export const GET_USERS = gql`
query Users {
	users {
	  name
	  id
	  organization {
		name
		posts {
		  content
		  author {
			name
		  }
		}
	  }
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
    createdAt
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

export const GET_POSTS = gql`
	query Posts {
		posts {
			id
			content
			authorId
			orgId
			author {
				id
				email
				name
				role
				orgId
			}
			organization {
				id
				name
			}
		}
	}
`;

export const GET_ORGANIZATIONS = gql`
query Organizations {
	organizations {
	  address
	  admins {
		name
		email
		role
	  }
	  country
	  id
	  name
	  organizationType
	  users {
		email
		name
	  }
	}
  }
`;


export const GET_ORG_NAME_BY_IDS = gql`
query GET_ORG_NAME_BY_ID($id: ID!) {
	organization(where: { id: $id }) {
	  name
	}
  }
`;

export const GET_ORG_INFO = gql`
query GET_ORG_INFO {
	organizations {
	  address
	  country
	  name
	  organizationType
	  users {
		role
		name
		email
	  }
	  admins {
		role
		name
		email
	  }
	}
  }
`;