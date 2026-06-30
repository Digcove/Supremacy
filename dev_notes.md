# Dev Notes — Pending Recipe/Quest Changes

## ✅ Done This Session
- **Talent tree missing**: Ported full C2E2 Mine & Slash data (3,100+ files: talent tree, perks, spells, gems, gear types, affixes, runewords, stat compat, etc.) into `kubejs/data/mmorpg/`
- **MnS custom attributes**: Added `mns_custom_stats.js` — registers `kubejs:move_speed`, `kubejs:critical_hit`, etc. (needed for talent tree kube_* perk nodes)
- **ROE soul capability**: ROE weapons were already mapped in C2E2's `mmorpg_base_gear_types` data, now ported to pack
- **Amendments mod**: Added `amendments-1.20-2.2.5.jar` to mods
- **Orechid gate**: Removed default Orechid petal apothecary recipe, re-added with `create:polished_rose_quartz` as required ingredient (gates Orechid behind Create progress)
- **Primitive Blast Furnace**: Already gated behind Create — `gtceu_progression_gates.js` replaces Firebricks with Precision Mechanism
- **Botania spirit iron ingot**: Fixed wrong ingot ID (`spirit_steel` → `spirit_iron`) in `botania_recipies.js`
- **Cultivation Altar dupe**: Added `event.remove` to clear default soulland altar recipe before adding ours
- **Dimension return system**: Added `dimension_return.js` — saves coords before entering dungeon_realm/the_harvest/ancient_obelisks, returns via Library of Exile block or home pearl
- **Configs synced**: All 192 missing MYPACK configs now in git repo; defaultconfigs synced
- **EntityJS**: Added `entityjs-0.6.9-1.20.1.jar` to mods (required for `EntityJSEvents.attributes`)

## ⚠️ Needs In-Game Investigation

### Soul Ring Speed Nerf
Soul rings (`soulland:white_soul_ring`, `soulland:yellow_soul_ring`, `soulland:purple_soul_ring`, etc.) grant excessive movement speed when equipped via Curios.
**To fix**: Get the ring in-game, use `/data get entity @s` or F3+H to inspect the item's NBT `AttributeModifiers` array. Copy the UUID of the `generic.movement_speed` modifier. Then add a KubeJS startup script that removes or reduces that specific attribute modifier by UUID using the EntityJS attribute API.

### Spear Shows as Staff
The Mine & Slash spear weapon type appears as a staff in UI. Check `kubejs/data/mmorpg/mmorpg_gear_slot/spear.json` vs the actual gear slot definition. May need a `model_num` or icon fix.

### Dimension Return Spawn Coords
`dimension_return.js` has `SPAWN_COORDS = { x: 0, y: 64, z: 0 }` as placeholder. Set actual server spawn coords before multiplayer use.

## 📋 Still Pending

### KubeJS Recipes

#### Qi Crystal
Add a recipe or mob drop source for `soulland:qi_crystal`.
(Currently: `kubejs/server_scripts/soulland_recipes.js` has a shapeless recipe using spirit iron + amethyst — verify this is working in-game)

#### Blood Magic Altar
Change Blood Altar recipe to require Manasteel Ingot instead of Gold Ingot.

### Quest Book (Remaining Tabs)
Need to write chapters for:
- **Home Sweet Home tab** — base building, storage solutions, quality of life
- **Adventure tab** — exploration, bosses, dungeons
- **Godlike Power tab** — endgame automation, GTCEu late tiers
- Several Star Tech chapters in Extra/Chemistry tabs need reviewing

### Progression Tuning
Create progression should come earlier (before or during Botania chapter). Consider reordering Chapter 2 or adding a Create prerequisite to industrial_soul_refinement.

### Pack Balance
- Nerf soul ring speed (see In-Game Investigation above)
- Review Mine & Slash talent tree node values (ported from C2E2, may need Supremacy-specific tuning)
