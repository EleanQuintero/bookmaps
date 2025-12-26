import { stepsCardsData } from "@/lib/data/stepsCards.json";
import { IllustrationCard } from "../ui/illustrationCard";

export const HowItWorks = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid sm:grid-cols-3 gap-6 pt-8 text-left">
        {stepsCardsData.map((card) => (
          <IllustrationCard
            key={card.cardTitle}
            cardTitle={card.cardTitle}
            iconName={card.cardIcon}
            cardDescription={card.cardDescription}
          />
        ))}
      </div>
    </div>
  );
};
