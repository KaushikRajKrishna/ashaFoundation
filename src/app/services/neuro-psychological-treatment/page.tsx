import type { Metadata } from "next";
import TreatmentProgramPage from "@/components/services/TreatmentProgramPage";
import content from "@/content/neuro-psychological-treatment.json";
import image from "@/assets/images/gallery/gallery-6-breathing-space.jpg";

export const metadata: Metadata = {
  title: "Neuro-Psychological Treatment",
  description: "Neuropsychological assessment and cognitive rehabilitation therapy for brain-based behavioral and learning challenges.",
};

export default function NeuroPsychologicalTreatmentPage() {
  return <TreatmentProgramPage content={content} image={image} />;
}
