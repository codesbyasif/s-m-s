/* ============================================
   STUDENT MANAGEMENT SYSTEM — script.js
   ============================================ */

'use strict';

// ============================================
// DUMMY DATA
// ============================================

const USERS = {
  student: { name: 'Sara Ahmed', email: 'sara.ahmed@edu.com', initials: 'SA', role: 'Student', branch: 'CSE', semester: 5 },
  teacher: { name: 'Prof. Rajan K.', email: 'rajan.k@edu.com', initials: 'RK', role: 'Teacher', branch: 'CSE', semester: null }
};

// Dummy courses data
// API hook: Replace with → GET /api/courses?studentId={id}
const COURSES = [
  { id: 1, name: 'Data Structures & Algorithms', teacher: 'Prof. Rajan K.', branch: 'CSE', semester: 5, progress: 72, emoji: '🌳', color: '#dbeafe', desc: 'Trees, graphs, heaps and advanced algorithmic techniques for efficient data management.' },
  { id: 2, name: 'Mathematics III', teacher: 'Prof. Meera S.', branch: 'CSE', semester: 5, progress: 88, emoji: '📐', color: '#d1fae5', desc: 'Integral transforms, complex analysis, and numerical methods for engineering applications.' },
  { id: 3, name: 'Physics Lab', teacher: 'Dr. Anand V.', branch: 'ECE', semester: 5, progress: 55, emoji: '⚡', color: '#fef3c7', desc: 'Hands-on experiments covering optics, electromagnetics, and semiconductor physics.' },
  { id: 4, name: 'Database Management Systems', teacher: 'Prof. Latha R.', branch: 'CSE', semester: 5, progress: 40, emoji: '🗄️', color: '#ede9fe', desc: 'Relational models, SQL, normalization, transactions, and NoSQL databases.' },
  { id: 5, name: 'Computer Networks', teacher: 'Dr. Kiran M.', branch: 'CSE', semester: 5, progress: 60, emoji: '🌐', color: '#fce7f3', desc: 'OSI model, TCP/IP stack, routing protocols, and network security fundamentals.' },
  { id: 6, name: 'Operating Systems', teacher: 'Prof. Suresh B.', branch: 'CSE', semester: 5, progress: 78, emoji: '💻', color: '#e0f2fe', desc: 'Process management, memory management, scheduling algorithms, and file systems.' }
];

// Dummy tests data (MCQ)
// API hook: Replace with → GET /api/tests?studentId={id}&status=upcoming
const TESTS_LIST = [
  { id: 1, name: 'Data Structures – Unit 2', course: 'Data Structures & Algorithms', questions: 10, duration: 15, date: 'Jun 16, 2025', status: 'upcoming' },
  { id: 2, name: 'Mathematics – Calculus', course: 'Mathematics III', questions: 10, duration: 15, date: 'Jun 18, 2025', status: 'upcoming' },
  { id: 3, name: 'Physics – Optics', course: 'Physics Lab', questions: 10, duration: 15, date: 'Jun 20, 2025', status: 'upcoming' }
];

