"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CourseSearchBar from "./CourseSearchBar";
import { useEffect, useRef, useState } from "react";
import CourseNode from "./CourseNode";
import { useCompletedCourses } from "@/context/CompletedCoursesContext";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiResetLeftLine } from "react-icons/ri";

const Navbar = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showCompletedCoursesModal, setShowCompletedCoursesModal] =
    useState<boolean>(false);
  const searchResultsRef = useRef<HTMLDivElement | null>(null);
  const { completedCourses, setCompletedCourses } = useCompletedCourses();

  const pathname = usePathname();

  useEffect(() => {
    setSearch("");
  }, [pathname]);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <nav className="w-screen flex items-center justify-between h-[60px] bg-light-grey border-b-[0.5px] px-10 py-3 fixed top-0 z-100">
        <Link href="/" className="flex items-center gap-1">
          <h1 className="font-bold text-xl">DegreePlanner</h1>
        </Link>
        {pathname.startsWith("/program") ||
        pathname.startsWith("/course") ||
        pathname.startsWith("/completed-courses") ? (
          <span className="flex gap-3">
            <button
              className="rounded-full px-4 py-2 text-sm bg-foreground hover:opacity-90 text-light-grey"
              onClick={() => setShowCompletedCoursesModal(true)}
            >
              View Completed Courses
            </button>
            <CourseSearchBar
              search={search}
              setSearch={setSearch}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
            />
          </span>
        ) : (
          <span className="flex gap-4">
            <Link
              href="/contact"
              className="text-sm font-semibold rounded-full px-4 py-2 bg-foreground hover:opacity-90 text-light-grey"
            >
              Contact
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold rounded-full px-4 py-2 bg-foreground hover:opacity-90 text-light-grey"
            >
              About
            </Link>
          </span>
        )}
      </nav>
      {searchResults.length > 0 && (
        <div
          ref={searchResultsRef}
          className="w-screen py-7 px-4 bg-white border-b-[0.5px] shadow-lg flex gap-8 flex-wrap items-center justify-center fixed top-[60px] left-0"
        >
          {searchResults.map((result) => (
            <CourseNode courseCode={result} />
          ))}
        </div>
      )}

      {showCompletedCoursesModal && (
        <div className="max-h-80 fixed bottom-0 z-100 bg-white border-t-[0.5px] w-screen overflow-y-scroll shadow-[0px_-4px_4px_rgba(0,0,0,0.25)]">
          <button
            className="w-screen bg-slate-200 hover:bg-light-grey border-b-[0.5px] h-8 sticky top-0 left-0 flex justify-center items-center"
            onClick={() => setShowCompletedCoursesModal(false)}
          >
            <IoMdArrowDropdown className="text-3xl" />
          </button>
          <div className="pb-8 px-8">
            <span className="flex justify-between items-center mt-6 mb-8">
              <h1 className="text-3xl font-semibold">Completed Courses</h1>
              {completedCourses.length > 0 && (
                <button
                  className="flex gap-2 items-center font-semibold rounded-full px-4 py-2 bg-foreground hover:opacity-90 text-white"
                  onClick={() => setCompletedCourses([])}
                >
                  <RiResetLeftLine className="text-sm" />
                  <p className="text-xs">Clear Completed Courses</p>
                </button>
              )}
            </span>
            <div className="flex flex-wrap gap-7 justify-center items-center">
              {completedCourses.length > 0 ? (
                completedCourses.map((course) => (
                  <CourseNode key={course} courseCode={course} />
                ))
              ) : (
                <p className="flex justify-center items-center">
                  You have not completed any courses yet
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
