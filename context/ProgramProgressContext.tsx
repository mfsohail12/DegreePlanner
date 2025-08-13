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
