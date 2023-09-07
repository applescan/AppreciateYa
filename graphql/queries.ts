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
  query Query {
    users {
      id
      name
      email
      role
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
			id
			name
			users {
				id
				email
				name
				role
				orgId
			}
			posts {
				id
				content
				authorId
				orgId
			}
		}
	}
`;
