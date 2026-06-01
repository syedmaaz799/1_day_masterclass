/**
 * Instructor authority (Section 6).
 * MUST be real — real founder profile, real achievements, real projects (01-project).
 * No fabricated statistics, logos, or credentials. Values below are placeholders
 * to be replaced with verified content before launch.
 */

export interface Achievement {
  id: string;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface Instructor {
  name: string;
  role: string;
  bio: string;
  photoSrc: string | null;
  achievements: readonly Achievement[];
  projects: readonly Project[];
}

export const instructor: Instructor = {
  // TODO: replace all fields below with the real founder's verified details.
  name: "", // TODO: real founder name
  role: "", // TODO: real role / title
  bio: "", // TODO: real, specific bio (no superlatives)
  photoSrc: null, // TODO: real, color-graded portrait asset
  achievements: [
    // TODO: real, verifiable achievements only. Remove this placeholder.
  ],
  projects: [
    // TODO: real projects only. Remove this placeholder.
  ],
};
