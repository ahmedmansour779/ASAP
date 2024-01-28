import { Error } from "@/shared/types";
import React from "react";

type FormErrorProps = {
  errors: Error | Error[] | null;
};

type ErrorItemProps = {
  error: Error;
};

function ErrorItem({ error }: ErrorItemProps) {
  return (
    <div className="text-sm font-medium capitalize text-primary-danger">
      {typeof error === "string" ? error : error.error}
    </div>
  );
}

export default function FormError({ errors }: FormErrorProps) {
  if (!errors) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {Array.isArray(errors) ? (
        errors.map((error, index) => <ErrorItem key={index} error={error} />)
      ) : (
        <ErrorItem error={errors} />
      )}
    </div>
  );
}
