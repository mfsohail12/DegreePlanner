import RequirementGroupCourses from "./RequirementGroupCourses";

const ComplementaryGroups = ({
  complementaryGroups,
}: {
  complementaryGroups: RequirementGroup[];
}) => {
  return (
    <div>
      <h1 className="sm:text-3xl text-2xl font-semibold mb-4">
        Complementary Courses
      </h1>

      <div className="flex flex-wrap gap-y-7 justify-between items-center">
        {complementaryGroups &&
          complementaryGroups.length > 0 &&
          complementaryGroups.map((group) => (
            <RequirementGroupCourses
              key={group.id}
              requirementGroup={group}
              showProgress={true}
            />
          ))}
      </div>
    </div>
  );
};

export default ComplementaryGroups;
