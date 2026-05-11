/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Users, 
  BarChart3, 
  Code2, 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Plus,
  Target,
  Rocket,
  Lightbulb,
  CheckCircle2,
  BrainCircuit,
  Globe,
  Settings,
  Code,
  UserPlus,
  Briefcase,
  Shield,
  Bell,
  Cpu,
  Database,
  Layers,
  Zap,
  Triangle,
  BarChart,
  Inbox,
  Package,
  Search,
  Lock
} from 'lucide-react';

// --- Types ---
type Page = 'home' | 'about' | 'team' | 'careers' | 'portfolio' | 'contact' | 'use-cases' | 'services';

interface DetailSubItem {
  title: string;
  detail: string;
  example: string;
}

interface DetailItem {
  title: string;
  desc: string;
  icon?: React.ReactNode;
  result?: string;
  tags?: string[];
  image?: string;
  longDesc?: string;
  subItems?: (string | DetailSubItem)[];
  example?: string;
  isJob?: boolean;
  color?: string;
  iconColor?: string;
  modalBg?: string;
  accent?: string;
  problem?: string;
  solution?: string;
  industry?: string;
  process?: string;
  deepDive?: {
    overview?: string;
    sections: {
      title: string;
      explanation: string;
      list?: string[];
      example?: string;
      businessValue?: string[];
      icon?: string;
    }[];
  };
}

// --- Shared Components ---