// MCQ Questions
// API hook: Replace with → GET /api/tests/{testId}/questions
const MCQ_QUESTIONS = [
  { q: 'What is the time complexity of binary search on a sorted array?', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], answer: 1 },
  { q: 'Which data structure uses LIFO (Last In, First Out) order?', options: ['Queue', 'Stack', 'Linked List', 'Tree'], answer: 1 },
  { q: 'What is the height of a complete binary tree with n nodes?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], answer: 1 },
  { q: 'Which sorting algorithm has the best average-case complexity?', options: ['Bubble Sort', 'Selection Sort', 'Merge Sort', 'Insertion Sort'], answer: 2 },
  { q: 'In a hash table, what is the worst-case time for search with chaining?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], answer: 2 },
  { q: 'Which graph traversal uses a queue?', options: ['DFS', 'BFS', 'Dijkstra', 'Prim\'s'], answer: 1 },
  { q: 'What does AVL tree maintain?', options: ['Sorted order', 'Height balance', 'Max-heap property', 'Min-heap property'], answer: 1 },
  { q: 'Which data structure is best for implementing priority queues?', options: ['Array', 'Linked List', 'Heap', 'Stack'], answer: 2 },
  { q: 'What is the space complexity of merge sort?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], answer: 2 },
  { q: 'Which algorithm finds shortest path in a weighted graph?', options: ['BFS', 'DFS', 'Dijkstra', 'Kruskal'], answer: 2 }
];

// Dummy results data
// API hook: Replace with → GET /api/results?studentId={id}
const RESULTS_DATA = [
  { course: 'Data Structures', test: 'Unit 1 MCQ', marks: 85, total: 100, date: 'Jun 5, 2025' },
  { course: 'Mathematics III', test: 'Mid Semester', marks: 72, total: 100, date: 'Jun 2, 2025' },
  { course: 'Physics', test: 'Unit 1 MCQ', marks: 68, total: 100, date: 'May 28, 2025' },
  { course: 'DBMS', test: 'Intro Quiz', marks: 91, total: 100, date: 'May 22, 2025' },
  { course: 'Computer Networks', test: 'Chapter 1', marks: 78, total: 100, date: 'May 18, 2025' },
  { course: 'Operating Systems', test: 'Unit 1', marks: 63, total: 100, date: 'May 12, 2025' },
  { course: 'Data Structures', test: 'Unit 2 MCQ', marks: 88, total: 100, date: 'Apr 28, 2025' },
  { course: 'Mathematics III', test: 'Chapter 2', marks: 74, total: 100, date: 'Apr 20, 2025' }
];

// Dummy students list (teacher view)
// API hook: Replace with → GET /api/students?teacherId={id}
const STUDENTS_DATA = [
  { name: 'Sara Ahmed', initials: 'SA', roll: '21CSE045', branch: 'CSE', sem: 5, attendance: '82%', avg: '78%', status: 'Active', color: 'blue-av' },
  { name: 'Rahul Kumar', initials: 'RK', roll: '21CSE031', branch: 'CSE', sem: 5, attendance: '75%', avg: '65%', status: 'Active', color: 'green-av' },
  { name: 'Priya Mehta', initials: 'PM', roll: '21ECE022', branch: 'ECE', sem: 5, attendance: '91%', avg: '82%', status: 'Active', color: 'amber-av' },
  { name: 'Arjun Joshi', initials: 'AJ', roll: '21CSE067', branch: 'CSE', sem: 5, attendance: '58%', avg: '55%', status: 'At Risk', color: 'purple-av' },
  { name: 'Neha Verma', initials: 'NV', roll: '21CSE089', branch: 'CSE', sem: 5, attendance: '87%', avg: '76%', status: 'Active', color: 'blue-av' },
  { name: 'Karan Singh', initials: 'KS', roll: '21ECE041', branch: 'ECE', sem: 5, attendance: '69%', avg: '61%', status: 'Active', color: 'green-av' }
];

// Teacher tests table
const TEACHER_TESTS_DATA = [
  { name: 'DS Unit 1 MCQ', course: 'Data Structures', questions: 10, duration: '15 min', attempts: 42, avg: '74%', status: 'Published' },
  { name: 'Math Calculus Test', course: 'Mathematics III', questions: 10, duration: '15 min', attempts: 0, avg: '—', status: 'Upcoming' },
  { name: 'DBMS Intro Quiz', course: 'DBMS', questions: 10, duration: '15 min', attempts: 58, avg: '81%', status: 'Completed' },
  { name: 'Networks Ch.1', course: 'Computer Networks', questions: 10, duration: '15 min', attempts: 35, avg: '68%', status: 'Published' },
  { name: 'OS Unit 1', course: 'Operating Systems', questions: 10, duration: '15 min', attempts: 0, avg: '—', status: 'Draft' }
];

// ============================================
// APP STATE
// ============================================

let currentRole = 'student';
let currentSection = 'dashboard';
let testState = {
  active: false,
  currentQ: 0,
  answers: {},
  timerInterval: null,
  timeLeft: 900 // 15 min in seconds
};

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  setHeaderDate();
  renderCourses(COURSES);
  renderResults(RESULTS_DATA);
  renderStudents(STUDENTS_DATA);
  renderTeacherTests(TEACHER_TESTS_DATA);
  renderTestsList();
  renderTeacherCourses();
  closeDropdowns();
});

// ============================================
// LOGIN & AUTH
// ============================================

// API hook: POST /api/auth/login { email, password, role }
// Response: { token, user: { id, name, role, ... } }
// On success: store JWT → localStorage.setItem('token', response.token)
function handleLogin() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    showToast('Please fill in all fields');
    return;
  }

  // Simulate login animation
  const btn = document.querySelector('.btn-login');
  btn.innerHTML = '<span>Signing in…</span>';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<span>Sign In</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    btn.disabled = false;

    applyRole(currentRole);
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    showToast(`Welcome back, ${USERS[currentRole].name}!`);
  }, 1000);
}

