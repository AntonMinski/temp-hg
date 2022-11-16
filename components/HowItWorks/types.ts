export type HowItWorksData = {
  tagline: string;
  youtube_video_link: string;
  title: string;
  steps: { step_number: Step };
};

export type Step = {
  description: string;
  image: string;
  label: string;
  title: string;
  number?: number;
};
