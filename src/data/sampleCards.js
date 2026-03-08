export const CATEGORY_COLORS = [
  "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300",
  "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
  "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
  "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
  "bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300",
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
  "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300",
  "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300",
  "bg-lime-100 text-lime-700 dark:bg-lime-500/20 dark:text-lime-300",
  "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/20 dark:text-fuchsia-300",
  "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
  "bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300",
];

export const DEFAULT_CATEGORIES = [
  { id: "leadership", label: "Leadership", color: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300" },
  { id: "teamwork", label: "Teamwork", color: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300" },
  { id: "conflict", label: "Conflict Resolution", color: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300" },
  { id: "problem-solving", label: "Problem Solving", color: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300" },
  { id: "communication", label: "Communication", color: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300" },
  { id: "adaptability", label: "Adaptability", color: "bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300" },
  { id: "time-management", label: "Time Management", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300" },
  { id: "failure", label: "Failure & Growth", color: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300" },
];

export const DEFAULT_COMPANIES = [
  { id: "google", label: "Google", color: "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300" },
  { id: "amazon", label: "Amazon", color: "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300" },
  { id: "meta", label: "Meta", color: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300" },
  { id: "apple", label: "Apple", color: "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300" },
  { id: "microsoft", label: "Microsoft", color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300" },
];

export const sampleCards = [
  {
    id: "1",
    question: "Tell me about a time you led a team through a difficult project.",
    answer: `**Situation:** Our team was tasked with migrating a legacy payment system to a new microservices architecture within a tight 3-month deadline. The team of 5 engineers had low morale due to a recently failed sprint.

**Task:** As the tech lead, I needed to rebuild confidence, create a realistic plan, and deliver the migration without disrupting live transactions.

**Action:**
- Held 1-on-1s with each team member to understand their concerns and blockers
- Broke the migration into 2-week milestones with clear ownership
- Set up a daily 15-min sync focused on blockers, not status updates
- Advocated for an extra engineer with management, presenting data on workload
- Created a shared dashboard so everyone could see progress in real time

**Result:** We delivered 1 week early with zero downtime. Team satisfaction scores went from 3.2 to 4.5/5. The approach became our template for future migrations.`,
    category: "leadership",
    company: "amazon",
    starred: true,
  },
  {
    id: "2",
    question: "Describe a situation where you had a conflict with a coworker. How did you handle it?",
    answer: `**Situation:** A senior engineer and I disagreed on the API design for a new feature. They wanted a monolithic endpoint; I preferred a RESTful approach with multiple smaller endpoints.

**Task:** We needed to reach alignment quickly as the frontend team was blocked waiting for the API contract.

**Action:**
- Scheduled a dedicated 30-min discussion (moved it out of the group meeting to reduce pressure)
- Prepared a comparison doc: pros/cons of each approach with performance benchmarks
- Actively listened to their concerns — they were worried about network latency for mobile users
- Proposed a hybrid: RESTful endpoints with an optional batch endpoint for mobile
- Suggested we prototype both approaches over 2 days and let data decide

**Result:** The hybrid approach satisfied both concerns. Response time was 40% faster for mobile. We built a stronger working relationship and started doing architecture reviews together regularly.`,
    category: "conflict",
    company: "google",
    starred: false,
  },
  {
    id: "3",
    question: "Tell me about a time you failed. What did you learn?",
    answer: `**Situation:** I launched a caching feature without adequate load testing. In production, the cache invalidation logic had a race condition that caused stale data to be served to ~2,000 users for about 4 hours.

**Task:** I needed to fix the issue immediately, communicate transparently, and prevent it from happening again.

**Action:**
- Immediately rolled back the feature and sent an incident notification
- Wrote a detailed post-mortem within 24 hours — took full ownership, no finger-pointing
- Identified root cause: I had skipped the load testing step due to time pressure
- Proposed 3 changes: mandatory load test gate in CI/CD, cache invalidation integration tests, and a staged rollout policy
- Shared the post-mortem in our engineering all-hands as a learning opportunity

**Result:** The 3 safeguards were adopted org-wide. We haven't had a similar caching incident since. My manager noted that how I handled the failure actually increased trust in me across the team.`,
    category: "failure",
    company: "meta",
    starred: true,
  },
  {
    id: "4",
    question: "Give an example of when you had to adapt to a major change at work.",
    answer: `**Situation:** Midway through a 6-month project, our company pivoted strategy and our team was reassigned from building a B2B dashboard to an internal developer tools platform — a completely different domain.

**Task:** I needed to quickly ramp up on the new domain, transfer relevant work, and get the new project on track within 2 weeks.

**Action:**
- Documented all reusable components from the old project so nothing was wasted
- Spent the first 3 days doing intensive research: read internal docs, interviewed 8 developers who'd be the users
- Created a prioritized backlog based on developer pain points, not assumptions
- Proposed a phased approach: deliver a CLI tool in month 1 (quick win), then the full platform

**Result:** The CLI tool had 80% adoption within the first month. The phased approach kept stakeholders happy and gave us time to build the platform right. I was recognized in the quarterly review for smooth transition leadership.`,
    category: "adaptability",
    company: "",
    starred: false,
  },
  {
    id: "5",
    question: "Tell me about a time you had to manage multiple competing priorities.",
    answer: `**Situation:** During Q4, I was simultaneously responsible for: a production bug affecting 10% of users, a feature deadline for a key client in 2 weeks, and onboarding a new team member.

**Task:** I needed to resolve all three without dropping the ball on any.

**Action:**
- Triaged ruthlessly: production bug was P0, client feature was P1, onboarding was P2
- Spent the first 2 days focused entirely on the bug — identified a database index issue and deployed a fix
- Created a detailed onboarding guide with self-serve resources so the new hire could be productive independently
- Paired with the new hire for 30 min each morning on the client feature, turning onboarding into mentoring
- Communicated updated timelines to the client PM proactively — they appreciated the transparency

**Result:** Bug was fixed in 2 days (down from estimated 5). Client feature shipped on time. New hire completed their first PR in week 1 and said the onboarding was the best they'd experienced.`,
    category: "time-management",
    company: "amazon",
    starred: true,
  },
  {
    id: "6",
    question: "Describe a time you had to explain a complex technical concept to a non-technical audience.",
    answer: `**Situation:** I needed to get executive buy-in for migrating from a monolith to microservices. The leadership team had no engineering background and previous technical proposals had been rejected for being too jargon-heavy.

**Task:** Present the migration case in a way that resonated with business outcomes, not technical details.

**Action:**
- Reframed the entire pitch around business impact: faster feature delivery, reduced downtime cost, and team scalability
- Used an analogy: "Our current system is like one giant kitchen where all chefs share every tool. Microservices give each chef their own station — they can cook independently without blocking each other."
- Created a simple visual showing: current 2-week deploy cycle vs. projected 2-day cycle
- Prepared a 1-page cost-benefit summary with ROI projections
- Rehearsed with a non-technical friend to catch any remaining jargon

**Result:** Got unanimous approval in the first meeting — a first for engineering proposals. The CFO later said it was the clearest technical proposal she'd reviewed. The migration saved $200K/year in downtime costs.`,
    category: "communication",
    company: "microsoft",
    starred: false,
  },
  {
    id: "7",
    question: "Tell me about a time you helped a struggling team member.",
    answer: `**Situation:** A junior developer on my team was missing deadlines and seemed disengaged during meetings. Other team members were starting to get frustrated.

**Task:** As their mentor, I needed to understand the root cause and help them get back on track without damaging their confidence.

**Action:**
- Had a private, low-pressure 1-on-1 over coffee — asked open-ended questions, mostly listened
- Discovered they were overwhelmed by our codebase and too embarrassed to ask questions
- Set up a structured learning plan: paired programming sessions 3x/week on real tasks
- Broke their assignments into smaller, well-defined tickets with clear acceptance criteria
- Created a "no-shame questions" Slack channel for the whole team (normalized asking for help)

**Result:** Within 6 weeks, they were completing tasks independently and ahead of schedule. They eventually became the go-to person for our testing framework. The Slack channel became one of the most active channels on the team.`,
    category: "teamwork",
    company: "google",
    starred: true,
  },
  {
    id: "8",
    question: "Describe a time you identified and solved a problem before it became critical.",
    answer: `**Situation:** While reviewing our monitoring dashboards, I noticed a gradual increase in API response times — about 50ms/week. No alerts had fired because we were still under threshold, but the trend was concerning.

**Task:** Investigate the root cause and fix it before it impacted users or triggered incidents.

**Action:**
- Ran query analysis on our database — found 3 queries with missing indexes that were doing full table scans on a growing dataset
- Correlated the timing with a recent schema migration that had dropped indexes inadvertently
- Added the missing indexes in a staged rollout (dev → staging → prod over 3 days)
- Set up trend-based alerts (not just threshold) so we'd catch gradual degradation earlier
- Added an index verification step to our migration checklist

**Result:** Response times dropped 60% immediately. Prevented what would have become a P1 incident within 2 weeks based on the growth trend. The trend-based alerting caught 2 more issues in the following quarter before they became problems.`,
    category: "problem-solving",
    company: "",
    starred: false,
  },
];