function selectRole(role) {
  currentRole = role;
  document.querySelectorAll('.role-btn').forEach(b => b.classList.toggle('active', b.dataset.role === role));
  // Update email hint
  document.getElementById('email').value = role === 'student' ? 'student@edu.com' : 'teacher@edu.com';
}

function applyRole(role) {
  const user = USERS[role];

  // Update nav/sidebar
  document.getElementById('navAvatar').textContent = user.initials;
  document.getElementById('navName').textContent = user.name;
  document.getElementById('sidebarAvatar').textContent = user.initials;
  document.getElementById('sidebarName').textContent = user.name;
  document.getElementById('sidebarRole').textContent = user.role;
  document.getElementById('profileAvatar').textContent = user.initials;
  document.getElementById('profileName').textContent = user.name;
  document.getElementById('profileEmail').textContent = user.email;

  // Show/hide nav sections
  document.getElementById('studentNav').classList.toggle('hidden', role !== 'student');
  document.getElementById('teacherNav').classList.toggle('hidden', role !== 'teacher');

  // Navigate to correct dashboard
  const defaultSection = role === 'student' ? 'dashboard' : 'teacherDashboard';
  if (role === 'student') {
    document.getElementById('studentGreetName').textContent = user.name.split(' ')[0];
  } else {
    document.getElementById('teacherGreetName').textContent = user.name;
  }

  navigateTo(defaultSection);
}

function handleLogout() {
  // API hook: POST /api/auth/logout
  // On success: localStorage.removeItem('token')
  if (!confirm('Are you sure you want to sign out?')) return;
  document.getElementById('app').classList.add('hidden');
  document.getElementById('loginPage').classList.remove('hidden');

  // Reset test state
  stopTimer();
  testState = { active: false, currentQ: 0, answers: {}, timerInterval: null, timeLeft: 900 };
  showSection('tests');
  document.getElementById('testList').classList.remove('hidden');
  document.getElementById('testInterface').classList.add('hidden');

  showToast('Signed out successfully');
}

// ============================================
// NAVIGATION
// ============================================

function navigateTo(section) {
  // Close dropdowns
  closeDropdowns();

  // Hide all sections
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

  // Show target section
  const target = document.getElementById(section);
  if (target) {
    target.classList.add('active');
    currentSection = section;
  }

  // Update active nav item
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.section === section);
  });

  // Close sidebar on mobile
  if (window.innerWidth <= 768) {
    closeSidebar();
  }
}

function showSection(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

// ============================================
// SIDEBAR
// ============================================

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const isOpen = sidebar.classList.contains('open');
  if (isOpen) {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  } else {
    sidebar.classList.add('open');
    overlay.classList.add('open');
  }
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}

// ============================================
// PASSWORD TOGGLE
// ============================================

function togglePassword() {
  const input = document.getElementById('password');
  const isText = input.type === 'text';
  input.type = isText ? 'password' : 'text';
  document.getElementById('eyeIcon').innerHTML = isText
    ? '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>'
    : '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>';
}

// ============================================
// DROPDOWNS
// ============================================

function toggleNotif() {
  const dd = document.getElementById('notifDropdown');
  const pm = document.getElementById('profileMenu');
  pm.classList.add('hidden');
  dd.classList.toggle('hidden');
}

function toggleProfileMenu() {
  const pm = document.getElementById('profileMenu');
  const dd = document.getElementById('notifDropdown');
  dd.classList.add('hidden');
  pm.classList.toggle('hidden');
}

function closeDropdowns() {
  document.getElementById('notifDropdown')?.classList.add('hidden');
  document.getElementById('profileMenu')?.classList.add('hidden');
}

document.addEventListener('click', e => {
  const notifWrap = document.querySelector('.notif-wrap');
  const profileWrap = document.querySelector('.profile-wrap');
  if (notifWrap && !notifWrap.contains(e.target)) {
    document.getElementById('notifDropdown')?.classList.add('hidden');
  }
  if (profileWrap && !profileWrap.contains(e.target)) {
    document.getElementById('profileMenu')?.classList.add('hidden');
  }
});

// ============================================
// SEARCH
// ============================================

