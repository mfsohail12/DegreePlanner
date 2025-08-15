"use client";
import RequirementGroupCourses from "./RequirementGroupCourses";
import ProgressBar from "./ProgressBar";
import { useEffect, useState } from "react";
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

  const fetchCompletedCredits = () => {
    const requirementGroupIds = requiredGroups.map((rg) => rg.id);
    let totalCredits = 0;

    for (const course of completedCourses) {
      if (
        course.allocatedGroupId &&
        requirementGroupIds.includes(course.allocatedGroupId)
      )
        totalCredits += course.credits;
    }

    setCompletedCredits(totalCredits);
  };

  useEffect(() => {
    if (completedCourses.length > 0) fetchCompletedCredits();
  }, []);

  useEffect(() => {
    if (completedCourses.length == 0) {
      setCompletedCredits(0);
      return;
    }

    fetchCompletedCredits();
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
