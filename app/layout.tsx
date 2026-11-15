import type { Metadata } from 'next';
import '@fontsource/archivo-narrow/600.css';
import '@fontsource/archivo-narrow/400.css';
import '@fontsource/ibm-plex-mono/400.css';
import './globals.css';
import './flight.css';
import './flight-refinements.css';
import './runway.css';

export const metadata: Metadata = {
  title: { default: 'Shyaam P — Software Systems', template: '%s — Shyaam P' },
  description: 'Algorithms, backend engineering and machine learning. Selected work and experiments by Shyaam P, Software Systems student at PSG College of Technology.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
