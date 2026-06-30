# Dev Notes — Supremacy Modpack

_Last updated: 2026-06-29. This file is the canonical pending-work tracker for future sessions._

---

## ✅ COMPLETED (do not re-do)

- **Main Story quest tab** — 8 chapters complete (soul_land_awakening → the_stars_await)
- **Campaign tab** — act_0–act_v, ascendancy, campaign_talent_rewards, epilogue, repeatables — all ported from C2E2 (identical)
- **Logbook tab** — magical_flora and storage_solutions — ported from C2E2 (identical)
- **Adventure tab** — biome_hopper (24 quests) and structures (19 quests) written
- **Home Sweet Home tab** — farming (C2E2 port) + homestead (19 quests, written this session)
- **MnS data** — full C2E2 talent tree, perks, spells, gems, gear types, affixes, runewords, stat compat (~3,100 files in kubejs/data/mmorpg/)
- **KubeJS attribute registration** — 12 custom MnS attributes in startup_scripts/mns_custom_stats.js (EntityJS required and added)
- **Dimension return system** — server_scripts/dimension_return.js (dungeon_realm, the_harvest, ancient_obelisks)
- **Orechid gate** — gated behind create:polished_rose_quartz in botania_recipies.js
- **Botania manasteel gate** — spirit_iron_ingot → manasteel via mana infusion
- **Blood Magic altar gate** — replaceInput: gold → manasteel in blood_magic_recipes.js
- **Soulland cultivation altar** — remove default + add custom recipe
- **Configs synced** — 204 configs from MYPACK to git, defaultconfigs synced
- **EntityJS + Amendments mods** — both added to mods/
- **KubeJS recipe fixes** — botania spirit_steel→spirit_iron ingot, explorer's compass copper gate, nature's compass spirit iron gate

---

## 🔴 REQUIRES IN-GAME TESTING (cannot be done from editor)

### Soul Ring Speed Nerf
Soul rings (soulland:white_soul_ring through soulland:blue_soul_bone) make the player unplayably fast when equipped via Curios. No config option exists in soulland-common.toml.
**Fix procedure:**
1. Equip a soul ring in-game
2. Run `/data get entity @p` and find the `AttributeModifiers` list on the ring item NBT
3. Note the UUID of the `generic.movement_speed` modifier
4. Write a KubeJS startup_script to remove or override that specific UUID from the player attribute
5. Test that other speed sources (Spartan Weaponry sprint, Paraglider) are unaffected

### Orechid Petal Apothecary Recipe Format
`botania_recipies.js` uses `event.recipes.botania.apothecary(output, ingredients[])`. If Orechid doesn't appear in JEI with create:polished_rose_quartz as ingredient:
- Try `event.recipes.botania.petalApothecary(output, ingredients[])`
- Or add as a data JSON override in `kubejs/data/botania/recipes/`

### Spear Shows as Staff in Mine & Slash UI
The M&S spear weapon type appears as a staff icon. Check `kubejs/data/mmorpg/mmorpg_gear_slot/spear.json` for `model_num` field and compare to staff gear slot — likely wrong model index.

### dimension_return.js Spawn Coordinates
Line 6: `const SPAWN_COORDS = { x: 0, y: 64, z: 0 }` — placeholder. Replace with actual server overworld spawn before multiplayer launch.

### Qi Crystal Recipe Verification
Shapeless recipe (spirit_iron × 2 + amethyst_shard → qi_crystal) may conflict with a mod-native recipe. Verify in JEI that only one recipe exists.

### Snow Queen Trophy ID
`gtceu_progression_gates.js` line 96: uses `twilightforest:ice_bomb` as Snow Queen gate item. Verify correct drop ID in-game — it may be `twilightforest:snow_queen_trophy` or similar.

### Blood-Tempered Coil Mechanic
`kubejs:blood_tempered_coil` is defined and craftable but no GTCEu recipe or config actually uses it as a condition. Either wire it into a meaningful mechanic (EBF temperature unlock via config?) or document its intended purpose and implement it.

---

## 🟡 QUEST BOOK — INCOMPLETE CHAPTERS

### Godlike Power Tab (4FE047BB6D602D58)

#### `alchemy.snbt` — THIN (3 checkmark quests only)
Currently: three informational checkmarks for MnS Alchemy, Spiritual Alchemy, Blood Magic Alchemy.
**Needs:** Item-based quests for:
- MnS Alchemy Station + first potion (item detection: mmorpg:alchemy/station or similar)
- Blood Magic sigil chain (sigil_of_holding, sigil_of_air, sigil_of_augmented_holding)
- Blood Magic ritual progression (ritual_of_regeneration, ritual_of_feather_fall, etc.)
- Soul Land pill crafting at Cultivation Altar (breakthrough_pill, foundation_pill)
- Ars Nouveau elixir brewing
- Target: 15–20 quests with linear dependency chain

