"use client";
import ProgramSearchBar from "@/components/ProgramSearchBar";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-screen flex flex-1 justify-center items-center">
      <div className="relative p-3 flex flex-col justify-center items-center">
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
          className="font-extrabold sm:text-5xl text-3xl text-shadow-lg z-10"
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
          className="sm:absolute relative -bottom-5 sm:-left-35 sm:-bottom-22 flex justify-center"
        >
          <Image
            src="/mcgill-martlet.png"
            width={0}
            height={0}
            alt="McGill Martlet"
            priority={true}
            sizes="115rem"
            className="sm:w-[100%] w-[75%] h-auto"
          />
        </motion.div>
      </div>
    </div>
  );
}
