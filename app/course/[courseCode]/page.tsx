import CourseNode from "@/components/CourseNode";
import { convertCourseCode, getCoursesFromString } from "@/lib/course";
import { supabase } from "@/lib/supabase";

const fetchCourseInformation = async (courseCode: string): Promise<Course> => {
  try {
    const { data, error } = await supabase
      .from("course")
      .select()
      .eq("course_code", courseCode);

    if (error) throw error;

    if (!data) throw new Error(`The course ${courseCode} was not found`);

    return data[0];
  } catch (error) {
    console.log("There was an error fetching course information ", error);
    throw error;
  }
};

const page = async ({
  params,
}: {
  params: Promise<{ courseCode: string }>;
}) => {
  const { courseCode } = await params;
  const course = await fetchCourseInformation(
    convertCourseCode(courseCode, false)
  );

  let prerequisites = [];
  if (course.prerequisites_bool_exp) {
    prerequisites = getCoursesFromString(course.prerequisites_bool_exp);
  }

  return (
    <div className="w-4/5 pt-10 pb-20 px-10">
      <h1 className="font-bold text-3xl mb-3">{course.course_code}</h1>
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
          <div className="flex gap-6">
            {prerequisites.map((prereq) => (
              <CourseNode courseCode={prereq} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default page;
