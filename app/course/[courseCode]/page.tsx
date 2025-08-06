"use client";
import CourseNode from "@/components/CourseNode";
import { convertCourseCode, getCoursesFromString } from "@/lib/course";
import { LuExternalLink } from "react-icons/lu";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgArrowLongLeft } from "react-icons/cg";
import { useProgram } from "@/context/ProgramContext";
import Spinner from "@/components/Spinner";

const page = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [prerequisites, setPrerequisites] = useState<string[]>([]);
  const { courseCode } = useParams<{ courseCode: string }>();
  const { program } = useProgram();
  const router = useRouter();

  useEffect(() => {
    const fetchCourseInformation = async (courseCode: string) => {
      try {
        const { data, error } = await supabase
          .from("course")
          .select()
          .eq("course_code", courseCode);

        if (error) throw error;

        if (!data) throw new Error(`The course ${courseCode} was not found`);

        setCourse(data[0]);

        if (data[0].prerequisites_bool_exp) {
          setPrerequisites(
            getCoursesFromString(data[0].prerequisites_bool_exp)
          );
        }
      } catch (error) {
        console.log("There was an error fetching course information ", error);
        throw error;
      }
    };

    fetchCourseInformation(convertCourseCode(courseCode, false));
  }, []);

  if (!course) {
    return (
      <div className="flex justify-center items-center w-screen flex-1">
        <Spinner className="text-5xl" />
      </div>
    );
  }

  return (
    <div className="w-4/5 pt-10 pb-20 px-10">
      <button
        className="flex items-center gap-4 mb-5 hover:text-slate-500"
        onClick={() =>
          program ? router.push(`/program/${program.id}`) : router.push("/")
        }
      >
        <CgArrowLongLeft className="text-4xl" />
        <p className="">Back to {program ? "program" : "home"}</p>
      </button>
      <span className="flex gap-3 items-center mb-3">
        <h1 className="font-bold text-3xl">
          {course.course_code}: {course.course_name}
        </h1>
        <a
          href={`https://coursecatalogue.mcgill.ca/courses/${courseCode}/`}
          target="_blank"
        >
          <LuExternalLink className="text-3xl" />
        </a>
      </span>
      <span className="flex gap-2 mb-5">
        <div className="rounded-full px-2 py-1 bg-light-grey border-[0.5px] text-xs">
          <span className="font-semibold">Credits:</span> {course.credits}
        </div>
        <div className="rounded-full px-2 py-1 bg-light-grey border-[0.5px] text-xs">
          <span className="font-semibold">Offered By:</span>{" "}
          {course.faculty_name}
        </div>
      </span>
      <h2 className="mt-8 mb-4 text-2xl font-semibold">Course Description</h2>
      <p>{course.course_description}</p>
      {course.restrictions && (
        <p className="mt-5 text-red-700">Restrictions: {course.restrictions}</p>
      )}
      {course.prerequisites && (
        <>
          <h2 className="mt-8 mb-4 text-2xl font-semibold">Prerequisites:</h2>
          <p className="mb-5">{course.prerequisites}</p>
          <div className="flex gap-6 flex-wrap">
            {prerequisites.map((prereq) => (
              <CourseNode key={prereq} courseCode={prereq} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default page;
