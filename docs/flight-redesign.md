# Flight portfolio

The latest user direction replaces the tabbed blueprint interface with a black/red scrolling experience. Inspiration: https://landonorris.com/ and the creator's case study at https://www.itsoffbrand.com/our-work/lando-norris. The browser could not open the external reference due to network restrictions; its content and case study were read through the web tool.

The hero uses actual Three.js geometry: lathed fuselage, extruded swept wings and tail surfaces, canopy and twin engines. Three's ASCII effect renders lighting into a dense character grid. ScrollTrigger changes the aircraft orientation across the biography chapters; native scrolling keeps input responsive. Text bands travel in opposite directions around the project runway. Reduced motion and the pause control stop nonessential movement.

Without Supabase, the latest request for a dynamic GitHub list is implemented as a public-repository feed with a 15-minute server cache, excluding forks and archived repositories. With Supabase configured, saved visibility settings continue to control publication. This supersedes the earlier unconfigured empty-state behavior. Fetch failures produce an explicit unavailable state.

Verified with TypeScript, desktop/mobile Playwright navigation/overflow/access tests, and local browser screenshots. An initial ASCII sizing error and inverted brightness map were corrected during browser review. Real-device GPU performance, Supabase owner login and Rive remain unverified; no Rive asset is included in this redesign.
