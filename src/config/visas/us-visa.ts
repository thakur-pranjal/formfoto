import { CountryVisaConfig } from './types';

export const usVisaConfig: CountryVisaConfig = {
  id: "us-visa",
  country: "United States",
  countryCode: "US",
  defaultProfileId: "united-states-visa-photo",
  profiles: [
    {
      id: "united-states-visa-photo",
      title: "United States Visa Photo",
      type: "visa",
      channel: "both",
      applicableCategories: [
        "B-2 (Visitor for Pleasure)",
        "BCC (Border Crossing Card)",
        "B-1 (Business Visitor)",
        "B-1/B-2 (Combined)",
        "GB (Guam Business)",
        "C-1 (Transit)",
        "C-2 (UN Transit)",
        "C-3 (Foreign Govt Transit)",
        "D (Crewmember)",
        "C-1/D (Combined Transit/Crew)",
        "F-1 (Academic Student)",
        "F-2 (Dependent)",
        "F-3 (Border Commuter)",
        "M-1 (Vocational)",
        "M-2 (Dependent)",
        "M-3 (Commuter)",
        "J-1 (Exchange Visitor)",
        "J-2 (Dependent)",
        "H-1B (Specialty Occupation)",
        "H-1B1 (Free Trade Professional)",
        "H-2A (Agricultural)",
        "H-2B (Non-agricultural)",
        "H-3 (Trainee)",
        "H-4 (Dependent)",
        "L-1A (Executive/Manager)",
        "L-1B (Specialized Knowledge)",
        "L-2 (Dependent)",
        "O-1 (Extraordinary Ability)",
        "O-2",
        "O-3",
        "P-1 (Athlete/Entertainer)",
        "P-2",
        "P-3",
        "P-4",
        "Q-1 (Cultural Exchange)",
        "TN (NAFTA Professional)",
        "TD (Dependent)",
        "E-3 (Australian Professional)",
        "I (Media/Journalist)",
        "K-1 (Fiancé/e)",
        "K-2 (Child of K-1)",
        "K-3 (Spouse of US Citizen)",
        "K-4 (Child of K-3)",
        "IR-1 (Spouse)",
        "CR-1 (Conditional Spouse)",
        "IR-2",
        "CR-2",
        "IR-5 (Parent)",
        "F1",
        "F2A",
        "F2B",
        "F3",
        "F4 (Family Preferences)",
        "V (Spouse/Child of LPR)",
        "SB-1 (Returning Resident)",
        "EB-1",
        "EB-2",
        "EB-3",
        "EB-4 (Employment-Based Immigrant)",
        "E-1 (Treaty Trader)",
        "E-2 (Treaty Investor)",
        "EB-5 (Immigrant Investor)",
        "A-1",
        "A-2",
        "A-3 (Diplomatic)",
        "G-1 to G-5 (International Org)",
        "NATO-1 to NATO-7",
        "T-1 (Trafficking Victim)",
        "U-1 (Crime Victim)",
        "S (Informant)",
        "R-1 (Religious Worker)",
        "R-2 (Dependent)",
        "SIJ (Special Immigrant Juvenile)",
        "SQ/SI (Afghan/Iraqi Translators)"
      ],
      aspectRatio: 1.0,
      physical: {
        widthMm: 51,
        heightMm: 51,
        targetDpi: 300,
        paperFinish: "any",
        copiesRequired: 1,
        printSheetSize: "4x6",
        backSideRequired: false
      },
      digital: {
        minWidthPx: 600,
        minHeightPx: 600,
        maxWidthPx: 1200,
        maxHeightPx: 1200,
        maxKb: 240,
        allowedFormats: ["jpg", "jpeg"],
        colorSpace: "sRGB"
      },
      background: {
        requiredHex: "#FFFFFF",
        label: "Plain white or off-white"
      },
      biometrics: {
        headRatioMin: 0.50,
        headRatioMax: 0.69,
        eyeLinePercentFromBottom: 0.56,
        shouldersVisible: true,
        glassesAllowed: false,
        smileAllowed: false,
        contrastWarning: false
      },
      infantRules: {
        applicable: true,
        relaxedConstraints: "Acceptable if eyes are not entirely open for newborns. No other person may be in the photo. Car seat or blanket backgrounds must be plain white or off-white."
      },
      sourceVerification: {
        authority: "U.S. Department of State / Consular Electronic Application Center (CEAC)",
        officialUrl: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos.html",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
      },
      seo: {
        metaTitle: "United States Visa Photo Requirements & Size (DS-160/DS-260)",
        metaDescription: "Official United States visa photo requirements. Exact physical dimensions are 51x51 mm (2x2 inches). Digital requirements are 600x600 to 1200x1200 pixels under 240KB.",
        keywords: [
          "United States visa photo size",
          "US visa photo requirements",
          "DS-160 photo dimensions",
          "DS-260 photo",
          "51x51 mm visa photo",
          "2x2 inch visa photo"
        ]
      }
    },
    {
      id: "united-states-diversity-visa",
      title: "United States Diversity Visa (E-DV Lottery Entry)",
      type: "visa",
      channel: "digital_upload",
      applicableCategories: [
        "DV-1 (Diversity Visa Principal)",
        "DV-2 (Spouse of DV-1)",
        "DV-3 (Child of DV-1)"
      ],
      aspectRatio: 1.0,
      physical: {
        widthMm: 51,
        heightMm: 51,
        targetDpi: 300,
        paperFinish: "any",
        copiesRequired: 0,
        printSheetSize: "4x6",
        backSideRequired: false
      },
      digital: {
        minWidthPx: 600,
        minHeightPx: 600,
        maxWidthPx: 1200,
        maxHeightPx: 1200,
        maxKb: 240,
        allowedFormats: ["jpg", "jpeg"],
        colorSpace: "sRGB"
      },
      background: {
        requiredHex: "#FFFFFF",
        label: "Plain white or off-white"
      },
      biometrics: {
        headRatioMin: 0.50,
        headRatioMax: 0.69,
        eyeLinePercentFromBottom: 0.56,
        shouldersVisible: true,
        glassesAllowed: false,
        smileAllowed: false,
        contrastWarning: false
      },
      infantRules: {
        applicable: true,
        relaxedConstraints: "Acceptable if eyes are not entirely open for newborns. No other person or object may be in the photo. Car seat or blanket backgrounds must be plain white or off-white."
      },
      sourceVerification: {
        authority: "U.S. Department of State / Electronic Diversity Visa Program (E-DV)",
        officialUrl: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos/digital-image-requirements.html",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
      },
      seo: {
        metaTitle: "United States Diversity Visa (E-DV Lottery) Photo Requirements",
        metaDescription: "Official US Diversity Visa (Green Card Lottery) photo specifications. Digital uploads must be 600x600 pixels (51x51 mm or 2x2 inches) with strict white background.",
        keywords: [
          "United States Diversity Visa photo size",
          "US DV Lottery photo requirements",
          "E-DV photo dimensions",
          "Green Card Lottery photo specs"
        ]
      }
    }
  ]
};