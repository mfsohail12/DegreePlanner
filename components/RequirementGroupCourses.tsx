"use client";
import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import CourseNode from "./CourseNode";
import SkeletonCourseNode from "./SkeletonCourseNode";
import { useCompletedCourses } from "@/context/CompletedCoursesContext";

const RequirementGroupCourses = ({
  requirementGroup,
}: {
  requirementGroup: RequirementGroup;
}) => {
  const [requirementCourses, setRequirementCourses] = useState<CourseCode[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [completedCredits, setCompletedCredits] = useState<number>(0);
  const [courseLimit, setCourseLimit] = useState<number>(1);
  const { completedCourses } = useCompletedCourses();

  const fetchGroupCourses = async (
    requirementGroup: RequirementGroup,
    limitIncrease: number
  ) => {
    try {
      setLoading(true);
      if (!requirementGroup.is_dynamic) {
        const { data, error } = await supabase
          .from("requirement_group_course")
          .select("course_code")
          .eq("group_id", requirementGroup.id);

        if (error) throw error;

        if (!data) return setRequirementCourses([]);

        setRequirementCourses(data.map((item) => item.course_code));
      } else {
        const { data, error } = await supabase
          .rpc("get_courses", {
            min_course_level: requirementGroup.min_course_level,
            max_course_level: requirementGroup.max_course_level,
            department_filters: requirementGroup.department_filter,
          })
          .limit(9 * limitIncrease);

        if (error) throw error;
        if (!data) return setRequirementCourses([]);

        setRequirementCourses(data.map((course: Course) => course.course_code));
      }
    } catch (error) {
      console.log(
        `There was an error fetching the groups (${requirementGroup.group_name}) courses: `,
        error
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroupCourses(requirementGroup, 1);
  }, []);

  useEffect(() => {
    fetchGroupCourses(requirementGroup, courseLimit);
  }, [courseLimit]);

  useEffect(() => {
    if (requirementCourses.length == 0) return;
    if (completedCourses.length == 0) setCompletedCredits(0);

    const fetchCompletedCredits = async () => {
      const completedRequirementCourses = requirementCourses.filter((c) =>
        completedCourses.includes(c)
      );

      try {
        const { data, error } = await supabase
          .from("course")
          .select("credits")
          .in("course_code", completedRequirementCourses);

        if (error) throw error;

        const credits = data.map((item) => item.credits);

        // console.log({
        //   grouo_name: requirementGroup.group_name,
        //   completedRequirementCourses,
        //   completedCourses,
        //   requirementCourses,
        //   credits: credits.reduce((acc, curr) => (acc += curr), 0),
        // });

        setCompletedCredits(credits.reduce((acc, curr) => (acc += curr), 0));
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    fetchCompletedCredits();
  }, [requirementCourses, completedCourses]);

  return loading ? (
    <div className={`w-full pt-5 pb-10 px-7 border-[0.5px] rounded-xl`}>
      {requirementGroup.group_name && (
        <h2 className="text-2xl font-semibold">
          {requirementGroup.group_name}
        </h2>
      )}
      {requirementGroup.min_credits !== 0 &&
        requirementGroup.category_type !== "required" && (
          <ProgressBar
            completedCredits={0}
            totalCredits={requirementGroup.min_credits}
          />
        )}
      {requirementGroup.group_description && (
        <p className="font-semibold">{requirementGroup.group_description}</p>
      )}
      {requirementGroup.note && (
        <p className="text-xs mt-1">Note: {requirementGroup.note}</p>
      )}
      <div className="flex flex-wrap gap-x-14 gap-y-10 justify-center items-center mt-6">
        <SkeletonCourseNode />
        <SkeletonCourseNode />
        <SkeletonCourseNode />
        <SkeletonCourseNode />
        <SkeletonCourseNode />
        <SkeletonCourseNode />
        <SkeletonCourseNode />
        <SkeletonCourseNode />
        <SkeletonCourseNode />
        <SkeletonCourseNode />
        <SkeletonCourseNode />
      </div>
    </div>
  ) : (
    <div
      className={`${
        requirementCourses && requirementCourses?.length <= 4
          ? "w-49/100"
          : "w-full"
      } pt-5 pb-15 px-7 border-[0.5px] rounded-xl relative`}
    >
      {requirementGroup.group_name && (
        <h2 className="text-2xl font-semibold">
          {requirementGroup.group_name}
        </h2>
      )}
      {requirementGroup.min_credits !== 0 &&
        requirementGroup.category_type !== "required" && (
          <ProgressBar
            completedCredits={completedCredits}
            totalCredits={requirementGroup.min_credits}
          />
        )}
      {requirementGroup.group_description && (
        <p className="font-semibold">{requirementGroup.group_description}</p>
      )}
      {requirementGroup.note && (
        <p className="text-xs mt-1">Note: {requirementGroup.note}</p>
      )}
      <div className="flex flex-wrap gap-x-14 gap-y-10 justify-center items-center mt-6">
        {requirementCourses?.map((requirementCourse: string) => (
          <CourseNode key={requirementCourse} courseCode={requirementCourse} />
        ))}
      </div>
      {requirementGroup.is_dynamic && (
        <div className="flex w-full justify-center items-center mt-8 absolute left-0 bottom-5">
          <button
            className="underline text-sm hover:text-slate-500"
            onClick={() => setCourseLimit(courseLimit + 1)}
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
};

export default RequirementGroupCourses;
