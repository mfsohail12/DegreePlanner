export const convertCourseCode = (courseCode: string, toLower: boolean) => {
  if (toLower) return courseCode.replace(" ", "-").toLowerCase();
  return courseCode.replace("-", " ").toUpperCase();
};

export const getCoursesFromString = (string: string) => {
  const courseRegex = /[A-Z]{4} ?[0-9]{3}([A-Z0-9]{2})?/gi;

  const matches = string.matchAll(courseRegex);

  return Array.from(matches).map((match: any) => match[0]);
};
