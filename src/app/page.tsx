import HeroCarousel from "@/components/home/HeroCarousel";
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
      <MissionStrip />
      <OurApproach />
      <ServicesPreview />
      <StatsBand />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
