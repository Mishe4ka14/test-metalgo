'use client';

import type {NextPage} from 'next'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormValues {
  name: string;
  email: string;
  password: string;
}
// схема валидации для yup
const schema = yup.object().shape({
  name: yup.string().required("Имя обязательно"),
  email: yup.string().email("Некорректный email").required("Email обязателен"),
  password: yup.string().min(6, "Минимум 6 символов").required("Пароль обязателен"),
});

const Register: NextPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    //сохраняем данные
    sessionStorage.setItem('userData', JSON.stringify(data));
    
    console.log(data);
  };


  return (
    <div className="flex justify-center items-center mt-[25%]">
        <h2 className="text-2xl font-semibold">Регистрация</h2>
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className='flex flex-col items-start gap-10'
          >
          <div>
            <label>Имя</label>
            <input {...register("name")}/>
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div>
            <label>Email</label>
            <input {...register("email")}/>
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <label>Пароль</label>
            <input {...register("password")}/>
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button type='submit'>Отправить</button>
        </form>
    </div>
  )
}

export default Register;