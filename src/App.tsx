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
}

// --- Shared Components ---

const Modal = ({ item, onClose, onApply }: { item: DetailItem | null; onClose: () => void; onApply?: () => void }) => {
  if (!item) return null;

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
        className="relative bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-500 hover:bg-brand-purple hover:text-white transition-all z-20 shadow-lg"
        >
          <X size={24} />
        </button>

        <div className="overflow-y-auto">
          {item.image && (
            <div className="w-full aspect-[21/9] overflow-hidden relative">
               <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
               <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            </div>
          )}
          <div className={`p-8 lg:p-14 -mt-10 relative z-10 rounded-t-[2.5rem] ${item.modalBg || 'bg-white'}`}>
            <div className="flex items-center gap-5 mb-8">
              {item.icon && (
                <div className="w-14 h-14 bg-brand-purple/10 text-brand-purple rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
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
                  <h4 className="text-[10px] font-bold text-brand-pink uppercase tracking-[0.2em] mb-3">The Challenge</h4>
                  <div className="p-6 bg-pink-50 border border-pink-100 rounded-3xl">
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
                  <h4 className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.2em] mb-3">Workflow Process</h4>
                  <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl">
                    <p className="text-brand-blue text-sm font-bold tracking-tight uppercase mb-2 flex items-center gap-2">
                       <Zap size={14} /> Pipeline Strategy
                    </p>
                    <p className="text-slate-700 text-base leading-relaxed">
                      {item.process}
                    </p>
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
                  className="px-8 py-3 rounded-full border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all text-sm"
                 >
                   Close
                 </button>
                 {item.isJob && (
                   <button 
                    onClick={onApply}
                    className="btn-gradient !px-10 shadow-xl shadow-brand-purple/20"
                   >
                     Apply Now
                   </button>
                 )}
                 {!item.isJob && (
                   <button 
                    onClick={onClose}
                    className="btn-gradient !px-10"
                   >
                     Got it
                   </button>
                 )}
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

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
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => setPage('home')}
        >
          <div className="w-10 h-10 bg-brand-purple rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <span className="text-white font-bold text-xl">T</span>
          </div>
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
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-brand-purple rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">T</span>
          </div>
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
            <span>Hinjewadi Phase 2, Pune, Maharashtra</span>
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
                    selectedWho === i ? 'bg-brand-purple/10 text-brand-purple' : 'bg-slate-50 text-slate-400 group-hover:bg-brand-pink/10 group-hover:text-brand-pink'
                  }`}>
                    {React.cloneElement(card.icon as React.ReactElement, { size: 28 })}
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
                  ? 'bg-pink-50/80 border-pink-100 hover:border-brand-pink' 
                  : 'bg-purple-50/80 border-purple-100 hover:border-brand-purple'
                }`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl -z-10 rounded-full transition-colors ${i % 2 === 0 ? 'bg-brand-pink/10 group-hover:bg-brand-pink/20' : 'bg-brand-purple/10 group-hover:bg-brand-purple/20'}`} />
                
                <div className="w-16 h-16 bg-white border border-slate-100 shadow-xl rounded-2xl flex items-center justify-center mb-10 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                  {React.cloneElement(s.icon as React.ReactElement, { size: 32 })}
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
  const [selectedSubItem, setSelectedSubItem] = useState<DetailSubItem | null>(null);

  const allServices: DetailItem[] = [
    { 
      title: 'Talent & Staffing Solutions', 
      icon: <Users />, 
      desc: 'Expert hiring for your complex needs.',
      subItems: [
        { 
          title: 'Permanent Staffing (IT & Non-IT)', 
          detail: 'Our strategic permanent recruitment model focuses on long-term organizational stability. We utilize proprietary assessment frameworks to ensure technical competency and cultural alignment.', 
          example: 'Ex: Successfully placed 15+ Senior Java Developers and Data Architects for a leading Pune-based fintech unicorn within active 45-day hiring sprints.'
        },
        { 
          title: 'Contract Staffing / Staff Augmentation', 
          detail: 'Agile workforce expansion for specific project durations. We provide pre-vetted specialists who integrate seamlessly into your existing Scrum teams and engineering workflows.', 
          example: 'Ex: Provided 10 specialized React.js contractors to an e-commerce giant to expedite a multi-platform mobile app migration, completing 3 months ahead of schedule.'
        },
        { 
          title: 'Executive Search & Leadership Hiring', 
          detail: 'High-touch search for C-suite and senior leadership. We map global markets to identify visionaries capable of driving digital transformation and organizational growth.', 
          example: 'Ex: Orchestrated the recruitment of a Chief Technology Officer (CTO) for a series-B SaaS startup, focusing on scaling engineering culture from 20 to 200 members.'
        },
        { 
          title: 'Offshore & Dedicated Hiring Support', 
          detail: 'Global delivery models providing cost-effective specialized talent pools. We manage the entire remote infrastructure, payroll, and compliance for your dedicated offshore teams.', 
          example: 'Ex: Established a 30-person dedicated support and engineering hub in Pune for a Texas-based logistics firm, reducing their operational costs by 45%.'
        }
      ],
      color: 'bg-purple-50',
      iconColor: 'text-brand-purple',
      accent: 'border-purple-100'
    },
    { 
      title: 'HR & Business Consulting', 
      icon: <Settings />, 
      desc: 'Optimizing your organizational ecosystem.',
      subItems: [
        { 
          title: 'HR & Payroll Outsourcing', 
          detail: 'End-to-end management of HR operations including payroll processing, tax compliance, and benefit administration using automated cloud-based ERP systems.', 
          example: 'Ex: Automated payroll for a 500+ employee manufacturing firm, eliminating manual entry errors and ensuring 100% statutory compliance across 3 states.'
        },
        { 
          title: 'Talent Acquisition (End-to-End)', 
          detail: 'Managing the complete candidate journey from branding and sourcing to psychological vetting and onboarding strategies for high-volume recruitment.', 
          example: 'Ex: Designed a complete RPO (Recruitment Process Outsourcing) framework for a domestic retail chain, hiring 200+ store associates in under 60 days.'
        },
        { 
          title: 'Workforce Planning & Optimization', 
          detail: 'Strategic analysis of organizational headcount and skill gaps. We help align your workforce architecture with your future revenue goals and market expansion plans.', 
          example: 'Ex: Optimized department hierarchy for a digital agency, increasing cross-functional collaboration and reducing redundant middle-management costs by 15%.'
        },
        { 
          title: 'Training & Development', 
          detail: 'Customized корпоративная learning pathways focusing on emerging tech stacks and leadership soft skills. We translate business objectives into measurable skill outcomes.', 
          example: 'Ex: Conducted a 6-week intensive GenAI and LLM integration workshop for a traditional IT services company, upskilling 50 lead architects.'
        }
      ],
      color: 'bg-pink-50',
      iconColor: 'text-brand-pink',
      accent: 'border-pink-100'
    },
    { 
      title: 'Technology & Digital Solutions', 
      icon: <Globe />, 
      desc: 'Building your digital core.',
      subItems: [
        { 
          title: 'AI & Automation - Custom Agents', 
          detail: 'Architecting intelligent autonomous agents using LangChain and specialized LLMs. We build systems that perform reasoning, research, and execute complex business logic.', 
          example: 'Ex: Developed an AI Customer Support Agent that handles 80% of routine inquiries and automatically schedules technical support tickets in Jira.'
        },
        { 
          title: 'SaaS Development - React/Node', 
          detail: 'Full-stack application engineering focusing on high-concurrency, security, and responsive UX. We use modern cloud-native architectures for infinite horizontal scaling.', 
          example: 'Ex: Built a multi-tenant subscription platform for a Real Estate client, supporting 10k+ active users and real-time property tracking updates.'
        },
        { 
          title: 'Digital Marketing - SEO/PPC', 
          detail: 'Data-driven performance marketing and content strategy. We focus on ROI-positive experiments, technical SEO, and conversion rate optimization (CRO).', 
          example: 'Ex: Scaled a beauty brand\'s organic traffic by 300% in 9 months via localized SEO and targeted Meta ad campaigns reaching 1M+ prospective customers.'
        },
        { 
          title: 'Dashboarding & Analytics', 
          detail: 'Transforming siloed data streams into unified executive command centers. Our dashboards provide real-time visibility into sales, churn, and operational health.', 
          example: 'Ex: Created an integrated Power BI dashboard for a global supply chain firm, unifying data from 12 regional warehouses onto a single live screen.'
        }
      ],
      color: 'bg-purple-50',
      iconColor: 'text-brand-blue',
      accent: 'border-blue-100'
    },
    { 
      title: 'AI & Automation', 
      icon: <Bot />, 
      desc: 'Custom bots and intelligent workflows.',
      subItems: [
        { 
          title: 'Trinexiss Bot Creation', 
          detail: 'Proprietary bot development framework specializing in internal data indexing and automated knowledge retrieval for large enterprises.', 
          example: 'Ex: Built "Trinexiss Knowledge Bot" for a law firm, allowing partners to search 50,000+ legal documents via natural language queries in seconds.'
        },
        { 
          title: 'Zapier & n8n Workflows', 
          detail: 'Complex multi-step automation logic that connects your disparate software tools. We eliminate data silos and manual repetitive data entry tasks.', 
          example: 'Ex: Automated the lead-to-invoice pipeline for a consultancy, connecting HubSpot, Slack, and QuickBooks, saving their sales team 10 hours per week.'
        },
        { 
          title: 'No-code Software Solutions', 
          detail: 'Rapid application development using Bubble and Glide. We build production-ready internal tools and MVP prototypes at 4x the speed of traditional code.', 
          example: 'Ex: Launched a fully functional marketplace MVP for a startup in 14 days, enabling them to secure initial seed funding with a live product.'
        }
      ],
      color: 'bg-pink-50',
      iconColor: 'text-brand-purple',
      accent: 'border-purple-200'
    },
    { 
      title: 'SaaS Development', 
      icon: <Code />, 
      desc: 'Enterprise-grade scalable systems.',
      subItems: [
        { 
          title: 'FinTrack Financial Systems', 
          detail: 'Custom fintech platforms focusing on automated bookkeeping, investment tracking, and predictive revenue forecasting for SMEs.', 
          example: 'Ex: Modular SaaS platform for a group of clinics, managing billing for 50+ doctors and generating real-time profitability reports.'
        },
        { 
          title: 'HealthSync Patient Portals', 
          detail: 'Patient-first digital health platforms featuring appointment scheduling, secure health record storage, and telemedicine integrations.', 
          example: 'Ex: Implemented a portal for a multi-specialty hospital, reducing wait times by 40% and enabling remote consultations for 2000+ monthly patients.'
        },
        { 
          title: 'Enterprise Dashboards', 
          detail: 'Comprehensive BI tools designed for executive monitoring and departmental KPI tracking across global organizations.', 
          example: 'Ex: Built a unified dashboard for a CEO of an ESG-focused logistics firm, tracking carbon footprint and fuel efficiency across their fleet.'
        }
      ],
      color: 'bg-purple-50',
      iconColor: 'text-brand-pink',
      accent: 'border-pink-200'
    },
    { 
      title: 'HR and Recruitment', 
      icon: <UserPlus />, 
      desc: 'Strategic talent acquisition protocols.',
      subItems: [
        { 
          title: 'Executive Search', 
          detail: 'Strategic identification of potential leadership talent. We conduct deep-dive market research and background vetting to ensure perfect executive alignment.', 
          example: 'Ex: Successfully sourced and hired a Head of Engineering for an AI startup, focusing on candidates with deep experience in distributed systems.'
        },
        { 
          title: 'Permanent Recruitment', 
          detail: 'Building high-performance core teams through rigorous screening and modern recruitment marketing strategies across all technical levels.', 
          example: 'Ex: Expanded a software development center\'s team by hiring 40 specialized Cloud Architects and DevOps engineers in under a quarter.'
        },
        { 
          title: 'Technical Assessment', 
          detail: 'Comprehensive evaluation of developer skills using live coding challenges and real-world system design interviews conducted by our subject matter experts.', 
          example: 'Ex: Vetted 500+ candidates for a German automotive client, selecting the top 2% through our specialized Trinexiss Technical Mastery labs.'
        }
      ],
      color: 'bg-pink-50',
      iconColor: 'text-brand-purple',
      accent: 'border-purple-100'
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
                            setSelectedSubItem(item as DetailSubItem);
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
                    {selectedSubItem.title}
                  </h3>
                  <div className="w-20 h-1.5 bg-brand-pink rounded-full mb-6" />
                  <p className="text-slate-600 text-lg leading-relaxed font-medium">
                    {selectedSubItem.detail}
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
                        {selectedSubItem.example}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedSubItem(null)}
                    className="mt-10 w-full py-6 bg-slate-900 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-brand-purple transition-all shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-3 active:scale-95"
                  >
                    CLOSE DETAILS <X size={18} />
                  </button>
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
                    title: sol.title,
                    detail: sol.detail,
                    example: sol.example
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
            <div className="p-8 lg:p-12 bg-pink-50 border border-pink-100 rounded-[2.5rem] text-center min-w-[200px] shadow-sm hover:shadow-xl transition-all group">
              <div className="text-4xl font-display font-bold text-brand-pink mb-1 group-hover:scale-110 transition-transform">50+</div>
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

const CareersPage = ({ onItemClick }: { onItemClick: (item: DetailItem) => void }) => {
  const [expandedPerk, setExpandedPerk] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const jobs: DetailItem[] = [
    { isJob: true, title: 'Senior AI Engineer', desc: 'Design and deploy large-scale AI agents for enterprise.', tags: ['Python', 'LLMs', 'MLOps'], result: 'Lead the Pune Neural Dev team.', longDesc: 'We are looking for an expert in Large Language Models and AI agent architectures. You will lead the development of our core automation engine, building scalable systems that power Fortune 500 workflows.' },
    { isJob: true, title: 'Full Stack Developer', desc: 'Build scalable web platforms and dashboards.', tags: ['React', 'Node.js', 'PostgreSQL'], result: 'Scale our SaaS products globally.', longDesc: 'Join our product team to build high-performance web applications. You will be responsible for the full lifecycle of feature development, from frontend UI to complex backend logic.' },
    { isJob: true, title: 'NLP Research Scientist', desc: 'Advance our NLP capabilities and intelligent pipelines.', tags: ['NLP', 'Transformers', 'Python'], result: 'Fine-tune 10+ models monthly.', longDesc: 'Focused on the cutting edge of language understanding. You will optimize and fine-tune open-source and proprietary models for domain-specific automation tasks.' },
    { isJob: true, title: 'UI/UX Designer', desc: 'Craft beautiful, intuitive interfaces for our AI products.', tags: ['Figma', 'Prototyping', 'Design Systems'], result: 'Redefine the "AI Dash" experience.', longDesc: 'We believe good design is the secret to AI adoption. You will create the user experiences that make complex AI interactions feel simple and human.' },
    { isJob: true, title: 'Enterprise Sales Manager', desc: 'Drive partnerships and close high-impact deals.', tags: ['B2B Sales', 'CRM', 'Negotiation'], result: 'Growth across India & GCC regions.', longDesc: 'The face of Trinexiss for our global partners. You will identify business challenges and present our AI solutions as the ultimate growth engine.' },
    { isJob: true, title: 'AI Automation Consultant', desc: 'Work with clients to analyse and deliver automation.', tags: ['Consulting', 'Process Design', 'Client Mgmt'], result: 'Strategic impact on client ROI.', longDesc: 'Bridging the gap between technology and business. You will audit client workflows and design the automation roadmap that delivers immediate value.' },
  ];

  const benefits = [
    { icon: '💰', title: 'Competitive Pay', desc: 'Market-leading salary + performance bonuses based on impact.', detail: 'We offer quarterly performance bonuses and annual salary reviews tracking with top 5% of local market rates.' },
    { icon: '🏠', title: 'Remote First', desc: 'Work from anywhere, flexible hours built for high performance.', detail: 'Our core hours are 11 AM to 4 PM IST to allow for deep work and healthy life-work balance.' },
    { icon: '📚', title: 'L&D Budget', desc: '₹50,000/yr for courses, books, and international AI conferences.', detail: 'We actively encourage continuous upskilling. This budget can be used for any technical certification or AI conference travel.' },
    { icon: '🏥', title: 'Health Cover', desc: 'Full medical insurance for you and your dependents.', detail: 'Includes mental health support, family health cover up to ₹10L, and maternity benefits.' },
    { icon: '📈', title: 'Stock Options', desc: 'ESOPs for all full-time employees to participate in our growth.', detail: 'Every engineering hire receives stock options vesting over 4 years with a 1-year cliff.' },
    { icon: '🎉', title: 'Paid Leave', desc: '30 days annual PTO plus all gazetted public holidays.', detail: 'Unlimited sick leave and "recharge days" after major project completions.' }
  ];

  const handleDriveUpload = () => {
    // Simulated Google Drive access
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        alert(`Connecting to Drive... File selected: ${file.name}`);
      }
    };
    input.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="pt-48 pb-64 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-32 h-32 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle2 size={64} />
          </div>
          <h1 className="text-5xl font-display font-bold text-slate-900 mb-6 uppercase tracking-tighter">Application Received</h1>
          <p className="text-slate-500 text-xl max-w-xl mx-auto">Thank you for joining the mission. Our team will review your profile and reach out within 48 hours.</p>
          <button onClick={() => setIsSubmitted(false)} className="mt-12 text-brand-purple font-bold uppercase tracking-widest text-sm border-b-2 border-brand-purple pb-1">Return to listings</button>
        </motion.div>
      </div>
    );
  }

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

        {/* Job List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {jobs.map((job, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => onItemClick(job)}
              className="p-10 rounded-[3rem] bg-pink-50 border border-pink-100 hover:border-brand-pink hover:bg-white cursor-pointer transition-all relative group overflow-hidden shadow-sm"
            >
               <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-pink opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="flex items-center gap-3 mb-10">
                 <span className="px-4 py-1.5 bg-brand-pink/10 text-brand-pink text-[9px] font-bold uppercase tracking-widest rounded-full">{job.tags?.[0]}</span>
                 <span className="px-4 py-1.5 bg-slate-900 text-white text-[9px] font-bold uppercase tracking-widest rounded-full">New Role</span>
               </div>
               <h2 className="text-2xl font-display font-bold text-slate-900 mb-3 uppercase tracking-tight">{job.title}</h2>
               <p className="text-slate-500 text-sm mb-10 leading-relaxed">{job.desc}</p>
               
               <div className="flex flex-wrap gap-2 mb-12">
                 {job.tags?.slice(1).map(tag => (
                   <span key={tag} className="text-[10px] font-bold py-1.5 px-3 bg-white border border-pink-100 rounded-xl text-brand-pink uppercase tracking-widest">{tag}</span>
                 ))}
               </div>

               <div className="flex justify-between items-center pt-8 border-t border-pink-100">
                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Remote / Pune</div>
                 <button className="text-brand-pink font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                   Explore <ArrowRight size={14} />
                 </button>
               </div>
            </motion.div>
          ))}
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

        {/* Form */}
        <div id="apply-form" className="max-w-4xl mx-auto">
           <div className="text-center mb-16">
             <h2 className="text-5xl lg:text-6xl font-display font-bold text-slate-900 tracking-tighter uppercase mb-6 leading-none">JOIN THE <br /><span className="text-brand-purple">Expansion</span></h2>
             <p className="text-slate-500 mt-4 text-xl font-normal">Your application will be analyzed by our recruitment board within 48 hours.</p>
           </div>
           
           <div className="bg-blue-50/50 rounded-[4rem] p-12 lg:p-24 relative overflow-hidden border border-blue-100 shadow-xl">
             <div className="absolute top-0 flex w-full">
               <div className="h-2 w-full bg-brand-purple" />
               <div className="h-2 w-full bg-brand-pink" />
             </div>

             <form className="space-y-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="flex flex-col gap-3">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">First Name</label>
                     <input type="text" required className="bg-white border-2 border-white rounded-3xl px-8 py-5 focus:border-brand-purple focus:ring-0 outline-none transition-all font-display text-slate-900 shadow-sm" placeholder="Priya" />
                   </div>
                   <div className="flex flex-col gap-3">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Last Name</label>
                     <input type="text" required className="bg-white border-2 border-white rounded-3xl px-8 py-5 focus:border-brand-purple focus:ring-0 outline-none transition-all font-display text-slate-900 shadow-sm" placeholder="Sharma" />
                   </div>
                </div>
                <div className="flex flex-col gap-3">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Professional Email</label>
                   <input type="email" required className="bg-white border-2 border-white rounded-3xl px-8 py-5 focus:border-brand-purple focus:ring-0 outline-none transition-all font-display text-slate-900 shadow-sm" placeholder="priya@example.com" />
                </div>
                <div className="flex flex-col gap-3">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Selected Role</label>
                   <select className="bg-white border-2 border-white rounded-3xl px-8 py-5 focus:border-brand-purple focus:ring-0 outline-none transition-all appearance-none cursor-pointer font-display text-slate-900 shadow-sm">
                      <option>Senior AI Engineer</option>
                      <option>Full Stack Developer</option>
                      <option>NLP Research Scientist</option>
                      <option>UI/UX Designer</option>
                   </select>
                </div>
                <div className="flex flex-col gap-3">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Resume / CV (PDF Only)</label>
                   <div 
                    onClick={handleDriveUpload}
                    className="border-4 border-dashed border-white bg-white/50 p-16 rounded-[2.5rem] text-center hover:border-brand-purple hover:bg-white transition-all cursor-pointer group shadow-inner"
                   >
                      <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all">📂</div>
                      <p className="text-slate-500 font-bold text-lg mb-2">Connect to Google Drive</p>
                      <p className="text-slate-400 text-sm">Click to open Drive or browse local files. <br /><span className="text-brand-purple">Max file size 10MB</span></p>
                   </div>
                </div>
                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className={`btn-gradient w-full py-6 text-xl shadow-2xl shadow-brand-purple/30 uppercase tracking-tighter flex items-center justify-center gap-4 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? <>Processing... <AnimatePresence><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Database size={24} /></motion.div></AnimatePresence></> : <>Submit Application <ArrowUpRight size={24} /></>}
                </button>
             </form>
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
      process: 'Form Submission → Data stored in Google Sheets → Auto email notification',
      result: '✔ 100% lead tracking\n✔ Faster response time\n✔ Increased conversion rate',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200',
      modalBg: 'bg-purple-50',
      accent: 'border-purple-200'
    },
    { 
      title: 'Customer Support Automation System', 
      industry: 'E-commerce',
      tags: ['n8n', 'AI Chatbot', 'APIs'], 
      desc: '70% faster response time and improved satisfaction.',
      problem: 'Customer queries were handled manually, leading to delays and poor experience.',
      solution: 'We built an AI-powered support system integrated with n8n to automate responses and ticket creation.',
      process: 'Customer Query → AI Response → Ticket Generated → Assigned to team',
      result: '✔ 70% faster response time\n✔ Improved customer satisfaction\n✔ Reduced manual workload',
      image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=1200',
      modalBg: 'bg-pink-50',
      accent: 'border-pink-200'
    },
    { 
      title: 'Marketing Analytics Dashboard', 
      industry: 'Advertising Agency',
      tags: ['Looker Studio', 'Google Analytics'], 
      desc: 'Clear performance insights and increased ROI.',
      problem: 'Client could not track performance of ads across platforms.',
      solution: 'We created an interactive dashboard using Looker Studio to visualize campaign data.',
      process: 'Data Collection → Dashboard Creation → Real-time updates',
      result: '✔ Clear performance insights\n✔ Better decision making\n✔ Increased ROI',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      modalBg: 'bg-purple-50',
      accent: 'border-purple-200'
    },
    { 
      title: 'Business Process Automation', 
      industry: 'Service-Based Company',
      tags: ['n8n', 'APIs'], 
      desc: '80% time saved and reduced error rates.',
      problem: 'Manual data entry and repetitive tasks were time-consuming and error-prone.',
      solution: 'We automated workflows using n8n to handle operations efficiently.',
      process: 'Task Trigger → Automation Workflow → Data Processing → Notification',
      subItems: [
        { title: 'Trigger Identification', detail: 'Detection of manual tasks and data entry points.', example: 'Auto-detecting new portal entries.' },
        { title: 'Workflow Modeling', detail: 'Designing paths using n8n for data flow.', example: 'Logic-based branching routes.' },
        { title: 'API Integration', detail: 'Connecting existing software tools via robust APIs.', example: 'Syncing CRM with custom ERP.' },
        { title: 'Reporting & Logs', detail: 'Automated logging of task completion and metrics.', example: 'Weekly efficiency report generation.' }
      ],
      result: '✔ 80% time saved\n✔ Reduced errors\n✔ Improved productivity',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=1200',
      modalBg: 'bg-pink-50',
      accent: 'border-pink-200'
    },
    { 
      title: 'SaaS CRM Development', 
      industry: 'Startup',
      tags: ['React', 'Node.js', 'APIs'], 
      desc: 'Centralized system for better customer management.',
      problem: 'Client was managing customer data manually without a centralized system.',
      solution: 'We developed a scalable SaaS-based CRM application with automation features and integrations.',
      process: 'User Login → Data Management → Automation → Reporting',
      result: '✔ Centralized system\n✔ Better customer management\n✔ Business growth',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
      modalBg: 'bg-purple-50',
      accent: 'border-purple-200'
    },
    { 
      title: 'MediFlow – Smart Healthcare System', 
      industry: 'Healthcare',
      tags: ['SaaS', 'Healthcare Tech', 'React'], 
      desc: 'Digitized records and automated scheduling for doctors.',
      problem: 'Doctors were managing patient records and appointments manually, causing data mismanagement, time-consuming processes, and difficulty in tracking history.',
      solution: 'We developed MediFlow, a custom SaaS-based healthcare application that digitizes patient records, automates appointment scheduling, and provides easy access to medical history.',
      process: 'Patient Registration → Appointment Booking → Doctor Dashboard → Data Storage → Report Access',
      subItems: [
        { title: 'Doctor Dashboard', detail: 'Centralized command center for medical professionals.', example: 'Real-time overview of daily schedules.' },
        { title: 'Appointment System', detail: 'Automated booking and slot management.', example: 'Reduces scheduling conflicts by 100%.' },
        { title: 'Patient Record Management', detail: 'Secure digital storage of medical history.', example: 'Instant retrieval of old prescriptions.' },
        { title: 'Automated Notifications', detail: 'SMS and email reminders for patients.', example: 'Improved attendance rates.' }
      ],
      result: '✔ Reduced manual work\n✔ Faster patient management\n✔ Improved accuracy\n✔ Better experience',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
      modalBg: 'bg-pink-50',
      accent: 'border-pink-200'
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
      desc: 'Instant replies and faster response time.', 
      problem: 'Customers wait long time for replies',
      solution: 'We automated support using AI chatbot + Zapier',
      result: '• Instant replies\n• 70% faster response time\n• Improved customer satisfaction',
      color: 'bg-purple-50',
      accent: 'border-purple-200'
    },
    { 
      title: 'Marketing Performance Dashboard', 
      icon: <BarChart3 />, 
      desc: 'Real-time insights and decision making.', 
      problem: 'Client unable to track ad performance',
      solution: 'Created dashboard using Looker Studio',
      result: '• Real-time insights\n• Better decision making\n• Increased ROI',
      color: 'bg-pink-50',
      accent: 'border-pink-200'
    },
    { 
      title: 'Business Process Automation', 
      icon: <Settings />, 
      desc: 'Reduced manual work and saved time.', 
      problem: 'Manual data entry & repetitive tasks',
      solution: 'Automated workflows using n8n',
      result: '• Reduced manual work\n• Saved time\n• Increased productivity',
      color: 'bg-purple-50',
      accent: 'border-purple-200'
    },
    { 
      title: 'SaaS CRM Development', 
      icon: <Layers />, 
      desc: 'Centralized data and automated follow-ups.', 
      problem: 'Client managing leads manually',
      solution: 'Developed custom SaaS CRM system',
      result: '• Centralized data\n• Automated follow-ups\n• Better customer management',
      color: 'bg-pink-50',
      accent: 'border-pink-200'
    },
    { 
      title: 'IT Staffing Solution', 
      icon: <Briefcase />, 
      desc: 'Faster hiring and reduced cost.', 
      problem: 'Company unable to find skilled developers quickly',
      solution: 'Provided pre-screened developers',
      result: '• Faster hiring\n• Reduced cost\n• Improved project delivery',
      color: 'bg-purple-50',
      accent: 'border-purple-200'
    },
    { 
      title: 'Lead Management Automation', 
      icon: <Mail />, 
      desc: '100% lead tracking and increased conversions.', 
      problem: 'Leads getting lost from website forms',
      solution: 'Used Zapier to capture & store leads',
      result: '• 100% lead tracking\n• Faster response\n• Increased conversions',
      color: 'bg-pink-50',
      accent: 'border-pink-200'
    },
    { 
      title: 'Sales Reporting Automation', 
      icon: <BarChart />, 
      desc: 'Daily automated reports and accurate data.', 
      problem: 'Manual report creation takes time',
      solution: 'Automated reports using dashboards',
      result: '• Daily automated reports\n• Accurate data\n• Time saving',
      color: 'bg-purple-50',
      accent: 'border-purple-200'
    },
    { 
      title: 'AI-Based Email Classification', 
      icon: <Inbox />, 
      desc: 'Smart routing and automated sorting.', 
      problem: 'Company receives hundreds of emails daily (spam, queries, complaints)',
      solution: 'Built automation using n8n + AI to read and route emails instantly.',
      result: '• 80% faster email handling\n• No manual sorting needed\n• Improved team efficiency',
      color: 'bg-pink-50',
      accent: 'border-pink-200'
    },
    { 
      title: 'E-commerce Order Automation', 
      icon: <Package />, 
      desc: 'Zero manual errors in fulfillment chains.', 
      problem: 'Manual order processing takes time and leads to errors',
      solution: 'Automated workflow using Zapier for invoices and notifications.',
      result: '• Faster order processing\n• Zero manual entry errors\n• Better customer experience',
      color: 'bg-purple-50',
      accent: 'border-purple-200'
    },
    { 
      title: 'HR Recruitment Automation', 
      icon: <Search />, 
      desc: 'AI-based screening and candidate vetting.', 
      problem: 'HR teams buried under manual resume checks',
      solution: 'Implemented AI parsing and automated interview scheduling.',
      result: '• Reduced hiring lead time\n• Better candidate selection\n• Fully automated HR process',
      color: 'bg-pink-50',
      accent: 'border-pink-200'
    },
    { 
      title: 'Cybersecurity Alert Automation', 
      icon: <Lock />, 
      desc: 'Proactive threat detection and logging.', 
      problem: 'Security alerts not monitored properly in real-time',
      solution: 'Automated alerts system using custom intelligent workflows.',
      result: '• Faster threat detection\n• Improved system security\n• Reduced operational risk',
      color: 'bg-purple-50',
      accent: 'border-purple-200'
    },
    { 
      title: 'Real-Time Business Dashboard', 
      icon: <BarChart3 />, 
      desc: 'Unified visibility across all platforms.', 
      problem: 'Business data scattered in multiple unreachable tools',
      solution: 'Unified dashboard using Microsoft Power BI for live tracking.',
      result: '• One dashboard for all data\n• Real-time performance tracking\n• Better executive decision making',
      color: 'bg-pink-50',
      accent: 'border-pink-200'
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
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, you would send the data to a server here
  };

  if (submitted) {
    return (
      <div className="pt-32 pb-24 min-h-[60vh] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-16 text-center max-w-xl mx-auto border-brand-purple/20 shadow-2xl"
        >
          <div className="w-20 h-20 bg-brand-purple/10 text-brand-purple rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-4 uppercase tracking-tighter">Message Sent!</h2>
          <p className="text-slate-600 mb-10 text-lg">Thank you for Reaching out. Our team will get back to you within 24 hours.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="btn-gradient px-12"
          >
            Send Another Message
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-5xl font-display font-bold text-slate-900 mb-8 font-display">Get In Touch</h1>
            <p className="text-xl text-slate-500 mb-12">Have a question or a project in mind? We'd love to hear from you. Experience the Trinexiss difference.</p>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-brand-purple/10 text-brand-purple rounded-xl flex items-center justify-center shrink-0">
                    <MapPin />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900 mb-1">Visit Us</h4>
                   <p className="text-slate-500 tracking-tight">Office No 1044, Gera's Imperium Rise, Hinjewadi Phase 2, Maharashtra 411057</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-xl flex items-center justify-center shrink-0">
                    <Mail />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900 mb-1">Email Us</h4>
                   <p className="text-slate-700 font-medium">info@trinexiss.com</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-brand-pink/10 text-brand-pink rounded-xl flex items-center justify-center shrink-0">
                    <Phone />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900 mb-1">Call Us</h4>
                   <p className="text-slate-800 font-bold">+91 7774051885</p>
                 </div>
              </div>
            </div>

            <div className="w-full aspect-video bg-slate-900 rounded-[3rem] overflow-hidden relative shadow-2xl group border-8 border-white">
               <img 
                 src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                 alt="Our Office" 
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 select-none grayscale group-hover:grayscale-0"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/40 to-transparent"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                  <MapPin size={32} />
               </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-12"
          >
            <h3 className="text-2xl font-display font-bold text-slate-900 mb-8">Send Us a Message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Name</label>
                 <input 
                    type="text" 
                    required
                    className="w-full bg-purple-50/50 border border-purple-100 rounded-2xl px-6 py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20 transition-all font-display"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                 />
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Email</label>
                 <input 
                    type="email" 
                    required
                    className="w-full bg-purple-50/50 border border-purple-100 rounded-2xl px-6 py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20 transition-all font-display"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                 />
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Phone</label>
                 <input 
                    type="tel" 
                    className="w-full bg-purple-50/50 border border-purple-100 rounded-2xl px-6 py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20 transition-all font-display"
                    placeholder="+91 00000 00000"
                    value={form.phone}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                 />
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Message</label>
                 <textarea 
                    className="w-full bg-purple-50/50 border border-purple-100 rounded-2xl px-6 py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20 transition-all min-h-[150px] font-display"
                    placeholder="How can we help you?"
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                 />
               </div>
               <button type="submit" className="btn-gradient w-full py-5 text-lg">Send Message</button>
            </form>
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
            {page === 'careers' && <CareersPage onItemClick={setSelectedItem} />}
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
