
        // Sample user activity data
        let userActivities = [];

        // DOM Elements
        const filterResult = document.getElementById('filter-result');
        const mapResult = document.getElementById('map-result');
        const reduceResult = document.getElementById('reduce-result');
        const someResult = document.getElementById('some-result');
        const everyResult = document.getElementById('every-result');
        const userCards = document.getElementById('userCards');
        const generateDataBtn = document.getElementById('generateData');
        const analyzeDataBtn = document.getElementById('analyzeData');

        // Possible actions for users
        const possibleActions = ['login', 'view', 'edit', 'delete', 'share', 'comment', 'logout', 'search', 'upload', 'download'];

        // Generate random user data
        function generateUserData(count = 8) {
            userActivities = [];
            
            for (let i = 1; i <= count; i++) {
                // Generate random number of actions (1-6)
                const actionCount = Math.floor(Math.random() * 6) + 1;
                const actions = [];
                
                // Always include login for most users (80% chance)
                if (Math.random() > 0.2) {
                    actions.push('login');
                }
                
                // Add other random actions
                for (let j = 0; j < actionCount - 1; j++) {
                    const randomAction = possibleActions[Math.floor(Math.random() * possibleActions.length)];
                    if (!actions.includes(randomAction)) {
                        actions.push(randomAction);
                    }
                }
                
                // Sometimes include logout (70% chance)
                if (Math.random() > 0.3 && actions.includes('login')) {
                    actions.push('logout');
                }
                
                userActivities.push({
                    userId: `USER${i.toString().padStart(3, '0')}`,
                    actions: actions,
                    active: Math.random() > 0.3 // 70% chance of being active
                });
            }
            
            // Force at least one user to not have logout for demonstration
            if (userActivities.every(user => user.actions.includes('logout') || !user.actions.includes('login'))) {
                const randomUserIndex = Math.floor(Math.random() * userActivities.length);
                userActivities[randomUserIndex].actions = userActivities[randomUserIndex].actions.filter(action => action !== 'logout');
            }
            
            // Force at least one active user with no actions for demonstration
            if (userActivities.every(user => !user.active || user.actions.length > 0)) {
                const randomUserIndex = Math.floor(Math.random() * userActivities.length);
                userActivities[randomUserIndex].actions = [];
                userActivities[randomUserIndex].active = true;
            }
            
            displayUserCards();
        }

        // Display user cards
        function displayUserCards() {
            userCards.innerHTML = '';
            
            userActivities.forEach(user => {
                const userCard = document.createElement('div');
                userCard.className = `user-card ${user.active ? 'active' : 'inactive'}`;
                
                let actionsHTML = '';
                user.actions.forEach(action => {
                    actionsHTML += `<span class="action ${action}">${action}</span>`;
                });
                
                userCard.innerHTML = `
                    <div class="user-id">${user.userId}</div>
                    <div class="status ${user.active ? 'active' : 'inactive'}">
                        ${user.active ? 'Active' : 'Inactive'}
                    </div>
                    <div>Actions: <span class="counter user-action-count">${user.actions.length}</span></div>
                    <div class="actions-list">${actionsHTML || '<span class="action">No actions</span>'}</div>
                `;
                
                userCards.appendChild(userCard);
            });
        }

        // Analyze the data using array methods
        function analyzeData() {
            // 1. Filter: Get list of active users
            const activeUsers = userActivities.filter(user => user.active);
            animateCounter(filterResult, activeUsers.length);
            
            // 2. Map: Extract total actions per user
            const actionsPerUser = userActivities.map(user => user.actions.length);
            mapResult.textContent = `[${actionsPerUser.join(', ')}]`;
            highlightCard('map-card');
            
            // 3. Reduce: Calculate total actions across all users
            const totalActions = userActivities.reduce((total, user) => total + user.actions.length, 0);
            animateCounter(reduceResult, totalActions);
            
            // 4. Some: Check if any user has never logged out
            const hasNeverLoggedOut = userActivities.some(user => 
                user.actions.includes('login') && !user.actions.includes('logout')
            );
            someResult.textContent = hasNeverLoggedOut ? 'Yes' : 'No';
            someResult.style.color = hasNeverLoggedOut ? '#ff5555' : '#00ff88';
            highlightCard('some-card');
            
            // 5. Every: Check if all active users performed at least one action
            const allActiveHaveActions = activeUsers.every(user => user.actions.length > 0);
            everyResult.textContent = allActiveHaveActions ? 'Yes' : 'No';
            everyResult.style.color = allActiveHaveActions ? '#00ff88' : '#ff5555';
            highlightCard('every-card');
            
            // Highlight user cards based on criteria
            highlightUsers();
        }

        // Animate counter from 0 to target value
        function animateCounter(element, targetValue) {
            let current = 0;
            const increment = targetValue / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetValue) {
                    current = targetValue;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
                
                // Add highlight animation
                if (current === targetValue) {
                    element.classList.add('highlight');
                    setTimeout(() => {
                        element.classList.remove('highlight');
                    }, 1000);
                }
            }, 50);
        }

        // Highlight card with animation
        function highlightCard(cardId) {
            const card = document.getElementById(cardId);
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 15px 30px rgba(0, 114, 255, 0.4)';
            card.style.borderColor = 'rgba(64, 156, 255, 0.8)';
            
            setTimeout(() => {
                card.style.transform = '';
                card.style.boxShadow = '';
                card.style.borderColor = '';
            }, 1000);
        }

        // Highlight users based on criteria
        function highlightUsers() {
            // Highlight users who never logged out
            userActivities.forEach((user, index) => {
                const cards = document.querySelectorAll('.user-card');
                if (user.actions.includes('login') && !user.actions.includes('logout')) {
                    cards[index].style.boxShadow = '0 0 0 3px #ff5555';
                    setTimeout(() => {
                        cards[index].style.boxShadow = '';
                    }, 3000);
                }
            });
            
            // Highlight active users with no actions
            userActivities.forEach((user, index) => {
                const cards = document.querySelectorAll('.user-card');
                if (user.active && user.actions.length === 0) {
                    cards[index].style.boxShadow = '0 0 0 3px #ffaa00';
                    setTimeout(() => {
                        cards[index].style.boxShadow = '';
                    }, 3000);
                }
            });
        }

        // Event Listeners
        generateDataBtn.addEventListener('click', () => {
            generateUserData();
            // Reset results
            filterResult.textContent = '0';
            mapResult.textContent = '0';
            reduceResult.textContent = '0';
            someResult.textContent = 'Checking...';
            someResult.style.color = '';
            everyResult.textContent = 'Checking...';
            everyResult.style.color = '';
            
            // Add animation to button
            generateDataBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                generateDataBtn.style.transform = '';
            }, 200);
        });

        analyzeDataBtn.addEventListener('click', () => {
            analyzeData();
            
            // Add animation to button
            analyzeDataBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                analyzeDataBtn.style.transform = '';
            }, 200);
        });

        // Initialize with sample data
        generateUserData();
        
        // Auto-run analysis after a short delay
        setTimeout(() => {
            analyzeData();
        }, 500);
