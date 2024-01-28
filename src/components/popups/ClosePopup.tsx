import { BackArrowIcon } from "@/shared/icons/icons";

type ClosePopupProps = {
  onClose: () => void;
  title?: string;
};

export default function ClosePopupButton({ onClose, title }: ClosePopupProps) {
  return (
    <div className="sticky top-0 z-20 flex w-full items-center gap-6 bg-primary-white py-4">
      <button
        onClick={onClose}
        className="text-primary-main"
        title="back"
        aria-label="back button">
        <BackArrowIcon className="rtl:rotate-180" />
      </button>
      {title && (
        <div className="mx-auto text-lg font-medium md:pr-8">{title}</div>
      )}
    </div>
  );
}
