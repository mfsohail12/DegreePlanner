import CourseNode from "@/components/CourseNode";
import { convertCourseCode, getCoursesFromString } from "@/lib/course";
import { LuExternalLink } from "react-icons/lu";
import { supabase } from "@/lib/supabase";
import BackToProgramButton from "@/components/BackToProgramButton";
import CourseDescription from "@/components/CourseDescription";
import { notFound } from "next/navigation";

const page = async ({
  params,
}: {
  params: Promise<{ courseCode: string }>;
}) => {
  const { courseCode } = await params;

  const fetchCourseInformation = async (courseCode: CourseCode) => {
    try {
      const { data, error } = await supabase
        .from("course")
        .select()
        .eq("course_code", courseCode);

      if (error) throw error;

      if (data.length === 0) notFound();

      return data[0];
    } catch (error) {
      console.log("There was an error fetching course information ", error);
      throw error;
    }
  };

  const course: Course = await fetchCourseInformation(
    convertCourseCode(courseCode, false)
  );
  const prerequisites: CourseCode[] = course.prerequisites
    ? getCoursesFromString(course.prerequisites)
    : [];

  return (
    <div className="w-4/5 pt-10 pb-20 px-10">
      <BackToProgramButton />
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
      <CourseDescription course={course} />
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
