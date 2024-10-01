'use client';

import type { NextPage } from 'next';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from '@/components/button/button';
import ErrorMessage from '@/components/error-message/error-message';
import { useRouter } from 'next/navigation';
import { UserState } from '@/types/types';

// схема валидации для yup
const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-zА-Яа-яЁё\s]+$/, "Имя может содержать только буквы и пробелы")
    .test("no-multiple-spaces", "Имя не должно содержать двойные пробелы", value => value ? !/\s{2,}/.test(value) : true)
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(30, "Имя не должно превышать 30 символов")
    .required("Имя обязательно"),

  email: yup
    .string()
    .email("Некорректный email")
    .max(30, "Email не должен превышать 30 символов")
    .matches(/^([^@]*)@([^@]*)$/, "Email должен содержать только один знак '@'")
    .required("Email обязателен"),

  password: yup
    .string()
    .min(6, "Минимум 6 символов")
    .max(30, "Пароль не должен превышать 30 символов")
    .matches(/^\S*$/, "Пароль не должен содержать пробелы")
    .required("Пароль обязателен"),
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
        className='flex flex-col justify-center gap-3 w-[40%] ml-[21%]'
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
