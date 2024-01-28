"use client";
import FAQItem from "./FAQItem";

type FAQItem = {
  title: string;
  description: string;
};

export default function FAQPageQuestionsSection() {
  const QuestionsData: FAQItem[] = [];

  return (
    <div className="flex flex-col gap-[26px]">
      {QuestionsData.map((item, index) => {
        return (
          <div key={index}>
            <FAQItem title={item.title} description={item.description} />
          </div>
        );
      })}
    </div>
  );
}
