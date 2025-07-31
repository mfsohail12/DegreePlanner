import { supabase } from "@/lib/supabase";
import React from "react";
import ProgressBar from "./ProgressBar";
import CourseNode from "./CourseNode";

const RequirementGroupCourses = async ({
  requirementGroup,
}: {
  requirementGroup: RequirementGroup;
}) => {
  const fetchGroupCourses = async (requirementGroup: RequirementGroup) => {
    try {
      if (!requirementGroup.is_dynamic) {
        const { data, error } = await supabase
          .from("requirement_group_course")
          .select("course_code")
          .eq("group_id", requirementGroup.id);

        if (error) throw error;

        if (!data) return [];

        return data.map((item) => item.course_code);
      } else {
        const { data, error } = await supabase
          .rpc("get_courses", {
            min_course_level: requirementGroup.min_course_level,
            max_course_level: requirementGroup.max_course_level,
            department_filters: requirementGroup.department_filter,
          })
          .limit(10);

        if (error) throw error;
        if (!data) return [];

        return data.map((course: Course) => course.course_code);
      }
    } catch (error) {
      console.log(
        `There was an error fetching the groups (${requirementGroup.group_name}) courses: `,
        error
      );
      throw error;
    }
  };

  const requirementCourses = await fetchGroupCourses(requirementGroup);

  return (
    <div
      className={`${
        requirementCourses && requirementCourses?.length <= 4
          ? "w-49/100"
          : "w-full"
      } pt-5 pb-10 px-7 border-[0.5px] rounded-xl`}
    >
      {requirementGroup.group_name && (
        <h2 className="text-2xl font-semibold">
          {requirementGroup.group_name}
        </h2>
      )}
      {requirementGroup.min_credits !== 0 &&
        requirementGroup.category_type !== "required" && (
          <ProgressBar
            completedCredits={2}
            totalCredits={requirementGroup.min_credits}
          />
        )}
      {requirementGroup.note && (
        <p className="text-xs mt-1">Note: {requirementGroup.note}</p>
      )}
      <div className="flex flex-wrap gap-x-14 gap-y-10 justify-center items-center mt-6">
        {requirementCourses?.map((requirementCourse: string) => (
          <CourseNode key={requirementCourse} courseCode={requirementCourse} />
        ))}
      </div>
    </div>
  );
};

export default RequirementGroupCourses;
