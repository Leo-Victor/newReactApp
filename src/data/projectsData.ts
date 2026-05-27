export interface CustomProject {
  id: number;
  name: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  thumbnail: string;
}

export const customProjects: CustomProject[] = [
  {
    id: 1,
    name: 'Portfolio cá nhân',
    description:
      'Website portfolio giới thiệu thông tin cá nhân, kỹ năng, kinh nghiệm và các dự án nổi bật.',
    tags: ['React', 'TypeScript', 'Vite'],
    githubUrl: 'https://github.com/Leo-Victor/leo-victor.github.io',
    demoUrl: 'https://leo-victor.github.io',
    thumbnail: '/projects/portfolio.svg',
  },
  {
    id: 2,
    name: 'Máy tính React',
    description:
      'Demo trò chơi luyện tập ghi nhớ các lá bài.',
    tags: ['React', 'TypeScript', 'CSS'],
    githubUrl: 'https://github.com/Leo-Victor/MemoryCard',
    demoUrl: 'http://localhost:5174/MemoryCard/game',
    thumbnail: '/projects/memory-card.svg',
  },
  {
    id: 3,
    name: 'Máy tính React',
    description:
      'Demo hệ thông của máy tính để tính toán các phép tính cơ bản.',
    tags: ['React', 'TypeScript', 'CSS'],
    githubUrl: 'https://github.com/Leo-Victor/Calculator',
    demoUrl: 'https://leo-victor.github.io/Calculator/',
    thumbnail: '/projects/calculator.svg',
  },
];
