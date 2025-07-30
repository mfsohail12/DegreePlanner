import React from "react";

const BscRequirements = () => {
  return (
    <>
      <h2 className="mt-8 mb-4 text-2xl font-semibold">
        Degree Requirements — B.Sc.
      </h2>
      <span className="flex flex-col gap-3">
        <p className="font-semibold italic">
          This program is offered as part of a Bachelor of Science (B.Sc.)
          degree.
        </p>
        <p>
          To graduate, students must satisfy both their program requirements and
          their degree requirements.
        </p>
        <ul className="list-disc">
          <li className="relative left-6">
            The program requirements (i.e., the specific courses that make up
            this program) are listed under the Course Tab (above).
          </li>
          <li className="relative left-6">
            The degree requirements—including the mandatory Foundation program,
            appropriate degree structure, and any additional components—are
            outlined on the Degree Requirements page.
          </li>
        </ul>
        <p>
          Students are responsible for ensuring that this program fits within
          the overall structure of their degree and that all degree requirements
          are met. Consult the Degree Planning Guide on the SOUSA website for
          additional guidance.
        </p>
      </span>
    </>
  );
};

export default BscRequirements;
