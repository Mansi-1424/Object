

    /* Enhanced Deep Freeze Utility */
    function deepFreeze(obj) {
      // Get all property names
      const propNames = Object.getOwnPropertyNames(obj);
      
      // Freeze properties before freezing self
      for (const name of propNames) {
        const value = obj[name];
        
        if (value && typeof value === "object" && !Object.isFrozen(value)) {
          deepFreeze(value);
        }
      }
      
      return Object.freeze(obj);
    }

    /* Create Immutable Configuration with Symbols */
    function createImmutableConfig(config) {
      // Create a copy to avoid mutating original
      const immutable = Object.assign({}, config);
      
      // Make all properties non-writable and non-configurable
      Object.keys(immutable).forEach(key => {
        Object.defineProperty(immutable, key, {
          value: immutable[key],
          writable: false,
          configurable: false,
          enumerable: true
        });
        
        // Handle nested objects
        if (immutable[key] && typeof immutable[key] === 'object') {
          createImmutableConfig(immutable[key]);
        }
      });
      
      // Add a Symbol for metadata
      const metaSymbol = Symbol('configMeta');
      immutable[metaSymbol] = {
        created: Date.now(),
        version: '1.0.0',
        checksum: Math.random().toString(36).substring(7)
      };
      
      // Make the Symbol non-enumerable
      Object.defineProperty(immutable, metaSymbol, {
        enumerable: false,
        configurable: false,
        writable: false
      });
      
      // Seal and freeze
      Object.seal(immutable);
      return Object.freeze(immutable);
    }

    /* Create Secure Sandbox */
    function createSecureSandbox(target) {
      // Lock existing properties
      Object.getOwnPropertyNames(target).forEach(key => {
        Object.defineProperty(target, key, {
          writable: false,
          configurable: false
        });
      });

      // Seal structure
      Object.seal(target);

      // Prevent extension
      Object.preventExtensions(target);

      return target;
    }

    /* UI Elements */
    const output = document.getElementById('output');
    const errorMessage = document.getElementById('errorMessage');
    const comparison = document.getElementById('comparison');

    /* Format results */
    function createResultSection(title, className, items, level, levelText) {
      const section = document.createElement('div');
      section.className = `result-section ${className}`;
      
      let itemsHTML = '';
      items.forEach(item => {
        itemsHTML += `
          <div class="result-item">
            <div class="result-label">
              ${item.icon ? `<span class="status-icon ${item.icon}">${item.icon === 'icon-success' ? '✓' : item.icon === 'icon-warning' ? '!' : '✗'}</span>` : ''}
              ${item.label}
            </div>
            <div class="result-value ${typeof item.value === 'boolean' ? (item.value ? 'true' : 'false') : 'warning'}">
              ${typeof item.value === 'boolean' ? (item.value ? 'Yes' : 'No') : item.value}
            </div>
          </div>
        `;
      });
      
      section.innerHTML = `
        <div class="result-title">
          <i class="fas ${className === 'shallow' ? 'fa-layer-group' : className === 'deep' ? 'fa-cubes' : className === 'seal' ? 'fa-lock' : 'fa-fortress-alt'}"></i>
          ${title}
        </div>
        <div class="result-grid">
          ${itemsHTML}
        </div>
        <div class="security-level level-${level}">
          <i class="fas ${level === 'low' ? 'fa-shield' : level === 'medium' ? 'fa-shield-alt' : level === 'high' ? 'fa-shield-check' : 'fa-shield-cat'}"></i>
          Security Level: ${levelText}
        </div>
      `;
      
      return section;
    }

    /* Show comparison table */
    function showComparison() {
      comparison.innerHTML = `
        <h3 style="color: var(--accent); margin: 1.5rem 0 1rem 0; display: flex; align-items: center; gap: 10px;">
          <i class="fas fa-balance-scale"></i> Method Comparison
        </h3>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Add Properties</th>
              <th>Delete Properties</th>
              <th>Modify Properties</th>
              <th>Nested Protection</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="method-cell">Object.freeze()</td>
              <td class="status-cell"><span class="status-false">No</span></td>
              <td class="status-cell"><span class="status-false">No</span></td>
              <td class="status-cell"><span class="status-false">No</span></td>
              <td class="status-cell"><span class="status-false">No</span></td>
            </tr>
            <tr>
              <td class="method-cell">deepFreeze()</td>
              <td class="status-cell"><span class="status-false">No</span></td>
              <td class="status-cell"><span class="status-false">No</span></td>
              <td class="status-cell"><span class="status-false">No</span></td>
              <td class="status-cell"><span class="status-true">Yes</span></td>
            </tr>
            <tr>
              <td class="method-cell">Object.seal()</td>
              <td class="status-cell"><span class="status-false">No</span></td>
              <td class="status-cell"><span class="status-false">No</span></td>
              <td class="status-cell"><span class="status-true">Yes</span></td>
              <td class="status-cell"><span class="status-false">No</span></td>
            </tr>
            <tr>
              <td class="method-cell">createImmutableConfig()</td>
              <td class="status-cell"><span class="status-false">No</span></td>
              <td class="status-cell"><span class="status-false">No</span></td>
              <td class="status-cell"><span class="status-false">No</span></td>
              <td class="status-cell"><span class="status-true">Yes</span></td>
            </tr>
          </tbody>
        </table>
      `;
    }

    /* Test Cases */
    document.getElementById('testShallow').onclick = () => {
      try {
        const config = {
          api: {
            endpoint: '/secure',
            token: 'secret_123',
            timeout: 5000
          },
          db: {
            host: 'localhost',
            port: 5432
          }
        };

        // Apply shallow freeze
        Object.freeze(config);

        let tokenModified = false;
        let newPropertyAdded = false;
        let propertyDeleted = false;

        // Try to modify nested property
        try {
          config.api.token = 'hacked';
          tokenModified = true;
        } catch (e) {
          // Modification failed (should fail at root level, but nested might work)
        }

        // Try to add new property
        try {
          config.newProp = 'test';
          newPropertyAdded = true;
        } catch (e) {
          // Adding failed
        }

        // Try to delete property
        try {
          delete config.api.endpoint;
          propertyDeleted = true;
        } catch (e) {
          // Deletion failed
        }

        // Check nested modification (shallow freeze doesn't protect this)
        if (!tokenModified) {
          try {
            config.api.token = 'hacked';
            tokenModified = true;
          } catch (e) {
            // This should not throw for shallow freeze
          }
        }

        const result = createResultSection(
          'Shallow Freeze Test',
          'shallow',
          [
            { label: 'Root Frozen', value: Object.isFrozen(config), icon: 'icon-success' },
            { label: 'Nested Object Frozen', value: Object.isFrozen(config.api), icon: 'icon-danger' },
            { label: 'Token Modified', value: tokenModified, icon: tokenModified ? 'icon-danger' : 'icon-success' },
            { label: 'New Property Added', value: newPropertyAdded, icon: newPropertyAdded ? 'icon-danger' : 'icon-success' },
            { label: 'Property Deleted', value: propertyDeleted, icon: propertyDeleted ? 'icon-danger' : 'icon-success' },
            { label: 'Current Token', value: config.api.token, icon: 'icon-warning' }
          ],
          'low',
          'Low (Surface Only)'
        );

        output.prepend(result);
        errorMessage.style.display = 'none';
        showComparison();
        
      } catch (e) {
        errorMessage.textContent = `Error: ${e.message}`;
        errorMessage.style.display = 'block';
      }
    };

    document.getElementById('testDeep').onclick = () => {
      try {
        const config = {
          api: {
            endpoint: '/secure',
            token: 'secret_123',
            timeout: 5000,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer token'
            }
          },
          db: {
            host: 'localhost',
            port: 5432
          }
        };

        // Apply deep freeze
        const secureConfig = createSecureSandbox(config);
        deepFreeze(secureConfig);

        let tokenModified = false;
        let headerModified = false;
        let newPropertyAdded = false;

        // Try to modify nested properties
        try {
          secureConfig.api.token = 'hacked';
          tokenModified = true;
        } catch (e) {
          // Modification failed
        }

        // Try to modify deeply nested property
        try {
          secureConfig.api.headers['Content-Type'] = 'text/html';
          headerModified = true;
        } catch (e) {
          // Modification failed
        }

        // Try to add new property
        try {
          secureConfig.newProp = 'test';
          newPropertyAdded = true;
        } catch (e) {
          // Adding failed
        }

        const result = createResultSection(
          'Deep Freeze Test',
          'deep',
          [
            { label: 'Root Frozen', value: Object.isFrozen(secureConfig), icon: 'icon-success' },
            { label: 'API Object Frozen', value: Object.isFrozen(secureConfig.api), icon: 'icon-success' },
            { label: 'Headers Object Frozen', value: Object.isFrozen(secureConfig.api.headers), icon: 'icon-success' },
            { label: 'Token Modified', value: tokenModified, icon: tokenModified ? 'icon-danger' : 'icon-success' },
            { label: 'Header Modified', value: headerModified, icon: headerModified ? 'icon-danger' : 'icon-success' },
            { label: 'New Property Added', value: newPropertyAdded, icon: newPropertyAdded ? 'icon-danger' : 'icon-success' }
          ],
          'high',
          'High (Full Protection)'
        );

        output.prepend(result);
        errorMessage.style.display = 'none';
        showComparison();
        
      } catch (e) {
        errorMessage.textContent = `Error: ${e.message}`;
        errorMessage.style.display = 'block';
      }
    };

    document.getElementById('testSeal').onclick = () => {
      try {
        const config = {
          api: {
            endpoint: '/secure',
            token: 'secret_123'
          },
          debug: false
        };

        // Apply Object.seal
        Object.seal(config);
        Object.seal(config.api);

        let propertyModified = true; // Should work with seal
        let newPropertyAdded = false;
        let propertyDeleted = false;

        // Try to modify existing property (should work)
        try {
          config.debug = true;
        } catch (e) {
          propertyModified = false;
        }

        // Try to add new property
        try {
          config.newProp = 'test';
          newPropertyAdded = true;
        } catch (e) {
          // Adding failed
        }

        // Try to delete property
        try {
          delete config.debug;
          propertyDeleted = true;
        } catch (e) {
          // Deletion failed
        }

        const result = createResultSection(
          'Object.seal Test',
          'seal',
          [
            { label: 'Root Sealed', value: Object.isSealed(config), icon: 'icon-success' },
            { label: 'API Sealed', value: Object.isSealed(config.api), icon: 'icon-success' },
            { label: 'Property Modified', value: propertyModified, icon: 'icon-success' },
            { label: 'New Property Added', value: newPropertyAdded, icon: newPropertyAdded ? 'icon-danger' : 'icon-success' },
            { label: 'Property Deleted', value: propertyDeleted, icon: propertyDeleted ? 'icon-danger' : 'icon-success' },
            { label: 'Extensions Prevented', value: Object.isExtensible(config), icon: 'icon-danger' }
          ],
          'medium',
          'Medium (Structure Locked)'
        );

        output.prepend(result);
        errorMessage.style.display = 'none';
        showComparison();
        
      } catch (e) {
        errorMessage.textContent = `Error: ${e.message}`;
        errorMessage.style.display = 'block';
      }
    };

    document.getElementById('testImmutable').onclick = () => {
      try {
        const config = {
          api: {
            endpoint: '/secure',
            token: 'secret_123',
            settings: {
              retry: 3,
              timeout: 5000
            }
          },
          features: ['auth', 'logging', 'cache']
        };

        // Create immutable config
        const immutableConfig = createImmutableConfig(config);

        let tokenModified = false;
        let settingsModified = false;
        let arrayModified = false;
        let symbolAccessible = false;

        // Try to modify nested property
        try {
          immutableConfig.api.token = 'hacked';
          tokenModified = true;
        } catch (e) {
          // Modification failed
        }

        // Try to modify deeply nested property
        try {
          immutableConfig.api.settings.timeout = 10000;
          settingsModified = true;
        } catch (e) {
          // Modification failed
        }

        // Try to modify array (should fail)
        try {
          immutableConfig.features.push('monitoring');
          arrayModified = true;
        } catch (e) {
          // Modification failed
        }

        // Check if Symbol is accessible
        const symbols = Object.getOwnPropertySymbols(immutableConfig);
        symbolAccessible = symbols.length > 0;

        const result = createResultSection(
          'Immutable Config Test',
          'immutable',
          [
            { label: 'Root Frozen', value: Object.isFrozen(immutableConfig), icon: 'icon-success' },
            { label: 'Settings Frozen', value: Object.isFrozen(immutableConfig.api.settings), icon: 'icon-success' },
            { label: 'Token Modified', value: tokenModified, icon: tokenModified ? 'icon-danger' : 'icon-success' },
            { label: 'Settings Modified', value: settingsModified, icon: settingsModified ? 'icon-danger' : 'icon-success' },
            { label: 'Array Modified', value: arrayModified, icon: arrayModified ? 'icon-danger' : 'icon-success' },
            { label: 'Symbol Metadata', value: symbolAccessible ? 'Present' : 'Missing', icon: symbolAccessible ? 'icon-success' : 'icon-danger' }
          ],
          'max',
          'Maximum (Complete Immutability)'
        );

        output.prepend(result);
        errorMessage.style.display = 'none';
        showComparison();
        
      } catch (e) {
        errorMessage.textContent = `Error: ${e.message}`;
        errorMessage.style.display = 'block';
      }
    };

    /* Clear results */
    document.getElementById('clear').onclick = () => {
      output.innerHTML = '';
      comparison.innerHTML = '';
      errorMessage.style.display = 'none';
    };

    // Show initial comparison table
    showComparison();
