import { supabase } from "./supabase";

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

export const getAllocationGroupId = async (
  programId: number | null,
  courseCode: CourseCode
) => {
  if (!programId) return null;

  try {
    const { data, error } = await supabase.rpc("get_group_allocation", {
      prog_id: programId,
      course: courseCode,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.log(
      `There was an error allocating ${courseCode} to a group: ${error}`
    );
  }
};
