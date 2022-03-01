import { gql } from '@apollo/client';
import { REVIEW_DETAILS } from './fragments';

export const USER_SIGN_IN = gql`
    mutation SignInUser ($username: String!, $password: String!) {
        authenticate(
            credentials: {
                username: $username,
                password: $password
            }
        ) {
            accessToken
        }
    }
`

export const CREATE_REVIEW = gql`
    mutation CreateReview ($ownerName: String!, $repositoryName: String!, $rating: Int!, $text: String) {
        createReview(
            review: {
                ownerName: $ownerName,
                repositoryName: $repositoryName,
                rating: $rating
                text: $text
            }       
        ) {
            repositoryId,
            ...ReviewDetails
        }
    }
    ${REVIEW_DETAILS}
`