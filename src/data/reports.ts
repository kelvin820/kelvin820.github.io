// Add owner-supplied published report URLs here. Home and /reports/ share this list.
// Do not create fictional reports or link unpublished placeholders to external sites.
export interface IndustryReport {
  title: string;
  description: string;
  category: string;
  url: string;
  date?: string;
  zhTitle?: string;
  zhDescription?: string;
}
export const reports: IndustryReport[] = [];
