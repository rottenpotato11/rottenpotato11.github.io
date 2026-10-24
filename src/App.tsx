import { useEffect, useState } from 'react';

type Page = 'HOME' | 'WORK' | 'LAB' | 'BLOG' | 'ABOUT' | 'ARCHIVE';
type LabFilter = 'ALL' | 'PICTURES' | 'VIDEO' | 'GAMES';
type Theme = 'dark' | 'light' | 'red' | 'pink' | 'bright-red' | 'bright-pink';

const pages: Page[] = ['HOME', 'WORK', 'LAB', 'BLOG', 'ABOUT', 'ARCHIVE'];
const themes: Theme[] = ['dark', 'light', 'red', 'pink', 'bright-red', 'bright-pink'];

const pageMeta: Record<Exclude<Page, 'HOME'>, { code: string; description: string; count: string }> = {
  WORK: { code: '01', description: 'Selected commissions, identities, editorial systems, and digital work.', count: '06 PROJECTS' },
  LAB: { code: '02', description: 'Experiments, moving images, photographs, and small playable things.', count: '08 FILES' },
  BLOG: { code: '03', description: 'Notes on process, visual culture, tools, and things worth remembering.', count: '10 ENTRIES' },
  ABOUT: { code: '04', description: 'Background, approach, capabilities, and ways to get in touch.', count: 'README' },
  ARCHIVE: { code: '05', description: 'A growing index of websites, references, tools, and internet findings.', count: '12 LINKS' },
};

