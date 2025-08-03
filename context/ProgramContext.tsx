"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type ProgramContextType = {
  program: Program | null;
  setProgram: React.Dispatch<React.SetStateAction<Program | null>>;
};

const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

const ProgramProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [program, setProgram] = useState<Program | null>(null);

  useEffect(() => {
    const storedProgram = localStorage.getItem("storedProgram");
    if (storedProgram) {
      setProgram(JSON.parse(storedProgram));
    }
  }, []);

  useEffect(() => {
    if (program !== null) {
      localStorage.setItem("storedProgram", JSON.stringify(program));
    } else {
      localStorage.removeItem("storedProgram");
    }
  }, [program]);

  return (
    <ProgramContext.Provider value={{ program, setProgram }}>
      {children}
    </ProgramContext.Provider>
  );
};

export const useProgram = () => {
  const ctx = useContext(ProgramContext);
  if (!ctx) throw new Error("useProgram must be used within a ProgramProvider");
  return ctx;
};

export default ProgramProvider;
