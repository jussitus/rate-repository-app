import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query (
        $orderBy: AllRepositoriesOrderBy
        $orderDirection: OrderDirection
        $searchKeyword: String
    ) {
        repositories(
            orderBy: $orderBy
            orderDirection: $orderDirection
            searchKeyword: $searchKeyword
        ) {
            edges {
                node {
                    id
                    fullName
                    description
                    language
                    forksCount
                    stargazersCount
                    ratingAverage
                    reviewCount
                    ownerAvatarUrl
                }
            }
        }
    }
`;

export const ME = gql`
    query {
        me {
            id
            username
        }
    }
`;

export const GET_REPOSITORY = gql`
    query ($repositoryId: ID!) {
        repository(id: $repositoryId) {
            id
            fullName
            description
            language
            forksCount
            stargazersCount
            ratingAverage
            reviewCount
            ownerAvatarUrl
            url
            reviews {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`;
