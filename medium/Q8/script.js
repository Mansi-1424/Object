
    function CustomerAccount(price, discount, users, multiplier) {
      let _price = price
      let _discount = discount
      let _users = users
      let _multiplier = multiplier
      let _costPerUser = 100; // Fixed cost per user for profit calculation

      Object.defineProperties(this, {
        price: {
          get() { return _price },
          set(value) {
            if (value <= 0) throw Error('Price must be positive')
            _price = value
          }
        },

        discount: {
          get() { return _discount },
          set(value) {
            if (value < 0 || value > 50) throw Error('Discount must be between 0-50%')
            _discount = value
          }
        },

        users: {
          get() { return _users },
          set(value) {
            if (!Number.isInteger(value) || value < 1)
              throw Error('Users must be integer greater than 0')
            _users = value
          }
        },

        multiplier: {
          get() { return _multiplier },
          set(value) {
            if (value < 1) throw Error('Multiplier must be 1 or greater')
            _multiplier = value
          }
        },

        monthlyRevenue: {
          get() {
            return (_price * _users * (1 - _discount / 100)) * _multiplier
          },
          enumerable: false
        },

        annualRevenue: {
          get() {
            return this.monthlyRevenue * 12
          },
          enumerable: false
        },

        quarterlyRevenue: {
          get() {
            return this.monthlyRevenue * 3
          },
          enumerable: false
        },

        baseRevenue: {
          get() {
            return _price * _users
          },
          enumerable: false
        },

        discountAmount: {
          get() {
            return this.baseRevenue * (_discount / 100)
          },
          enumerable: false
        },

        afterDiscountRevenue: {
          get() {
            return this.baseRevenue - this.discountAmount
          },
          enumerable: false
        },

        arpu: {
          get() {
            return this.monthlyRevenue / _users
          },
          enumerable: false
        },

        totalCost: {
          get() {
            return _users * _costPerUser
          },
          enumerable: false
        },

        profitMargin: {
          get() {
            const profit = this.monthlyRevenue - this.totalCost
            return ((profit / this.monthlyRevenue) * 100).toFixed(1)
          },
          enumerable: false
        },

        isEnterprise: {
          get() {
            return this.annualRevenue > 250000
          },
          enumerable: false
        },

        tier: {
          get() {
            if (this.annualRevenue <= 500000) return 'Starter'
            if (this.annualRevenue <= 2500000) return 'Growth'
            return 'Enterprise'
          },
          enumerable: false
        }
      })
    }

    /* Prototype Method */
    CustomerAccount.prototype.serializeSafe = function () {
      const obj = {
        price: this.price,
        discount: this.discount,
        users: this.users,
        multiplier: this.multiplier,
        monthlyRevenue: this.monthlyRevenue,
        annualRevenue: this.annualRevenue,
        tier: this.tier,
        timestamp: new Date().toLocaleString()
      }
      return JSON.stringify(obj, null, 2)
    }

    /* Format currency in Indian Rupees */
    function formatRupees(amount) {
      if (amount >= 10000000) {
        return (amount / 10000000).toFixed(2) + ' Cr'
      }
      if (amount >= 100000) {
        return (amount / 100000).toFixed(2) + ' L'
      }
      if (amount >= 1000) {
        return (amount / 1000).toFixed(1) + 'K'
      }
      return amount.toFixed(0)
    }

    /* Update visualization bars */
    function updateVisualization(monthly, quarterly, annual) {
      const maxRevenue = Math.max(monthly, quarterly, annual)
      
      document.getElementById('barMonthly').style.height = `${(monthly / maxRevenue) * 100}%`
      document.getElementById('barQuarterly').style.height = `${(quarterly / maxRevenue) * 100}%`
      document.getElementById('barAnnual').style.height = `${(annual / maxRevenue) * 100}%`
    }

    /* Update tier indicators */
    function updateTierIndicator(tier) {
      document.querySelectorAll('.tier').forEach(el => el.classList.remove('active'))
      
      if (tier === 'Starter') {
        document.getElementById('tierStarter').classList.add('active')
      } else if (tier === 'Growth') {
        document.getElementById('tierGrowth').classList.add('active')
      } else {
        document.getElementById('tierEnterprise').classList.add('active')
      }
    }

    /* Add to history */
    function addToHistory(account) {
      const historyList = document.getElementById('historyList')
      const historyItem = document.createElement('div')
      historyItem.className = 'history-item'
      
      const date = new Date().toLocaleTimeString()
      historyItem.innerHTML = `
        <div>
          <div style="font-size: 0.9rem; color: rgba(255,255,255,0.7)">${date}</div>
          <div style="font-size: 0.8rem; color: var(--accent)">${account.users} users × ₹${account.price}</div>
        </div>
        <div class="history-value rupee">${formatRupees(account.annualRevenue)}</div>
      `
      
      historyList.insertBefore(historyItem, historyList.firstChild)
      
      // Keep only last 5 items
      while (historyList.children.length > 5) {
        historyList.removeChild(historyList.lastChild)
      }
    }

    /* Initialize range inputs */
    function initializeRangeInputs() {
      const priceInput = document.getElementById('price')
      const priceRange = document.getElementById('priceRange')
      const priceValue = document.getElementById('priceValue')
      
      priceInput.addEventListener('input', function() {
        priceRange.value = this.value
        priceValue.textContent = `₹${this.value}`
      })
      
      priceRange.addEventListener('input', function() {
        priceInput.value = this.value
        priceValue.textContent = `₹${this.value}`
      })
      
      const discountInput = document.getElementById('discount')
      const discountRange = document.getElementById('discountRange')
      const discountValue = document.getElementById('discountValue')
      
      discountInput.addEventListener('input', function() {
        discountRange.value = this.value
        discountValue.textContent = `${this.value}%`
      })
      
      discountRange.addEventListener('input', function() {
        discountInput.value = this.value
        discountValue.textContent = `${this.value}%`
      })
      
      const usersInput = document.getElementById('users')
      const usersRange = document.getElementById('usersRange')
      const usersValue = document.getElementById('usersValue')
      
      usersInput.addEventListener('input', function() {
        usersRange.value = this.value
        usersValue.textContent = this.value
      })
      
      usersRange.addEventListener('input', function() {
        usersInput.value = this.value
        usersValue.textContent = this.value
      })
      
      const multiplierInput = document.getElementById('multiplier')
      const multiplierRange = document.getElementById('multiplierRange')
      const multiplierValue = document.getElementById('multiplierValue')
      
      multiplierInput.addEventListener('input', function() {
        multiplierRange.value = this.value
        multiplierValue.textContent = `${this.value}x`
      })
      
      multiplierRange.addEventListener('input', function() {
        multiplierInput.value = this.value
        multiplierValue.textContent = `${this.value}x`
      })
    }

    /* Reset all inputs */
    function resetInputs() {
      document.getElementById('price').value = 999
      document.getElementById('priceRange').value = 999
      document.getElementById('priceValue').textContent = '₹999'
      
      document.getElementById('discount').value = 10
      document.getElementById('discountRange').value = 10
      document.getElementById('discountValue').textContent = '10%'
      
      document.getElementById('users').value = 100
      document.getElementById('usersRange').value = 100
      document.getElementById('usersValue').textContent = '100'
      
      document.getElementById('multiplier').value = 1.2
      document.getElementById('multiplierRange').value = 1.2
      document.getElementById('multiplierValue').textContent = '1.2x'
      
      document.getElementById('errorMessage').style.display = 'none'
    }

    /* Main calculation function */
    document.getElementById('calculate').onclick = () => {
      const errorMessage = document.getElementById('errorMessage')
      errorMessage.style.display = 'none'
      
      try {
        const account = new CustomerAccount(
          +document.getElementById('price').value,
          +document.getElementById('discount').value,
          +document.getElementById('users').value,
          +document.getElementById('multiplier').value
        )

        // Update main stats
        document.getElementById('monthlyRevenue').textContent = formatRupees(account.monthlyRevenue)
        document.getElementById('annualRevenue').textContent = formatRupees(account.annualRevenue)
        document.getElementById('arpu').textContent = formatRupees(account.arpu)
        document.getElementById('profitMargin').textContent = `${account.profitMargin}%`

        // Update breakdown
        document.getElementById('baseRevenue').textContent = formatRupees(account.baseRevenue)
        document.getElementById('discountAmount').textContent = formatRupees(account.discountAmount)
        document.getElementById('afterDiscount').textContent = formatRupees(account.afterDiscountRevenue)
        document.getElementById('finalRevenue').textContent = formatRupees(account.monthlyRevenue)

        // Update enterprise status
        const enterpriseBadge = document.getElementById('enterpriseBadge')
        if (account.isEnterprise) {
          enterpriseBadge.textContent = 'ENTERPRISE TIER 🚀'
          enterpriseBadge.className = 'enterprise-badge enterprise-yes'
        } else {
          enterpriseBadge.textContent = 'STANDARD TIER'
          enterpriseBadge.className = 'enterprise-badge enterprise-no'
        }

        // Update visualization
        updateVisualization(
          account.monthlyRevenue,
          account.quarterlyRevenue,
          account.annualRevenue
        )

        // Update tier indicator
        updateTierIndicator(account.tier)

        // Add to history
        addToHistory(account)

        // Hide error if any
        errorMessage.style.display = 'none'

      } catch (e) {
        errorMessage.textContent = `Error: ${e.message}`
        errorMessage.style.display = 'block'
      }
    }

    /* Reset button */
    document.getElementById('reset').onclick = resetInputs

    /* Initialize on page load */
    window.onload = function() {
      initializeRangeInputs()
      // Trigger initial calculation
      document.getElementById('calculate').click()
    }
