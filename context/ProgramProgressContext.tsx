"use client";

import { createContext, useContext, useEffect, useState } from "react";

type GroupProgress = {
  id: number;
  progress: number;
};

type ProgramProgressContextType = {
  programProgress: GroupProgress[];
  setProgramProgress: React.Dispatch<React.SetStateAction<GroupProgress[]>>;
};

const ProgramProgressContext = createContext<
  ProgramProgressContextType | undefined
>(undefined);

const ProgramProgressProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [programProgress, setProgramProgress] = useState<GroupProgress[]>([]);

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

  return (
    <ProgramProgressContext.Provider
      value={{ programProgress, setProgramProgress }}
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
