// Student Objects with Methods
const students = {
    john: {
        name: "John Smith",
        rollNumber: "S001",
        age: 15,
        grade: "9th",
        status: "Active",
        marks: {
            math: 85,
            science: 92,
            english: 78,
            history: 88,
            computer: 95
        },
        // Object Method 1: Calculate total marks
        getTotalMarks() {
            return Object.values(this.marks).reduce((total, mark) => total + mark, 0);
        },
        // Object Method 2: Calculate percentage
        getPercentage() {
            const totalSubjects = Object.keys(this.marks).length;
            const totalMarks = this.getTotalMarks();
            return (totalMarks / (totalSubjects * 100)) * 100;
        },
        // Object Method 3: Get grade based on percentage
        getGrade() {
            const percentage = this.getPercentage();
            if (percentage >= 90) return "A+";
            if (percentage >= 80) return "A";
            if (percentage >= 70) return "B";
            if (percentage >= 60) return "C";
            if (percentage >= 50) return "D";
            return "F";
        },
        // Object Method 4: Promote to next grade
        promoteGrade() {
            const currentGrade = parseInt(this.grade);
            if (!isNaN(currentGrade)) {
                this.grade = `${currentGrade + 1}th`;
                return `Promoted to ${this.grade}`;
            }
            return "Cannot promote";
        },
        // Object Method 5: Update attendance status
        updateAttendance(isPresent) {
            this.status = isPresent ? "Present" : "Absent";
            return `Attendance updated: ${this.status}`;
        }
    },
    
    sarah: {
        name: "Sarah Johnson",
        rollNumber: "S002",
        age: 16,
        grade: "10th",
        status: "Active",
        marks: {
            math: 92,
            science: 88,
            english: 95,
            history: 90,
            computer: 94,
            physics: 89
        },
        getTotalMarks() {
            return Object.values(this.marks).reduce((total, mark) => total + mark, 0);
        },
        getPercentage() {
            const totalSubjects = Object.keys(this.marks).length;
            const totalMarks = this.getTotalMarks();
            return (totalMarks / (totalSubjects * 100)) * 100;
        },
        getGrade() {
            const percentage = this.getPercentage();
            if (percentage >= 90) return "A+";
            if (percentage >= 80) return "A";
            if (percentage >= 70) return "B";
            if (percentage >= 60) return "C";
            if (percentage >= 50) return "D";
            return "F";
        },
        promoteGrade() {
            const currentGrade = parseInt(this.grade);
            if (!isNaN(currentGrade)) {
                this.grade = `${currentGrade + 1}th`;
                return `Promoted to ${this.grade}`;
            }
            return "Cannot promote";
        },
        updateAttendance(isPresent) {
            this.status = isPresent ? "Present" : "Absent";
            return `Attendance updated: ${this.status}`;
        }
    },
    
    michael: {
        name: "Michael Brown",
        rollNumber: "S003",
        age: 14,
        grade: "8th",
        status: "Active",
        marks: {
            math: 75,
            science: 82,
            english: 70,
            history: 68,
            computer: 85
        },
        getTotalMarks() {
            return Object.values(this.marks).reduce((total, mark) => total + mark, 0);
        },
        getPercentage() {
            const totalSubjects = Object.keys(this.marks).length;
            const totalMarks = this.getTotalMarks();
            return (totalMarks / (totalSubjects * 100)) * 100;
        },
        getGrade() {
            const percentage = this.getPercentage();
            if (percentage >= 90) return "A+";
            if (percentage >= 80) return "A";
            if (percentage >= 70) return "B";
            if (percentage >= 60) return "C";
            if (percentage >= 50) return "D";
            return "F";
        },
        promoteGrade() {
            const currentGrade = parseInt(this.grade);
            if (!isNaN(currentGrade)) {
                this.grade = `${currentGrade + 1}th`;
                return `Promoted to ${this.grade}`;
            }
            return "Cannot promote";
        },
        updateAttendance(isPresent) {
            this.status = isPresent ? "Present" : "Absent";
            return `Attendance updated: ${this.status}`;
        }
    },
    
    emma: {
        name: "Emma Wilson",
        rollNumber: "S004",
        age: 17,
        grade: "11th",
        status: "Active",
        marks: {
            math: 98,
            science: 95,
            english: 92,
            history: 88,
            computer: 96,
            chemistry: 94
        },
        getTotalMarks() {
            return Object.values(this.marks).reduce((total, mark) => total + mark, 0);
        },
        getPercentage() {
            const totalSubjects = Object.keys(this.marks).length;
            const totalMarks = this.getTotalMarks();
            return (totalMarks / (totalSubjects * 100)) * 100;
        },
        getGrade() {
            const percentage = this.getPercentage();
            if (percentage >= 90) return "A+";
            if (percentage >= 80) return "A";
            if (percentage >= 70) return "B";
            if (percentage >= 60) return "C";
            if (percentage >= 50) return "D";
            return "F";
        },
        promoteGrade() {
            const currentGrade = parseInt(this.grade);
            if (!isNaN(currentGrade)) {
                this.grade = `${currentGrade + 1}th`;
                return `Promoted to ${this.grade}`;
            }
            return "Cannot promote";
        },
        updateAttendance(isPresent) {
            this.status = isPresent ? "Present" : "Absent";
            return `Attendance updated: ${this.status}`;
        }
    },
    
    david: {
        name: "David Lee",
        rollNumber: "S005",
        age: 13,
        grade: "7th",
        status: "Active",
        marks: {
            math: 65,
            science: 72,
            english: 68,
            history: 70,
            computer: 80
        },
        getTotalMarks() {
            return Object.values(this.marks).reduce((total, mark) => total + mark, 0);
        },
        getPercentage() {
            const totalSubjects = Object.keys(this.marks).length;
            const totalMarks = this.getTotalMarks();
            return (totalMarks / (totalSubjects * 100)) * 100;
        },
        getGrade() {
            const percentage = this.getPercentage();
            if (percentage >= 90) return "A+";
            if (percentage >= 80) return "A";
            if (percentage >= 70) return "B";
            if (percentage >= 60) return "C";
            if (percentage >= 50) return "D";
            return "F";
        },
        promoteGrade() {
            const currentGrade = parseInt(this.grade);
            if (!isNaN(currentGrade)) {
                this.grade = `${currentGrade + 1}th`;
                return `Promoted to ${this.grade}`;
            }
            return "Cannot promote";
        },
        updateAttendance(isPresent) {
            this.status = isPresent ? "Present" : "Absent";
            return `Attendance updated: ${this.status}`;
        }
    }
};