function handleSearch(val) {
  // Global search — filter courses as a demo
  if (currentSection === 'courses') {
    filterCourses(val);
  }
}

// ============================================
// COURSES RENDER
// ============================================

// API hook: GET /api/courses?studentId={id}&branch={branch}&semester={sem}
function renderCourses(courses) {
  const grid = document.getElementById('coursesGrid');
  if (!grid) return;
  grid.innerHTML = courses.map(c => `
    <div class="course-card" data-branch="${c.branch}" data-sem="${c.semester}">
      <div class="course-img" style="background:${c.color}">${c.emoji}</div>
      <div class="course-body">
        <h4>${c.name}</h4>
        <p class="course-teacher">👤 ${c.teacher}</p>
        <p class="course-desc">${c.desc}</p>
      </div>
      <div class="course-footer">
        <div class="course-progress-wrap">
          <div class="progress-bar"><div class="progress-fill" style="width:${c.progress}%"></div></div>
          <span>${c.progress}%</span>
        </div>
        <button class="view-btn" onclick="showToast('Resources for ${c.name} loading soon!')">View Resources</button>
      </div>
    </div>
  `).join('');
}

function renderTeacherCourses() {
  const grid = document.getElementById('teacherCoursesGrid');
  if (!grid) return;
  grid.innerHTML = COURSES.map(c => `
    <div class="course-card">
      <div class="course-img" style="background:${c.color}">${c.emoji}</div>
      <div class="course-body">
        <h4>${c.name}</h4>
        <p class="course-teacher">👥 ${Math.floor(Math.random()*20)+30} students</p>
        <p class="course-desc">${c.desc}</p>
      </div>
      <div class="course-footer">
        <span class="badge blue">Active</span>
        <button class="view-btn" onclick="showToast('Course editor coming soon!')">Edit Course</button>
      </div>
    </div>
  `).join('');
}

function filterCourses(query) {
  const filtered = COURSES.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.teacher.toLowerCase().includes(query.toLowerCase())
  );
  renderCourses(filtered);
}

function filterByBranch(branch) {
  const filtered = branch ? COURSES.filter(c => c.branch === branch) : COURSES;
  renderCourses(filtered);
}

function filterBySem(sem) {
  const filtered = sem ? COURSES.filter(c => c.semester === parseInt(sem)) : COURSES;
  renderCourses(filtered);
}

// ============================================
// TESTS
// ============================================

function renderTestsList() {
  const grid = document.getElementById('testsGrid');
  if (!grid) return;
  grid.innerHTML = TESTS_LIST.map(t => `
    <div class="test-card">
      <div class="test-card-header">
        <div>
          <h4>${t.name}</h4>
          <p class="meta">${t.course}</p>
        </div>
        <span class="badge amber">Upcoming</span>
      </div>
      <div class="test-meta-row">
        <div class="test-meta-item"><span>Questions</span><span>${t.questions}</span></div>
        <div class="test-meta-item"><span>Duration</span><span>${t.duration} min</span></div>
        <div class="test-meta-item"><span>Date</span><span>${t.date}</span></div>
      </div>
      <button class="btn-primary" onclick="startTest(${t.id}, '${t.name}', ${t.duration})">Start Test →</button>
    </div>
  `).join('');
}

// API hook: POST /api/tests/{testId}/start — returns question set with token
function startTest(id, name, duration) {
  testState.currentQ = 0;
  testState.answers = {};
  testState.timeLeft = duration * 60;

  document.getElementById('testList').classList.add('hidden');
  document.getElementById('testInterface').classList.remove('hidden');
  document.getElementById('testTitle').textContent = name;
  document.getElementById('testSubInfo').textContent = `${MCQ_QUESTIONS.length} Questions · MCQ`;

  renderQuestionNav();
  renderQuestion(0);
  startTimer();
}

function renderQuestionNav() {
  const nav = document.getElementById('questionNav');
  nav.innerHTML = MCQ_QUESTIONS.map((_, i) => `
    <button class="q-nav-btn ${i === testState.currentQ ? 'active' : ''} ${testState.answers[i] !== undefined ? 'answered' : ''}"
      onclick="jumpToQuestion(${i})">${i + 1}</button>
  `).join('');
}

