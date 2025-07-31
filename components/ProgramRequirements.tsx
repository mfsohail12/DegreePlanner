import { supabase } from "@/lib/supabase";
import ProgressBar from "./ProgressBar";
import RequirementGroupCourses from "./RequirementGroupCourses";

const ProgramRequirements = async ({ programId }: { programId: string }) => {
  const fetchProgramRequirements = async (
    programId: string
  ): Promise<RequirementGroup[] | null> => {
    try {
      const { data, error } = await supabase
        .from("requirement_group")
        .select()
        .eq("program_id", programId)
        .order("id");

      if (error) throw error;

      if (!data) return null;

      return data;
    } catch (error) {
      console.log(
        "There was an error fetching program requirement groups: ",
        error
      );
      throw error;
    }
  };

  const requirementGroups = await fetchProgramRequirements(programId);
  const requiredGroups =
    requirementGroups?.filter((group) => group.category_type === "required") ??
    [];
  const complementaryGroups =
    requirementGroups?.filter(
      (group) => group.category_type === "complementary"
    ) ?? [];

  const getTotalCredits = (requiredGroups: RequirementGroup[]) => {
    return (
      requiredGroups
        .map((group: RequirementGroup) => group.min_credits)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0) ??
      0
    );
  };

  return (
    <div className="flex flex-col gap-10">
      {/* legend */}
      <div className="font-semibold text-sm flex gap-5 items-center">
        <div className="rounded-full bg-green py-1 px-2 border-[0.5px]">
          Completed
        </div>
        <div className="rounded-full bg-yellow py-1 px-2 border-[0.5px]">
          Suggested
        </div>
        <div className="rounded-full bg-light-grey py-1 px-2 border-[0.5px]">
          Prerequisites Not Met
        </div>
      </div>

      {/* Required courses */}
      <div>
        <span className="flex gap-4 items-center mb-4">
          <h1 className="text-3xl font-semibold">Required Courses</h1>
          <span className="flex-1">
            <ProgressBar
              completedCredits={2}
              totalCredits={getTotalCredits(requiredGroups)}
            />
          </span>
        </span>
        <div className="flex flex-wrap gap-y-7 justify-between">
          {requiredGroups && requiredGroups.length > 1 ? (
            requiredGroups.map((group) => (
              <RequirementGroupCourses
                key={group.id}
                requirementGroup={group}
              />
            ))
          ) : (
            <RequirementGroupCourses
              requirementGroup={{ ...requiredGroups[0], group_name: "" }}
            />
          )}
        </div>
      </div>

      {/* Complementary courses */}
      <div>
        <span className="flex gap-4 items-center mb-4">
          <h1 className="text-3xl font-semibold">Complementary Courses</h1>
          <span className="flex-1">
            <ProgressBar
              completedCredits={3}
              totalCredits={getTotalCredits(complementaryGroups)}
            />
          </span>
        </span>
        <div className="flex flex-wrap gap-y-7 justify-between">
          {complementaryGroups &&
            complementaryGroups.length > 0 &&
            complementaryGroups.map((group) => (
              <RequirementGroupCourses
                key={group.id}
                requirementGroup={group}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramRequirements;
