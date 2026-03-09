import { Dispatch, SetStateAction } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import CourseNode from "./CourseNode";
import { RiResetLeftLine } from "react-icons/ri";

const CompletedCoursesDrawer = ({
  setShowCompletedCoursesModal,
  completedCourses,
  setCompletedCourses,
}: {
  setShowCompletedCoursesModal: Dispatch<SetStateAction<boolean>>;
  completedCourses: CompletedCourse[];
  setCompletedCourses: Dispatch<SetStateAction<CompletedCourse[]>>;
}) => {
  return (
    <>
      <button
        className="w-screen bg-slate-200 hover:bg-light-grey border-b-1 h-8 sticky top-0 left-0 flex justify-center items-center"
        onClick={() => setShowCompletedCoursesModal(false)}
      >
        <IoMdArrowDropdown className="text-3xl" />
      </button>
      <div className="pb-8 px-8">
        <span className="flex flex-col sm:flex-row justify-between items-center mt-6 mb-8 gap-4">
          <h1 className="sm:text-3xl text-2xl font-semibold">
            Completed Courses
          </h1>
          {completedCourses.length > 0 && (
            <button
              className="flex gap-2 items-center font-semibold rounded-full px-4 py-2 bg-foreground hover:opacity-90 text-white "
              onClick={() => setCompletedCourses([])}
            >
              <RiResetLeftLine className="text-sm" />
              <p className="text-xs">
                {window.innerWidth >= 640 ? "Clear Completed Courses" : "Clear"}
              </p>
            </button>
          )}
        </span>
        <div className="flex flex-wrap gap-7 justify-center items-center">
          {completedCourses.length > 0 ? (
            completedCourses.map((completedCourse) => (
              <CourseNode
                key={completedCourse.courseCode}
                courseCode={completedCourse.courseCode}
                allocatedGroupId={completedCourse.allocatedGroupId}
                showCourseAsList={false}
              />
            ))
          ) : (
            <p className="flex justify-center items-cente sm:text-base text-sm">
              You have not completed any courses yet
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default CompletedCoursesDrawer;
