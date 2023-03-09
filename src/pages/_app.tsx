import Container from '@/components/Container';
import Breadcrumb from '@/components/ui/Breadcrumb';
import NavigationBar from '@/components/ui/NavigationBar';
import config from '@/config/config';
import type { AppProps } from 'next/app';
import '../globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <NavigationBar items={config.navigation} />
      <br></br>
      <Breadcrumb whitelistedQueryParams={['filter']} />
      <br></br>
      <Component {...pageProps} />
    </Container>
  );
}
