import React from "react";
import { useTranslation } from "react-i18next";

export default function AppIntro() {
  const {t} = useTranslation();

  return (
    <div>
      {
        t('appDesc')
      }
    </div>
  );
};