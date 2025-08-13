export const convertCourseCode = (courseCode: string, toLower: boolean) => {
  if (toLower) return courseCode.replace(" ", "-").toLowerCase();
  return courseCode.replace("-", " ").toUpperCase();
};

export const getCoursesFromLogicalPrerequisites = (
  logical: PrerequisitesLogical
) => {
  if (logical === null) return [];
  if (typeof logical === "string") return [logical];

  const groups = logical.groups;

  const prereqs: CourseCode[] = [];

  for (const group of groups) {
    prereqs.push(...getCoursesFromLogicalPrerequisites(group));
  }

  return prereqs;
};
