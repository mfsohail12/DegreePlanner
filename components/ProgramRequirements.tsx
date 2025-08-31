import { supabase } from "@/lib/supabase";
import RequiredGroups from "./RequiredGroups";
import ComplementaryGroups from "./ComplementaryGroups";
import { FaRegCheckCircle } from "react-icons/fa";

const ProgramRequirements = async ({ programId }: { programId: string }) => {
  const fetchProgramRequirements = async (programId: string) => {
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

  return (
    <div className="flex flex-col gap-10">
      {/* legend */}
      <div className="font-semibold text-sm flex flex-wrap gap-5 items-center">
        <div className="rounded-full bg-green text-green-600 border-green-600 py-1 px-2 border-1">
          Completed
        </div>
        <div className="rounded-full bg-yellow text-yellow-600 border-yellow-600 py-1 px-2 border-1">
          Suggested
        </div>
        <div className="rounded-full bg-light-grey py-1 px-2 border-1">
          Prerequisites Not Met
        </div>
        <div className="flex items-center gap-2">
          <FaRegCheckCircle className="text-lg" />
          <p>Mark as Complete</p>
        </div>
      </div>

      {/* Required courses */}
      {requiredGroups.length > 0 && (
        <RequiredGroups requiredGroups={requiredGroups} programId={programId} />
      )}

      {/* Complementary courses */}
      {complementaryGroups.length > 0 && (
        <ComplementaryGroups complementaryGroups={complementaryGroups} />
      )}
    </div>
  );
};

export default ProgramRequirements;
