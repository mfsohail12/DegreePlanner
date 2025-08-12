"use client";
import Link from "next/link";
import { IoMdMail } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

const About = () => {
  const disclaimerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const showDisclaimer = searchParams.get("show_disclaimer") === "true";

  useEffect(() => {
    if (showDisclaimer) {
      disclaimerRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  });

  return (
    <div className="w-screen flex justify-center">
      <div className="max-w-175 px-5 flex flex-col gap-8 my-10 ">
        <motion.span
          initial={{
            x: -50,
            opacity: "80%",
          }}
          animate={{
            x: 0,
            opacity: "100%",
          }}
          transition={{
            type: "spring",
            delay: 0,
          }}
          className="flex flex-col gap-4"
        >
          <h1 className="sm:text-3xl text-2xl font-bold">
            What is DegreePlanner?
          </h1>
          <p className="text-base/8">
            DegreePlanner is a course planning tool designed to help McGill
            University students visualize and organize their academic journey.
            Whether you're just starting your degree or nearing graduation,
            DegreePlanner makes it easy to plan out future semesters, check off
            completed courses, and ensure you're on track with your program
            requirements. Built with students in mind, it simplifies academic
            planning so you can focus on what matters most—your education.
          </p>
        </motion.span>
        <motion.span
          initial={{
            x: -50,
            opacity: "80%",
          }}
          animate={{
            x: 0,
            opacity: "100%",
          }}
          transition={{
            type: "spring",
            delay: 0.05,
          }}
          className="flex flex-col gap-4"
        >
          <h1 className="sm:text-3xl text-2xl font-bold">
            How to Use DegreePlanner?
          </h1>
          <p className="text-base/8">
            Start by finding your program on the{" "}
            <Link href="/" className="underline">
              homepage
            </Link>
            . Once you've chosen a program, you’ll see a breakdown of all
            required and complementary courses. From there, you can mark courses
            as complete, track your progress in your program, and see
            information for all courses including prerequisite requirements.
            DegreePlanner helps you visualize your progress, explore course
            options, and stay informed about how your choices align with your
            degree requirements.
          </p>
        </motion.span>
        <motion.span
          initial={{
            x: -50,
            opacity: "80%",
          }}
          animate={{
            x: 0,
            opacity: "100%",
          }}
          transition={{
            type: "spring",
            delay: 0.1,
          }}
          className="flex flex-col gap-4"
        >
          <h1 ref={disclaimerRef} className="sm:text-3xl text-2xl font-bold">
            Disclaimer
          </h1>
          <p className="text-base/8">
            DegreePlanner is a student-built tool created to assist with
            academic planning—
            <strong>it is not an official McGill resource</strong>. While we
            strive to keep program information up to date, there may be
            discrepancies or changes that aren't reflected in the application.
            Always verify your course selections and degree progress with an
            academic advisor or{" "}
            <a
              href="https://coursecatalogue.mcgill.ca/en/"
              className="underline font-bold"
              target="_blank"
            >
              McGill's official course catalogue
            </a>{" "}
            to ensure accuracy.
          </p>
        </motion.span>
        <motion.span
          initial={{
            x: -50,
            opacity: "80%",
          }}
          animate={{
            x: 0,
            opacity: "100%",
          }}
          transition={{
            type: "spring",
            delay: 0.15,
          }}
          className="flex flex-col gap-4"
        >
          <h1 className="sm:text-3xl text-2xl font-bold">Contact Us</h1>
          <p className="text-base/8">
            Have questions, suggestions, or feedback? We'd love to hear from
            you. Reach out to help improve DegreePlanner and make it even more
            useful for students like you.
          </p>
        </motion.span>
        <motion.span
          initial={{
            x: -50,
            opacity: "80%",
          }}
          animate={{
            x: 0,
            opacity: "100%",
          }}
          transition={{
            type: "spring",
            delay: 0.2,
          }}
          className="flex gap-4 text-3xl items-center"
        >
          <IoMdMail />
          <a href="https://github.com/mfsohail12/DegreePlanner" target="_blank">
            <FaGithub />
          </a>
        </motion.span>
      </div>
    </div>
  );
};

export default About;
