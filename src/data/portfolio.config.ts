export const PROJECT_LANGUAGE_FILTERS = [
  'Tất cả',
  'TypeScript',
  'JavaScript',
  'Java',
] as const;

export type ProjectLanguageFilter = (typeof PROJECT_LANGUAGE_FILTERS)[number];

export const ALL_PROJECTS_FILTER: ProjectLanguageFilter = 'Tất cả';

export interface ContactFormValues {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export const CONTACT_FORM_INITIAL_VALUES: ContactFormValues = {
  fullName: '',
  email: '',
  subject: '',
  message: '',
};
