import HeroCarousel from "@/components/home/HeroCarousel";
import VisitUsBand from "@/components/home/VisitUsBand";
import MissionStrip from "@/components/home/MissionStrip";
import OurApproach from "@/components/home/OurApproach";
import ServicesPreview from "@/components/home/ServicesPreview";
import StatsBand from "@/components/home/StatsBand";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/home/CtaBanner";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <VisitUsBand />
      <MissionStrip />
      <OurApproach />
      <ServicesPreview />
      <StatsBand />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
