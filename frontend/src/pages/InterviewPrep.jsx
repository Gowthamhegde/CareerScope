import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

const InterviewPrep = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = [
    {
      id: 'expected-salary',
      title: 'Expected Salary Question',
      question: '"What is your expected salary?"',
      goodAnswers: [
        '"Based on my research and the market rate for this role with my experience level, I\'m looking for a range of ₹X-Y LPA. However, I\'m flexible and open to discussing the complete compensation package."',
        '"I\'ve seen similar roles in the market ranging from ₹X to ₹Y LPA. Given my skills in [specific skills] and [X years] experience, I believe ₹Z LPA would be fair. What\'s the budget for this role?"',
        '"I\'m currently at ₹X LPA. For a move to be worthwhile, I\'m targeting at least a 30-40% increase, which would put me around ₹Y LPA. Is that within your range?"'
      ],
      badAnswers: [
        '❌ "I\'ll take whatever you offer" - Shows desperation',
        '❌ "₹50 LPA" (unrealistic) - Shows lack of market awareness',
        '❌ "I don\'t know" - Unprepared',
        '❌ Giving exact number first - Loses negotiation leverage'
      ],
      tips: [
        'Always give a range, not exact number',
        'Research market rates beforehand (use our tools!)',
        'Mention your current salary as anchor',
        'Ask about their budget range',
        'Consider total compensation, not just base'
      ]
    },
    {
      id: 'current-salary',
      title: 'Current Salary Question',
      question: '"What is your current CTC?"',
      goodAnswers: [
        '"I\'m currently at ₹X LPA. However, I\'m more interested in discussing the value I can bring to this role and what the market rate is for this position."',
        '"My current package is ₹X LPA, but I\'m looking for growth opportunities and the right fit, which is why I\'m excited about this role."',
        '"I\'m at ₹X LPA currently. I\'ve researched this role and believe ₹Y-Z LPA would be appropriate given my skills and the market rate."'
      ],
      tips: [
        'Be honest - they may verify',
        'Quickly pivot to value you bring',
        'Don\'t let current salary anchor too low',
        'Mention if you\'re underpaid currently',
        'Focus on market rate, not current pay'
      ]
    },
    {
      id: 'negotiation',
      title: 'Negotiating Higher',
      question: '"The offer is ₹X LPA. Can you accept?"',
      goodAnswers: [
        '"Thank you for the offer. I\'m excited about the role. Based on my research and the market rate for similar positions, I was expecting ₹Y LPA. Is there flexibility in the offer?"',
        '"I appreciate the offer. Given my [specific skills/experience], I was hoping for something closer to ₹Y LPA. Can we discuss this?"',
        '"Thanks for the offer. I have another offer at ₹Y LPA. I prefer your company, but the compensation difference is significant. Can you match or come closer?"'
      ],
      tips: [
        'Always negotiate - worst case they say no',
        'Have data to back your ask',
        'Mention other offers if you have them',
        'Be polite but firm',
        'Ask for 15-20% more than offer',
        'Negotiate other benefits if salary is fixed'
      ]
    },
    {
      id: 'notice-period',
      title: 'Notice Period Discussion',
      question: '"Can you join in 15 days?"',
      goodAnswers: [
        '"My current notice period is 60 days, but I can discuss with my manager about an early release. I\'ll do my best to join as soon as possible."',
        '"I have a 90-day notice period. However, I can start the resignation process immediately and work with both teams to expedite this."',
        '"I\'m currently serving my notice period and can join in 30 days."'
      ],
      tips: [
        'Be honest about notice period',
        'Don\'t promise what you can\'t deliver',
        'Offer to help expedite if possible',
        'Never leave current job unprofessionally',
        'Negotiate joining date if needed'
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="inline-block px-4 py-1 border border-cyan/30 bg-cyan/10 rounded-full mb-6">
            <span className="text-xs font-mono text-cyan tracking-widest uppercase flex items-center gap-2">
              <MessageSquare size={14} /> Interview Preparation
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl mb-6">
            Ace Your <span className="gradient-text">Salary Discussion</span>
          </h1>
          <p className="text-xl text-subtext max-w-3xl">
            Learn how to answer tough salary questions and negotiate like a pro.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className={`glass-panel p-6 text-left hover:scale-105 transition-all ${
                selectedTopic?.id === topic.id ? 'ring-2 ring-cyan' : ''
              }`}
            >
              <h3 className="text-xl font-heading mb-2">{topic.title}</h3>
              <p className="text-subtext text-sm italic">"{topic.question}"</p>
            </button>
          ))}
        </div>

        {selectedTopic && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-8">
            <h2 className="text-3xl font-heading mb-4">{selectedTopic.title}</h2>
            <p className="text-xl text-cyan italic mb-8">"{selectedTopic.question}"</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-heading mb-4 flex items-center gap-2">
                  <CheckCircle className="text-green-400" /> Good Answers
                </h3>
                <div className="space-y-4">
                  {selectedTopic.goodAnswers.map((answer, i) => (
                    <div key={i} className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <p className="text-subtext">{answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {selectedTopic.badAnswers && (
                <div>
                  <h3 className="text-xl font-heading mb-4 flex items-center gap-2">
                    <AlertCircle className="text-red-400" /> Avoid These
                  </h3>
                  <div className="space-y-2">
                    {selectedTopic.badAnswers.map((answer, i) => (
                      <div key={i} className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                        <p className="text-sm text-subtext">{answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-xl font-heading mb-4">💡 Pro Tips</h3>
                <ul className="space-y-2">
                  {selectedTopic.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan">•</span>
                      <span className="text-subtext">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InterviewPrep;
