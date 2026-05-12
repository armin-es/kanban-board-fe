import { gql } from "@apollo/client/core";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        id
        name
        image
        species
        status
      }
      info {
        count
        pages
        next
      }
    }
  }
`;
