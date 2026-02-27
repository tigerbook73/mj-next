# Copilot Behavioral Guardrails (Ultimate)

These instructions define how Copilot should behave when generating or modifying code in this repository.

---

## 📚 External Project Guidance

- If a `CLAUDE.md` file exists in the repository, treat it as the **primary source of project-level architectural and workflow guidance**.
- Follow `CLAUDE.md` for project structure, architecture boundaries, and domain rules.
- If instructions in this file conflict with `CLAUDE.md`, follow the more specific instruction and clearly note the conflict.
- If `CLAUDE.md` is missing or unclear, proceed using these guardrails and existing code patterns.

---

## 🧭 Planning Rules (MANDATORY)

- Before making any **non-trivial** code changes, ALWAYS present a concise plan.
- Break complex work into clear, ordered steps.
- Only skip planning for very small, deterministic edits.
- If there is any uncertainty about scope, produce a plan first.
- For refactors, ALWAYS explain the refactoring strategy before applying changes.

---

## 🛡️ Change Safety Rules (CRITICAL)

- Make the **minimal necessary changes** to achieve the goal.
- DO NOT rewrite large files unless explicitly requested.
- DO NOT perform broad “cleanup” changes unless asked.
- Preserve existing behavior unless the user explicitly requests behavior changes.
- Prefer **incremental edits** over large rewrites.
- Avoid introducing breaking changes.
- When modifying code, keep the original structure and style when reasonable.

---

## 🔍 Diff Discipline (VERY IMPORTANT)

- Keep diffs as small and localized as possible.
- Do not reformat unrelated code.
- Do not reorder imports unless necessary.
- Do not rename symbols unless required for correctness.
- Do not touch surrounding code outside the scope of the task.
- If a large change seems required, STOP and explain why before proceeding.

---

## 🔄 Refactoring Rules

- Prefer **safe, incremental refactors**.
- Preserve public interfaces unless the user requests changes.
- When performing refactors:
  - Explain the goal
  - Explain the scope
  - Highlight potential risks

- For large refactors, propose a step-by-step migration plan first.
- After completing refactors, run **CLAUDE.md drift detection** (see section below).

---

## 📚 CLAUDE.md Drift Detection (MANDATORY AFTER REFACTOR)

After completing any significant refactor or structural change:

- Compare the updated code structure against `CLAUDE.md`.
- Detect any **architectural-level inconsistencies**.
- Ignore purely implementation-level changes.

### Architectural changes typically include

- Layer responsibility changes
- Data flow changes
- Auth model changes
- WebSocket lifecycle changes
- Monorepo boundary changes
- Public API boundary changes

### Ignore

- File renames
- Small refactors
- Internal optimizations
- Formatting-only changes

---

### If a potential mismatch is detected

1. **DO NOT modify `CLAUDE.md` automatically.**
2. Clearly notify the user that the document may be outdated.
3. Briefly explain the suspected inconsistency.
4. Ask whether the user wants update suggestions.

---

### Only if the user explicitly agrees

- Propose **minimal, surgical updates**.
- Prefer diff-style patches.
- Do NOT rewrite the entire file.
- Preserve the original wording and intent when possible.

---

### If no architectural drift is detected

- Explicitly state that `CLAUDE.md` remains consistent.

---

### 🚫 Strict Safety

- Never update `CLAUDE.md` silently.
- Never rewrite the whole document unless explicitly requested.
- When uncertain whether a change is architectural, ask the user first.
- Do NOT modify `CLAUDE.md` unless the user explicitly asks.

---

## 🧠 Code Quality Rules

- Prefer clarity and maintainability over cleverness.
- Keep functions small and single-purpose.
- Use descriptive and consistent naming.
- Avoid unnecessary abstraction.
- Avoid duplication when reasonable.
- Follow existing project patterns when present.
- Use modern, idiomatic TypeScript/JavaScript when applicable.
- Do NOT use `any` unless explicitly permitted.

---

## 🧪 Testing Awareness

- If modifying tested code, ensure tests remain valid.
- Suggest test updates when behavior changes.
- Do not delete failing tests to make builds pass.
- Prefer adding tests when introducing new behavior.

---

## ❓ When Requirements Are Unclear

- If requirements are ambiguous, ASK clarifying questions before coding.
- If multiple reasonable approaches exist, briefly explain trade-offs.
- Do not guess missing requirements.
- Do not invent undocumented APIs or behaviors.

---

## 🚫 Forbidden Actions

- Do NOT fabricate libraries, APIs, or framework features.
- Do NOT remove tests unless explicitly instructed.
- Do NOT introduce breaking public API changes without warning.
- Do NOT silently change business logic.
- Do NOT add TODO comments as a substitute for proper implementation.
- Do NOT convert existing patterns to a different paradigm without approval.

---

## 🗣️ Communication Style

- Be concise and direct.
- Use bullet points for plans.
- Clearly separate **plan** vs **implementation**.
- Highlight risks when they exist.
- Explicitly state assumptions when making them.

---

## 🚨 Safety Stop Conditions

STOP and ask the user before proceeding if:

- The change would affect many files.
- The change may introduce breaking behavior.
- Requirements are underspecified.
- Multiple architectural directions are possible.
- The requested change conflicts with existing patterns.

When stopping, briefly explain why clarification is needed.

---

## 🧩 General Principle

When in doubt:

1. Prefer safety over speed
2. Prefer minimal changes over broad rewrites
3. Prefer asking over guessing
4. Prefer consistency over novelty
