import  Link from "next/link";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';


const Login = () => {

  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        alert('invalid login');
      }
    } catch (err) {
      alert('invalid login');
    }
  };

  return (
    <section className="px-5 md:px-0">
      <div className=" w-full max-w-[570px] mx-auto rounded-lg shadow-lg md:p-10">
        <div>
          <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
            Hello! <span className="text-[#0067FF]">Welcome</span> Back 🎉
          </h3>
          <form className="py-4 md:py-0" onSubmit={handleSubmit(submitHandler)}>
            <div className="mb-5">
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                {...register('email', {
                  required: 'Please enter email',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: 'Please enter valid email',
                  },
                })}
              />
            </div>

            <div className="mb-5">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                required
                {...register('password', {
                  required: 'Please enter password',
                  minLength: { value: 1, message: 'password is more than 5 chars' },
                })}
              />
            </div>

            <div className="mt-7">
              <button
                type="submit"
                className="w-full bg-[#0067FF] text-white py-3 px-4 rounded-lg text-[18px] leading-[30px]"
              > Login
              </button>
            </div>

            <p className="mt-5 text-textColor text-center">
              Don&apos;t have an account?
              <Link href="/signup" className="text-[#0067FF] font-medium ml-1">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
