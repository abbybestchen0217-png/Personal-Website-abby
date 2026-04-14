import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  ExternalLink, 
  Code2, 
  Database, 
  BarChart3, 
  Zap, 
  GraduationCap, 
  Briefcase,
  ChevronRight,
  Github,
  Camera,
  Plane,
  LayoutDashboard,
  ArrowLeft,
  Smartphone,
  Milestone,
  History,
  Sparkles,
  Award,
  Flag,
  Heart,
  Cpu,
  Dumbbell,
  PawPrint,
  Music,
  X
} from 'lucide-react';
import { cn } from "./lib/utils";
import appImage from './assets/app.jpg';
import dashboardImage from './assets/dashboard1.png';
import dashboardImage1 from './assets/dashboard2.png';
import brandstormImage from './assets/brandstorm1.png';
import brandstormStrategy from './assets/brandstorm2.png';
import brandstormImpact from './assets/brandstorm3.png';
import photographyImage from './assets/photography.jpg';
import travelImage from './assets/travel.jpg';
import techImage from './assets/tech.jpg';
import sportsImage from './assets/sports.jpg';
import danceImage from './assets/dance.jpg';
import petsImage from './assets/pet.jpg';

// --- Types ---

interface MilestoneItem {
  id: string;
  type: 'work' | 'project' | 'education';
  title: string;
  organization: string;
  date: string;
  location?: string;
  industry?: string;
  shortDesc: string;
  fullStory: string;
  growth: string[];
  memories: string;
  tags?: string[];
  color: string;
  image?: string;
  isMilestone?: boolean;
}

// --- Components ---

const TechLabel = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`flex items-center gap-2 font-mono text-[8px] tracking-[0.2em] text-white/30 uppercase ${className}`}>
    <div className="w-1 h-1 bg-purple-500/40" />
    {children}
  </div>
);

const GlassCard = ({ children, className = "", bgImage = "" }: { children: React.ReactNode, className?: string, bgImage?: string, key?: React.Key }) => (
  <motion.div 
    whileHover={{ y: -2 }}
    className={`bg-white/[0.02] border border-white/5 p-6 transition-all duration-300 relative overflow-hidden ${className}`}
  >
    {bgImage && (
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImage} 
          alt="background" 
          className="w-full h-full object-cover opacity-5 group-hover:opacity-10 transition-opacity duration-500"
        />
      </div>
    )}
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col items-center justify-center mb-24 text-center"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-purple-500/30" />
      <div className="w-1 h-1 bg-purple-500/40 rounded-full" />
      <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-purple-500/30" />
    </div>
    <h2 className="text-3xl md:text-5xl font-light tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-purple-200 to-purple-500/40">
      {children}
    </h2>
    <div className="mt-6 font-mono text-[8px] text-white/20 tracking-[0.5em] uppercase">
      Section_Ref // {Math.random().toString(16).slice(2, 8).toUpperCase()}
    </div>
  </motion.div>
);

