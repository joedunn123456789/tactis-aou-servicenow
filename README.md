# 🧠 Tactis AOU ServiceNow Scripts

A modular collection of ServiceNow scripts designed to automate case workflows, manage user access, and integrate external data sources like BigQuery. This repo supports internal operations across ServiceNow environments with scalable, versioned utilities.

## 📁 Repository Overview

Scripts are grouped by function and prefixed for clarity:

- `sn-bg-*`: Background scripts for case updates, KB linking, and user unlocks
- `sn-br-*`: Business rules for task closure, note propagation, and API triggers
- `sn-change-*`: Request state and contact type modifiers
- `sn-lock-*`: User locking logic based on role and inactivity
- `sn-si-*` / `sn-sj-*`: AJAX and portal utilities, including BigQuery helpers
- `bigQueryToServiceNow*.js`: Multiple versions for ingesting BigQuery data
- `powershell-unescape.ps1`: PowerShell utility for decoding escaped strings
- `sn-prod-*`, `sn-rp-*`: Production API and password reset integrations

## ⚙️ Key Features

- ✅ Auto-close stale cases and propagate KB links
- 🔐 Lock/unlock users based on admin role and activity thresholds
- 🔄 Sync BigQuery data into ServiceNow with versioned ingestion logic
- 🧩 Modular business rules for child task closure and CXOne API triggers
- 🛠️ Utility scripts for portal, AJAX, and DB transaction verification

## 🧪 Development Notes

- Scripts are versioned for iterative deployment and rollback
- Naming conventions reflect ServiceNow script types for easy scanning
- Designed for internal use—no public packages or releases

## 📌 Repo Stats

- 🔒 Private repository
- 🛠️ 31 commits
- ⭐ 0 stars | 🍴 0 forks

---

> This repo is maintained for internal automation and workflow optimization. For questions or onboarding, contact the repository owner.

