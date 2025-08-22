import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  User, 
  Briefcase, 
  Target, 
  BarChart3,
  Star,
  MapPin,
  DollarSign,
  Plus,
  Search,
  Filter,
  Users,
  ClipboardList,
  GraduationCap,
  Building2,
  Upload,
  FileText
} from 'lucide-react';
import { ResponsiveContainer, RadialBarChart, RadialBar, BarChart as RBChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { useStore } from '../store/useStore';
import { cn } from '../utils/cn';

function Card({ children }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      {children}
    </div>
  );
}

function ProgressBar({ label, percent, color = 'blue' }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-gray-500 dark:text-gray-400">{percent}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className={cn('h-2 rounded-full', `bg-${color}-600`)} style={{ width: `${Math.min(100, Math.max(0, percent))}%` }} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, setLoading } = useStore();
  const role = (user?.role || '').toLowerCase();
  const isHR = role.includes('hr');
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Student tool state
  const [studentSkills, setStudentSkills] = useState('');
  const [studentResumeName, setStudentResumeName] = useState('');
  const [studentResult, setStudentResult] = useState(null);

  // HR tool state
  const [hrFiles, setHrFiles] = useState([]);
  const [hrError, setHrError] = useState('');
  const [hrResults, setHrResults] = useState([]); // top 5
  const [hrAllResults, setHrAllResults] = useState([]); // all

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [setLoading]);

  // Mock data tailored by role
  const mockData = useMemo(() => {
    if (isHR) {
      return {
        stats: [
          { label: 'Open Roles', value: 8, icon: Briefcase, color: 'blue' },
          { label: 'New Applicants', value: 42, icon: Users, color: 'green' },
          { label: 'Interviews This Week', value: 12, icon: ClipboardList, color: 'purple' },
          { label: 'Avg. Match Score', value: '82%', icon: TrendingUp, color: 'orange' }
        ],
        listTitle: 'Recent Applicants',
        items: [
          { id: 1, title: 'Junior Frontend Engineer', company: 'Tech Corp', location: 'thanjavur', salary: '$100k - $140k', matchScore: 91, skills: ['React', 'TypeScript', 'Tailwind'], status: 'Shortlisted' },
          { id: 2, title: 'Data Analyst', company: 'DataWorks', location: 'America', salary: '$80k - $110k', matchScore: 79, skills: ['SQL', 'Python', 'Tableau'], status: 'Under Review' },
          { id: 3, title: 'Product Manager', company: 'Buildify', location: 'USA', salary: '$120k - $160k', matchScore: 85, skills: ['Strategy', 'Agile', 'Communication'], status: 'Interviewing' }
        ],
        tabs: [
          { id: 'overview', label: 'HR Overview', icon: BarChart3 },
          { id: 'tools', label: 'HR Tools', icon: Briefcase },
          { id: 'candidates', label: 'Candidates', icon: Users },
          { id: 'settings', label: 'Settings', icon: User }
        ],
        headerGreeting: 'HR Dashboard',
        cta: { label: 'Create Job Post', icon: Plus }
      };
    }

    // Student default
    return {
      stats: [
        { label: 'Predictions', value: 12, icon: Target, color: 'blue' },
        { label: 'High Matches', value: 5, icon: Star, color: 'green' },
        { label: 'Applications', value: 7, icon: Briefcase, color: 'purple' },
        { label: 'Profile Strength', value: '90%', icon: TrendingUp, color: 'orange' }
      ],
      listTitle: 'Recommended Roles',
      items: [
        { id: 1, title: ' Software Engineer', company: 'InnovateX', location: 'Remote', salary: '$70k - $95k', matchScore: 93, skills: ['JavaScript', 'React', 'Git'], status: 'Recommended' },
        { id: 2, title: 'Data Scientist (Entry)', company: 'Insights AI', location: 'Austin, TX', salary: '$85k - $110k', matchScore: 81, skills: ['Python', 'Pandas', 'ML'], status: 'Good Match' },
        { id: 3, title: 'Business Analyst', company: 'Acme Co', location: 'Bengaluru', salary: '₹8L - ₹14L', matchScore: 77, skills: ['Excel', 'SQL', 'Communication'], status: 'Consider' }
      ],
      tabs: [
        { id: 'overview', label: 'Student Overview', icon: BarChart3 },
        { id: 'tools', label: 'Student Tools', icon: GraduationCap },
        { id: 'predictions', label: 'Predictions', icon: Target },
        { id: 'settings', label: 'Settings', icon: User }
      ],
      headerGreeting: 'Student Dashboard',
      cta: { label: 'New Prediction', icon: Plus }
    };
  }, [isHR]);

  const getStatusColor = (status) => {
    const normalized = status.toLowerCase();
    if (['recommended', 'shortlisted', 'interviewing'].includes(normalized)) {
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    }
    if (['good match', 'under review'].includes(normalized)) {
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    }
    if (['consider'].includes(normalized)) {
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    }
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 80) return 'text-blue-600 dark:text-blue-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  // ---- Mock analysis helpers ----
  const baseRoles = [
    { role: 'Software Engineer', skills: ['javascript', 'react', 'node', 'git', 'html', 'css'] },
    { role: 'Data Scientist', skills: ['python', 'pandas', 'machine learning', 'sql', 'statistics'] },
    { role: 'Business Analyst', skills: ['excel', 'sql', 'communication', 'visualization'] },
    { role: 'DevOps Engineer', skills: ['aws', 'docker', 'ci/cd', 'linux'] },
  ];

  function analyzeStudent(skillsText, resumeText = '') {
    const tokens = (skillsText + ' ' + resumeText).toLowerCase().split(/[^a-z+#.]+/).filter(Boolean);
    const tokenSet = new Set(tokens);

    const roleScores = baseRoles.map(({ role, skills }) => {
      const compact = (s) => s.replace(/\s+/g, '');
      const have = skills.filter(s => tokenSet.has(compact(s)) || tokenSet.has(s));
      const percent = Math.round((have.length / skills.length) * 100);
      const gaps = skills.filter(s => !have.includes(s));
      return { role, percent, have, gaps, required: skills };
    }).sort((a, b) => b.percent - a.percent);

    const best = roleScores[0];
    const acquired = best.have.map(s => ({ skill: s, percent: 100 }));
    const lacking = best.gaps.map(s => ({ skill: s, percent: 0 }));

    return {
      bestRole: best.role,
      matchScore: best.percent,
      acquired,
      lacking,
      roleBreakdown: roleScores.slice(0, 3)
    };
  }

  function analyzeHR(files) {
    const results = Array.from(files).map((f) => {
      const base = Math.min(95, 50 + Math.floor((f.name.length % 20) * 2.2));
      const score = Math.max(50, Math.min(98, base));
      const skills = ['javascript','react','python','sql','aws','docker','excel','ml'];
      const top = skills
        .map(s => ({ s, v: Math.floor(Math.random() * 60) + 40 }))
        .sort((a, b) => b.v - a.v)
        .slice(0, 4)
        .map(({ s, v }) => ({ skill: s, percent: v }));
      const suggested = top[0]?.skill?.includes('react') || top[0]?.skill?.includes('javascript') ? 'Frontend Engineer' : top[0]?.skill?.includes('python') || top[0]?.skill?.includes('ml') ? 'Data Scientist' : 'Analyst';
      return { name: f.name, size: f.size, score, top, suggested };
    }).sort((a, b) => b.score - a.score);

    return { top5: results.slice(0, 5), all: results };
  }

  // ---- Student actions ----
  const onStudentResume = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setStudentResumeName(file.name);
    if (file.type === 'text/plain') {
      const text = await file.text();
      const result = analyzeStudent(studentSkills, text);
      setStudentResult(result);
    } else {
      const result = analyzeStudent(studentSkills, file.name);
      setStudentResult(result);
    }
  };

  const runStudentAnalysis = () => {
    const result = analyzeStudent(studentSkills, '');
    setStudentResult(result);
  };

  // ---- HR actions ----
  const onHrFiles = async (e) => {
    const files = e.target.files || [];
    if (files.length < 5 || files.length > 20) {
      setHrError('Please upload between 5 and 20 resumes.');
      setHrFiles([]);
      setHrResults([]);
      setHrAllResults([]);
      return;
    }
    setHrError('');
    const arr = Array.from(files);
    setHrFiles(arr);
    const result = analyzeHR(files);
    setHrResults(result.top5);
    setHrAllResults(result.all);
  };

  // Aggregations for charts
  const studentAcquiredChart = useMemo(() => {
    if (!studentResult) return [];
    return studentResult.acquired.map((s) => ({ name: s.skill, value: s.percent }));
  }, [studentResult]);

  const studentGapsChart = useMemo(() => {
    if (!studentResult) return [];
    return studentResult.lacking.map((s) => ({ name: s.skill, value: 100 }));
  }, [studentResult]);

  const hrSkillDistribution = useMemo(() => {
    const counts = new Map();
    hrAllResults.forEach(r => {
      r.top.forEach(t => counts.set(t.skill, (counts.get(t.skill) || 0) + 1));
    });
    return Array.from(counts.entries()).map(([name, value]) => ({ name, value }));
  }, [hrAllResults]);

  const pieColors = ['#3B82F6','#22C55E','#F59E0B','#EF4444','#8B5CF6','#06B6D4','#84CC16','#F472B6'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header - left aligned */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {mockData.headerGreeting}{user?.name ? `, ${user.name}` : ''}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {isHR ? 'Upload and rank fresher resumes. Manage candidates and roles.' : 'Search jobs by skill or upload your resume to see fit and gaps.'}
            </p>
          </div>

          {/* Role-based tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-0">
              {mockData.tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors',
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockData.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', `bg-${stat.color}-100 dark:bg-${stat.color}-900/20`)}>
                    <Icon className={cn('w-6 h-6', `text-${stat.color}-600 dark:text-${stat.color}-400`)} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* Search */}
              <Card>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={isHR ? 'Search candidates, jobs, or skills...' : 'Search jobs, companies, or skills...'}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <button className="btn-secondary">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                </div>
              </Card>

              {/* List */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{mockData.listTitle}</h3>
                <div className="space-y-4">
                  {mockData.items.map((item, index) => (
                    <div key={item.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                            <span className={cn('px-2 py-1 text-xs font-medium rounded-full', getStatusColor(item.status))}>{item.status}</span>
                          </div>
                          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                            <span className="flex items-center"><Building2 className="w-4 h-4 mr-1" />{item.company}</span>
                            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{item.location}</span>
                            <span className="flex items-center"><DollarSign className="w-4 h-4 mr-1" />{item.salary}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.skills.map((skill, i) => (
                              <span key={i} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded-md">{skill}</span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className={cn('text-2xl font-bold', getScoreColor(item.matchScore))}>{item.matchScore}%</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Match Score</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'tools' && !isHR && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* Student Tools */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Search Jobs by Skills</h4>
                  <div className="space-y-3">
                    <textarea value={studentSkills} onChange={(e) => setStudentSkills(e.target.value)} rows={4} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" placeholder="e.g. React, JavaScript, SQL, Python" />
                    <button onClick={runStudentAnalysis} className="btn-primary">Analyze Skills</button>
                  </div>
                </Card>
                <Card>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Upload Resume</h4>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <Upload className="w-6 h-6 text-gray-500 mb-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Click to upload (.pdf, .docx, .txt)</span>
                    <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={onStudentResume} className="hidden" />
                  </label>
                  {studentResumeName && (
                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 flex items-center">
                      <FileText className="w-4 h-4 mr-2" /> {studentResumeName}
                    </div>
                  )}
                </Card>
              </div>

              {studentResult && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Resume Score</h4>
                    <div className="w-full h-56">
                      <ResponsiveContainer>
                        <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ name: 'Score', value: studentResult.matchScore, fill: '#22C55E' }]} startAngle={90} endAngle={-270}>
                          <RadialBar minAngle={15} background clockWise dataKey="value" />
                        </RadialBarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className={cn('mt-2 text-center text-2xl font-bold', getScoreColor(studentResult.matchScore))}>{studentResult.matchScore}%</div>
                    <div className="text-center text-sm text-gray-500">Best Fit: {studentResult.bestRole}</div>
                  </Card>
                  <Card>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Acquired Skills</h4>
                    <div className="w-full h-56">
                      <ResponsiveContainer>
                        <RBChart data={studentAcquiredChart} layout="vertical" margin={{ left: 20 }}>
                          <XAxis type="number" domain={[0, 100]} hide />
                          <YAxis type="category" dataKey="name" width={100} tick={{ fill: '#9CA3AF' }} />
                          <Tooltip />
                          <Bar dataKey="value" fill="#22C55E" radius={[4,4,4,4]} />
                        </RBChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                  <Card>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Missing Skills (Gap to 100%)</h4>
                    <div className="w-full h-56">
                      <ResponsiveContainer>
                        <RBChart data={studentGapsChart} layout="vertical" margin={{ left: 20 }}>
                          <XAxis type="number" domain={[0, 100]} hide />
                          <YAxis type="category" dataKey="name" width={120} tick={{ fill: '#9CA3AF' }} />
                          <Tooltip />
                          <Bar dataKey="value" fill="#F59E0B" radius={[4,4,4,4]} />
                        </RBChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </div>
              )}

              {studentResult && (
                <Card>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">Top Suggested Roles</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {studentResult.roleBreakdown.map((r, i) => (
                      <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 dark:text-white">{r.role}</span>
                          <span className={cn('font-semibold', getScoreColor(r.percent))}>{r.percent}%</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {r.required.map((s, j) => (
                            <span key={j} className={cn('px-2 py-0.5 rounded text-xs', r.have.includes(s) ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400')}>{s}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </motion.div>
          )}

          {activeTab === 'tools' && isHR && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* HR Tools */}
              <Card>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Bulk Upload Fresher Resumes (5–20)</h4>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Upload className="w-6 h-6 text-gray-500 mb-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Select multiple files (.pdf, .docx, .txt)</span>
                  <input type="file" accept=".pdf,.doc,.docx,.txt" multiple onChange={onHrFiles} className="hidden" />
                </label>
                {hrError && <p className="mt-2 text-sm text-red-600">{hrError}</p>}
                {!!hrFiles.length && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Selected: {hrFiles.length} files</p>
                )}
              </Card>

              {hrResults.length > 0 && (
                <Card>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-4">Top 5 Resumes by Score</h5>
                  <div className="space-y-4">
                    {hrResults.map((r, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white flex items-center">
                              <FileText className="w-4 h-4 mr-2" /> {r.name}
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {r.top.map((t, i) => (
                                <span key={i} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded-md">{t.skill} • {t.percent}%</span>
                              ))}
                            </div>
                          </div>
                          <div className={cn('text-2xl font-bold', getScoreColor(r.score))}>{r.score}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {hrAllResults.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-4">Skill Distribution</h5>
                    <div className="w-full h-64">
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie data={hrSkillDistribution} dataKey="value" nameKey="name" outerRadius={90} label>
                            {hrSkillDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                  <div className="lg:col-span-2">
                    <Card>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-4">All Uploaded Resumes</h5>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                          <thead className="text-left text-gray-600 dark:text-gray-300">
                            <tr>
                              <th className="py-2 pr-4">Name</th>
                              <th className="py-2 pr-4">Score</th>
                              <th className="py-2 pr-4">Key Skills</th>
                              <th className="py-2 pr-4">Suggested Role</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-900 dark:text-white">
                            {hrAllResults.map((r, i) => (
                              <tr key={i} className="border-t border-gray-200 dark:border-gray-700">
                                <td className="py-2 pr-4">{r.name}</td>
                                <td className="py-2 pr-4 font-semibold">{r.score}%</td>
                                <td className="py-2 pr-4">
                                  <div className="flex flex-wrap gap-2">
                                    {r.top.map((t, j) => (
                                      <span key={j} className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs">{t.skill}</span>
                                    ))}
                                  </div>
                                </td>
                                <td className="py-2 pr-4">{r.suggested}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'candidates' && isHR && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Candidates</h3>
              <p className="text-gray-500 dark:text-gray-400">Browse and manage applicants for your open roles.</p>
            </motion.div>
          )}

          {activeTab === 'predictions' && !isHR && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Predictions</h3>
              <p className="text-gray-500 dark:text-gray-400">Your complete list of AI job predictions.</p>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Settings</h3>
              <p className="text-gray-500 dark:text-gray-400">Manage your preferences and account settings.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
