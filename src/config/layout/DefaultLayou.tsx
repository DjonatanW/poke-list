import { Stack } from "@mui/material";

import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Stack spacing={5}>
      <Navbar />
      {children}
      <Footer />
    </Stack>
  );
}
