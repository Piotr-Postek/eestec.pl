export type MapBranchCountry = {
  labelPl: string;
  labelEn: string;
  branches: number;
};

export type MapBranchesFile = {
  _note?: string;
  countries: Record<string, MapBranchCountry>;
};
