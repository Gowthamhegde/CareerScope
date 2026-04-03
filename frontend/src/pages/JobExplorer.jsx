import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  SortAsc, 
  SortDesc, 
  X,
  Loader2,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import JobCard from '../components/JobCard';
import api from '../api/axios';
import toast from 'react-hot-toast';

const JobExplorer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'salary_usd');
  const [sortOrder, setSortOrder] = useState(searchParams.get('order') || 'desc');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
  
  const [filters, setFilters] = useState({
    experienceLevel: searchParams.get('experienceLevel')?.split(',') || [],
    employmentType: searchParams.get('employmentType')?.split(',') || [],
    companySize: searchParams.get('companySize') || '',
    remoteRatio: searchParams.get('remoteRatio') ? parseInt(searchParams.get('remoteRatio')) : undefined,
    category: searchParams.get('category')?.split(',') || [],
    companyLocation: searchParams.get('companyLocation')?.split(',') || [],
    workYear: searchParams.get('workYear') ? parseInt(searchParams.get('workYear')) : undefined,
    minSalary: searchParams.get('minSalary') || '',
    maxSalary: searchParams.get('maxSalary') || '',
    salaryRange: searchParams.get('salaryRange') || '',
  });

  const sortOptions = [
    { value: 'salary_local', label: 'Salary (Local)', icon: '💰' },
    { value: 'salary_usd', label: 'Salary (USD)', icon: '💵' },
    { value: 'work_year', label: 'Year', icon: '📅' },
    { value: 'job_title', label: 'Job Title', icon: '📝' },
    { value: 'company_location', label: 'Location', icon: '📍' },
    { value: 'experience_level', label: 'Experience', icon: '⭐' },
    { value: 'remote_ratio', label: 'Remote Work', icon: '🌐' },
    { value: 'created_at', label: 'Recently Added', icon: '🆕' },
  ];

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set('search', searchQuery);
    if (sortBy !== 'salary_usd') params.set('sortBy', sortBy);
    if (sortOrder !== 'desc') params.set('order', sortOrder);
    if (currentPage !== 1) params.set('page', currentPage.toString());
    
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(','));
      } else if (value !== undefined && value !== '') {
        params.set(key, value.toString());
      }
    });

    setSearchParams(params);
  }, [searchQuery, sortBy, sortOrder, currentPage, filters, setSearchParams]);

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const params = {
          page: currentPage,
          limit: 20,
          search: searchQuery,
          sortBy,
          order: sortOrder,
        };

        // Add filters to params
        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            params[key] = value.join(',');
          } else if (value !== undefined && value !== '') {
            params[key] = value;
          }
        });

        const response = await api.get('/jobs', { params });
        setJobs(response.data.data);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error('Failed to fetch jobs');
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [searchQuery, sortBy, sortOrder, currentPage, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClearFilters = () => {
    setFilters({
      experienceLevel: [],
      employmentType: [],
      companySize: '',
      remoteRatio: undefined,
      category: [],
      companyLocation: [],
      workYear: undefined,
      minSalary: '',
      maxSalary: '',
      salaryRange: '',
    });
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy) => {
    if (newSortBy === sortBy) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => 
      Array.isArray(value) ? value.length > 0 : value !== undefined && value !== ''
    ).length;
  };

  const removeFilter = (filterType, value = null) => {
    if (Array.isArray(filters[filterType])) {
      handleFilterChange(filterType, filters[filterType].filter(v => v !== value));
    } else {
      handleFilterChange(filterType, Array.isArray(filters[filterType]) ? [] : '');
    }
  };

  const renderActiveFilters = () => {
    const activeFilters = [];

    // Experience Level
    filters.experienceLevel.forEach(level => {
      const labels = { 'EN': 'Entry', 'MI': 'Mid', 'SE': 'Senior', 'EX': 'Executive' };
      activeFilters.push({
        type: 'experienceLevel',
        value: level,
        label: `Experience: ${labels[level]}`,
      });
    });

    // Employment Type
    filters.employmentType.forEach(type => {
      const labels = { 'FT': 'Full-time', 'PT': 'Part-time', 'CT': 'Contract', 'FL': 'Freelance' };
      activeFilters.push({
        type: 'employmentType',
        value: type,
        label: `Type: ${labels[type]}`,
      });
    });

    // Company Size
    if (filters.companySize) {
      const labels = { 'S': 'Small', 'M': 'Medium', 'L': 'Large' };
      activeFilters.push({
        type: 'companySize',
        label: `Company: ${labels[filters.companySize]}`,
      });
    }

    // Remote Ratio
    if (filters.remoteRatio !== undefined) {
      const labels = { 0: 'On-site', 50: 'Hybrid', 100: 'Remote' };
      activeFilters.push({
        type: 'remoteRatio',
        label: `Work: ${labels[filters.remoteRatio]}`,
      });
    }

    // Category
    filters.category.forEach(cat => {
      activeFilters.push({
        type: 'category',
        value: cat,
        label: `Category: ${cat}`,
      });
    });

    // Location
    filters.companyLocation.forEach(loc => {
      activeFilters.push({
        type: 'companyLocation',
        value: loc,
        label: `Location: ${loc}`,
      });
    });

    // Work Year
    if (filters.workYear) {
      activeFilters.push({
        type: 'workYear',
        label: `Year: ${filters.workYear}`,
      });
    }

    // Salary Range
    if (filters.minSalary || filters.maxSalary) {
      const min = filters.minSalary ? `₹${parseInt(filters.minSalary).toLocaleString('en-IN')}` : '';
      const max = filters.maxSalary ? `₹${parseInt(filters.maxSalary).toLocaleString('en-IN')}` : '';
      const label = min && max ? `Salary: ${min} - ${max}` : 
                   min ? `Salary: ${min}+` : `Salary: up to ${max}`;
      activeFilters.push({
        type: 'salary',
        label,
      });
    } else if (filters.salaryRange) {
      const rangeLabels = {
        'under-5l': 'Under ₹5L',
        '5l-10l': '₹5L - ₹10L',
        '10l-20l': '₹10L - ₹20L',
        '20l-30l': '₹20L - ₹30L',
        '30l-50l': '₹30L - ₹50L',
        'above-50l': 'Above ₹50L',
      };
      activeFilters.push({
        type: 'salaryRange',
        label: `Salary: ${rangeLabels[filters.salaryRange]}`,
      });
    }

    return activeFilters;
  };

  const renderPagination = () => {
    if (!pagination.totalPages || pagination.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-12">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!pagination.hasPrevPage}
          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              page === currentPage
                ? 'bg-primary-500 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!pagination.hasNextPage}
          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-white mb-4">
            Explore Jobs
          </h1>
          <p className="text-gray-400">
            Discover salary insights across thousands of job opportunities
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:w-80 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
              className="sticky top-24"
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <SearchBar
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search job titles, companies, or skills..."
                  />
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="input-field pr-12 appearance-none cursor-pointer min-w-[200px]"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value} className="bg-dark-800 text-white">
                          {option.icon} Sort by {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                    className="p-3 glass-card hover:bg-white/20 transition-colors rounded-xl group"
                    title={`Sort ${sortOrder === 'desc' ? 'ascending' : 'descending'}`}
                  >
                    {sortOrder === 'desc' ? (
                      <SortDesc className="h-5 w-5 text-white group-hover:text-primary-400 transition-colors" />
                    ) : (
                      <SortAsc className="h-5 w-5 text-white group-hover:text-primary-400 transition-colors" />
                    )}
                  </button>
                  
                  <div className="text-sm text-gray-400 hidden md:block">
                    {sortOrder === 'desc' ? 'High to Low' : 'Low to High'}
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {getActiveFiltersCount() > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-sm text-gray-400">Active filters:</span>
                  {renderActiveFilters().map((filter, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1 bg-primary-500/20 text-primary-300 px-3 py-1 rounded-full text-sm border border-primary-500/30"
                    >
                      <span>{filter.label}</span>
                      <button
                        onClick={() => removeFilter(filter.type, filter.value)}
                        className="hover:text-white transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-gray-400 hover:text-white transition-colors underline"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Results Count */}
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>
                  {isLoading ? (
                    'Loading...'
                  ) : (
                    `Showing ${jobs.length} of ${pagination.totalJobs || 0} jobs`
                  )}
                </span>
                {pagination.totalPages > 1 && (
                  <span>
                    Page {currentPage} of {pagination.totalPages}
                  </span>
                )}
              </div>
            </div>

            {/* Jobs Grid */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="glass-card p-6">
                      <div className="animate-pulse">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="skeleton h-6 w-3/4 mb-2" />
                            <div className="skeleton h-4 w-1/2" />
                          </div>
                          <div className="skeleton h-6 w-16" />
                        </div>
                        <div className="skeleton h-8 w-24 mb-4" />
                        <div className="flex justify-between items-center">
                          <div className="skeleton h-4 w-20" />
                          <div className="skeleton h-4 w-16" />
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : jobs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-16"
                >
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-semibold text-white mb-2">
                    No jobs found
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Try adjusting your search criteria or filters to find more results.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="btn-secondary"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                  {jobs.map((job, index) => (
                    <JobCard key={job._id} job={job} index={index} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {renderPagination()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobExplorer;