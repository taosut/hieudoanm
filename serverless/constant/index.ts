export const NODE_ENV: string = process.env.NODE_ENV || 'development';
export const api: string =
  NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://hieudoan.vercel.app/api';
