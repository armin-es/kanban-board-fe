import { useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client/react";
import { GET_CHARACTERS } from "../graphql/queries";
import type { Character } from "../types/kanban";

interface CharactersResult {
  characters: {
    results: Character[];
    info: { count: number; pages: number; next: number | null };
  };
}

export function useCharacters(name: string) {
  const { data: defaultData } = useQuery<CharactersResult>(GET_CHARACTERS, {
    variables: { page: 1 },
  });

  const [search, { data: searchData, loading }] =
    useLazyQuery<CharactersResult>(GET_CHARACTERS);

  useEffect(() => {
    if (!name) return;
    const timer = setTimeout(() => {
      search({ variables: { filter: { name } } });
    }, 300);
    return () => clearTimeout(timer);
  }, [name, search]);

  return {
    characters:
      (name
        ? searchData?.characters?.results
        : defaultData?.characters?.results) ?? [],
    loading,
  };
}
