import React from "react";

const Program = async ({
  params,
}: {
  params: Promise<{ programId: string }>;
}) => {
  const { programId } = await params;

  return <div>Program {programId}</div>;
};

export default Program;
