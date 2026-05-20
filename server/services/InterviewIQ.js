export const generateResumeAnalysis = async (resumeText) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const text = resumeText.toLowerCase();
    const wordCount = resumeText.split(/\s+/).length;

    // Technical Skills Detection
    const techSkillsMap = {
        'JavaScript': ['javascript', 'js', 'es6', 'es2015'],
        'TypeScript': ['typescript', 'ts'],
        'React': ['react', 'react.js', 'reactjs'],
        'Node.js': ['node', 'node.js', 'nodejs', 'express'],
        'Python': ['python', 'django', 'flask', 'fastapi'],
        'Java': ['java', 'spring', 'spring boot', 'springboot'],
        'MongoDB': ['mongodb', 'mongoose', 'nosql'],
        'SQL': ['sql', 'mysql', 'postgresql', 'postgres', 'oracle'],
        'Docker': ['docker', 'containerization', 'kubernetes', 'k8s'],
        'AWS': ['aws', 'amazon web services', 'ec2', 's3', 'lambda'],
        'Git': ['git', 'github', 'gitlab', 'version control'],
        'REST APIs': ['rest', 'api', 'restful', 'graphql'],
        'HTML/CSS': ['html', 'css', 'sass', 'scss', 'tailwind'],
        'C++': ['c++', 'cpp'],
        'Machine Learning': ['machine learning', 'ml', 'deep learning', 'tensorflow', 'pytorch'],
        'System Design': ['system design', 'architecture', 'scalability', 'distributed'],
        'Data Structures': ['data structures', 'algorithms', 'dsa', 'leetcode'],
        'CI/CD': ['ci/cd', 'jenkins', 'github actions', 'devops'],
        'Redis': ['redis', 'caching'],
        'GraphQL': ['graphql', 'apollo'],
    };

    const detectedSkills = [];
    const missingSkills = [];

    for (const [skill, keywords] of Object.entries(techSkillsMap)) {
        const found = keywords.some(kw => text.includes(kw));
        if (found) {
            detectedSkills.push(skill);
        } else {
            missingSkills.push(skill);
        }
    }

    // Soft Skills Detection
    const softSkillsMap = {
        'Leadership': ['leadership', 'led', 'managed', 'mentored', 'supervised'],
        'Communication': ['communication', 'presented', 'collaborated', 'stakeholders'],
        'Problem Solving': ['problem solving', 'troubleshooting', 'debugging', 'resolved'],
        'Teamwork': ['teamwork', 'team', 'cross-functional', 'collaborated'],
        'Agile': ['agile', 'scrum', 'sprint', 'kanban', 'jira'],
        'Time Management': ['deadline', 'time management', 'prioritized'],
    };

    const detectedSoftSkills = [];
    for (const [skill, keywords] of Object.entries(softSkillsMap)) {
        if (keywords.some(kw => text.includes(kw))) {
            detectedSoftSkills.push(skill);
        }
    }

    // ATS Keywords Analysis
    const atsKeywords = ['experience', 'project', 'developed', 'implemented', 'designed',
        'built', 'created', 'optimized', 'reduced', 'increased', 'improved',
        'managed', 'led', 'responsible', 'achieved', 'delivered'];

    const foundAtsKeywords = atsKeywords.filter(kw => text.includes(kw));
    const missingAtsKeywords = atsKeywords.filter(kw => !text.includes(kw));

    // Score Calculation
    let score = 0;
    score += Math.min(detectedSkills.length * 5, 35);         // Tech skills: max 35
    score += Math.min(detectedSoftSkills.length * 5, 15);      // Soft skills: max 15
    score += Math.min(foundAtsKeywords.length * 2, 20);        // ATS keywords: max 20
    score += wordCount > 200 ? 10 : Math.floor(wordCount / 20); // Content depth: max 10
    score += text.includes('education') ? 5 : 0;               // Education section
    score += text.includes('experience') ? 5 : 0;              // Experience section
    score += (text.includes('project') || text.includes('portfolio')) ? 5 : 0; // Projects
    score += text.includes('@') ? 5 : 0;                       // Contact info
    score = Math.min(score, 100);

    // Role Matching
    const roleScores = {
        'Frontend Developer': ['react', 'html', 'css', 'javascript', 'typescript', 'ui', 'ux'].filter(kw => text.includes(kw)).length,
        'Backend Developer': ['node', 'express', 'api', 'database', 'sql', 'python', 'java', 'spring'].filter(kw => text.includes(kw)).length,
        'Full Stack Developer': ['react', 'node', 'api', 'database', 'javascript', 'frontend', 'backend'].filter(kw => text.includes(kw)).length,
        'DevOps Engineer': ['docker', 'kubernetes', 'ci/cd', 'aws', 'linux', 'jenkins', 'terraform'].filter(kw => text.includes(kw)).length,
        'Data Scientist': ['python', 'machine learning', 'data', 'statistics', 'tensorflow', 'pandas'].filter(kw => text.includes(kw)).length,
    };

    const matchedRoles = Object.entries(roleScores)
        .map(([role, matchCount]) => ({ role, matchScore: Math.min(Math.round((matchCount / 5) * 100), 100) }))
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 3);

    // Improvement Suggestions
    const suggestions = [];
    if (detectedSkills.length < 5) suggestions.push('Add more technical skills to strengthen your profile.');
    if (detectedSoftSkills.length < 2) suggestions.push('Include soft skills like leadership, teamwork, and communication.');
    if (wordCount < 150) suggestions.push('Your resume seems too brief. Aim for at least 300-500 words.');
    if (!text.includes('project')) suggestions.push('Add a "Projects" section to showcase practical experience.');
    if (!text.includes('education')) suggestions.push('Include an "Education" section with your degree details.');
    if (missingAtsKeywords.length > 8) suggestions.push('Use more action verbs like "developed", "implemented", "optimized".');
    if (!text.includes('github') && !text.includes('portfolio')) suggestions.push('Add links to your GitHub or portfolio website.');
    if (score > 70) suggestions.push('Great foundation! Consider tailoring your resume to specific job descriptions.');

    return {
        score,
        technicalSkills: detectedSkills,
        softSkills: detectedSoftSkills,
        missingKeywords: missingSkills.slice(0, 8),
        missingAtsKeywords: missingAtsKeywords.slice(0, 6),
        matchedRoles,
        suggestions,
        stats: {
            wordCount,
            techSkillCount: detectedSkills.length,
            softSkillCount: detectedSoftSkills.length,
            atsScore: Math.round((foundAtsKeywords.length / atsKeywords.length) * 100),
        }
    };
};
