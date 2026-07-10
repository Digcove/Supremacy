# WS1 — Mods & Packwiz Plumbing (run FIRST)

Executed by the orchestrator (needs network + permission prompts).

## 1. Add mods via packwiz (prefer Modrinth)

From repo root, using `/Users/evancyrulik/go/bin/packwiz`:

| Mod | Purpose | Slug (Modrinth) |
|---|---|---|
| spark | profiler | `spark` |
| FTB Backups 2 | server backups | `ftb-backups-2` |
| EntityCulling | perf | `entityculling` |
| ImmediatelyFast | perf | `immediatelyfast` |
| NetherPortalFix | QoL | `netherportalfix` |
| In Control! | spawn rules | `in-control` (CurseForge if MR absent) |
| Extended Crafting | extreme crafting tables | `extended-crafting` (CurseForge if MR absent) |

All must be 1.20.1 Forge builds. Cucumber (Extended Crafting dep) is already installed.

## 2. Fix broken TACZ gun packs

`tacz/ghouls-guns.pw.toml` and `tacz/fakelorant-gun-pack.pw.toml` share the same sha1 and both point at an asset-only zip (no `data/` → zero guns registered).

- Re-add Ghoul's Guns (CurseForge project 1508254, file 7895105) and Fakelorant (project 1198095, file 7727523) into the `tacz/` folder.
- Download/verify both zips contain `data/<namespace>/` gun definitions.
- Record the real namespaces of both packs in `tasks/reports/01_report.md` — WS2 needs them for recipe removal regexes.

## 3. Pack identity

- `pack.toml`: `name = "Supremacy"`, version → `1.0.0`.

## 4. Refresh

- `/Users/evancyrulik/go/bin/packwiz refresh` — must exit clean.

## Done criteria
- 7 new `mods/*.pw.toml`, 2 fixed `tacz/*.pw.toml`, updated `pack.toml`/`index.toml`.
- Report with confirmed gun-pack namespaces.
