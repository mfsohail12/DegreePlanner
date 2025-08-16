declare interface Program {
  id: number;
  program_name: string;
  program_description: string;
  inserted_at: string;
  degree: string;
  faculty: string;
  total_credits: number;
  link: string;
}

declare interface RequirementGroup {
  id: number;
  program_id: number;
  category_type: string;
  group_name: string;
  min_credits: number;
  overlap_credits: number;
  min_course_level?: number;
  max_course_level?: number;
  is_dynamic: boolean;
  department_filter?: string[];
  note?: string;
  group_description?: string;
}

declare interface Course {
  course_code: string;
  inserted_at: string;
  course_name: string;
  course_description: string;
  faculty_name: string;
  credits: number;
  prerequisites?: string;
  prerequisites_logical?: PrerequisitesLogical;
  restrictions?: string;
}

declare interface Logical {
  operator: string;
  groups: Logical[] | string[];
}

type PrerequisitesLogical = Logical | string | null;

type CourseCode = string;
