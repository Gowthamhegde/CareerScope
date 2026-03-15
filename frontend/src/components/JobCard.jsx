import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Building2, 
  Calendar, 
  Globe, 
  Home, 
  Shuffle,
  ExternalLink,
  TrendingUp,
  Star
} from 'lucide-react';
import { formatCurrency } from '../utils/currency';

const JobCard = ({ job, index = 0 }) => {
  const getExperienceBadge = (level) => {
    const badges = {
      'EN': { label: 'Entry', color: 'bg-success-500/20 text-success-300 border-success-500/30', icon: '🌱' },
      'MI': { label: 'Mid', color: 'bg-primary-500/20 text-primary-300 border-primary-500/30', icon: '🚀' },
      'SE': { label: 'Senior', color: 'bg-accent-500/20 text-accent-300 border-accent-500/30', icon: '⭐' },
      'EX': { label: 'Executive', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30', icon: '👑' },
    };
    return badges[level] || badges['EN'];
  };

  const getRemoteIcon = (ratio) => {
    if (ratio === 100) return { icon: Globe, label: 'Remote', color: 'text-success-400' };
    if (ratio === 50) return { icon: Shuffle, label: 'Hybrid', color: 'text-primary-400' };
    return { icon: Home, label: 'On-site', color: 'text-gray-400' };
  };

  const getCompanySizeBadge = (size) => {
    const sizes = {
      'S': { label: 'Startup', color: 'bg-pink-500/20 text-pink-300 border-pink-500/30', icon: '🏠' },
      'M': { label: 'Mid-size', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30', icon: '🏢' },
      'L': { label: 'Enterprise', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', icon: '🏗️' },
    };
    return sizes[size] || sizes['M'];
  };

  const experienceBadge = getExperienceBadge(job.experienceLevel);
  const remoteInfo = getRemoteIcon(job.remoteRatio);
  const companySizeBadge = getCompanySizeBadge(job.companySize);
  const RemoteIcon = remoteInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="glass-card-hover p-6 group relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-heading font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
              {job.jobTitle}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{job.companyLocation}</span>
              {job.companyLocation === 'India' && <span className="text-orange-400">🇮🇳</span>}
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <div className={`badge ${experienceBadge.color} flex items-center space-x-1`}>
              <span>{experienceBadge.icon}</span>
              <span>{experienceBadge.label}</span>
            </div>
          </div>
        </div>

        {/* Salary - Primary display */}
        <div className="mb-4">
          <div className="flex items-baseline space-x-2">
            <div className="text-2xl font-heading font-bold gradient-text">
              {formatCurrency(job.salaryInLocalCurrency, job.localCurrency)}
            </div>
            {job.localCurrency !== 'USD' && (
              <div className="text-sm text-gray-400">
                ({formatCurrency(job.salaryUSD, 'USD')})
              </div>
            )}
          </div>
          <div className="text-sm text-gray-400">per year</div>
        </div>

        {/* Details */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center space-x-2">
            <Building2 className="h-4 w-4 text-gray-400" />
            <span className={`badge ${companySizeBadge.color} flex items-center space-x-1`}>
              <span>{companySizeBadge.icon}</span>
              <span>{companySizeBadge.label}</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <RemoteIcon className={`h-4 w-4 ${remoteInfo.color}`} />
            <span className={`text-xs font-medium ${remoteInfo.color}`}>
              {remoteInfo.label}
            </span>
          </div>
        </div>

        {/* Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {job.skills.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="badge badge-gray text-xs hover:bg-primary-500/20 hover:text-primary-300 hover:border-primary-500/30 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 3 && (
                <span className="badge badge-primary text-xs">
                  +{job.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Category */}
        {job.category && (
          <div className="mb-4">
            <span className="inline-flex items-center space-x-1 text-xs text-primary-400 bg-primary-500/10 px-2 py-1 rounded-lg border border-primary-500/20">
              <Star className="h-3 w-3" />
              <span>{job.category}</span>
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <Calendar className="h-3 w-3" />
            <span>{job.workYear}</span>
            {job.workYear === 2024 && (
              <span className="inline-flex items-center space-x-1 text-success-400">
                <TrendingUp className="h-3 w-3" />
                <span>Latest</span>
              </span>
            )}
          </div>
          
          <Link
            to={`/jobs/${job._id}`}
            className="inline-flex items-center space-x-2 text-sm text-primary-400 hover:text-primary-300 transition-colors group/link font-medium"
          >
            <span>View Details</span>
            <ExternalLink className="h-3 w-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;