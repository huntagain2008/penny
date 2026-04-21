---
name: code-review
description: Code review skill. Use when user asks to review code, check for bugs, or wants a PR review.
user-invocable: true
allowed-tools:
  - Read
  - Grep
  - Glob
---

 # /code-review — Code Review

Review code following this workflow:
1. Read the changed files
2. Check for bugs, security issues, style violations
3. Report findings with line numbers
