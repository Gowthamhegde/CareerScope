const supabase = require('../config/supabase');

class SupabaseJob {
  // Get all jobs with pagination and filters
  static async findAll(options = {}) {
    const {
      page = 1,
      limit = 20,
      sortBy = 'salary_usd',
      sortOrder = 'desc',
      filters = {}
    } = options;

    let query = supabase
      .from('jobs')
      .select('*', { count: 'exact' });

    // Apply filters
    if (filters.experience_level) {
      query = query.eq('experience_level', filters.experience_level);
    }
    if (filters.job_title) {
      query = query.ilike('job_title', `%${filters.job_title}%`);
    }
    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    if (filters.company_location) {
      query = query.eq('company_location', filters.company_location);
    }
    if (filters.min_salary) {
      query = query.gte('salary_usd', filters.min_salary);
    }
    if (filters.max_salary) {
      query = query.lte('salary_usd', filters.max_salary);
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      data,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalJobs: count,
        hasNextPage: page < Math.ceil(count / limit),
        hasPrevPage: page > 1
      }
    };
  }

  // Get job by ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Get job statistics
  static async getStats() {
    // Total count
    const { count: totalJobs } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true });

    // Get all jobs for calculations
    const { data: allJobs } = await supabase
      .from('jobs')
      .select('salary_usd, experience_level, category');

    if (!allJobs || allJobs.length === 0) {
      return {
        totalJobs: 0,
        avgSalary: 0,
        totalCategories: 0,
        experienceLevels: []
      };
    }

    // Calculate average salary
    const avgSalary = Math.round(
      allJobs.reduce((sum, job) => sum + job.salary_usd, 0) / allJobs.length
    );

    // Experience level distribution
    const experienceLevels = {};
    allJobs.forEach(job => {
      if (!experienceLevels[job.experience_level]) {
        experienceLevels[job.experience_level] = {
          level: job.experience_level,
          count: 0,
          totalSalary: 0
        };
      }
      experienceLevels[job.experience_level].count++;
      experienceLevels[job.experience_level].totalSalary += job.salary_usd;
    });

    const experienceLevelStats = Object.values(experienceLevels).map(level => ({
      level: level.level,
      count: level.count,
      avgSalary: Math.round(level.totalSalary / level.count)
    }));

    // Categories
    const uniqueCategories = [...new Set(allJobs.map(j => j.category).filter(Boolean))];

    return {
      totalJobs: totalJobs || 0,
      avgSalary,
      totalCategories: uniqueCategories.length,
      experienceLevels: experienceLevelStats
    };
  }

  // Get distinct values for filters
  static async getDistinctValues(column) {
    const { data, error } = await supabase
      .from('jobs')
      .select(column)
      .not(column, 'is', null);

    if (error) throw error;

    return [...new Set(data.map(item => item[column]))];
  }

  // Search jobs
  static async search(query, options = {}) {
    const { limit = 20 } = options;

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .or(`job_title.ilike.%${query}%,category.ilike.%${query}%`)
      .limit(limit);

    if (error) throw error;
    return data;
  }
}

module.exports = SupabaseJob;
