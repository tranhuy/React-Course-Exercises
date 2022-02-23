import { gql } from '@apollo/client';

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