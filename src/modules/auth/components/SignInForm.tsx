"use client";

import BaseLink from "@/components/BaseLink";
import FormError from "@/components/FormError";
import EmailInput from "@/components/form/EmailInput";
import PasswordInput from "@/components/form/PasswordInput";
import { signIn } from "@/modules/profile/services/profile-services";
import { Error } from "@/shared/types";
import { URLS } from "@/shared/urls";
import { trans } from "@mongez/localization";
import { Form, FormSubmitOptions } from "@mongez/react-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { labelWithStar } from "./SignUpForm";

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Error | Error[] | null>(null);

  const handleSubmit = async ({ values, form }: FormSubmitOptions) => {
    setIsLoading(true);
    setErrors(null);

    signIn(values)
      .then(() => {
        toast.success(trans("loggedInSuccess"));
        form.reset();
        location.reload();
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.error?.error || error.message;

        setErrors(errorMessage);
        toast.error(`${trans("couldNotSignIn")} ${errorMessage}`);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 md:h-[100vh]">
      <Form
        onSubmit={handleSubmit}
        className="w-full md:mx-auto md:w-9/12 lg:w-9/12">
        <div className="space-y-2">
          <div className="text-3xl font-semibold capitalize md:text-4xl">
            {trans("logIn")}
          </div>
        </div>
        <div className="with-inputs mt-10 space-y-4">
          <EmailInput
            disabled={isLoading}
            required
            placeholder={trans("email")}
            label={labelWithStar("email")}
            name="email"
          />
          <div>
            <PasswordInput
              disabled={isLoading}
              type="password"
              required
              placeholder={trans("password")}
              label={labelWithStar("password")}
              name="password"
            />
            <BaseLink
              href={URLS.forgetPassword.href}
              title={trans("forgetPassword")}
              className="mt-2 block underline">
              {trans("forgetPassword")}
            </BaseLink>
          </div>
          <FormError errors={errors} />
          <div>
            <button
              disabled={isLoading}
              className="mt-4 w-full rounded-xl bg-primary-main px-6 py-4 font-semibold text-primary-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-primary-main">
              {isLoading ? trans("loggingIn") : trans("login")}
            </button>
          </div>
        </div>
        <p className="pt-5 text-center">
          {trans("doNotHaveAccount")}{" "}
          <BaseLink
            href={URLS.signUp.href}
            title={trans("signUp")}
            className="text-red-600 underline">
            {trans("signUp")}
          </BaseLink>
        </p>
      </Form>
    </div>
  );
}
