import Modal from "@/modules/layout/components/Modal";
import { routeEndpoint } from "@/shared/endpoint/route-endpoint";
import { DangerIcon } from "@/shared/icons/icons";
import { trans } from "@mongez/localization";
import { useState } from "react";
import toast from "react-hot-toast";
import { logoutStateAtom } from "../atoms/logout-state-atom";

export default function LogoutPopup() {
  const opened = logoutStateAtom.use("opened");

  const [isLoading, setIsLoading] = useState(false);

  const handleLogOutClick = async () => {
    setIsLoading(true);

    await routeEndpoint()
      .post("/auth/logout")
      .catch((error) => {
        toast.error(
          `${trans("couldNotLogOut")} ${error.response?.data?.message}`
        );
      });

    setIsLoading(false);
    logoutStateAtom.close();
    location.reload();
  };

  return (
    <Modal opened={opened}>
      <div className="flex w-[600px] max-w-full flex-col items-center gap-8 rounded-xl bg-primary-white p-4 text-center md:p-10">
        <DangerIcon />
        <div className="space-y-2">
          <div className="text-2xl font-medium">{trans("logOut")}</div>
          <div className="opacity-80">{trans("logOutMessage")}</div>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          <button
            onClick={handleLogOutClick}
            disabled={isLoading}
            className="w-[400px] max-w-full rounded-xl bg-primary-main px-6 py-4 text-primary-white transition-colors hover:bg-primary-main/80 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-primary-main">
            {trans("logOut")}
          </button>
          <button
            disabled={isLoading}
            onClick={logoutStateAtom.close}
            className="w-[400px] max-w-full rounded-xl border border-primary-main bg-primary-white px-6 py-4 text-primary-main  hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60">
            {trans("close")}
          </button>
        </div>
      </div>
    </Modal>
  );
}
