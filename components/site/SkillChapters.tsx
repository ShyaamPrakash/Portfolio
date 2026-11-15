const skills = [
  { title: 'FRONTEND.', part: 'THE INTERFACE LAYER', tools: 'HTML / CSS / JAVASCRIPT', description: 'The interface between a person and a system. Clear structure, thoughtful interactions, and making complex things easier to use.' },
  { title: 'BACKEND.', part: 'THE COMPUTE LAYER', tools: 'PYTHON / FLASK / FASTAPI', description: 'The logic behind the experience. Building application workflows and APIs, from hospital operations to semantic search.' },
  { title: 'DATABASES.', part: 'THE MEMORY LAYER', tools: 'POSTGRESQL / MYSQL / SQL', description: 'A reliable structure for information. Relational data, queries, and connecting the right pieces of an application.' },
  { title: 'SYSTEMS.', part: 'THE RUNTIME LAYER', tools: 'C / C++ / DATA STRUCTURES / ALGORITHMS', description: 'Understanding what happens underneath. Working with memory, object-oriented programming, graphs, and the algorithms that keep things moving.' },
];
export function SkillChapters() {
  return <>{skills.map((skill, index) => <section key={skill.title} data-system-part={index} className={`flight-chapter skill-chapter ${index % 2 ? 'opposite' : ''}`}><div><h2>{skill.title}</h2><span className="part-caption">{skill.part}</span><p>{skill.description}</p><span>{skill.tools}</span></div></section>)}</>;
}
