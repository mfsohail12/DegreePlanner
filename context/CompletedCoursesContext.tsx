"use client";
import { createContext, useContext, useEffect, useState } from "react";

type CompletedCourse = {
  courseCode: CourseCode;
  allocatedGroupId: number | null;
  credits: number;
};

type CompletedCoursesContextType = {
  completedCourses: CompletedCourse[];
  setCompletedCourses: React.Dispatch<React.SetStateAction<CompletedCourse[]>>;
};

const CompletedCoursesContext = createContext<
  CompletedCoursesContextType | undefined
>(undefined);

const CompletedCoursesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [completedCourses, setCompletedCourses] = useState<CompletedCourse[]>(
    []
  );

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
      {children}
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
