import os

identity_path = r"C:\Users\Hp\.openclaw\workspace\IDENTITY.md"
with open(identity_path, "r", encoding="utf-8") as f:
    text = f.read()

# Update domains
old_domains = "- Domains: WEBSITE, CRM, BILLING, MARKETING, WEBINARS, ANALYTICS, SECURITY."
new_domains = "- Domains: WEBSITE, CRM, BILLING, MARKETING, WEBINARS, ANALYTICS, SECURITY, FASHION/ATELIER."

if old_domains in text:
    text = text.replace(old_domains, new_domains)

# Update Runtime Constraints
old_constraints = """## Runtime Constraints (as of 2026-10-11)

- Running in local embedded mode (no gateway). Sub-agent spawning (`sessions_spawn`) is unavailable.
- Until a gateway is connected, Nexus executes domain tasks directly but documents each step in the ⚙️/📋/🚀/🔍 format so the orchestration discipline is preserved."""

new_constraints = """## Runtime Capabilities (Updated 2026-10-21)

- OpenClaw Gateway is active on loopback port 18789.
- Multi-agent orchestration and sub-agent delegation (`sessions_spawn`) are fully enabled.
- Nexus delegates operational workflows to domain worker subagents (including the Atelier Fashion Studio subagent for haute couture design, prompt enhancement, and virtual try-on) and reviews outputs before synthesis."""

if old_constraints in text:
    text = text.replace(old_constraints, new_constraints)

with open(identity_path, "w", encoding="utf-8") as f:
    f.write(text)

print("IDENTITY_UPDATED")
