export interface ICourseGet {
  limit?: number;
  free?: boolean;
  planId?: string;
}

export interface ICourse {
  _id: string;
  professor: string;
  imageUrl: string;
  category: string;
  title: string;
  lessons: string[];
  updatedAt: string;
  slug: string;
  free: boolean;
  plan: { _id: string; name: string };
}
