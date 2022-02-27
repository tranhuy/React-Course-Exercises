import { gql } from '@apollo/client';

import { REPO_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
    query {
        repositories {
            edges {
                node {
                    ...RepoDetails
                }
            }
        }
    }
    ${REPO_DETAILS}
`
export const GET_REPOSITORY = gql`
    query getRep($repositoryId: ID!) {
        repository(id: $repositoryId) {
            ...RepoDetails,
            url
        }
    }
    ${REPO_DETAILS}
`

export const SIGNED_IN_USER = gql`
    query {
        me {
            id,
            username
        }
    }
`