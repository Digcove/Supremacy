# WS7 Report — Extended Crafting Capstones

## Files created / modified

- **Created** `kubejs/server_scripts/extended_crafting_capstones.js` — table gates + 11 capstone recipes (all EC recipes via `event.custom({ type: 'extendedcrafting:shaped_table', ... })` per the fallback note; the four table recipes are vanilla `event.shaped` 3x3s).
- **Modified** `kubejs/server_scripts/ars_nouveau_recipes.js` — old Triune Catalyst Enchanting Apparatus recipe commented out with a pointer to the new EC recipe.
- **NOT modified** `kubejs/server_scripts/convergence_recipes.js` — see Deviations.

## Table gates (vanilla 3x3; EC defaults removed by output id, frames/catalysts/black-iron recipes kept)

| Table | GT gate | Recipe |
|---|---|---|
| `extendedcrafting:basic_table` | MV | 6x `gtceu:aluminium_plate`, 2x `create:precision_mechanism`, `minecraft:crafting_table` core |
| `extendedcrafting:advanced_table` | HV | 4x `gtceu:stainless_steel_plate`, 2x `botania:manasteel_ingot`, 2x `kubejs:charged_qi_crystal`, Basic Table core |
| `extendedcrafting:elite_table` | IV | 4x `gtceu:tungsten_steel_plate`, 2x `bloodmagic:demonslate`, 2x `kubejs:living_circuit_board`, Advanced Table core |
| `extendedcrafting:ultimate_table` | ZPM | 4x `gtceu:naquadah_alloy_plate`, 2x `ars_nouveau:wilden_tribute`, 2x `kubejs:triune_catalyst`, Elite Table core |

Auto Tables inherit the gates (each consumes its matching table); their stock recipes were left alone.

## Capstone recipes (exact ingredient counts, from validated patterns)

