import ProgramInformation from "@/components/ProgramInformation";
import ProgramRequirements from "@/components/ProgramRequirements";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

const Program = async ({
  params,
}: {
  params: Promise<{ programId: string }>;
}) => {
  const { programId } = await params;

  const fetchProgramInfo = async (programId: string) => {
    if (isNaN(Number(programId))) notFound();

    try {
      const { data, error } = await supabase
        .from("program")
        .select()
        .eq("id", programId);

      if (error) throw error;

      if (data.length == 0) notFound();

      return data[0];
    } catch (error) {
      console.log("There was an error fetching program information: ", error);
      throw error;
    }
  };

  const programInfo = await fetchProgramInfo(programId);

  return (
    <div className="w-screen pt-10 pb-20 px-10">
      <ProgramInformation programId={programId} programInfo={programInfo} />
      <div className="border-b-4 my-10 relative -left-10 w-screen"></div>
      <ProgramRequirements programId={programId} />
    </div>
  );
};

export default Program;
