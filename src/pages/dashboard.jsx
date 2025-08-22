import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  User, 
  Briefcase, 
  Target, 
  BarChart3,
  Calendar,
  Star,
  MapPin,
  DollarSign,
  Clock,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../utils/cn';

export default function Dashboard() {
  const { user, jobPredictions, addJobPrediction, setLoading } = useStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const mockPredictions = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      salary: "$120k - $180k",
      matchScore: 95,
      skills: ["React", "Node.js", "Python", "AWS"],
      status: "Recommended",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Innovation Inc",
      location: "New York, NY",
      salary: "$100k - $150k",
      matchScore: 87,
      skills: ["Product Strategy", "Agile", "Data Analysis", "Leadership"],
      status: "Good Match",
      createdAt: "2024-01-10"
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "Austin, TX",
      salary: "$90k - $140k",
      matchScore: 78,
      skills: ["Python", "Machine Learning", "SQL", "Statistics"],
      status: "Consider",
      createdAt: "2024-01-05"
    }
  ];

  useEffect(() => {
    // Simulate loading predictions
    setLoading(true);
    setTimeout(() => {
      // In a real app, this would be an API call
      setLoading(false);
    }, 1000);
  }, []);

  const stats = [
    { label: "Total Predictions", value: mockPredictions.length, icon: Target, color: "blue" },
    { label: "High Match Jobs", value: mockPredictions.filter(p => p.matchScore >= 90).length, icon: Star, color: "green" },
    { label: "Companies", value: new Set(mockPredictions.map(p => p.company)).size, icon: Briefcase, color: "purple" },
    { label: "Avg. Match Score", value: `${Math.round(mockPredictions.reduce((acc, p) => acc + p.matchScore, 0) / mockPredictions.length)}%`, icon: TrendingUp, color: "orange" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Recommended': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Good Match': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Consider': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 80) return 'text-blue-600 dark:text-blue-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.name || 'User'}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Here's what's happening with your career predictions today.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Prediction
            </motion.button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <div className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center",
                      `bg-${stat.color}-100 dark:bg-${stat.color}-900/20`
                    )}>
                      <Icon className={cn("w-6 h-6", `text-${stat.color}-600 dark:text-${stat.color}-400`)} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'predictions', label: 'Job Predictions', icon: Target },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                { id: 'settings', label: 'Settings', icon: User }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search jobs, companies, or skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                </div>

                {/* Recent Predictions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Recent Job Predictions
                  </h3>
                  <div className="space-y-4">
                    {mockPredictions.map((prediction, index) => (
                      <motion.div
                        key={prediction.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {prediction.title}
                              </h4>
                              <span className={cn(
                                "px-2 py-1 text-xs font-medium rounded-full",
                                getStatusColor(prediction.status)
                              )}>
                                {prediction.status}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                              <span className="flex items-center">
                                <Briefcase className="w-4 h-4 mr-1" />
                                {prediction.company}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {prediction.location}
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {prediction.salary}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {prediction.skills.map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded-md"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className={cn(
                              "text-2xl font-bold",
                              getScoreColor(prediction.matchScore)
                            )}>
                              {prediction.matchScore}%
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Match Score
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'predictions' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Job Predictions
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Detailed view of all your job predictions and recommendations.
                </p>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Analytics Dashboard
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Advanced analytics and insights about your career predictions.
                </p>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Profile Settings
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Manage your profile, preferences, and account settings.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
