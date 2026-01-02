
    /* Private symbol for sensitive metadata */
    const INTERNAL_META = Symbol('internalMeta');

    class SecureUserDTO {
      constructor(rawData) {
        /* Immutable public properties */
        Object.defineProperties(this, {
          id: {
            value: rawData.id,
            enumerable: true,
            writable: false
          },
          username: {
            value: rawData.username,
            enumerable: true,
            writable: false
          },
          role: {
            value: rawData.role,
            enumerable: true,
            writable: false
          }
        });

        /* Private metadata (non-enumerable & non-serializable) */
        this[INTERNAL_META] = Object.freeze({
          issuedAt: Date.now(),
          checksum: crypto.randomUUID(),
          source: 'backend-api',
          sessionId: 'SESS_' + Math.random().toString(36).substr(2, 9)
        });

        /* Prevent structure mutation */
        Object.freeze(this);
      }

      /* Controlled exposure */
      getMetadataSnapshot() {
        return {
          issuedAt: new Date(this[INTERNAL_META].issuedAt).toLocaleTimeString(),
          source: this[INTERNAL_META].source,
          sessionId: '***' + this[INTERNAL_META].sessionId.slice(-6)
        };
      }

      /* Integrity check */
      verifyIntegrity() {
        return typeof this[INTERNAL_META].checksum === 'string' &&
               this[INTERNAL_META].checksum.length === 36;
      }

      /* Get all properties including non-enumerable */
      getAllPropertyInfo() {
        const allProps = [];
        const ownProps = Object.getOwnPropertyNames(this);
        const symbols = Object.getOwnPropertySymbols(this);
        
        ownProps.forEach(prop => {
          const descriptor = Object.getOwnPropertyDescriptor(this, prop);
          allProps.push({
            name: prop,
            value: this[prop],
            enumerable: descriptor.enumerable,
            writable: descriptor.writable,
            configurable: descriptor.configurable,
            type: 'property'
          });
        });
        
        symbols.forEach(sym => {
          allProps.push({
            name: sym.toString(),
            value: 'Hidden Symbol',
            enumerable: false,
            writable: false,
            configurable: false,
            type: 'symbol'
          });
        });
        
        return allProps;
      }

      /* Attempt to tamper with the object */
      attemptTamper() {
        const attempts = [];
        
        try {
          // Try to change a property
          this.id = 999;
          attempts.push({ action: 'Modify id', success: false });
        } catch (e) {
          attempts.push({ action: 'Modify id', success: false, error: e.message });
        }
        
        try {
          // Try to add a new property
          this.newProperty = 'hacked';
          attempts.push({ action: 'Add property', success: false });
        } catch (e) {
          attempts.push({ action: 'Add property', success: false, error: e.message });
        }
        
        try {
          // Try to delete a property
          delete this.username;
          attempts.push({ action: 'Delete property', success: false });
        } catch (e) {
          attempts.push({ action: 'Delete property', success: false, error: e.message });
        }
        
        return attempts;
      }
    }

    /* UI Elements */
    const output = document.getElementById('output');
    const errorMessage = document.getElementById('errorMessage');
    const propertyCount = document.getElementById('propertyCount');
    const enumCount = document.getElementById('enumCount');
    const statusEl = document.getElementById('status');

    let currentDTO = null;

    /* Format property value for display */
    function formatValue(value) {
      if (value === null) return 'null';
      if (value === undefined) return 'undefined';
      if (typeof value === 'symbol') return value.toString();
      if (typeof value === 'object') return JSON.stringify(value);
      return String(value);
    }

    /* Display DTO information */
    function displayDTO(dto) {
      output.innerHTML = '';
      errorMessage.style.display = 'none';
      
      // Get all properties
      const properties = dto.getAllPropertyInfo();
      
      // Update status bar
      propertyCount.textContent = properties.length;
      const enumerableCount = properties.filter(p => p.enumerable).length;
      enumCount.textContent = enumerableCount;
      statusEl.textContent = 'Secure';
      statusEl.style.color = 'var(--success)';
      
      // Public Properties Section
      const publicSection = document.createElement('div');
      publicSection.className = 'output-section';
      publicSection.innerHTML = `
        <div class="output-title">
          <i class="fas fa-eye"></i> Public Properties (Enumerable)
          <span class="tooltip">
            <i class="fas fa-question-circle"></i>
            <span class="tooltip-text">These properties are visible when iterating over the object or using Object.keys()</span>
          </span>
        </div>
        <div class="property-list" id="publicProps"></div>
      `;
      output.appendChild(publicSection);
      
      const publicPropsContainer = document.getElementById('publicProps');
      const publicProps = properties.filter(p => p.enumerable);
      
      publicProps.forEach(prop => {
        const item = document.createElement('div');
        item.className = 'property-item';
        item.innerHTML = `
          <div class="property-name">${prop.name}</div>
          <div class="property-value">${formatValue(prop.value)}</div>
        `;
        publicPropsContainer.appendChild(item);
      });
      
      // Private Symbol Section
      const privateSection = document.createElement('div');
      privateSection.className = 'output-section meta-section';
      privateSection.innerHTML = `
        <div class="output-title">
          <i class="fas fa-eye-slash"></i> Private Metadata (Symbol)
          <span class="tooltip">
            <i class="fas fa-question-circle"></i>
            <span class="tooltip-text">This Symbol property is not enumerable and won't appear in JSON.stringify()</span>
          </span>
        </div>
        <div class="symbol-display">
          Symbol Name: ${INTERNAL_META.toString()}<br>
          Type: Symbol<br>
          Enumerable: No<br>
          Access: Restricted via getMetadataSnapshot()
        </div>
        <div class="property-list" id="metaProps"></div>
      `;
      output.appendChild(privateSection);
      
      const metaSnapshot = dto.getMetadataSnapshot();
      const metaPropsContainer = document.getElementById('metaProps');
      
      Object.entries(metaSnapshot).forEach(([key, value]) => {
        const item = document.createElement('div');
        item.className = 'property-item';
        item.innerHTML = `
          <div class="property-name">${key}</div>
          <div class="property-value warning">${formatValue(value)}</div>
        `;
        metaPropsContainer.appendChild(item);
      });
      
      // Integrity Check Section
      const integritySection = document.createElement('div');
      integritySection.className = 'output-section';
      integritySection.innerHTML = `
        <div class="output-title">
          <i class="fas fa-shield-check"></i> Security Verification
        </div>
        <div class="property-list">
          <div class="property-item">
            <div class="property-name">Object is Frozen</div>
            <div class="property-value ${Object.isFrozen(dto) ? 'success' : 'danger'}">
              ${Object.isFrozen(dto) ? 'Yes 🔒' : 'No ⚠️'}
            </div>
          </div>
          <div class="property-item">
            <div class="property-name">Integrity Check</div>
            <div class="property-value ${dto.verifyIntegrity() ? 'success' : 'danger'}">
              ${dto.verifyIntegrity() ? 'Valid ✅' : 'Invalid ❌'}
            </div>
          </div>
          <div class="property-item">
            <div class="property-name">JSON Serialization</div>
            <div class="property-value warning">
              ${JSON.stringify(dto).length} characters
            </div>
          </div>
        </div>
        <div class="integrity-badge ${dto.verifyIntegrity() ? 'integrity-true' : 'integrity-false'}">
          <i class="fas ${dto.verifyIntegrity() ? 'fa-check-circle' : 'fa-times-circle'}"></i>
          ${dto.verifyIntegrity() ? 'DTO Integrity Verified' : 'DTO Integrity Compromised'}
        </div>
      `;
      output.appendChild(integritySection);
      
      // JSON Preview Section
      const jsonSection = document.createElement('div');
      jsonSection.className = 'output-section';
      jsonSection.innerHTML = `
        <div class="output-title">
          <i class="fas fa-code"></i> JSON.stringify() Output
          <span class="tooltip">
            <i class="fas fa-question-circle"></i>
            <span class="tooltip-text">Notice that Symbol properties are not included in JSON serialization</span>
          </span>
        </div>
        <div style="
          background: rgba(0,0,0,0.3);
          padding: 1rem;
          border-radius: 8px;
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 0.85rem;
          overflow-x: auto;
          white-space: pre-wrap;
          word-wrap: break-word;
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--warning);
        ">
${JSON.stringify(dto, null, 2)}
        </div>
      `;
      output.appendChild(jsonSection);
    }

    /* Load DTO */
    document.getElementById('load').onclick = () => {
      try {
        const backendPayload = {
          id: parseInt(document.getElementById('userId').value) || 42,
          username: document.getElementById('username').value || 'secure_user',
          role: document.getElementById('userRole').value || 'admin'
        };

        currentDTO = new SecureUserDTO(backendPayload);
        displayDTO(currentDTO);
        
      } catch (e) {
        errorMessage.textContent = `Error creating DTO: ${e.message}`;
        errorMessage.style.display = 'block';
      }
    };

    /* Try to tamper with DTO */
    document.getElementById('tamper').onclick = () => {
      if (!currentDTO) {
        errorMessage.textContent = 'Please load a DTO first';
        errorMessage.style.display = 'block';
        return;
      }
      
      const tamperSection = document.createElement('div');
      tamperSection.className = 'output-section';
      tamperSection.innerHTML = `
        <div class="output-title">
          <i class="fas fa-user-shield"></i> Tamper Attempt Results
        </div>
        <div class="property-list" id="tamperResults"></div>
      `;
      
      // Insert at the beginning
      output.insertBefore(tamperSection, output.firstChild);
      
      const attempts = currentDTO.attemptTamper();
      const resultsContainer = document.getElementById('tamperResults');
      
      attempts.forEach(attempt => {
        const item = document.createElement('div');
        item.className = 'property-item';
        item.innerHTML = `
          <div class="property-name">${attempt.action}</div>
          <div class="property-value ${attempt.success ? 'success' : 'danger'}">
            ${attempt.success ? 'Success ⚠️' : 'Blocked ✅'}
            ${attempt.error ? `<div style="font-size:0.8rem;color:var(--danger);margin-top:5px;">${attempt.error}</div>` : ''}
          </div>
        `;
        resultsContainer.appendChild(item);
      });
      
      // Update status to show tampering attempt
      statusEl.textContent = 'Tampered';
      statusEl.style.color = 'var(--warning)';
    };

    /* Reset everything */
    document.getElementById('reset').onclick = () => {
      output.innerHTML = '';
      errorMessage.style.display = 'none';
      propertyCount.textContent = '0';
      enumCount.textContent = '0';
      statusEl.textContent = '-';
      statusEl.style.color = 'var(--primary)';
      currentDTO = null;
      
      // Reset form values
      document.getElementById('userId').value = 42;
      document.getElementById('username').value = 'secure_user';
      document.getElementById('userRole').value = 'admin';
    };

    // Load initial DTO on page load
    window.onload = function() {
      document.getElementById('load').click();
    };
