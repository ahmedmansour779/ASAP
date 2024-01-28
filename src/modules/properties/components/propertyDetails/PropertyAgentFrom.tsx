"use client";

import EmailInput from "@/components/form/EmailInput";
import PhoneNumberInput from "@/components/form/PhoneNumberInput";
import SubmitButton from "@/components/form/SubmitButton";
import TextInput from "@/components/form/TextInput";
import TextareaInput from "@/components/form/TextareaInput";
import {
  DocumentIcon,
  Mail2Icon,
  PersonIcon,
  Phone2Icon,
  SuccessIcon,
} from "@/shared/icons/icons";
import { trans } from "@mongez/localization";
import { Form, FormSubmitOptions } from "@mongez/react-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { postInquiries } from "../../services/property-inquiries";

type PropertyAgentFromProps = {
  propertyId: number;
};

export default function PropertyAgentFrom({
  propertyId,
}: PropertyAgentFromProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = ({ values, form }: FormSubmitOptions) => {
    setIsLoading(true);

    postInquiries(propertyId, values)
      .then(() => {
        setIsSent(true);
        toast.success(trans("messageSent"));
        form.reset();
      })
      .catch(() => {
        toast.error(trans("couldNotSendMessage"));
      })
      .finally(() => setIsLoading(false));
  };

  return isSent ? (
    <div className="flex h-[426px] items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <SuccessIcon className="h-16 w-16 text-green-500" />
        <h1 className="mt-6 text-center text-2xl font-bold capitalize">
          {trans("messageSent")}
        </h1>
        <p className="mt-2 text-center text-primary-text/80">
          {trans("successMessage")}
        </p>
      </div>
    </div>
  ) : (
    <div className="border-primary-whiteLight flex flex-col justify-center overflow-hidden rounded-lg border border-solid bg-[#FBFBFB]">
      <div className="w-full bg-primary-main bg-opacity-[0.02] p-[26px] font-medium">
        <p className="opacity-100">{trans("sendAMessage")}</p>
      </div>
      <Form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-4 pb-[28px] pl-[29px] pr-[38px] pt-[50px]">
        <TextInput
          icon={<PersonIcon className="text-[#303030]" />}
          placeholder={trans("name")}
          required
          name="name"
          className="rounded-lg border border-solid border-secondary-main bg-primary-border px-6 py-4"
        />
        <EmailInput
          placeholder={trans("eMail")}
          icon={<Mail2Icon />}
          name="email"
          className="rounded-lg border border-solid border-secondary-main bg-primary-border px-6 py-4"
        />
        <PhoneNumberInput
          icon={<Phone2Icon />}
          placeholder={trans("phoneNumber")}
          className="rounded-lg border border-solid border-secondary-main bg-primary-border px-6 py-4"
        />
        <TextareaInput
          icon={<DocumentIcon />}
          required
          name="message"
          placeholder={trans("writeAMessage")}
          className="rounded-lg border border-solid border-secondary-main bg-primary-border px-6 py-4"
        />
        <SubmitButton
          disabled={isLoading}
          label={isLoading ? trans("sending") : trans("send")}
        />
      </Form>
    </div>
  );
}
