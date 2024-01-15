import { Student } from '@/models/student';
import { instance } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { STUDENTS_CONFIG } from '.';

export function useFindAllStudents() {
  return useQuery<Array<Student>, AxiosError>({
    queryKey: [STUDENTS_CONFIG.queryKey],
    queryFn: function findAll() {
      return instance.get(STUDENTS_CONFIG.baseUri).then((res) => res.data);
    },
  });
}
