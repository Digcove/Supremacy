# WS4 Report — Gem Shop + Economy Sink

## Files created (no existing files edited)

- `config/ftbquests/quests/reward_tables/` (NEW directory, 7 tables, order_index 0–6):
  - `skill_gem_box.snbt` — id `4B4B045EBC331690` / table_id `5425434981028796048` — 13 common Augment (AURA) gems, adapted from C2E2 `aura_gem_shop_i/ii` + 8 additions (armor, dodge, guardian, ele_res, chaos_res, block, critical_damage, summon_dmg)
  - `support_gem_box.snbt` — id `4B4B769D88565585` / table_id `5425560595067196805` — 18 common SUPPORT gems, adapted from C2E2 `support_gem_shop_i` + aoe_dmg
  - `rune_box.snbt` — id `4B4B8E2196C562D5` / table_id `5425586451012477653` — 10 low/mid runes (ita mos nos cen dos eno fey har toq xer)
  - `salvage_box.snbt` — id `4B4B873CEBD15F62` / table_id `5425578871822049122` — 11 entries: MnS crafting orbs, socket adder, gem extractor, sharpening stones, 16× salvage stone t2, currency chest
  - `gear_box_midgame.snbt` — id `4B4B82A27CF1DC63` / table_id `5425573810490432611` — 6 Rare Lv.30 `roe_weapons:*_3` with `mmorpg_gear` NBT (copied from C2E2 `first_weapon`, lvl 3→30, item tier _2→_3), + rare weapon/armor stat souls + rare gear chest
  - `gear_box_endgame.snbt` — id `4B4B113A2C25DDFB` / table_id `5425449117644348923` — 6 Lv.60 `roe_weapons:*_5` weapons, epic souls, epic gear chest, + the three `/mine_and_slash give unique_gear @p random 60|80|100 1` command entries copied verbatim from C2E2 `randomized_unique_shop`
  - `armory_crate.snbt` — id `4B4B613541390B54` / table_id `5425537057453312852` — 5 TACZ guns as `tacz:modern_kinetic_gun` + `{GunId:"..."}`: `destiny:ace_of_spades`, `destiny:suros_regime`, `destiny:whisper`, `zeta:apw1`, `zeta:ac7`
- `config/ftbquests/quests/chapters/gem_shop.snbt` — chapter id `4B4B017BC8C554F5`, group `1E3C4B5FFAE48A39` (Campaign), order_index 9, filename `gem_shop`. 10 quests: 1 intro checkmark (teaching: how the shop works, coin sources, 10:1 exchange, permanence of the sink) + 9 repeatable stalls (`can_repeat: true`, `consume_items: true` coin tasks). Layout: intro gear-shape at x=0/y=0, row 1 (y=2.5) five stalls x −5…+5, row 2 (y=5.0) four stalls x −3.75…+3.75.

## Price ladder (final)

| Stall | Price | Table |
|---|---|---|
| Field Rations | 5 iron | direct item rewards (bread/golden carrot/cooked beef) |
| Angler's Bundle | 8 iron | direct item rewards (MnS t0 profession mats + 8 salvage stones) |
| Augment Gem Box | 32 gold | skill_gem_box |
| Support Gem Box | 48 gold | support_gem_box |
| Rune Box | 4 emerald | rune_box |
| Salvage Box | 6 emerald | salvage_box |
| Gear Box — Mid Game | 1 diamond | gear_box_midgame |
| Gear Box — Endgame | 5 diamond | gear_box_endgame (incl. random uniques) |
| Armory Crate | 2 netherite | armory_crate |

## Decisions / deviations from task file

1. **7 tables, not 8** — the spec caps tables at 5–7 and its own bullet list enumerates exactly 7 (support, skill/aura, rune, salvage, gear×2, armory). To still provide the iron-coin food/fishing tier required by Deliverable 2's price ladder, the two iron stalls use plain multi-item rewards instead of choice tables. Every gold-tier-and-up stall uses `{type: "choice", table_id: …, exclude_from_claim_all: true}` as specified.
2. **Random Unique shop folded into the Endgame Gear Box** rather than a separate quest+table (would have been an 8th table). The three C2E2 command entries are inside `gear_box_endgame.snbt`.
3. **10 quests** (spec: 10–12) — bottom of the allowed range, consequence of decision 1.
4. **Endgame weapon NBT kept `"rar":"rare"` at lvl 60** rather than inventing epic affix sets; epic-tier excitement comes from epic souls/chest and the random uniques. Fixed-NBT affix rolls copied from C2E2 are proven-valid structures.
5. **Armory guns chosen to avoid overlap** with the boss-drop themed guns already in `kubejs/server_scripts/loot_drops.js` (gjallarhorn, thorn, ice_breaker, sleeper_simulant, las98, mgx42, quasar, railgun, fakelorant ×4, warhammer ×4 are boss drops — the crate offers 5 different ones). Ghoul's Guns / `hamster` namespace not referenced (removed per WS1).
6. **Stall gating**: all stalls depend only on the in-chapter intro checkmark (no cross-chapter dependency ids), unlike C2E2 which gates stalls behind campaign acts. Prices gate access naturally via coin tiers.

## Verification performed

