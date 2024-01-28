"use client";

import EmailInput from "@/components/form/EmailInput";
import PhoneNumberInput from "@/components/form/PhoneNumberInput";
import SubmitButton from "@/components/form/SubmitButton";
import TextInput from "@/components/form/TextInput";
import TextareaInput from "@/components/form/TextareaInput";
import { Settings } from "@/modules/home/utils/types";
import { SuccessIcon } from "@/shared/icons/icons";
import { trans } from "@mongez/localization";
import { Form, FormSubmitOptions } from "@mongez/react-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { sendContactMessage } from "../services/contact-us-service";
import ContactInfo from "./ContactInfo";

type ContactUsFormProps = {
  settings: Settings;
};

export default function ContactUsForm({ settings }: ContactUsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = ({ values }: FormSubmitOptions) => {
    setIsLoading(true);

    sendContactMessage(values)
      .then(() => {
        setIsSent(true);
        toast.success(trans("messageSent"));
      })
      .catch(() => {
        toast.error(trans("couldNotSendMessage"));
      })
      .finally(() => setIsLoading(false));
  };

  return isSent ? (
    <div className="flex h-full items-center justify-center">
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
    <>
      <Form onSubmit={handleSubmit} className="md:max-w-[550px]">
        <div className="space-y-2">
          <div className="text-3xl font-bold capitalize md:text-4xl">
            {trans("getIn")}{" "}
            <span className="text-primary-main">{trans("touch")}</span>
          </div>
          <p className="max-w-[550px]">{settings?.general?.brief}</p>
        </div>
        <div className="mt-10 space-y-4">
          <TextInput
            disabled={isLoading}
            required
            placeholder={trans("name")}
            name="name"
          />
          <EmailInput
            disabled={isLoading}
            required
            placeholder={trans("email")}
            name="email"
          />
          <PhoneNumberInput disabled={isLoading} />
          <TextInput
            disabled={isLoading}
            required
            placeholder={trans("subject")}
            name="subject"
          />
          <TextareaInput
            disabled={isLoading}
            required
            placeholder={trans("message")}
            name="message"
          />
          <SubmitButton
            disabled={isLoading}
            label={isLoading ? trans("sending") : trans("send")}
          />
        </div>
      </Form>
      <ContactInfo settings={settings} />
    </>
  );
}
