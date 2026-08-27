import type { Metadata } from "next";
import TreatmentProgramPage from "@/components/services/TreatmentProgramPage";
import content from "@/content/de-addiction-treatment.json";
import image from "@/assets/images/carousel/carousel-2-conversation.jpg";

export const metadata: Metadata = {
  title: "De-Addiction Treatment",
  description: "Structured, compassionate de-addiction treatment combining medical detox, counseling, and family support.",
};

export default function DeAddictionTreatmentPage() {
  return <TreatmentProgramPage content={content} image={image} />;
}
