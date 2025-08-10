"use client";

import { useProgram } from "@/context/ProgramContext";
import { useRouter } from "next/navigation";
import { CgArrowLongLeft } from "react-icons/cg";

const BackToProgramButton = () => {
  const { program } = useProgram();
  const router = useRouter();

  return (
    <button
      className="flex items-center gap-4 mb-5 hover:text-slate-500"
      onClick={() =>
        program ? router.push(`/program/${program.id}`) : router.push("/")
      }
    >
      <CgArrowLongLeft className="text-4xl" />
      <p className="">Back to {program ? "program" : "home"}</p>
    </button>
  );
};

export default BackToProgramButton;
