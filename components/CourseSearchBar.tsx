"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { supabase } from "@/lib/supabase";
import { IoIosSearch } from "react-icons/io";

const CourseSearchBar = ({
  search,
  setSearch,
  searchResults,
  setSearchResults,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchResults: string[];
  setSearchResults: Dispatch<SetStateAction<string[]>>;
}) => {
  const searchCourse = async (search: string) => {
    try {
      if (!search.trim()) {
        setSearchResults([]);
        return;
      }

      const searchPattern = `%${search.trim()}%`;

      const { data, error } = await supabase
        .from("course")
        .select("course_code")
        .ilike("course_code", searchPattern)
        .limit(6);

      if (error) throw error;

      if (data && data.length > 0) {
        setSearchResults(data.map((result) => result.course_code));
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.log("There was an error searching for course: ", error);
      throw error;
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchCourse(search);
    }, 50);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="w-40 h-8 sm:w-88 flex items-center relative ">
      <IoIosSearch className="sm:text-xl text-sm absolute left-3" />
      <input
        type="text"
        className="w-full h-full sm:text-base text-xs sm:indent-7 indent-6 border-[0.5px] rounded-full sm:px-3 sm:py-2 px-2 py-1 bg-white"
        placeholder="Search for courses"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onClick={() => search && searchCourse(search)}
      />
    </div>
  );
};

export default CourseSearchBar;
