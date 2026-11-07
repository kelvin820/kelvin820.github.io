import type { ImageMetadata } from 'astro';
import quietHoursPreview from '../assets/quiet-hours-preview.jpg';

// Owner-supplied web projects. Keep these separate from professional reports.
export interface WebProject {
  title: string;
  zhTitle: string;
  description: string;
  zhDescription: string;
  url: string;
  preview: ImageMetadata;
  previewAlt: string;
}

export const projects: WebProject[] = [
  {
    title: 'Quiet Hours',
    zhTitle: '兩地之間 · Quiet Hours',
    description: 'A two-city time and light experience, pairing local clocks with changing illustrations, 3D scenes and an immersive view.',
    zhDescription: '以雙城時鐘、分時段插畫、3D 日照場景與沉浸模式，感受不同城市的時間與光影。',
    url: 'https://kelvin820.github.io/quiet_hours/',
    preview: quietHoursPreview,
    previewAlt: 'Quiet Hours — 巴黎與台北的插畫窗景與當地時鐘 / Illustrated city views and local clocks for Paris and Taipei',
  },
];
