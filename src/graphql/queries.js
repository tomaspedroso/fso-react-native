import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS, REVIEW } from './fragments';

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, 
    $searchKeyword: String, $first: Int, $after: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, 
      first: $first, after: $after) {
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`

export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
      url
      reviews(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            ...Review
          }
        }
      }
      
    }
  }
  ${REPOSITORY_DETAILS}
  ${REVIEW}
`

export const GET_ME = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...Review
          }
        }
      }
    }
  }
  ${REVIEW}
`

