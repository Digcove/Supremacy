# Supremacy — Shared Conventions for All Workstreams

Every task agent MUST read this file before touching anything. It exists so that
parallel workstreams don't collide and everything ships in one consistent style.

## Repo facts

- Repo root: `/Users/evancyrulik/Desktop/modpack` (packwiz-managed pack source, MC 1.20.1 Forge 47.4.20).
- Quest chapters: `config/ftbquests/quests/chapters/*.snbt`. Chapter groups: `config/ftbquests/quests/chapter_groups.snbt`.
- Quest text for Star Tech tabs localizes via `kubejs/assets/ftbquestlocalizer/lang/en_us.json` — raw snbt may show `{ftbquests.*}` keys. Do not break those keys.
- KubeJS: `kubejs/server_scripts/` (recipes), `kubejs/startup_scripts/` (registration), `kubejs/data/` (datapack overrides). The `star_tech/` subtrees are a ported content layer — do not edit them unless your task file says so.
- Canonical trackers at root: `dev_notes.md`, `pack_gap_analysis.md`, `playtest_notes_2.md`, `texture_checklist.md`.
- Live test instance (read-only reference, do NOT edit): `~/Library/Application Support/PrismLauncher/instances/Unnamed Pack-0.1.0/minecraft`.
- C2E2 reference instance (read-only source of patterns): `~/Library/Application Support/PrismLauncher/instances/Craft to Exile 2 (VR Support)/minecraft`.
- packwiz binary: `/Users/evancyrulik/go/bin/packwiz` (full path required). After adding/changing any static file that must ship, run `/Users/evancyrulik/go/bin/packwiz refresh` from repo root — but WS coordination note: only the integration pass runs refresh, unless your task file says otherwise.
- Git: do NOT commit. The orchestrator commits per-workstream with `/usr/bin/git`.

## snbt formatting rules (violations crash the quest book)

- Tab indentation, LF line endings, no trailing whitespace. Match the surrounding file exactly.
- Every quest, task, and reward object needs a **unique 16-hex-char `id`** (uppercase hex). A duplicate ID anywhere in the book crashes on load.
- **ID allocation — your workstream owns a prefix.** Generate IDs as `<PREFIX><12 random hex chars>`:
  - WS3 (reward audit): `3A3A`
  - WS4 (gem shop + reward tables): `4B4B`
  - WS5 armory: `5C5C`, welcome rewrite: `5D5D`, commerce: `5E5E`, jewlery/armor fills: `5F5F`
  - WS6: `6D6D` (if any quest edits needed)
  Never generate IDs outside your prefix. Existing IDs in files you edit stay untouched.
- New chapter registration: chapters carry their own `group:` and `order_index:` fields. Reserved values (already checked against the repo):
  - `gem_shop.snbt` → group `1E3C4B5FFAE48A39` (Campaign), order_index 9
  - `armory.snbt` → group `274C28999D7BBD26` (Adventure), order_index 3
  - `commerce.snbt` → group `1E24DF067925061D` (Home Sweet Home), order_index 5
- Chapter file skeleton (copy structure from `config/ftbquests/quests/chapters/dungeons.snbt`):
  `{ default_hide_dependency_lines, default_quest_shape, filename, group, icon, id, order_index, quest_links:[], quests:[...] }`
- Quest layout: x/y doubles, ~2.5 spacing, straight chains with clean branches (see Layout in the writing standard below).

## MnS XP reward template (copy EXACTLY, only vary amount/title/id)

```
{
	auto: "enabled"
	command: "/mine_and_slash give xp_times_lvl @p 50"
	elevate_perms: true
	icon: "minecraft:experience_bottle"
	id: "3A3A0123456789AB"
	silent: true
	title: "50 Experience x Lv."
	type: "command"
}
```
Tiers: 50 = early game, 100 = mid game, 150 = late game.

## Coin rewards (Lightman's Currency)

Tiered coins by progression stage: `lightmanscurrency:coin_iron` → `coin_gold` → `coin_emerald` → `coin_diamond` → `coin_netherite`. Exchange chain is 10:1 per tier. Reward as `{ count: N, id: "...", item: "lightmanscurrency:coin_gold", type: "item" }`.

## Quest writing standard (production rules — apply in full)

- Descriptions are informative, immersive, concise — an in-game guidebook. Target feel: GTNH / Nomifactory CEu / Divine Journey 2 / MeatballCraft. No memes, no jokes, no filler.
  - Good: "Bronze marks the first true step into industry. Hand tools are no longer enough; machinery now becomes practical."
- Every quest teaches something (milestone, machine, system, boss gate, dimension unlock). Never a bare "obtain item" quest. The book is the pack's documentation — favor teaching over gating; explain *why* a mechanic matters.
- Complete files only — no placeholders, no partial output.
- Rewards reinforce progression (components, food, coins, backpacks); never give progression items for free; never reward expensive machines.
- Task types: prefer the best fit — `item` (`consume: false` unless it's a shop), `location`, `advancement`, `kill`, `dimension`, `structure`, `checkmark` (only for lore/informational).
- Use Minecraft formatting codes for emphasis (`&e...&r` in snbt) sparingly and consistently with existing chapters.
- Always reference the pack's custom KubeJS chains where they exist (never assume vanilla progression if a custom system overrides it).

## Standing constraints (non-negotiable)

1. **No new custom items that need texture PNGs.** If a task genuinely requires a new `kubejs:` item, stop and flag it instead. Existing texture-less items are tracked in `texture_checklist.md` — if you register anything new (you shouldn't), it must be added there.
2. **Never inject Mine & Slash gear/currency ITEMS into mod structure/dungeon chest loot tables.** MnS gear comes only from MnS drops, quests, or profession recipes. Lightman coins in chests are fine. TACZ guns in *boss drop* and *MnS Atlas map* loot are fine (that's the design).
3. Weapons policy: Tinkers is tools-only; melee combat = Spartan Weaponry / Iron's Spells / MnS; guns (TACZ) = late game. Don't add weapon recipes outside this.
4. Star Tech chapter *content* (titles, descriptions, tasks, layout) stays faithful — only rewards may be added/adjusted where a task file says so.
5. GT item IDs are uncertain in places — `dev_notes.md` has an uncertainty table. When you use a `gtceu:` ID, grep for it under `kubejs/` or the live instance's JEI-adjacent data if unsure; if still unverifiable, use it and add it to the in-game verification list in your report.

## Report-back format

Each agent finishes by writing `tasks/reports/<NN>_report.md` containing: files created/modified, decisions made, anything flagged for in-game verification, and any deviation from the task file. The orchestrator aggregates these into WS8.
