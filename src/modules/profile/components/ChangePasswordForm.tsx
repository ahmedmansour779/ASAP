"use client";

import PasswordInput from "@/components/form/PasswordInput";
import SubmitButton from "@/components/form/SubmitButton";
import { labelWithStar } from "@/modules/auth/components/SignUpForm";
import { routeEndpoint } from "@/shared/endpoint/route-endpoint";
import { trans } from "@mongez/localization";
import { Form, FormSubmitOptions } from "@mongez/react-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { userAtom } from "../atoms/user-atom";

export default function ChangePasswordForm() {
  const user = userAtom.value;

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = ({ values, form }: FormSubmitOptions) => {
    setIsLoading(true);
    routeEndpoint()
      .post(`/profile/change-password?accessToken=${user.accessToken}`, values)
      .then(() => {
        toast.success(trans("profileUpdated"));
        form.reset();
      })
      .catch((error) => {
        toast.error(
          `${trans("couldNotUpdateProfile")} ${error.response?.data?.message}`
        );
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
        <PasswordInput
          disabled={isLoading}
          required
          placeholder={trans("password")}
          label={labelWithStar("password")}
          name="currentPassword"
          minLength={8}
          className="bg-primary-main/[0.03] transition-colors focus-within:bg-primary-white"
        />
        <PasswordInput
          disabled={isLoading}
          required
          placeholder={trans("newPassword")}
          label={labelWithStar("newPassword")}
          name="password"
          minLength={8}
          className="bg-primary-main/[0.03] transition-colors focus-within:bg-primary-white"
        />
        <PasswordInput
          disabled={isLoading}
          required
          placeholder={trans("confirmPassword")}
          label={labelWithStar("confirmPassword")}
          name="confirmPassword"
          match="newPassword"
          minLength={8}
          className="bg-primary-main/[0.03] transition-colors focus-within:bg-primary-white"
        />
      </div>
      <SubmitButton
        disabled={isLoading}
        label={trans("save")}
        className="w-fit rounded-lg px-10 text-sm"
      />
    </Form>
  );
}
