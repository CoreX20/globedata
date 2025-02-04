import React, { useState } from "react";
import { ExpandableCardDemo } from "./ui/ExpandableCard";
import { Search } from "./ui/Search";
import { useQuery, gql } from "@apollo/client";
import { Country, Data } from "@/types";

const placeholders = [
  "Search for a country name...",
  "Which country has the largest population?",
  "Find the capital of Japan",
  "What continent is Egypt located in?",
  "What is the currency of Brazil?",
  "Discover the official languages of Germany",
  "Where is the Eiffel Tower located?",
  "Which country uses the Yen as currency?",
  "What is the capital of Australia?",
  "What continent is Canada part of?",
  "Find the largest country by land area",
  "Where can you find the Great Wall of China?",
  "What country speaks French as the official language?",
  "Which country is known as the Land of the Rising Sun?",
];

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      capital
      emojiU
      currency
      native
      languages {
        name
      }
      continent {
        name
      }
    }
  }
`;

const CountriesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, error, data } = useQuery<Data>(GET_COUNTRIES, {
    fetchPolicy: "cache-first",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const onSubmit = () => {
    setSearchQuery("");
  };

  const filteredCountries = data
    ? data.countries.filter(
        (country: Country) =>
          country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          country.capital?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          country.continent?.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    : [];

  // const filteredCountries = useMemo(() => {
  //   console.log("test memo");
  //   return data
  //     ? data.countries.filter((country) =>
  //         country.name.toLowerCase().includes(searchQuery.toLowerCase())
  //       )
  //     : [];
  // }, [data, searchQuery]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div id="explore" className="wrapper">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-xl md:text-4xl dark:text-white text-black">
          Discover the world <span className="text-gray-500">&gt;</span>
        </h1>
        <Search
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>

      <div className="mt-5">
        <ExpandableCardDemo countries={filteredCountries} />
      </div>
    </div>
  );
};

export default CountriesList;
