# Commit Message Examples - Accepted vs Rejected

## ✅ ACCEPTED Commit Messages

### Features

```
BL-123 feat(auth): implement JWT token refresh mechanism
BL-567 feat(api): upgrade to REST API v2
BL-234 feat(dashboard): add real-time analytics widgets
BL-890 feat(settings): implement user preference persistence
```

### Bug Fixes

```
BL-456 fix(login): resolve authentication timeout issue
BL-901 fix(users): correct user permission inheritance
BL-345 fix: resolve memory leak in data service
```

### Documentation

```
BL-789 docs: update API documentation for v2 endpoints
BL-001 docs: add setup instructions to README
```

### Code Style

```
BL-321 style: format code with prettier and fix linting errors
```

### Refactoring

```
BL-654 refactor(api): simplify HTTP interceptor logic
BL-678 refactor(auth): simplify authentication flow
```

### Performance

```
BL-987 perf: optimize bundle size by lazy loading modules
```

### Tests

```
BL-159 test(auth): add unit tests for authentication service
```

### Chore/Tooling

```
BL-753 chore: update Angular from v17 to v18
BL-234 chore: update npm dependencies
```

### Revert

```
BL-852 revert: revert commit BL-123 due to performance issues
```

### CI/CD

```
BL-951 ci: update GitHub Actions deployment workflow
```

### Build System

```
BL-357 build: update webpack configuration for production builds
```

### Security

```
BL-258 security: fix XSS vulnerability in input validation
```

### With Breaking Change

```
BL-567 feat(api): upgrade to REST API v2

BREAKING CHANGE: Response format has changed from XML to JSON.
Please update all API clients accordingly.

Refs: BL-568, BL-569
```

### With Multiple References

```
BL-901 fix(users): correct user permission inheritance

Fixes issue where admin permissions were not inherited properly.

Refs: BL-902, BL-903, BL-904
```

### With Detailed Body

```
BL-678 refactor(auth): simplify authentication flow

- Removed redundant validation checks
- Consolidated auth services
- Improved error handling
- Added logging for debugging
```

---

## ❌ REJECTED Commit Messages

### 1. No Jira Ticket

```
fix: fixed login page
```

**❌ Reason:** Missing Jira ticket (BL-XXX format required)

### 2. Jira Ticket at Wrong Position

```
fixed login page BL-123
```

**❌ Reason:** Jira ticket must be at the beginning

### 3. Invalid Jira Ticket Format

```
BL-1234 feat: add new feature
```

**❌ Reason:** Jira ticket should be BL-XXX (numbers after BL-)

### 4. No Commit Type

```
BL-123 added new feature
```

**❌ Reason:** Missing type (feat, fix, docs, etc.)

### 5. Invalid Commit Type

```
BL-123 update: updated dependencies
```

**❌ Reason:** 'update' is not a valid type. Use 'chore' instead

### 6. Subject Too Long (>100 chars)

```
BL-123 feat: this is a very long commit message that exceeds the maximum allowed length of 100 characters which is not allowed
```

**❌ Reason:** Subject exceeds 100 character limit

### 7. Subject with Period at End

```
BL-123 docs: update README file.
```

**❌ Reason:** Subject should not end with a period

### 8. Empty Subject

```
BL-123 fix:
```

**❌ Reason:** Subject cannot be empty

### 9. Type in Uppercase

```
BL-123 FEAT: add new feature
```

**❌ Reason:** Type must be in lowercase

### 10. Scope in Uppercase

```
BL-123 feat(AUTH): add authentication
```

**❌ Reason:** Scope must be in lowercase

### 11. No Space After Colon

```
BL-123 feat:add new feature
```

**❌ Reason:** Must have space after colon

### 12. No Colon After Type

```
BL-123 feat add new feature
```

**❌ Reason:** Must have colon after type

### 13. Multiple Jira Tickets

```
BL-123 BL-456 feat: add feature
```

**❌ Reason:** Only one Jira ticket allowed at the beginning

### 14. Special Characters in Ticket

```
BL-123! feat: add feature
```

**❌ Reason:** Invalid Jira ticket format

### 15. Subject with Punctuation at Start

```
BL-123 feat: - Add new feature
```

**❌ Reason:** Subject should start with a letter

### 16. No Type

```
BL-123 fixed login page
```

**❌ Reason:** Missing type (feat, fix, docs, etc.)

### 17. Type with Period

```
BL-123 fix.: fixed login page
```

