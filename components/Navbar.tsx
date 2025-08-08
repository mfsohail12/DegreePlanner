"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CourseSearchBar from "./CourseSearchBar";
import { useEffect, useRef, useState } from "react";
import CourseNode from "./CourseNode";
import { useCompletedCourses } from "@/context/CompletedCoursesContext";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiResetLeftLine } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showCompletedCoursesModal, setShowCompletedCoursesModal] =
    useState<boolean>(false);
  const searchResultsRef = useRef<HTMLDivElement | null>(null);
  const { completedCourses, setCompletedCourses } = useCompletedCourses();

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      setSearch("");
      setShowCompletedCoursesModal(false);
    }
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
      <nav className="w-screen flex items-center justify-between h-[60px] bg-light-grey border-b-[0.5px] lg:px-10 px-3 py-3 fixed top-0 z-100">
        <Link href="/" className="flex items-center gap-1">
          <h1 className="font-bold sm:text-xl text-sm">DegreePlanner</h1>
        </Link>
        {pathname.startsWith("/program") ||
        pathname.startsWith("/course") ||
        pathname.startsWith("/completed-courses") ? (
          <span className="flex items-center sm:gap-3 gap-2">
            <button
              className="rounded-full h-7 sm:h-auto sm:px-4 sm:py-2 px-2 sm:text-sm text-[0.5rem] bg-foreground hover:opacity-90 text-light-grey font-semibold"
              onClick={() => setShowCompletedCoursesModal(true)}
            >
              {window.innerWidth >= 640
                ? "View Completed Courses"
                : "Completed"}
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
              href="/about"
              className="sm:text-sm text-xs font-semibold rounded-full px-4 py-2 bg-foreground hover:opacity-90 text-light-grey"
            >
              About
            </Link>
          </span>
        )}
      </nav>
      {searchResults.length > 0 && (
        <div
          ref={searchResultsRef}
          className="w-screen max-h-1/4 overflow-y-scroll overscroll-contain z-100 py-7 px-4 bg-white border-b-[0.5px] shadow-lg flex gap-8 flex-wrap items-center justify-center fixed top-[60px] left-0"
        >
          {searchResults.map((result) => (
            <CourseNode courseCode={result} />
          ))}
        </div>
      )}

      <AnimatePresence>
        {showCompletedCoursesModal && (
          <motion.div
            initial={{
              y: "100%",
            }}
            animate={{
              y: showCompletedCoursesModal ? 0 : "100%",
            }}
            exit={{
              y: "100%",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="max-h-2/5 h-60 fixed bottom-0 z-100 bg-white border-t-[0.5px] w-screen overflow-y-scroll shadow-[0px_-4px_4px_rgba(0,0,0,0.25)]"
          >
            <button
              className="w-screen bg-slate-200 hover:bg-light-grey border-b-[0.5px] h-8 sticky top-0 left-0 flex justify-center items-center"
              onClick={() => setShowCompletedCoursesModal(false)}
            >
              <IoMdArrowDropdown className="text-3xl" />
            </button>
            <div className="pb-8 px-8">
              <span className="flex justify-between items-center mt-6 mb-8">
                <h1 className="sm:text-3xl text-2xl font-semibold">
                  Completed Courses
                </h1>
                {completedCourses.length > 0 && (
                  <button
                    className="flex gap-2 items-center font-semibold rounded-full px-4 py-2 bg-foreground hover:opacity-90 text-white "
                    onClick={() => setCompletedCourses([])}
                  >
                    <RiResetLeftLine className="text-sm" />
                    <p className="text-xs">
                      {window.innerWidth >= 640
                        ? "Clear Completed Courses"
                        : "Clear"}
                    </p>
                  </button>
                )}
              </span>
              <div className="flex flex-wrap gap-7 justify-center items-center">
                {completedCourses.length > 0 ? (
                  completedCourses.map((course) => (
                    <CourseNode key={course} courseCode={course} />
                  ))
                ) : (
                  <p className="flex justify-center items-cente sm:text-base text-sm">
                    You have not completed any courses yet
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
