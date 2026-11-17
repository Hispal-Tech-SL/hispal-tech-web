import { useEffect } from "react";
import { HISPALGYM_DEMO_URL } from "@/constants/hispalgym";
import NotFound from "@/pages/NotFound";

/**
 * The demo is a static app under public/hispalgym/demo/ that needs the trailing slash to resolve its
 * relative assets. The server answers it directly when the slash is there, so this route only runs for
 * "/hispalgym/demo" (no slash): it adds it. With the slash it means the demo files are missing, so it
 * shows the 404 instead of redirecting in a loop.
 */
const HispalGymDemo = () => {
  const needsSlash = !window.location.pathname.endsWith("/");
  useEffect(() => {
    if (needsSlash) window.location.replace(HISPALGYM_DEMO_URL);
  }, [needsSlash]);
  return needsSlash ? null : <NotFound />;
};

export default HispalGymDemo;
