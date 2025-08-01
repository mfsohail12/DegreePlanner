"use client";
import { convertCourseCode } from "@/lib/course";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

const CourseNode = ({ courseCode }: { courseCode: string }) => {
  const [buttonColor, setButtonColor] = useState<string>("bg-light-grey");
  const router = useRouter();

  return (
    <button
      className={`w-42 border-[0.5px] rounded-full hover:shadow-lg ${buttonColor} py-2 flex items-center px-5 gap-2 justify-center`}
      onClick={() =>
        router.push(`/course/${convertCourseCode(courseCode, true)}`)
      }
    >
      <p className="font-semibold">{courseCode}</p>
      <FaRegCheckCircle
        onClick={(e) => {
          e.stopPropagation();
          setButtonColor(
            buttonColor === "bg-light-grey" ? "bg-green" : "bg-light-grey"
          );
        }}
      />
    </button>
  );
};

export default CourseNode;
