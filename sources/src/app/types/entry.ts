export interface Entry {
  id: string;
  title: string;
  description: string;
}

export interface RecentEntry {
  slug: string;
  title: string;
  description: string;
  dateModified: string;
}
