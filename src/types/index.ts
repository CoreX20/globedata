export type Language = {
  name: string;
};

export type Continent = {
  name: string;
};

export type Country = {
  code: string;
  name: string;
  capital?: string;
  emojiU: string;
  currency: string;
  languages: Language[];
  continent: Continent;
};

export interface Data {
  countries: Country[];
}
