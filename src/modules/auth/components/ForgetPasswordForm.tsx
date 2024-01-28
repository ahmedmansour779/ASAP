"use client";

import BaseLink from "@/components/BaseLink";
import FormError from "@/components/FormError";
import EmailInput from "@/components/form/EmailInput";
import PasswordInput from "@/components/form/PasswordInput";
import TextInput from "@/components/form/TextInput";
import {
  forgetPassword,
  resetPassword,
} from "@/modules/profile/services/profile-services";
import { ArrowLeftIcon } from "@/shared/icons/icons";
import { Error } from "@/shared/types";
import { URLS } from "@/shared/urls";
import { getCurrentLocaleCode, trans } from "@mongez/localization";
import { Form, FormSubmitOptions } from "@mongez/react-form";
import { GenericObject } from "@mongez/reinforcements";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { labelWithStar } from "./SignUpForm";

export default function ForgetPasswordForm() {
  const router = useRouter();
  const currentLocale = getCurrentLocaleCode();

  const emailRef = useRef<GenericObject | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Error | Error[] | null>(null);
  const [isSent, setIsSent] = useState(false);

  const handleForgetPassword = ({ values }: FormSubmitOptions) => {
    setIsLoading(true);

    forgetPassword(values)
      .then(() => {
        emailRef.current = values;
        setIsSent(true);
      })
      .catch((error) => {
        toast.error(`${trans("somethingWentWrong")} ${error.message}`);
      })
      .finally(() => setIsLoading(false));
  };

  const handleResetPassword = ({ values }: FormSubmitOptions) => {
    setIsLoading(true);

    resetPassword({ ...values, ...emailRef.current })
      .then(() => {
        setIsSent(false);
        toast.success(trans("passwordChanged"));
        router.push(`/${currentLocale}${URLS.signIn.href}`);
      })
      .catch((error) => {
        toast.error(trans("somethingWentWrong"));
        setErrors(
          error.response?.data?.messages ||
            error.response?.data?.error ||
            error.message
        );
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 md:h-[100vh]">
      {!isSent ? (
        <Form
          onSubmit={handleForgetPassword}
          className="mx-auto md:w-9/12 lg:w-9/12">
          <div className="space-y-2">
            <div className="text-3xl font-semibold capitalize md:text-4xl">
              {trans("forgetPassword")}
            </div>
            <p className="max-w-[550px]">{trans("enterYourEmail")}</p>
          </div>
          <div className="with-inputs mt-10 space-y-4">
            <EmailInput
              disabled={isLoading}
              required
              placeholder={trans("email")}
              label={labelWithStar(trans("email"))}
              name="email"
            />
            <div>
              <button
                disabled={isLoading}
                className="mt-4 w-full rounded-xl bg-primary-main px-6 py-4 font-semibold text-primary-white transition-colors hover:bg-primary-main/80 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-primary-main">
                {trans("send")}
              </button>
            </div>
          </div>
          <p className="pt-5 text-center">
            <BaseLink
              href={URLS.signIn.href}
              title={trans("backToLogin")}
              className="font-semibold text-red-600 underline">
              {trans("backToLogin")}
            </BaseLink>
          </p>
        </Form>
      ) : (
        <Form
          onSubmit={handleResetPassword}
          className="w-full md:mx-auto md:w-9/12 lg:w-9/12">
          <div className="space-y-2">
            <p className="py-5 text-center">
              <BaseLink
                href={URLS.signIn.href}
                title={trans("backToLogin")}
                className="flex items-center justify-start gap-3 font-semibold text-red-600 underline">
                <ArrowLeftIcon /> <span>{trans("backToLogin")}</span>
              </BaseLink>
            </p>
            <div className="text-3xl font-semibold capitalize md:text-4xl">
              {trans("resetPassword")}
            </div>
            <p className="max-w-[550px]">{trans("pleaseChoosePassword")}</p>
          </div>
          <div className="with-inputs mt-10 space-y-4">
            <TextInput
              required
              placeholder={trans("code")}
              label={labelWithStar("code")}
              name="code"
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
              minLength={8}
              match="password"
              name="confirmPassword"
            />
            <FormError errors={errors} />
            <div>
              <button
                disabled={isLoading}
                className="mt-4 w-full rounded-xl bg-primary-main px-6 py-4 font-semibold text-primary-white transition-colors hover:bg-primary-main/80 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-primary-main">
                {trans("saveNewPassword")}
              </button>
            </div>
          </div>
        </Form>
      )}
    </div>
  );
}
