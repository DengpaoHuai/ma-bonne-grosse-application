"use client";

import { loginUserAction } from "@/actions/auth.actions";
import { LoginSchema } from "@/schemas/login.schema";
import useSalons from "@/store/useSalons";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>();
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const { salons, setSalons } = useSalons();

  const onSubmit = async (formData: LoginSchema) => {
    console.log(formData);

    const res = await loginUserAction({
      username: formData.username,
      password: formData.password,
    });

    // Result keys.
    const { data, validationErrors, serverError } = res;
    console.log(data, validationErrors, serverError);
    data?.data.salons && setSalons(data?.data.salons);
    localStorage.setItem("session", JSON.stringify(data));
    router.push("/dashboard");
  };

  return (
    <div className="flex align-items-center justify-content-center">
      <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div className="text-center mb-5">
          <img
            src="/demo/images/blocks/logos/hyper.svg"
            alt="hyper"
            height={50}
            className="mb-3"
          />
          <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
          <span className="text-600 font-medium line-height-3">
            Don't have an account?
          </span>
          <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
            Create today!
          </a>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username" className="block text-900 font-medium mb-2">
            Username
          </label>
          <InputText
            id="username"
            type="text"
            placeholder="Username"
            className="w-full mb-3"
            {...register("username")}
          />
          {errors.username && (
            <div className="text-red-500 text-xs">
              {errors.username.message}
            </div>
          )}

          <label htmlFor="password" className="block text-900 font-medium mb-2">
            Password
          </label>
          <InputText
            id="password"
            type="password"
            placeholder="Password"
            className="w-full mb-3"
            {...register("password")}
          />
          {errors.password && (
            <div className="text-red-500 text-xs">
              {errors.password.message}
            </div>
          )}

          <div className="flex align-items-center justify-content-between mb-6">
            <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
              Forgot your password?
            </a>
          </div>

          <Button label="Sign In" icon="pi pi-user" className="w-full" />
        </form>
      </div>
    </div>
  );
}
