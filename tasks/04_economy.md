# WS4 — Gem Shop + Economy Sink

Read `tasks/00_conventions.md` first. ID prefix: `4B4B`.

## Background

The pack has coin taps everywhere (~4,866 item rewards incl. tiered Lightman coins) but no sink. C2E2 solves this with a repeatable gem shop. Source of truth to adapt (READ-ONLY):
`~/Library/Application Support/PrismLauncher/instances/Craft to Exile 2 (VR Support)/minecraft/config/ftbquests/quests/`
- `chapters/gem_shop.snbt` — the shop chapter pattern
- `reward_tables/*.snbt` — choice reward tables (support full `mmorpg_gear`/NBT rewards)

## Deliverable 1: `config/ftbquests/quests/reward_tables/` (NEW directory)

Create 5–7 tables adapted from C2E2's, with `4B4B` 16-hex ids:
- Support gem box (MnS support gems)
- Skill/aura gem box
- Rune box (MnS runes)
- Salvage/currency box (MnS orbs, salvage stones)
- Gear box per stage (mid-game, endgame) — `mmorpg_gear` NBT entries copied/adapted from C2E2 tables; check item ids exist in this pack (grep `kubejs/data/mmorpg/`), swap any C2E2-only ids.
- NEW (Supremacy-specific): **Armory crate** — 3–5 TACZ themed-pack guns as `tacz:modern_kinetic_gun` + `{GunId:"..."}` NBT entries (coordinate with WS2's report if present; otherwise pick from `destiny:`/`zeta:` gun ids visible in the live instance pack zips). This is one of the three sanctioned themed-gun sources.
- Table file format: copy a C2E2 table verbatim and swap contents; `table_id` used by quests = the signed-64-bit decimal interpretation of the table's hex id (C2E2 files show the pairing — replicate exactly).

## Deliverable 2: `config/ftbquests/quests/chapters/gem_shop.snbt`

- Group `1E3C4B5FFAE48A39` (Campaign), order_index 9, filename `gem_shop`.
- 10–12 quests, all `can_repeat: true`, task = `{type: "item", consume_items: true, item: "lightmanscurrency:coin_<tier>", count: N}`, reward = `{type: "choice", table_id: <decimal>, exclude_from_claim_all: true}`.
- Price ladder (tune vs 10:1 coin chain): iron-coin fishing/food crates → gold-coin gem boxes → emerald rune/salvage boxes → diamond gear boxes → netherite Armory crate.
- One intro checkmark quest (teaching tone): how the shop works, where coins come from, that prices sink coins permanently.
- Layout: intro at x=0, shop stalls in two clean rows.

## Deliverable 3: pricing pass note

Append a `## Economy pricing pass` section to `tasks/reports/04_report.md`: estimate total coins a player earns per stage (grep coin reward counts per chapter group), sanity-check shop prices against it (a mid-game player should afford ~1 gem box per play session, not 20), and list any chapters whose coin rewards look inflationary. Adjust shop prices to match — do NOT re-edit other chapters' rewards (WS3 owns those).

## Verification
- Duplicate-ID check across chapters + reward_tables.
- Every `table_id` decimal ↔ hex id pairing double-checked.
- Report → `tasks/reports/04_report.md`.