function renderQuestion(idx) {
  const q = MCQ_QUESTIONS[idx];
  document.getElementById('qNumber').textContent = `Question ${idx + 1} of ${MCQ_QUESTIONS.length}`;
  document.getElementById('qText').textContent = q.q;

  const letters = ['A', 'B', 'C', 'D'];
  document.getElementById('optionsList').innerHTML = q.options.map((opt, i) => `
    <button class="option-btn ${testState.answers[idx] === i ? 'selected' : ''}" onclick="selectOption(${idx}, ${i})">
      <span class="option-letter">${letters[i]}</span>
      <span>${opt}</span>
    </button>
  `).join('');

  // Update Next/Submit button
  const btn = document.getElementById('nextSubmitBtn');
  if (idx === MCQ_QUESTIONS.length - 1) {
    btn.textContent = 'Submit Test';
    btn.style.background = '#16a34a';
  } else {
    btn.textContent = 'Next →';
    btn.style.background = '';
  }
}

function selectOption(qIdx, optIdx) {
  testState.answers[qIdx] = optIdx;
  renderQuestion(qIdx);
  renderQuestionNav();
}

function jumpToQuestion(idx) {
  testState.currentQ = idx;
  renderQuestion(idx);
  renderQuestionNav();
}

function prevQuestion() {
  if (testState.currentQ > 0) {
    testState.currentQ--;
    renderQuestion(testState.currentQ);
    renderQuestionNav();
  }
}

function nextOrSubmit() {
  if (testState.currentQ === MCQ_QUESTIONS.length - 1) {
    submitTest();
  } else {
    testState.currentQ++;
    renderQuestion(testState.currentQ);
    renderQuestionNav();
  }
}

// ============================================
// TIMER
// ============================================

function startTimer() {
  stopTimer();
  updateTimerDisplay();
  testState.timerInterval = setInterval(() => {
    testState.timeLeft--;
    updateTimerDisplay();
    if (testState.timeLeft <= 0) {
      stopTimer();
      submitTest(true);
    }
    // Change color when < 3 min
    if (testState.timeLeft < 180) {
      document.querySelector('.timer-box').style.borderColor = '#ef4444';
      document.getElementById('timerDisplay').style.color = '#ef4444';
    }
  }, 1000);
}

function stopTimer() {
  if (testState.timerInterval) {
    clearInterval(testState.timerInterval);
    testState.timerInterval = null;
  }
}

function updateTimerDisplay() {
  const m = Math.floor(testState.timeLeft / 60).toString().padStart(2, '0');
  const s = (testState.timeLeft % 60).toString().padStart(2, '0');
  const display = document.getElementById('timerDisplay');
  if (display) display.textContent = `${m}:${s}`;
}

// ============================================
// SUBMIT TEST & RESULT MODAL
// ============================================

// API hook: POST /api/tests/{testId}/submit { answers: { 0: 2, 1: 1, ... } }
// Response: { score, correct, wrong, skipped, percentage }
function submitTest(timeout = false) {
  stopTimer();

  let correct = 0, wrong = 0, skipped = 0;

  MCQ_QUESTIONS.forEach((q, i) => {
    if (testState.answers[i] === undefined) {
      skipped++;
    } else if (testState.answers[i] === q.answer) {
      correct++;
    } else {
      wrong++;
    }
  });

  const total = MCQ_QUESTIONS.length;
  const pct = Math.round((correct / total) * 100);

  // Show result modal
  document.getElementById('modalIcon').textContent = pct >= 60 ? '🎉' : '📝';
  document.getElementById('modalTitle').textContent = timeout ? 'Time\'s Up!' : 'Test Submitted!';
  document.getElementById('modalSubtitle').textContent = `Here's how you performed`;
  document.getElementById('modalCorrect').textContent = correct;
  document.getElementById('modalWrong').textContent = wrong;
  document.getElementById('modalSkipped').textContent = skipped;
  document.getElementById('modalPct').textContent = `${pct}%`;

  // Animate ring
  setTimeout(() => {
    document.getElementById('scoreRingFill').setAttribute('stroke-dasharray', `${pct}, 100`);
    document.getElementById('scoreRingFill').style.stroke = pct >= 75 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444';
  }, 100);

  document.getElementById('resultModal').classList.remove('hidden');
}

function closeResultModal() {
  document.getElementById('resultModal').classList.add('hidden');
  document.getElementById('testList').classList.remove('hidden');
  document.getElementById('testInterface').classList.add('hidden');
  testState = { active: false, currentQ: 0, answers: {}, timerInterval: null, timeLeft: 900 };
}

