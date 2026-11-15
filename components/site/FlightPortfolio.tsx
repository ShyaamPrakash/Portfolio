'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { Project } from '@/lib/projects/types';
import { Arrow } from './Icon';
import { SkillChapters } from './SkillChapters';
import { ProjectRunway } from './ProjectRunway';
const Flight = dynamic(()=>import('./Flight').then(m=>m.Flight),{ssr:false});
function Band({ reverse=false }: {reverse?:boolean}) { return <div className={`runway-band ${reverse?'reverse-band':''}`} aria-hidden="true"><div>{[0,1,2,3].map(i=><span key={i}>BUILT WITH INTENT <b>✳</b> CLEARED FOR TAKEOFF <b>✳</b> </span>)}</div></div>; }
export function FlightPortfolio({projects, unavailable}:{projects:Project[];unavailable:boolean}) {
 const [paused,setPaused]=useState(false);
 return <div className="flight-site"><header className="flight-nav"><a href="#main" className="flight-logo">SP<span>®</span></a><nav aria-label="Main navigation"><a href="#about">About me</a><a href="#work">The runway</a><a href="#contact">Contact <Arrow diagonal/></a></nav><button onClick={()=>{const next=!paused;setPaused(next);document.documentElement.dataset.motion=next?'off':'on';window.dispatchEvent(new Event('motionchange'));}} aria-pressed={paused}>{paused?'Resume motion':'Pause motion'}</button></header>
 <main id="main"><div className="flight-story"><div className="flight-sticky"><Flight/><span className="flight-coordinate">SP—01 / SYSTEM ARCHITECTURE</span><span className="flight-coordinate right">ASCII / THREE DIMENSIONS</span></div><section className="takeoff"><div className="flight-title"><h1>SHYAAM<span>P.</span></h1><p>Curiosity in motion.<br/>Systems in the making.</p></div><a className="scroll-instruction" href="#about">SCROLL TO EXPLORE <Arrow/></a></section><section id="about" className="flight-chapter"><div><h2>WIRED TO<br/><em>FIGURE IT OUT.</em></h2><p>I’m Shyaam. A Software Systems student who likes taking a difficult problem apart—and building something useful from the pieces.</p><span>PSG COLLEGE OF TECHNOLOGY / COIMBATORE</span></div></section><SkillChapters/></div>
 <section className="ground-school"><span>THE LONG GAME</span><h2>STILL LEARNING.<br/><em>ALWAYS BUILDING.</em></h2><div className="education-row"><p>Integrated M.Sc.<br/><strong>Software Systems</strong></p><p>PSG College of Technology<br/><strong>2025—2030</strong></p><p>Class Representative<br/><strong>CS50x completed</strong></p></div></section>
 <section id="work" className="project-runway"><Band/><div className="runway-heading"><h2>THE<br/><em>RUNWAY.</em></h2><p>Ideas that made it off the drawing board.<br/>Selected work, synchronized from GitHub.</p></div><ProjectRunway projects={projects} unavailable={unavailable}/><Band reverse/></section>
 <section id="contact" className="flight-contact"><p>HAVE A PROBLEM WORTH SOLVING?</p><a href="https://github.com/ShyaamPrakash" target="_blank" rel="noreferrer"><h2>LET’S<br/>MAKE IT<br/><em>FLY.</em></h2><Arrow diagonal/></a><footer><span>© {new Date().getFullYear()} SHYAAM P</span><a href="#main">BACK TO THE TOP ↑</a><span>BUILT THROUGH CURIOSITY.</span></footer></section></main></div>;
}
