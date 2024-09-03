import { gql } from '@apollo/client';
export const AUTHENTICATE = gql`
    mutation ($username: String!, $password: String!) {
        authenticate(
            credentials: { username: $username, password: $password }
        ) {
            accessToken
        }
    }
`;

export const CREATE_REVIEW = gql`
    mutation (
        $ownerName: String!
        $repositoryName: String!
        $rating: Int!
        $text: String
    ) {
        createReview(
            review: {
                ownerName: $ownerName
                rating: $rating
                repositoryName: $repositoryName
                text: $text
            }
        ) {
            repository {
                id
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation ($username: String!, $password: String!) {
        createUser(user: { username: $username, password: $password }) {
            id
        }
    }
`;