#### `jewlery.snbt` — FUNCTIONAL BUT THIN (7 quests, tier 1–6 jewelry souls)
Missing:
- Entry quest explaining Curios ring/necklace slots (how to equip)
- Note about Soul Land soul rings vs M&S jewelry (different systems)
- At least one unique gear jewelry example

#### `armor.snbt` — MOSTLY COMPLETE (20 quests)
Has: Diamond, Netherite, Jade Silk, armor souls Common→Mythic.
Missing:
- Intro explaining armor paths (physical vs Soul vs GT)
- GTCEu plate armor progression (rubber → bronze → steel)
- Note: Tinkers/Silent Gear = tools only, weapons disabled

### Home Sweet Home Tab (1E24DF067925061D)

Three chapters should be added (C2E2 references available to adapt):

1. **Cooking/Culinary chapter** — Farmer's Delight recipes, Pam's HC crops, Mystical Agriculture food crops, Farmer's Respite drinks. C2E2 reference: `culinary_delights.snbt` (1459 lines). Port and adapt — remove C2E2-only items (anything not in our mod list).

2. **Professions chapter** — Mine & Slash profession system (Mining, Farming, Fishing, Woodcutting, Alchemy, Enchanting, Forging). C2E2 reference: `professions.snbt` (1196 lines). High compatibility — M&S professions are the same.

3. **Fishing chapter** — Fishing mechanics, Alex's Mobs aquatic content, Farmer's Delight fish cooking. C2E2 reference: `fishing.snbt` (1521 lines). Port and adapt — remove mods we don't have (Aquaculture 2 is not in our pack).

### Adventure Tab (274C28999D7BBD26)

Both existing chapters now have content but consider adding:

