import BestSellingSection from "./_components/BestSellingSection";
import LandingPageSection from "./_components/LandingPageSection";

export default function Home() {
  return (
    <div className={`flex flex-col gap-8 items-center justify-center`}>
      <LandingPageSection />
      <BestSellingSection />
    </div>
  );
}
