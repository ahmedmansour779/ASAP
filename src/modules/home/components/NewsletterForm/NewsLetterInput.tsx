import { cn } from "@/lib/utils";
import {
  FormControlProps,
  emailRule,
  requiredRule,
  useFormControl,
} from "@mongez/react-form";

export default function NewsLetterInput(props: FormControlProps) {
  const { value, changeValue, error, type, disabled, otherProps } =
    useFormControl({
      ...props,
      rules: [requiredRule, emailRule],
    });

  return (
    <div className={cn("space-y-2 text-sm", otherProps.className)}>
      <input
        type={type}
        disabled={disabled}
        className={cn(
          "w-full rounded-full bg-primary-white px-6 py-5 outline-transparent",
          error && "outline-red-500"
        )}
        placeholder={otherProps.placeholder}
        value={value}
        onChange={(e) => {
          changeValue(e.target.value);
        }}
      />
      {error && (
        <div className="mt-2 block rounded-xl bg-primary-white p-4 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}
