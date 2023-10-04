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

export const GET_POSTS = gql`
	query Posts {
		posts {
			id
			content
			createdAt
			updatedAt
			author {
				id
				email
				name
				role
				image
				organization {
					id
					name
				}
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
