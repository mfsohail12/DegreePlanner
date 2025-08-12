"use client";
import { useCompletedCourses } from "@/context/CompletedCoursesContext";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";

const MarkCompleteButton = ({ courseCode }: { courseCode: CourseCode }) => {
  const [completed, setCompleted] = useState<boolean>(false);
  const { completedCourses, setCompletedCourses } = useCompletedCourses();

  useEffect(() => {
    if (completedCourses.includes(courseCode)) {
      setCompleted(true);
    }
  }, []);

  useEffect(() => {
    if (completedCourses.includes(courseCode)) {
      setCompleted(true);
    }
  }, [completedCourses]);

  const handleClick = () => {
    if (completed) {
      setCompletedCourses([
        ...completedCourses.filter((c) => c !== courseCode),
      ]);
      setCompleted(false);
    } else {
      setCompletedCourses([...completedCourses, courseCode]);
      setCompleted(true);
    }
  };

  return (
    <button
      className="flex items-center gap-2 rounded-full border px-3 font-semibold py-1 bg-white"
      onClick={handleClick}
    >
      {completed ? (
        <FaCheckCircle className="text-md" />
      ) : (
        <FaRegCheckCircle className="text-md" />
      )}
      <p>{completed ? "Completed" : "Mark as Complete"}</p>
    </button>
  );
};

export default MarkCompleteButton;
