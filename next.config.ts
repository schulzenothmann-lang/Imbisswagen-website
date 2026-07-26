import type { NextConfig } from "next";

import { LEGACY_MODEL_IDS } from "./src/lib/models";

const nextConfig: NextConfig = {
  async redirects() {
    // Alte Modell-URLs (/modelle/basis …) zeigen dauerhaft auf die Modellnamen.
    return Object.entries(LEGACY_MODEL_IDS).map(([legacyId, currentId]) => ({
      source: `/modelle/${legacyId}`,
      destination: `/modelle/${currentId}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
