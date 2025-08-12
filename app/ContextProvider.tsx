"use client";
import ProgramProvider from "@/context/ProgramContext";
import CompletedCoursesProvider from "@/context/CompletedCoursesContext";
import ProgramProgressProvider from "@/context/ProgramProgressContext";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProgramProvider>
      <ProgramProgressProvider>
        <CompletedCoursesProvider>{children}</CompletedCoursesProvider>
      </ProgramProgressProvider>
    </ProgramProvider>
  );
};

export default Providers;
