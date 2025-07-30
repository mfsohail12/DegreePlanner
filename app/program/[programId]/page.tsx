import ProgramInformation from "@/components/ProgramInformation";

const Program = async ({
  params,
}: {
  params: Promise<{ programId: string }>;
}) => {
  const { programId } = await params;

  return (
    <div className="w-screen pt-10 px-10">
      <ProgramInformation programId={programId} />
      <div className="border-b-1 mt-10"></div>
    </div>
  );
};

export default Program;
