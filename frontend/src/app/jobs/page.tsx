"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from 'react-markdown';
import {
    Calendar as CalendarIcon,
    MapPin,
    Briefcase,
    ExternalLink,
    Search,
    Clock,
    ChevronRight,
    Globe,
    ArrowLeft
} from "lucide-react";
import styles from "./page.module.css";
import Calendar from "@/components/Calendar";

// Helper to format date as YYYY-MM-DD
const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};


// Helper to format job type nicely (e.g. "contract" -> "Contract")
const formatJobType = (type: string | null | undefined) => {
    if (!type) return "N/A";
    return type.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};



type Job = {
    id: string;
    title: string;
    company: string;
    location: string;
    job_url: string;
    site: string;
    crawled_date: string;
    description: string;
    job_type: string;
    job_url_direct?: string;
    is_remote?: boolean;
    job_level?: string;
    role?: string;
    job_function?: string;
};

const SUGGESTED_ROLES = [
    "Software Engineer",
    "Data Scientist",
    "AI Engineer",
    "Business Analyst",
    "Data Analyst",
    "Cloud Engineer",
    "Cybersecurity Analyst",
    "Digital Marketing Specialist",
    "Quality Assurance Engineer",
    "Customer Service Representative"
];

const SUGGESTED_CITIES = [
    "Mumbai",
    "Chennai",
    "Hyderabad",
    "Bengaluru",
    "Pune",
    "Kolkata"
];

const JOB_TYPES = [
    "Fulltime",
    "Contract",
    "Internship",
    "Apprentice",
    "Part-time"
];

const JOB_LEVELS = [
    "Internship",
    "Entry level",
    "Associate",
    "Mid-Senior level",
    "Director",
    "Executive"
];

