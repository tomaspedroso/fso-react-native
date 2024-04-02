import { render, screen } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);

      const repositoryItems = screen.getAllByTestId('repositoryItem');

      repositoryItems.map((repositoryItem, index) => {
        // Render name
        expect(repositoryItem).toHaveTextContent(repositories.edges[index].node.fullName);

        // Render description
        expect(repositoryItem).toHaveTextContent(repositories.edges[index].node.description);

        // Render forks count
        const forksCount = repositories.edges[index].node.forksCount;
        const forksCountRendered = forksCount < 1000 ? forksCount : (forksCount / 1000).toFixed(1);
        expect(repositoryItem).toHaveTextContent(forksCountRendered);

        // Render stargazers count
        const stargazersCount = repositories.edges[index].node.stargazersCount;
        const stargazersCountRendered = stargazersCount < 1000 ? stargazersCount : (stargazersCount / 1000).toFixed(1);
        expect(repositoryItem).toHaveTextContent(stargazersCountRendered);

        // Render rating average
        expect(repositoryItem).toHaveTextContent(repositories.edges[index].node.ratingAverage);

        // Render review count
        expect(repositoryItem).toHaveTextContent(repositories.edges[index].node.reviewCount);
      })
      

    })
  });
});