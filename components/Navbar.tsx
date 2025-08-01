"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CourseSearchBar from "./CourseSearchBar";
import { useState } from "react";
import CourseNode from "./CourseNode";

const Navbar = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const pathname = usePathname();

  return (
    <>
      <nav className="w-screen bg-light-grey h-14 border-b-[0.5px] flex text-xl px-6 items-center justify-between relative top-0">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/Logo.png"
            width={60}
            height={60}
            alt="Degree Planner Logo"
          />
          <h1 className="font-bold">DegreePlanner</h1>
        </Link>
        {pathname.startsWith("/program") ? (
          <CourseSearchBar
            search={search}
            setSearch={setSearch}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        ) : (
          <span className="flex gap-4">
            <Link
              href="/suggest-program"
              className="text-sm font-semibold hover:text-mcgill-red"
            >
              Can't Find Your Program?
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold hover:text-mcgill-red"
            >
              Contact
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold hover:text-mcgill-red"
            >
              About
            </Link>
          </span>
        )}
      </nav>
      {searchResults.length > 0 && (
        <div className="w-screen py-7 px-4 bg-white border-b-[0.5px] absolute top-14 shadow-lg flex gap-8 flex-wrap items-center justify-center">
          {searchResults.map((result) => (
            <CourseNode courseCode={result} />
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
