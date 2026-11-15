'use client';
export default function ErrorPage({ reset }: { reset: () => void }) { return <main id="main" className="case-study"><h1>A brief<br />interruption.</h1><p>The page could not be loaded. Please try again.</p><button className="primary-link" onClick={reset}>Try again</button></main>; }