// DOM Elements
const studentSelect = document.getElementById('studentSelect');
const actionSelect = document.getElementById('actionSelect');
const executeBtn = document.getElementById('executeAction');
const resetBtn = document.getElementById('resetData');
const infoBtn = document.getElementById('showFullInfo');
const activityLog = document.getElementById('activityLog');

// Student Info Elements
const studentName = document.getElementById('studentName');
const rollNumber = document.getElementById('rollNumber');
const studentGrade = document.getElementById('studentGrade');
const studentAge = document.getElementById('studentAge');
const studentStatus = document.getElementById('studentStatus');
const overallGrade = document.getElementById('overallGrade');
const totalMarks = document.getElementById('totalMarks');
const percentage = document.getElementById('percentage');
const marksGrid = document.getElementById('marksGrid');

// Stats Elements
const totalStudents = document.getElementById('totalStudents');
const avgPercentage = document.getElementById('avgPercentage');
const topPerformer = document.getElementById('topPerformer');
const totalSubjects = document.getElementById('totalSubjects');

// Current student variable
let currentStudent = students.john;

// Initialize the application
function initializeApp() {
    updateStudentDisplay();
    updateClassStats();
    logActivity('Application initialized');
}

// Update student display
function updateStudentDisplay() {
    // Update basic info
    studentName.textContent = currentStudent.name;
    rollNumber.textContent = currentStudent.rollNumber;
    studentGrade.textContent = currentStudent.grade;
    studentAge.textContent = currentStudent.age;
    studentStatus.textContent = currentStudent.status;
    
    // Update marks display
    updateMarksDisplay();
    
    // Calculate and update performance
    const total = currentStudent.getTotalMarks();
    const percent = currentStudent.getPercentage();
    const grade = currentStudent.getGrade();
    
    totalMarks.textContent = total;
    percentage.textContent = percent.toFixed(1) + '%';
    overallGrade.textContent = `Grade: ${grade}`;
}

// Update marks display
function updateMarksDisplay() {
    marksGrid.innerHTML = '';
    
    Object.entries(currentStudent.marks).forEach(([subject, mark]) => {
        const markItem = document.createElement('div');
        markItem.className = 'mark-item';
        
        const subjectGrade = getGradeFromMark(mark);
        
        markItem.innerHTML = `
            <div class="mark-subject">${subject.toUpperCase()}</div>
            <div class="mark-value">${mark}</div>
            <div class="mark-grade">${subjectGrade}</div>
        `;
        
        marksGrid.appendChild(markItem);
    });
}

// Helper function to get grade from mark
function getGradeFromMark(mark) {
    if (mark >= 90) return "A+";
    if (mark >= 80) return "A";
    if (mark >= 70) return "B";
    if (mark >= 60) return "C";
    if (mark >= 50) return "D";
    return "F";
}

