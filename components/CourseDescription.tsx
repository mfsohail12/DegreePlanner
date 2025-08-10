"use client";
import DOMPurify from "dompurify";

const CourseDescription = ({ course }: { course: Course }) => {
  const clean = DOMPurify.sanitize(course.course_description);

  return (
    <div>
      {course.course_description && (
        <>
          <h2 className="mt-8 mb-4 text-2xl font-semibold">
            Course Description
          </h2>
          <p dangerouslySetInnerHTML={{ __html: clean }}></p>
        </>
      )}
    </div>
  );
};

export default CourseDescription;
