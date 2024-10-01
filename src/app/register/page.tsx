'use client';

import type { NextPage } from 'next';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from '@/components/button/button';
import ErrorMessage from '@/components/error-message/error-message';
import { useRouter } from 'next/navigation';
import { UserState } from '@/types/types';

// Схема валидации для yup
const schema = yup.object().shape({
  name: yup.string().required("Имя обязательно"),
  email: yup.string().email("Некорректный email").required("Email обязателен"),
  password: yup.string().min(6, "Минимум 6 символов").required("Пароль обязателен"),
});

const Register: NextPage = () => {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<UserState>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: UserState) => {
    sessionStorage.setItem('userData', JSON.stringify(data)); // cохраняем данные
    router.push('/profile'); // перенаправляем на профиль
  };

  return (
    <div className="flex flex-col justify-center items-center mt-[25%]">
      <h2 className="text-2xl font-semibold">Регистрация</h2>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-start gap-3'
      >
        <div className='flex flex-col'>
          <label>Имя</label>
          <input {...register("name")} className='w-72 p-1 rounded-md' />
          <ErrorMessage message={errors.name?.message} />
        </div>
        <div className='flex flex-col'>
          <label>Email</label>
          <input {...register("email")} className='w-72 p-1 rounded-md'/>
          <ErrorMessage message={errors.email?.message} />
        </div>
        <div className='flex flex-col'>
          <label>Пароль</label>
          <input type="password" {...register("password")} className='w-72 p-1 rounded-md'/>
          <ErrorMessage message={errors.password?.message} />
        </div>
        <Button disabled={!isValid} large={true}>
          Отправить
        </Button>
      </form>
    </div>
  );
};

export default Register;
