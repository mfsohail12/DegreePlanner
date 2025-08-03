"use client";
import { supabase } from "@/lib/supabase";
import BscRequirements from "./BscRequirements";
import ProgressBar from "./ProgressBar";
import { useEffect, useState } from "react";
import { useProgram } from "@/context/ProgramContext";
import Spinner from "./Spinner";

const ProgramInformation = ({ programId }: { programId: string }) => {
  const [programInfo, setProgramInfo] = useState<Program | null>(null);
  const { setProgram } = useProgram();

  useEffect(() => {
    const fetchProgramInfo = async (programId: string) => {
      try {
        const { data, error } = await supabase
          .from("program")
          .select()
          .eq("id", programId);

        if (error) throw error;

        if (data.length == 0) {
          setProgramInfo(null);
          setProgram(null);
          return;
        }

        setProgramInfo(data[0]);
        setProgram(data[0]); // setting program context
      } catch (error) {
        console.log("There was an error fetching program information: ", error);
        throw error;
      }
    };

    fetchProgramInfo(programId);
  }, []);

  return programInfo ? (
    <div className="w-4/5">
      <h1 className="font-bold text-3xl mb-3">
        {programInfo.program_name} ({programInfo.total_credits} Credits)
      </h1>
      <span className="flex gap-2 mb-5">
        <div className="rounded-full px-2 py-1 bg-light-grey border-[0.5px] text-xs">
          <span className="font-semibold">Degree:</span> {programInfo.degree}
        </div>
        <div className="rounded-full px-2 py-1 bg-light-grey border-[0.5px] text-xs">
          <span className="font-semibold">Offered By:</span>{" "}
          {programInfo.faculty}
        </div>
      </span>
      <ProgressBar
        completedCredits={2}
        totalCredits={programInfo.total_credits}
      />
      <h2 className="mt-8 mb-4 text-2xl font-semibold">Program Description</h2>
      <p>{programInfo.program_description}</p>
      <BscRequirements />
    </div>
  ) : (
    <div className="flex justify-center items-center">
      <Spinner className="text-4xl" />
    </div>
  );
};

export default ProgramInformation;
