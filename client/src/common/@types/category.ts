export interface ICategoryGet {
  planId?: string;
}

export interface ICategory {
  _id: string;
  name: string;
  plan: string | null;
  value: string;
}
