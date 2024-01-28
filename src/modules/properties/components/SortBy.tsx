import SelectInput from "@/components/form/SelectInput";
import { trans } from "@mongez/localization";
import { usePathname, useRouter } from "next/navigation";
import { SortOption } from "../utils/types";

type SortByProps = {
  sortOptions: SortOption[];
};

export default function SortBy({ sortOptions }: SortByProps) {
  const pathname = usePathname();
  const router = useRouter();

  const sortHandler = (value: string) => {
    router.push(`${pathname}?sortBy=${value}`);
  };

  return (
    <div>
      <SelectInput
        label={trans("sortBy")}
        placeholder={trans("sortBy")}
        className="flex-row items-center gap-4"
        buttonStyles="rounded-xl border py-2 px-6 -mt-2"
        action={sortHandler}
        options={sortOptions}
      />
    </div>
  );
}
