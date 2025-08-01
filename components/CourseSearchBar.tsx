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
  useEffect(() => {
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

    const delayDebounce = setTimeout(() => {
      searchCourse(search);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="flex items-center relative">
      <IoIosSearch className="text-xl absolute left-3" />
      <input
        type="text"
        className="w-88 text-sm indent-7 border-[0.5px] rounded-full px-3 py-2 bg-white"
        placeholder="Search for courses"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
};

export default CourseSearchBar;