const work = [
  ['CONCRETE DREAMS III', 'Editorial / Zine', '2025', 'A 120-page study of brutalist architecture, collage, and experimental typography.', 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1000&h=700&fit=crop', 'https://images.unsplash.com/photo-1643485839726-c9d4fac1c9bd?w=1400&h=900&fit=crop'],
  ['LABYRINTH UI', 'Game UI design', '2024', 'Interface, iconography, and interaction language for an indie puzzle platformer.', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&h=700&fit=crop', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1400&h=900&fit=crop'],
  ['MOTION REEL', 'Motion design', '2025', 'Title sequences, campaign films, and kinetic type made over the last twelve months.', 'https://images.unsplash.com/photo-1617802690658-1173a812650d?w=1000&h=700&fit=crop', 'https://images.unsplash.com/photo-1609605348579-3123e3d40eb8?w=1400&h=900&fit=crop'],
  ['SOLSTICE', 'Event branding', '2024', 'Campaign identity, wayfinding, tickets, and merchandise for a three-day festival.', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1000&h=700&fit=crop', 'https://images.unsplash.com/photo-1581080247486-57989c1f14ab?w=1400&h=900&fit=crop'],
  ['ARCHIVE TYPEFACE', 'Type design', '2024', 'A three-weight display family inspired by mid-century European print ephemera.', 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1000&h=700&fit=crop', 'https://images.unsplash.com/photo-1658863025658-4a259cc68fc9?w=1400&h=900&fit=crop'],
];

const projectSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const lab = [
  ['GRAIN STUDIES', 'PICTURES', 'Expired 35mm film, pushed two stops.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=650&fit=crop'],
  ['URBAN TEXTURES', 'PICTURES', 'Surfaces collected across industrial Berlin.', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=650&fit=crop'],
  ['GENERATIVE 01', 'PICTURES', 'Noise fields rendered from unique seeds.', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&h=650&fit=crop'],
  ['BASEMENT SESSION', 'VIDEO', 'A music film made with practical VHS effects.', 'https://images.unsplash.com/photo-1598387993441-a364f854a80d?w=900&h=650&fit=crop'],
  ['CITY IN FRAMES', 'VIDEO', 'A short study of urban isolation on 16mm.', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=900&h=650&fit=crop'],
  ['SIGNAL LOST', 'VIDEO', 'Broadcast graphics for a station that never existed.', 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=900&h=650&fit=crop'],
  ['NULL MAZE', 'GAMES', 'A tiny monochrome browser puzzle.', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900&h=650&fit=crop'],
  ['WINDOW_95', 'GAMES', 'Desktop toy about sorting impossible files.', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=900&h=650&fit=crop'],
] as const;

const posts = [
  ['05.02.26', 'Designing identities that can misbehave', 'Why the most useful visual systems leave room for accidents, misuse, and surprise.', 'PROCESS', '06 MIN'],
  ['18.01.26', 'A field guide to good loading screens', 'Notes from collecting pauses, progress bars, and fake system messages in games.', 'INTERFACE', '04 MIN'],
  ['09.12.25', 'The useful friction of old tools', 'What a week with a photocopier, wax pencil, and no undo button changed.', 'TOOLS', '08 MIN'],
  ['21.11.25', 'Looking at: Japanese jazz sleeves', 'A short visual index of scale, silence, cropping, and beautifully difficult type.', 'REFERENCE', '05 MIN'],
  ['02.10.25', 'Making a typeface for one poster', 'A project diary about drawing only the letters a single sentence required.', 'TYPE', '07 MIN'],
  ['14.09.25', 'Notes from a month without grids', 'What happens when hierarchy is built through rhythm, scale, and intuition instead.', 'PROCESS', '06 MIN'],
  ['28.08.25', 'Why every project needs an ugly draft', 'A defense of low-fidelity thinking and showing work before it learns to behave.', 'PROCESS', '04 MIN'],
  ['12.07.25', 'Collecting interfaces from nowhere', 'A visual archive of fictional operating systems, prop screens, and speculative tools.', 'INTERFACE', '09 MIN'],
  ['03.06.25', 'Five books I keep within reach', 'Reference books that continue to shape how I think about images, systems, and type.', 'REFERENCE', '05 MIN'],
  ['19.04.25', 'The case for one-purpose websites', 'Small, focused sites can be stranger, faster, and more memorable than platforms.', 'WEB', '07 MIN'],
];

const archive = [
  ['ARE.NA', 'are.na', 'Channels for research, references, and slow curation.', 'REFERENCE'],
  ['THE CREATIVE INDEPENDENT', 'thecreativeindependent.com', 'Practical interviews about sustaining a creative life.', 'READING'],
  ['FONT IN USE', 'fontsinuse.com', 'A public archive of typography in the real world.', 'TYPE'],
  ['INTERNET ARTIFACTS', 'neal.fun/internet-artifacts', 'A walk through the internet’s formative objects.', 'WEB'],
  ['COSMOS', 'cosmos.so', 'A calm place for collecting visual inspiration.', 'REFERENCE'],
  ['PUBLIC DOMAIN REVIEW', 'publicdomainreview.org', 'Strange and beautiful material from public collections.', 'ARCHIVE'],
  ['ONE TERABYTE OF KILOBYTE AGE', 'oneterabyteofkilobyteage.tumblr.com', 'Screenshots rescued from the ruins of GeoCities.', 'WEB'],
  ['LETTERFORM ARCHIVE', 'letterformarchive.org', 'Typography and graphic design research collection.', 'TYPE'],
  ['RADIO GARDEN', 'radio.garden', 'Turn the globe and listen to live radio anywhere.', 'SOUND'],
  ['ITCH.IO', 'itch.io', 'Independent games, tools, experiments, and oddities.', 'GAMES'],
  ['SAME ENERGY', 'same.energy', 'Visual search that works by mood and texture.', 'TOOL'],
  ['LOW-TECH MAGAZINE', 'solar.lowtechmagazine.com', 'A solar-powered publication about low-tech solutions.', 'READING'],
];

function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return time;
}

function Window({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <article className={`window ${className}`}>
      <div className="titlebar">
        <span>{title}</span>
        <span aria-hidden="true">— □ ×</span>
      </div>
      <div className="window-content">{children}</div>
    </article>
  );
}

function App() {
  const initialHash = window.location.hash.slice(1);
  const initialProject = initialHash.startsWith('project/') ? initialHash.replace('project/', '') : null;
  const initialPost = initialHash.startsWith('blog/') ? initialHash.replace('blog/', '') : null;
  const [page, setPage] = useState<Page>(() => {
    const hash = initialProject ? 'WORK' : initialPost ? 'BLOG' : window.location.hash.slice(1).toUpperCase() as Page;
    return pages.includes(hash) ? hash : 'HOME';
  });
  const [activeProject, setActiveProject] = useState<string | null>(initialProject);
  const [activePost, setActivePost] = useState<string | null>(initialPost);
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme | null;
    return savedTheme && themes.includes(savedTheme) ? savedTheme : 'dark';
  });
  const [filter, setFilter] = useState<LabFilter>('ALL');
  const clock = useClock();
  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith('project/')) {
        setPage('WORK');
        setActiveProject(hash.replace('project/', ''));
        setActivePost(null);
        return;
      }
      if (hash.startsWith('blog/')) {
        setPage('BLOG');
        setActivePost(hash.replace('blog/', ''));
        setActiveProject(null);
        return;
      }
      const next = hash.toUpperCase() as Page;
      if (pages.includes(next)) {
        setPage(next);
        setActiveProject(null);
        setActivePost(null);
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (next: Page) => {
    setPage(next);
    setActiveProject(null);
    setActivePost(null);
    window.location.hash = next.toLowerCase();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProject = (slug: string) => {
    setPage('WORK');
    setActiveProject(slug);
    window.location.hash = `project/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPost = (slug: string) => {
    setPage('BLOG');
    setActivePost(slug);
    window.location.hash = `blog/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="site-shell">
      <header className="menu-bar">
        <button className="brand" onClick={() => navigate('HOME')}>JD_OS®</button>
        <nav aria-label="Main navigation">
          {pages.slice(1).map((item) => (
            <button key={item} className={page === item ? 'active' : ''} onClick={() => navigate(item)}>{item}</button>
          ))}
        </nav>
        <div className="system">
          <button className="theme-toggle" onClick={() => setTheme(nextTheme)} aria-label={`Current theme: ${theme}. Switch to ${nextTheme} theme`}>
            [{theme.replace('-', ' ').toUpperCase()}]
          </button>
          <time>{clock}</time>
        </div>
      </header>

      <main>
        {page === 'HOME' && <Home onNavigate={navigate} />}
        {page !== 'HOME' && !activeProject && !activePost && <PageHeader page={page} />}
        {page === 'WORK' && !activeProject && <Work onOpen={openProject} />}
        {page === 'WORK' && activeProject && <ProjectDetail slug={activeProject} onBack={() => navigate('WORK')} />}
        {page === 'LAB' && <Lab filter={filter} setFilter={setFilter} />}
        {page === 'BLOG' && !activePost && <Blog onOpen={openPost} />}
        {page === 'BLOG' && activePost && <BlogPost slug={activePost} onBack={() => navigate('BLOG')} />}
        {page === 'ABOUT' && <About />}
        {page === 'ARCHIVE' && <Archive />}
      </main>

      <footer>
        <span>© JANE DOE 2026 / BERLIN, DE</span>
        <span>AVAILABLE FOR SELECT PROJECTS</span>
      </footer>
    </div>
  );
}

function Home({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">PORTFOLIO / GRAPHIC DESIGN / BERLIN</p>
        <h1>JANE DOE<br />MAKES VISUAL<br />SYSTEMS<span className="cursor">_</span></h1>
        <p className="intro">Independent graphic designer working across identities, editorial, motion, and interactive media.</p>
        <button className="text-link" onClick={() => onNavigate('WORK')}>VIEW SELECTED WORK →</button>
      </section>
      <section className="directory" aria-labelledby="directory-title">
        <div className="section-label">
          <span id="directory-title">DIRECTORY</span>
          <span>5 LOCATIONS</span>
        </div>
        <div className="directory-grid">
          {(Object.entries(pageMeta) as [Exclude<Page, 'HOME'>, (typeof pageMeta)[Exclude<Page, 'HOME'>]][]).map(([name, item]) => (
            <button className="directory-card" key={name} onClick={() => onNavigate(name)}>
              <span className="card-number">/{item.code}</span>
              <h2>{name}</h2>
              <p>{item.description}</p>
              <span className="card-foot">{item.count}<b>↗</b></span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

function PageHeader({ page }: { page: Exclude<Page, 'HOME'> }) {
  const item = pageMeta[page];
  return (
    <section className="page-header">
      <p className="eyebrow">INDEX / {item.code}</p>
      <div>
        <h1>{page}</h1>
        <p>{item.description}</p>
      </div>
    </section>
  );
}

function Work({ onOpen }: { onOpen: (slug: string) => void }) {
  return (
    <section className="content-section">
      <div className="section-label"><span>SELECTED PROJECTS</span><span>2024—2026</span></div>
      <div className="work-grid">
        {work.map(([title, type, year, description, image], index) => (
          <button className="project-link" onClick={() => onOpen(projectSlug(title))} key={title} aria-label={`View the ${title} case study`}>
            <Window title={`PROJECT_0${index + 1}.DIR`}>
              <img src={image} alt="" />
              <div className="project-copy">
                <div className="project-meta"><span>{type}</span><span>{year}</span></div>
                <h2>{title}</h2>
                <p>{description}</p>
                <span className="text-link">OPEN CASE STUDY →</span>
              </div>
            </Window>
          </button>
        ))}
      </div>
    </section>
  );
}

function ProjectDetail({ slug, onBack }: { slug: string; onBack: () => void }) {
  const index = work.findIndex(([title]) => projectSlug(title) === slug);
  const project = work[index];

  if (!project) {
    return (
      <section className="project-not-found">
        <p className="eyebrow">ERROR / FILE NOT FOUND</p>
        <h1>404</h1>
        <button className="text-link" onClick={onBack}>← RETURN TO WORK</button>
      </section>
    );
  }

  const [title, type, year, description, cover, detailImage] = project;
  const isGame = type === 'Game UI design';
  const isMotion = type === 'Motion design';

  return (
    <article className="case-study">
      <header className="case-header">
        <button className="text-link" onClick={onBack}>← ALL WORK</button>
        <p className="eyebrow">CASE STUDY / {String(index + 1).padStart(2, '0')}</p>
        <h1>{title}</h1>
        <div className="case-intro">
          <p>{description} The result is a flexible visual language designed to remain recognizable while changing across formats, scales, and contexts.</p>
          <dl>
            <div><dt>DISCIPLINE</dt><dd>{type}</dd></div>
            <div><dt>YEAR</dt><dd>{year}</dd></div>
            <div><dt>ROLE</dt><dd>ART DIRECTION / DESIGN</dd></div>
            <div><dt>STATUS</dt><dd>COMPLETED</dd></div>
          </dl>
        </div>
      </header>

      <figure className="case-hero">
        <img src={cover} alt={`${title} project overview`} />
        <figcaption>FIG. 01 / PRIMARY PROJECT VIEW</figcaption>
      </figure>

      <section className="case-copy">
        <p className="eyebrow">01 / THE BRIEF</p>
        <h2>A system with a clear voice and enough space to evolve.</h2>
        <div>
          <p>The project began with a simple question: how can a visual identity feel immediate without becoming rigid? Early research focused on archival material, technical interfaces, and the visual noise created by repeated reproduction.</p>
          <p>Rather than designing isolated outputs, I built a set of rules for type, image, rhythm, and motion. Each element can work independently, but gains meaning through repetition and contrast.</p>
        </div>
      </section>

      <section className="media-grid">
        <figure className="media-large">
          <img src={detailImage} alt={`${title} detail and process material`} />
          <figcaption>FIG. 02 / DETAIL STUDY</figcaption>
        </figure>
        <div className="media-note">
          <span>MEDIA_01.TXT</span>
          <p>Selected process imagery, material tests, and final applications from the project archive.</p>
        </div>
        <figure>
          <img src={cover} alt={`${title} alternate crop`} />
          <figcaption>FIG. 03 / APPLICATION</figcaption>
        </figure>
      </section>

      <section className="case-copy">
        <p className="eyebrow">02 / MEDIA</p>
        <h2>{isGame ? 'A playable interface built around discovery.' : isMotion ? 'A visual language designed to move.' : 'One idea, translated across every format.'}</h2>
        <div>
          <p>{isGame ? 'The interface treats navigation as part of the game world. Menus, states, and feedback were prototyped alongside play to keep every interaction legible without breaking immersion.' : isMotion ? 'Motion tests established timing, transitions, and type behavior before final sequences were produced. Sound and image were developed together to create a consistent rhythm.' : 'Print, screen, and spatial applications were developed in parallel. This made it possible to test the system under real constraints instead of presenting it only as pristine mockups.'}</p>
          <p>The media below is presented as a prototype module. Replace it with the final film, interactive build, or embedded project file when ready.</p>
        </div>
      </section>

      <section className={`interactive-module ${isGame ? 'game-module' : 'video-module'}`}>
        <div>
          <p className="eyebrow">{isGame ? 'INTERACTIVE BUILD / WEBGL' : 'PROJECT FILM / 01:24'}</p>
          <h2>{isGame ? 'PLAYABLE DEMO' : 'BEHIND THE SYSTEM'}</h2>
          <p>{isGame ? 'Explore the prototype interface and core interaction loop.' : 'Watch the project process, motion tests, and final applications.'}</p>
          <button>{isGame ? '[ LAUNCH GAME ]' : '[ PLAY VIDEO ]'}</button>
        </div>
      </section>

      <nav className="case-pagination" aria-label="Project navigation">
        <button onClick={() => {
          const previous = work[(index - 1 + work.length) % work.length];
          window.location.hash = `project/${projectSlug(previous[0])}`;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>← PREVIOUS PROJECT</button>
        <button onClick={() => {
          const next = work[(index + 1) % work.length];
          window.location.hash = `project/${projectSlug(next[0])}`;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>NEXT PROJECT →</button>
      </nav>
    </article>
  );
}

function Lab({ filter, setFilter }: { filter: LabFilter; setFilter: (filter: LabFilter) => void }) {
  const filters: LabFilter[] = ['ALL', 'PICTURES', 'VIDEO', 'GAMES'];
  return (
    <section className="content-section">
      <div className="filter-bar">
        <span>FILTER:</span>
        {filters.map((item) => <button key={item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}</button>)}
      </div>
      <div className="lab-grid">
        {lab.filter((item) => filter === 'ALL' || item[1] === filter).map(([title, category, description, image]) => (
          <article className="lab-card" key={title}>
            <div className="image-wrap"><img src={image} alt="" /><span>{category === 'VIDEO' ? 'PLAY ▶' : category === 'GAMES' ? 'RUN.EXE' : 'VIEW +'}</span></div>
            <p className="eyebrow">{category}</p>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Blog({ onOpen }: { onOpen: (slug: string) => void }) {
  return (
    <section className="content-section">
      <div className="section-label"><span>RECENT ENTRIES</span><span>TEXT ONLY</span></div>
      <div className="post-list">
        {posts.map(([date, title, summary, tag, time], index) => (
          <button className="post" key={title} onClick={() => onOpen(projectSlug(title))} aria-label={`Read ${title}`}>
            <span className="post-index">0{index + 1}</span>
            <time>{date}</time>
            <div><p className="eyebrow">{tag} / {time} READ</p><h2>{title}</h2><p>{summary}</p></div>
            <span className="post-arrow">→</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function BlogPost({ slug, onBack }: { slug: string; onBack: () => void }) {
  const index = posts.findIndex(([, title]) => projectSlug(title) === slug);
  const post = posts[index];

  if (!post) {
    return (
      <section className="project-not-found">
        <p className="eyebrow">ERROR / ENTRY NOT FOUND</p>
        <h1>404</h1>
        <button className="text-link" onClick={onBack}>← RETURN TO BLOG</button>
      </section>
    );
  }

  const [date, title, summary, tag, readTime] = post;
  return (
    <article className="blog-entry">
      <header>
        <button className="text-link" onClick={onBack}>← ALL ENTRIES</button>
        <p className="eyebrow">{tag} / {date} / {readTime} READ</p>
        <h1>{title}</h1>
        <p className="blog-deck">{summary}</p>
      </header>

      <div className="article-layout">
        <aside>
          <span>ENTRY_{String(index + 1).padStart(2, '0')}.TXT</span>
          <span>WORDS / 1,284</span>
          <span>STATUS / PUBLISHED</span>
        </aside>
        <div className="article-body">
          <p className="article-lead">The best creative systems are not the ones that remove every decision. They are the ones that make the important decisions visible, while leaving enough room for instinct, context, and surprise.</p>
          <p>Every project begins as a collection of fragments: references, conversations, screenshots, wrong turns, and half-formed ideas. The useful work is rarely about finding one perfect image. It is about noticing the relationships between those fragments and deciding which ones deserve to become rules.</p>

          <h2>Start with behavior, not appearance</h2>
          <p>I used to begin by asking what a project should look like. Now I ask what it needs to do. Should it feel stable or restless? Should every output look related at a glance, or should recognition arrive slowly? These questions produce much more useful constraints than choosing colors or typefaces too early.</p>
          <blockquote>“A visual system should provide direction without removing the possibility of discovery.”</blockquote>
          <p>Working this way also makes critique clearer. Instead of debating personal taste, the conversation can return to intent: does this choice create the behavior we agreed the project needed?</p>

          <h2>Make the first version disposable</h2>
          <p>Early drafts should be quick enough to abandon. I keep them rough on purpose: default type, low-resolution images, incomplete transitions. Polish creates attachment, and attachment makes it harder to recognize when the underlying idea is weak.</p>
          <p>Once a direction survives repetition, scale changes, and deliberately awkward content, craft becomes valuable. Until then, finish is mostly camouflage.</p>

          <div className="article-note">
            <span>NOTE_01</span>
            <p>Try the system with the shortest headline, the longest caption, the worst photograph, and the smallest available format. The failures are usually more instructive than the hero image.</p>
          </div>

          <h2>Leave evidence of the process</h2>
          <p>A good outcome does not have to look accidental, but it should feel alive. Small inconsistencies, material traces, and unexpected combinations can communicate the thinking behind the work. They give the viewer something to inspect rather than only something to approve.</p>
          <p>The goal is not imperfection for its own sake. It is to avoid sanding away every sign that a person made the thing.</p>
          <p className="article-end">END OF FILE<span className="cursor">_</span></p>
        </div>
      </div>

      <nav className="case-pagination" aria-label="Blog entry navigation">
        <button onClick={() => {
          const previous = posts[(index - 1 + posts.length) % posts.length];
          window.location.hash = `blog/${projectSlug(previous[1])}`;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>← PREVIOUS ENTRY</button>
        <button onClick={() => {
          const next = posts[(index + 1) % posts.length];
          window.location.hash = `blog/${projectSlug(next[1])}`;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>NEXT ENTRY →</button>
      </nav>
    </article>
  );
}

function About() {
  return (
    <section className="content-section about-grid">
      <Window title="PROFILE.TXT">
        <div className="portrait" aria-label="Portrait placeholder">JD</div>
        <dl>
          <div><dt>NAME</dt><dd>JANE DOE</dd></div>
          <div><dt>BASE</dt><dd>BERLIN, DE</dd></div>
          <div><dt>ROLE</dt><dd>INDEPENDENT DESIGNER</dd></div>
          <div><dt>STATUS</dt><dd>AVAILABLE / Q2 2026</dd></div>
        </dl>
      </Window>
      <div className="about-copy">
        <p className="eyebrow">README / VERSION 10.2</p>
        <h2>I build identities and visual systems for culture, music, and technology.</h2>
        <p>For the last decade, I’ve worked between graphic design and digital experiences. I’m interested in work that has a strong point of view, a useful structure, and enough room to evolve.</p>
        <p>My practice moves between commissioned identities, editorial design, motion, and interfaces. Outside client work, I make zines, short films, generative images, and very small games.</p>
        <div className="capabilities">
          <div><span>01</span><b>IDENTITY</b><p>Strategy, art direction, systems, guidelines</p></div>
          <div><span>02</span><b>EDITORIAL</b><p>Books, magazines, type, print production</p></div>
          <div><span>03</span><b>DIGITAL</b><p>Interfaces, motion, creative development</p></div>
        </div>
        <div className="contact-block">
          <p className="eyebrow">START A CONVERSATION</p>
          <a href="mailto:hello@janedoe.xyz">HELLO@JANEDOE.XYZ ↗</a>
          <p>Instagram / Are.na / GitHub</p>
        </div>
      </div>
    </section>
  );
}

function Archive() {
  return (
    <section className="content-section">
      <div className="archive-note">
        <span>ARCHIVE_MANIFEST.TXT</span>
        <p>An informal, continuously updated collection. Links open outside this system.</p>
      </div>
      <div className="archive-list">
        {archive.map(([title, url, description, tag], index) => (
          <a href={`https://${url}`} target="_blank" rel="noreferrer" key={title}>
            <span className="archive-index">{String(index + 1).padStart(2, '0')}</span>
            <div><h2>{title}</h2><p>{description}</p></div>
            <span className="archive-tag">{tag}</span>
            <span className="archive-url">{url} ↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default App;
