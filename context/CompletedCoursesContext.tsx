"use client";
import { createContext, useContext, useEffect, useState } from "react";

type CompletedCoursesContextType = {
  completedCourses: CourseCode[];
  setCompletedCourses: React.Dispatch<React.SetStateAction<CourseCode[]>>;
};

const CompletedCoursesContext = createContext<
  CompletedCoursesContextType | undefined
>(undefined);

const CompletedCoursesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [completedCourses, setCompletedCourses] = useState<CourseCode[]>([]);

  useEffect(() => {
    const storedCompletedCourses = localStorage.getItem(
      "storedCompletedCourses"
    );

    if (storedCompletedCourses) {
      setCompletedCourses(JSON.parse(storedCompletedCourses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "storedCompletedCourses",
      JSON.stringify(completedCourses)
    );
  }, [completedCourses]);

  return (
    <CompletedCoursesContext.Provider
      value={{ completedCourses, setCompletedCourses }}
    >
      {children}s
    </CompletedCoursesContext.Provider>
  );
};

export const useCompletedCourses = () => {
  const ctx = useContext(CompletedCoursesContext);
  if (!ctx)
    throw new Error(
      "useCompletedCourses must be used within a CompletedCoursesProvider"
    );
  return ctx;
};

export default CompletedCoursesProvider;
