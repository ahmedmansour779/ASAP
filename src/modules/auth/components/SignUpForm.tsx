"use client";

import BaseLink from "@/components/BaseLink";
import FormError from "@/components/FormError";
import EmailInput from "@/components/form/EmailInput";
import PasswordInput from "@/components/form/PasswordInput";
import PhoneNumberInput from "@/components/form/PhoneNumberInput";
import TextInput from "@/components/form/TextInput";
import { signUp } from "@/modules/profile/services/profile-services";
import { Error } from "@/shared/types";
import { URLS } from "@/shared/urls";
import { trans } from "@mongez/localization";
import { Form, FormSubmitOptions } from "@mongez/react-form";
import { useState } from "react";
import toast from "react-hot-toast";

export const labelWithStar = (labelKey: string) => {
  return (
    <>
      {trans(labelKey)}
      <span className="text-red-600">*</span>
    </>
  );
};

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Error | Error[] | null>(null);

  const handleSubmit = async ({ values }: FormSubmitOptions) => {
    const name = `${values.firstName} ${values.lastName}`;
    setIsLoading(true);
    setErrors(null);

    signUp({ ...values, name })
      .then(() => {
        toast.success(trans("signedUpSuccess"));
        location.reload();
      })
      .catch((responseError) => {
        setErrors(
          responseError.response?.data?.error?.messages ||
            responseError.response?.data?.error?.error ||
            responseError.message
        );

        toast.error(trans("couldNotSignUp"));
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <Form
        onSubmit={handleSubmit}
        className="w-full py-8 md:mx-auto md:w-9/12 lg:w-9/12">
        <div className="space-y-2">
          <div className="text-3xl font-semibold capitalize md:text-4xl">
            {trans("signUp")}
          </div>
        </div>
        <div className="with-inputs mt-10 space-y-4">
          <div className="flex items-center justify-between gap-5">
            <TextInput
              disabled={isLoading}
              required
              placeholder={trans("firstName")}
              label={labelWithStar("firstName")}
              name="firstName"
            />
            <TextInput
              disabled={isLoading}
              required
              placeholder={trans("lastName")}
              label={labelWithStar("lastName")}
              name="lastName"
            />
          </div>
          <EmailInput
            disabled={isLoading}
            required
            placeholder={trans("email")}
            label={labelWithStar("email")}
            name="email"
          />
          <PhoneNumberInput
            label={labelWithStar("phoneNumber")}
            disabled={isLoading}
          />
          <PasswordInput
            disabled={isLoading}
            required
            placeholder={trans("password")}
            label={labelWithStar("password")}
            minLength={8}
            name="password"
          />
          <PasswordInput
            disabled={isLoading}
            required
            placeholder={trans("confirmPassword")}
            label={labelWithStar("confirmPassword")}
            name="confirmPassword"
            minLength={8}
            match="password"
          />
          <FormError errors={errors} />
          <div>
            <button
              disabled={isLoading}
              className="mt-4 w-full rounded-xl bg-primary-main px-6 py-4 font-semibold text-primary-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-primary-main">
              {isLoading ? trans("signingUp") : trans("signUp")}
            </button>
          </div>
        </div>
        <p className="pt-5 text-center">
          {trans("alreadyHaveAnAccount")}{" "}
          <BaseLink
            href={URLS.signIn.href}
            title={trans("logIn")}
            className="text-red-600 underline">
            {trans("logIn")}
          </BaseLink>
        </p>
      </Form>
    </div>
  );
}
