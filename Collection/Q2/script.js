
        // Event Registration System using Map and Set
        class EventRegistrationSystem {
            constructor() {
                // Map to store events: eventId -> {name: string, users: Set}
                this.events = new Map();
                this.initializeDemoData();
                this.renderAll();
            }

            // Initialize with some demo data
            initializeDemoData() {
                // Add demo events with names
                this.createEvent("E001", "Tech Conference 2024");
                this.createEvent("E002", "Web Development Workshop");
                this.createEvent("E003", "Data Science Summit");
                
                // Add demo registrations
                this.registerUser("E001", "alex@example.com");
                this.registerUser("E001", "maria@example.com");
                this.registerUser("E001", "john@example.com");
                this.registerUser("E002", "alex@example.com");
                this.registerUser("E002", "sarah@example.com");
                this.registerUser("E003", "alex@example.com");
                this.registerUser("E003", "maria@example.com");
                this.registerUser("E003", "david@example.com");
            }

            // Create a new event with a unique eventId and name
            createEvent(eventId, eventName) {
                if (!eventId.trim()) {
                    this.showNotification("Please enter an Event ID", "error");
                    return false;
                }
                
                if (!eventName.trim()) {
                    this.showNotification("Please enter an Event Name", "error");
                    return false;
                }
                
                if (this.events.has(eventId)) {
                    this.showNotification(`Event "${eventId}" already exists!`, "error");
                    return false;
                }
                
                this.events.set(eventId, {
                    name: eventName,
                    users: new Set()
                });
                
                this.showNotification(`Event "${eventName}" (${eventId}) created successfully!`, "success");
                this.renderAll();
                return true;
            }

            // Register a user for an event
            registerUser(eventId, userEmail) {
                if (!eventId) {
                    this.showNotification("Please select an event", "error");
                    return false;
                }
                
                if (!userEmail.trim()) {
                    return false; // Silently skip empty emails
                }
                
                if (!this.events.has(eventId)) {
                    this.showNotification(`Event "${eventId}" does not exist!`, "error");
                    return false;
                }
                
                if (!isValidEmail(userEmail)) {
                    this.showNotification(`Invalid email: ${userEmail}`, "warning");
                    return false;
                }
                
                const event = this.events.get(eventId);
                
                if (event.users.has(userEmail)) {
                    return false; // Silently skip duplicate registrations
                }
                
                event.users.add(userEmail);
                return true;
            }

            // Register multiple users for an event
            registerMultipleUsers(eventId, emails) {
                if (!eventId) {
                    this.showNotification("Please select an event", "error");
                    return { success: 0, failed: 0, total: 0 };
                }
                
                const event = this.events.get(eventId);
                if (!event) {
                    this.showNotification(`Event "${eventId}" does not exist!`, "error");
                    return { success: 0, failed: 0, total: 0 };
                }
                
                let successCount = 0;
                let failedCount = 0;
                
                emails.forEach(email => {
                    if (email.trim() && isValidEmail(email)) {
                        if (!event.users.has(email)) {
                            event.users.add(email);
                            successCount++;
                        } else {
                            failedCount++;
                        }
                    } else if (email.trim()) {
                        failedCount++;
                    }
                });
                
                if (successCount > 0) {
                    this.showNotification(`Successfully registered ${successCount} user(s) to ${event.name}`, "success");
                }
                
                if (failedCount > 0) {
                    this.showNotification(`${failedCount} email(s) were invalid or already registered`, "warning");
                }
                
                this.renderAll();
                return { success: successCount, failed: failedCount, total: emails.length };
            }

            // Remove a user from an event
            removeUser(eventId, userEmail) {
                if (!this.events.has(eventId)) {
                    return false;
                }
                
                const event = this.events.get(eventId);
                const removed = event.users.delete(userEmail);
                
                if (removed) {
                    this.showNotification(`User "${userEmail}" removed from "${event.name}"`, "info");
                    this.renderAll();
                }
                
                return removed;
            }

            // Get total registrations for a specific event
            getTotalRegistrations(eventId) {
                if (!this.events.has(eventId)) return 0;
                return this.events.get(eventId).users.size;
            }

            // Get all registrations per event (for analytics)
            getAllRegistrationsPerEvent() {
                const registrations = [];
                for (const [eventId, event] of this.events) {
                    registrations.push({
                        eventId,
                        eventName: event.name,
                        count: event.users.size,
                        users: [...event.users]
                    });
                }
                // Sort by registration count (descending)
                return registrations.sort((a, b) => b.count - a.count);
            }

            // Get list of users attending multiple events
            getUsersAttendingMultipleEvents() {
                const userEventCount = new Map();
                
                // Count how many events each user is registered for
                for (const [eventId, event] of this.events) {
                    for (const user of event.users) {
                        userEventCount.set(user, (userEventCount.get(user) || 0) + 1);
                    }
                }
                
                // Filter users attending more than one event
                const multiEventUsers = [];
                for (const [user, count] of userEventCount) {
                    if (count > 1) {
                        multiEventUsers.push({ user, count });
                    }
                }
                
                // Sort by number of events attended (descending)
                return multiEventUsers.sort((a, b) => b.count - a.count);
            }

            // Get all unique users across all events
            getAllUniqueUsers() {
                const uniqueUsers = new Set();
                for (const event of this.events.values()) {
                    for (const user of event.users) {
                        uniqueUsers.add(user);
                    }
                }
                return uniqueUsers;
            }

            // Get total number of registrations across all events
            getTotalRegistrationsCount() {
                let total = 0;
                for (const event of this.events.values()) {
                    total += event.users.size;
                }
                return total;
            }

            // Clear all data
            clearAllData() {
                this.events.clear();
                this.showNotification("All data cleared successfully!", "info");
                this.renderAll();
            }

            // Clear specific event
            clearEvent(eventId) {
                if (this.events.has(eventId)) {
                    const eventName = this.events.get(eventId).name;
                    this.events.delete(eventId);
                    this.showNotification(`Event "${eventName}" cleared successfully!`, "info");
                    this.renderAll();
                    return true;
                }
                return false;
            }

            // Get all events for dropdown
            getAllEvents() {
                const events = [];
                for (const [eventId, event] of this.events) {
                    events.push({
                        id: eventId,
                        name: event.name
                    });
                }
                return events;
            }

            // Generate random demo data
            generateDemoData() {
                const events = [
                    { id: "E004", name: "AI Innovation Summit" },
                    { id: "E005", name: "Startup Pitch Competition" },
                    { id: "E006", name: "Cybersecurity Workshop" }
                ];
                
                const demoEmails = [
                    "demo1@example.com", "demo2@example.com", "demo3@example.com",
                    "demo4@example.com", "demo5@example.com", "demo6@example.com"
                ];
                
                events.forEach(event => {
                    if (!this.events.has(event.id)) {
                        this.createEvent(event.id, event.name);
                        
                        // Register 2-4 random users to each event
                        const numUsers = Math.floor(Math.random() * 3) + 2;
                        for (let i = 0; i < numUsers; i++) {
                            const randomEmail = demoEmails[Math.floor(Math.random() * demoEmails.length)];
                            this.registerUser(event.id, randomEmail);
                        }
                    }
                });
                
                this.showNotification("Demo data generated successfully!", "success");
                this.renderAll();
            }

            // Export data as JSON
            exportData() {
                const data = {};
                for (const [eventId, event] of this.events) {
                    data[eventId] = {
                        name: event.name,
                        users: [...event.users]
                    };
                }
                
                const jsonStr = JSON.stringify(data, null, 2);
                const blob = new Blob([jsonStr], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'event-registration-data.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                this.showNotification("Data exported successfully!", "success");
            }

            // Import data from JSON
            importData(jsonData) {
                try {
                    const data = JSON.parse(jsonData);
                    let importedCount = 0;
                    
                    for (const [eventId, eventData] of Object.entries(data)) {
                        if (!this.events.has(eventId)) {
                            this.events.set(eventId, {
                                name: eventData.name || `Event ${eventId}`,
                                users: new Set(eventData.users || [])
                            });
                            importedCount++;
                        }
                    }
                    
                    if (importedCount > 0) {
                        this.showNotification(`Imported ${importedCount} event(s) successfully!`, "success");
                        this.renderAll();
                    } else {
                        this.showNotification("No new events imported (some events may already exist)", "info");
                    }
                    
                    return true;
                } catch (error) {
                    this.showNotification("Invalid JSON data format", "error");
                    return false;
                }
            }

            // UI Rendering Methods
            renderAll() {
                this.renderEvents();
                this.renderStats();
                this.renderEventDropdown();
                this.renderRegistrationsPerEvent();
                this.renderMultiEventUsers();
            }

            renderEvents() {
                const eventsList = document.getElementById('eventsList');
                
                if (this.events.size === 0) {
                    eventsList.innerHTML = '<div class="empty-state" id="emptyEvents"><i class="fas fa-calendar-plus"></i><p>No events created yet. Create your first event to get started!</p></div>';
                    return;
                }
                
                let eventsHTML = '';
                
                for (const [eventId, event] of this.events) {
                    const users = [...event.users];
                    const userCount = users.length;
                    
                    eventsHTML += `
                        <div class="event-card" data-event-id="${eventId}">
                            <div class="event-header">
                                <div>
                                    <div class="event-id">${eventId}</div>
                                    <h3 class="event-name">${event.name}</h3>
                                </div>
                                <div class="event-users">
                                    <i class="fas fa-users"></i>
                                    <span>${userCount} registration${userCount !== 1 ? 's' : ''}</span>
                                </div>
                            </div>
                            
                            ${userCount > 0 ? `
                                <div class="users-list">
                                    ${users.map(user => `
                                        <div class="user-badge">
                                            <span>${user}</span>
                                            <button class="remove-user" onclick="eventSystem.removeUser('${eventId}', '${user}')">
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : `
                                <div class="empty-state" style="padding: 10px 0;">
                                    <i class="fas fa-user-slash"></i>
                                    <p>No users registered yet</p>
                                </div>
                            `}
                            
                            <div class="event-actions">
                                <button class="action-btn remove" onclick="eventSystem.clearEvent('${eventId}')">
                                    <i class="fas fa-trash"></i> Clear Event
                                </button>
                                <button class="action-btn clear" onclick="eventSystem.events.get('${eventId}').users.clear(); eventSystem.renderAll(); eventSystem.showNotification('All users removed from ${event.name}', 'info')">
                                    <i class="fas fa-user-slash"></i> Clear All Users
                                </button>
                            </div>
                        </div>
                    `;
                }
                
                eventsList.innerHTML = eventsHTML;
            }

            renderStats() {
                document.getElementById('total-events').textContent = this.events.size;
                document.getElementById('total-users').textContent = this.getAllUniqueUsers().size;
                document.getElementById('total-registrations').textContent = this.getTotalRegistrationsCount();
                document.getElementById('events-count').textContent = `${this.events.size} Event${this.events.size !== 1 ? 's' : ''}`;
            }

            renderEventDropdown() {
                const selectEvent = document.getElementById('selectEvent');
                const events = this.getAllEvents();
                
                // Save current selection
                const currentSelection = selectEvent.value;
                
                // Clear existing options except the first one
                selectEvent.innerHTML = '<option value="">-- Select an event --</option>';
                
                // Add event options
                events.forEach(event => {
                    const option = document.createElement('option');
                    option.value = event.id;
                    option.textContent = `${event.name} (${event.id})`;
                    selectEvent.appendChild(option);
                });
                
                // Restore selection if it still exists
                if (events.some(event => event.id === currentSelection)) {
                    selectEvent.value = currentSelection;
                }
            }

            renderRegistrationsPerEvent() {
                const registrationsPerEvent = document.getElementById('registrationsPerEvent');
                const registrations = this.getAllRegistrationsPerEvent();
                
                if (registrations.length === 0) {
                    registrationsPerEvent.innerHTML = '<div class="empty-state"><i class="fas fa-chart-pie"></i><p>No registration data available yet.</p></div>';
                    return;
                }
                
                let registrationsHTML = '';
                
                registrations.forEach(reg => {
                    const maxCount = registrations[0].count;
                    const percentage = maxCount > 0 ? (reg.count / maxCount) * 100 : 0;
                    
                    registrationsHTML += `
                        <div style="margin-bottom: 16px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                                <span style="font-weight: 600;">${reg.eventName} (${reg.eventId})</span>
                                <span style="font-weight: 700; color: var(--primary-color);">${reg.count}</span>
                            </div>
                            <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                                <div style="height: 100%; background: var(--primary-color); width: ${percentage}%; border-radius: 4px;"></div>
                            </div>
                        </div>
                    `;
                });
                
                registrationsPerEvent.innerHTML = registrationsHTML;
            }

            renderMultiEventUsers() {
                const multiEventUsers = document.getElementById('multiEventUsers');
                const users = this.getUsersAttendingMultipleEvents();
                
                if (users.length === 0) {
                    multiEventUsers.innerHTML = '<div class="empty-state"><i class="fas fa-user-friends"></i><p>No users attending multiple events yet.</p></div>';
                    return;
                }
                
                let usersHTML = '';
                
                users.forEach(userData => {
                    usersHTML += `
                        <div class="user-item">
                            <div class="user-email">
                                <i class="fas fa-envelope"></i> ${userData.user}
                            </div>
                            <div class="event-count">
                                ${userData.count} event${userData.count !== 1 ? 's' : ''}
                            </div>
                        </div>
                    `;
                });
                
                multiEventUsers.innerHTML = usersHTML;
            }

            showNotification(message, type = "info") {
                const notification = document.getElementById('notification');
                notification.innerHTML = `
                    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                    ${message}
                `;
                notification.className = `notification ${type} show`;
                
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);
            }
        }

        // Email validation function
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Function to add email input field
        function addEmailInput() {
            const container = document.getElementById('emailInputsContainer');
            const div = document.createElement('div');
            div.className = 'email-input-item';
            div.innerHTML = `
                <input type="email" class="email-input" placeholder="Enter user email (e.g., john@example.com)">
                <button class="remove-email-btn" onclick="removeEmailInput(this)">
                    <i class="fas fa-times"></i>
                </button>
            `;
            container.appendChild(div);
            div.querySelector('input').focus();
        }

        // Function to remove email input field
        function removeEmailInput(button) {
            const container = document.getElementById('emailInputsContainer');
            if (container.children.length > 1) {
                button.parentElement.remove();
            } else {
                // If only one input remains, clear it instead
                button.parentElement.querySelector('input').value = '';
                button.parentElement.querySelector('input').focus();
            }
        }

        // Function to get all email values
        function getAllEmailValues() {
            const inputs = document.querySelectorAll('.email-input');
            return Array.from(inputs).map(input => input.value.trim()).filter(email => email);
        }

        // Function to show import modal
        function showImportModal() {
            document.getElementById('importModal').style.display = 'flex';
            document.getElementById('importDataText').focus();
        }

        // Function to hide import modal
        function hideImportModal() {
            document.getElementById('importModal').style.display = 'none';
            document.getElementById('importDataText').value = '';
        }

        // Initialize the application
        document.addEventListener('DOMContentLoaded', () => {
            window.eventSystem = new EventRegistrationSystem();
            
            // DOM Elements
            const createEventTab = document.getElementById('create-event');
            const registerUserTab = document.getElementById('register-user');
            const bulkActionsTab = document.getElementById('bulk-actions');
            const tabs = document.querySelectorAll('.tab');
            const tabContents = document.querySelectorAll('.tab-content');
            
            const eventIdInput = document.getElementById('eventId');
            const eventNameInput = document.getElementById('eventName');
            const selectEvent = document.getElementById('selectEvent');
            const addEmailBtn = document.getElementById('addEmailBtn');
            
            const createEventBtn = document.getElementById('createEventBtn');
            const registerUserBtn = document.getElementById('registerUserBtn');
            const clearDataBtn = document.getElementById('clearDataBtn');
            const generateDemoDataBtn = document.getElementById('generateDemoDataBtn');
            const exportDataBtn = document.getElementById('exportDataBtn');
            const importDataBtn = document.getElementById('importDataBtn');
            const clearEventBtn = document.getElementById('clearEventBtn');
            const refreshAnalyticsBtn = document.getElementById('refreshAnalyticsBtn');
            const confirmImportBtn = document.getElementById('confirmImportBtn');
            const cancelImportBtn = document.getElementById('cancelImportBtn');

            // Tab switching functionality
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const tabId = tab.dataset.tab;
                    
                    // Update active tab
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    // Show corresponding content
                    tabContents.forEach(content => {
                        content.classList.remove('active');
                        if (content.id === tabId) {
                            content.classList.add('active');
                        }
                    });
                    
                    // Focus on first input in active tab
                    if (tabId === 'create-event') {
                        eventIdInput.focus();
                    } else if (tabId === 'register-user') {
                        selectEvent.focus();
                    }
                });
            });
            
            // Event Listeners
            createEventBtn.addEventListener('click', () => {
                const eventId = eventIdInput.value.trim();
                const eventName = eventNameInput.value.trim();
                
                if (eventSystem.createEvent(eventId, eventName)) {
                    // Clear inputs on successful creation
                    eventIdInput.value = '';
                    eventNameInput.value = '';
                    eventIdInput.focus();
                }
            });
            
            registerUserBtn.addEventListener('click', () => {
                const eventId = selectEvent.value;
                const emails = getAllEmailValues();
                
                if (!eventId) {
                    eventSystem.showNotification("Please select an event", "error");
                    return;
                }
                
                if (emails.length === 0) {
                    eventSystem.showNotification("Please enter at least one email", "error");
                    return;
                }
                
                eventSystem.registerMultipleUsers(eventId, emails);
                
                // Clear email inputs after registration
                document.querySelectorAll('.email-input').forEach(input => {
                    if (input.value.trim() && isValidEmail(input.value.trim())) {
                        input.value = '';
                    }
                });
                
                // Keep one empty input field
                const container = document.getElementById('emailInputsContainer');
                if (container.children.length === 0) {
                    addEmailInput();
                }
            });
            
            clearDataBtn.addEventListener('click', () => {
                if (confirm("Are you sure you want to clear ALL event and user data? This action cannot be undone.")) {
                    eventSystem.clearAllData();
                }
            });
            
            generateDemoDataBtn.addEventListener('click', () => {
                eventSystem.generateDemoData();
            });
            
            exportDataBtn.addEventListener('click', () => {
                eventSystem.exportData();
            });
            
            importDataBtn.addEventListener('click', () => {
                showImportModal();
            });
            
            clearEventBtn.addEventListener('click', () => {
                const eventId = selectEvent.value;
                if (!eventId) {
                    eventSystem.showNotification("Please select an event first", "error");
                    return;
                }
                
                if (confirm(`Are you sure you want to clear the selected event?`)) {
                    eventSystem.clearEvent(eventId);
                }
            });
            
            refreshAnalyticsBtn.addEventListener('click', () => {
                eventSystem.renderAll();
                eventSystem.showNotification("Analytics refreshed", "info");
            });
            
            addEmailBtn.addEventListener('click', addEmailInput);
            
            confirmImportBtn.addEventListener('click', () => {
                const jsonData = document.getElementById('importDataText').value;
                if (jsonData.trim()) {
                    eventSystem.importData(jsonData);
                    hideImportModal();
                } else {
                    eventSystem.showNotification("Please enter JSON data", "error");
                }
            });
            
            cancelImportBtn.addEventListener('click', hideImportModal);
            
            // Close modal when clicking outside
            document.getElementById('importModal').addEventListener('click', (e) => {
                if (e.target.id === 'importModal') {
                    hideImportModal();
                }
            });
            
            // Allow Enter key to submit forms
            eventIdInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    createEventBtn.click();
                }
            });
            
            eventNameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    createEventBtn.click();
                }
            });
            
            // Add keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                // Ctrl+E to focus on event creation
                if (e.ctrlKey && e.key === 'e') {
                    e.preventDefault();
                    document.querySelector('[data-tab="create-event"]').click();
                    eventIdInput.focus();
                }
                
                // Ctrl+R to focus on registration
                if (e.ctrlKey && e.key === 'r') {
                    e.preventDefault();
                    document.querySelector('[data-tab="register-user"]').click();
                    selectEvent.focus();
                }
                
                // Ctrl+Q for quick actions
                if (e.ctrlKey && e.key === 'q') {
                    e.preventDefault();
                    document.querySelector('[data-tab="bulk-actions"]').click();
                }
            });
            
            // Focus on first input on load
            eventIdInput.focus();
        });
  