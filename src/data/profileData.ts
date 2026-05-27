// dữ liệu profile

export const profile = {
    name: 'Lê Đăng Khoa',
    role: 'Frontend Developer',
    tagline: 'Sinh Viên CNTT đam mê xây dựng giao diện web đẹp và trải nghiệp người dùng tốt.',
    location: 'Quy Nhơn, Bình Đinh cũ',
    email: 'khoaledang301@gmail.com',
    github:  'https://github.com/Leo-Victor',
    linkedin: 'https://www.linkedin.com/in/leo-victor-319043391/',
    avatar: 'LV',
};

export const aboutMe = {
    description: `Mình là sinh viên năm 3 ngành Công nghệ Thông tin tại Đại học ABC.
  Mình đam mê lập trình Frontend và luôn cố gắng học hỏi những công nghệ mới nhất.
  Hiện tại mình đang tập trung vào React, TypeScript và đang tìm kiếm cơ hội thực tập
  để áp dụng những kiến thức đã học vào thực tế.`,
  highlights: [
    '🎯 Mục tiêu: Trở thành Frontend Developer chuyên nghiệp',
    '📚 Hiện tại học: React, TypeScript, NextJS',
    '🌱 Đang tìm: Vị trí thực tập Frontend',
    '⚡ Sở thích: Code, đọc sách, chơi game',
  ],
};

export interface Skill{
    name: string;
    level: number;
    category: 'frontend' | 'language' | 'tool';
}

export const skills: Skill[] = [
    {name: 'HTML/CSS', level: 70, category: 'frontend'},
    {name: 'JavaScript', level: 60, category: 'language'},
    {name: 'TypeScript', level: 50, category: 'language'},
    {name: 'React', level: 50, category: 'frontend'},
    { name: 'Git/GitHub', level: 75, category: 'tool' },
    { name: 'Vite', level: 60, category: 'tool' },
];

export interface Experience {
  id: number;
  title: string;
  company: string;
  time: string;
  description: string;
  tags: string[];
}

export const expreriences: Experience[] = [
    {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'Công ty ABC',
    time: '06/2024 - 08/2024',
    description:
      'Tham gia phát triển giao diện web cho hệ thống quản lý nội bộ. Làm việc với React và TypeScript, tích hợp REST API.',
    tags: ['React', 'TypeScript', 'REST API'],
  },
  {
    id: 2,
    title: 'Dự án môn học - Web App',
    company: 'Đại học ABC',
    time: '01/2024 - 05/2024',
    description:
      'Xây dựng ứng dụng web quản lý sinh viên sử dụng React + Node.js. Đảm nhận phần Frontend và thiết kế UI/UX.',
    tags: ['React', 'Node.js', 'MySQL'],
  },
]

export interface Education {
  id: number;
  school: string;
  major: string;
  time: string;
  gpa?: string;
  description: string;
}

export const educations: Education[] = [
  {
    id: 1,
    school: 'FPT Polytechnic College',
    major: 'Công nghệ Thông tin',
    time: '2024 - 2026',
    gpa: '3.2/4.0',
    description:
      'Chuyên ngành Kỹ thuật Phần mềm. Các môn học nổi bật: Lập trình Web, Cơ sở dữ liệu, Cấu trúc dữ liệu, Phát triển ứng dụng di động.',
  },
];