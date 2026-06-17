// (Array of Objects) -  8 Jobs Card
let jobsData = [
    {
        id: 1,
        companyName: "Mobile First Corp",
        position: "React Native Developer",
        location: "Remote",
        type: "Full-time",
        salary: "$130,000 - $175,000",
        status: "NOT APPLIED",
        description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide."
    },
    {
        id: 2,
        companyName: "WebFlow Agency",
        position: "Web Designer & Developer",
        location: "Los Angeles, CA",
        type: "Part-time",
        salary: "$90,000 - $120,000",
        status: "NOT APPLIED",
        description: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends."
    },
    {
        id: 3,
        companyName: "DataViz Solutions",
        position: "Data Visualization Specialist",
        location: "Boston, MA",
        type: "Full-time",
        salary: "$125,000 - $165,000",
        status: "NOT APPLIED",
        description: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking."
    },
    {
        id: 4,
        companyName: "CloudFirst Inc",
        position: "Backend Developer",
        location: "Seattle, WA",
        type: "Full-time",
        salary: "$140,000 - $190,000",
        status: "NOT APPLIED",
        description: "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure."
    },
    {
        id: 5,
        companyName: "Innovation Labs",
        position: "UI/UX Engineer",
        location: "Austin, TX",
        type: "Full-time",
        salary: "$110,000 - $150,000",
        status: "NOT APPLIED",
        description: "Transforming complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking."
    },
    {
        id: 6,
        companyName: "Fintech Solutions",
        position: "Blockchain Developer",
        location: "New York, NY",
        type: "Full-time",
        salary: "$160,000 - $210,000",
        status: "NOT APPLIED",
        description: "Design, develop, and test smart contracts using Solidity and Vyper. Implement secure and scalable blockchain solutions."
    },
    {
        id: 7,
        companyName: "MedTech Innovations",
        position: "Python Data Scientist",
        location: "Chicago, IL",
        type: "Remote",
        salary: "$120,000 - $150,000",
        status: "NOT APPLIED",
        description: "Develop predictive models and analyze large healthcare datasets to improve patient outcomes and operational efficiency."
    },
    {
        id: 8,
        companyName: "AI Research Lab",
        position: "ML Operations Engineer",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$150,000 - $190,000",
        status: "NOT APPLIED",
        description: "Deploy and manage machine learning models in production. Optimize CI/CD pipelines for ML models and monitor their performance."
    }
];

// 
let currentTab = 'all';

// Dashboard Counter Update
function updateDashboardStats() {
    const total = jobsData.length;
    const interviewCount = jobsData.filter(job => job.status === 'Interview').length;
    const rejectedCount = jobsData.filter(job => job.status === 'Rejected').length;

    // Update Top Dashboard
    document.getElementById('total-stat').innerText = total;
    document.getElementById('interview-stat').innerText = interviewCount;
    document.getElementById('rejected-stat').innerText = rejectedCount;

    // Logically counter update
    let currentVisibleCount = 0;
    if (currentTab === 'all') currentVisibleCount = total;
    else if (currentTab === 'interview') currentVisibleCount = interviewCount;
    else if (currentTab === 'rejected') currentVisibleCount = rejectedCount;

    document.getElementById('section-count').innerText = `${currentVisibleCount} jobs`;
}

// UI- rendaring Function
function renderJobs() {
    const container = document.getElementById('job-cards-container');
    container.innerHTML = ''; 

    // filtered by clicked tabs
    let filteredJobs = jobsData;
    if (currentTab === 'interview') {
        filteredJobs = jobsData.filter(job => job.status === 'Interview');
    } else if (currentTab === 'rejected') {
        filteredJobs = jobsData.filter(job => job.status === 'Rejected');
    }

    // No Job Available Card
    if (filteredJobs.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-center bg-gray-50 rounded-xl border border-gray-100">
                <svg class="w-16 h-16 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4m-8 0H4"></path>
                </svg>
                <h3 class="text-lg font-bold text-gray-700">No jobs Available</h3>
                <p class="text-sm text-gray-400 mt-1">Check back soon for new job opportunities</p>
            </div>
        `;
        updateDashboardStats();
        return;
    }

    // 
    filteredJobs.forEach(job => {
        const isInterview = job.status === 'Interview';
        const isRejected = job.status === 'Rejected';

        // Button active - inactive condition
        const interviewBtnClass = isInterview 
            ? "bg-[#16A34A] text-white" 
            : "bg-white text-[#16A34A] border border-green-200 hover:bg-green-50";
        
        const rejectedBtnClass = isRejected 
            ? "bg-[#EF4444] text-white" 
            : "bg-white text-[#EF4444] border border-[#FEE2E2] hover:bg-red-50";

        const cardHTML = `
            <article class="bg-white p-6 rounded-xl shadow relative flex flex-col space-y-1.5 transition duration-200 hover:shadow-md">
                <button onclick="deleteJob(${job.id})" class="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition" title="Delete job">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
                
                <h3 class="text-lg font-bold text-primary-text leading-tight">${job.companyName}</h3>
                <p class="text-sm text-secondary-text pb-1">${job.position}</p>
                <div class="text-xs text-secondary-text leading-tight space-y-0.5">
                    <p>${job.location} • ${job.type} • ${job.salary}</p>
                    <p class="font-semibold ${isInterview ? 'text-green-600' : isRejected ? 'text-red-600' : 'text-gray-500'}">${job.status}</p>
                </div>
                <p class="text-sm text-gray-700 leading-relaxed py-2">${job.description}</p>
                
                <div class="flex items-center space-x-2 pt-2">
                    <button onclick="updateStatus(${job.id}, 'Interview')" class="${interviewBtnClass} text-xs px-5 py-2 rounded-lg font-medium transition">INTERVIEW</button>
                    <button onclick="updateStatus(${job.id}, 'Rejected')" class="${rejectedBtnClass} text-xs px-5 py-2 rounded-lg font-medium transition">REJECTED</button>
                </div>
            </article>
        `;
        container.innerHTML += cardHTML;
    });

    updateDashboardStats();
}

// togole active - inactive conditional status
function updateStatus(id, newStatus) {
    jobsData = jobsData.map(job => {
        if (job.id === id) {
            
            if (job.status === newStatus) {
                return { ...job, status: 'NOT APPLIED' };
            } else {
                return { ...job, status: newStatus };
            }
        }
        return job;
    });

    renderJobs();
}

// delete Function
function deleteJob(id) {
    jobsData = jobsData.filter(job => job.id !== id);
    renderJobs();
}

// ৬. switch tab function
function switchTab(tabName) {
    currentTab = tabName;
    
    const tabs = {
        all: document.getElementById('tab-all'),
        interview: document.getElementById('tab-interview'),
        rejected: document.getElementById('tab-rejected')
    };

    Object.keys(tabs).forEach(key => {
        if (key === tabName) {
            tabs[key].className = "bg-[#3B82F6] text-white text-xs px-5 py-1.5 rounded-md font-semibold transition";
        } else {
            tabs[key].className = "text-secondary-text text-xs px-5 py-1.5 rounded-md hover:bg-gray-100 font-medium border border-gray-200 transition";
        }
    });

    renderJobs();
}


renderJobs();

