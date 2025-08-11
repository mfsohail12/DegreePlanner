"use client";
import RequirementGroupCourses from "./RequirementGroupCourses";
import ProgressBar from "./ProgressBar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useCompletedCourses } from "@/context/CompletedCoursesContext";

const getTotalCredits = (requiredGroups: RequirementGroup[]) => {
  return (
    requiredGroups
      .map((group: RequirementGroup) => group.min_credits)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0) ?? 0
  );
};

const RequiredGroups = ({
  requiredGroups,
  programId,
}: {
  requiredGroups: RequirementGroup[];
  programId: string;
}) => {
  const [completedCredits, setCompletedCredits] = useState<number>(0);
  const { completedCourses } = useCompletedCourses();

  useEffect(() => {
    const fetchCompletedCredits = async (programId: string) => {
      try {
        const { data, error } = await supabase.rpc(
          "get_all_required_program_courses",
          { program_id: parseInt(programId) }
        );

        if (error) throw error;

        if (!data) {
          setCompletedCredits(0);
          return;
        }

        const completedRequiredCourses = data.filter((course: Course) =>
          completedCourses.includes(course.course_code)
        );

        setCompletedCredits(
          completedRequiredCourses.reduce(
            (acc: number, curr: Course) => acc + curr.credits,
            0
          )
        );
      } catch (error) {
        console.log(
          "There was an error fetching completed credits for required groups: ",
          error
        );
        throw error;
      }
    };

    fetchCompletedCredits(programId);
  }, [completedCourses]);

  return (
    <div>
      <span className="flex sm:flex-row flex-col gap-4 sm:items-center mb-4">
        <h1 className="sm:text-3xl text-2xl font-semibold">Required Courses</h1>
        <span className="flex-1">
          <ProgressBar
            completedCredits={completedCredits}
            totalCredits={getTotalCredits(requiredGroups)}
          />
        </span>
      </span>
      <div className="flex flex-wrap gap-y-7 justify-between items-center">
        {requiredGroups && requiredGroups.length > 1 ? (
          requiredGroups.map((group) => (
            <RequirementGroupCourses
              key={group.id}
              requirementGroup={group}
              showProgress={true}
            />
          ))
        ) : (
          <RequirementGroupCourses
            requirementGroup={requiredGroups[0]}
            showProgress={false}
          />
        )}
      </div>
    </div>
  );
};

export default RequiredGroups;
