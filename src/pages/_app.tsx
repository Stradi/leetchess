import Container from '@/components/Container';
import Breadcrumb from '@/components/ui/Breadcrumb';
import NavigationBar from '@/components/ui/NavigationBar';
import config from '@/config/config';
import { GoogleAnalytics, event } from 'nextjs-google-analytics';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import '../globals.css';

export function reportWebVitals(metric: NextWebVitalsMetric) {
  event(metric.name, {
    category: metric.label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    label: metric.id,
    nonInteraction: true,
  });
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <Container>
        <NavigationBar items={config.navigation} />
        <br></br>
        <Breadcrumb whitelistedQueryParams={['filter']} />
        <br></br>
        <Component {...pageProps} />
      </Container>
    </>
  );
}
