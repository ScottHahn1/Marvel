export type CharacterData = {
  data: {
    results: {
      name: string;
      id: number;
      description: string;
      thumbnail: {
        path: string;
        extension: string;
      };
    }[]
  };
};

export interface CharacterParams {
  apikey: string | undefined,
  ts: string,
  hash: string,
  offset?: number
}