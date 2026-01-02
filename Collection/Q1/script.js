
        // Exam Monitoring System using WeakSet
        class ExamMonitoringSystem {
            constructor() {
                // WeakSet to track flagged students (automatically cleaned up)
                this.flaggedStudents = new WeakSet();
                
                // Store active student objects (temporary for UI)
                this.activeStudents = [];
                
                // Monitoring logs
                this.logs = [];
                
                // Performance tracking
                this.performance = {
                    totalCreated: 0,
                    totalFlagged: 0,
                    startTime: Date.now()
                };
                
                this.initializeUI();
                this.createBackgroundParticles();
                this.addLog("System initialized with WeakSet monitoring", "info");
            }

            // Create a new student object
            createStudent(name, roll) {
                const student = {
                    id: Date.now() + Math.random(),
                    name: name || `Student ${this.performance.totalCreated + 1}`,
                    roll: roll || Math.floor(Math.random() * 1000) + 1,
                    createdAt: new Date(),
                    avatarText: name ? name.charAt(0).toUpperCase() : "S"
                };
                
                this.activeStudents.push(student);
                this.performance.totalCreated++;
                
                this.addLog(`Student "${student.name}" (Roll: ${student.roll}) added to exam`, "success");
                this.showNotification(`Student "${student.name}" added to monitoring`, "success");
                
                this.updateUI();
                return student;
            }

            // Flag a student for violation
            flagStudent(student) {
                if (!student || typeof student !== 'object') {
                    this.showNotification("Invalid student object", "error");
                    return false;
                }
                
                this.flaggedStudents.add(student);
                this.performance.totalFlagged++;
                
                this.addLog(`🚨 VIOLATION DETECTED: "${student.name}" flagged for suspicious activity`, "flag");
                this.showNotification(`Student "${student.name}" flagged for violation`, "warning");
                
                this.updateUI();
                return true;
            }

            // Check if a student is flagged
            isStudentFlagged(student) {
                return this.flaggedStudents.has(student);
            }

            // Remove a student (demonstrates WeakSet auto-cleanup)
            removeStudent(student) {
                const index = this.activeStudents.indexOf(student);
                if (index !== -1) {
                    const removedStudent = this.activeStudents.splice(index, 1)[0];
                    
                    // Note: WeakSet automatically removes the reference when object is no longer accessible
                    this.addLog(`Student "${removedStudent.name}" removed from monitoring`, "clear");
                    this.showNotification(`Student "${removedStudent.name}" removed`, "info");
                    
                    this.updateUI();
                    return true;
                }
                return false;
            }

            // Get current statistics
            getStatistics() {
                const flaggedCount = this.activeStudents.filter(s => this.isStudentFlagged(s)).length;
                const cleanCount = this.activeStudents.length - flaggedCount;
                
                return {
                    total: this.activeStudents.length,
                    flagged: flaggedCount,
                    clean: cleanCount,
                    activeObjects: this.activeStudents.length,
                    systemUptime: Math.floor((Date.now() - this.performance.startTime) / 1000)
                };
            }

            // Sort students by name
            sortStudentsByName() {
                this.activeStudents.sort((a, b) => a.name.localeCompare(b.name));
                this.addLog("Students sorted alphabetically", "info");
                this.updateUI();
            }

            // Clear all logs
            clearLogs() {
                this.logs = [];
                this.updateLogsUI();
            }

            // Perform garbage collection simulation
            performCleanup() {
                // Simulate garbage collection by removing references
                const beforeCount = this.activeStudents.length;
                
                // Remove a random student to demonstrate WeakSet auto-cleanup
                if (this.activeStudents.length > 0) {
                    const randomIndex = Math.floor(Math.random() * this.activeStudents.length);
                    this.removeStudent(this.activeStudents[randomIndex]);
                }
                
                this.addLog("Memory cleanup performed - WeakSet auto-removes flagged references", "info");
                this.showNotification("Cleanup performed. WeakSet automatically manages memory", "success");
            }

            // UI Methods
            initializeUI() {
                this.setupEventListeners();
                this.updateUI();
            }

            setupEventListeners() {
                // Add Student
                document.getElementById('addStudentBtn').addEventListener('click', () => {
                    const name = document.getElementById('studentName').value.trim();
                    const roll = document.getElementById('studentRoll').value;
                    
                    if (!name && !roll) {
                        // Create demo student if no input
                        this.createStudent();
                    } else {
                        this.createStudent(name || undefined, roll ? parseInt(roll) : undefined);
                    }
                    
                    // Clear inputs
                    document.getElementById('studentName').value = '';
                    document.getElementById('studentRoll').value = '';
                    document.getElementById('studentName').focus();
                });

                // Flag Student
                document.getElementById('flagStudentBtn').addEventListener('click', () => {
                    if (this.activeStudents.length === 0) {
                        this.showNotification("No students to flag", "error");
                        return;
                    }
                    
                    // Flag a random student for demo
                    const randomStudent = this.activeStudents[Math.floor(Math.random() * this.activeStudents.length)];
                    this.flagStudent(randomStudent);
                });

                // Check Status
                document.getElementById('checkStatusBtn').addEventListener('click', () => {
                    if (this.activeStudents.length === 0) {
                        this.showNotification("No students to check", "error");
                        return;
                    }
                    
                    const randomStudent = this.activeStudents[Math.floor(Math.random() * this.activeStudents.length)];
                    const isFlagged = this.isStudentFlagged(randomStudent);
                    
                    const status = isFlagged ? "FLAGGED" : "CLEAN";
                    const color = isFlagged ? "#ff6659" : "#4caf50";
                    
                    this.addLog(`Status Check: "${randomStudent.name}" is ${status}`, isFlagged ? "flag" : "clear");
                    this.showNotification(`"${randomStudent.name}" is ${status}`, isFlagged ? "warning" : "success");
                });

                // Cleanup
                document.getElementById('cleanupBtn').addEventListener('click', () => {
                    this.performCleanup();
                });

                // Remove Student
                document.getElementById('removeStudentBtn').addEventListener('click', () => {
                    if (this.activeStudents.length === 0) {
                        this.showNotification("No students to remove", "error");
                        return;
                    }
                    
                    const randomStudent = this.activeStudents[Math.floor(Math.random() * this.activeStudents.length)];
                    this.removeStudent(randomStudent);
                });

                // Sort Students
                document.getElementById('sortByNameBtn').addEventListener('click', () => {
                    this.sortStudentsByName();
                });

                // Clear Logs
                document.getElementById('clearLogsBtn').addEventListener('click', () => {
                    this.clearLogs();
                });

                // Enter key support
                document.getElementById('studentName').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') document.getElementById('addStudentBtn').click();
                });
                
                document.getElementById('studentRoll').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') document.getElementById('addStudentBtn').click();
                });
            }

            updateUI() {
                this.updateStudentsList();
                this.updateStatistics();
                this.updateLogsUI();
            }

            updateStudentsList() {
                const studentsList = document.getElementById('studentsList');
                
                if (this.activeStudents.length === 0) {
                    studentsList.innerHTML = `
                        <div style="text-align: center; padding: 40px 20px; color: rgba(255, 255, 255, 0.6);">
                            <i class="fas fa-user-graduate" style="font-size: 3rem; margin-bottom: 16px;"></i>
                            <p>No students added yet. Add students to begin monitoring.</p>
                        </div>
                    `;
                    return;
                }
                
                let studentsHTML = '';
                
                this.activeStudents.forEach(student => {
                    const isFlagged = this.isStudentFlagged(student);
                    
                    studentsHTML += `
                        <div class="student-card ${isFlagged ? 'flagged' : ''}" data-id="${student.id}">
                            <div class="student-info">
                                <div class="student-avatar">
                                    ${student.avatarText}
                                </div>
                                <div class="student-details">
                                    <h3>${student.name}</h3>
                                    <div class="student-meta">
                                        <span><i class="fas fa-id-card"></i> Roll: ${student.roll}</span>
                                        <span><i class="fas fa-clock"></i> Added: ${student.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="student-status">
                                <div class="status-badge ${isFlagged ? 'status-flagged' : 'status-clean'}">
                                    ${isFlagged ? 'Flagged' : 'Clean'}
                                </div>
                                ${isFlagged ? '<i class="fas fa-exclamation-triangle" style="color: #ff6659;"></i>' : '<i class="fas fa-check-circle" style="color: #4caf50;"></i>'}
                            </div>
                        </div>
                    `;
                });
                
                studentsList.innerHTML = studentsHTML;
            }

            updateStatistics() {
                const stats = this.getStatistics();
                
                document.getElementById('totalStudents').textContent = stats.total;
                document.getElementById('flaggedCount').textContent = stats.flagged;
                document.getElementById('cleanCount').textContent = stats.clean;
            }

            updateLogsUI() {
                const logContainer = document.getElementById('monitorLog');
                
                if (this.logs.length === 0) {
                    logContainer.innerHTML = `
                        <div style="text-align: center; padding: 40px 20px; color: rgba(255, 255, 255, 0.6);">
                            <i class="fas fa-clipboard-list" style="font-size: 3rem; margin-bottom: 16px;"></i>
                            <p>Monitoring logs will appear here</p>
                        </div>
                    `;
                    return;
                }
                
                // Show last 10 logs
                const recentLogs = this.logs.slice(-10);
                let logsHTML = '';
                
                recentLogs.forEach(log => {
                    const time = new Date(log.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
                    
                    logsHTML += `
                        <div class="log-entry ${log.type}">
                            <div class="log-time">${time}</div>
                            <div class="log-message">${log.message}</div>
                        </div>
                    `;
                });
                
                logContainer.innerHTML = logsHTML;
                logContainer.scrollTop = logContainer.scrollHeight;
            }

            addLog(message, type = "info") {
                const logEntry = {
                    timestamp: Date.now(),
                    message: message,
                    type: type
                };
                
                this.logs.push(logEntry);
                this.updateLogsUI();
            }

            showNotification(message, type = "info") {
                const notification = document.getElementById('notification');
                const content = notification.querySelector('.notification-content');
                
                notification.className = `notification ${type}`;
                content.textContent = message;
                
                const iconMap = {
                    success: 'check-circle',
                    warning: 'exclamation-triangle',
                    error: 'times-circle',
                    info: 'info-circle'
                };
                
                notification.querySelector('.notification-icon').className = `fas fa-${iconMap[type] || 'info-circle'} notification-icon`;
                
                notification.classList.add('show');
                
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 4000);
            }

            createBackgroundParticles() {
                const particlesContainer = document.getElementById('particles');
                const particleCount = 50;
                
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    
                    // Random position
                    particle.style.left = `${Math.random() * 100}%`;
                    particle.style.top = `${Math.random() * 100}%`;
                    
                    // Random size
                    const size = Math.random() * 3 + 1;
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    
                    // Random animation
                    const duration = Math.random() * 20 + 10;
                    particle.style.animation = `float ${duration}s infinite linear`;
                    
                    particlesContainer.appendChild(particle);
                }
                
                // Add CSS animation
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes float {
                        0% {
                            transform: translateY(0) translateX(0);
                            opacity: 0;
                        }
                        10% {
                            opacity: 0.3;
                        }
                        90% {
                            opacity: 0.3;
                        }
                        100% {
                            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }

        // Initialize the system when page loads
        document.addEventListener('DOMContentLoaded', () => {
            const examMonitor = new ExamMonitoringSystem();
            
            // Add some demo students initially
            setTimeout(() => {
                examMonitor.createStudent("Alex Johnson", 101);
                examMonitor.createStudent("Maria Garcia", 102);
                examMonitor.createStudent("David Chen", 103);
                
                // Flag one student for demo
                setTimeout(() => {
                    examMonitor.flagStudent(examMonitor.activeStudents[0]);
                }, 1000);
            }, 500);
        });
