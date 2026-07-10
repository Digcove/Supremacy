# WS8 — Human Handoff Docs (run LAST)

Executed by the orchestrator after WS1–WS7 reports land in `tasks/reports/`.

## Deliverable 1: `orb_forge_build_spec.md` (repo root)

Per-machine MBD2 build spec for the 7 Orb Forge multiblocks (MBD2 machines are binary NBT editor projects — cannot be authored in-repo). For each machine (`modpack:basic_modify_station` → `modpack:orb_forge`):
- Controller ID + recipe type linkage (from `kubejs/startup_scripts/orb_forge_machines.js`)
- GT-tier casing palette suggestion, structure dimensions, hatch/bus requirements
- `modpack:orb_forge` runs all recipe types at 4× speed
- Round-trip workflow: build in MBD2 editor in the live instance → files appear in `<gamedir>/ldlib/mbd2/{machine,recipe_type}/` → copy into repo `ldlib/mbd2/` → `packwiz refresh` → trim the `MBDRegistryEvents` block in `orb_forge_machines.js` to avoid duplicate registration.

## Deliverable 2: `in_game_testing.md` (repo root)

Consolidate: dev_notes' two testing lists + every "flag for in-game verification" item from `tasks/reports/0*.md` + soul-ring speed nerf procedure + dimension_return spawn coords + TACZ filter-merge confirmation + NBT gun-drop equip test + EC recipes in JEI + GT item-ID uncertainty table + Ghoul's/Fakelorant zip content verification.

## Deliverable 3: tracker updates

- `dev_notes.md`: new dated session block summarizing WS1–WS7; move completed items to COMPLETED; point remaining items at `in_game_testing.md`.
- `pack_gap_analysis.md`: status header update (which §§ now closed).
- `playtest_notes_2.md`: check off completed items; note professions kept by decision.
- `texture_checklist.md`: verify all 22 entries still current; remove entries for items that no longer exist (flint_compass was slated for removal); confirm no new texture-needing items were added.
- Flag worldgen consolidation (gap analysis §16) as the remaining open DECISION (not acted on — breaks existing worlds).
