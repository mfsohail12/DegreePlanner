"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { IoIosSearch } from "react-icons/io";

const CourseSearchBar = () => {
  const [search, setSearch] = useState<string>("");

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