| # | Output | Grid (EC tier) | Ingredients |
|---|---|---|---|
| 1 | `modpack:basic_modify_station` | 5x5 (2) | 1 `gtceu:lv_machine_hull`, 8 `gtceu:steel_plate`, 4 `gtceu:basic_electronic_circuit`, 4 `botania:manasteel_ingot`, 4 `kubejs:soul_rune`, 4 `mmorpg:stone/1` |
| 2 | `modpack:hybrid_refinery_bench` | 5x5 (2) | 1 `gtceu:mv_machine_hull`, 8 `gtceu:stainless_steel_plate`, 4 `gtceu:good_electronic_circuit`, 4 `kubejs:charged_qi_crystal`, 4 `botania:mana_pearl`, 4 `mmorpg:stone/2` |
| 3 | `modpack:cipher_engraving_table` | 7x7 (3) | 1 `gtceu:ev_machine_hull`, 12 `gtceu:titanium_plate`, 4 `gtceu:quantum_processor`, 4 `kubejs:blood_tempered_coil`, 4 `kubejs:living_circuit_board`, 4 `kubejs:soul_rune`, 4 `mmorpg:stone/3` |
| 4 | `modpack:quantum_exaltation_array` | 7x7 (3) | 1 `gtceu:luv_machine_hull`, 12 `gtceu:naquadah_alloy_plate`, 4 `gtceu:wetware_processor`, 4 `kubejs:blood_tempered_coil`, 4 `kubejs:living_mana_core`, 4 `kubejs:charged_qi_crystal`, 4 `mmorpg:stone/4` |
| 5 | `modpack:fusion_forge` | 7x7 (3) | 1 `gtceu:uv_machine_hull`, 12 `gtceu:neutronium_plate`, 4 `gtceu:wetware_processor_computer`, 4 `kubejs:blood_tempered_coil`, 4 `botania:gaia_ingot`, 4 `kubejs:living_mana_core`, 4 `mmorpg:stone/5` |
| 6 | `modpack:nano_reliquary` | 9x9 (4) | 1 `gtceu:uev_machine_hull`, 32 `gtceu:neutronium_plate`, 4 `gtceu:wetware_processor_mainframe`, 4 `kubejs:blood_tempered_coil`, 8 `botania:gaia_ingot`, 4 `ars_nouveau:wilden_tribute`, 4 `kubejs:charged_qi_crystal`, 4 `kubejs:triune_catalyst`, 4 `mmorpg:stone/5` |
| 7 | `modpack:orb_forge` | 9x9 (4) | 1 `gtceu:uiv_machine_hull`, 28 `gtceu:naquadah_alloy_plate`, 4 `gtceu:wetware_processor_mainframe`, 8 `kubejs:blood_tempered_coil`, 8 `kubejs:living_circuit_board`, 4 `kubejs:soul_rune`, 4 `kubejs:charged_qi_crystal`, 4 `kubejs:living_mana_core`, 4 `kubejs:triune_catalyst`, 4 `mmorpg:stone/5` — all five convergence items at once |
| 8 | `kubejs:triune_catalyst` x2 | 7x7 (3) | 4 `botania:terrasteel_ingot`, 4 `botania:mana_pearl`, 12 `ars_nouveau:source_gem`, 4 `ars_nouveau:wilden_horn`, 4 `bloodmagic:demonslate`, 4 `bloodmagic:blankslate`, 1 `soulland:soul_crystal` (center, preserving the old recipe's core) |
| 9 | `botania:terrasteel_block` x3 | 7x7 (3) | 18 `botania:terrasteel_ingot`, 8 `botania:elementium_ingot`, 4 `gtceu:fine_platinum_wire`, 1 `botania:mana_pearl` — 27 ingots out for 18 in (+50% bulk bonus; bootstrap terrasteel still requires normal Botania progression) |
| 10 | `megacells:cell_component_256m` x2 | 9x9 (4) | 8 `megacells:cell_component_64m` (exactly 2x256M worth — component-cost-neutral alternate), 24 `ae2:fluix_block`, 4 `ae2:quartz_block`, 5 `ae2:singularity`, 2 `ae2:quantum_entangled_singularity`, 4 `gtceu:wetware_processor_mainframe`, 4 `kubejs:living_mana_core` |
| 11 | `dungeon_realm:uber_fragment` | 9x9 (4) | One circuit from EVERY GT tier: 2 LV `basic_electronic_circuit`, 2 MV `good_electronic_circuit`, 1 HV `advanced_integrated_circuit`, 1 EV `quantum_processor`, 1 IV `crystal_processor`, 1 LuV `wetware_processor`, 1 ZPM `wetware_processor_assembly`, 1 UV `wetware_processor_computer`, 2 UHV `wetware_processor_mainframe` + one item from EVERY magic mod: 2 `botania:terrasteel_ingot`, 1 `bloodmagic:demonslate`, 1 `ars_nouveau:wilden_tribute`, 2 `soulland:soul_forged_ingot`, 2 `naturesaura:sky_ingot`, 1 `occultism:afrit_essence`, 1 `forbidden_arcanus:stellarite_piece` + 1 `mmorpg:stone/5` core |

Every capstone mixes >=1 GT + >=1 magic ingredient; `kubejs:blood_tempered_coil` (previously a dead-end item) appears in all five controller recipes of EC tier 3+.

## Decisions

1. **Triune Catalyst migration**: apparatus recipe removed (commented) so EC is the catalyst's only source; yields 2/craft since Ultimate Table (2) + Nano Reliquary (4) + Orb Forge (4) consume ~10 total.
2. **`bloodmagic:masterslate` does not exist** in Blood Magic 1.20.1-3.3.7 (tiers: blankslate / reinforcedslate / infusedslate / demonslate / etherealslate). Substituted **`bloodmagic:demonslate`** (T4 "Demonic Slate") for the Elite Table gate.
3. **Epilogue crowning item = `dungeon_realm:uber_fragment`**, not the Snow Queen trophy. The epilogue's final item task is `twilightforest:snow_queen_trophy`, but a trophy recipe would let players complete a boss-kill quest without the kill (combat-gate bypass, conventions violation). The Uber Fragments (4 required by the epilogue's opening quests, otherwise dungeon RNG) are the chapter's true gate and got the "every magic mod + every GT tier" 9x9.
4. **AE2 endgame pick**: `megacells:cell_component_256m` (top craftable storage component in pack; ExpandedAE adds no storage components). Stock MEGA recipe untouched — this is an additive bulk alternate at 2x output.
5. Controllers had **no existing recipes** (MBD2 registration only), so no removals were needed for outputs 1–7; nothing else duplicates a gated recipe.
6. Table gates use vanilla `event.shaped` (they're 3x3; the Basic Table must be craftable before any EC table exists). EC defaults removed **by output id**, keeping frame/catalyst/black-iron material recipes.

## Deviation from task file / coordination notes

- The coordination note said the old triune recipe lived in `convergence_recipes.js`; it actually lives in **`ars_nouveau_recipes.js`** (convergence_recipes.js only holds the soul_forged_ingot recipe). The minimal comment-out edit was made in `ars_nouveau_recipes.js`; **`convergence_recipes.js` was left completely untouched** for the other workstream that appends to it.

## Validation performed

- Script parsed and executed under a Node harness stubbing `ServerEvents.recipes` (ES5/Rhino-safe syntax, no ES modules): all patterns are exactly 5x5 / 7x7 / 9x9 per declared tier, every pattern char has a key, every key is used, all rows equal length. `ars_nouveau_recipes.js` still parses.
- Item ids verified by grepping `kubejs/` usage and jar contents in the live instance (`models/item/*.json` + lang): all `gtceu:` circuit/hull/plate ids, `mmorpg:stone/0..5` (from Mine_and_Slash jar), all `botania:`, `bloodmagic:`, `ars_nouveau:`, `soulland:`, `ae2:` (incl. `quartz_block`, `singularity`, `quantum_entangled_singularity`), `megacells:cell_component_64m/256m` (namespace `megacells` confirmed), `naturesaura:sky_ingot`, `occultism:afrit_essence`, `forbidden_arcanus:stellarite_piece` (namespace `forbidden_arcanus` confirmed), `dungeon_realm:uber_fragment`.

## Flagged for in-game verification

- **All `extendedcrafting:` ids and the recipe format** — the EC 6.0.10 jar is not local (packwiz metafile only). Verify: item ids `basic_table` / `advanced_table` / `elite_table` / `ultimate_table`, recipe type `extendedcrafting:shaped_table`, and that the `tier: 2|3|4` field locks recipes to the intended table. Also confirm the default-table-recipe removals took (JEI: no black-iron route left).
- **GT circuit tier assignments** (item ids exist in the gtceu jar; the tier mapping is from GTCEu canon): `quantum_processor`=EV, `crystal_processor`=IV, `wetware_processor`=LuV, `wetware_processor_assembly`=ZPM, `wetware_processor_computer`=UV, `wetware_processor_mainframe`=UHV. Check JEI tooltips.
- `gtceu:steel_plate`, `gtceu:fine_platinum_wire` — ids follow the verified material-part pattern (`fine_<mat>_wire` confirmed for other materials) but weren't individually confirmed.
- `modpack:*` controller items as EC recipe **results** — the MBD2 multiblock block-items should stack/craft fine, but confirm the crafted item places the controller.
- Recipe 10 consumes 2 `ae2:quantum_entangled_singularity` (which come in entangled pairs) — confirm this feels acceptable in play or swap for `ae2:singularity`.

## Adjacent issue noticed (out of scope, not touched)

`kubejs/server_scripts/orb_forge/tier_*.js` reference several `gtceu:` ids that do **not** exist in the gtceu 7.5.3 jar: `ev_integrated_circuit`, `zpm_integrated_circuit`, `uhv_integrated_circuit`, `uiv_integrated_circuit`, `uhv_mainframe`, `zpm_mainframe`, and both `gtceu:iv_sensor` / `gtceu:sensor_iv` (only `iv_sensor` is real). Those MBD2 recipes will silently never match. Recommend a follow-up fix using the verified circuit names above.