// ============================================
// RESULTS TABLE
// ============================================

// API hook: GET /api/results?studentId={id}&course={course}
function renderResults(data) {
  const body = document.getElementById('resultsBody');
  if (!body) return;

  body.innerHTML = data.map(r => {
    const pct = Math.round((r.marks / r.total) * 100);
    let grade, badgeClass;
    if (pct >= 90) { grade = 'A+'; badgeClass = 'green'; }
    else if (pct >= 80) { grade = 'A'; badgeClass = 'green'; }
    else if (pct >= 70) { grade = 'B'; badgeClass = 'blue'; }
    else if (pct >= 60) { grade = 'C'; badgeClass = 'amber'; }
    else { grade = 'F'; badgeClass = 'red'; }

    const status = pct >= 50 ? 'Pass' : 'Fail';
    const statusClass = pct >= 50 ? 'green' : 'red';

    return `<tr>
      <td>${r.course}</td>
      <td>${r.test}</td>
      <td class="score-val">${r.marks}</td>
      <td>${r.total}</td>
      <td><div class="progress-bar" style="width:80px"><div class="progress-fill" style="width:${pct}%"></div></div></td>
      <td><span class="badge ${statusClass}">${status}</span></td>
      <td>${r.date}</td>
    </tr>`;
  }).join('');
}

function filterResults(course) {
  // API hook: GET /api/results?studentId={id}&course={course}
  const filtered = course ? RESULTS_DATA.filter(r => r.course === course) : RESULTS_DATA;
  renderResults(filtered);
}

// ============================================
// STUDENTS TABLE (Teacher)
// ============================================

// API hook: GET /api/students?teacherId={id}
function renderStudents(data) {
  const body = document.getElementById('studentsBody');
  if (!body) return;

  body.innerHTML = data.map(s => `
    <tr>
      <td><div class="student-cell"><div class="mini-avatar ${s.color}">${s.initials}</div>${s.name}</div></td>
      <td>${s.roll}</td>
      <td>${s.branch}</td>
      <td>Sem ${s.sem}</td>
      <td>${s.attendance}</td>
      <td>${s.avg}</td>
      <td><span class="badge ${s.status === 'Active' ? 'green' : 'amber'}">${s.status}</span></td>
    </tr>
  `).join('');
}

// ============================================
// TEACHER TESTS TABLE
// ============================================

function renderTeacherTests(data) {
  const body = document.getElementById('teacherTestsBody');
  if (!body) return;

  body.innerHTML = data.map(t => {
    const statusMap = { Published: 'blue', Upcoming: 'amber', Completed: 'green', Draft: '' };
    const badgeClass = statusMap[t.status] || 'amber';
    return `<tr>
      <td>${t.name}</td>
      <td>${t.course}</td>
      <td>${t.questions}</td>
      <td>${t.duration}</td>
      <td>${t.attempts}</td>
      <td>${t.avg}</td>
      <td><span class="badge ${badgeClass}">${t.status}</span></td>
    </tr>`;
  }).join('');
}

// ============================================
// PROFILE
// ============================================

function showEditProfile() {
  const card = document.getElementById('editProfileCard');
  card.classList.remove('hidden');
  card.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function hideEditProfile() {
  document.getElementById('editProfileCard').classList.add('hidden');
}

// API hook: PUT /api/profile/{userId} { name, email, phone, ... }
// Headers: { Authorization: Bearer {JWT} }
function saveProfile() {
  const name = document.getElementById('editName').value;
  const email = document.getElementById('editEmail').value;
  const phone = document.getElementById('editPhone').value;

  // Update displayed values
  document.getElementById('profileName').textContent = name;
  document.getElementById('profileEmail').textContent = email;
  document.getElementById('profilePhone').textContent = phone;
  document.getElementById('profileAvatar').textContent = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  hideEditProfile();
  showToast('Profile updated successfully!');
}

// ============================================
// UTILITIES
// ============================================

function setHeaderDate() {
  const el = document.getElementById('headerDate');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

let toastTimeout;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => t.classList.add('hidden'), 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  // Escape: close modals/dropdowns
  if (e.key === 'Escape') {
    closeDropdowns();
    document.getElementById('resultModal')?.classList.add('hidden');
    closeSidebar();
  }
  // Ctrl/Cmd + K: focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('globalSearch')?.focus();
  }
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    closeSidebar();
  }
});