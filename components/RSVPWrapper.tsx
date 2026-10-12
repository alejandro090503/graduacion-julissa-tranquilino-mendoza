"use client";
import { Suspense } from "react";
import RSVPSection from "./RSVPSection";

export default function RSVPWrapper() {
  return (
    <Suspense fallback={<div style={{ padding: "64px 26px", textAlign: "center" }} />}>
      <RSVPSection />
    </Suspense>
  );
}
