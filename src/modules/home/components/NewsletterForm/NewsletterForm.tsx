"use client";

import { addToNewsletter } from "@/modules/layout/services/newsletter-services";
import { NormalArrowIcon } from "@/shared/icons/icons";
import { trans } from "@mongez/localization";
import { Form, FormSubmitOptions } from "@mongez/react-form";
import { useState } from "react";
import toast from "react-hot-toast";
import NewsLetterInput from "./NewsLetterInput";

export default function NewsletterForm() {
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit({ values, form }: FormSubmitOptions) {
    setIsLoading(true);
    addToNewsletter(values.email)
      .then(() => {
        toast.success(trans("sent"));
        form.reset();
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.messages[0]?.error ||
          error.response?.data?.message ||
          error.message;
        toast.error(`${trans("somethingWentWrong")} ${errorMessage}`);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <Form
      onSubmit={handleSubmit}
      className="h-fit w-full max-w-[483px] space-y-4">
      <div className="relative w-full items-center">
        <NewsLetterInput
          required
          type="email"
          name="email"
          placeholder={trans("email")}
          disabled={isLoading}
        />
        <button
          disabled={isLoading}
          className="absolute top-2 rounded-full bg-primary-main p-3 disabled:cursor-not-allowed disabled:opacity-60 ltr:right-3 rtl:left-3"
          title="subscribe"
          aria-label="subscribe">
          {isLoading ? (
            <div className="aspect-square h-5 w-5 animate-spin rounded-full border-2 border-primary-white border-t-transparent"></div>
          ) : (
            <NormalArrowIcon className="text-primary-white rtl:-rotate-90" />
          )}
        </button>
      </div>
    </Form>
  );
}
