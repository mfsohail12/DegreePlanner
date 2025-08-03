export const parsePrereqs = (prereqs: string): CourseCode[][] => {
  if (!prereqs) return [];

  const and = prereqs.split(" AND ").map((s) => s.replace(/(\(|\))/g, ""));

  const requirements = [];
  for (let exp of and) {
    const or = exp.split(" OR ");
    requirements.push(or);
  }

  return requirements;
};
