"use client";
import ProgramProvider from "@/context/ProgramContext";
import CompletedCoursesProvider from "@/context/CompletedCoursesContext";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProgramProvider>
      <CompletedCoursesProvider>{children}</CompletedCoursesProvider>
    </ProgramProvider>
  );
};

export default Providers;
