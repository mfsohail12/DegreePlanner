"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from "next/navigation";

type SearchResult = {
  program_name: string;
  id: number;
};

const ProgramSearchBar = () => {
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  console.log(searchResults);
  console.log({ search });

  useEffect(() => {
    const searchProgram = async (searchInput: string) => {
      setError("");
      if (!searchInput) {
        setSearchResults([]);
        return;
      }
      const searchPattern = `%${searchInput.trim()}%`;

      const { data, error } = await supabase
        .from("program")
        .select("program_name, id")
        .ilike("program_name", searchPattern);

      if (error)
        setError(
          "There was an error searching for that program: " + error.message
        );

      console.log({ data });

      if (data && data.length > 0) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    };

    const delayDebounce = setTimeout(() => {
      searchProgram(search);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="relative">
      <div className="flex items-center relative z-10 mt-6">
        <IoIosSearch className="text-2xl absolute left-3" />
        <input
          type="text"
          className="w-102 indent-7 border-[0.5px] rounded-full py-2 px-3 shadow-lg bg-white"
          placeholder="Find Your Program"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      {error && (
        <div className="z-10 bg-red-100 rounded-xl p-3 absolute top-full mt-3 shadow-lg">
          {error}
        </div>
      )}
      {searchResults.length > 0 && (
        <div className="flex flex-col gap-1 p-2 z-10 bg-white shadow-lg border-[0.5px] rounded-xl absolute top-full mt-3 w-102">
          {searchResults.map((result) => (
            <button
              key={result.id}
              className="hover:bg-light-grey p-1 text-sm text-left"
              onClick={() => router.push(`/program/${result.id}`)}
            >
              {result.program_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgramSearchBar;
