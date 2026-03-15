import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Building2, 
  Calendar, 
  Globe, 
  Home, 
  Shuffle,
  Users,
  TrendingUp,
  Award,
  ExternalLink,
  Loader2
} from 'lucide-react';
import JobCard from '../components/JobCard';
import SalaryChart from '../components/SalaryChart';
import { formatCurrency, formatCurrencyDetailed } from '../utils/currency';
import api from '../api/axios';
import toast from 'react-hot-toast';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [salaryDistribution, setSalaryDistribution] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const [jobResponse, salaryResponse] = await Promise.all([
          api.get(`/jobs/${id}`),
          api.get('/salary/by-experience')
        ]);

        const jobData = jobResponse.data.data;
        setJob(jobData.job);
        setSimilarJobs(jobData.similarJobs || []);
        setSalaryDistribution(salaryResponse.data.data || []);
      } catch (error) {
        console.error('Error fetching job detail:', error);
        toast.error('Failed to load job details');
        navigate('/explore');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchJobDetail();
    }
  }, [id, navigate]);

  const formatCurrencyValue = (amount, currency = 'INR') => {
    return formatCurrency(amount, currency);
  };

  const formatCurrencyDetailedValue = (amount, currency = 'INR') => {
    return formatCurrencyDetailed(amount, currency);
  };

  const getExperienceBadge = (level) => {
    const badges = {
      'EN': { label: 'Entry Level', color: 'bg-green-500/20 text-green-300 border-green-500/30' },
      'MI': { label: 'Mid Level', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      'SE': { label: 'Senior Level', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
      'EX': { label: 'Executive', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    };
    return badges[level] || badges['EN'];
  };

  const getRemoteInfo = (ratio) => {
    if (ratio === 100) return { icon: Globe, label: 'Remote', color: 'text-green-400' };
    if (ratio === 50) return { icon: Shuffle, label: 'Hybrid', color: 'text-blue-400' };
    return { icon: Home, label: 'On-site', color: 'text-gray-400' };
  };

  const getCompanySizeBadge = (size) => {
    const sizes = {
      'S': { label: 'Small Company', color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
      'M': { label: 'Mid-size Company', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
      'L': { label: 'Large Company', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    };
    return sizes[size] || sizes['M'];
  };

  const getEmploymentTypeBadge = (type) => {
    const types = {
      'FT': { label: 'Full-time', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      'PT': { label: 'Part-time', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
      'CT': { label: 'Contract', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
      'FL': { label: 'Freelance', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    };
    return types[type] || types['FT'];
  };

  const calculatePercentile = (salary, distribution) => {
    if (!distribution.length) return 50;
    
    const totalJobs = distribution.reduce((sum, item) => sum + item.count, 0);
    let jobsBelow = 0;
    
    for (const item of distribution) {
      if (item.avgSalary < salary) {
        jobsBelow += item.count;
      }
    }
    
    return Math.round((jobsBelow / totalJobs) * 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold text-white mb-4">
            Job not found
          </h2>
          <Link to="/explore" className="btn-primary">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const experienceBadge = getExperienceBadge(job.experienceLevel);
  const remoteInfo = getRemoteInfo(job.remoteRatio);
  const companySizeBadge = getCompanySizeBadge(job.companySize);
  const employmentTypeBadge = getEmploymentTypeBadge(job.employmentType);
  const RemoteIcon = remoteInfo.icon;
  const percentile = calculatePercentile(job.salaryUSD, salaryDistribution);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Jobs</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div className="flex-1 mb-4 md:mb-0">
                  <h1 className="text-3xl font-heading font-bold text-white mb-4">
                    {job.jobTitle}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{job.companyLocation}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{job.workYear}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RemoteIcon className={`h-4 w-4 ${remoteInfo.color}`} />
                      <span className={remoteInfo.color}>{remoteInfo.label}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className={`badge ${experienceBadge.color}`}>
                      {experienceBadge.label}
                    </span>
                    <span className={`badge ${employmentTypeBadge.color}`}>
                      {employmentTypeBadge.label}
                    </span>
                    <span className={`badge ${companySizeBadge.color}`}>
                      {companySizeBadge.label}
                    </span>
                    {job.category && (
                      <span className="badge badge-primary">
                        {job.category}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-4xl font-heading font-bold gradient-text mb-2">
                    {formatCurrencyValue(job.salaryInLocalCurrency, job.localCurrency)}
                  </div>
                  <div className="text-gray-400">Annual Salary</div>
                  {job.localCurrency !== 'INR' && job.salaryUSD && (
                    <div className="text-sm text-gray-500 mt-1">
                      ≈ {formatCurrencyValue(job.salaryUSD * 83, 'INR')} (INR)
                    </div>
                  )}
                </div>
              </div>

              {/* Skills */}
              {job.skills && job.skills.length > 0 && (
                <div>
                  <h3 className="text-lg font-heading font-semibold text-white mb-3">
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="badge badge-gray">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Salary Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8"
            >
              <h2 className="text-2xl font-heading font-bold text-white mb-6">
                Salary Analysis
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-400 mb-2">
                    {percentile}%
                  </div>
                  <div className="text-gray-400">Percentile</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Higher than {percentile}% of similar roles
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-400 mb-2">
                    {job.category}
                  </div>
                  <div className="text-gray-400">Category</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Job classification
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {job.employeeResidence}
                  </div>
                  <div className="text-gray-400">Employee Location</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Based in {job.employeeResidence}
                  </div>
                </div>
              </div>

              {/* Salary Fairness Indicator */}
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-6 border border-green-500/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Award className="h-6 w-6 text-green-400" />
                  <h3 className="text-lg font-heading font-semibold text-white">
                    Salary Assessment
                  </h3>
                </div>
                <p className="text-gray-300">
                  This salary is in the <span className="text-green-400 font-semibold">
                    {percentile >= 75 ? 'top 25%' : percentile >= 50 ? 'upper 50%' : 'lower 50%'}
                  </span> for similar roles in this category. 
                  {percentile >= 75 && ' This is an excellent compensation package.'}
                  {percentile >= 50 && percentile < 75 && ' This is a competitive salary.'}
                  {percentile < 50 && ' There may be room for salary negotiation.'}
                </p>
              </div>
            </motion.div>

            {/* Salary Distribution Chart */}
            {salaryDistribution.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <SalaryChart
                  data={salaryDistribution}
                  chartType="bar"
                  xKey="level"
                  yKey="avgSalary"
                  title="Salary Distribution by Experience Level"
                  height={300}
                />
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-heading font-semibold text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  to={`/explore?category=${encodeURIComponent(job.category)}`}
                  className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <Building2 className="h-4 w-4" />
                  <span>View similar jobs</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
                
                <Link
                  to={`/explore?experienceLevel=${job.experienceLevel}`}
                  className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <Users className="h-4 w-4" />
                  <span>Jobs at this level</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
                
                <Link
                  to="/predictor"
                  className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Predict your salary</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </motion.div>

            {/* Job Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-heading font-semibold text-white mb-4">
                Job Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Experience Level:</span>
                  <span className="text-white">{experienceBadge.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Employment Type:</span>
                  <span className="text-white">{employmentTypeBadge.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Company Size:</span>
                  <span className="text-white">{companySizeBadge.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Remote Ratio:</span>
                  <span className={remoteInfo.color}>{job.remoteRatio}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Work Year:</span>
                  <span className="text-white">{job.workYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white">{job.category}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Similar Jobs */}
        {similarJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-heading font-bold text-white mb-8">
              Similar Jobs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarJobs.slice(0, 6).map((similarJob, index) => (
                <JobCard key={similarJob._id} job={similarJob} index={index} />
              ))}
            </div>
            
            {similarJobs.length > 6 && (
              <div className="text-center mt-8">
                <Link
                  to={`/explore?category=${encodeURIComponent(job.category)}&experienceLevel=${job.experienceLevel}`}
                  className="btn-secondary"
                >
                  View More Similar Jobs
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default JobDetail;