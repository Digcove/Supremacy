# WS7 — Extended Crafting Capstones (extreme recipes)

Read `tasks/00_conventions.md` first. No quest edits — pure KubeJS. Depends on WS1 having added Extended Crafting (file authoring can proceed regardless).

## Deliverable: `kubejs/server_scripts/extended_crafting_capstones.js`

Header comment explaining the design: Extended Crafting tables are the pack's "extreme crafting" layer — capstone items require 5×5/7×7/9×9 recipes that pull from tech AND magic simultaneously.

### 1. Gate the EC tables themselves
- Basic Table (3×3+): craftable at MV — `gtceu:aluminium_plate` + Create precision mechanism + vanilla crafting table core.
- Advanced (5×5): HV — stainless plates, `kubejs:charged_qi_crystal`, Botania manasteel.
- Elite (7×7): IV — tungsten steel, `kubejs:living_circuit_board`, Blood Magic master slate (verify id `bloodmagic:masterslate`).
- Ultimate (9×9): ZPM — naquadah alloy (verify), `kubejs:triune_catalyst`, Ars Nouveau wilden tribute-tier item (verify id).
Remove EC's default table recipes first (`event.remove({ mod: 'extendedcrafting' })` is too broad — remove by output id per table; keep EC's material recipes like frames/catalysts unless they bypass the gates, in which case GT-ify them).

### 2. Capstone recipes (~10; 7×7 elite / 9×9 ultimate)
Syntax: try `event.recipes.extendedcrafting.shaped_table(output, pattern, key, tier)`; fallback `event.custom({type:'extendedcrafting:shaped_table', tier: 3|4, pattern:[...], key:{...}, result:{...}})`. (EC 1.20.1 KubeJS plugin — if `shaped_table` binding errors are possible, prefer `event.custom` for all, it is guaranteed.)

| # | Output | Tier | Ingredient theme |
|---|---|---|---|
| 1–7 | the 7 Orb Forge controllers (`modpack:basic_modify_station` … `modpack:orb_forge`) | ladder: basic=5×5 … orb_forge=9×9 | matching GT-tier hulls/circuits + convergence items (`kubejs:soul_rune`, `charged_qi_crystal`, `living_mana_core`) + MnS salvage stones (`mmorpg:` ids — grep kubejs/data for real ids) + **`kubejs:blood_tempered_coil` in every recipe tier 3+** (this finally wires the dead-end item) |
| 8 | `kubejs:triune_catalyst` | 7×7 | replace/supplement its current recipe: Botania terrasteel + Blood Magic + Ars Nouveau cores (check `convergence_recipes.js` for the current recipe — MOVE it to EC, remove the old one) |
| 9 | Botania capstone: `botania:gaia_pylon`-adjacent or Terrasteel block route — pick the highest-value craftable that doesn't break Botania's own progression (candidate: a cheaper-materials-but-EC-table route to `botania:life_essence` alternatives is NOT ok; instead do a Supremacy-exclusive: `botania:mana_fluxfield` is too minor — choose `botania:terrasteel_block` from terrasteel+mana items as a bulk EC recipe) | 7×7 | terrasteel, elementium, mana pearls, GT fine wires |
| 10 | AE2 endgame: `expandedae:` or MEGA cell component — pick the top craftable storage component and add an ALTERNATE bulk EC recipe (2× output) | 9×9 | certus/fluix blocks, GT circuits, singularity-style cores |
| 11 | Epilogue trophy: pick the Campaign epilogue's crowning item (grep `epilogue.snbt` for its final item task) and give it an EC route if it currently has none | 9×9 | one ingredient from every magic mod + every GT tier |

Rules:
- Every capstone mixes ≥1 tech ingredient (GT) and ≥1 magic ingredient (Botania/Blood/Ars/Soul Land). That's the pack thesis.
- Verify EVERY item id by grepping `kubejs/`, `mods/` metafile names, or the live instance. Unverifiable → report list.
- If an output would duplicate/bypass an existing gated recipe, REMOVE the old recipe in this script (comment why).
- No new `kubejs:` items. If a recipe concept needs one, redesign around existing items.

## Verification
- Script loads under Rhino syntax rules used by the other server scripts (const/let fine, no ES modules).
- Report → `tasks/reports/07_report.md` with the full recipe table + unverified ids.
