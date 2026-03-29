import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  TrendingUp,
  DollarSign,
  MapPin,
  Clock,
  Target,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  BookOpen,
  Users
} from 'lucide-react';

const CareerAdvisor = () => {
  const [selectedProblem, setSelectedProblem] = useState(null);

  const realWorldProblems = [
    {
      id: 'salary-negotiation',
      icon: DollarSign,
      title: 'Salary Negotiation',
      problem: 'How do I negotiate a better salary offer?',
      color: 'cyan',
      solutions: [
        {
          step: 'Research Market Rates',
          description: 'Use our salary data to find the average salary for your role, experience level, and location.',
          action: 'Check Salary Calculator',
          link: '/calculator'
        },
        {
          step: 'Know Your Worth',
          description: 'Calculate your expected CTC based on skills, experience, and market demand.',
          action: 'Use CTC Predictor',
          link: '/predictor'
        },
        {
          step: 'Prepare Your Case',
          description: 'Document your achievements, skills, and how you add value to the company.',
          tips: [
            'List 3-5 major accomplishments',
            'Quantify your impact (revenue, efficiency gains)',
            'Research competitor salaries',
            'Know your minimum acceptable offer'
          ]
        },
        {
          step: 'Negotiation Script',
          description: 'Use this framework during negotiation:',
          script: '"Based on my research and the market rate for [role] with [X years] experience in [city], the typical range is ₹[X-Y] LPA. Given my skills in [key skills] and achievements like [specific example], I believe ₹[target] LPA would be fair. What are your thoughts?"'
        }
      ]
    },
    {
      id: 'job-switch',
      icon: Briefcase,
      title: 'Should I Switch Jobs?',
      problem: 'Is it the right time to change my job?',
      color: 'magenta',
      solutions: [
        {
          step: 'Evaluate Your Current Situation',
          description: 'Ask yourself these questions:',
          checklist: [
            { question: 'Am I learning new skills?', weight: 'high' },
            { question: 'Is my salary competitive?', weight: 'high' },
            { question: 'Do I have growth opportunities?', weight: 'high' },
            { question: 'Am I satisfied with work-life balance?', weight: 'medium' },
            { question: 'Do I like my team and manager?', weight: 'medium' },
            { question: 'Is the company stable?', weight: 'medium' }
          ]
        },
        {
          step: 'Compare Opportunities',
          description: 'Use our tools to compare:',
          action: 'Compare Jobs',
          link: '/explore',
          factors: [
            'Salary difference (aim for 30-50% hike)',
            'Learning opportunities',
            'Company reputation and stability',
            'Work culture and flexibility',
            'Career growth path'
          ]
        },
        {
          step: 'Timing Considerations',
          description: 'Best times to switch:',
          tips: [
            'After 2-3 years in current role (shows stability)',
            'When you have a solid offer in hand',
            'After completing major projects (good for resume)',
            'During high hiring seasons (Jan-Mar, Jul-Sep)',
            'When you\'ve learned all you can in current role'
          ]
        }
      ]
    },
    {
      id: 'career-growth',
      icon: TrendingUp,
      title: 'Career Growth Stuck',
      problem: 'How do I accelerate my career growth?',
      color: 'blue',
      solutions: [
        {
          step: 'Identify Skill Gaps',
          description: 'Find what skills you need for the next level:',
          action: 'Analyze Skills',
          link: '/skills-analysis'
        },
        {
          step: 'Set Clear Goals',
          description: 'Define your 1-year and 3-year career goals:',
          framework: [
            'Target role: What position do you want?',
            'Required skills: What do you need to learn?',
            'Timeline: When do you want to achieve this?',
            'Action plan: What steps will you take?'
          ]
        },
        {
          step: 'Take Action',
          description: 'Practical steps to grow:',
          actions: [
            'Take on challenging projects outside your comfort zone',
            'Learn high-demand skills (AI, Cloud, Data Science)',
            'Build a portfolio of work',
            'Network with senior professionals',
            'Contribute to open source or side projects',
            'Get certifications in your field'
          ]
        }
      ]
    },
    {
      id: 'location-decision',
      icon: MapPin,
      title: 'City/Location Decision',
      problem: 'Should I relocate for a job?',
      color: 'purple',
      solutions: [
        {
          step: 'Compare Cost of Living',
          description: 'Calculate real salary after expenses:',
          action: 'Compare Cities',
          link: '/city-comparison'
        },
        {
          step: 'Consider These Factors',
          description: 'Beyond salary:',
          factors: [
            {
              factor: 'Cost of Living',
              impact: 'High',
              note: 'Rent, food, transport can vary 2-3x between cities'
            },
            {
              factor: 'Career Opportunities',
              impact: 'High',
              note: 'Tech hubs like Bangalore, Pune have more opportunities'
            },
            {
              factor: 'Quality of Life',
              impact: 'Medium',
              note: 'Weather, pollution, traffic, safety'
            },
            {
              factor: 'Family & Social',
              impact: 'Medium',
              note: 'Distance from family, existing social circle'
            },
            {
              factor: 'Future Growth',
              impact: 'High',
              note: 'Will this city help your long-term career?'
            }
          ]
        },
        {
          step: 'Calculate Break-Even',
          description: 'Formula to decide:',
          formula: 'New Salary - (Relocation Cost + Increased Living Expenses) > Current Salary + 20%',
          example: 'If moving from Pune to Bangalore: ₹15L offer - (₹2L relocation + ₹3L extra rent/year) = ₹10L effective. Compare with current ₹8L in Pune.'
        }
      ]
    },
    {
      id: 'first-job',
      icon: Target,
      title: 'First Job Strategy',
      problem: 'How do I land my first job as a fresher?',
      color: 'green',
      solutions: [
        {
          step: 'Build Real Skills',
          description: 'Focus on practical, in-demand skills:',
          skills: [
            'For Software: Build 3-4 real projects, contribute to open source',
            'For Data: Create data analysis projects, Kaggle competitions',
            'For Design: Build a portfolio with 5-10 case studies',
            'For Marketing: Run campaigns, show measurable results'
          ]
        },
        {
          step: 'Create a Strong Portfolio',
          description: 'Showcase your work:',
          tips: [
            'GitHub profile with clean, documented code',
            'Personal website/portfolio',
            'LinkedIn with detailed project descriptions',
            'Blog posts explaining your projects',
            'Certifications from recognized platforms'
          ]
        },
        {
          step: 'Job Search Strategy',
          description: 'Where and how to apply:',
          channels: [
            'LinkedIn: Apply to 10-15 jobs daily',
            'Company careers pages: Direct applications',
            'Referrals: Ask for referrals on LinkedIn',
            'Campus placements: Don\'t miss these',
            'Internships: Convert to full-time',
            'Startups: Often more open to freshers'
          ]
        },
        {
          step: 'Realistic Expectations',
          description: 'Typical fresher salaries in India:',
          ranges: [
            'Tier-1 companies (Google, Microsoft): ₹15-25 LPA',
            'Tier-2 companies (Flipkart, Swiggy): ₹8-15 LPA',
            'Service companies (TCS, Infosys): ₹3.5-6 LPA',
            'Startups: ₹4-10 LPA (varies widely)',
            'Small companies: ₹2.5-5 LPA'
          ]
        }
      ]
    },
    {
      id: 'upskilling',
      icon: BookOpen,
      title: 'What Skills to Learn',
      problem: 'Which skills should I learn to increase my salary?',
      color: 'orange',
      solutions: [
        {
          step: 'High-Demand Skills (2024)',
          description: 'Skills that command premium salaries:',
          skills: [
            {
              skill: 'AI/Machine Learning',
              salary: '₹12-30 LPA',
              demand: 'Very High',
              learn: 'Python, TensorFlow, PyTorch, NLP'
            },
            {
              skill: 'Cloud (AWS/Azure/GCP)',
              salary: '₹10-25 LPA',
              demand: 'Very High',
              learn: 'AWS Solutions Architect, Kubernetes, Docker'
            },
            {
              skill: 'Data Engineering',
              salary: '₹10-28 LPA',
              demand: 'High',
              learn: 'Spark, Kafka, Airflow, SQL'
            },
            {
              skill: 'DevOps',
              salary: '₹9-22 LPA',
              demand: 'High',
              learn: 'CI/CD, Kubernetes, Terraform, Jenkins'
            },
            {
              skill: 'Full Stack Development',
              salary: '₹8-20 LPA',
              demand: 'High',
              learn: 'React, Node.js, MongoDB, System Design'
            }
          ]
        },
        {
          step: 'Learning Path',
          description: 'How to learn effectively:',
          path: [
            '1. Pick ONE skill to focus on (3-6 months)',
            '2. Take a structured course (Udemy, Coursera, YouTube)',
            '3. Build 2-3 real projects',
            '4. Get certified (AWS, Google, Microsoft)',
            '5. Apply for jobs requiring that skill',
            '6. Negotiate 30-50% salary hike'
          ]
        },
        {
          step: 'ROI Analysis',
          description: 'Time vs Salary increase:',
          action: 'Check Salary Trends',
          link: '/dashboard',
          example: 'Learning AWS (3 months) → Certification → Apply for Cloud roles → Potential ₹5-8 LPA increase'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="inline-block px-4 py-1 border border-cyan/30 bg-cyan/10 rounded-full mb-6">
            <span className="text-xs font-mono text-cyan tracking-widest uppercase flex items-center gap-2">
              <Lightbulb size={14} /> Real-World Career Solutions
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl mb-6">
            Solve Your <span className="gradient-text">Career Problems</span>
          </h1>
          <p className="text-xl text-subtext max-w-3xl">
            Practical, actionable advice for common career challenges faced by professionals in India.
          </p>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {realWorldProblems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.button
                key={problem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedProblem(problem)}
                className={`glass-panel p-8 text-left hover:scale-105 transition-all group ${
                  selectedProblem?.id === problem.id ? 'ring-2 ring-' + problem.color : ''
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-${problem.color}/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`text-${problem.color}`} size={28} />
                </div>
                <h3 className="text-2xl font-heading mb-2">{problem.title}</h3>
                <p className="text-subtext text-sm">{problem.problem}</p>
                <div className="mt-4 flex items-center text-cyan text-sm">
                  Get Solution <ArrowRight size={16} className="ml-2" />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Solution Details */}
        {selectedProblem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-8 md:p-12"
          >
            <div className="flex items-start gap-4 mb-8">
              <div className={`w-16 h-16 rounded-2xl bg-${selectedProblem.color}/20 flex items-center justify-center flex-shrink-0`}>
                <selectedProblem.icon className={`text-${selectedProblem.color}`} size={32} />
              </div>
              <div>
                <h2 className="text-4xl font-heading mb-2">{selectedProblem.title}</h2>
                <p className="text-xl text-subtext">{selectedProblem.problem}</p>
              </div>
            </div>

            <div className="space-y-8">
              {selectedProblem.solutions.map((solution, index) => (
                <div key={index} className="border-l-2 border-cyan/30 pl-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-cyan/20 flex items-center justify-center">
                      <span className="text-cyan font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-2xl font-heading">{solution.step}</h3>
                  </div>
                  
                  <p className="text-subtext mb-4">{solution.description}</p>

                  {solution.action && (
                    <a
                      href={solution.link}
                      className="inline-flex items-center gap-2 btn-neon-cyan mb-4"
                    >
                      {solution.action} <ArrowRight size={16} />
                    </a>
                  )}

                  {solution.tips && (
                    <ul className="space-y-2">
                      {solution.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle size={20} className="text-cyan flex-shrink-0 mt-0.5" />
                          <span className="text-subtext">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {solution.checklist && (
                    <div className="space-y-3">
                      {solution.checklist.map((item, i) => (
                        <div key={i} className="flex items-center justify-between bg-surface/30 p-4 rounded-lg">
                          <span>{item.question}</span>
                          <span className={`text-xs px-3 py-1 rounded-full ${
                            item.weight === 'high' ? 'bg-red-500/20 text-red-400' :
                            item.weight === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {item.weight} priority
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {solution.factors && (
                    <ul className="space-y-2">
                      {solution.factors.map((factor, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <AlertCircle size={20} className="text-magenta flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-white font-medium">{factor.factor || factor}</span>
                            {factor.impact && (
                              <span className="text-xs ml-2 px-2 py-0.5 rounded-full bg-cyan/20 text-cyan">
                                {factor.impact} Impact
                              </span>
                            )}
                            {factor.note && <p className="text-subtext text-sm mt-1">{factor.note}</p>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {solution.script && (
                    <div className="bg-surface/50 p-6 rounded-lg border border-cyan/20">
                      <p className="text-cyan italic">{solution.script}</p>
                    </div>
                  )}

                  {solution.framework && (
                    <ul className="space-y-2">
                      {solution.framework.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Target size={20} className="text-cyan flex-shrink-0 mt-0.5" />
                          <span className="text-subtext">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {solution.actions && (
                    <ul className="space-y-2">
                      {solution.actions.map((action, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-subtext">{action}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {solution.skills && (
                    <div className="grid md:grid-cols-2 gap-4">
                      {solution.skills.map((item, i) => (
                        <div key={i} className="bg-surface/30 p-4 rounded-lg">
                          {typeof item === 'string' ? (
                            <p className="text-subtext">{item}</p>
                          ) : (
                            <>
                              <h4 className="text-lg font-heading text-cyan mb-2">{item.skill}</h4>
                              <p className="text-sm text-subtext mb-2">{item.learn}</p>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-green-400">{item.salary}</span>
                                <span className="text-magenta">{item.demand} Demand</span>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {solution.path && (
                    <ol className="space-y-3">
                      {solution.path.map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-cyan font-bold">{step.split('.')[0]}.</span>
                          <span className="text-subtext">{step.split('.').slice(1).join('.')}</span>
                        </li>
                      ))}
                    </ol>
                  )}

                  {solution.formula && (
                    <div className="bg-surface/50 p-6 rounded-lg border border-magenta/20 space-y-3">
                      <p className="text-magenta font-mono text-sm">{solution.formula}</p>
                      {solution.example && (
                        <p className="text-subtext text-sm italic">{solution.example}</p>
                      )}
                    </div>
                  )}

                  {solution.ranges && (
                    <ul className="space-y-2">
                      {solution.ranges.map((range, i) => (
                        <li key={i} className="flex items-center justify-between bg-surface/30 p-3 rounded-lg">
                          <span className="text-subtext">{range.split(':')[0]}</span>
                          <span className="text-cyan font-heading">{range.split(':')[1]}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {solution.channels && (
                    <ul className="space-y-2">
                      {solution.channels.map((channel, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Users size={20} className="text-cyan flex-shrink-0 mt-0.5" />
                          <span className="text-subtext">{channel}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CareerAdvisor;
