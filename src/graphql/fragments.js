import { gql } from '@apollo/client';

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    fullName
    ratingAverage
    reviewCount
    stargazersCount
    forksCount
    ownerAvatarUrl
    description
    language
    id
  }
`;

export const REVIEW = gql`
  fragment Review on Review {
    createdAt
    id
    rating
    text
    repositoryId
    user {
      id
      username
    }
  }
`;

export const USER_REVIEWS = gql`
  fragment UserReviews on User {
    reviews {
      edges {
        node {
          ...Review
        }
      }
    }
  }
  ${REVIEW}
`;