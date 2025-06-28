"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signIn } from "next-auth/react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [loginData, setLoginData] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const router = useRouter();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const errors = [];
    if (!loginData.username) errors.push("User Name is required.");
    if (!loginData.password) errors.push("Password is required.");

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    const result = await signIn("credentials", {
      username: loginData.username,
      password: loginData.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (result?.error) {
      setFormErrors(["Invalid email or password"]);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="relative flex h-full">
      <div
        className="w-1/2 bg-no-repeat bg-cover bg-center relative"
        style={{ backgroundImage: `url('/bg-3.jpg')` }}
      ></div>
      <div
        className="w-1/2 bg-no-repeat bg-cover bg-center relative"
        style={{ backgroundImage: `url('/bg-4.jpg')` }}
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center justify-center h-full w-full min-w-[350px] mx-auto text-gray-600">
          <div className="w-full bg-white rounded-xl shadow-xl p-8 space-y-2 md:space-y-2">
            <div className="bg-purple-100 text-purple-900 border border-purple-300 rounded-lg px-6 py-4 text-sm text-center mb-6 shadow-sm">
              <h3 className="text-md font-bold mb-1">
                👉 Too lazy to sign up?
              </h3>
              <p className="text-sm">Use our test account:</p>
              <p className="mt-2 font-mono text-base font-semibold text-purple-800">
                test@gmail.com
              </p>
              <p className="text-sm mt-2 text-purple-800">
                Password hint:
                <span className="font-bold"> It's a number from 1 to 4</span> 😉
              </p>
            </div>
            <h2 className="text-4xl font-extrabold text-center text-purple-900">
              Login
            </h2>

            {formErrors.length > 0 && (
              <ul className="list-disc list-inside text-sm font-normal text-red-500 py-4 grid grid-cols-2 gap-x-2 gap-y-1">
                {formErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}

            <form
              className="space-y-2 md:space-y-4"
              onSubmit={handleLoginSubmit}
            >
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter Email..."
                  className="w-full border rounded"
                  value={loginData.username.toLowerCase()}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Password..."
                  className="w-full border rounded"
                  value={loginData.password}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mt-6 flex w-full items-center gap-2">
                <Button
                  type="submit"
                  className="w-full text-center flex justify-center items-center"
                >
                  Let's go!
                </Button>
              </div>
            </form>
            <p className="font-normal text-center py-4 text-sm text-purple-900">
              Don't have an account?{" "}
              <span
                className="underline font-bold text-sm text-purple-900 italic cursor-pointer"
                onClick={() => router.push("/auth/signup")}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
