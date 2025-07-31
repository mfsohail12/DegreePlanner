"use client";
import { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

const CourseNode = ({ courseCode }: { courseCode: string }) => {
  const [buttonColor, setButtonColor] = useState<string>("bg-light-grey");

  return (
    <button
      className={`w-42 border-[0.5px] rounded-full ${buttonColor} py-2 flex items-center px-5 gap-2 justify-center`}
    >
      <p className="font-semibold">{courseCode}</p>
      <FaRegCheckCircle
        onClick={() =>
          setButtonColor(
            buttonColor === "bg-light-grey" ? "bg-green" : "bg-light-grey"
          )
        }
      />
    </button>
  );
};

export default CourseNode;