4. **ARPG/Dungeon chapter** — Mine & Slash dungeon map system, Library of Exile atlas maps, map affixes, map device usage, home pearls, dimension_return system. No C2E2 reference maps cleanly (their exploration.snbt references ~10 mods we don't have). Write fresh using our pack's systems. Key items: dungeon_realm:dungeon_map, dungeon_realm:home_pearl, library_of_exile:portal_frame.

### Ungrouped Chapters (need group assignment)
`mechanics.snbt` (group: "") and `welcome.snbt` (group: "") are ungrouped — they float without a tab.
- `mechanics.snbt` = Star Tech GT multiblock tutorials — assign to `"1E0FC4EA21F735F7"` (Star Tech: Main)
- `welcome.snbt` = Server welcome screen — either assign to a tab or confirm it's intentionally ungrouped (welcome screens can work without a group)

---

## 🟠 ORB FORGE — MULTIBLOCKED2 MACHINES NOT BUILT

All 7 machine recipe types are KubeJS-registered but no MBD2 multiblock structure exists yet. The MBD2 editor must define physical block layout, recipe type linkage, and model for each.

| Machine ID | Tier | Notes |
|---|---|---|
| `modpack:basic_modify_station` | ULV/LV | Simplest; build and test first |
| `modpack:hybrid_refinery_bench` | MV/HV | Mid-tier |
| `modpack:cipher_engraving_table` | EV/IV | |
| `modpack:quantum_exaltation_array` | LuV/ZPM | Post-Fusion |
| `modpack:fusion_forge` | UV/UHV | |
| `modpack:nano_reliquary` | UEV/UIV | Endgame |
| `modpack:orb_forge` | Master | Runs all recipes at 4× speed |

---

## 🟠 ORB FORGE — UNWIRED LOOT DROPS

These Orb Forge input items have no loot source — players can't obtain them without creative mode. Wire them via `kubejs/server_scripts/loot_drops.js` using LootJS, or add data JSON overrides.

| Item | Intended Source |
|---|---|
| `kubejs:blaze_touched_residue` | Blaze / Wither Skeleton kills in Nether |
| `kubejs:undergarden_reagent` | Undergarden mob drops (general) |
| `kubejs:undergarden_boss_drop` | Undergarden miniboss (Grottol or Forgotten) |
| `kubejs:everbright_trophy` | Blue Skies Everbright boss |
| `kubejs:everdawn_trophy` | Blue Skies Everdawn boss |
| `kubejs:hidden_chest_relic` | Hidden chests in structures (loot table injection) |
| `kubejs:map_boss_drop` | M&S endgame Atlas map bosses → override in `kubejs/data/mmorpg/loot_tables/` |
| `kubejs:map_completion_token` | M&S Atlas map completion → override in `kubejs/data/mmorpg/loot_tables/` |
| `kubejs:endgame_boss_token` | Repeatable endgame boss (define which one) |

---

## 🟠 MISSING TEXTURES (22 PNG files)

All these items render as purple missing-texture until PNGs are provided. All must be 16×16.

### `kubejs/assets/kubejs/textures/item/`
`blood_tempered_coil.png`, `bone_knapping_tool.png`, `horseshoe.png`, `flint_pickaxe.png`, `flint_pickaxe_head.png`, `flint_axe.png`, `flint_axe_head.png`, `flint_shovel.png`, `flint_shovel_head.png`, `flint_sword.png`, `flint_sword_blade.png`, `flint_hoe.png`, `flint_hoe_head.png`

### `kubejs/assets/kubejs/textures/item/orb_forge/`
`blaze_touched_residue.png`, `endgame_boss_token.png`, `everbright_trophy.png`, `everdawn_trophy.png`, `hidden_chest_relic.png`, `map_boss_drop.png`, `map_completion_token.png`, `undergarden_boss_drop.png`, `undergarden_reagent.png`

---

## 🟡 GTCEu ITEM ID UNCERTAINTIES (verify in JEI before testing)

| Script | Item Used | May Actually Be |
|---|---|---|
| `orb_forge/tier_3_ev_iv.js` | `gtceu:ev_integrated_circuit` | `gtceu:ev_circuit` |
| `orb_forge/tier_3_ev_iv.js` | `gtceu:iv_sensor` | `gtceu:sensor_iv` |
| `orb_forge/tier_4_luv_zpm.js` | `gtceu:zpm_integrated_circuit` | `gtceu:zpm_circuit` |
| `orb_forge/tier_4_luv_zpm.js` | `gtceu:zpm_mainframe` | unknown — check JEI |
| `orb_forge/tier_5_uv_uhv.js` | `gtceu:helium_plasma_bucket` | `gtceu:helium_plasma` |
| `orb_forge/tier_5_uv_uhv.js` | `gtceu:uhv_integrated_circuit` | unknown — check JEI |
| `orb_forge/tier_5_uv_uhv.js` | `gtceu:uhv_mainframe` | unknown — check JEI |
| `orb_forge/tier_6_uev_uiv.js` | `gtceu:uiv_integrated_circuit` | unknown — check JEI |
| `gtceu_progression_gates.js:96` | `twilightforest:ice_bomb` | `twilightforest:snow_queen_trophy` |

---

## 🟡 STAR TECHNOLOGY CONFIGS NOT EVALUATED

Star Tech has 143 config files at:
`/Users/evancyrulik/Downloads/IGNORE FOR GIT!!! - Star Technology/Star Technology-1.20.1-THETA-1-HOTFIX-3/overrides/config/`

MYPACK's configs were synced (likely incorporating many ST configs) but a direct diff has not been done. In particular, check:
- Mine & Slash difficulty/drop rate settings
- GTCEu recipe changes Star Tech makes that we may want
- Any mod compatibility overrides (e.g., Apotheosis, Create, AE2)

---

## 📁 KEY FILE LOCATIONS (quick reference)

```
kubejs/server_scripts/
  gtceu_progression_gates.js     — boss trophy gates, Primitive BF gate
  botania_recipies.js            — Orechid, Manasteel, Charged Qi Crystal, Living Mana Core
  blood_magic_recipes.js         — Altar gate (manasteel), Soul Rune, Living Circuit, Blood Coil
  soulland_recipes.js            — Cultivation Altar, Qi Crystal, compass gates
  dimension_return.js            — ARPG dimension teleport (SPAWN_COORDS = placeholder)
  orb_forge/tier_1 through 7    — Orb Forge currency recipes (need MBD2 machines)

kubejs/startup_scripts/
  mns_custom_stats.js            — 12 custom MnS attributes + EntityJSEvents.attributes
  items.js                       — flint tools, horseshoe, bone_knapping_tool
  convergence_items.js           — charged_qi_crystal, soul_rune, living_circuit_board,
                                   living_mana_core, triune_catalyst, blood_tempered_coil
  orb_forge_machines.js          — registers 7 MBD2 machine recipe types (structures not built)

config/ftbquests/quests/chapters/
  Main Story (66B93D):  soul_land_awakening, soul_land_cultivation, industrial_soul_refinement,
                        voltage_and_vitality, sovereign_circuits, through_the_veil,
                        event_horizon, the_stars_await
  Adventure (274C28):  biome_hopper, structures
  Home Sweet (1E24DF): farming, homestead
  Godlike (4FE047):    alchemy (THIN), armor, jewlery, soul_land_weapons
  Campaign (1E3C4B):   act_0-v, ascendancy, campaign_talent_rewards, epilogue, repeatables
  Logbook (5F2CCE):    magical_flora, storage_solutions
  Star Tech tabs:      READ-ONLY — never edit
```
