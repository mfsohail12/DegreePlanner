"use client";
import DOMPurify from "dompurify";

const CourseDescription = ({ course }: { course: Course }) => {
  const clean = DOMPurify.sanitize(course.course_description);

  return (
    <div>
      {course.course_description && (
        <>
          <h2 className="mt-8 mb-4 sm:text-2xl text-xl font-semibold">
            Course Description
          </h2>
          <p
            dangerouslySetInnerHTML={{ __html: clean }}
            className="sm:text-base text-sm"
          ></p>
        </>
      )}
    </div>
  );
};

export default CourseDescription;
