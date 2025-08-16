"use client";
import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import CourseNode from "./CourseNode";
import SkeletonCourseNode from "./SkeletonCourseNode";
import { useCompletedCourses } from "@/context/CompletedCoursesContext";
import { useProgramProgress } from "@/context/ProgramProgressContext";

const RequirementGroupCourses = ({
  requirementGroup,
  showProgress,
}: {
  requirementGroup: RequirementGroup;
  showProgress: boolean;
}) => {
  const [requirementCourses, setRequirementCourses] = useState<CourseCode[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [completedCredits, setCompletedCredits] = useState<number>(0);
  const [showAll, setShowAll] = useState<boolean>(false);
  const { completedCourses } = useCompletedCourses();
  const { programProgress, setProgramProgress, isAllocatingGroups } =
    useProgramProgress();

  const fetchRequirementGroupCourses = async (
    requirementGroup: RequirementGroup,
    showAllCourses: boolean
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
          .rpc("get_dynamic_group_courses", {
            min_course_level: requirementGroup.min_course_level,
            max_course_level: requirementGroup.max_course_level,
            requirement_group_id: requirementGroup.id,
            department_filters: requirementGroup.department_filter,
          })
          .limit(showAllCourses ? 11000 : 9);

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

  const updateProgramProgress = () => {
    setProgramProgress((prev) => {
      const filtered = prev.filter((gp) => gp.id !== requirementGroup.id);

      const groupProgress = {
        id: requirementGroup.id,
        progress:
          completedCredits >
          requirementGroup.min_credits + requirementGroup.overlap_credits
            ? requirementGroup.min_credits + requirementGroup.overlap_credits
            : completedCredits,
      };

      return [...filtered, groupProgress];
    });
  };

  useEffect(() => {
    fetchRequirementGroupCourses(requirementGroup, showAll);
  }, []);

  useEffect(() => {
    fetchRequirementGroupCourses(requirementGroup, showAll);
  }, [showAll]);

  useEffect(() => {
    if (requirementCourses.length == 0) return;
    if (completedCourses.length == 0) {
      setCompletedCredits(0);
      return;
    }

    const fetchCompletedCredits = async (groupId: number) => {
      setCompletedCredits(
        completedCourses
          .filter(
            (completedCourse) => completedCourse.allocatedGroupId === groupId
          )
          .map((completedCourse) => completedCourse.credits)
          .reduce((acc, item) => acc + item, 0)
      );
    };

    fetchCompletedCredits(requirementGroup.id);
  }, [requirementCourses, completedCourses]);

  useEffect(() => {
    if (!isAllocatingGroups) updateProgramProgress();
  }, [completedCredits, isAllocatingGroups]);

  return loading ? (
    <div className={`w-full pt-5 pb-10 px-7 border-[0.5px] rounded-xl`}>
      {requirementGroup.group_name && (
        <h2 className="text-xl font-semibold">{requirementGroup.group_name}</h2>
      )}
      {requirementGroup.min_credits !== 0 && showProgress && (
        <ProgressBar
          completedCredits={0}
          totalCredits={requirementGroup.min_credits}
        />
      )}
      {requirementGroup.group_description && (
        <p className="sm:text-base text-sm font-semibold">
          {requirementGroup.group_description}
        </p>
      )}
      {requirementGroup.note && (
        <p className="text-xs mt-1">Note: {requirementGroup.note}</p>
      )}
      <div className="flex flex-wrap gap-x-14 gap-y-10 justify-center items-center mt-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <SkeletonCourseNode key={index} />
        ))}
      </div>
    </div>
  ) : (
    <div className="w-full pt-5 pb-15 sm:px-7 px-5 border-[0.5px] rounded-xl relative">
      {requirementGroup.group_name && (
        <h2 className="text-xl font-semibold">{requirementGroup.group_name}</h2>
      )}
      {requirementGroup.min_credits !== 0 && showProgress && (
        <ProgressBar
          completedCredits={completedCredits}
          totalCredits={requirementGroup.min_credits}
        />
      )}
      {requirementGroup.group_description && (
        <p className="sm:text-base text-sm font-semibold">
          {requirementGroup.group_description}
        </p>
      )}
      {requirementGroup.note && (
        <p className="text-xs mt-1">Note: {requirementGroup.note}</p>
      )}
      <div className="flex flex-wrap gap-x-14 gap-y-10 justify-center items-center mt-6">
        {requirementCourses?.map((requirementCourse: CourseCode) => (
          <CourseNode
            key={requirementCourse}
            courseCode={requirementCourse}
            allocatedGroupId={requirementGroup.id}
          />
        ))}
      </div>
      {requirementGroup.is_dynamic && (
        <div className="flex w-full justify-center items-center mt-8 absolute left-0 bottom-5">
          <button
            className="underline text-sm hover:text-slate-500"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show less" : "Show all"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RequirementGroupCourses;