**❌ Reason:** Type should not have period

### 18. Empty Scope

```
BL-123 feat(): add feature
```

**❌ Reason:** Scope cannot be empty if used

### 19. Subject with Special Characters

```
BL-123 feat: add @#$% feature
```

**❌ Reason:** Subject contains invalid special characters

### 20. Jira Ticket Without Dash

```
BL123 feat: add feature
```

**❌ Reason:** Must be BL-XXX with dash

---

## 📋 Quick Reference

### ✅ Must Have:

- [ ] Jira ticket at beginning: `BL-XXX`
- [ ] Valid type: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `revert`, `ci`, `build`, `security`
- [ ] Colon after type: `type:`
- [ ] Space after colon: `type: subject`
- [ ] Subject under 100 characters
- [ ] Subject no period at end

### ❌ Must Not Have:

- [ ] No Jira ticket
- [ ] Invalid ticket format
- [ ] Invalid type
- [ ] No type
- [ ] Missing colon
- [ ] Missing space after colon
- [ ] Subject over 100 characters
- [ ] Subject with period at end
- [ ] Empty subject
- [ ] Uppercase in type or scope

---

## 🚀 Quick Acceptable Patterns

### Pattern 1: Most Basic

```
BL-XXX type: subject
```

Example: `BL-123 feat: add user management`

### Pattern 2: With Scope

```
BL-XXX type(scope): subject
```

Example: `BL-123 feat(auth): add JWT refresh`

### Pattern 3: With Body

```
BL-XXX type(scope): subject

Detailed description of changes...
```

Example:

```
BL-123 feat(auth): add JWT refresh

Implemented automatic token refresh mechanism.
Added refresh token storage in localStorage.
```

### Pattern 4: With Breaking Change

```
BL-XXX type(scope): subject

BREAKING CHANGE: description of breaking change
```

Example:

```
BL-123 feat(api): upgrade to v2 endpoints

BREAKING CHANGE: API response format has changed
```

### Pattern 5: With References

```
BL-XXX type(scope): subject

Description of changes...

Refs: BL-YYY, BL-ZZZ
```

Example:

```
BL-123 fix(auth): resolve login timeout

Increased timeout from 30s to 60s.

Refs: BL-124, BL-125
```

---

## 💡 Pro Tips

1. **Always use lowercase** for type and scope
2. **Keep subject under 50 characters** if possible (100 max)
3. **Use imperative mood** in subject (e.g., "add" not "added")
4. **Be descriptive** in the body about WHY the change was made
5. **Reference related tickets** in the footer
6. **Use `BREAKING CHANGE:`** for API-breaking changes
7. **Single ticket per commit** - don't mix multiple tickets
8. **Use the same Jira key** as your project (BL- for BillGoose)

---

## 🔍 Validation Rules

| Rule           | Requirement               | Correct ✅        | Incorrect ❌                                      |
| -------------- | ------------------------- | ----------------- | ------------------------------------------------- |
| Jira Ticket    | Must start with `BL-XXX`  | `BL-123`          | `123`, `BL123`                                    |
| Type           | Must be in allowed list   | `feat`            | `update`                                          |
| Type Case      | Must be lowercase         | `feat`            | `FEAT`                                            |
| Scope          | Must be lowercase if used | `(auth)`          | `(AUTH)`                                          |
| Subject        | Max 100 characters        | Short description | Very long description exceeding 100 characters... |
| Subject Ending | No period at end          | `add feature`     | `add feature.`                                    |
| Colon Format   | `type: subject`           | `feat: add`       | `feat:add` (no space)                             |

---

## 🎯 Quick Test

### Test Yourself - Are these accepted or rejected?

1. `BL-123 feat: add login page` - **✅ ACCEPTED**
2. `BL-123 added login page` - **❌ REJECTED** (no type)
3. `BL-123 fix: login.` - **❌ REJECTED** (period at end)
4. `fix: login BL-123` - **❌ REJECTED** (ticket at end)
5. `BL-123 feat(login): add remember me` - **✅ ACCEPTED**
6. `BL-1234 feat: add dashboard` - **❌ REJECTED** (invalid ticket format)
7. `BL-123 FEAT: add dashboard` - **❌ REJECTED** (uppercase type)
8. `BL-123 style: fix formatting` - **✅ ACCEPTED**
9. `BL-123 chore: update deps` - **✅ ACCEPTED**
10. `BL-123 security: fix XSS` - **✅ ACCEPTED**