// Update class statistics
function updateClassStats() {
    const studentArray = Object.values(students);
    
    // Total students
    totalStudents.textContent = studentArray.length;
    
    // Average percentage
    const totalPercentage = studentArray.reduce((sum, student) => {
        return sum + student.getPercentage();
    }, 0);
    const averagePercentage = totalPercentage / studentArray.length;
    avgPercentage.textContent = averagePercentage.toFixed(1) + '%';
    
    // Top performer
    const topStudent = studentArray.reduce((top, student) => {
        return student.getPercentage() > top.getPercentage() ? student : top;
    }, studentArray[0]);
    topPerformer.textContent = topStudent.name.split(' ')[0];
    
    // Total subjects (unique across all students)
    const allSubjects = new Set();
    studentArray.forEach(student => {
        Object.keys(student.marks).forEach(subject => {
            allSubjects.add(subject);
        });
    });
    totalSubjects.textContent = allSubjects.size;
}

// Log activity
function logActivity(message) {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const logEntry = document.createElement('div');
    logEntry.className = 'activity-entry';
    logEntry.innerHTML = `
        <span class="activity-time">${timeString}</span>
        <span class="activity-message">
            <i class="fas fa-info-circle"></i>
            ${message}
        </span>
    `;
    
    activityLog.appendChild(logEntry);
    activityLog.scrollTop = activityLog.scrollHeight;
}

// Event Listeners
studentSelect.addEventListener('change', function() {
    const selectedStudent = this.value;
    currentStudent = students[selectedStudent];
    updateStudentDisplay();
    logActivity(`Selected student: ${currentStudent.name}`);
});

executeBtn.addEventListener('click', function() {
    const action = actionSelect.value;
    let message = '';
    
    switch(action) {
        case 'calculateGrade':
            const grade = currentStudent.getGrade();
            message = `Calculated grade for ${currentStudent.name}: ${grade}`;
            break;
            
        case 'promoteGrade':
            message = currentStudent.promoteGrade();
            break;
            
        case 'updateAttendance':
            const isPresent = Math.random() > 0.2; // 80% chance of being present
            message = currentStudent.updateAttendance(isPresent);
            break;
            
        case 'addSubject':
            const newSubject = ['Art', 'Music', 'Dance', 'Sports'][Math.floor(Math.random() * 4)];
            const newMark = Math.floor(Math.random() * 31) + 70; // 70-100
            currentStudent.marks[newSubject.toLowerCase()] = newMark;
            message = `Added new subject: ${newSubject} (${newMark} marks)`;
            break;
            
        case 'generateReport':
            const report = `Report for ${currentStudent.name}:
            Roll No: ${currentStudent.rollNumber}
            Grade: ${currentStudent.grade}
            Total Marks: ${currentStudent.getTotalMarks()}
            Percentage: ${currentStudent.getPercentage().toFixed(1)}%
            Final Grade: ${currentStudent.getGrade()}`;
            alert(report);
            message = `Generated report for ${currentStudent.name}`;
            break;
    }
    
    updateStudentDisplay();
    updateClassStats();
    logActivity(message);
});

resetBtn.addEventListener('click', function() {
    // Reset all students to original state
    Object.keys(students).forEach(key => {
        // Reload original data (in a real app, this would reload from database)
        initializeApp();
    });
    logActivity('All data has been reset');
});

infoBtn.addEventListener('click', function() {
    const info = `
    🎓 Student Full Information:
    
    Name: ${currentStudent.name}
    Roll Number: ${currentStudent.rollNumber}
    Age: ${currentStudent.age}
    Grade: ${currentStudent.grade}
    Status: ${currentStudent.status}
    
    📊 Marks Breakdown:
    ${Object.entries(currentStudent.marks).map(([subject, mark]) => 
        `    ${subject.charAt(0).toUpperCase() + subject.slice(1)}: ${mark}/100`
    ).join('\n')}
    
    📈 Performance:
    Total Marks: ${currentStudent.getTotalMarks()}
    Percentage: ${currentStudent.getPercentage().toFixed(1)}%
    Grade: ${currentStudent.getGrade()}
    
    📚 Total Subjects: ${Object.keys(currentStudent.marks).length}
    `;
    
    alert(info);
    logActivity(`Viewed full information for ${currentStudent.name}`);
});

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        resetBtn.click();
    }
    
    if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        infoBtn.click();
    }
    
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        executeBtn.click();
    }
});

// Initialize the application
initializeApp();

// Add some random particles for visual effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${10 + Math.random() * 20}s`;
        particlesContainer.appendChild(particle);
    }
}

// Start particle animation
createParticles();