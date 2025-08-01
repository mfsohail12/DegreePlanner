import { supabase } from "@/lib/supabase";
import BscRequirements from "./BscRequirements";
import ProgressBar from "./ProgressBar";

const ProgramInformation = async ({ programId }: { programId: string }) => {
  const fetchProgramInfo = async (
    programId: string
  ): Promise<Program | null> => {
    try {
      const { data, error } = await supabase
        .from("program")
        .select()
        .eq("id", programId);

      if (error) throw error;

      if (data.length == 0) return null;

      return data[0];
    } catch (error) {
      console.log("There was an error fetching program information: ", error);
      throw error;
    }
  };

  const program = await fetchProgramInfo(programId);

  return program ? (
    <div className="w-4/5">
      <h1 className="font-bold text-3xl mb-3">
        {program.program_name} ({program.total_credits} Credits)
      </h1>
      <span className="flex gap-2 mb-5">
        <div className="rounded-full px-2 py-1 bg-light-grey border-[0.5px] text-xs">
          <span className="font-semibold">Degree:</span> {program.degree}
        </div>
        <div className="rounded-full px-2 py-1 bg-light-grey border-[0.5px] text-xs">
          <span className="font-semibold">Offered By:</span> {program.faculty}
        </div>
      </span>
      <ProgressBar completedCredits={2} totalCredits={program.total_credits} />
      <h2 className="mt-8 mb-4 text-2xl font-semibold">Program Description</h2>
      <p>{program.program_description}</p>
      <BscRequirements />
    </div>
  ) : (
    <div>There was an error fetching the program information</div>
  );
};

export default ProgramInformation;
