import ClientLocalization from "@/components/localization/ClientLocalization";
import UserProvider from "@/context/UserProvider";
import { cn } from "@/lib/utils";
import Footer from "@/modules/layout/Footer";
import Header from "@/modules/layout/Header";
import PopupsWrapper from "@/modules/layout/components/PopupsWrapper";
import { userTokenName } from "@/shared/constants";
import { parse } from "@/shared/parse";
import { getStoredSettings } from "@/utils/getStoredSettings";
import { Cairo, Poppins } from "next/font/google";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import "./globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  subsets: ["latin"],
  display: "swap",
});

type RootLayoutProps = {
  children: ReactNode;
  params: any;
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const cookiesStore = cookies();

  const data = await getStoredSettings(params.lang);
  const user = parse(cookiesStore.get(userTokenName)?.value) || {};

  const storedDefaultCurrency = data?.settings?.general.defaultCurrency;
  const storedCurrencies = data?.currencies || [];
  const baseCurrency = data?.settings?.general.baseCurrency;

  return (
    <html lang={params.lang} dir={params.lang === "ar" ? "rtl" : "ltr"}>
      <body
        className={cn(
          params.lang === "en" ? poppins.className : cairo.className,
          "selection:bg-primary-main selection:text-primary-white"
        )}>
        <UserProvider
          user={user}
          baseCurrency={baseCurrency}
          currencies={storedCurrencies}
          defaultCurrency={storedDefaultCurrency}>
          <Toaster position="top-right" />
          <PopupsWrapper />
          <ClientLocalization />
          <Header settings={data?.settings} />
          <main className="min-h-[calc(100vh-128.8px)] text-primary-text lg:min-h-[calc(100vh-166.8px)]">
            {children}
          </main>
          <Footer settings={data?.settings} />
        </UserProvider>
      </body>
    </html>
  );
}
