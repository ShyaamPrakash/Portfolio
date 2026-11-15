# Direction: Inside the system

## References

- Active Theory v5: https://www.commarts.com/webpicks/active-theory-1 — moving through connected WebGL environments rather than treating the scene as a decorative object.
- Bruno Simon: https://www.bruno-simon.com/ — a portfolio organized around exploring a spatial world.
- The owner's black/red palette, ASCII requirement, horizontal project runway and approved ending remain the visual constraints.

## Animation plan

The opening view looks down a sequence of square processor-like portals. Each gate has an actual aperture, depth, circuit details, and rails connecting to the next gate. A real perspective camera travels into the geometry, so near edges pass around the viewport while the next layer grows in its center.

Scroll is mapped to one camera timeline: overview, interface/frontend, compute/backend, memory/databases, then runtime/C/C++. Each transition accelerates gently and decelerates into a slower reading interval. Slight alternating camera roll gives the route continuity without a spinning camera. Native scroll stays in control, so reversing direction reverses the journey.

The hero title fades before the first passage. Skill panels sit outside the central sightline and remain readable. After the final gate, the scene gives way to the education chapter, horizontal GitHub runway, and approved contact ending.

Reduced motion uses a static portal perspective and all normal text sections. Pause freezes camera travel and moving text bands. Rendering stops when the scene is offscreen or the browser tab is hidden. No sound, forced input lock, or flashing transitions.

## Extended journey and carousel

Story chapters now span 130 viewport heights on desktop and 125 on mobile, with sticky reading panels. The existing camera journey spans the longer story automatically, leaving more room to enter and read each layer.

The runway shows exactly one project per viewport. A CSS sticky stage holds the gallery in view while ScrollTrigger maps vertical page progress to horizontal card travel with 450ms smoothing. Scroll settles to the nearest project; the stage releases after the final card. Previous/next buttons and arrow keys navigate to the corresponding page position. There is no timed autoplay. Reduced motion and the global pause setting use an unpinned horizontal gallery with immediate button navigation and native touch scrolling.

Fourteen authored generic illustrations cover finance, operations, sentiment, camera/signal, notebooks, code, architecture, search, networks, databases, interfaces, machine learning, audio, and systems. Repository content chooses the starting motif; collisions choose an unused illustration for the current gallery. All eleven current projects have different covers.

Desktop/mobile browser verification confirmed one full-width card at rest, vertical scrolling to the next card, sticky positioning, synchronized next-button navigation, and release back to normal page scrolling. Production compilation and the existing desktop/mobile suite pass.