const Reveal = ({ children, delay = 0, direction = "up" }: { children: React.ReactNode, delay?: number, direction?: "up" | "down" | "left" | "right", key?: React.Key }) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { 
        duration: 1, 
        delay, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const projects = [
    {
      id: 'app',
      title: "Mobile Applications",
      icon: Smartphone,
      color: "purple",
      desc: "Innovative mobile solutions focusing on UX and real-time interaction.",
      image: appImage,
      detail: {
        link: "https://life-manager-mocha.vercel.app/"
      }
    },
    {
      id: 'dashboard',
      title: "Data Dashboards",
      icon: LayoutDashboard,
      color: "blue",
      desc: "Interactive visualizations transforming complex data into actionable insights.",
      image: dashboardImage,
      detail: {
        images: [
          dashboardImage1,
          dashboardImage
        ]
      }
    },
    {
      id: 'brandstorm',
      title: "L'Oreal Brandstorm",
      icon: Sparkles,
      color: "pink",
      label: "Nationally Top 100",
      desc: "Global Innovation Competition. A tech-driven beauty solution for the professional products division.",
      image: brandstormImage,
      detail: {
        pages: [
          { title: "Strategy", img: brandstormStrategy },
          { title: "Design", img: brandstormImage },
          { title: "Impact", img: brandstormImpact }
        ]
      }
    },
    {
      id: 'charity',
      title: "Charity Sales",
      icon: Heart,
      color: "red",
      label: "Social Impact",
      desc: "Raised 130,000 RMB (approximately $20,000 USD). Organized a large-scale charity event raising significant funds for social welfare.",
      image: "https://picsum.photos/seed/charity/1200/800",
      detail: {}
    }
  ];

  const [view, setView] = useState<'portfolio' | 'milestone-detail' | 'project-detail'>('portfolio');
  const [activeProject, setActiveProject] = useState<number>(0);
  const [isProjectPaused, setIsProjectPaused] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [projectPage, setProjectPage] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [expandedLife, setExpandedLife] = useState<string | null>('photography');
  const [isLifePaused, setIsLifePaused] = useState(false);
  
  const lifeItems = [
    { id: 'photography', title: 'Photography', desc: 'Capturing moments and visual stories through the lens.', img: photographyImage, icon: Camera },
    { id: 'travel', title: 'Travel', desc: 'Exploring diverse cultures and finding inspiration in new horizons.', img: travelImage, icon: Plane },
    { id: 'tech', title: 'Tech Exhibits', desc: 'Staying at the forefront of innovation and future tech.', img: techImage, icon: Cpu },
    { id: 'sports', title: 'Sports', desc: 'Pushing limits and finding balance through movement.', img: sportsImage, icon: Dumbbell },
    { id: 'dance', title: 'Dance', desc: 'Expressing rhythm and emotion through fluid motion.', img: danceImage, icon: Music },
    { id: 'pets', title: 'Pets', desc: 'Unconditional love and joyful companions in my daily life.', img: petsImage, icon: PawPrint },
  ];

  // Autoplay for Projects
  useEffect(() => {
    if (isProjectPaused) return;
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isProjectPaused, projects.length]);

  // Autoplay for Life
  useEffect(() => {
    if (isLifePaused) return;
    const interval = setInterval(() => {
      setExpandedLife((prev) => {
        const currentIndex = lifeItems.findIndex(item => item.id === prev);
        const nextIndex = (currentIndex + 1) % lifeItems.length;
        return lifeItems[nextIndex].id;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isLifePaused]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroTranslateY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const bgParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Handle horizontal scroll with mouse wheel and grab-to-scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      container.classList.add('active');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      container.classList.remove('active');
    };

    const handleMouseUp = () => {
      isDown = false;
      container.classList.remove('active');
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [view]);

  const milestones: MilestoneItem[] = [
    {
      id: 'kinetica',
      type: 'work',
      title: 'Data Analytics Consultant',
      organization: 'The Kinetica Group',
      date: 'Mar. - Apr. 2026',
      location: 'Remote',
      industry: 'Sports Analytics',
      shortDesc: 'Mapping the opportunity counties in sports.',
      fullStory: 'Working with Kinetica allowed me to apply complex regression models to real-world geographical data. I focused on predicting high-potential counties for sports investment.',
      growth: [
        'Quantile regression implementation',
        'Large-scale geospatial data visualization',
        'Client-facing analytical storytelling'
      ],
      memories: 'The moment the predictive model finally aligned with historical trends, revealing hidden opportunities in rural counties.',
      color: 'purple',
      image: 'https://picsum.photos/seed/kinetica/800/600'
    },
    {
      id: 'sketch3d',
      type: 'work',
      title: 'Business Growth Intern',
      organization: 'Sketch3D.AI',
      date: 'Aug. 2025 - Mar. 2026',
      location: 'Bay Area, CA | Remote',
      industry: 'AI & SaaS',
      shortDesc: 'Designed engagement funnel analysis and multi-channel acquisition strategies.',
      fullStory: 'At a fast-paced AI startup, I learned how to move quickly and use data to pivot strategies. I diagnosed a critical drop-off in the user journey that led to a significant redesign of the onboarding flow.',
      growth: [
        'Early-stage startup growth hacking',
        'Google Analytics funnel diagnostics',
        'Competitor landscape mapping'
      ],
      memories: 'Brainstorming acquisition channels with the founders and seeing our first 100% uplift in organic traffic.',
      color: 'purple',
      image: 'https://picsum.photos/seed/sketch3d/800/600'
    },
    {
      id: 'loreal',
      type: 'work',
      title: 'Product Manager Intern',
      organization: "L'Oreal | PPD, KERASTASE",
      date: 'Nov. 2024 - Jan. 2025',
      location: 'Shanghai, China',
      industry: 'Beauty & Luxury',
      shortDesc: 'Drove cross-functional execution of a New Year gift set launch.',
      fullStory: 'Managing a luxury product line taught me the importance of precision and brand storytelling. I coordinated between supply chain, marketing, and sales to ensure a successful launch.',
      growth: [
        'Cross-functional project management',
        'E-commerce revenue optimization',
        'Luxury brand positioning'
      ],
      memories: 'The excitement of the launch day and seeing our gift sets featured on the TikTok TopView.',
      color: 'purple',
      image: 'https://picsum.photos/seed/loreal/800/600'
    },
    {
      id: 'brandstorm',
      type: 'project',
      title: 'L\'Oreal Brandstorm Global Competition',
      organization: 'L\'Oreal',
      date: 'Jan. - May 2024',
      location: 'Shanghai, China',
      industry: 'Beauty Tech',
      shortDesc: 'Developed a tech-driven beauty solution for the professional products division.',
      fullStory: 'Participating in Brandstorm was a masterclass in innovation and pitch-deck storytelling. Our team developed a sustainable, AI-powered diagnostic tool for hair salons, focusing on reducing chemical waste.',
      growth: [
        'Innovation and design thinking',
        'Market feasibility analysis',
        'High-stakes pitch presentation'
      ],
      memories: 'The late-night brainstorming sessions with my team and the adrenaline of presenting our vision to the L\'Oreal executives.',
      color: 'pink',
      image: 'https://picsum.photos/seed/brandstorm/800/600'
    },
    {
      id: 'rednote',
      type: 'work',
      title: 'Data Analyst Intern',
      organization: 'Red Note (Xiaohongshu)',
      date: 'Aug. - Nov. 2024',
      location: 'Shanghai, China',
      industry: 'Social Media',
      shortDesc: 'Generated category trend reports by analyzing billions of search data points.',
      fullStory: 'At one of China\'s largest social platforms, I learned to handle data at scale. I used SQL to extract insights from billions of rows, helping the content team understand emerging lifestyle trends.',
      growth: [
        'Big data processing with SQL',
        'Consumer intent analysis',
        'Trend forecasting for social content'
      ],
      memories: 'Discovering a niche "outdoor lifestyle" trend before it went mainstream, which helped shape our Q4 content strategy.',
      color: 'purple',
      image: 'https://picsum.photos/seed/rednote/800/600'
    },
    {
      id: 'publicis',
      type: 'work',
      title: 'Media Planning Intern',
      organization: 'Publicis Groupe',
      date: 'Jun. - Aug. 2024',
      location: 'Shanghai, China',
      industry: 'Advertising',
      shortDesc: 'Identified competitor platform mix and executed audience segmentation experiments.',
      fullStory: 'My time at Publicis was a deep dive into the world of digital advertising. I ran A/B tests on TikTok that resulted in a 100% uplift in click-through rates for our clients.',
      growth: [
        'Digital media planning and buying',
        'A/B testing and audience segmentation',
        'CTR and CVR optimization'
      ],
      memories: 'The fast-paced agency life and the thrill of seeing our experimental ad sets outperform traditional ones.',
      color: 'purple',
      image: 'https://picsum.photos/seed/publicis/800/600'
    }
  ];

  const skills = {
    software: ["SQL", "Python", "R", "Tableau", "Advanced Excel", "Google Analytics", "SEMrush"],
    method: ["A/B Testing", "Regression", "Segmentation", "Forecasting", "LDA Analysis", "Product Perception Space Modeling"]
  };

  return (
    <div className="min-h-screen selection:bg-white/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-lg font-light tracking-tighter"
        >
          TINGFANG <span className="font-bold text-white">CHEN</span>
        </motion.div>
        <div className="flex gap-8 text-xs uppercase tracking-widest font-medium text-white/60">
          {view === 'portfolio' ? (
            <>
              <a href="#projects" className="hover:text-white transition-colors">PROJECT</a>
              <a href="#life" className="hover:text-white transition-colors">LIFE</a>
              <a href="#timeline" className="hover:text-white transition-colors">TIMELINE</a>
              <a href="#education" className="hover:text-white transition-colors">EDUCATION</a>
              <a href="#skills" className="hover:text-white transition-colors">SKILLS</a>
            </>
          ) : (
            <button onClick={() => {
              setView('portfolio');
              setSelectedMilestone(null);
              setSelectedProject(null);
            }} className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <ArrowLeft className="w-3 h-3" /> BACK TO PORTFOLIO
            </button>
          )}
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {view === 'portfolio' ? (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden border-b border-white/5">
              {/* Tech Background Elements */}
              <motion.div 
                style={{ y: bgParallax }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#7c3aed08_0%,transparent_50%)]" />
                
                {/* Scanning Line Hero */}
                <motion.div 
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[1px] bg-purple-500/10 z-0"
                />

                {/* Corner Coordinates */}
                <div className="absolute top-12 left-12 font-mono text-[8px] text-white/20 tracking-widest uppercase">
                  LAT: 35.9940° N <br />
                  LONG: 78.8986° W
                </div>
                <div className="absolute top-12 right-12 font-mono text-[8px] text-white/20 tracking-widest uppercase text-right">
                  STATUS: OPERATIONAL <br />
                  VER: 2.0.4-STABLE
                </div>
              </motion.div>

              <motion.div 
                style={{ opacity: heroOpacity, scale: heroScale, y: heroTranslateY }}
                className="relative z-10 text-center max-w-4xl"
              >
                <Reveal delay={0.2}>
                  <div className="mb-6 inline-block px-4 py-1 rounded-full glass text-[10px] uppercase tracking-[0.3em] text-purple-400 font-bold border border-purple-500/20">
                    Data Analytics & Product Management
                  </div>
                </Reveal>
                
                <Reveal delay={0.3}>
                  <h1 className="text-7xl md:text-[10rem] font-light tracking-[-0.05em] mb-8 leading-[0.8] font-mono italic">
                    Crafting Insights <br />
                    <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-purple-600 not-italic tracking-tighter">
                      Through Data.
                    </span>
                  </h1>
                </Reveal>

                <Reveal delay={0.4}>
                  <p className="text-lg md:text-xl text-white/40 font-light max-w-2xl mx-auto mb-12">
                    Duke University MSQM Candidate. Specialized in turning complex datasets into strategic business growth and product excellence.
                  </p>
                </Reveal>
                
                <Reveal delay={0.5}>
                  <div className="flex flex-wrap justify-center gap-6">
                    <a href="mailto:tc439@duke.edu" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                      <Mail className="w-4 h-4" /> tc439@duke.edu
                    </a>
                    <a href="https://linkedin.com/in/tingfang-chen/" target="_blank" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                      <Linkedin className="w-4 h-4" /> LinkedIn
                    </a>
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <MapPin className="w-4 h-4" /> Durham, NC
                    </div>
                  </div>
                </Reveal>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-purple-500/20"
              >
                <div className="w-[1px] h-12 bg-gradient-to-b from-purple-500/30 to-transparent mx-auto" />
              </motion.div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-32 w-full bg-white/[0.02]">
              <div className="max-w-6xl mx-auto px-6">
                <SectionTitle>Featured Projects</SectionTitle>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {projects.map((proj, idx) => (
                    <Reveal key={proj.id} delay={idx * 0.1}>
                      <div 
                        className="group relative overflow-hidden border border-white/5 bg-black/40 cursor-pointer h-[260px] p-6 flex flex-col justify-between transition-all duration-500 hover:bg-white/[0.03]"
                        onClick={() => {
                          setSelectedProject(proj);
                          setProjectPage(0);
                          setView('project-detail');
                        }}
                      >
                        {/* Tech Grid Overlay */}
                        <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />
                        
                        <div className="relative z-10">
                          <div className="h-8 mb-4">
                            {proj.label && (
                              <div className="inline-block glass px-3 py-1 rounded-full text-[8px] uppercase tracking-widest text-white/60 font-bold border border-white/10">
                                {proj.label}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 mb-3 h-12">
                            <proj.icon className="w-6 h-6 text-purple-400/60 group-hover:text-purple-300 transition-colors shrink-0" />
                            <h3 className="text-xl font-light tracking-tighter uppercase font-mono leading-tight">
                              {proj.title}
                            </h3>
                          </div>
                          
                          <p className="text-[10px] font-mono text-white/30 mb-4 uppercase tracking-wider leading-relaxed group-hover:text-white/50 transition-colors line-clamp-3">
                            {proj.desc}
                          </p>
                        </div>

                        <div className="relative z-10 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[10px] font-mono text-white/20 uppercase tracking-widest group-hover:text-purple-400 transition-colors">
                            Explore <ChevronRight className="w-3 h-3" />
                          </div>
                          <div className="font-mono text-[8px] text-white/10 tracking-tighter">
                            PROJ_0{idx + 1}
                          </div>
                        </div>

                        {/* Corner Accent */}
                        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/0 group-hover:border-white/20 transition-all duration-500" />
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            {/* Personal Life Section */}
            <section id="life" className="py-32 w-full">
              <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-12 md:gap-20">
                  {/* Left Side: Title */}
                  <div className="md:w-1/4">
                    <div className="sticky top-32">
                      <div className="flex flex-col gap-1 mb-6">
                        <div className="h-[1px] w-12 bg-purple-500/30" />
                        <div className="h-[1px] w-8 bg-purple-500/10" />
                      </div>
                      <h2 className="text-4xl md:text-5xl font-light tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-purple-200 to-purple-500/40 leading-none mb-6">
                        Life & <br /> Perspectives
                      </h2>
                      <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] leading-relaxed">
                        Capturing moments, exploring tech, and finding balance through movement and companionship.
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Photos Grid */}
                  <div className="flex-1">
                    <Reveal>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {lifeItems.map((item, idx) => (
                          <motion.div
                            key={item.id}
                            whileHover={{ y: -10 }}
                            className="group relative aspect-[4/5] overflow-hidden border border-white/5 bg-black/40 cursor-pointer"
                            onClick={() => setLightboxImage(item.img)}
                          >
                            <img 
                              src={item.img} 
                              alt={item.title} 
                              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              <div className="flex items-center gap-3 mb-2">
                                <item.icon className="w-5 h-5 text-white" />
                                <h3 className="text-lg font-medium font-mono uppercase tracking-tight text-white">
                                  {item.title}
                                </h3>
                              </div>
                              <p className="text-[10px] font-mono text-white/60 uppercase tracking-wider line-clamp-2">
                                {item.desc}
                              </p>
                            </div>

                            <div className="absolute top-4 right-4 font-mono text-[8px] text-white/20 tracking-tighter">
                              LIFE_NODE_0{idx + 1}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </Reveal>
                  </div>
                </div>
              </div>
            </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-32 w-full border-t border-white/5">
        <div className="px-6 max-w-6xl mx-auto">
          <SectionTitle>Growth Journey</SectionTitle>
          
          <div className="border border-white/5 bg-white/[0.01]">
            {milestones.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 0.1}>
                <motion.div
                  onClick={() => {
                    if (item.id === 'brandstorm') {
                      setSelectedProject(projects.find(p => p.id === 'brandstorm'));
                      setProjectPage(0);
                      setView('project-detail');
                    } else {
                      setSelectedMilestone(item);
                      setView('milestone-detail');
                    }
                  }}
                  className={`group flex flex-col md:flex-row items-start md:items-center gap-6 p-8 cursor-pointer transition-all duration-500 border-b border-white/5 last:border-b-0 hover:bg-white/[0.03] relative overflow-hidden`}
                >
                  {/* Background Image on Hover */}
                  <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                    <img src={item.image} alt="" className="w-full h-full object-cover grayscale" />
                  </div>

                  <div className="relative z-10 w-full md:w-32 shrink-0">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-white/40">
                      {item.date}
                    </span>
                  </div>

                  <div className="relative z-10 flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                      <h3 className="text-xl font-medium group-hover:text-white transition-colors font-mono tracking-tight">{item.organization}</h3>
                      {item.industry && (
                        <span className="text-[8px] font-bold text-purple-400/40 uppercase tracking-tighter px-2 py-0.5 border border-purple-500/20 rounded font-mono">
                          {item.industry}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold font-mono">{item.title}</p>
                  </div>

                  <div className="relative z-10 w-full md:w-64">
                    <p className="text-[10px] text-white/40 leading-relaxed line-clamp-2 group-hover:text-white/60 transition-colors font-mono">
                      {item.shortDesc}
                    </p>
                  </div>

                  <div className="relative z-10 shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                    <ChevronRight className="w-5 h-5 text-white/60" />
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 w-full border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle>Technical Expertise</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 border border-white/5">
            <Reveal direction="right">
              <div className="p-12 border-b md:border-b-0 md:border-r border-white/5 hover:bg-white/[0.02] transition-colors group">
                <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/60 mb-12 flex items-center gap-3 font-mono">
                  <Code2 className="w-4 h-4" /> Software & Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.software.map(s => (
                    <span key={s} className="px-3 py-1 bg-white/5 border border-purple-500/10 text-[8px] uppercase tracking-widest font-bold text-purple-400/40 group-hover:text-purple-300/60 transition-colors font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal direction="left">
              <div className="p-12 hover:bg-white/[0.02] transition-colors group">
                <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/60 mb-12 flex items-center gap-3 font-mono">
                  <Database className="w-4 h-4" /> Methodologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.method.map(m => (
                    <span key={m} className="px-3 py-1 bg-white/5 border border-purple-500/10 text-[8px] uppercase tracking-widest font-bold text-purple-400/40 group-hover:text-purple-300/60 transition-colors font-mono">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-32 px-6 max-w-6xl mx-auto">
        <SectionTitle>Education Background</SectionTitle>
        <div className="grid md:grid-cols-2 border border-white/5">
          <Reveal direction="right">
            <div className="p-12 border-b md:border-b-0 md:border-r border-white/5 hover:bg-white/[0.02] transition-colors group relative overflow-hidden h-full">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700">
                <img src="https://picsum.photos/seed/duke-uni/800/600" alt="" className="w-full h-full object-cover grayscale" />
              </div>
              <div className="relative z-10">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-white/5 border border-purple-500/10">
                    <GraduationCap className="w-6 h-6 text-purple-400/60" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-light tracking-tight mb-1 font-mono">Duke University</h3>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-6 font-mono">The Fuqua School of Business</p>
                    <p className="text-[10px] text-white/60 leading-relaxed max-w-xs font-mono uppercase tracking-wider">Master of Science in Quantitative Management: Business Analytics, Marketing Track</p>
                    <p className="text-[10px] font-mono text-white/20 mt-8 uppercase tracking-[0.2em]">Expected May 2026 • Durham, NC</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left">
            <div className="p-12 hover:bg-white/[0.02] transition-colors group relative overflow-hidden h-full">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700">
                <img src="https://picsum.photos/seed/nankai-uni/800/600" alt="" className="w-full h-full object-cover grayscale" />
              </div>
              <div className="relative z-10">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-white/5 border border-purple-500/10">
                    <GraduationCap className="w-6 h-6 text-purple-400/60" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-light tracking-tight mb-1 font-mono">Nankai University</h3>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-6 font-mono">Bachelor of Business Administration, Marketing</p>
                    <div className="space-y-2">
                      <p className="text-[10px] text-white/60 font-mono uppercase tracking-wider">GPA: 3.89/4.0</p>
                      <p className="text-[10px] text-white/60 font-mono uppercase tracking-wider">Academic Excellence Scholarship (Top 3%)</p>
                    </div>
                    <p className="text-[10px] font-mono text-white/20 mt-8 uppercase tracking-[0.2em]">Jun 2025 • Tianjin, China</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Photography Section */}

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-8">Let's connect and build something <span className="italic text-white/60">meaningful</span>.</h2>
          <div className="flex justify-center gap-8 mb-12">
            <a href="mailto:tc439@duke.edu" className="p-4 rounded-full glass hover:bg-white/10 transition-colors">
              <Mail className="w-6 h-6 text-purple-400" />
            </a>
            <a href="https://linkedin.com/in/tingfang-chen/" target="_blank" className="p-4 rounded-full glass hover:bg-white/10 transition-colors">
              <Linkedin className="w-6 h-6 text-purple-400" />
            </a>
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">
            © 2026 TINGFANG CHEN • US PERMANENT RESIDENT
          </p>
        </div>
      </footer>
    </motion.div>
  ) : view === 'milestone-detail' && selectedMilestone ? (
    <motion.div
      key="milestone-detail"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4 }}
      className="pt-32 pb-20 px-6 max-w-4xl mx-auto"
    >
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="px-4 py-1 rounded-full glass text-[10px] uppercase tracking-widest font-bold text-purple-400">
            {selectedMilestone.type}
          </span>
          {selectedMilestone.industry && (
            <>
              <span className="text-white/20">•</span>
              <span className="px-4 py-1 rounded-full bg-white/5 text-[10px] uppercase tracking-widest font-bold text-purple-400/60">
                {selectedMilestone.industry}
              </span>
            </>
          )}
          <span className="text-white/20">•</span>
          <span className="text-xs font-mono text-white/40">{selectedMilestone.date}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-4">{selectedMilestone.organization}</h1>
        <p className="text-2xl text-white/60 font-light uppercase tracking-widest">{selectedMilestone.title}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          <section>
            <h3 className="text-xs uppercase tracking-[0.3em] text-purple-400/40 mb-6 flex items-center gap-2 font-mono">
              <History className="w-3 h-3" /> The Story
            </h3>
            <p className="text-lg text-white/80 leading-relaxed font-light">
              {selectedMilestone.fullStory}
            </p>
          </section>

          <section>
            <h3 className="text-xs uppercase tracking-[0.3em] text-purple-400/40 mb-6 flex items-center gap-2 font-mono">
              <Award className="w-3 h-3" /> Key Growth & Gains
            </h3>
            <ul className="grid grid-cols-1 gap-4">
              {selectedMilestone.growth.map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-4 rounded-2xl glass border-white/5">
                  <div className="mt-1 p-1 rounded-full bg-purple-500/10">
                    <Zap className="w-3 h-3 text-purple-400/60" />
                  </div>
                  <span className="text-white/70">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="space-y-8">
          <GlassCard className="bg-white/[0.02] border-white/10">
            <h3 className="text-xs uppercase tracking-[0.3em] text-purple-400/40 mb-6 flex items-center gap-2 font-mono">
              <Sparkles className="w-3 h-3" /> Personal Memory
            </h3>
            <p className="text-sm text-white/60 leading-relaxed italic">
              "{selectedMilestone.memories}"
            </p>
          </GlassCard>

          <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-xs uppercase tracking-[0.3em] text-purple-400/40 mb-4 flex items-center gap-2 font-mono">
              <Flag className="w-3 h-3" /> Location
            </h3>
            <div className="flex items-center gap-2 text-white/60">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{selectedMilestone.location}</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-20 mt-20 border-t border-white/5 text-center">
        <button 
          onClick={() => {
            setView('portfolio');
            setSelectedMilestone(null);
            setSelectedProject(null);
          }}
          className="px-8 py-3 rounded-full glass border-white/20 text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
        >
          Return to Journey
        </button>
      </footer>
    </motion.div>
  ) : view === 'project-detail' && selectedProject ? (
    <motion.div
      key="project-detail"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-20 px-6 max-w-6xl mx-auto"
    >
      <div className="text-center mb-20 relative">
        {selectedProject.label && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 glass px-6 py-2 rounded-full text-[10px] uppercase tracking-widest text-purple-400 font-bold border border-purple-500/20"
          >
            {selectedProject.label}
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block p-4 rounded-full glass mb-6"
        >
          {React.createElement(selectedProject.icon, { className: "w-8 h-8 text-purple-400" })}
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-6 uppercase font-mono">{selectedProject.title}</h1>
        <p className="text-white/40 max-w-xl mx-auto font-mono text-xs uppercase tracking-wider">{selectedProject.desc}</p>
      </div>

      {/* Project Content */}
      <div className="space-y-12">
        {selectedProject.id === 'app' ? (
          <div className="space-y-12">
            <div className="flex justify-center">
              <a 
                href={selectedProject.detail.link} 
                target="_blank" 
                className="px-12 py-4 rounded-full glass border-white/20 text-[10px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all flex items-center gap-3 font-bold"
              >
                Launch Application <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <GlassCard className="p-0 overflow-hidden border-white/10 aspect-[3/2] bg-black/40">
              <video 
                src={selectedProject.detail.video} 
                controls 
                className="w-full h-full object-cover"
                poster={appImage}
              />
            </GlassCard>
          </div>
        ) : selectedProject.id === 'dashboard' ? (
          <div className="flex flex-col gap-12">
            {selectedProject.detail.images.map((img: string, i: number) => (
              <GlassCard key={i} className="p-0 overflow-hidden border-white/10 group bg-black/40">
                <img 
                  src={img} 
                  alt={`Dashboard ${i + 1}`} 
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 glass px-3 py-1 rounded-full text-[8px] uppercase tracking-widest font-mono">
                  DASHBOARD_VIEW_0{i + 1}
                </div>
              </GlassCard>
            ))}
          </div>
        ) : selectedProject.detail.pages ? (
          <div className="flex flex-col gap-20">
            {selectedProject.detail.pages.map((page: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="p-0 overflow-hidden border-white/10 relative group bg-black/40">
                  <img 
                    src={page.img} 
                    alt={page.title} 
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="glass px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold font-mono inline-block mb-3">
                      {page.title}
                    </div>
                    <div className="text-[10px] text-white/40 font-mono uppercase tracking-widest">
                      PHASE_0{i + 1}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        ) : null}
      </div>

      <footer className="py-20 mt-20 border-t border-white/5 text-center">
        <button 
          onClick={() => {
            setView('portfolio');
            setSelectedProject(null);
          }}
          className="px-12 py-4 rounded-full glass border-white/10 text-[10px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all font-bold"
        >
          Return to Portfolio
        </button>
      </footer>
    </motion.div>
  ) : null}
</AnimatePresence>
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-8 right-8 p-3 rounded-full glass border-white/10 hover:bg-white/10 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImage(null);
              }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>
            <motion.img
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              src={lightboxImage}
              alt="Full view"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
