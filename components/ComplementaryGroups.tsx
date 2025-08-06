import RequirementGroupCourses from "./RequirementGroupCourses";

const ComplementaryGroups = ({
  complementaryGroups,
}: {
  complementaryGroups: RequirementGroup[];
}) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Complementary Courses</h1>

      <div className="flex flex-wrap gap-y-7 justify-between">
        {complementaryGroups &&
          complementaryGroups.length > 0 &&
          complementaryGroups.map((group) => (
            <RequirementGroupCourses key={group.id} requirementGroup={group} />
          ))}
      </div>
    </div>
  );
};

export default ComplementaryGroups;