export default function Home() {
    // State
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    // Search State
    const [searchQuery, setSearchQuery] = useState("");
    const [companyQuery, setCompanyQuery] = useState("");
    const [locationQuery, setLocationQuery] = useState("");
    const [jobTypeQuery, setJobTypeQuery] = useState("");
    const [jobLevelQuery, setJobLevelQuery] = useState("");

    // Suggestion Visibility State
    const [showRoleSuggestions, setShowRoleSuggestions] = useState(false);
    const [showCitySuggestions, setShowCitySuggestions] = useState(false);
    const [showJobTypeSuggestions, setShowJobTypeSuggestions] = useState(false);
    const [showJobLevelSuggestions, setShowJobLevelSuggestions] = useState(false);

    // Calendar State
    const [showCal, setShowCal] = useState(false);

    const handleQuickDate = (d: number) => {
        const x = new Date();
        x.setDate(x.getDate() + d);
        setSelectedDate(x);
        fetchJobs(x);
        setShowCal(false);
    };

    // Fetch dates
    useEffect(() => {
        async function fetchDates() {
            const { data } = await supabase.from("jobs").select("crawled_date");
            if (data) {
                setAvailableDates(new Set(data.map((job) => job.crawled_date)));
            }
        }
        fetchDates();
        fetchJobs(new Date());
    }, []);

    const fetchJobs = async (date: Date) => {
        setLoading(true);
        const dateStr = formatDate(date);
        const { data, error } = await supabase
            .from("jobs")
            .select("*")
            .eq("crawled_date", dateStr)
            .order("created_at", { ascending: false });

        if (!error && data) {
            setJobs(data);
            if (data.length > 0) {
                setSelectedJob(data[0]);
            } else {
                setSelectedJob(null);
            }
        } else {
            console.error(error);
            setJobs([]);
            setSelectedJob(null);
        }
        setLoading(false);
    };

    // Filter jobs based on search
    const filteredJobs = jobs.filter(job => {
        const matchesTitle = job.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCompany = job.company.toLowerCase().includes(companyQuery.toLowerCase());
        const matchesLocation = job.location.toLowerCase().includes(locationQuery.toLowerCase());
        const matchesJobType = job.job_type ? job.job_type.toLowerCase().includes(jobTypeQuery.toLowerCase()) : true;

        let matchesJobLevel = true;
        if (jobLevelQuery) {
            const level = job.job_level?.toLowerCase();
            const query = jobLevelQuery.toLowerCase();
            if (!level || level === "not applicable") {
                matchesJobLevel = true; // Always include null or 'not applicable'
            } else {
                matchesJobLevel = level.includes(query);
            }
        }

        return matchesTitle && matchesCompany && matchesLocation && matchesJobType && matchesJobLevel;
    });

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(e.target.value);
        if (!isNaN(newDate.getTime())) {
            setSelectedDate(newDate);
            fetchJobs(newDate);
        }
    };

    return (
        <div className={styles.container}>
            {/* Top Navigation / Search Bar */}
            <header className={styles.header}>
                <div className={styles.headerContent}>


                    {/* Search Inputs */}
                    <div className={styles.searchBar}>
                        {/* Job Search Input */}
                        <div className={styles.searchInputGroup}>
                            <Search className={styles.searchIcon} size={20} />
                            <input
                                type="text"
                                placeholder="Job title"
                                className={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={(e) => {
                                    setShowRoleSuggestions(true);
                                    e.target.select();
                                }}
                                onBlur={() => setTimeout(() => setShowRoleSuggestions(false), 200)}
                            />
                            {showRoleSuggestions && (
                                <div className={styles.suggestionsPopup}>
                                    {SUGGESTED_ROLES.filter(r => {
                                        if (SUGGESTED_ROLES.some(role => role.toLowerCase() === searchQuery.toLowerCase())) {
                                            return true;
                                        }
                                        return r.toLowerCase().includes(searchQuery.toLowerCase());
                                    }).map((role) => (
                                        <div
                                            key={role}
                                            className={styles.suggestionItem}
                                            onMouseDown={() => {
                                                setSearchQuery(role);
                                                setShowRoleSuggestions(false);
                                            }}
                                        >
                                            {role}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className={styles.searchDivider}></div>

                        <div className={styles.searchInputGroup}>
                            <Briefcase className={styles.searchIcon} size={20} />
                            <input
                                type="text"
                                placeholder="Company"
                                className={styles.searchInput}
                                value={companyQuery}
                                onChange={(e) => setCompanyQuery(e.target.value)}
                                onFocus={(e) => e.target.select()}
                            />
                        </div>

                        <div className={styles.searchDivider}></div>

                        {/* Job Type Search Input */}
                        <div className={styles.searchInputGroup}>
                            <Clock className={styles.searchIcon} size={20} />
                            <input
                                type="text"
                                placeholder="Job type"
                                className={styles.searchInput}
                                value={jobTypeQuery}
                                onChange={(e) => setJobTypeQuery(e.target.value)}
                                onFocus={(e) => {
                                    setShowJobTypeSuggestions(true);
                                    e.target.select();
                                }}
                                onBlur={() => setTimeout(() => setShowJobTypeSuggestions(false), 200)}
                            />
                            {showJobTypeSuggestions && (
                                <div className={styles.suggestionsPopup}>
                                    {JOB_TYPES.filter(t => {
                                        // If the current query matches exactly one of the types, show all (don't filter)
                                        // This allows the user to switch easily after selecting one.
                                        if (JOB_TYPES.some(type => type.toLowerCase() === jobTypeQuery.toLowerCase())) {
                                            return true;
                                        }
                                        return t.toLowerCase().includes(jobTypeQuery.toLowerCase());
                                    }).map((type) => (
                                        <div
                                            key={type}
                                            className={styles.suggestionItem}
                                            onMouseDown={() => {
                                                setJobTypeQuery(type);
                                                setShowJobTypeSuggestions(false);
                                            }}
                                        >
                                            {type}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className={styles.searchDivider}></div>

                        {/* Job Level Search Input */}
                        <div className={styles.searchInputGroup}>
                            <Briefcase className={styles.searchIcon} size={20} />
                            <input
                                type="text"
                                placeholder="Experience"
                                className={styles.searchInput}
                                value={jobLevelQuery}
                                onChange={(e) => setJobLevelQuery(e.target.value)}
                                onFocus={(e) => {
                                    setShowJobLevelSuggestions(true);
                                    e.target.select();
                                }}
                                onBlur={() => setTimeout(() => setShowJobLevelSuggestions(false), 200)}
                            />
                            {showJobLevelSuggestions && (
                                <div className={styles.suggestionsPopup}>
                                    {JOB_LEVELS.filter(l => {
                                        if (JOB_LEVELS.some(level => level.toLowerCase() === jobLevelQuery.toLowerCase())) {
                                            return true;
                                        }
                                        return l.toLowerCase().includes(jobLevelQuery.toLowerCase());
                                    }).map((level) => (
                                        <div
                                            key={level}
                                            className={styles.suggestionItem}
                                            onMouseDown={() => {
                                                setJobLevelQuery(level);
                                                setShowJobLevelSuggestions(false);
                                            }}
                                        >
                                            {level}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className={styles.searchDivider}></div>

                        {/* Location Search Input */}
                        <div className={styles.searchInputGroup}>
                            <MapPin className={styles.searchIcon} size={20} />
                            <input
                                type="text"
                                placeholder="City or location"
                                className={styles.searchInput}
                                value={locationQuery}
                                onChange={(e) => setLocationQuery(e.target.value)}
                                onFocus={(e) => {
                                    setShowCitySuggestions(true);
                                    e.target.select();
                                }}
                                onBlur={() => setTimeout(() => setShowCitySuggestions(false), 200)}
                            />
                            {showCitySuggestions && (
                                <div className={styles.suggestionsPopup}>
                                    {SUGGESTED_CITIES.filter(c => {
                                        if (SUGGESTED_CITIES.some(city => city.toLowerCase() === locationQuery.toLowerCase())) {
                                            return true;
                                        }
                                        return c.toLowerCase().includes(locationQuery.toLowerCase());
                                    }).map((city) => (
                                        <div
                                            key={city}
                                            className={styles.suggestionItem}
                                            onMouseDown={() => {
                                                setLocationQuery(city);
                                                setShowCitySuggestions(false);
                                            }}
                                        >
                                            <MapPin size={14} />
                                            {city}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button className={styles.findButton}>
                            Find jobs
                        </button>
                    </div>

                    {/* Date Picker (Simple) */}


                    <div className={styles.premiumCalendar}>
                        <button className={styles.calendarPill} onClick={() => setShowCal(!showCal)}>
                            <CalendarIcon size={18} />
                            {selectedDate.toDateString()}
                        </button>

                        {showCal && (
                            <div className={styles.calendarPopup}>
                                {/* Show selected date as text box at top (read only or strictly display) */}
                                <div className={styles.selectedDateDisplay}>
                                    {formatDate(selectedDate).split('-').reverse().join('/')}
                                </div>

                                <div className={styles.quickDates}>
                                    <button onClick={() => handleQuickDate(0)}>Today</button>
                                    <button onClick={() => handleQuickDate(-1)}>Yesterday</button>
                                    <button onClick={() => handleQuickDate(-2)}>2 Days Ago</button>
                                </div>

                                <Calendar
                                    selectedDate={selectedDate}
                                    onChange={(date) => {
                                        setSelectedDate(date);
                                        fetchJobs(date);
                                    }}
                                    onClose={() => setShowCal(false)}
                                />
                            </div>
                        )}
                    </div>

                </div>
            </header>

            {/* Main Content */}
            <main className={styles.main}>

                {/* Left Column: Job List */}
                <div className={styles.jobList}>
                    <div className={styles.listHeader}>
                        <h2>Jobs for you</h2>
                        <span>{filteredJobs.length} results</span>
                    </div>

                    {loading ? (
                        // Skeleton Loaders
                        [1, 2, 3].map(i => (
                            <div key={i} className={styles.skeletonCard} />
                        ))
                    ) : filteredJobs.length === 0 ? (
                        <div className={styles.emptyState}>
                            No jobs found for this date.
                        </div>
                    ) : (
                        <div className={styles.cardsContainer}>
                            {filteredJobs.map((job) => (
                                <div
                                    key={job.id}
                                    onClick={() => setSelectedJob(job)}
                                    className={`${styles.card} ${selectedJob?.id === job.id ? styles.activeCard : ''}`}
                                >
                                    <div className={styles.cardHeader}>
                                        <h3 className={styles.jobTitle}>
                                            {job.title}
                                        </h3>
                                        {selectedJob?.id === job.id && (
                                            <ChevronRight className={styles.activeIcon} size={20} />
                                        )}
                                    </div>
                                    <p className={styles.companyName}>{job.company}</p>

                                    <div className={styles.tags}>
                                        <span className={styles.tag}>{job.location}</span>
                                        {job.site && (
                                            <span className={styles.tag}>{job.site}</span>
                                        )}
                                    </div>

                                    <div className={styles.postedDate}>
                                        <Clock size={12} />
                                        Posted {job.crawled_date}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Job Details (Sticky) */}
                <div className={`${styles.jobDetails} ${selectedJob ? styles.showOnMobile : ''}`}>
                    {selectedJob ? (
                        <div className={styles.detailsContainer}>
                            {/* Job Header */}
                            <div className={styles.detailsHeader}>
                                {/* Back Button for Mobile */}
                                <div className={styles.backButton} onClick={() => setSelectedJob(null)}>
                                    <ArrowLeft size={16} /> Back to jobs
                                </div>

                                <h1>{selectedJob.title}</h1>
                                <div className={styles.detailsMeta}>
                                    <span className={styles.companyLink}>{selectedJob.company}</span>
                                    <span className={styles.dot}>•</span>
                                    <span>{selectedJob.location}</span>
                                </div>

                                <div className={styles.actionButtons}>
                                    {selectedJob.job_url_direct && (
                                        <a
                                            href={selectedJob.job_url_direct}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.applyButton}
                                            style={{ marginRight: '10px', backgroundColor: '#2563eb' }}
                                        >
                                            Easy Apply
                                            <ExternalLink size={18} />
                                        </a>
                                    )}
                                    <a
                                        href={selectedJob.job_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.applyButton}
                                    >
                                        Apply now
                                        <ExternalLink size={18} />
                                    </a>
                                </div>
                            </div>

                            {/* Job Content Scrollable Area */}
                            <div className={styles.detailsContent}>
                                <div className={styles.detailsSection}>
                                    <h3>Job Details</h3>
                                    <div className={styles.infoGrid}>
                                        <div className={styles.infoBox}>
                                            <span className={styles.infoLabel}>Fetched Site</span>
                                            <span className={styles.infoValue}>
                                                <Globe size={16} />
                                                {selectedJob.site}
                                            </span>
                                        </div>
                                        <div className={styles.infoBox}>
                                            <span className={styles.infoLabel}>Role</span>
                                            <span className={styles.infoValue}>{selectedJob.role || "N/A"}</span>
                                        </div>
                                        <div className={styles.infoBox}>
                                            <span className={styles.infoLabel}>Job Type</span>
                                            <span className={styles.infoValue}>{formatJobType(selectedJob.job_type)}</span>
                                        </div>
                                        <div className={styles.infoBox}>
                                            <span className={styles.infoLabel}>Remote</span>
                                            <span className={styles.infoValue}>{selectedJob.is_remote ? "Yes" : "No"}</span>
                                        </div>
                                        <div className={styles.infoBox} style={{ gridColumn: 'span 2' }}>
                                            <span className={styles.infoLabel}>Experience</span>
                                            <span className={styles.infoValue}>{selectedJob.job_level || "Not specified"}</span>
                                        </div>
                                        <div className={styles.infoBox} style={{ gridColumn: 'span 2' }}>
                                            <span className={styles.infoLabel}>Job Function</span>
                                            <span className={styles.infoValue}>{selectedJob.job_function || "N/A"}</span>
                                        </div>
                                    </div>

                                    <h3>Full Description</h3>
                                    <div className={styles.descriptionText}>
                                        <ReactMarkdown>
                                            {selectedJob.description || "No description available."}
                                        </ReactMarkdown>

                                        <div className={styles.disclaimer}>
                                            Note: This listing was aggregated automatically. Please verify details on the employer's site.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.emptyDetails}>
                            <Briefcase size={64} opacity={0.2} />
                            <p>Select a job to view details</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <span>&copy; {new Date().getFullYear()} Job Cloud. All rights reserved.</span>
                    <div className={styles.footerLinks}>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms & Conditions</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
