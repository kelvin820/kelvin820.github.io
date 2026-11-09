import { profile } from './profile';

// The printable CV condenses the same evidence used by the website timeline.
export const resumes = {
  en: {
    ...profile,
    lang: 'en',
    summary: profile.resumeSummary,
    skills: profile.resumeSkills,
    labels: { profile: 'Profile', experience: 'Experience', education: 'Education', skills: 'Expertise' },
    experience: profile.experience.map(job => ({ ...job, bullets: job.resumeBullets })),
  },
  zh: {
    ...profile,
    lang: 'zh-Hant',
    role: profile.roleZh,
    location: profile.locationZh,
    summary: profile.resumeSummaryZh,
    skills: profile.resumeSkillsZh,
    labels: { profile: '個人簡介', experience: '工作經歷', education: '學歷', skills: '專業領域' },
    experience: profile.experience.map(job => ({
      ...job,
      title: job.titleZh,
      start: job.startZh,
      end: job.endZh,
      bullets: job.resumeBulletsZh,
    })),
    education: { ...profile.education, school: profile.education.schoolZh, degree: profile.education.degreeZh },
  },
};
