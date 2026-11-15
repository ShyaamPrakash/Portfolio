export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={diagonal ? 'diagonal' : undefined}><path d="M4 12h15M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
