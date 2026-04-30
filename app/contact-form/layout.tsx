import { Suspense } from "react";
import FloatingChat from "../components/FloatingChat";
import Navigation from "../components/Navigation";
import ClickToSource from "../components/ClickToSource";
import UrlTracker from "../components/UrlTracker";
import CommentOverlay from "../components/comments/CommentOverlay";
import { PostHogProvider } from "../components/PostHogProvider";
import Analytic from "../components/Analytic";
import BootLoadTracker from "../components/BootLoadTracker";

export default function ContactFormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PostHogProvider>
        <Analytic />
        <BootLoadTracker />
        <Suspense fallback={null}>
          <UrlTracker />
        </Suspense>
        <ClickToSource debug_mode={process.env.CLICK_TO_SOURCE_DEBUG || 'false'} />
        <Navigation />
        <main>{children}</main>
        {/* Footer removed for this page */}
        <FloatingChat />
        <CommentOverlay />
      </PostHogProvider>
    </>
  );
}
