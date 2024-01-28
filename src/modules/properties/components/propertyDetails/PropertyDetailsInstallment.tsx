import { Dash } from "@/shared/icons/icons";
import { formatPrice } from "@/utils/formatPrice";
import { trans } from "@mongez/localization";
import { PropertyDetails } from "../../utils/types";

type PropertyDetailsInstallmentProps = {
  property: PropertyDetails;
};

type InstallmentItemProps = {
  title: string;
  content: any;
};

function InstallmentItem({ content, title }: InstallmentItemProps) {
  return (
    <div className="font-semibold capitalize">
      {title}: <span className="font-normal">{content}</span>
    </div>
  );
}

export default function PropertyDetailsInstallment({
  property,
}: PropertyDetailsInstallmentProps) {
  const { installment, currency } = property;

  if (!installment) return null;

  return (
    <div className="mt-16 flex flex-col items-start">
      <div className="flex items-center justify-center gap-2 text-xl font-semibold tracking-[0.78px] text-primary-text sm:text-2xl">
        {trans("installment")}
        <Dash />
      </div>
      <div className="mt-6 flex w-full flex-wrap gap-4 rounded-xl bg-secondary-main p-4 sm:p-6 md:gap-10 md:p-8">
        <InstallmentItem
          title={trans("price")}
          content={`${formatPrice(installment.price)} ${
            currency.code || trans("egp")
          }`}
        />
        <InstallmentItem
          title={trans("downPayment")}
          content={`${formatPrice(installment.downPayment)} ${
            currency.code || trans("egp")
          }`}
        />
        <InstallmentItem
          title={trans("paymentAmount")}
          content={`${formatPrice(installment.paymentAmount)} ${
            currency.code || trans("egp")
          }`}
        />
        <InstallmentItem
          title={trans("paymentPeriod")}
          content={`${installment.paymentPeriod} / ${trans("month")}`}
        />
        <InstallmentItem
          title={trans("numberOfPayments")}
          content={installment.numberOfPayments}
        />
        <InstallmentItem title={trans("years")} content={installment.years} />
      </div>
    </div>
  );
}
