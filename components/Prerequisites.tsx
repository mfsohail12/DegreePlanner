"use client";
import { getAllocationGroupId } from "@/lib/course";
import CourseNode from "./CourseNode";
import { useProgram } from "@/context/ProgramContext";
import { useEffect, useState } from "react";
import SkeletonCourseNode from "./SkeletonCourseNode";

const Prerequisites = ({ prerequisites }: { prerequisites: CourseCode[] }) => {
  const [resolvedPrerequisites, setResolvedPrerequisites] = useState<
    { courseCode: CourseCode; allocatedGroupId: number | null }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { program } = useProgram();

  console.log(resolvedPrerequisites);

  useEffect(() => {
    const fetchAllocationGroupIds = async () => {
      try {
        setLoading(true);
        const resolvedData = await Promise.all(
          prerequisites.map(async (prereq) => {
            const allocatedGroupId = await getAllocationGroupId(
              program?.id ?? null,
              prereq
            );
            return { courseCode: prereq, allocatedGroupId };
          })
        );
        setResolvedPrerequisites(resolvedData);
      } catch (error) {
        console.log(
          "There was an error getting allocationGroupIds for prerequisites: ",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    if (program) {
      fetchAllocationGroupIds();
    }
  }, [program]);

  return loading ? (
    <div className="flex gap-6 flex-wrap">
      <SkeletonCourseNode />
      <SkeletonCourseNode />
      <SkeletonCourseNode />
    </div>
  ) : (
    <div className="flex gap-6 flex-wrap">
      {resolvedPrerequisites.map(({ courseCode, allocatedGroupId }) => (
        <CourseNode
          key={courseCode}
          courseCode={courseCode}
          allocatedGroupId={allocatedGroupId}
        />
      ))}
    </div>
  );
};

export default Prerequisites;
