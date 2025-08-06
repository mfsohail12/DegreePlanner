"use client";
import { useCompletedCourses } from "@/context/CompletedCoursesContext";
import { convertCourseCode } from "@/lib/course";
import { parsePrereqs } from "@/lib/parser";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegCheckCircle, FaCheckCircle } from "react-icons/fa";

const CourseNode = ({ courseCode }: { courseCode: CourseCode }) => {
  const { completedCourses, setCompletedCourses } = useCompletedCourses();
  const [prereqBooleanExp, setPrereqBooleanExp] = useState<string>("");
  const [isSuggested, setIsSuggested] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPrereqBool = async (courseCode: CourseCode) => {
      try {
        const { data, error } = await supabase
          .from("course")
          .select("prerequisites_bool_exp")
          .eq("course_code", courseCode);

        if (error) throw error;

        if (!data) setPrereqBooleanExp("");
        else setPrereqBooleanExp(data[0].prerequisites_bool_exp);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    fetchPrereqBool(courseCode);
  }, []);

  useEffect(() => {
    const prereqsMet = (prereqs: CourseCode[][]) => {
      for (let i = 0; i < prereqs.length; i++) {
        for (let j = 0; j < prereqs[i].length; j++) {
          const course = prereqs[i][j];

          if (completedCourses.includes(course)) {
            break;
          }
          if (j == prereqs[i].length - 1) return false;
        }
      }
      return true;
    };

    const prereqs = parsePrereqs(prereqBooleanExp);

    if (prereqsMet(prereqs)) {
      setIsSuggested(true);
    } else {
      setIsSuggested(false);
    }
  }, [prereqBooleanExp, completedCourses]);

  const isCompleted = completedCourses.includes(courseCode);

  const handleCheckClick = (event: any) => {
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
    <button
      className={`w-44 border-[0.5px] rounded-full hover:shadow-lg ${
        isCompleted ? "bg-green" : isSuggested ? "bg-yellow" : "bg-light-grey"
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
    </button>
  );
};

export default CourseNode;
