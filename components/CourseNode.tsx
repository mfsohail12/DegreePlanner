"use client";
import { useCompletedCourses } from "@/context/CompletedCoursesContext";
import { convertCourseCode } from "@/lib/course";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegCheckCircle, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const CourseNode = ({ courseCode }: { courseCode: CourseCode }) => {
  const { completedCourses, setCompletedCourses } = useCompletedCourses();
  const [prereqsLogical, setPrereqsLogical] = useState<
    PrerequisitesLogical | undefined
  >(undefined);
  const [isSuggested, setIsSuggested] = useState<boolean>(false);
  const [courseTitle, setCourseTitle] = useState<string>(courseCode);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPrereqsLogical = async (courseCode: CourseCode) => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("course")
          .select("prerequisites_logical")
          .eq("course_code", courseCode);

        if (error) throw error;

        if (!data) return;
        else {
          setPrereqsLogical(data[0].prerequisites_logical);
        }
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    const fetchCourseTitle = async (courseCode: string) => {
      try {
        const { data, error } = await supabase
          .from("course")
          .select("course_name")
          .eq("course_code", courseCode);

        if (error) throw error;

        if (data) setCourseTitle(data[0].course_name);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    fetchPrereqsLogical(courseCode);
    fetchCourseTitle(courseCode);
  }, []);

  useEffect(() => {
    if (loading || prereqsLogical === undefined) return;

    const prereqsMet = (logical: PrerequisitesLogical) => {
      if (logical === null) return true;
      if (typeof logical === "string") {
        if (completedCourses.includes(logical)) return true;
        return false;
      }

      if (logical.operator === "AND") {
        for (const item of logical.groups) {
          if (!prereqsMet(item)) return false;
        }

        return true;
      }
      if (logical.operator === "OR") {
        for (const item of logical.groups) {
          if (prereqsMet(item)) return true;
        }

        return false;
      }

      throw new Error("invalid operator: " + logical.operator);
    };

    setIsSuggested(prereqsMet(prereqsLogical));
  }, [prereqsLogical, completedCourses]);

  const isCompleted = completedCourses.includes(courseCode);

  const handleCheckClick = (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation();

    if (isCompleted) {
      setCompletedCourses([
        ...completedCourses.filter((code) => code !== courseCode),
      ]);
    } else {
      setCompletedCourses([...completedCourses, courseCode]);
    }
  };

  return (
    <motion.button
      initial={{
        x: -10,
      }}
      animate={{
        x: 0,
        transition: {
          type: "spring",
          stiffness: 200,
          delay: Math.random() * 0.2,
          duration: 0.2,
        },
      }}
      title={courseTitle}
      className={`sm:w-44 w-38 sm:text-base text-xs border-[0.5px] rounded-full hover:shadow-lg ${
        isCompleted
          ? "bg-green border-green-600"
          : isSuggested
          ? "bg-yellow border-yellow-600"
          : "bg-light-grey"
      } py-2 flex items-center px-5 gap-2 justify-center`}
      onClick={() =>
        router.push(`/course/${convertCourseCode(courseCode, true)}`)
      }
    >
      <p
        className={`font-semibold ${
          isCompleted ? "text-green-600" : isSuggested ? "text-yellow-600" : ""
        }`}
      >
        {courseCode}
      </p>
      {isCompleted ? (
        <FaCheckCircle
          className="text-green-600 text-md hover:opacity-80"
          onClick={handleCheckClick}
        />
      ) : (
        <FaRegCheckCircle
          className={`text-md hover:opacity-80 ${
            isSuggested && "text-yellow-600"
          }`}
          onClick={handleCheckClick}
        />
      )}
    </motion.button>
  );
};

export default CourseNode;
