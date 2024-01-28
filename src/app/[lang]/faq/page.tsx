import BackButton from "@/components/BackButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import NoData from "@/components/NoData";
import { withLocalizationMetadata } from "@/components/localization/WithLocalization";
import FAQItem from "@/modules/faq/components/FAQItem";
import { getQuestions } from "@/modules/faq/services/faq-service";
import { trans } from "@mongez/localization";
import Link from "next/link";

export const generateMetadata = withLocalizationMetadata(() => {
  return {
    title: trans("faq"),
  };
});

export const revalidate = 360 * 12;

export default async function FaqPage() {
  const questions = await getQuestions();

  if (!questions) {
    return <NoData message={trans("couldNotGetData")} backToHome />;
  }

  return (
    <section className="relative">
      <>
        <>
          <div className="container absolute left-1/2 top-10 z-10 w-full -translate-x-1/2">
            <BackButton />
          </div>
          <Breadcrumbs
            navLinks={[{ title: trans("faq") }]}
            title={trans("faq")}
          />
        </>
      </>
      {questions.length >= 1 ? (
        <div className="container mb-[156px] mt-[54px] flex flex-col gap-[26px]">
          {questions.map((item, index) => {
            return (
              <div key={index}>
                <FAQItem title={item.title} description={item.content} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex h-[400px] flex-col items-center justify-center gap-8">
          <p className="text-4xl font-medium uppercase text-primary-main">
            There are no questions yet to show you
          </p>
          <p className="text-primary-text">
            if you have a question you want to ask, you can send it to us{" "}
            <Link href="/contact-us" className="text-primary-main underline">
              here
            </Link>
          </p>
        </div>
      )}
    </section>
  );
}
