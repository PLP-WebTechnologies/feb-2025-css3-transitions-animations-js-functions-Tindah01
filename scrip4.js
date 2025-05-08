document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeToggle = document.getElementById('themeToggle');
    const exploreBtn = document.getElementById('exploreBtn');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const eventForm = document.getElementById('eventForm');
    const messageForm = document.getElementById('messageForm');
    const eventsList = document.querySelector('.events-list');
    
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    updateThemeIcon();
    
    // Theme Toggle
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        updateThemeIcon();
    });
    
    function updateThemeIcon() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Add active class to clicked nav item
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Explore button animation
    exploreBtn.addEventListener('click', function() {
        this.classList.remove('pulse');
        this.textContent = 'Welcome!';
        
        setTimeout(() => {
            this.textContent = 'Explore Our School';
            this.classList.add('pulse');
        }, 2000);
        
        // Scroll to about section
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // View more photos button
    viewMoreBtn.addEventListener('click', function() {
        this.textContent = 'Loading...';
        
        // Simulate loading more photos
        setTimeout(() => {
            // In a real app, you would fetch more photos here
            this.textContent = 'No More Photos Available';
            this.disabled = true;
        }, 1500);
    });
    
    // Load events from localStorage
    function loadEvents() {
        const savedEvents = JSON.parse(localStorage.getItem('schoolEvents')) || [];
        eventsList.innerHTML = '';
        
        if (savedEvents.length === 0) {
            eventsList.innerHTML = '<p class="no-events">No upcoming events. Add one below!</p>';
            return;
        }
        
        savedEvents.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <h3>${event.title}</h3>
                <span class="event-date">${formatDate(event.date)}</span>
                <p>${event.description}</p>
                <button class="delete-event" data-id="${event.id}">Delete</button>
            `;
            eventsList.appendChild(eventCard);
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-event').forEach(button => {
            button.addEventListener('click', function() {
                const eventId = this.getAttribute('data-id');
                deleteEvent(eventId);
            });
        });
    }
    
    // Format date for display
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    
    // Add new event
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('eventTitle').value;
        const date = document.getElementById('eventDate').value;
        const description = document.getElementById('eventDescription').value;
        
        if (!title || !date || !description) return;
        
        const newEvent = {
            id: Date.now().toString(),
            title,
            date,
            description
        };
        
        // Get existing events or initialize empty array
        const savedEvents = JSON.parse(localStorage.getItem('schoolEvents')) || [];
        savedEvents.push(newEvent);
        localStorage.setItem('schoolEvents', JSON.stringify(savedEvents));
        
        // Reset form
        this.reset();
        
        // Reload events
        loadEvents();
        
        // Show confirmation
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Event Added!';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
        }, 2000);
    });
    
    // Delete event
    function deleteEvent(eventId) {
        const savedEvents = JSON.parse(localStorage.getItem('schoolEvents')) || [];
        const updatedEvents = savedEvents.filter(event => event.id !== eventId);
        localStorage.setItem('schoolEvents', JSON.stringify(updatedEvents));
        loadEvents();
    }
    
    // Contact form submission
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) return;
        
        // Save message to localStorage (in a real app, you would send to a server)
        const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        messages.push({ name, email, message, date: new Date().toISOString() });
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        // Reset form
        this.reset();
        
        // Show confirmation
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent!';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
        }, 2000);
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.slide-in').forEach(element => {
        observer.observe(element);
    });
    
    // Initialize
    loadEvents();
    
    // Set current year in footer
    document.querySelector('footer p').innerHTML = `&copy; ${new Date().getFullYear()} Greenwood High School. All rights reserved.`;
});

// Student Portal System
const loginForm = document.getElementById('loginForm');
const portalContent = document.getElementById('portalContent');
const logoutBtn = document.getElementById('logoutBtn');
const studentName = document.getElementById('studentName');
const studentGrade = document.getElementById('studentGrade');
const studentHomeroom = document.getElementById('studentHomeroom');
const studentGPA = document.getElementById('studentGPA');

// Sample student data (in real app, this would come from a server)
const students = {
    '1001': { password: 'student123', name: 'Alex Johnson', grade: '11', homeroom: 'Room 204', gpa: '3.8' },
    '1002': { password: 'password456', name: 'Maria Garcia', grade: '10', homeroom: 'Room 112', gpa: '3.9' },
    '1003': { password: 'greenwood', name: 'Sam Wilson', grade: '12', homeroom: 'Room 305', gpa: '4.0' }
};

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const studentId = document.getElementById('studentId').value;
    const password = document.getElementById('password').value;
    
    if (students[studentId] && students[studentId].password === password) {
        // Successful login
        loginForm.style.display = 'none';
        portalContent.style.display = 'block';
        
        // Display student info
        const student = students[studentId];
        studentName.textContent = student.name;
        studentGrade.textContent = student.grade;
        studentHomeroom.textContent = student.homeroom;
        studentGPA.textContent = student.gpa;
        
        // Store login state
        localStorage.setItem('studentLoggedIn', 'true');
        localStorage.setItem('studentId', studentId);
    } else {
        alert('Invalid student ID or password');
    }
});

logoutBtn.addEventListener('click', function() {
    loginForm.style.display = 'block';
    portalContent.style.display = 'none';
    loginForm.reset();
    localStorage.removeItem('studentLoggedIn');
    localStorage.removeItem('studentId');
});

// Check if student is already logged in
if (localStorage.getItem('studentLoggedIn') {
    const studentId = localStorage.getItem('studentId');
    document.getElementById('studentId').value = studentId;
    document.getElementById('password').focus();
}

// Course Catalog System
const courses = [
    { id: 'MATH101', title: 'Algebra I', description: 'Fundamental concepts of algebra', department: 'math', gradeLevel: '9', credits: 1 },
    { id: 'MATH201', title: 'Geometry', description: 'Geometric concepts and proofs', department: 'math', gradeLevel: '10', credits: 1 },
    { id: 'SCI301', title: 'Biology', description: 'Study of living organisms', department: 'science', gradeLevel: '9', credits: 1 },
    { id: 'SCI401', title: 'Chemistry', description: 'Introduction to chemical principles', department: 'science', gradeLevel: '10', credits: 1 },
    { id: 'ENG101', title: 'English Literature', description: 'Classic and contemporary literature', department: 'english', gradeLevel: '9', credits: 1 },
    { id: 'HIST201', title: 'World History', description: 'Survey of world civilizations', department: 'history', gradeLevel: '10', credits: 1 },
    { id: 'ART101', title: 'Visual Arts', description: 'Fundamentals of drawing and painting', department: 'arts', gradeLevel: '9', credits: 0.5 },
    { id: 'MATH301', title: 'Algebra II', description: 'Advanced algebraic concepts', department: 'math', gradeLevel: '11', credits: 1 },
    { id: 'SCI501', title: 'Physics', description: 'Principles of motion and energy', department: 'science', gradeLevel: '11', credits: 1 },
    { id: 'ENG201', title: 'American Literature', description: 'Survey of American literary works', department: 'english', gradeLevel: '11', credits: 1 },
    { id: 'HIST301', title: 'U.S. History', description: 'American history survey', department: 'history', gradeLevel: '11', credits: 1 },
    { id: 'ART201', title: 'Digital Arts', description: 'Introduction to digital media', department: 'arts', gradeLevel: '10', credits: 0.5 }
];

function renderCourses(department = 'all', gradeLevel = 'all') {
    const courseGrid = document.getElementById('courseGrid');
    courseGrid.innerHTML = '';
    
    const filteredCourses = courses.filter(course => {
        return (department === 'all' || course.department === department) && 
               (gradeLevel === 'all' || course.gradeLevel === gradeLevel);
    });
    
    if (filteredCourses.length === 0) {
        courseGrid.innerHTML = '<p class="no-courses">No courses match your filters.</p>';
        return;
    }
    
    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <h3>${course.title}</h3>
            <div class="course-meta">
                <span>Grade ${course.gradeLevel}</span>
                <span>${course.credits} credit${course.credits !== 1 ? 's' : ''}</span>
            </div>
            <p>${course.description}</p>
            <span class="course-department">${course.department.toUpperCase()}</span>
        `;
        courseGrid.appendChild(courseCard);
    });
}