- **All ids `4B4B` + 12 hex, 43 total, all unique**; full sweep across every chapter (including new WS5 `armory.snbt` 5C5C, `commerce.snbt` 5E5E, welcome 5D5D, jewlery 5F5F) + reward_tables: no collisions.
- **Every `table_id` decimal ↔ hex table id pairing recomputed** (signed 64-bit) and matched to the right file — all 7 correct.
- All item/data ids verified against this pack: MnS 6.3.14 (same version as C2E2), all 31 gem ids present in `kubejs/data/mmorpg/mmorpg_support_gem|mmorpg_aura`, all 10 runes in `mmorpg_runes`, all affix/implicit ids in `mmorpg_affixes`, `roe_weapons` tiers _3/_5 present in RoE_Weapons-0.1.7.jar, gun ids read from the live-instance pack zips' `data/<ns>/index/guns/` (all lowercase, verified). `{GunId:"..."}` NBT format matches `loot_drops.js`.
- snbt hygiene: tab indentation, LF, no trailing whitespace, brace/bracket balanced, escaped `mmorpg_gear`/`mmorpg_skill_gem` JSON strings all parse.

## Flagged for in-game verification

- Choice rewards granting NBT-tagged items (`mmorpg_gear`, `mmorpg_skill_gem`, `GunId`) render and give correctly from the reward-table picker.
- `roe_weapons:*_3` / `*_5` sprites and the lvl 30/60 stat scaling on the fixed-NBT weapons.
- The three `unique_gear` command rewards run with elevated perms on a server.
- Repeatable consume-task stalls correctly re-arm after claiming (FTB Quests `can_repeat` + `consume_items`).

## PRE-EXISTING BLOCKER (not from WS4 — needs orchestrator/WS3 attention)

**Nine duplicate quest ids exist between `chapters/ae2.snbt` and `chapters/voltage_and_vitality.snbt`: `AE01000000000001` … `AE01000000000009`** (hand-authored sequential ids used in both files). Per the conventions, any duplicate id crashes the quest book on load. This predates WS4 and is untouched by it, but it will mask/break testing of everything else until fixed.

## Economy pricing pass

Method: parsed every chapter, summing Lightman coins that appear inside `rewards:` blocks only (consume-tasks excluded, so the Star Tech `shop.snbt` buy-stalls don't inflate the numbers). Values normalized to iron coins (copper=0.1, iron=1, gold=10, emerald=100, diamond=1,000, netherite=10,000).

**Total coin faucet across the book: ~1,042,000 iron-coin value (~104 netherite) for a completionist playthrough.** Repeatable coin faucets are negligible (~10 iron value; the void-worm kill quest in `repeatables.snbt` pays 1 diamond per 30 endgame boss-mob kills — fine).

Per-stage earnings vs. shop prices:

| Stage | Chapters | Cumulative faucet | Per-session est. | Relevant stalls | Buys/session |
|---|---|---|---|---|---|
| Early (Acts 0–II, first machines) | act_0/i/ii, early_game, farming, magical_flora, industrial_revolution, misc | ~920 iron (92 gold) | ~50–90 iron | Field Rations 5i, Angler's 8i | several — intended, food is low-value |
| Mid (Acts III–IV, LV–HV, PL1–3) | act_iii/iv, pl1–3, voltage_and_vitality, automation_age, futuristic_mechanisms, soul-land mid, storage_solutions, commerce | ~27,000 iron (270 emeralds) | ~100–150 gold | Augment 32g, Support 48g, Rune 4em, Salvage 6em | ~1–3 gem boxes or 1–2 emerald boxes |
| Late (Act V, EV+, dimensions, PL4–5) | act_v, pl4/5, sovereign_circuits, adventures_in_abydos, epilogue, armory, prep_dim_travel | ~89,000 iron (89 diamonds) | ~4–5 diamonds | Mid Gear 1d, End Gear 5d, Armory 2n | ~1 gear box/session; Armory after saving ~4 sessions |
| Endgame (Star Tech late) | applied_energistics, draconic_age_part_1, nuclear_fission, event_horizon, the_stars_await | ~925,000 iron (92 netherite) | very high | End Gear, Armory | effectively unlimited |

The mid-game target from the spec (≈1 gem box per session, not 20) holds at 32/48 gold given ~100–150 gold/session mid-game income — and gold also competes with the Star Tech resource shop (`shop.snbt`, Star Tech: Extra tab), which is the other sanctioned sink.

**Inflationary chapters flagged (NOT edited — WS3 owns reward tuning):**

1. `the_stars_await.snbt` — 47 netherite coins (470k iron; 45% of the entire book's coin value)
2. `nuclear_fission.snbt` — 21 netherite (210k)
3. `applied_energistics.snbt` — 126 diamond (126k)
4. `draconic_age_part_1.snbt` — 89 diamond (89k)
5. `event_horizon.snbt` — 30 diamond (30k)

These five Star-Tech-era chapters carry ~89% of all coin value. Once a player enters them, every shop price is trivial; if WS3 wants the sink to bite in the endgame, halving the netherite payouts in (1) and (2) would still leave ~60 netherite lifetime income. Shop prices were left tuned to the pre-Star-Tech curve, where the sink actually constrains choices; the Armory Crate at 2 netherite is deliberately the first "save up for it" purchase when netherite coins start arriving. `armory.snbt` (new, 25.4k iron ≈ 25 diamonds) is generous but positioned late and one-time — acceptable.

No packwiz refresh run, nothing committed (per coordination notes).
