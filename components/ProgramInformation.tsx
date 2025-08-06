"use client";
import { supabase } from "@/lib/supabase";
import BscRequirements from "./BscRequirements";
import ProgressBar from "./ProgressBar";
import { useEffect, useState } from "react";
import { useProgram } from "@/context/ProgramContext";
import Spinner from "./Spinner";
import { useCompletedCourses } from "@/context/CompletedCoursesContext";

const ProgramInformation = ({ programId }: { programId: string }) => {
  const [programInfo, setProgramInfo] = useState<Program | null>(null);
  const [completedCredits, setCompletedCredits] = useState<number>(0);
  const { setProgram } = useProgram();
  const { completedCourses } = useCompletedCourses();

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

  useEffect(() => {
    const fetchCompletedCredits = async (programId: string) => {
      try {
        const { data, error } = await supabase.rpc("get_all_program_courses", {
          program_id: programId,
        });

        if (error) throw error;

        if (data.length == 0) {
          setCompletedCredits(0);
          return;
        }

        for (let course of data) {
          if (course.course_code === "COMP 250") {
            console.log("found 250");
          }
        }

        const completedProgramCourses = data.filter((course: Course) =>
          completedCourses.includes(course.course_code)
        );

        setCompletedCredits(
          completedProgramCourses.reduce(
            (acc: number, curr: Course) => acc + curr.credits,
            0
          )
        );
      } catch (error) {
        console.log("There was an error fetching completed credits: ", error);
        throw error;
      }
    };

    fetchCompletedCredits(programId);
  }, [completedCourses]);

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
        completedCredits={completedCredits ?? 0}
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
