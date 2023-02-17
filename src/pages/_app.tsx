import Container from "@/components/Container";
import NavigationBar from "@/components/ui/NavigationBar";
import config from "@/config/config";
import type { AppProps } from "next/app";
import "../globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <NavigationBar items={config.navigation} />
      <br></br>
      <Component {...pageProps} />
    </Container>
  );
}
