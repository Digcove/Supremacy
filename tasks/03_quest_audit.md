# WS3 — Quest Reward Audit + Playtest-2 Edits

Read `tasks/00_conventions.md` first. ID prefix: `3A3A`. Edit only `config/ftbquests/quests/chapters/*.snbt` (+ scratchpad tooling).

## Part A — MnS XP reward fill (Star Tech chapters)

Most Star Tech chapters already have `xp_times_lvl` rewards (injected earlier). Your job is the gap fill:

1. Write a Python script in the session scratchpad (NOT committed) that, per chapter file, counts quests and quests-with-`xp_times_lvl`-reward. Parse by brace-tracking on tab-indented structure; do not use an snbt lib that reformats.
2. For every quest missing the XP reward in these chapters, inject the exact template from conventions (unique `3A3A` ids):
   - 50×Lv: early_game, adventures_in_abydos, mechanics
   - 100×Lv: automation_age, industrial_revolution, pl1, pl2, resource_production, mystical_agriculture_gregified, quality_of_life, applied_energistics, power, line_of_progression
   - 150×Lv: draconic_age_part_1, futuristic_mechanisms, a_portal_of_lost_worlds, the_stars_await_greatness, preparing_for_dimensional_travel, pl3, pl4, pl5, nuclear_fission
   - Skip: shop (it's a shop), any quest whose only task is a checkmark AND whose rewards are empty (pure lore nodes keep zero rewards).
3. Script edits must preserve tabs/LF byte-for-byte outside the insertion points.

## Part B — Coin rewards for the 11 zero-coin chapters

Per the dev_notes table, add ONE coin reward to each *meaningful* quest (milestones, chapter completions get more; trivial steps get none — use judgment, roughly 60–80% of quests):

| Chapter | Coin tier |
|---|---|
| ae2.snbt | diamond |
| armor.snbt | gold (diamond-armor quests) / emerald (netherite+) |
| dungeons.snbt | emerald |
| nuclear_chemistry.snbt | emerald→diamond |
| mystical_agriculture_gregified.snbt | gold |
| biome_hopper.snbt | iron→gold |
| fishing.snbt | iron |
| culinary_arts.snbt | iron |
| homestead.snbt | iron |
| professions.snbt | iron |
| structures.snbt | iron→gold |

Counts: iron 5–15, gold 3–8, emerald 2–5, diamond 1–3 per quest. Big completion quests ~2× that.

## Part C — Logbook dedupe audit

The 5 duplicate Logbook chapters (`ae2`, `qol`, `power_systems`, `multiblock_mechanics`, `nuclear_chemistry`) already have zero coin rewards. Audit their `type: "item"` rewards: strip any reward that hands out the same item a Star Tech tab quest also rewards for the same milestone (compare against `applied_energistics`, `quality_of_life`, `power`, `mechanics`, `nuclear_fission`). Keep consumable/food/misc rewards. Note: Part B adds coins to ae2/nuclear_chemistry — that's intentional (Logbook keeps coins, Star Tech tabs keep XP; the pair no longer double-pays the same currency type).

## Part D — Playtest-2 content edits (professions chapter STAYS)

1. **Andesite Alloy quest** — insert in `early_game.snbt` between the "Out of the Stone Age" and "Cogs and Shafts" quests (grep titles; text may be in `kubejs/assets/ftbquestlocalizer/lang/en_us.json` — if titles are lang keys, grep the lang file for the values to find the quest ids). New quest: item task `create:andesite_alloy`, teaching description (note: the vanilla `create:andesite_alloy` recipe was REMOVED by the star_tech layer's mass_removals — find what the ST recipe path is under `kubejs/server_scripts/star_tech/` and describe THAT path), dependency wiring so the chain stays linear.
2. **Remove the "JEI Creative Tab" reward and the "Key Mods" quest** — grep all chapters for these (search terms: `creative`, `key mods`, `Key Mods`, `jei`). Remove the quest object entirely (Key Mods) / the reward object (JEI); fix any quests that depended on the removed quest id (re-point dependencies to its parent).
3. **Ironbound Tome** — find the quest that references the Ironbound Tome (grep `ironbound`; likely `irons_spellbooks:` namespace) and change its task from detect-only to a craft-style item task if it currently auto-grants, and/or add a quest that has the player CRAFT it (item task, `consume: false`). Ensure no reward hands the tome for free.
4. **Tang Clan quests** — Soul Land's Tang Clan items (grep `soulland:` item registry via `kubejs/` data or the reference memory list). Add 3–5 quests to `soul_land_weapons.snbt` (Godlike Power group) covering the Tang Clan weapon/sect items: what they are, how they're obtained, teaching tone. Use existing soulland quests in that chapter as style reference.
5. **Weave Soul Land into the early book** — add 2–3 bridge quests to the FIRST Main Story chapter (`soul_land_awakening.snbt` is already Soul Land; the playtest complaint is the *Campaign/act_0* player never meets it). Add to `act_0.snbt`: a checkmark/item quest pointing players at the Soul Land tab ("Your first soul ring…" style), dependency-free, x/y placed off the main chain.
6. **Compressed iron late-gating** — `pneumaticcraft:ingot_iron_compressed` appears in loot chests too early. Grep `config/` and `kubejs/` for loot refs; the actual fix: add a LootJS removal in `kubejs/server_scripts/loot_drops.js` stripping `pneumaticcraft:ingot_iron_compressed` from vanilla/structure chest tables (coordinate: WS2 also edits that file — append a clearly-commented separate section at the end).

## Verification (run before finishing)
- Brace-balance + duplicate-ID check script across ALL chapter files (any `id:` value appearing twice anywhere = failure).
- `grep -c xp_times_lvl` per Part-A chapter ≥ 80% of its quest count.
- Report → `tasks/reports/03_report.md`.
