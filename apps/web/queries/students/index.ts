export * from './useCreateStudent';
export * from './useUpdateStudent';
export * from './useFindAllStudents';

export const STUDENTS_CONFIG = {
  queryKey: 'students',
  baseUri: '/students',
};
