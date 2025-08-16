"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useProgram } from "./ProgramContext";
import { useCompletedCourses } from "./CompletedCoursesContext";
import { getAllocationGroupId } from "@/lib/course";

type GroupProgress = {
  id: number;
  progress: number;
};

type ProgramProgressContextType = {
  programProgress: GroupProgress[];
  setProgramProgress: React.Dispatch<React.SetStateAction<GroupProgress[]>>;
  isAllocatingGroups: boolean;
};

const ProgramProgressContext = createContext<
  ProgramProgressContextType | undefined
>(undefined);

const ProgramProgressProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [programProgress, setProgramProgress] = useState<GroupProgress[]>([]);
  const [isAllocatingGroups, setIsAllocatingGroups] = useState<boolean>(false);
  const { program } = useProgram();
  const { completedCourses, setCompletedCourses } = useCompletedCourses();

  useEffect(() => {
    const storedProgramProgress = localStorage.getItem("storedProgramProgress");

    if (storedProgramProgress) {
      setProgramProgress(JSON.parse(storedProgramProgress));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "storedProgramProgress",
      JSON.stringify(programProgress)
    );
  }, [programProgress]);

  useEffect(() => {
    if (!program || completedCourses.length == 0) return;

    const allocateCompletedCoursesToGroups = async () => {
      setIsAllocatingGroups(true);
      const updatedCourses = await Promise.all(
        completedCourses.map(async (completedCourse) => ({
          ...completedCourse,
          allocatedGroupId: await getAllocationGroupId(
            program.id,
            completedCourse.courseCode
          ),
        }))
      );

      setCompletedCourses([...updatedCourses]);
      setIsAllocatingGroups(false);
    };

    allocateCompletedCoursesToGroups();
  }, [program]);

  return (
    <ProgramProgressContext.Provider
      value={{ programProgress, setProgramProgress, isAllocatingGroups }}
    >
      {children}
    </ProgramProgressContext.Provider>
  );
};

export const useProgramProgress = () => {
  const ctx = useContext(ProgramProgressContext);
  if (!ctx)
    throw new Error(
      "useProgramProgress must be used within a ProgramProgressProvider"
    );
  return ctx;
};

export default ProgramProgressProvider;
