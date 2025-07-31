import ProgramInformation from "@/components/ProgramInformation";
import ProgramRequirements from "@/components/ProgramRequirements";

const Program = async ({
  params,
}: {
  params: Promise<{ programId: string }>;
}) => {
  const { programId } = await params;

  return (
    <div className="w-screen pt-10 pb-20 px-10">
      <ProgramInformation programId={programId} />
      <div className="border-b-4 my-10 relative -left-10 w-screen"></div>
      <ProgramRequirements programId={programId} />
    </div>
  );
};

export default Program;
