"use client";
import ProgramSearchBar from "@/components/ProgramSearchBar";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-screen flex flex-1 justify-center items-center">
      <div className="relative p-3">
        <motion.h1
          initial={{
            x: 0,
            y: 20,
          }}
          animate={{
            x: 0,
            y: 0,
          }}
          transition={{
            type: "spring",
          }}
          className="font-extrabold text-5xl text-shadow-lg z-10"
        >
          <span className="text-mcgill-red">Plan</span> Your Degree
        </motion.h1>

        <ProgramSearchBar />
        <motion.div
          initial={{
            x: 0,
            y: 20,
            rotate: "-15deg",
          }}
          animate={{
            x: 0,
            y: 0,
            rotate: ["15deg", "0deg"],
          }}
          transition={{
            type: "spring",
          }}
          className="absolute -left-35 -bottom-22"
        >
          <Image
            src="/mcgill-martlet.png"
            width={300}
            height={250}
            alt="McGill Martlet"
            className=""
          />
        </motion.div>
      </div>
    </div>
  );
}
