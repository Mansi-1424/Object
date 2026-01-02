const output = document.getElementById('output')

/* Dangerous keys blacklist */
const BLOCKED_KEYS = new Set(['__proto__', 'constructor', 'prototype'])

/* Secure sanitizer */
function sanitize(input) {
  const clean = Object.create(null) // no prototype

  for (const key of Object.keys(input)) {
    if (BLOCKED_KEYS.has(key)) {
      logAttempt(key)
      continue
    }

    if (Object.hasOwn(input, key)) {
      clean[key] = input[key]
    }
  }

  return Object.freeze(clean)
}

/* Mutation logger */
function logAttempt(key) {
  console.warn(`🚨 Mutation attempt blocked: ${key}`)
}

/* Simulated attack payload */
function pollutionAttack() {
  const payload = JSON.parse(`
    {
      "safe": "data",
      "__proto__": { "isAdmin": true }
    }
  `)

  Object.assign({}, payload)

  return {}.isAdmin === true
}

/* UI Actions */
document.getElementById('attack').onclick = () => {
  const polluted = pollutionAttack()
  output.classList.add('danger')
  output.textContent = polluted
    ? '❌ PROTOTYPE POLLUTION DETECTED\n{}.isAdmin === true'
    : '✅ No pollution detected'
}

document.getElementById('sanitize').onclick = () => {
  const payload = {
    name: 'user',
    role: 'viewer',
    __proto__: { isAdmin: true }
  }

  const safe = sanitize(payload)

  try {
    safe.role = 'admin'
  } catch {}

  output.classList.remove('danger')
  output.textContent = `
✅ SANITIZATION COMPLETE

Keys: ${Object.keys(safe).join(', ')}

Frozen: ${Object.isFrozen(safe)}

Prototype: ${Object.getPrototypeOf(safe)}

{}.isAdmin: ${{}.isAdmin ?? 'undefined'}
`
}
