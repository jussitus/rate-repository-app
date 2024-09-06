import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query (
        $orderBy: AllRepositoriesOrderBy
        $orderDirection: OrderDirection
        $searchKeyword: String
        $after: String
        $first: Int
    ) {
        repositories(
            orderBy: $orderBy
            orderDirection: $orderDirection
            searchKeyword: $searchKeyword
            after: $after
            first: $first
        ) {
            totalCount
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
                cursor
            }
            pageInfo {
                endCursor
                startCursor
                hasNextPage
            }
        }
    }
`;

export const ME = gql`
    query ($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        repository {
                            fullName
                            id
                        }
                    }
                }
            }
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
