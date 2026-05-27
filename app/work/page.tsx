import { WorkContainer } from "@/components/pages/work/WorkPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trabajo",
  description: "Codigo en acción - ByXruz",
};

export default function WorkPage() {
  return <WorkContainer />;
}
