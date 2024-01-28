"use client";

import EmailInput from "@/components/form/EmailInput";
import PhoneNumberInput from "@/components/form/PhoneNumberInput";
import SubmitButton from "@/components/form/SubmitButton";
import TextInput from "@/components/form/TextInput";
import { labelWithStar } from "@/modules/auth/components/SignUpForm";
import { routeEndpoint } from "@/shared/endpoint/route-endpoint";
import { trans } from "@mongez/localization";
import { Form, FormSubmitOptions } from "@mongez/react-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { userAtom } from "../atoms/user-atom";

export default function ProfileForm() {
  const user = userAtom.useValue();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = ({ values }: FormSubmitOptions) => {
    setIsLoading(true);
    routeEndpoint()
      .post(`/profile/me?accessToken=${user.accessToken}`, values)
      .then(() => {
        toast.success(trans("profileUpdated"));
      })
      .catch((error) => {
        toast.error(
          `${trans("couldNotUpdateProfile")} ${error.response?.data?.message}`
        );
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="space-y-2">
        <div className="text-2xl font-bold">
          <span className="text-3xl text-primary-main">{trans("hi")}, </span>
          <span className="capitalize">{user?.name}</span>
        </div>
        <div className="text-sm text-primary-text/70">{user?.email}</div>
      </div>
      <Form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
          <TextInput
            disabled={isLoading}
            required
            placeholder={trans("name")}
            label={labelWithStar("name")}
            name="name"
            defaultValue={user?.name}
            className="bg-primary-main/[0.03] transition-colors focus-within:bg-primary-white"
          />
          <EmailInput
            disabled={isLoading}
            required
            placeholder={trans("email")}
            label={labelWithStar("email")}
            name="email"
            defaultValue={user?.email}
            className="bg-primary-main/[0.03] transition-colors focus-within:bg-primary-white"
          />
          <PhoneNumberInput
            disabled={isLoading}
            label={labelWithStar("phoneNumber")}
            defaultValue={user?.phoneNumber}
            className="bg-primary-main/[0.03] transition-colors focus-within:bg-primary-white"
          />
        </div>
        <SubmitButton
          disabled={isLoading}
          label={trans("saveChanges")}
          className="w-fit rounded-lg px-10 text-sm"
        />
      </Form>
    </>
  );
}
