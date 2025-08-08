"use client";
import { supabase } from "@/lib/supabase";
import BscRequirements from "./BscRequirements";
import ProgressBar from "./ProgressBar";
import { useEffect, useState } from "react";
import { useProgram } from "@/context/ProgramContext";
import { useCompletedCourses } from "@/context/CompletedCoursesContext";
import { motion } from "framer-motion";

const ProgramInformation = ({
  programId,
  programInfo,
}: {
  programId: string;
  programInfo: Program;
}) => {
  const [completedCredits, setCompletedCredits] = useState<number>(0);
  const { setProgram } = useProgram();
  const { completedCourses } = useCompletedCourses();

  const fetchCompletedCredits = async (programId: string) => {
    try {
      const { data, error } = await supabase.rpc("get_all_program_courses", {
        program_id: programId,
      });

      if (error) throw error;

      if (data.length == 0) {
        console.log("came here");
        setCompletedCredits(0);
        return;
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

  useEffect(() => {
    setProgram(programInfo);

    if (completedCourses.length > 0) fetchCompletedCredits(programId);
  }, []);

  useEffect(() => {
    if (completedCourses.length == 0) return;

    fetchCompletedCredits(programId);
  }, [completedCourses]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="w-full"
    >
      <motion.h1
        variants={itemVariants}
        className="font-bold sm:text-3xl text-xl mb-3"
      >
        {programInfo.program_name} ({programInfo.total_credits} Credits)
      </motion.h1>
      <motion.span
        variants={itemVariants}
        className="flex sm:flex-row flex-col gap-2 mb-5"
      >
        <div className="rounded-full px-2 py-1 bg-light-grey border-[0.5px] text-xs size-fit">
          <span className="font-semibold">Degree:</span> {programInfo.degree}
        </div>
        <div className="rounded-full px-2 py-1 bg-light-grey border-[0.5px] text-xs size-fit">
          <span className="font-semibold">Offered By:</span>{" "}
          {programInfo.faculty}
        </div>
      </motion.span>
      <motion.div variants={itemVariants}>
        <ProgressBar
          completedCredits={completedCredits}
          totalCredits={programInfo.total_credits}
        />
      </motion.div>
      <motion.h2
        variants={itemVariants}
        className="mt-8 mb-4 sm:text-2xl text-lg font-semibold"
      >
        Program Description
      </motion.h2>
      <motion.p variants={itemVariants} className="sm:text-base text-sm">
        {programInfo.program_description}
      </motion.p>
      <motion.div variants={itemVariants}>
        <BscRequirements />
      </motion.div>
    </motion.div>
  );
};

export default ProgramInformation;