document.getElementById('departmentFilter').addEventListener('change', function() {
    const department = this.value;
    const gradeLevel = document.getElementById('gradeLevelFilter').value;
    renderCourses(department, gradeLevel);
});

document.getElementById('gradeLevelFilter').addEventListener('change', function() {
    const gradeLevel = this.value;
    const department = document.getElementById('departmentFilter').value;
    renderCourses(department, gradeLevel);
});

// Initialize course catalog
renderCourses();

// Calendar System
let currentDate = new Date();

function renderCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';
    
    // Set month header
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('currentMonth').textContent = 
        `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    
    // Get first day of month and total days
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Add day headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    // Add empty cells for days before the first day
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        const dateElement = document.createElement('div');
        dateElement.className = 'calendar-date';
        dateElement.textContent = day;
        dayElement.appendChild(dateElement);
        
        // Add events to calendar (in real app, these would come from a database)
        const events = getEventsForDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'calendar-event';
            eventElement.textContent = event.title;
            eventElement.title = event.description;
            dayElement.appendChild(eventElement);
        });
        
        calendarGrid.appendChild(dayElement);
    }
}

function getEventsForDate(date) {
    // In a real app, this would filter events from your database
    // Here we'll just return some sample events on specific dates
    const events = JSON.parse(localStorage.getItem('schoolEvents')) || [];
    const dateStr = date.toISOString().split('T')[0];
    
    return events.filter(event => {
        return event.date === dateStr;
    });
}

document.getElementById('prevMonth').addEventListener('click', function() {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    renderCalendar();
});

document.getElementById('nextMonth').addEventListener('click', function() {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    renderCalendar();
});

// Initialize calendar
renderCalendar();

// Image Carousel
const carouselImages = [
    { 
        src: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
        caption: 'Modern Classrooms with Smart Boards'
    },
    { 
        src: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1490&q=80',
        caption: 'State Championship Basketball Team'
    },
    { 
        src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1422&q=80',
        caption: 'Fully Equipped Science Laboratory'
    },
    { 
        src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        caption: 'Greenwood High School Campus'
    }
];

function initCarousel() {
    const gallerySection = document.querySelector('.gallery-grid');
    gallerySection.innerHTML = `
        <div class="gallery-carousel">
            <div class="carousel-slides">
                ${carouselImages.map((image, index) => `
                    <div class="carousel-slide">
                        <img src="${image.src}" alt="School image ${index + 1}">
                        <div class="carousel-caption">${image.caption}</div>
                    </div>
                `).join('')}
            </div>
            <div class="carousel-controls">
                <button class="carousel-btn prev-btn"><i class="fas fa-chevron-left"></i></button>
                <button class="carousel-btn next-btn"><i class="fas fa-chevron-right"></i></button>
            </div>
            <div class="carousel-indicators">
                ${carouselImages.map((_, index) => `
                    <div class="carousel-indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Carousel functionality
    const slides = document.querySelector('.carousel-slides');
    const slideCount = carouselImages.length;
    let currentSlide = 0;
    
    function goToSlide(index) {
        if (index < 0) index = slideCount - 1;
        if (index >= slideCount) index = 0;
        
        slides.style.transform = `translateX(-${index * 100}%)`;
        currentSlide = index;
        
        // Update indicators
        document.querySelectorAll('.carousel-indicator').forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentSlide);
        });
    }
    
    document.querySelector('.prev-btn').addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });
    
    document.querySelector('.next-btn').addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });
    
    // Indicator clicks
    document.querySelectorAll('.carousel-indicator').forEach(indicator => {
        indicator.addEventListener('click', () => {
            goToSlide(parseInt(indicator.getAttribute('data-index')));
        });
    });
    
    // Auto-advance every 5 seconds
    setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
}

// Replace gallery with carousel
initCarousel();

// View Schedule Button
document.getElementById('viewSchedule').addEventListener('click', function() {
    // Scroll to courses section
    document.querySelector('#courses').scrollIntoView({
        behavior: 'smooth'
    });
});

// View Grades Button
document.getElementById('viewGrades').addEventListener('click', function() {
    alert('Grade portal would open here in a real application');
});