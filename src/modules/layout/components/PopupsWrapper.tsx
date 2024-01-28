"use client";

import LogoutPopup from "@/modules/auth/components/LogoutPopup";
import AdvancedSearchPopup from "@/modules/home/components/AdvancedSearchPopup";
import PropertiesFilterPopup from "@/modules/properties/components/popups/PropertiesFilterPopup";
import SharePopup from "@/modules/properties/components/popups/SharePopup";
import PropertyDetailsImagesPopup from "@/modules/properties/components/propertyDetails/PropertyDetailsImagesPopup";

export default function PopupsWrapper() {
  return (
    <>
      <LogoutPopup />
      <AdvancedSearchPopup />
      <PropertyDetailsImagesPopup />
      <PropertiesFilterPopup />
      <SharePopup />
    </>
  );
}
