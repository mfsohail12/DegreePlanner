"use client";
import ProgramSearchBar from "@/components/ProgramSearchBar";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-screen flex flex-1 justify-center items-center">
      <div className="relative p-3 flex flex-col justify-center items-center">
        <motion.h1
          initial={{
            x: 0,
            y: 40,
          }}
          animate={{
            x: 0,
            y: 0,
          }}
          transition={{
            type: "spring",
            duration: 3,
          }}
          className="font-extrabold sm:text-5xl text-3xl text-shadow-lg z-10"
        >
          <span className="text-mcgill-red">Plan</span> Your Degree
        </motion.h1>

        <ProgramSearchBar />
        <motion.div
          initial={{
            x: 0,
            y: 40,
            rotate: "-15deg",
          }}
          animate={{
            x: 0,
            y: 0,
            rotate: ["-15deg", "5deg", "0deg"],
          }}
          transition={{
            type: "keyframes",
            duration: 1,
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
      <button
        className="font-semibold underline fixed left-47/100 bottom-10 hover:opacity-90 hover:cursor-pointer"
        onClick={() => router.push("/about?show_disclaimer=true")}
      >
        Disclaimer
      </button>
    </div>
  );
}
