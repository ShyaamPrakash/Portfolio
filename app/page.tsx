import { FlightPortfolio } from '@/components/site/FlightPortfolio';
import { getPublishedProjects } from '@/lib/projects/queries';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { projects, unavailable } = await getPublishedProjects();
  return <FlightPortfolio projects={projects} unavailable={unavailable} />;
}