const Modal = ({ item, onClose, onApply }: { item: DetailItem | null; onClose: () => void; onApply?: () => void }) => {
  const [showDeepDive, setShowDeepDive] = useState(false);

  if (!item) return null;

  const DeepDiveView = () => {
    if (!item.deepDive) return null;
    return (
      <div className="space-y-12 pb-20">
        {item.deepDive.overview && (
          <div className="bg-purple-50 p-8 rounded-[2rem] border border-purple-100">
            <h4 className="text-xl font-display font-bold text-slate-900 mb-4 uppercase tracking-tight">Overview</h4>
            <p className="text-slate-700 leading-relaxed text-lg">{item.deepDive.overview}</p>
          </div>
        )}
        <div className="grid grid-cols-1 gap-10">
          {item.deepDive.sections.map((section, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-brand-purple rounded-full opacity-30 group-hover:opacity-100 transition-opacity" />
              <div className="pl-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{section.icon || '🚀'}</span>
                  <h4 className="text-2xl font-display font-bold text-slate-800 tracking-tight">{section.title}</h4>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="text-[10px] font-bold text-brand-purple uppercase tracking-[0.2em] mb-4">Detailed Explanation</h5>
                    <p className="text-slate-600 text-lg leading-relaxed">{section.explanation}</p>
                  </div>

                  {section.list && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {section.list.map((li, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <CheckCircle2 size={16} className="text-brand-purple shrink-0" />
                          <span className="text-slate-700 font-medium text-sm">{li}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.example && (
                    <div className="bg-purple-50/50 p-6 rounded-3xl border border-purple-100/50">
                      <div className="flex items-center gap-2 text-brand-purple font-bold text-[10px] uppercase tracking-widest mb-3">
                        <Lightbulb size={14} /> Example Scenario
                      </div>
                      <p className="text-slate-800 font-medium leading-relaxed italic">
                        {section.example}
                      </p>
                    </div>
                  )}

                  {section.businessValue && (
                    <div>
                      <h5 className="text-[10px] font-bold text-brand-purple uppercase tracking-[0.2em] mb-4">Business Value</h5>
                      <div className="flex flex-wrap gap-2">
                        {section.businessValue.map((v, i) => (
                          <span key={i} className="px-5 py-2.5 bg-brand-purple/10 text-brand-purple rounded-full text-xs font-bold border border-brand-purple/20 uppercase tracking-wider">
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => setShowDeepDive(false)}
          className="flex items-center gap-2 text-slate-400 font-bold text-sm uppercase tracking-widest hover:text-brand-purple transition-colors"
        >
          <ArrowRight className="rotate-180" size={16} /> Back to Summary
        </button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-500 hover:bg-brand-purple hover:text-white transition-all z-20 shadow-lg"
        >
          <X size={24} />
        </button>

        <div className="overflow-y-auto custom-scrollbar">
          {!showDeepDive && item.image && (
            <div className="w-full aspect-[21/9] overflow-hidden relative">
               <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
               <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            </div>
          )}
          
          <div className={`p-8 lg:p-14 ${!showDeepDive && item.image ? '-mt-10' : ''} relative z-10 rounded-t-[2.5rem] ${item.modalBg || 'bg-white'}`}>
            <AnimatePresence mode="wait">
              {!showDeepDive ? (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="flex items-center gap-5 mb-8">
                    {item.icon && (
                      <div className="w-14 h-14 bg-brand-purple/10 text-brand-purple rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                        {React.isValidElement(item.icon) 
                          ? React.cloneElement(item.icon as React.ReactElement, { size: 32 })
                          : <span className="text-2xl">{item.icon}</span>
                        }
                      </div>
                    )}
                    {item.industry && (
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                        <Globe size={12} /> {item.industry}
                      </div>
                    )}
                    <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 tracking-tight">{item.title}</h2>
                  </div>
                  
                  <div className="space-y-8">
                    {item.problem && (
                      <section>
                        <h4 className="text-[10px] font-bold text-brand-purple uppercase tracking-[0.2em] mb-3">The Challenge</h4>
                        <div className="p-6 bg-purple-50 border border-purple-100 rounded-3xl">
                          <p className="text-slate-700 text-lg leading-relaxed font-medium italic">
                            "{item.problem}"
                          </p>
                        </div>
                      </section>
                    )}

                    {item.solution && (
                      <section>
                        <h4 className="text-[10px] font-bold text-brand-purple uppercase tracking-[0.2em] mb-3">Our Solution</h4>
                        <div className="p-6 bg-purple-50 border border-purple-100 rounded-3xl">
                          <p className="text-slate-800 text-lg leading-relaxed font-bold">
                            {item.solution}
                          </p>
                        </div>
                      </section>
                    )}

                    {!item.problem && !item.solution && (
                      <section>
                        <h4 className="text-[10px] font-bold text-brand-purple uppercase tracking-[0.2em] mb-3">Overview</h4>
                        <p className="text-slate-600 text-lg leading-relaxed font-normal">
                          {item.longDesc || item.desc}
                        </p>
                      </section>
                    )}

                    {item.subItems && item.subItems.length > 0 && (
                      <div className="space-y-6">
                        {item.subItems.map((sub, idx) => {
                          const isObj = typeof sub !== 'string';
                          const s = isObj ? sub as DetailSubItem : { title: sub as string, detail: '', example: '' };
                          return (
                            <div key={idx} className="p-8 bg-white/60 border border-black/5 rounded-[2rem] backdrop-blur-sm shadow-sm transition-all hover:shadow-md">
                              <h5 className="font-display font-bold text-xl text-slate-900 mb-3 tracking-tight">{s.title}</h5>
                              {s.detail && <p className="text-slate-500 text-base leading-relaxed mb-4">{s.detail}</p>}
                              {s.example && (
                                  <div className="bg-brand-purple/5 border border-brand-purple/10 p-4 rounded-2xl flex items-start gap-3">
                                    <Zap size={16} className="text-brand-purple mt-1 shrink-0" />
                                    <p className="text-brand-purple text-sm font-medium">{s.example}</p>
                                  </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {item.process && (
                      <section>
                        <h4 className="text-[10px] font-bold text-brand-purple uppercase tracking-[0.2em] mb-4">Implementation Workflow</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {item.process.split(' | ').map((step, idx) => (
                            <div key={idx} className="p-4 bg-purple-50/50 border border-purple-100 rounded-2xl flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-brand-purple text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {idx + 1}
                              </div>
                              <p className="text-slate-800 text-sm font-bold leading-tight">{step}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {item.example && (
                      <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                        <h4 className="text-[10px] font-bold text-brand-pink uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                          <Lightbulb size={14} /> Real-World Example
                        </h4>
                        <p className="text-slate-700 leading-relaxed">
                          "{item.example}"
                        </p>
                      </section>
                    )}

                    {item.result && (
                      <section className="bg-brand-blue/5 border border-brand-blue/10 p-6 rounded-2xl">
                        <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block mb-2">Key Result</span>
                        <p className="text-slate-800 font-bold text-xl tracking-tight">{item.result}</p>
                      </section>
                    )}

                    {item.tags && (
                      <div className="flex flex-wrap gap-2 pt-4">
                        {item.tags.map(tag => (
                          <span key={tag} className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-xs font-bold text-slate-500 uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-14 pt-8 border-t border-slate-100 flex justify-between items-center gap-4">
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-widest hidden sm:block">Trinexiss Intelligence Hub</p>
                    <div className="flex gap-4 ml-auto">
                      <button 
                        onClick={onClose}
                        className="px-8 py-3 rounded-full border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all text-sm mb-safe"
                      >
                        Close
                      </button>
                      {item.isJob && (
                        <button 
                          onClick={onApply}
                          className="btn-gradient !px-10 shadow-xl shadow-brand-purple/20 mb-safe"
                        >
                          Apply Now
                        </button>
                      )}
                      {!item.isJob && item.deepDive && (
                        <button 
                          onClick={() => setShowDeepDive(true)}
                          className="btn-gradient !px-10 mb-safe"
                        >
                          Explore More
                        </button>
                      )}
                      {!item.isJob && !item.deepDive && (
                        <button 
                          onClick={onClose}
                          className="btn-gradient !px-10 mb-safe"
                        >
                          Explore More
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="deepdive"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex items-center gap-5 mb-8">
                    {item.icon && (
                      <div className="w-14 h-14 bg-brand-purple/10 text-brand-purple rounded-2xl flex items-center justify-center shrink-0">
                        {React.isValidElement(item.icon)
                          ? React.cloneElement(item.icon as React.ReactElement, { size: 32 })
                          : <span className="text-2xl">{item.icon}</span>
                        }
                      </div>
                    )}
                    <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 tracking-tight">{item.title}</h2>
                  </div>
                  <DeepDiveView />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Components ---
const Logo = ({ className = "w-10 h-10", iconClassName = "w-6 h-6" }: { className?: string, iconClassName?: string }) => (
  <div className={`${className} bg-slate-950 rounded-xl flex items-center justify-center shadow-lg border border-slate-800 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
    <svg viewBox="0 0 100 100" className={iconClassName} fill="white">
      <path d="M48 12 L5 88 L32 88 L52 48 Z" />
      <path d="M54 18 L95 88 L68 88 L48 52 Z" />
    </svg>
  </div>
);

const Navbar = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'Services', value: 'services' },
    { label: 'Use Cases', value: 'use-cases' },
    { label: 'Portfolio', value: 'portfolio' },
    { label: 'About Us', value: 'about' },
    { label: 'Team', value: 'team' },
    { label: 'Careers', value: 'careers' },
    { label: 'Contact', value: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F7FF]/90 backdrop-blur-lg border-b border-purple-100 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setPage('home')}
        >
          <Logo className="w-10 h-10" iconClassName="w-5 h-5" />
          <span className="font-display font-bold text-xl tracking-tight text-slate-900">
            Trinexiss <span className="text-slate-900">Technologies</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setPage(item.value);
                window.scrollTo(0, 0);
              }}
              className={`text-sm font-medium transition-colors hover:text-brand-purple ${currentPage === item.value ? 'text-brand-purple' : 'text-slate-600'}`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => setPage('contact')}
            className="btn-gradient !py-2 !px-6 text-sm"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-800" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 md:hidden flex flex-col gap-4 shadow-xl"
          >
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setPage(item.value);
                  setIsOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`text-lg font-medium text-left ${currentPage === item.value ? 'text-brand-purple' : 'text-slate-600'}`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setPage }: { setPage: (p: Page) => void }) => (
  <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-3 mb-6 group cursor-pointer" onClick={() => { setPage('home'); window.scrollTo(0,0); }}>
          <Logo className="w-8 h-8" iconClassName="w-4 h-4" />
          <span className="font-display font-bold text-lg text-slate-900 uppercase">Trinexiss</span>
        </div>
        <p className="text-slate-700 text-sm leading-relaxed mb-6">
          Trinexiss Technologies is dedicated to empowering businesses with the right talent and innovative AI solutions.
        </p>
      </div>

      <div>
        <h4 className="font-display font-bold text-slate-900 mb-6">Quick Links</h4>
        <ul className="space-y-3">
          {['Home', 'About Us', 'Careers', 'Portfolio', 'Contact'].map((link) => (
            <li key={link}>
              <button 
                onClick={() => {
                  setPage(link.toLowerCase().replace(' ', '-') as Page);
                  window.scrollTo(0, 0);
                }}
                className="text-slate-500 text-sm hover:text-brand-purple transition-colors"
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-display font-bold text-slate-900 mb-6">Services</h4>
        <ul className="space-y-3">
          {['AI Automation', 'IT Staffing', 'SaaS Development', 'Data Analytics'].map((link) => (
            <li key={link} className="text-slate-500 text-sm">{link}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-display font-bold text-slate-900 mb-6">Contact Us</h4>
        <ul className="space-y-4">
          <li className="flex items-start gap-3 text-sm text-slate-500">
            <MapPin size={18} className="text-brand-blue shrink-0" />
            <span>Office No 1044, Gera's Imperium Rise, Hinjewadi Phase 2, Maharashtra 411057</span>
          </li>
          <li className="flex items-center gap-3 text-sm text-slate-500">
            <Mail size={18} className="text-brand-blue shrink-0" />
            <span>info@trinexiss.com</span>
          </li>
          <li className="flex items-center gap-3 text-sm text-slate-500">
            <Phone size={18} className="text-brand-blue shrink-0" />
            <span>+91 7774051885</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-200 text-center text-sm text-slate-400">
      © {new Date().getFullYear()} Trinexiss Technologies. All rights reserved.
    </div>
  </footer>
);

// --- Page Components ---
const HomePage = ({ setPage, onItemClick }: { setPage: (p: Page) => void, onItemClick: (item: DetailItem) => void }) => {
  const [selectedWho, setSelectedWho] = useState<number | null>(null);

  const whoWeAreCards = [
    {
      title: 'HR & Staffing Excellence',
      desc: 'End-to-end talent acquisition',
      icon: <Users className="text-amber-500" />,
      detail: 'Strategic recruitment across 10+ tech stacks and sectors, providing verified elite talent to global enterprises. We handle the entire lifecycle from sourcing to onboarding.'
    },
    {
      title: 'AI & Automation',
      desc: 'Custom AI Agents & n8n workflows',
      icon: <Zap className="text-orange-500" />,
      detail: 'Building high-performance neural workflows to eliminate repetitive tasks and scale business productivity using the latest AI frameworks and agentic patterns.'
    },
    {
      title: 'Analytics & Dashboards',
      desc: 'Power BI, Looker Studio',
      icon: <BarChart className="text-emerald-500" />,
      detail: 'Converting fragmented data into actionable intelligence through high-fidelity visual monitoring tools and real-time business metrics tracking.'
    },
    {
      title: 'SaaS Development',
      desc: 'React, Node.js, Firebase platforms',
      icon: <Globe className="text-brand-blue" />,
      detail: 'End-to-end scalable application architecture focusing on security, performance, and user-centric design for modern enterprise-grade software.'
    }
  ];

  const services: DetailItem[] = [
    { 
      icon: <Bot className="text-brand-purple" />, 
      title: 'AI & Automation', 
      desc: 'Smart workflows using Zapier, n8n & custom AI tools.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
      longDesc: 'AI + Automation Real Use Cases (for your website)',
      modalBg: 'bg-purple-50',
      subItems: [
        { title: '1. Customer Support Automation', detail: 'Auto-reply using AI chatbot and automatic Ticket creation in Zendesk.', example: 'Maintains 24/7 client engagement.' },
        { title: '2. Lead Generation & Management', detail: 'Capture leads from website, Auto-store in CRM, and Send follow-up emails.', example: 'Maximizes conversion rates.' },
        { title: '3. Marketing Automation', detail: 'Auto-run email campaigns, Schedule social media posts, and Track performance.', example: 'Streamlines brand outreach.' },
        { title: '4. Data & Reporting', detail: 'Collect data automatically, Generate dashboards (Looker Studio), and Send daily reports.', example: 'Actionable business intelligence.' },
        { title: '5. HR Automation', detail: 'Resume screening using AI and Auto-send interview emails.', example: 'Speeds up the hiring cycle.' }
      ],
      result: 'Average 300% ROI in the first quarter.',
      tags: ['AI Agents', 'n8n', 'Zapier', 'Workflow Sync']
    },
    { 
      icon: <Users className="text-brand-blue" />, 
      title: 'IT Staffing', 
      desc: 'Hire skilled developers & tech experts across stacks.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
      longDesc: 'IT Staffing is the process of hiring skilled developers and technology professionals based on business requirements—either for short-term projects or long-term roles.',
      modalBg: 'bg-purple-50',
      subItems: [
        { 
          title: '1. Full Stack Developers Hiring', 
          detail: 'We provide experienced developers across technologies. Frontend: HTML, CSS, JavaScript, React. Backend: Node.js, Java, Python. Database: MySQL, MongoDB.', 
          example: '👉 Example: A startup needs a website → We provide a full stack developer who builds both frontend + backend.' 
        },
        { 
          title: '2. Specialized Tech Experts', 
          detail: 'We offer experts in: AI & Machine Learning, Cyber Security, Cloud Computing, Data Analytics.', 
          example: '👉 Example: A company wants AI chatbot → We provide an AI engineer to build it.' 
        },
        { 
          title: '3. Flexible Hiring Models', 
          detail: 'Short-term (Project-based), Long-term (Permanent hiring), Contract-based.', 
          example: '👉 Example: Company needs developer for 3 months → We provide contract developer.' 
        },
        { 
          title: '4. Quick Hiring Process', 
          detail: 'We reduce hiring time by: Pre-screening candidates, Skill testing, Matching exact requirements.', 
          example: '👉 Example: Instead of 1 month hiring → we provide candidate in few days ⚡' 
        }
      ],
      result: 'Reduced hiring time by 60%.',
      tags: ['Verified Network', 'Staffing', 'Evaluation']
    },
    { 
      icon: <BarChart3 className="text-brand-pink" />, 
      title: 'Data Analytics', 
      desc: 'Interactive dashboards using Looker Studio & Power BI.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      longDesc: 'Data Analytics is the process of collecting, analyzing, and visualizing data to help businesses make better decisions. Instead of looking at raw data (numbers, Excel sheets), we convert it into interactive dashboards and reports that are easy to understand.',
      modalBg: 'bg-purple-50',
      subItems: [
        { 
          title: '1. Data Collection & Integration', 
          detail: 'We collect data from multiple sources: Google Sheets, CRM tools, Website analytics, APIs. Then connect it to tools like Looker Studio or Power BI.', 
          example: '👉 Connects fragmented data streams into one source.' 
        },
        { 
          title: '2. Data Cleaning & Processing', 
          detail: 'Remove duplicate data, Fix errors, Organize data properly.', 
          example: '👉 Ensures accurate reporting and reliability.' 
        },
        { 
          title: '3. Dashboard Creation', 
          detail: 'Users can filter data, select dates, and view insights easily through clean visual interfaces.', 
          example: '👉 Visual insights (easy to understand).' 
        },
        { 
          title: '4. Real-Time Reporting', 
          detail: 'Dashboards update automatically, removing the need for manual reports.', 
          example: '👉 Saves time & improves decision-making.' 
        },
        { 
          title: '🔥 Key Features', 
          detail: '✔ User-friendly dashboards, ✔ Real-time data updates, ✔ Custom reports based on business needs, ✔ Visual insights.', 
          example: 'Tools Used: 🔹 Looker Studio (Free, Google integration), 🔹 Microsoft Power BI (Advanced, Data modeling).' 
        }
      ],
      example: 'Scenario: A company runs digital marketing campaigns. Problem: Data is scattered. Solution: We create a dashboard using Looker Studio to unify performance tracking.',
      result: 'Visualized insights for 50+ global clients.',
      tags: ['Looker Studio', 'Power BI', 'SQL Viz']
    },
    { 
      icon: <Code2 className="text-brand-purple" />, 
      title: 'SaaS Development', 
      desc: 'Scalable custom web applications built with modern tech.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      longDesc: 'SaaS (Software as a Service) development is the process of creating cloud-based applications that users can access through a web browser—without installing any software.',
      modalBg: 'bg-purple-50',
      subItems: [
        { 
          title: '1. Custom Web Application Development', 
          detail: 'We build applications based on business needs using technologies like React, Node.js, Java, Python, MongoDB, MySQL.', 
          example: '👉 Fully customized solutions for clients.' 
        },
        { 
          title: '2. Scalable Architecture', 
          detail: 'Applications are designed to handle growing users (100 → 10,000+ users) and data without performance issues.', 
          example: '👉 No performance bottlenecks as business grows.' 
        },
        { 
          title: '3. Cloud-Based Deployment', 
          detail: 'Hosted on cloud platforms (AWS, Google Cloud, etc.). Accessible anytime, anywhere 🌍.', 
          example: '👉 High availability and global reach.' 
        },
        { 
          title: '4. Secure & Reliable Systems', 
          detail: 'Data encryption 🔐, User authentication, and robust Backup & recovery systems.', 
          example: '👉 Enterprise-grade security protocols.' 
        },
        { 
          title: '5. API & Integration Support', 
          detail: 'Connect with tools like CRM, payment gateways, and automation tools like Zapier and n8n.', 
          example: '👉 Seamless connectivity with your software stack.' 
        }
      ],
      result: 'Launched 12 high-impact products in 2024.',
      tags: ['React/Next.js', 'Node', 'Cloud Arch']
    }
  ];

  const diagramNodes = [
    { icon: <Shield size={20} />, label: 'SECURITY', color: 'from-blue-400 to-indigo-500' },
    { icon: <Bell size={20} />, label: 'NOTIFICATIONS', color: 'from-purple-400 to-brand-purple' },
    { icon: <Cpu size={20} />, label: 'PROCESSING', color: 'from-brand-pink to-rose-500' },
    { icon: <Database size={20} />, label: 'DATA SOURCE', color: 'from-emerald-400 to-teal-500' },
    { icon: <Users size={20} />, label: 'CUSTOMER', color: 'from-brand-blue to-cyan-500' },
    { icon: <Zap size={20} />, label: 'WORKFLOW', color: 'from-amber-400 to-orange-500' },
    { icon: <BarChart size={20} />, label: 'ANALYTICS', color: 'from-indigo-400 to-blue-500' },
    { icon: <BrainCircuit size={20} />, label: 'AI TRAINING', color: 'from-brand-purple to-indigo-600' },
  ];

  return (
    <div className="pt-24 bg-transparent relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-brand-pink/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-brand-blue/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 lg:pt-32 pb-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-brand-purple/5 border border-brand-purple/10 rounded-full text-brand-purple text-xs font-bold uppercase tracking-[0.2em] mb-10 shadow-sm backdrop-blur-sm">
              <Zap size={14} className="fill-brand-purple" /> EMPOWERING WOMEN IN TECH
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-display font-bold leading-[1.05] text-slate-900 mb-8 uppercase tracking-tighter">
              AUTONOMOUS <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-500">AI</span> <br />
              SYSTEMS & <span className="text-slate-800 underline decoration-brand-purple decoration-4 underline-offset-4">STRATEGY</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-700 mb-12 leading-relaxed max-w-xl font-normal">
              Architecting high-performance neural workflows for global enterprises through vision and precision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => setPage('contact')}
                className="btn-gradient !px-12 !py-5 text-xl shadow-2xl shadow-brand-purple/30 group"
              >
                REQUEST CONSULTATION
                <ArrowUpRight size={22} className="inline-block ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative h-[600px] flex items-center justify-center lg:mt-0"
          >
            {/* Removed Background Image Card */}

            {/* Diagram Visualization */}
            <div className="relative w-full h-full flex items-center justify-center z-10">
              {/* Outer Ring */}
              <div className="absolute w-[80%] aspect-square border-[1.5px] border-slate-100 rounded-full animate-[spin_60s_linear_infinite]" />
              <div className="absolute w-[85%] aspect-square border border-dotted border-slate-200 rounded-full" />
              
              {/* Center Hub */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="z-20 w-48 h-48 bg-white border-2 border-brand-purple/20 shadow-[0_20px_50px_rgba(108,99,255,0.15)] rounded-[3rem] flex flex-col items-center justify-center group cursor-pointer transition-all"
              >
                <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-brand-purple transition-colors duration-500">
                  <Bot size={44} className="text-brand-purple group-hover:text-white transition-colors" />
                </div>
                <span className="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase group-hover:text-brand-purple transition-colors">AI BOT</span>
              </motion.div>

              {/* Orbiting Nodes */}
              {diagramNodes.map((node, i) => {
                const angle = (i * 45) - 90;
                const radius = 240; 
                return (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    style={{
                      position: 'absolute',
                      transform: `rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)`,
                    }}
                    className="z-10"
                  >
                    <div className="group relative">
                      <div className={`w-28 h-28 bg-white border border-slate-100 shadow-xl rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all hover:border-brand-purple hover:scale-110 hover:-translate-y-2 cursor-pointer`}>
                        <div className={`w-12 h-12 bg-gradient-to-br ${node.color} text-white rounded-xl mb-2 flex items-center justify-center shadow-lg group-hover:shadow-brand-purple/20`}>
                          {node.icon}
                        </div>
                        <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase leading-tight group-hover:text-slate-800 transition-colors">
                          {node.label}
                        </span>
                      </div>
                      
                      {/* Connection Line to center */}
                      <div className="absolute top-1/2 left-1/2 -z-10 w-[180px] h-0.5 bg-gradient-to-r from-transparent via-slate-100 to-transparent origin-left -translate-y-1/2 -translate-x-[200px]" 
                           style={{ transform: `rotate(180deg) translate(20px)` }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-24 bg-[#fff8fa] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-30">
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-pink/10 blur-[120px] rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-pink text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">WHO WE ARE</span>
            <h2 className="text-5xl lg:text-[5.5rem] font-display font-bold text-slate-800 leading-[0.95] mb-12 tracking-tighter">
              Your Extended <br />
              HR & <br />
              Technology <br />
              <span className="text-slate-900 border-b-8 border-brand-purple/20">Partner</span>
            </h2>
            <div className="space-y-8 text-slate-500 text-lg lg:text-xl leading-relaxed max-w-xl">
              <p>
                Trinexiss Technologies is a <span className="text-slate-900 font-bold underline decoration-brand-purple decoration-2 underline-offset-4">Pune-based innovation-driven organization</span> specializing in HR Consulting, IT Recruitment, Staffing Solutions, and Digital Transformation Services.
              </p>
              <p>
                We combine talent acquisition excellence with modern technology capabilities — including AI, automation, and SaaS development — to help businesses grow faster and smarter.
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                We act as your extended HR and Technology partner, enabling you to focus on core business priorities while we handle everything talent and digital.
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-200/30 p-8 lg:p-14 rounded-[3.5rem] border border-slate-200/50 backdrop-blur-md"
          >
            <div className="flex flex-col gap-5">
              {whoWeAreCards.map((card, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedWho(selectedWho === i ? null : i)}
                  className={`p-6 rounded-[2rem] border transition-all cursor-pointer group flex items-start gap-6 shadow-sm ${
                    selectedWho === i ? 'bg-white border-brand-purple shadow-xl shadow-brand-purple/5 translate-x-3' : 'bg-white border-slate-100 hover:border-brand-pink/30 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                    selectedWho === i ? 'bg-brand-purple/10 text-brand-purple' : 'bg-white text-slate-400 group-hover:bg-brand-pink/10 group-hover:text-brand-pink'
                  }`}>
                    {React.isValidElement(card.icon)
                      ? React.cloneElement(card.icon as React.ReactElement, { size: 28 })
                      : <span className="text-xl">{card.icon}</span>
                    }
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-display font-bold text-xl mb-1 transition-colors ${selectedWho === i ? 'text-brand-purple' : 'text-slate-800'}`}>
                      {card.title}
                    </h4>
                    <p className={`text-sm transition-colors ${selectedWho === i ? 'text-slate-600' : 'text-slate-400'}`}>
                      {card.desc}
                    </p>
                    <AnimatePresence>
                      {selectedWho === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 pt-4 border-t border-slate-100 text-slate-500 text-xs leading-relaxed">
                            {card.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-[10px] font-bold text-brand-purple uppercase tracking-[0.5em] mb-4 block">CORE CAPABILITIES</span>
            <h2 className="text-4xl lg:text-6xl font-display font-bold text-slate-900 tracking-tighter uppercase mb-8">ELITE AI <span className="text-gradient">EXECUTION</span></h2>
            <div className="w-32 h-2 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-blue mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15, scale: 1.05, rotateZ: i % 2 === 0 ? 1 : -1 }}
                onClick={() => onItemClick(s)}
                className={`p-10 rounded-[3rem] border shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(108,99,255,0.15)] transition-all flex flex-col cursor-pointer group relative overflow-hidden backdrop-blur-sm ${
                  i % 2 === 0 
                  ? 'bg-purple-50/80 border-purple-100 hover:border-brand-purple' 
                  : 'bg-purple-50/80 border-purple-100 hover:border-brand-purple'
                }`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl -z-10 rounded-full transition-colors ${i % 2 === 0 ? 'bg-brand-pink/10 group-hover:bg-brand-pink/20' : 'bg-brand-purple/10 group-hover:bg-brand-purple/20'}`} />
                
                <div className="w-16 h-16 bg-white border border-slate-100 shadow-xl rounded-2xl flex items-center justify-center mb-10 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                  {React.isValidElement(s.icon)
                    ? React.cloneElement(s.icon as React.ReactElement, { size: 32 })
                    : <span className="text-2xl">{s.icon}</span>
                  }
                </div>
                
                <h3 className="font-display font-bold text-2xl text-slate-900 mb-4 tracking-tight uppercase">{s.title}</h3>
                <p className="text-slate-500 text-sm mb-10 leading-relaxed font-normal">
                  {s.desc}
                </p>
                
                <div className="mt-auto flex items-center justify-between">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-all flex items-center gap-2">
                     Learn More <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                   </span>
                   <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all shadow-sm">
                     <ChevronRight size={20} />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Expertise & Industries Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.5em] mb-4 block">WORLD-CLASS EXPERTISE</span>
            <h2 className="text-4xl lg:text-6xl font-display font-bold text-slate-900 mb-6 uppercase tracking-tighter uppercase leading-none">Technologies & <span className="text-brand-blue">Expertise</span></h2>
            <p className="text-slate-500 max-w-xl mx-auto">Mastering complex enterprise ecosystems and emerging neural technologies.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {[
              { title: 'Enterprise Applications', items: ['Oracle E-Business Suite (EBS)', 'Oracle Fusion Cloud', 'SAP & Salesforce'], color: 'brand-purple' },
              { title: 'Cloud & Analytics', items: ['Oracle Cloud', 'Power BI / Looker Studio', 'Data Analytics'], color: 'brand-blue' },
              { title: 'Emerging Technologies', items: ['Artificial Intelligence (AI)', 'Automation & Workflow Tools', 'SaaS Platforms'], color: 'brand-pink' }
            ].map((tech, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl relative group overflow-hidden"
              >
                <div className={`w-2 h-20 bg-gradient-to-b from-${tech.color} to-transparent absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full`} />
                <h3 className="text-xl font-display font-bold text-slate-900 mb-8 uppercase tracking-widest">{tech.title}</h3>
                <ul className="space-y-4">
                  {tech.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-500 text-xs font-bold tracking-wide uppercase">
                      <CheckCircle2 size={14} className={`text-${tech.color}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Industries Section on Home */}
          <div className="relative">
            <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-24 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 blur-[120px] rounded-full -mr-64 -mt-64" />
              <div className="relative z-10">
                <div className="text-center mb-16">
                  <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-6 uppercase tracking-tighter">Industries & Profiles We Serve</h2>
                  <div className="w-24 h-1 bg-brand-blue mx-auto rounded-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { cat: 'IT Profiles', items: 'Developers (.NET, Java), Data Engineers, AI Specialists' },
                    { cat: 'Engineering Profiles', items: 'Mechanical, Electrical, Process Engineers' },
                    { cat: 'Business Roles', items: 'Sales, Business Analysts, Digital Marketing' },
                    { cat: 'Other Specialized Roles', items: 'ERP Consultants (Oracle, SAP), Network Engineers' }
                  ].map((p, i) => (
                    <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all">
                      <h4 className="text-brand-blue font-display font-bold text-lg mb-3 uppercase tracking-widest">{p.cat}</h4>
                      <p className="text-white/60 text-sm leading-relaxed">{p.items}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with vibrant background */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-20 grayscale brightness-50" 
            alt="AI Server"
            referrerPolicy="no-referrer"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
        </div>
        <div className="absolute top-0 right-0 w-full h-full">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(108,99,255,0.15),transparent_70%)]" />
           <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl lg:text-7xl font-display font-bold text-white mb-10 uppercase tracking-tighter leading-none">
                FUTURE-PROOF <br />
                <span className="text-brand-purple drop-shadow-[0_0_15px_rgba(108,99,255,0.5)]">INTELLIGENCE</span>
              </h2>
              <p className="text-white/50 text-xl lg:text-2xl mb-14 leading-relaxed max-w-xl font-normal">
                We bridge the gap between abstract neural potential and concrete enterprise success.
              </p>
              <div className="grid grid-cols-2 gap-12 mb-16">
                 <div className="border-l-4 border-brand-pink pl-8">
                   <h4 className="text-white font-display font-bold text-6xl mb-2">99.9%</h4>
                   <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.3em]">System Uptime</p>
                 </div>
                 <div className="border-l-4 border-brand-blue pl-8">
                   <h4 className="text-white font-display font-bold text-6xl mb-2">400+</h4>
                   <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.3em]">Agents Deployed</p>
                 </div>
              </div>
              <button 
                onClick={() => setPage('use-cases')}
                className="bg-white text-slate-900 px-14 py-5 rounded-full font-bold hover:bg-brand-purple hover:text-white transition-all text-xl uppercase tracking-tighter shadow-2xl"
              >
                VIEW USE CASES
              </button>
            </motion.div>
            
            <div className="relative hidden lg:flex items-center justify-center">
               <div className="w-full aspect-square relative flex items-center justify-center">
                  <div className="absolute inset-0 border-[6px] border-white/5 rounded-full" />
                  <div className="absolute w-[85%] aspect-square border-2 border-brand-purple/20 rounded-full animate-[spin_10s_linear_infinite] border-dashed" />
                  <BrainCircuit size={180} className="text-brand-purple drop-shadow-[0_0_40px_rgba(108,99,255,0.4)] animate-pulse" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Redefined Team Section CTA */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-50 border border-slate-100 p-12 lg:p-24 rounded-[4rem] grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-purple/5 blur-[100px] rounded-full -mr-32 -mt-32" />
            
            <div className="relative z-10">
              <span className="text-brand-purple font-bold text-xs uppercase tracking-[0.3em] mb-6 block">HUMAN-AI COLLABORATION</span>
              <h2 className="text-5xl lg:text-7xl font-display font-bold text-slate-900 tracking-tighter leading-[0.9] uppercase mb-10">
                THE MINDS <br />
                <span className="text-gradient">BEHIND THE MACHINE</span>
              </h2>
              <p className="text-slate-500 text-lg lg:text-xl mb-12 font-normal leading-relaxed">
                Meet the architects, engineers, and visionaries building Pune's premier neural innovation hub.
              </p>
              <button 
                onClick={() => setPage('team')}
                className="btn-gradient !px-12 !py-5 text-xl"
              >
                MEET THE TEAM
              </button>
            </div>
            
            <div className="relative aspect-square bg-slate-200 rounded-[3rem] overflow-hidden rotate-2 group-hover:rotate-0 transition-transform duration-700 shadow-2xl">
               <img 
                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                 alt="Our Team" 
                 className="w-full h-full object-cover grayscale opacity-90 transition-all group-hover:grayscale-0 group-hover:scale-110"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServicesPage = ({ onItemClick }: { onItemClick: (item: DetailItem) => void }) => {
  const [selectedSubItem, setSelectedSubItem] = useState<{ sub: DetailSubItem, parent: DetailItem } | null>(null);

  const allServices: DetailItem[] = [
    { 
      title: 'Talent & Staffing Solutions', 
      icon: <Users />, 
      desc: 'End-to-end workforce acquisition across domains.',
      longDesc: 'End-to-end workforce acquisition — from frontline permanent hires to C-suite leadership searches, across IT and non-IT domains.',
      subItems: [
        { 
          title: 'Permanent Staffing', 
          detail: 'IT & Non-IT full-time placements aligned to your culture and role requirements.', 
          example: 'Targeting long-term organizational stability.'
        },
        { 
          title: 'Contract Staffing', 
          detail: 'Staff augmentation for project-based or seasonal needs with flexible engagement.', 
          example: 'Pre-vetted specialists who integrate seamlessly.'
        },
        { 
          title: 'Executive Search', 
          detail: 'Confidential leadership hiring — CXO, VP, Director-level roles across industries.', 
          example: 'Mapping global markets to identify visionaries.'
        },
        { 
          title: 'Offshore Hiring', 
          detail: 'Dedicated offshore teams set up on your behalf — cost-effective and scalable.', 
          example: 'Managing infrastructure, payroll, and compliance.'
        }
      ],
      example: 'Scenario: A Pune-based fintech startup needs 12 developers in 6 weeks. Solution: Trinexiss sources pre-screened candidates, conducts assessments, and delivers shortlists within 7 days.',
      process: '1. Requirement Deep-Dive | 2. Talent Sourcing | 3. Screening & Assessment | 4. Placement & Onboarding Support',
      result: '✔ 48h Shortlist | ✔ 92% Accept Rate | ✔ 500+ Placed',
      color: 'bg-purple-50',
      iconColor: 'text-brand-purple',
      accent: 'border-purple-100',
      deepDive: {
        overview: 'End-to-end workforce acquisition — from frontline permanent hires to C-suite leadership searches, across IT and non-IT domains.',
        sections: [
          {
            title: 'Permanent Staffing',
            icon: '💼',
            explanation: 'Ideal for building long-term organizational stability. Covers end-to-end hiring — sourcing, screening, cultural fit assessment, and onboarding support — for roles across engineering, operations, finance, HR, and more.',
            businessValue: ['IT & Non-IT', 'Culture fit', 'Long-term'],
            example: 'A fintech startup needs a permanent Senior DevOps Engineer. The staffing firm sources candidates, runs technical rounds, evaluates team-culture alignment, and places the right hire — reducing time-to-fill from 90 to 30 days.'
          },
          {
            title: 'Contract Staffing',
            icon: '🔄',
            explanation: 'Flexible staff augmentation for project-based or seasonal workforce needs. Pre-vetted specialists are deployed on short-notice contracts — weeks to months — and integrate seamlessly into your existing teams. Engagement scales up or down based on project milestones, with no long-term overhead.',
            businessValue: ['Flexible', 'Pre-vetted', 'Scalable'],
            example: 'An e-commerce company needs 15 customer support agents for the festive season (Oct–Jan). Contract staffing provides trained, ready-to-deploy agents within a week, then winds down post-season with zero severance risk.'
          },
          {
            title: 'Executive Search',
            icon: '👑',
            explanation: 'Confidential CXO, VP & Director-level hiring across industries. A discreet, research-driven process to identify visionary leaders — including passive candidates not on the open market. Involves deep market mapping, competitor benchmarking, and rigorous leadership assessment before presenting a shortlist.',
            businessValue: ['Confidential', 'Global reach', 'C-suite'],
            example: 'A mid-size manufacturing firm needs a new CFO after a sudden exit. The executive search team confidentially maps 200+ finance leaders across Asia & Europe, shortlists 5, and presents a hire within 8 weeks — without the market knowing there was a vacancy.'
          },
          {
            title: 'Offshore Hiring',
            icon: '🌍',
            explanation: 'Dedicated offshore teams — cost-effective, scalable, compliance-managed. The firm sets up and manages an entire offshore workforce on your behalf — handling recruitment, infrastructure, local payroll, tax compliance, and HR operations. You get the output; they handle the complexity.',
            businessValue: ['Cost-effective', 'Compliance', 'Infra managed'],
            example: 'A UK SaaS company wants a 20-person software development team in India to cut costs by 60%. The staffing firm recruits the engineers, leases office space, manages payroll in INR, and handles PF/ESI compliance — the client just manages the work.'
          }
        ]
      }
    },
    { 
      title: 'HR & Business Consulting', 
      icon: <Settings />, 
      desc: 'Optimize your organizational ecosystem and compliance.',
      longDesc: 'Optimize your organizational ecosystem — from payroll compliance to strategic workforce planning.',
      subItems: [
        { 
          title: 'HR & Payroll Outsourcing', 
          detail: 'Full-service payroll, compliance, statutory filings handled end-to-end.', 
          example: 'Handling PF, ESIC, TDS with 100% accuracy.'
        },
        { 
          title: 'Talent Acquisition Management', 
          detail: 'Complete TA function — JD creation, sourcing, interviews, offer, onboarding.', 
          example: 'Designing complete RPO frameworks.'
        },
        { 
          title: 'Workforce Planning', 
          detail: 'Headcount modelling and skill-gap analysis for growth phases.', 
          example: 'Aligning architecture with future revenue goals.'
        },
        { 
          title: 'Training & Development', 
          detail: 'Custom learning paths, leadership programs, and onboarding bootcamps.', 
          example: 'Upskilling lead architects in GenAI.'
        }
      ],
      example: 'Scenario: A 80-person logistics firm wants to outsource HR entirely. Solution: Trinexiss takes over payroll, compliance, lifecycle management, and performance reviews.',
      process: '1. HR Audit | 2. Solution Design | 3. Execution | 4. Continuous Improvement',
      result: '✔ 100% Compliance | ✔ 30% Cost Saving | ✔ 50+ Organizations',
      color: 'bg-purple-50',
      iconColor: 'text-brand-pink',
      accent: 'border-purple-100',
      deepDive: {
        overview: 'End-to-end HR ecosystem management — from statutory compliance and payroll to strategic workforce architecture and learning programs.',
        sections: [
          {
            title: 'HR & Payroll Outsourcing',
            icon: '💼',
            explanation: 'Covers the entire monthly payroll cycle — salary computation, tax deductions, reimbursements, statutory remittances, and employee payslip generation — so your internal team focuses on people, not paperwork.',
            list: ['Payroll processing (CTC breakup, bonus, settlements)', 'PF & ESIC (Challan, ECR filing, claim support)', 'TDS & Form 16 (Monthly computation, 24Q filing)', 'Labour law compliance (PT, LWF, MIS reports)'],
            businessValue: ['100% compliant', 'PF / ESIC / TDS', 'Zero delays'],
            example: 'A 200-employee manufacturing firm outsources payroll to Trinexiss. Every month — salary disbursed on time, PF challan filed by 15th, ESIC by 21st, TDS deposited by 7th, and Form 16 issued in April — all without a single penalty notice in 2 years.'
          },
          {
            title: 'Talent Acquisition Management',
            icon: '🎯',
            explanation: 'Goes beyond filling vacancies — Trinexiss becomes your embedded TA team. RPO (Recruitment Process Outsourcing) means the entire hiring function — tools, process, metrics, and team — is designed and managed on your behalf.',
            list: ['JD creation (Competency mapping, grade alignment)', 'Sourcing & screening (Multi-channel, AI-assisted)', 'Interview & selection (Panel coordination, scoring)', 'Offer & onboarding (Negotiation, 30-60-90 day plan)'],
            businessValue: ['Full RPO', 'TA metrics', 'Quality hires'],
            example: 'A Series B SaaS startup scaling from 80 to 250 people engages Trinexiss as their RPO partner. Within 6 months — 120 hires across Engineering, Sales & Ops — with a structured ATS, hiring scorecards, and an onboarding bootcamp built from scratch.'
          },
          {
            title: 'Workforce Planning',
            icon: '📊',
            explanation: 'Workforce planning is proactive — it answers "how many people, with what skills, in which functions, by when?" — driven by revenue targets and org design principles.',
            list: ['Current state audit (Spans of control, skill inventory)', 'Revenue-to-headcount modelling (Forecast hiring)', 'Skill-gap analysis (Identify critical missing capabilities)', 'Org architecture design (Pods, reporting lines)'],
            businessValue: ['Growth-aligned', 'Org design', 'Skill-gap analysis'],
            example: 'A logistics company targeting ₹500 Cr revenue in 24 months engages Trinexiss for workforce planning. Analysis reveals a gap of 18 supply-chain analysts and 6 data engineers. A phased hiring roadmap is created — saving ₹40L in avoided mis-hires.'
          },
          {
            title: 'Training & Development',
            icon: '📚',
            explanation: 'Trinexiss designs role-specific learning journeys — for new joiners, first-time managers, senior leaders, and technical teams — with measurable outcomes, not just completion certificates.',
            list: ['Onboarding bootcamps (Culture, tools, role clarity)', 'Leadership programs (Decision-making, strategic thinking)', 'GenAI upskilling (LLMs, RAG, prompt engineering)', 'Custom learning paths (Assessments, certifications)'],
            businessValue: ['GenAI / LLM', 'Leadership', 'Onboarding'],
            example: 'A mid-size IT services firm wants its 30 lead architects to adopt GenAI. Trinexiss designs an 8-week cohort program on LLMs, RAG, and prompt engineering. Post-program, 22 architects deploy at least one AI-assisted workflow.'
          },
          {
            title: 'Synergy of Pillars',
            icon: '🤝',
            explanation: 'Together these services form a complete HR operating system — hire right, pay accurately, plan ahead, and continuously upskill — creating an organization that scales without breaking.',
            list: ['Payroll & Compliance → TA & RPO', 'Workforce Planning → Training & Development', 'Unified Operating System'],
            businessValue: ['Future-ready org', 'Scalable architecture', 'Strategic alignment']
          }
        ]
      }
    },
    { 
      title: 'Technology & Digital Solutions', 
      icon: <Globe />, 
      desc: 'Build your digital core and architecture.',
      longDesc: 'Build your digital core — AI agents, SaaS platforms, data dashboards, and growth marketing under one roof.',
      subItems: [
        { 
          title: 'AI & Automation Solutions', 
          detail: 'Custom AI agents and intelligent workflow automation for business processes.', 
          example: 'Architecting intelligent autonomous agents.'
        },
        { 
          title: 'SaaS Platform Development', 
          detail: 'React/Node enterprise-grade SaaS products from MVP to scale.', 
          example: 'Modern cloud-native architectures for infinite scaling.'
        },
        { 
          title: 'Digital Marketing Excellence', 
          detail: 'SEO strategy, PPC campaign management, and performance analytics.', 
          example: 'Scaling organic traffic by 300% in 9 months.'
        },
        { 
          title: 'Dashboarding & Analytics', 
          detail: 'Real-time business intelligence dashboards integrated with your data.', 
          example: 'Unified executive command centers for operations.'
        }
      ],
      example: 'Scenario: An FMCG brand needs a 360° digital presence. Solution: Trinexiss builds a portal, sets up SEO strategy, ads, and a live dashboard.',
      process: '1. Strategy & UX | 2. Development | 3. Launch & Marketing | 4. Analytics & Support',
      result: '✔ 3x ROI | ✔ 40+ Projects | ✔ 99.5% Uptime',
      color: 'bg-purple-50',
      iconColor: 'text-brand-blue',
      accent: 'border-purple-100',
      deepDive: {
        overview: 'Build your digital core — AI agents, SaaS platforms, data dashboards, and growth marketing under one roof with integrated performance ecosystems.',
        sections: [
          {
            title: 'AI & Automation Solutions',
            icon: '🤖',
            explanation: 'We create custom AI agents and intelligent automation systems that streamline business processes and reduce manual effort.',
            list: ['AI-powered chatbots', 'Automated workflows', 'Intelligent decision-making systems'],
            businessValue: ['Saves time', 'Reduces errors', 'Improves efficiency'],
            example: 'A company receives 100+ customer queries daily → We build an AI chatbot that handles queries automatically and reduces support workload.'
          },
          {
            title: 'SaaS Platform Development',
            icon: '💻',
            explanation: 'We design and develop enterprise-grade SaaS platforms using modern technologies like React and Node.js.',
            list: ['MVP development', 'Full-scale product development', 'Cloud deployment and scaling'],
            businessValue: ['Scalable', 'Secure', 'Enhanced UX'],
            example: 'A startup wants to launch a product → We build a SaaS application where users can log in, manage data, and scale as the business grows.'
          },
          {
            title: 'Digital Marketing Excellence',
            icon: '📢',
            explanation: 'We provide performance-driven digital marketing solutions to help businesses grow their online presence and generate leads.',
            list: ['SEO strategy', 'PPC campaign management', 'Performance tracking'],
            businessValue: ['High visibility', 'Lead gen', 'Brand presence'],
            example: 'A business wants more website traffic → We optimize SEO and run ad campaigns to increase visibility, results in 300% growth in 9 months.'
          },
          {
            title: 'Dashboarding & Analytics',
            icon: '📊',
            explanation: 'We build real-time business intelligence dashboards that help companies make better decisions using data.',
            list: ['Data integration', 'Real-time reporting', 'Unified executive dashboards'],
            businessValue: ['Better decisions', 'Real-time insights', 'Unified monitoring'],
            example: 'A company wants to track sales, revenue, and performance → We create a dashboard using tools like Looker Studio or Power BI.'
          }
        ]
      }
    },
    { 
      title: 'AI & Automation', 
      icon: <Bot />, 
      desc: 'Smart bots and intelligent automated workflows.',
      longDesc: 'Custom bots, intelligent workflows, and no-code solutions that eliminate repetitive work and accelerate decisions.',
      subItems: [
        { 
          title: 'Trinexiss Bot Creation', 
          detail: 'AI chatbots for HR, sales, and support trained on your data.', 
          example: 'Bots for indexed internal data retrieval.'
        },
        { 
          title: 'Zapier & n8n Workflows', 
          detail: 'Connect 500+ apps and automate multi-step business processes.', 
          example: 'Eliminating manual repetitive data entry tasks.'
        },
        { 
          title: 'No-code Software Solutions', 
          detail: 'Rapid internal tools and portals using platforms like Bubble/Retool.', 
          example: 'MVP prototypes delivered at 4x speed.'
        }
      ],
      example: 'Scenario: HR team spends 3 hours daily answering leave queries. Solution: Trinexiss builds a WhatsApp HR bot saving 60+ hours per month.',
      process: '1. Trigger Analysis | 2. Parse & Score | 3. Notify & Sync | 4. Auto-Response',
      result: '✔ 70% Manual Work Eliminated | ✔ 2 Weeks Deployment',
      color: 'bg-purple-50',
      iconColor: 'text-brand-purple',
      accent: 'border-purple-100',
      deepDive: {
        overview: 'AI & Automation focuses on eliminating repetitive work and accelerating decisions using custom bots, intelligent workflows, and no-code solutions.',
        sections: [
          {
            title: 'Trinexiss Bot Creation',
            icon: '🤖',
            explanation: 'We build intelligent AI chatbots for HR, Sales, and Support, trained specifically on your company data to provide accurate, real-time responses 24/7.',
            list: ['HR Bots: Leave & policy queries', 'Sales Bots: Lead qualification', 'Support Bots: Client resolution'],
            businessValue: ['Time saving', '24/7 availability', 'Data-driven'],
            example: 'An HR team spends 3 hours daily answering routine questions. Trinexiss builds a WhatsApp HR bot that handles 80% of queries, saving 60+ hours per month.'
          },
          {
            title: 'Zapier & n8n Workflows',
            icon: '⚡',
            explanation: 'Connect 5000+ apps into seamless workflows. Zapier is ideal for simple, rapid triggers, while n8n provides advanced, self-hosted, and complex logic for massive data scaling.',
            list: ['Zapier: Rapid, user-friendly triggers', 'n8n: Complex branching & self-hosting', 'Zero manual data entry'],
            businessValue: ['Process automation', 'Zero entry errors', 'Scalable logic'],
            example: 'A lead fills a form → Data goes to CRM → Email is sent via Mailchimp → Sales team is notified on Slack. Total human effort: zero.'
          },
          {
            title: 'No-code Software Solutions',
            icon: '🚀',
            explanation: 'Rapid internal tools and portals built using Bubble or Retool. This allows for launching MVPs and custom software at 4x the speed of traditional development.',
            list: ['Admin Dashboards', 'Employee Portals', 'Rapid MVP prototyping'],
            businessValue: ['4x faster launch', 'Cost-effective', 'Agile iteration'],
            example: 'A fully functional internal inventory portal was launched in 14 days, compared to the typical 2-month timeline for custom code.'
          }
        ]
      }
    },
    { 
      title: 'SaaS Development', 
      icon: <Code />, 
      desc: 'Enterprise-grade scalable software systems.',
      longDesc: 'Enterprise-grade, scalable software systems — from financial platforms to patient management portals.',
      subItems: [
        { 
          title: 'FinTrack Systems', 
          detail: 'Financial management — invoicing, expense tracking, P&L dashboards.', 
          example: 'Predictive revenue forecasting for SMEs.'
        },
        { 
          title: 'HealthSync Portals', 
          detail: 'Patient management — appointments, records, billing, doctor dashboards.', 
          example: 'Modernizing patient management for hospital groups.'
        },
        { 
          title: 'Enterprise Dashboards', 
          detail: 'BI tools for executive monitoring and departmental KPI tracking.', 
          example: 'Unified sales, operations, and HR tracking.'
        }
      ],
      example: 'Scenario: A hospital group needs to modernize patient management. Solution: HealthSync deployment for booking, records, and auto-billing.',
      process: '1. Discovery Sprint | 2. MVP (4-6 weeks) | 3. Iterative Releases | 4. Support',
      result: '✔ 4-6w MVP | ✔ React/Node Stack | ✔ AWS Infrastructure',
      color: 'bg-purple-50',
      iconColor: 'text-brand-pink',
      accent: 'border-purple-100',
      deepDive: {
        overview: 'Enterprise-grade, scalable software systems — from financial platforms to patient management portals, built for high performance and infinite growth.',
        sections: [
          {
            title: 'FinTrack Systems',
            icon: '💸',
            explanation: 'Modular financial management platforms designed for SMEs and growing enterprises, focusing on automation and predictive insights.',
            list: ['Automated invoicing', 'Expense monitors', 'P&L visualization', 'Revenue forecasting'],
            businessValue: ['Real-time P&L', 'Financial automation', 'Scalable architecture'],
            example: 'A modular SaaS for a group of clinics, managing billing for 50+ doctors and generating real-time profitability reports across all branches.'
          },
          {
            title: 'HealthSync Portals',
            icon: '🏥',
            explanation: 'Patient-centric digital health platforms that unify appointment scheduling, health records, and billing into one secure environment.',
            list: ['Appointment management', 'Secure health records', 'Digital billing', 'Doctor dashboards'],
            businessValue: ['Organized data', 'Reduced wait times', 'Enhanced coordination'],
            example: 'A hospital portal reduced patient wait times by 40% and enabled remote consultations for 2000+ monthly patients using HealthSync.'
          },
          {
            title: 'Enterprise Dashboards',
            icon: '📊',
            explanation: 'Unified Business Intelligence (BI) tools that integrate data from all departments to provide executives with a single source of truth.',
            list: ['Executive command centers', 'KPI tracking visualizers', 'Cross-departmental data sync'],
            businessValue: ['One source of truth', 'Better decision-making', 'Unified visibility'],
            example: 'A logistics firm tracks carbon footprint, fuel efficiency, and fleet performance in real-time via a unified enterprise dashboard.'
          }
        ]
      }
    },
    { 
      title: 'HR and Recruitment', 
      icon: <UserPlus />, 
      desc: 'Strategic talent acquisition protocols.',
      longDesc: 'Strategic talent acquisition — from niche technical assessments to confidential executive searches.',
      subItems: [
        { 
          title: 'Executive Search', 
          detail: 'Discreet, research-led search for CXO and Director roles.', 
          example: 'Perfect executive alignment via deep-dive vetting.'
        },
        { 
          title: 'Permanent Recruitment', 
          detail: 'Full-cycle hiring for all functions and seniority levels.', 
          example: 'Rigorous screening and recruitment marketing.'
        },
        { 
          title: 'Technical Assessment', 
          detail: 'Skill-based screening — coding tests and domain quizzes.', 
          example: 'Vetting through Trinexiss Technical Mastery labs.'
        }
      ],
      example: 'Scenario: A SaaS company needs a VP Engineering discreetly. Solution: Confidential search mapping landscape andApproaching passive candidates.',
      process: '1. Role Profiling | 2. Market Mapping | 3. Multi-Stage Assessment | 4. Offer & Close',
      result: '✔ 21 Days Placement | ✔ 95% Retention | ✔ 100% Confident',
      color: 'bg-purple-50',
      iconColor: 'text-brand-purple',
      accent: 'border-purple-100',
      deepDive: {
        overview: 'HR and Recruitment — strategic talent acquisition protocols explained. Strategic talent acquisition — from niche technical assessments to confidential executive searches.',
        sections: [
          {
            title: 'Executive Search',
            icon: '👑',
            explanation: 'A specialized hiring process for top-level roles like CXO, Directors, and senior leadership that requires strategic thinking and absolute confidentiality.',
            list: ['Research-based candidate search', 'Confidential market mapping', 'Deep background checks', 'Competitor talent analysis'],
            example: 'A startup needs a Chief Technology Officer (CTO). We identify experienced leaders from top firms and help hire the best visionary.',
            businessValue: ['Strong leadership team', 'Better strategic decisions', 'Risk-free executive placement']
          },
          {
            title: 'Permanent Recruitment',
            icon: '🤝',
            explanation: 'Focuses on building long-term, stable teams by hiring high-quality permanent employees aligned with your culture and goals.',
            list: ['Multi-platform candidate sourcing', 'Rigorous resume screening', 'Interview coordination', 'Recruitment marketing strategy'],
            example: 'Expanding a software development center by hiring 40 specialized Cloud Architects and DevOps engineers in under a quarter.',
            businessValue: ['Long-term team stability', 'Cultural fit assurance', 'Consistent organizational growth']
          },
          {
            title: 'Technical Assessment',
            icon: '🧪',
            explanation: 'Ensures candidates are technically strong and job-ready through structured testing in our Trinexiss Technical Mastery labs.',
            list: ['Live coding challenges', 'Domain-specific quizzes', 'Practical problem solving', 'Hands-on skill evaluation'],
            example: 'Vetted 500+ candidates for a German automotive client, selecting the top 2% through our specialized technical mastery labs.',
            businessValue: ['Only qualified hires move forward', 'Reduced hiring mistakes', 'Saved time for engineering teams']
          }
        ]
      }
    }
  ];

  const businessSolutions = [
    { 
      title: 'Technical Consultancy', 
      desc: 'Enterprise & digital solutions architecture.', 
      detail: 'Strategic guidance on modernization, cloud migration, and architecture design for complex enterprise systems.',
      example: 'Ex: Optimized a legacy ERP for a Pune-based manufacturer, migrating them to a scalable cloud-hybrid model.',
      icon: <Cpu /> 
    },
    { 
      title: 'Staff Augmentation', 
      desc: 'Skilled on-demand specialized workforce.', 
      detail: 'Rapidly scale your existing teams with our pool of tech-vetted subject matter experts across all modern stacks.',
      example: 'Ex: Provided 10+ Senior GoLang developers to an international Fintech within 14 days to meet a critical launch.',
      icon: <Users /> 
    },
    { 
      title: 'Support Services', 
      desc: 'End-to-end operational and tech support.', 
      detail: '24/7 technical monitoring and operational management ensuring your digital infrastructure remains resilient.',
      example: 'Ex: Managing global Level-2 support for a European SaaS firm, maintaining 99.9% uptime throughout peak periods.',
      icon: <Zap /> 
    },
    { 
      title: 'Training & Development', 
      desc: 'Upskilling your workforce for the future.', 
      detail: 'Customized корпоративная learning solutions for teams looking to master AI, Automation, and modern Cloud DevOps.',
      example: 'Ex: Executed a 12-week internal transition program for a major bank, upskilling 200 legacy developers to Cloud-Native.',
      icon: <Lightbulb /> 
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-brand-purple text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">OUR CORE SERVICES</span>
          <h1 className="text-5xl lg:text-7xl font-display font-bold text-slate-900 mb-8 uppercase tracking-tighter leading-none">STRATEGIC <br /><span className="text-brand-purple">SERVICE HUB</span></h1>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto">Delivering high-performance talent and technology solutions across global markers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 mb-40">
          {allServices.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`p-10 lg:p-14 rounded-[4rem] border-2 shadow-sm hover:shadow-2xl transition-all group flex flex-col relative overflow-hidden ${s.color} ${s.accent}`}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110 ${s.iconColor}`}>
                  {React.cloneElement(s.icon as React.ReactElement, { size: 32 })}
                </div>
                
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-6 uppercase tracking-tight">{s.title}</h3>
                <p className="text-slate-700 text-sm mb-10 leading-relaxed font-medium">
                  {s.desc}
                </p>

                <ul className="space-y-4 mb-14 border-t border-black/5 pt-8">
                  {s.subItems?.map((item, idx) => {
                    const isObject = typeof item !== 'string';
                    const title = isObject ? (item as DetailSubItem).title : item as string;
                    
                    return (
                      <li 
                        key={idx} 
                        onClick={(e) => {
                          if (isObject) {
                            e.stopPropagation();
                            setSelectedSubItem({ sub: item as DetailSubItem, parent: s });
                          }
                        }}
                        className={`flex items-start gap-3 text-xs font-medium transition-all ${isObject ? 'cursor-pointer hover:text-brand-purple hover:translate-x-1' : ''} text-slate-400`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-purple/20 mt-1.5 shrink-0" />
                        <span>{title}</span>
                      </li>
                    );
                  })}
                </ul>

                <div 
                  onClick={() => onItemClick(s)}
                  className="mt-auto flex items-center justify-between font-display font-bold text-[10px] uppercase tracking-[0.2em] text-brand-purple transition-all group-hover:translate-x-2 cursor-pointer"
                >
                  EXPLORE SOLUTION <ArrowUpRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sub-item Detail Modal */}
        <AnimatePresence>
          {selectedSubItem && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedSubItem(null)}
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="relative bg-white w-full max-w-2xl rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(108,99,255,0.25)] border border-slate-100"
              >
                {/* Modal Header/Highlight */}
                <div className="bg-gradient-to-br from-brand-purple/10 to-brand-pink/10 p-10 lg:p-14 border-b border-black/5">
                  <div className="w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center mb-8 text-brand-purple">
                    <Rocket size={32} />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4 tracking-tighter uppercase leading-none">
                    {selectedSubItem.sub.title}
                  </h3>
                  <div className="w-20 h-1.5 bg-brand-pink rounded-full mb-6" />
                  <p className="text-slate-600 text-lg leading-relaxed font-medium">
                    {selectedSubItem.sub.detail}
                  </p>
                </div>

                {/* Example Highlight Section */}
                <div className="p-10 lg:p-14 bg-white">
                  <div className="p-8 bg-brand-purple/5 border border-brand-purple/10 rounded-[2.5rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Zap size={64} className="text-brand-purple rotate-12" />
                    </div>
                    <div className="relative z-10">
                      <span className="text-brand-purple font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">CASE EXAMPLE</span>
                      <p className="text-slate-900 font-display font-bold text-xl leading-snug">
                        {selectedSubItem.sub.example}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-10">
                    <button
                      onClick={() => setSelectedSubItem(null)}
                      className="flex-1 py-4 bg-slate-100 text-slate-600 border border-slate-200 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        const parent = selectedSubItem.parent;
                        setSelectedSubItem(null);
                        if (parent) onItemClick(parent);
                      }}
                      className="btn-gradient flex-[2] py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl shadow-brand-purple/20 flex items-center justify-center gap-2"
                    >
                      Explore More
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Business Solutions Section */}
        <div className="mb-40">
           <div className="text-center mb-20">
             <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6 uppercase tracking-tighter">Our Comprehensive <br /><span className="text-brand-purple">Business Solutions</span></h2>
             <div className="w-24 h-1 bg-brand-purple mx-auto rounded-full" />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {businessSolutions.map((sol, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -15, scale: 1.05 }}
                  onClick={() => setSelectedSubItem({
                    sub: {
                      title: sol.title,
                      detail: sol.detail,
                      example: sol.example
                    },
                    parent: { title: sol.title, icon: sol.icon, desc: sol.desc } as DetailItem
                  })}
                  className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] transition-all hover:bg-white hover:shadow-2xl text-center group cursor-pointer"
                >
                   <div className="w-14 h-14 bg-white shadow-lg rounded-2xl flex items-center justify-center mx-auto mb-8 text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-colors">
                      {React.cloneElement(sol.icon as React.ReactElement, { size: 24 })}
                   </div>
                   <h4 className="text-lg font-display font-bold text-slate-900 mb-3 uppercase">{sol.title}</h4>
                   <p className="text-slate-400 text-xs leading-relaxed">{sol.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Industries & Profiles Section */}
        <div className="bg-slate-50 rounded-[4rem] p-12 lg:p-20 relative overflow-hidden border border-slate-100 shadow-inner mt-32">
           <h2 className="text-3xl font-display font-bold text-slate-900 mb-12 uppercase tracking-tight text-center">Industries & Profiles We Serve</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              {[
                { cat: 'IT Profiles', items: 'Developers (.NET, Java), Data Engineers, AI Specialists' },
                { cat: 'Engineering', items: 'Mechanical, Electrical, Process Engineers' },
                { cat: 'Business', items: 'Sales, Business Analysts, Digital Marketing' },
                { cat: 'Specialized', items: 'ERP Consultants (Oracle, SAP), Network Engineers' }
              ].map((p, i) => (
                <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl hover:bg-brand-pink/5 hover:border-brand-pink/20 transition-all group">
                   <h4 className="text-brand-pink font-display font-bold text-lg mb-3 uppercase tracking-widest">{p.cat}</h4>
                   <p className="text-slate-500 text-sm leading-relaxed">{p.items}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

 const TeamPage = ({ setPage }: { setPage: (p: Page) => void }) => {
  const team = [
    { name: 'Sarah Chen', role: 'Founder & CEO', category: 'LEADERSHIP', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800' },
    { name: 'David Miller', role: 'CTO', category: 'ENGINEERING', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800' },
    { name: 'Alex Rivera', role: 'Head of AI', category: 'PRODUCT', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800' },
    { name: 'Elena Kosti', role: 'Design Director', category: 'STRATEGY', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800' }
  ];

  return (
    <div className="pt-32 pb-24 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-32 border-b border-slate-100 pb-20">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl lg:text-8xl font-display font-bold leading-[0.85] tracking-tighter uppercase mb-12 text-slate-900"
            >
              MEET OUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink">CORE TEAM</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-700 text-lg lg:text-xl font-bold uppercase tracking-[0.1em] max-w-xl leading-relaxed"
            >
              Visionary leadership driving the evolution of AI-powered digital enterprises across global territories.
            </motion.p>
          </div>
          
          <div className="flex gap-6 lg:mb-4">
            <div className="p-8 lg:p-12 bg-purple-50 border border-purple-100 rounded-[2.5rem] text-center min-w-[200px] shadow-sm hover:shadow-xl transition-all group">
              <div className="text-4xl font-display font-bold text-brand-purple mb-1 group-hover:scale-110 transition-transform">10+</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Years Exp.</div>
            </div>
            <div className="p-8 lg:p-12 bg-purple-50 border border-purple-100 rounded-[2.5rem] text-center min-w-[200px] shadow-sm hover:shadow-xl transition-all group">
              <div className="text-4xl font-display font-bold text-brand-purple mb-1 group-hover:scale-110 transition-transform">50+</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Specialists</div>
            </div>
          </div>
        </div>

        {/* Member Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((m, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -15, scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="aspect-[3/4] rounded-[3rem] overflow-hidden relative mb-8 border-4 border-white shadow-2xl group-hover:shadow-brand-purple/20 transition-all">
                <img 
                  src={m.image} 
                  alt={m.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <span className="px-4 py-1.5 bg-brand-purple text-white rounded-full text-[9px] font-bold tracking-widest uppercase">
                    {m.category}
                  </span>
                </div>
              </div>
              
              <div className="px-2">
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-1 uppercase tracking-tight">{m.name}</h3>
                <p className="text-brand-purple text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  {m.role} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Join CTA */}
        <div className="mt-32 p-12 lg:p-24 bg-gradient-to-br from-brand-purple/5 to-brand-pink/5 border border-purple-100 rounded-[4rem] text-center shadow-inner relative overflow-hidden group">
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-purple/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
           <h2 className="text-3xl lg:text-5xl font-display font-bold text-slate-900 tracking-tighter uppercase mb-8 relative z-10">Ready to evolve with us?</h2>
           <p className="text-slate-500 max-w-xl mx-auto mb-12 text-lg relative z-10">We're always scouting for elite technical talent to join our neural expansion.</p>
           <button 
            onClick={() => {
              window.scrollTo(0, 0);
              setPage('careers');
            }}
            className="btn-gradient !px-12 !py-5 text-lg shadow-2xl shadow-brand-purple/30 relative z-10"
           >
            Open Positions <ArrowRight size={20} className="inline ml-2" />
           </button>
        </div>
      </div>
    </div>
  );
};

const AboutPage = ({ setPage }: { setPage: (p: Page) => void }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [expandedWhy, setExpandedWhy] = useState<number | null>(null);

  const stats = [
    { icon: <Target className="text-brand-purple" />, title: 'Our Mission', desc: 'To empower businesses with innovative technology and the right talent that drives growth and sustainability.', detail: 'We focus on building long-term value by bridging the gap between cutting-edge AI research and practical business applications. Our commitment is to provide scalable, ethical, and efficient technical ecosystems.' },
    { icon: <Lightbulb className="text-brand-pink" />, title: 'Our Vision', desc: 'To become a trusted global partner in AI-driven business solutions and recruitment excellence.', detail: 'By 2030, we aim to be the premier neural innovation hub in Asia and the GCC, setting industry standards for autonomous workflow integration and technical talent management.' },
    { icon: <BrainCircuit className="text-brand-blue" />, title: 'Our Expertise', desc: 'Deep knowledge in AI Automation, IT Recruitment, SaaS Development, and Data Analytics.', detail: 'Our team comprises domain experts who have delivered complex systems for retail, logistics, and fintech sectors. We master the intersection of human psychology and machine learning.' }
  ];

  const whyChoose = [
    { 
      title: 'Client-First Approach', 
      desc: 'Every engagement is tailored to your unique business goals and culture.',
      detail: 'At Trinexiss, we believe that technology is a means to an end, not the end itself. Our "Client-First" philosophy means we start every project by deeply immersing ourselves in your business ecosystem. We don\'t offer cookie-cutter solutions; instead, we build bespoke strategies that align with your specific KPIs and long-term vision. This approach ensures that the technical systems we build or the talent we source integrate seamlessly into your workflow, driving immediate value while maintaining the flexibility to evolve as your company grows. We act as your strategic partners, not just service providers.' 
    },
    { 
      title: 'Fast Turnaround & Quality', 
      desc: 'Rapid delivery without compromising on the quality of talent or solutions.',
      detail: 'In today\'s hyper-competitive market, speed is a critical advantage. We have optimized our internal delivery pipelines to ensure that we meet aggressive deadlines without ever cutting corners on quality. Whether it is sourcing a niche technical profile in under 48 hours or deploying a complex automation script, our multi-stage quality assurance process remains rigorous. We use standardized technical benchmarks and automated testing to ensure that every deliverable is enterprise-grade. At Trinexiss, "Fast" doesn\'t mean hurried; it means efficient, disciplined, and focused execution that respects your time and your budget.' 
    },
    { 
      title: 'Strong Talent Network', 
      desc: 'Deep connections across portals, referrals, and niche communities.',
      detail: 'Our greatest asset is our verified network of thousands of technical specialists across India and the GCC regions. We don\'t just rely on standard job boards; we cultivate relationships within niche developer communities, attend technical seminars, and leverage a powerful internal referral system. This proactive mapping allows us to reach "passive" talent—top-tier engineers who aren\'t actively looking but are open to the right growth opportunity. Every candidate in our network has undergone initial technical vetting, meaning we can present you with the top 3% of talent available in the market almost instantly.' 
    },
    { 
      title: 'AI-Driven Innovation', 
      desc: 'Leveraging cutting-edge AI and automation to solve real business problems.',
      detail: 'We are pioneers in practical AI application. While many companies talk about AI, we build it into the fabric of your operations. Our innovation lab focuses on "Autonomous Workflows"—systems that can perceive, reason, and act with minimal human intervention. We leverage large language models (LLMs), RAG architectures, and custom neural pipelines to automate complex logic that was previously thought to require manual oversight. This focus on "real-world AI" ensures that our solutions aren\'t just futuristic experiments, but tools that actively reduce operational overhead and eliminate human error from day one of implementation.' 
    },
    { 
      title: 'End-to-End Capabilities', 
      desc: 'From sourcing to onboarding, from ideation to deployment — all under one roof.',
      detail: 'Trinexiss provides a holistic technical ecosystem, eliminating the need for you to manage multiple vendors for different stages of growth. We handle the entire lifecycle: from the initial technical consultancy and architecture design to sourcing the right team to build it, and finally managing the deployment and maintenance. This unified approach ensures that nothing is lost in translation between strategy and execution. Having a single partner handle everything from recruitment to SaaS development ensures a consistent technical standard across your organization, allowing you to focus on your core business goals while we handle the complexity of the machine.' 
    }
  ];

  const recruitmentApproach = [
    { 
      step: '01', 
      title: 'Sourcing', 
      desc: 'Strong network, job portals, and referrals to attract top-quality talent fast.' 
    },
    { 
      step: '02', 
      title: 'Screening', 
      desc: 'Detailed evaluation of skills, communication style, and cultural fit.' 
    },
    { 
      step: '03', 
      title: 'Placement', 
      desc: 'Smooth negotiation, seamless onboarding, and post-placement closure support.' 
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-8 uppercase tracking-tighter uppercase leading-[0.9]">
              ARCHITECTING THE <span className="text-brand-purple">DIGITAL FUTURE</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed mb-6 font-normal">
              Trinexiss Technologies is a Pune-based powerhouse focused on delivering smart solutions in HR consulting, IT staffing, AI automation, and digital transformation.
            </p>
            <p className="text-lg text-slate-500 leading-relaxed">
              We work with startups, SMEs, and enterprises globally to help them scale using sovereign technology and elite talent. Our approach is purely results-driven, combining the latest in neural processing with verified human expertise.
            </p>
          </motion.div>
          <div className="w-full aspect-[4/5] lg:aspect-[16/10] bg-slate-900 rounded-[4rem] overflow-hidden relative shadow-2xl group border-8 border-white">
             <img 
               src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200" 
               alt="Professional Workspace" 
               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale select-none"
               referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/40 to-transparent"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {stats.map((item, i) => (
            <motion.div 
              key={i} 
              layout
              onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              className={`p-10 lg:p-12 rounded-[3.5rem] border cursor-pointer transition-all bg-purple-50/70 border-purple-100 group ${
                expandedIndex === i 
                ? 'shadow-2xl border-brand-purple ring-4 ring-brand-purple/5' 
                : 'shadow-sm hover:border-brand-purple/30'
              }`}
            >
               <div className={`w-16 h-16 shadow-sm rounded-2xl flex items-center justify-center mb-8 transition-colors ${expandedIndex === i ? 'bg-brand-purple text-white' : 'bg-white group-hover:bg-brand-purple/10'}`}>
                 {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
               </div>
               <h3 className={`font-display font-bold text-3xl mb-4 ${expandedIndex === i ? 'text-brand-purple' : 'text-slate-800'}`}>
                {item.title} <ArrowUpRight size={20} className={`inline transition-transform duration-500 ${expandedIndex === i ? 'rotate-45' : 'opacity-0'}`} />
               </h3>
               <p className={`leading-relaxed transition-colors ${expandedIndex === i ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                {item.desc}
               </p>
               
               <AnimatePresence>
                 {expandedIndex === i && (
                   <motion.div
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     className="overflow-hidden"
                   >
                     <p className="mt-8 pt-8 border-t border-brand-purple/10 text-slate-600 text-sm leading-relaxed">
                        {item.detail}
                     </p>
                   </motion.div>
                 )}
               </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center bg-brand-purple/5 p-12 lg:p-24 rounded-[4rem] border-4 border-white shadow-2xl mb-32 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
          <span className="text-brand-purple text-[10px] font-bold tracking-[0.4em] mb-4 block">WHY TRINEXISS</span>
          <h2 className="text-4xl lg:text-7xl font-display font-bold text-slate-800 mb-8 uppercase tracking-tighter uppercase leading-none">Why Choose Us</h2>
          <p className="text-slate-500 mb-16 font-medium max-w-xl mx-auto">What sets us apart in talent and technology delivery. Click to explore our philosophy.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left max-w-7xl mx-auto">
            {whyChoose.map((item, i) => (
              <motion.div 
                key={i} 
                layout
                onClick={() => setExpandedWhy(expandedWhy === i ? null : i)}
                className={`px-10 py-12 bg-white shadow-sm border rounded-[3rem] cursor-pointer transition-all flex flex-col h-full ${expandedWhy === i ? 'border-brand-purple ring-4 ring-brand-purple/5 scale-[1.02]' : 'border-slate-50 hover:border-brand-purple/30 hover:-translate-y-2'}`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${expandedWhy === i ? 'bg-brand-purple text-white' : 'bg-slate-50 text-brand-purple'}`}>
                    {i === 0 && <Target size={28} />}
                    {i === 1 && <Zap size={28} />}
                    {i === 2 && <Globe size={28} />}
                    {i === 3 && <Bot size={28} />}
                    {i === 4 && <Layers size={28} />}
                  </div>
                  <ChevronRight size={20} className={`transition-transform duration-300 ${expandedWhy === i ? 'rotate-90 text-brand-purple' : 'text-slate-300'}`} />
                </div>

                <h3 className="text-xl font-display font-bold text-slate-900 mb-4 uppercase tracking-tight">{item.title}</h3>
                <p className={`text-sm leading-relaxed mb-4 transition-colors ${expandedWhy === i ? 'text-slate-400' : 'text-slate-500'}`}>{item.desc}</p>
                
                <AnimatePresence>
                  {expandedWhy === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 mt-6 border-t border-slate-100">
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                          {item.detail}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {expandedWhy !== i && (
                   <div className="mt-auto pt-6 text-[10px] font-bold uppercase tracking-widest text-brand-purple flex items-center gap-2">
                     Learn More <Plus size={12} />
                   </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recruitment Approach */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <span className="text-brand-pink text-[10px] font-bold tracking-[0.4em] mb-4 block uppercase leading-none">OUR PROCESS</span>
            <h2 className="text-4xl lg:text-7xl font-display font-bold text-slate-800 mb-8 uppercase tracking-tighter leading-none">Recruitment Approach</h2>
            <p className="text-slate-500 mb-16 font-medium max-w-xl mx-auto">A structured, transparent process that delivers results every time.</p>
          </div>

          <div className="relative">
            {/* Horizontal Line */}
            <div className="absolute top-12 left-0 w-full h-1 bg-brand-pink/10 -translate-y-1/2 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 px-4">
              {recruitmentApproach.map((item, i) => (
                <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="w-24 h-24 bg-white border-4 border-brand-pink rounded-full mb-8 shadow-xl flex items-center justify-center z-10 hover:scale-110 transition-transform">
                    <div className="w-6 h-6 bg-brand-pink rounded-full shadow-[0_0_15px_rgba(239,71,111,0.5)]" />
                  </div>
                  <span className="text-brand-pink text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">STEP {item.step}</span>
                  <h3 className="text-2xl font-display font-bold text-slate-900 mb-4 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Page Join CTA */}
        <div className="p-12 lg:p-24 bg-gradient-to-br from-brand-purple/5 to-brand-pink/5 border border-purple-100 rounded-[4rem] text-center shadow-inner relative overflow-hidden group">
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-purple/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
           <h2 className="text-3xl lg:text-5xl font-display font-bold text-slate-900 tracking-tighter uppercase mb-8 relative z-10">Start your journey with us</h2>
           <p className="text-slate-500 max-w-xl mx-auto mb-12 text-lg relative z-10">We are currently looking for visionary talent to help us architect the neural future of enterprise workflows.</p>
           <button 
            onClick={() => setPage('careers')}
            className="btn-gradient !px-12 !py-5 text-lg shadow-2xl shadow-brand-purple/30 relative z-10"
           >
            Open Positions <ArrowRight size={20} className="inline ml-2" />
           </button>
        </div>
      </div>
    </div>
  );
};

const CareersPage = () => {
  const [expandedPerk, setExpandedPerk] = useState<number | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      if (window.jotformEmbedHandler) {
        try {
          // @ts-ignore
          window.jotformEmbedHandler("iframe[id='JotFormIFrame-261302156931046']", "https://form.jotform.com/");
        } catch (err) {
          console.error('Error initializing JotForm handler:', err);
        }
      }
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const benefits = [
    { icon: '💰', title: 'Competitive Pay', desc: 'Market-leading salary + performance bonuses based on impact.', detail: 'We offer quarterly performance bonuses and annual salary reviews tracking with top 5% of local market rates.' },
    { icon: '🏠', title: 'Remote First', desc: 'Work from anywhere, flexible hours built for high performance.', detail: 'Our core hours are 11 AM to 4 PM IST to allow for deep work and healthy life-work balance.' },
    { icon: '📚', title: 'L&D Budget', desc: '₹50,000/yr for courses, books, and international AI conferences.', detail: 'We actively encourage continuous upskilling. This budget can be used for any technical certification or AI conference travel.' },
    { icon: '🏥', title: 'Health Cover', desc: 'Full medical insurance for you and your dependents.', detail: 'Includes mental health support, family health cover up to ₹10L, and maternity benefits.' },
    { icon: '📈', title: 'Stock Options', desc: 'ESOPs for all full-time employees to participate in our growth.', detail: 'Every engineering hire receives stock options vesting over 4 years with a 1-year cliff.' },
    { icon: '🎉', title: 'Paid Leave', desc: '30 days annual PTO plus all gazetted public holidays.', detail: 'Unlimited sick leave and "recharge days" after major project completions.' }
  ];

  return (
    <div className="pt-32 pb-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        {/* New Hero Section */}
        <div className="text-center py-20 bg-slate-900 rounded-[4rem] mb-12 relative overflow-hidden group border-8 border-white shadow-2xl">
           <img src="https://images.unsplash.com/photo-1542641728-6ca359b085f4?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-20 filter saturate-0 group-hover:scale-105 transition-transform duration-1000" alt="Team Career" referrerPolicy="no-referrer" />
           <div className="relative z-10 flex flex-col items-center">
             <div className="px-6 py-2.5 bg-brand-purple/20 border border-white/10 rounded-full text-brand-purple text-[10px] font-bold tracking-[0.3em] uppercase mb-10 backdrop-blur-md">THE TECH FRONTIER</div>
             <h1 className="text-6xl lg:text-8xl font-display font-bold text-white mb-6 tracking-tighter uppercase leading-none">BUILD THE <span className="text-brand-purple">FUTURE</span></h1>
             <p className="text-white/60 text-xl lg:text-2xl max-w-2xl mx-auto font-normal leading-relaxed">Join Pune's premier women-led neural expansion hub and scale global AI systems.</p>
           </div>
        </div>

        {/* Benefits */}
        <div className="mb-32">
           <div className="text-center mb-16">
             <span className="text-brand-purple text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">Core Value & Culture</span>
             <h2 className="text-5xl font-display font-bold text-slate-900 tracking-tighter uppercase mb-6">WE TAKE CARE OF OUR TEAM</h2>
             <p className="text-slate-500 max-w-xl mx-auto font-medium">Click on any perk to see how we invest in your professional growth and well-being.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((item, i) => (
                 <motion.div 
                  key={i} 
                  layout
                  onClick={() => setExpandedPerk(expandedPerk === i ? null : i)}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className={`p-10 rounded-[3rem] border transition-all cursor-pointer ${
                    expandedPerk === i 
                    ? 'bg-purple-900 text-white border-brand-purple shadow-2xl scale-[1.02]' 
                    : 'bg-purple-50/70 border-purple-100 hover:border-brand-purple/30 group shadow-sm'
                  }`}
                 >
                    <div className="flex gap-6 items-start">
                      <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-2xl transition-all ${expandedPerk === i ? 'bg-white/10' : 'bg-white shadow-sm grayscale group-hover:grayscale-0'}`}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className={`font-display font-bold text-xl mb-1 ${expandedPerk === i ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                        <p className={`text-sm leading-relaxed ${expandedPerk === i ? 'text-white/70' : 'text-slate-400'}`}>{item.desc}</p>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {expandedPerk === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-8 pt-8 border-t border-white/10 text-white/60 text-sm leading-relaxed"
                        >
                           {item.detail}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="mt-8 flex justify-end">
                       <ArrowUpRight size={20} className={`transition-all duration-500 ${expandedPerk === i ? 'text-white rotate-45' : 'text-brand-purple opacity-0 group-hover:opacity-100'}`} />
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* JotForm Section */}
        <div className="mt-32 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-slate-900 tracking-tighter uppercase mb-6 leading-none">Job <span className="text-brand-purple">Application Portal</span></h2>
            <p className="text-slate-500 mt-4 text-lg font-normal">Fill out our standard application form below to join the expansion.</p>
          </div>
          <div className="bg-white rounded-[3rem] p-2 sm:p-4 border border-slate-100 shadow-xl overflow-hidden min-h-[600px]">
             <iframe
                id="JotFormIFrame-261302156931046"
                title="Job Application Form"
                onLoad={() => window.scrollTo(0,0)}
                allow="geolocation; microphone; camera; fullscreen; payment"
                src="https://form.jotform.com/261302156931046"
                style={{ width: '100%', minWidth: '100%', height: '539px', border: 'none' }}
                scrolling="no"
              />
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioPage = ({ onItemClick }: { onItemClick: (item: DetailItem) => void }) => {
  const projects: DetailItem[] = [
    { 
      title: 'AI Lead Management Automation', 
      industry: 'Digital Marketing',
      tags: ['Zapier', 'Google Sheets'], 
      desc: '100% lead tracking and faster response time.',
      problem: 'Leads from website forms were not properly tracked, causing loss of potential clients.',
      solution: 'We implemented an automated lead capture system using Zapier to store and manage leads in real-time.',
      process: 'Form Submission | Data stored in Google Sheets | Auto email notification',
      result: '✔ 100% lead tracking\n✔ Faster response time\n✔ Increased conversion rate',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200',
      modalBg: 'bg-purple-50',
      accent: 'border-purple-200',
      deepDive: {
        overview: 'Many businesses collect leads through website forms, but without a proper system, these leads often get missed or lost. No centralized storage, no instant notifications, and manual tracking often leads to human error. We implemented an automated lead management system using Zapier to capture, store, and alert the team instantly.',
        sections: [
          {
            title: 'Implementation Workflow',
            icon: '⚙️',
            explanation: 'A step-by-step automated journey ensuring every lead is handled precisely and immediately.',
            list: [
              'Form Submission: Data captured instantly from website.',
              'Secure Storage: Zapier sends data to Google Sheets automatically.',
              'Team Notification: Instant email alerts with full lead details.'
            ],
            businessValue: [
              'No lead loss',
              'Real-time tracking',
              'Faster response',
              'Organized data',
              'Zero manual work'
            ],
            example: 'A user fills a contact form -> zapier adds it as a row in Google Sheets -> Team gets an email alert instantly. Result: Win!'
          }
        ]
      }
    },
    { 
      title: 'Customer Support Automation System', 
      industry: 'E-commerce',
      tags: ['n8n', 'AI Chatbot', 'APIs'], 
      desc: '70% faster response time and improved satisfaction.',
      problem: 'Customer queries were handled manually, leading to delays and poor experience.',
      solution: 'We built an AI-powered support system integrated with n8n to automate responses and ticket creation.',
      process: 'Customer Query | AI Response | Ticket Generated | Assigned to team',
      result: '✔ 70% faster response time\n✔ Improved customer satisfaction\n✔ Reduced manual workload',
      image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=1200',
      modalBg: 'bg-purple-50',
      accent: 'border-purple-200',
      deepDive: {
        overview: 'Customer queries were handled manually, leading to delays and poor experience. We built an AI-powered support system integrated with n8n to automate responses and ticket creation.',
        sections: [
          {
            title: 'Implementation Workflow',
            icon: '🤖',
            explanation: 'A streamlined pipeline from user inquiry to resolved ticket, powered by AI and n8n.',
            list: [
              'Intelligent Query Parsing',
              'Automated AI Response Generation',
              'Dynamic Ticket Creation',
              'Smart Human Escalation'
            ],
            example: 'Customer Query → AI Response → Ticket Generated → Assigned to team'
          }
        ]
      }
    },
    { 
      title: 'Marketing Analytics Dashboard', 
      industry: 'Advertising Agency',
      tags: ['Looker Studio', 'Google Analytics'], 
      desc: 'Clear performance insights and increased ROI.',
      problem: 'Client could not track performance of ads across platforms (Google, Facebook, etc.), leading to fragmented data and delayed reporting.',
      solution: 'We created an interactive dashboard using Looker Studio to centralize and visualize all marketing data automatically.',
      process: 'Data Collection | Dashboard Creation | Real-time updates',
      result: '✔ Clear performance insights\n✔ Better decision making\n✔ Increased ROI',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      modalBg: 'bg-purple-50',
      accent: 'border-purple-200',
      deepDive: {
        overview: 'The client faced major issues tracking campaign data across multiple platforms. We built an interactive dashboard using Looker Studio to centralize, visualize, and update all marketing metrics in real-time.',
        sections: [
          {
            title: 'Implementation Workflow',
            icon: '📊',
            explanation: 'Transforming scattered data points into actionable visual intelligence.',
            list: [
              'Multi-Platform Data Collection',
              'Custom Metric Dashboarding',
              'Live Data Refresh Sync'
            ],
            businessValue: [
              'All data in one place',
              'Real-time tracking',
              'Easy comparison',
              'Better ROI analysis',
              'Faster smart decisions'
            ],
            example: 'Combine Google Ads, Meta Ads and GA4 into one screen showing CPC, Clicks, and Conversions for all channels at once.'
          }
        ]
      }
    },
    { 
      title: 'Business Process Automation', 
      industry: 'Service-Based Company',
      tags: ['n8n', 'APIs'], 
      desc: '80% time saved and reduced error rates.',
      problem: 'Manual data entry and repetitive tasks were time-consuming and error-prone, slowing down business growth.',
      solution: 'We implemented intelligent workflow automation using n8n to handle operations efficiently and connect tools seamlessly.',
      process: 'Task Trigger | Automation Workflow | Data Processing | Notification',
      result: '✔ 80% time saved\n✔ Reduced errors\n✔ Improved productivity',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=1200',
      modalBg: 'bg-purple-50',
      accent: 'border-purple-200',
      deepDive: {
        overview: 'Many business operations were handled manually, creating repetitive tasks and human errors. We implemented intelligent workflow automation using n8n to handle these tasks automatically and accurately.',
        sections: [
          {
            title: 'Core Implementation Components',
            icon: '⚡',
            explanation: 'The architectural pillars of our custom-built automation ecosystem.',
            list: [
              'Trigger Identification: Auto-detecting new portal entries.',
              'Workflow Modeling: Logic-based branching inside n8n.',
              'API Integration: Syncing CRM and ERP systems.',
              'Reporting & Logs: Automated transparency and tracking.'
            ],
            businessValue: [
              'Reduced workload',
              'Minimized errors',
              'Faster execution',
              'Scalable processes'
            ]
          },
          {
            title: 'Implementation Workflow',
            icon: '⚙️',
            explanation: 'A step-by-step breakdown of how the automated system processes information.',
            list: [
              'Task Trigger: New entry, update, or request occurs.',
              'Workflow Execution: n8n runs the predefined logic.',
              'Data Transformation: Validated and sent to target systems.',
              'Instant Alerts: Team notified via Email/Slack.'
            ],
            example: 'New form entry -> n8n executes workflow -> data transformed -> User gets welcome email & Sales gets Slack alert.'
          }
        ]
      }
    },
    { 
      title: 'SaaS CRM Development', 
      industry: 'Startup',
      tags: ['React', 'Node.js', 'APIs'], 
      desc: 'Centralized system for better customer management.',
      problem: 'Client was managing customer data manually via Excel/WhatsApp, leading to scattered data and missed follow-ups.',
      solution: 'We developed a scalable SaaS-based CRM application with automation features and cloud accessibility.',
      process: 'User Login | Data Management | Automation | Reporting',
      result: '✔ Centralized system\n✔ Better customer management\n✔ Business growth',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
      modalBg: 'bg-purple-50',
      accent: 'border-purple-200',
      deepDive: {
        overview: 'The client was managing lead details manually, leading to unorganized data and missed interactions. We developed a scalable SaaS CRM to centralize data, automate follow-ups, and integrate with other communication tools.',
        sections: [
          {
            title: 'Implementation Workflow',
            icon: '💻',
            explanation: 'A full-stack lead management platform built for efficiency and team collaboration.',
            list: [
              'Secure Role-Based Login',
              'Centralized Lead Management',
              'Automated Reminders & Tasks',
              'Interactive Sales Reporting'
            ],
            businessValue: [
              'Centralized data system',
              'Improved relationships',
              'Increased team efficiency',
              'Total pipeline tracking'
            ],
            example: 'Login → Manage customer details → System triggers auto-reminders for callbacks → View sales performance.'
          }
        ]
      }
    },
    { 
      title: 'MediFlow – Smart Healthcare System', 
      industry: 'Healthcare',
      tags: ['SaaS', 'Healthcare Tech', 'React'], 
      desc: 'Digitized records and automated scheduling for doctors.',
      problem: 'Doctors were managing patient records and appointments manually, causing double-booking and difficulty in tracking history.',
      solution: 'We developed MediFlow, a custom SaaS healthcare application to digitize patient records and automate clinical operations.',
      process: 'Patient Registration | Appointment Booking | Doctor Dashboard | Data Storage | Report Access',
      result: '✔ Reduced manual work\n✔ Faster patient management\n✔ 100% scheduling accuracy',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
      modalBg: 'bg-purple-50',
      accent: 'border-purple-200',
      deepDive: {
        overview: 'Manual record-keeping was slowing down doctors and patients alike. We developed MediFlow to automate appointments and digitize medical history for a faster, error-free clinical experience.',
        sections: [
          {
            title: 'Core Features',
            icon: '🏥',
            explanation: 'Digitizing the patient journey from booking to prescription.',
            list: [
              'Doctor Command Center: Daily schedules in real-time.',
              'Smart Booking: No double-bookings or conflicts.',
              'Digital Records: Secure storage of patient medical history.',
              'Instant Patient Alerts: SMS and email notifications.'
            ],
            businessValue: [
              'Full digital workflow',
              '100% efficient scheduling',
              'Zero paperwork mistakes',
              'Enhanced patient experience'
            ],
            example: 'Doctor sees live dashboard -> access patient history in 1 click -> schedule follow-up. Result: Better care, zero delay.'
          }
        ]
      }
    }
  ];

  const profilesServed = [
    { cat: 'IT Profiles', items: 'Developers (.NET, Java), Data Engineers, AI Specialists' },
    { cat: 'Engineering Profiles', items: 'Mechanical, Electrical, Process Engineers' },
    { cat: 'Business Roles', items: 'Sales, Business Analysts, Digital Marketing' },
    { cat: 'Other Roles', items: 'ERP Consultants (Oracle, SAP), Network Engineers' }
  ];

  const techExpertise = [
    { title: 'Enterprise Apps', items: ['Oracle E-Business Suite (EBS)', 'Oracle Fusion Cloud', 'SAP & Salesforce'] },
    { title: 'Cloud & Analytics', items: ['Oracle Cloud', 'Power BI / Looker Studio', 'Data Analytics'] },
    { title: 'Emerging Tech', items: ['Artificial Intelligence (AI)', 'Automation & Workflow Tools', 'SaaS Platforms'] }
  ];

  return (
    <div className="pt-32 pb-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 px-4">
          <span className="text-brand-purple text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">SUCCESS STORIES</span>
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6 uppercase tracking-tighter leading-none">
            STRATEGIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink">IMPACT</span>
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto font-normal">Delivering high-performance technical ecosystems across diverse industrial domains.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                rotateY: i % 2 === 0 ? 5 : -5,
                transition: { duration: 0.3 }
              }}
              style={{ perspective: '1000px' }}
              onClick={() => onItemClick(p)}
              className={`group overflow-hidden border-2 transition-all rounded-[3rem] cursor-pointer bg-white shadow-xl hover:shadow-2xl relative ${p.accent}`}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                 <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" referrerPolicy="no-referrer" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                 
                 <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur text-[10px] font-bold text-slate-900 rounded-full uppercase tracking-widest shadow-lg">
                      {p.industry}
                    </span>
                 </div>
              </div>
              
              <div className="p-8 relative">
                <div className="flex flex-wrap gap-2 mb-6">
                   {p.tags?.map(t => (
                     <span key={t} className={`text-[8px] uppercase tracking-widest font-bold px-3 py-1 rounded-md border ${
                       i % 2 === 0 ? 'text-brand-purple bg-brand-purple/5 border-brand-purple/10' : 'text-brand-pink bg-brand-pink/5 border-brand-pink/10'
                     }`}>{t}</span>
                   ))}
                </div>
                
                <h3 className="font-display font-bold text-xl text-slate-900 mb-4 uppercase tracking-tight leading-tight group-hover:text-brand-purple transition-colors">
                  {p.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-2 italic font-medium">
                  "{p.desc}"
                </p>
                
                <div className={`mt-auto pt-6 border-t border-slate-50 flex items-center justify-between group-hover:border-slate-100 transition-colors`}>
                   <div className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-all">
                     View Metrics <Plus size={14} />
                   </div>
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                     i % 2 === 0 ? 'bg-brand-purple text-white shadow-brand-purple/20' : 'bg-brand-pink text-white shadow-brand-pink/20'
                   } shadow-lg group-hover:scale-110`}>
                     <ChevronRight size={18} />
                   </div>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className={`absolute top-0 right-0 w-16 h-1 w-full scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-500 ${i % 2 === 0 ? 'bg-brand-purple' : 'bg-brand-pink'}`} />
            </motion.div>
          ))}
        </div>

        {/* Tech Expertise on Portfolio */}
        <div className="mb-32">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-display font-bold text-slate-900 mb-6 uppercase tracking-tight">Technologies & Expertise</h2>
             <div className="w-16 h-1 bg-gradient-to-r from-brand-purple to-brand-pink mx-auto rounded-full" />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {techExpertise.map((tech, i) => (
                <div key={i} className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden group border border-white/5 shadow-2xl">
                   <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-20 ${i % 2 === 0 ? 'bg-brand-purple' : 'bg-brand-pink'}`} />
                   <h4 className={`font-display font-bold text-lg mb-8 uppercase tracking-widest border-b border-white/10 pb-4 ${i % 2 === 0 ? 'text-brand-purple' : 'text-brand-pink'}`}>{tech.title}</h4>
                   <ul className="space-y-4">
                      {tech.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-white/50 text-xs font-bold tracking-widest uppercase">
                           <div className="w-1.5 h-1.5 bg-brand-pink rounded-full" />
                           {item}
                        </li>
                      ))}
                   </ul>
                </div>
              ))}
           </div>
        </div>

        {/* Industries we serve */}
        <div className="bg-purple-50/50 rounded-[4rem] p-12 lg:p-20 relative overflow-hidden border border-purple-100 shadow-inner">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-purple/5 to-brand-pink/5 -z-10" />
           <h2 className="text-3xl font-display font-bold text-slate-900 mb-12 uppercase tracking-tight text-center">Industries & Profiles We Serve</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              {profilesServed.map((p, i) => (
                <div key={i} className={`p-8 bg-white border rounded-3xl transition-all group ${
                  i % 2 === 0 ? 'hover:bg-brand-purple/5 hover:border-brand-purple/20 hover:border-brand-purple/30' : 'hover:bg-brand-pink/5 hover:border-brand-pink/20 hover:border-brand-pink/30'
                }`}>
                   <h4 className={`font-display font-bold text-lg mb-3 uppercase tracking-widest ${i % 2 === 0 ? 'text-brand-purple' : 'text-brand-pink'}`}>{p.cat}</h4>
                   <p className="text-slate-500 text-sm leading-relaxed">{p.items}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

const UseCasesPage = ({ onItemClick }: { onItemClick: (item: DetailItem) => void }) => {
  const cases: DetailItem[] = [
    { 
      title: 'Customer Support Automation', 
      icon: <Bot />, 
      desc: 'AI-powered chatbot + Zapier automation.', 
      problem: 'Many businesses face a common issue: customers have to wait a long time to get replies. High volume of messages causes delays and frustration.',
      solution: 'We implemented an AI-powered chatbot integrated with automation tools like Zapier for instant 24/7 service.',
      result: '✅ Instant Replies\n⚡ 70% Faster Response Time\n😊 Improved Customer Satisfaction',
      color: 'bg-purple-50',
      accent: 'border-purple-200',
      deepDive: {
        overview: 'To solve manual query handling, we implemented an AI-powered chatbot integrated with automation tools like Zapier.',
        sections: [
          {
            title: 'AI Chatbot Integration',
            icon: '🤖',
            explanation: 'Deployed chatbot on website / WhatsApp / Messenger to handle FAQs like pricing, services, and booking using NLP.',
            list: ['Website & WhatsApp Bots', 'Natural Language Processing', 'Handling FAQs (Pricing, Services)'],
            businessValue: ['Instant 24/7 Replies', 'Reduced Support Workload', 'Lead Capture'],
            example: 'A company receives 100+ customer queries daily → AI chatbot handles themes automatically and reduces support workload instantly.'
          },
          {
            title: 'Automation & Routing',
            icon: '⚡',
            explanation: 'Zapier connects the chatbot with CRMs and Email, while smart routing forwards complex issues to human agents.',
            list: ['Zapier CRM Integration', 'Automated Lead Storage', 'Smart Routing to Human Agents', '24/7 Continuity'],
            businessValue: ['Zero Manual Entry', 'Lead Capture Efficiency', 'Improved UX'],
            example: 'New query → stored in database. Lead inquiry → sent to sales team instantly. Complaint → assigned to support agent.'
          }
        ]
      }
    },
    { 
      title: 'Marketing Performance Dashboard', 
      icon: <BarChart3 />, 
      desc: 'Real-time marketing insights across all platforms.', 
      problem: 'Businesses struggle to track marketing performance across multiple platforms (Facebook, Google, LinkedIn, etc.) leading to fragmented data and wasted budget.',
      solution: 'We built a unified Marketing Performance Dashboard using Looker Studio to track ROI and KPIs of all channels in one place.',
      result: '✅ 100% Channel Tracking\n⚡ Real-time ROI Insights\n📈 Optimized Budget Allocation',
      color: 'bg-purple-50',
      accent: 'border-purple-200',
      deepDive: {
        overview: 'Connects all your marketing data sources into one interactive hub to provide a single source of truth for growth metrics.',
        sections: [
          {
            title: 'Full-Funnel Tracking',
            icon: '🔗',
            explanation: 'Integrating Meta Ads, Google Ads, LinkedIn, and GA4 to visualize the entire customer journey from click to conversion.',
            list: ['Multi-Channel Integration', 'Real-time KPI Tracking', 'Conversion Path Mapping'],
            businessValue: ['Unified Data View', 'Budget Efficiency', 'Data-Driven Growth'],
            example: 'Marketing manager sees all campaign costs and results in one dashboard. Result: Wasted spend identified and cut by 20%.'
          },
          {
            title: 'ROI Intelligence',
            icon: '🧠',
            explanation: 'Automated calculation of ROI and CAC (Customer Acquisition Cost) across all platforms for faster decision making.',
            list: ['Automated ROI Reports', 'CAC vs LTV Tracking', 'Predicted Performance Alerts'],
            businessValue: ['Faster Decisions', 'Accountability', 'Strategic Clarity'],
            example: 'Dashboard sends alert when CAC exceeds target. Team adjusts ads instantly, preserving profit margins.'
          }
        ]
      }
    },
    { 
      title: 'Business Process Automation', 
      icon: <Settings />, 
      desc: 'Reduced manual work and saved time with n8n.', 
      problem: 'Many companies struggle with manual data entry and repetitive tasks (emails, reports) which slow down operations.',
      solution: 'We implemented automated workflows using n8n to connect tools and eliminate manual copy-pasting.',
      result: '✅ Reduced Manual Work\n⏳ Saved Time (Hours to Seconds)\n🚀 Increased Productivity',
      color: 'bg-purple-50',
      accent: 'border-purple-200',
      deepDive: {
        overview: 'Workflow automation setup using n8n to connect CRM, Google Sheets, Email, and APIs for seamless operations.',
        sections: [
          {
            title: 'Trigger-Based Actions',
            icon: '⚡',
            explanation: 'Automation starts when a specific event occurs, such as a form submission, ensuring data is moved instantly.',
            list: ['New Form Submission Sync', 'Real-time Data Integration', 'No Manual Copy-Paste'],
            businessValue: ['Zero Human Error', 'Real-time Sync', 'Higher Efficiency'],
            example: 'New form submission → data automatically saved. New lead → added to CRM instantly. No human effort required.'
          },
          {
            title: 'Logic & Productivity',
            icon: '🚀',
            explanation: 'Conditional workflows handle complex processes, sending automatic emails and updates without manual effort.',
            list: ['Conditional (If/Else) Workflows', 'Task & Report Automation', 'Focus on Strategy'],
            businessValue: ['Scalable Operations', 'Reduced Operational Cost', 'Team Morale Boost'],
            example: 'Tasks that took hours are completed in seconds. Team can focus on important work like strategy and growth.'
          }
        ]
      }
    },
    { 
      title: 'SaaS CRM Development', 
      icon: <Layers />, 
      desc: 'Centralized data and automated follow-ups.', 
      problem: 'Lead data scattered across multiple platforms (Excel, WhatsApp), missed follow-ups, and no visibility of pipeline.',
      solution: 'Developed custom SaaS CRM to manage leads, track interactions, and automate follow-ups in one place.',
      result: '📌 Centralized Data\n🔁 Automated Follow-Ups\n🤝 Better Customer Management',
      color: 'bg-purple-50',
      accent: 'border-purple-200',
      deepDive: {
        overview: 'Cloud-based platform where businesses manage customer data, track sales, and automate communications.',
        sections: [
          {
            title: 'Main Features',
            icon: '⚙️',
            explanation: 'A centralized dashboard giving real-time updates and full control over lead status from intake to conversion.',
            list: ['Centralized Dashboard', 'Lead Status Tracking (New to Converted)', 'Team Assignment Tools'],
            businessValue: ['Complete Pipeline Visibility', 'Data Security', 'No Confusion'],
            example: 'Capture leads from website/ads → Assign to team members → Track status in real-time on one screen.'
          },
          {
            title: 'Automation & History',
            icon: '🔁',
            explanation: 'Automatic email and SMS reminders ensure no lead is missed, while activity tracking maintains full customer history.',
            list: ['Auto Email/SMS Reminders', 'Call & Meeting Logging', 'Complete History Tracking'],
            businessValue: ['Improved Conversion Rate', 'Better Relationships', 'Scalable Management'],
            example: 'System sends auto-reminders to clients for follow-ups. Result: No missed opportunities and higher closing ratios.'
          }
        ]
      }
    },
    { 
      title: 'IT Staffing Solution', 
      icon: <Briefcase />, 
      desc: 'Ready-to-join technical talent pool.', 
      problem: 'Long hiring cycles (months), difficulty finding specialized talent, and project delays due to unfilled positions.',
      solution: 'We provide pre-screened, highly skilled developers (frontend, backend, AI) ready to join immediately.',
      result: '⚡ Faster Hiring (Days, not months)\n💰 Reduced Recruitment Cost\n🚀 Improved Project Delivery',
      color: 'bg-purple-50',
      accent: 'border-purple-200',
      deepDive: {
        overview: 'Bridging the skill gap by delivering suitable developer profiles within a short time from a verified talent pool.',
        sections: [
          {
            title: 'Screening Protocol',
            icon: '🎯',
            explanation: 'Candidates are verified through technical assessments, coding tests, and deep interview evaluations for high quality.',
            list: ['Technical Assessments', 'Verified Talent Pool', 'Coding Proof-of-Skill'],
            businessValue: ['Qualified Hires Only', 'Zero Risk Talent', 'Immediate Start'],
            example: 'Technical tests conducted for every candidate ensure project-readiness. Candidates verified for AI, React, Node, etc.'
          },
          {
            title: 'Hiring Models',
            icon: '🚀',
            explanation: 'Flexible engagement options including full-time hiring, contract-based roles, or remote offshore teams.',
            list: ['Full-time Hiring', 'Contract-based Models', 'Remote/Offshore Teams', 'End-to-End Support'],
            businessValue: ['Cost Optimization', 'Operational Efficiency', 'Speed to Market'],
            example: 'Reduced hiring time from months to days. Urgent project needs developer -> suitable profiles delivered instantly.'
          }
        ]
      }
    },
    { 
      title: 'Lead Management Automation', 
      icon: <Mail />, 
      desc: 'Zapier-based tracking and acting.', 
      problem: 'Form submissions get missed/ignored, no centralized storage, and slow response leads to lost customers.',
      solution: 'Implemented lead capture and automation using Zapier to ensure every lead is tracked and acted upon instantly.',
      result: '📌 100% Lead Tracking\n⚡ Faster Response\n📈 Increased Conversions',
      color: 'bg-purple-50',
      accent: 'border-purple-200',
      deepDive: {
        overview: 'Ensure no data loss by automating the bridge between your website and your sales systems.',
        sections: [
          {
            title: 'Capture & Store',
            icon: '📌',
            explanation: 'Every form submission is instantly captured and stored in tools like CRM or Google Sheets automatically.',
            list: ['Automatic Lead Capture', 'Centralized Data Integration', 'Data Duplication Guard'],
            businessValue: ['Zero Data Loss', 'Organized Growth', 'Real-time Tracking'],
            example: 'Form submitted on website → Lead stored in Sheets & CRM instantly. Total leads tracked: 100%.'
          },
          {
            title: 'Alert & Follow-up',
            icon: '⚡',
            explanation: 'Sales team receives real-time alerts while customers get an immediate automated welcome message.',
            list: ['Instant Sales Alerts (Email/Slack)', 'Automated Instant Follow-ups', 'Engagement Boost'],
            businessValue: ['Faster Response', 'High Retention', 'Improved Trust'],
            example: 'Lead заполняет form → Sales team gets Slack alert → Auto-email sent to Lead. Result: Engaged instantly.'
          }
        ]
      }
    },
    { 
      title: 'Sales Reporting Automation', 
      icon: <BarChart />, 
      desc: 'Trinexiss Intelligence Hub Integration.', 
      problem: 'Manual report creation is slow, error-prone, and uses data from multiple disconnected sources (Excel, Ads, etc.).',
      solution: 'Automated the entire reporting system using smart dashboards and data tools like Looker Studio.',
      result: '📅 Daily Automated Reports\n🎯 Accurate Data\n⏳ Time Saving',
      color: 'bg-purple-50',
      accent: 'border-purple-200',
      deepDive: {
        overview: 'Trinexiss Intelligence Hub automates data flow from CRM and marketing platforms into central live dashboards.',
        sections: [
          {
            title: 'Data Flow',
            icon: '🔗',
            explanation: 'Connected multiple data sources so that data flows automatically into a central system for visualization.',
            list: ['CRM & Analytics Sync', 'Centralized System Architecture', 'No Manual Entry Error'],
            businessValue: ['Reliable Insights', 'Zero Calculation Error', 'Consistency'],
            example: 'Data from Facebook, Google Ads, and CRM unified into one report. No more Excel spreadsheets.'
          },
          {
            title: 'Insights & Delivery',
            icon: '📊',
            explanation: 'Reports are generated automatically on a schedule and delivered via email, providing real-time tracking.',
            list: ['Automated Dashboards', 'Scheduled Email Reporting', 'Live Performance Tracking'],
            businessValue: ['Quick Decision Making', 'Strategy Focus', 'Accurate ROI Tracking'],
            example: 'CEO gets a daily morning performance report automatically. Result: Saves hours of manual team work every day.'
          }
        ]
      }
    },
    { 
      title: 'AI-Based Email Classification', 
      icon: <Inbox />, 
      desc: 'Intelligent AI-powered email routing.', 
      problem: 'Handling hundreds of emails (spam, queries, complaints) manually causes delays, overload, and missed priorities.',
      solution: 'Built an AI-powered automation system using n8n to intelligently read, classify, and route emails.',
      result: '⚡ 80% Faster Email Handling\n🤖 No Manual Sorting Needed\n🚀 Improved Team Efficiency',
      color: 'bg-purple-50',
      accent: 'border-purple-200',
      deepDive: {
        overview: 'System continuously monitors incoming emails and uses AI models to understand intent and route tasks.',
        sections: [
          {
            title: 'Classification logic',
            icon: '🧠',
            explanation: 'AI categorizes emails into Spam, Customer Query, Complaint, or Sales Inquiry based on content analysis.',
            list: ['Intent Recognition', 'Spam Filtering', 'Priority Handling'],
            businessValue: ['Zero Manual Sorting', 'Fast Response', 'Focused Teams'],
            example: 'Incoming email: "I have a problem with my bill" → AI Tags "Complaint" → Sets "Urgent" → Routes to Billing Team.'
          },
          {
            title: 'Automated Workflows',
            icon: '⚡',
            explanation: 'Using n8n, specific actions are triggered such as auto-replies, notifications, and CRM updates instantly.',
            list: ['Auto-Replied FAQs', 'Sales Lead Routing', 'CRM Sync', 'Slack Notifications'],
            businessValue: ['80% Speed Boost', 'Productivity Maximized', 'No Missed Comms'],
            example: 'Sales inquiry detected → forwarded instantly to sales rep → Added to CRM. Result: Lead captured in seconds.'
          }
        ]
      }
    },
    { 
      title: 'E-commerce Order Automation', 
      icon: <Package />, 
      desc: 'Seamless zero-manual order processing.', 
      problem: 'Manual entry, slow invoice generation, and lack of timely updates create errors and poor customer experience.',
      solution: 'Automated the entire order processing workflow using Zapier for error-free operations.',
      result: '⚡ Faster Order Processing\n✅ Zero Manual Entry Errors\n😊 Better Customer Experience',
      color: 'bg-purple-50',
      accent: 'border-purple-200',
      deepDive: {
        overview: 'Connects your store to invoices, CRM, and notifications to handle high order volumes flawlessly.',
        sections: [
          {
            title: 'Capture & Doc Gen',
            icon: '🚚',
            explanation: 'Orders are captured instantly from the website and invoices are generated automatically upon purchase.',
            list: ['Instant Order Capture', 'Auto Invoice Generation', 'Zero Manual Entry'],
            businessValue: ['Speed-to-Fulfillment', 'Reliability', 'Resource Efficiency'],
            example: 'Order placed → Invoice generated and shared with customer instantly → Data stored in CRM.'
          },
          {
            title: 'Notifications & Sync',
            icon: '📱',
            explanation: 'Customers receive immediate updates via email/SMS while data is synced across your entire stack.',
            list: ['Real-Time Store Sync', 'Instant Customer Notifications', 'Centralized Data Management'],
            businessValue: ['Trust Building', 'Reduced Support Load', 'Seamless Fulfillment'],
            example: 'Customer receives confirmation within seconds of purchase. No human mistakes in shipping data.'
          }
        ]
      }
    },
    { 
      title: 'HR Recruitment Automation', 
      icon: <Search />, 
      desc: 'AI-powered parsing and scheduling.', 
      problem: 'HR teams overwhelmed by manual resume screening, slow shortlisting, and manual scheduling coordination.',
      solution: 'Implemented AI-powered recruitment with resume parsing and automated interview scheduling.',
      result: '⚡ Reduced Hiring Lead Time\n🎯 Better Candidate Selection\n🤖 Fully Automated HR Process',
      color: 'bg-purple-50',
      accent: 'border-purple-200',
      deepDive: {
        overview: 'Intelligent system to filter, rank, and schedule candidates with minimal manual intervention.',
        sections: [
          {
            title: 'AI Resume Ranking',
            icon: '🔎',
            explanation: 'AI scans resumes to extract skills and qualifications, automatically matching profiles with job requirements.',
            list: ['AI Resume Parsing', 'Skill & Experience Extraction', 'Smart Shortlisting'],
            businessValue: ['No Qualified Candidate Missed', 'Faster Screening', 'Unbiased Decisions'],
            example: '500 resumes scanned → AI ranks top 10 most relevant in minutes. No more manual sorting of piles.'
          },
          {
            title: 'Auto Scheduling',
            icon: '🗓️',
            explanation: 'Candidates receive automated invites and can select time slots that sync directly with HR calendars.',
            list: ['Calendar Integration', 'Auto Interview Invites', 'Real-time Status Updates'],
            businessValue: ['Better Candidate CX', 'Zero Coordination Delay', 'Maximum Hiring Velocity'],
            example: 'Candidate selected → Invite sent automatically via calendar integration → Time slot chosen by candidate instantly.'
          }
        ]
      }
    },
    { 
      title: 'Cybersecurity Alert Automation', 
      icon: <Lock />, 
      desc: 'Intelligent real-time threatmonitoring.', 
      problem: 'Large volumes of alerts lead to slow response and critical threats going unnoticed by overwhelmed teams.',
      solution: 'Developed custom intelligent alert system using AI-driven logic to filter noise and route critical threats.',
      result: '⚡ Faster Threat Detection\n🔐 Improved System Security\n📉 Reduced Operational Risk',
      color: 'bg-purple-50',
      accent: 'border-purple-200',
      deepDive: {
        overview: 'System continuously monitors logs and networks, identifying and escalating critical incidents instantly.',
        sections: [
          {
            title: 'Intelligent Filtering',
            icon: '🛡️',
            explanation: 'AI-driven logic separates noise and low-priority alerts from true critical cybersecurity threats.',
            list: ['Real-Time Log Monitoring', 'AI Noise Filtering', 'Instant Prioritization'],
            businessValue: ['Focus on Real Danger', 'Reduced Fatigue', 'Faster MTTR'],
            example: 'Captured 50,000 alerts → AI filters out 49,990 false positives → 10 critical threats escalated instantly.'
          },
          {
            title: 'Alert Routing',
            icon: '⚡',
            explanation: 'Critical alerts are sent to the right teams via Slack/SMS to trigger predefined blocking actions.',
            list: ['Slack/SMS Integration', 'Automated Threat Blocking', 'Unified Dashboard Entry'],
            businessValue: ['Real-Time Action', 'Compliance Ready', 'Zero Response Lag'],
            example: 'Threat detected → sent to Security Team → Anomaly blocked instantly via automated protocol.'
          }
        ]
      }
    },
    { 
      title: 'Real-Time Business Dashboard', 
      icon: <BarChart3 />, 
      desc: 'Unified visibility via Power BI.', 
      problem: 'Data scattered across tools (CRM, Excel, Ads) leads to poor visibility and delayed executive decisions.',
      solution: 'Built a unified real-time dashboard using Microsoft Power BI to centralize and visualize all business data.',
      result: '📊 Unified Dashboard\n⚡ Real-Time Tracking\n🧠 Better Strategic Decisions',
      color: 'bg-purple-50',
      accent: 'border-purple-200',
      deepDive: {
        overview: 'Live tracking of KPIs (sales, revenue, performance) accessible anytime on a single source of truth.',
        sections: [
          {
            title: 'Uni-View Integration',
            icon: '📊',
            explanation: 'Connected multiple data sources (CRM, Ads, Sheets) into one central interactive visualization system.',
            list: ['CRM & Financial Integration', 'Live Data Connections', 'Drill-Down Capabilities'],
            businessValue: ['One Single Truth', 'Zero Information Silos', 'Transparency'],
            example: 'Data from all departments synced automatically into a clean, interactive executive dashboard.'
          },
          {
            title: 'Real-Time Insights',
            icon: '🧠',
            explanation: 'Dashboard updates automatically with live data, helping identify trends and issues as they happen.',
            list: ['Auto-Refreshing Metrics', 'Live KPI Monitoring', 'Accessible Anywhere'],
            businessValue: ['Faster Strategy Adjustment', 'Accurate Reporting', 'Operational Control'],
            example: 'Manager sees a performance dip in one region instantly → Corrects strategy same-day → Result: Protected revenue.'
          }
        ]
      }
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-transparent selection:bg-brand-purple/20">
      <div className="text-center mb-24 max-w-7xl mx-auto px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-purple/10 blur-[120px] -z-10 rounded-full" />
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] font-bold text-brand-purple uppercase tracking-[0.5em] mb-4 block">IMPACT STORIES</span>
          <h1 className="text-5xl lg:text-7xl font-display font-bold text-slate-900 mb-8 uppercase tracking-tighter leading-none">
            REAL-WORLD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink">USE CASES</span>
          </h1>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto font-normal leading-relaxed">
            Discover how Trinexiss Technologies transforms business challenges into scalable growth engines through data and intelligence.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                rotateY: i % 2 === 0 ? 5 : -5,
                rotateX: 2,
                transition: { duration: 0.3 }
              }}
              style={{ perspective: '1000px' }}
              onClick={() => onItemClick(c)}
              className={`p-10 rounded-[3rem] border-2 flex flex-col cursor-pointer transition-all shadow-xl group relative overflow-hidden ${
                c.color
              } ${c.accent} hover:shadow-2xl hover:shadow-brand-purple/10`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 blur-3xl -z-10 rounded-full" />
              
              <div className="flex items-center justify-between mb-10">
                <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 ${i % 2 === 0 ? 'text-brand-pink' : 'text-brand-purple'}`}>
                  {React.cloneElement(c.icon as React.ReactElement, { size: 28 })}
                </div>
                <div className="w-10 h-10 border border-black/5 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-8 uppercase tracking-tight leading-tight min-h-[3.5rem]">
                  {c.title}
                </h3>

                <div className="space-y-6 mb-10">
                  <div className="bg-white/60 p-5 rounded-2xl border border-black/5 backdrop-blur-sm shadow-sm group-hover:bg-white transition-colors">
                    <span className="text-[9px] font-bold text-brand-pink uppercase tracking-widest block mb-2">Problem</span>
                    <p className="text-slate-700 text-sm font-medium leading-relaxed italic">"{c.problem}"</p>
                  </div>
                  
                  <div className="bg-white/60 p-5 rounded-2xl border border-black/5 backdrop-blur-sm shadow-sm group-hover:bg-white transition-colors">
                    <span className="text-[9px] font-bold text-brand-purple uppercase tracking-widest block mb-2">Solution</span>
                    <p className="text-slate-800 text-sm font-bold leading-relaxed">{c.solution}</p>
                  </div>

                  <div className="p-5 bg-gradient-to-br from-brand-purple/5 to-brand-pink/5 rounded-2xl border border-white">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-3 underline decoration-brand-purple/30 underline-offset-4">Results</span>
                    <div className="text-slate-900 font-bold text-sm tracking-tight whitespace-pre-line leading-relaxed">
                      {c.result}
                    </div>
                  </div>
                </div>
              </div>

              <motion.button 
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all shadow-lg flex items-center justify-center gap-3 ${
                  i % 2 === 0 ? 'bg-slate-900 text-white hover:bg-brand-pink' : 'bg-slate-900 text-white hover:bg-brand-purple'
                }`}
              >
                Case Study Details <ChevronRight size={14} />
              </motion.button>
              
              {/* Decorative side accent */}
              <div className={`absolute top-1/2 left-0 w-1 h-20 -translate-y-1/2 rounded-r-full group-hover:h-32 transition-all duration-500 ${i % 2 === 0 ? 'bg-brand-pink' : 'bg-brand-purple'}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  useEffect(() => {
    // JotForm Script
    const jotScript = document.createElement('script');
    jotScript.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    jotScript.async = true;
    document.body.appendChild(jotScript);

    jotScript.onerror = () => {
      console.error('Failed to load JotForm script');
    };

    jotScript.onload = () => {
      // @ts-ignore
      if (window.jotformEmbedHandler) {
        try {
          // @ts-ignore
          window.jotformEmbedHandler("iframe[id='JotFormIFrame-261285410544049']", "https://form.jotform.com/");
        } catch (err) {
          console.error('Error initializing JotForm handler:', err);
        }
      }
    };

    // Calendly Script
    const calScript = document.createElement('script');
    calScript.src = 'https://assets.calendly.com/assets/external/widget.js';
    calScript.async = true;
    document.body.appendChild(calScript);

    return () => {
      if (document.body.contains(jotScript)) {
        document.body.removeChild(jotScript);
      }
      if (document.body.contains(calScript)) {
        document.body.removeChild(calScript);
      }
    };
  }, []);

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 text-center mb-20">
        <h1 className="text-5xl font-display font-bold text-slate-900 mb-8 font-display uppercase tracking-tight">Get In Touch</h1>
        <p className="text-xl text-slate-500 max-w-3xl mx-auto">Have a question or a project in mind? We'd love to hear from you. Experience the Trinexiss difference.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-brand-purple/10 text-brand-purple rounded-2xl flex items-center justify-center mb-6">
              <MapPin />
            </div>
            <h4 className="font-display font-bold text-slate-900 mb-2 text-xl tracking-tight uppercase">Visit Us</h4>
            <p className="text-slate-500 tracking-tight leading-relaxed">Office No 1044, Gera's Imperium Rise, Hinjewadi Phase 2, Maharashtra 411057</p>
          </div>
          <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-brand-blue/10 text-brand-blue rounded-2xl flex items-center justify-center mb-6">
              <Mail />
            </div>
            <h4 className="font-display font-bold text-slate-900 mb-2 text-xl tracking-tight uppercase">Email Us</h4>
            <p className="text-slate-700 font-bold text-lg">info@trinexiss.com</p>
          </div>
          <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-brand-pink/10 text-brand-pink rounded-2xl flex items-center justify-center mb-6">
              <Phone />
            </div>
            <h4 className="font-display font-bold text-slate-900 mb-2 text-xl tracking-tight uppercase">Call Us</h4>
            <p className="text-slate-800 font-bold text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink">+91 7774051885</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Office Photo Column - Now on the left of the form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full h-full bg-slate-900 rounded-[3rem] overflow-hidden relative shadow-xl group border border-slate-100"
          >
             <img 
               src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
               alt="Our Office" 
               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 select-none grayscale group-hover:grayscale-0 opacity-60 hover:opacity-100 transition-opacity"
               referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/20 to-transparent"></div>
             <div className="absolute bottom-10 left-10 text-white">
                <h4 className="font-display font-bold text-3xl uppercase tracking-tighter">Corporate Headquarters</h4>
                <p className="text-white/60 font-medium">Pune, India</p>
             </div>
          </motion.div>

          {/* JotForm Requirement Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden p-8 flex flex-col"
          >
            <div className="mb-0 text-center lg:text-left">
              <span className="text-brand-pink text-[9px] font-bold tracking-[0.4em] mb-3 block uppercase leading-none">Requirement Form</span>
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-3 tracking-tight uppercase">Requirement Collection</h2>
              <p className="text-slate-500 mb-8 text-sm">Fill out details about your project for a faster response.</p>
            </div>
            <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 h-full">
              <iframe
                id="JotFormIFrame-261285410544049"
                title="Requirement Collection"
                onLoad={() => window.scrollTo(0,0)}
                allow="geolocation; microphone; camera; fullscreen; payment"
                src="https://form.jotform.com/261285410544049"
                style={{ minWidth: "100%", maxWidth: "100%", height: "580px", border: "none" }}
                scrolling="no"
              >
              </iframe>
            </div>
          </motion.div>
        </div>

        {/* Calendly Consultation Section - Moved below */}
        <div className="mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden p-8 lg:p-12 flex flex-col"
          >
            <div className="mb-8 text-center">
              <span className="text-brand-purple text-[9px] font-bold tracking-[0.4em] mb-3 block uppercase leading-none">Quick Booking</span>
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-3 tracking-tight uppercase">Schedule Consultation</h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-sm">Book a 30-minute introductory call with our technical team to discuss your project requirements in depth.</p>
            </div>
            <div className="bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100">
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/chaskarshruti17/30min" 
                style={{ minWidth: '100%', height: '600px' }}
              >
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [selectedItem, setSelectedItem] = useState<DetailItem | null>(null);

  const handleApply = () => {
    setSelectedItem(null);
    // Allow modal exit animation before scrolling
    setTimeout(() => {
      const element = document.getElementById('apply-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  };

  return (
    <div className="min-h-screen">
      <Navbar currentPage={page} setPage={setPage} />
      
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {page === 'home' && <HomePage setPage={setPage} onItemClick={setSelectedItem} />}
            {page === 'services' && <ServicesPage onItemClick={setSelectedItem} />}
            {page === 'about' && <AboutPage setPage={setPage} />}
            {page === 'team' && <TeamPage setPage={setPage} />}
            {page === 'careers' && <CareersPage />}
            {page === 'portfolio' && <PortfolioPage onItemClick={setSelectedItem} />}
            {page === 'use-cases' && <UseCasesPage onItemClick={setSelectedItem} />}
            {page === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedItem && (
          <Modal 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
            onApply={handleApply}
          />
        )}
      </AnimatePresence>

      <Footer setPage={setPage} />
    </div>
  );
}
