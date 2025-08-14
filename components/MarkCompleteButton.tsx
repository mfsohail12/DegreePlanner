"use client";
import { useCompletedCourses } from "@/context/CompletedCoursesContext";
import { useProgram } from "@/context/ProgramContext";
import { getAllocationGroupId } from "@/lib/course";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";

const MarkCompleteButton = ({ course }: { course: Course }) => {
  const [completed, setCompleted] = useState<boolean>(false);
  const { completedCourses, setCompletedCourses } = useCompletedCourses();
  const { program } = useProgram();

  useEffect(() => {
    if (
      completedCourses
        .map((completedCourse) => completedCourse.courseCode)
        .includes(course.course_code)
    ) {
      setCompleted(true);
    }
  }, []);

  useEffect(() => {
    if (
      completedCourses
        .map((completedCourse) => completedCourse.courseCode)
        .includes(course.course_code)
    ) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }, [completedCourses]);

  const handleClick = async () => {
    if (completed) {
      setCompletedCourses([
        ...completedCourses.filter(
          (completedCourse) => completedCourse.courseCode !== course.course_code
        ),
      ]);
      setCompleted(false);
    } else {
      setCompletedCourses([
        ...completedCourses,
        {
          courseCode: course.course_code,
          allocatedGroupId: await getAllocationGroupId(
            program?.id ?? null,
            course.course_code
          ),
          credits: course.credits,
        },
      ]);
      setCompleted(true);
    }
  };

  return (
    <button
      className={`flex items-center gap-2 rounded-full border px-3 font-semibold py-1 bg-white ${
        completed && "text-green-600 border-green-600"
      }`}
      onClick={handleClick}
    >
      {completed ? (
        <FaCheckCircle className="text-md text-green-600" />
      ) : (
        <FaRegCheckCircle className="text-md" />
      )}
      <p>{completed ? "Completed" : "Mark as Complete"}</p>
    </button>
  );
};

export default MarkCompleteButton;
