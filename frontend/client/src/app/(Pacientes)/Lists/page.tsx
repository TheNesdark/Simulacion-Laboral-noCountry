import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const DoctorsList = dynamic(() => import("./components/DoctorsList"));
const HospitalsList = dynamic(() => import("./components/HospitalsList"));
const SpecialtiesList = dynamic(() => import("./components/SpecialtiesList"));

export default function ListsPages() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const component = useMemo(() => {
    switch (selectedCategory) {
      case "doctors":
        return <DoctorsList />;
      case "hospitals":
        return <HospitalsList />;
      case "specialties":
        return <SpecialtiesList />;
      default:
        return null;
    }
  }, [selectedCategory]);
}
