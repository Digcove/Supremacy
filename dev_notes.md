# Dev Notes — Supremacy Modpack

_Last updated: 2026-07-12. This file is the canonical pending-work tracker for future sessions._

---

## ✅ 2026-07-12 FINISH PASS (WS1–WS8; task specs in `tasks/`, agent reports in `tasks/reports/`)

- **Pack renamed** "Supremacy" v1.0.0 in pack.toml.
- **Guns are THE late-game weapon (hybrid gating)**: `tacz_gating.js` re-recipes all 53 default TACZ
  guns with GT materials (HV pistols/shotguns → EV SMG/rifles → IV/LuV DMR/LMG → ZPM snipers/heavy);
  4 themed packs (Destiny, Helldivers/zeta, Warhammer, Fakelorant) are drop-only via boss kills, MnS
  map dimensions, and the Gem Shop Armory Crate; `tacz/supremacy_gunpack/` filter fallback. Ghoul's
  Guns REMOVED (upstream file is asset-only, zero guns); Fakelorant hash fixed (was byte-copy of Ghoul's).
- **New chapters**: `armory` (Adventure, 5C5C ids), `commerce` (Home Sweet Home, 5E5E), `gem_shop`
  (Campaign, 4B4B, + NEW `quests/reward_tables/` with 7 choice tables), `welcome` rewritten (5D5D,
  DEV NOTEs gone, FAQ/divergences/death-recovery), jewlery +4 / armor +3 fills (5F5F).
- **Reward audit**: Star Tech chapters confirmed 100% MnS XP coverage; 225 coin rewards added to the
  11 zero-coin chapters; fixed double-`rewards:` key bug in multiblock_mechanics + nuclear_chemistry;
  fixed crash-class duplicate quest ids (AE01×9 across ae2/voltage_and_vitality; IV02 in sovereign_circuits).
- **Playtest-2 applied** (professions KEPT by decision): Ironbound Tome `only_from_crafting`, Tang Clan
  id fixes + 4 quests, 3 Soul Land bridge quests in act_0, compressed-iron chest strip, flint compass cut.
- **Extended Crafting**: table gates on the GT ladder + 11 capstone recipes (7 Orb Forge controllers
  get their first recipes; triune_catalyst migrated to 7×7; blood_tempered_coil wired into every tier-3+
  capstone — dead-end item resolved; epilogue Uber Fragment 9×9).
- **Balance**: `config/incontrol/spawn.json` (C2E2 rules); Gateways `supremacy_endgame` 4-wave gate →
  `kubejs:endgame_boss_token` + gate pearl recipe; **loot_drops.js rewritten to LootJS 2.x API**
  (was written against 3.x — nothing in the file would have loaded).
- **Mod repairs found by integration sweep**: **Blue Skies metafile pointed at a modpack, not the mod**
  (never actually installed!) → real mod + Structure Gel added. 30+ broken quest refs fixed by adding
  the mods the source packs expected: FTB Placeholders, Effortless Building, Customizable Elytra,
  Simple Magnets, Rechiseled, EnderChests+EnderTanks, Watut, Wooden Bucket, Programmed Circuit Card,
  SoLOnion (loose jar from C2E2), OpenLoader + C2E2 `resources.zip` (mmorpg/lightmans/cte2 textures the
  ported MnS data expects). Remaining refs edited: xycraft ghost tasks deleted, jetboots→create_jetpack,
  simplybackpacks→sophisticated, betterfortresses/towns_and_towers ids, dimasic_server respawn
  advancements → TF boss re-kill quests, broken icons → vanilla.
- **Ops layer**: spark, FTB Backups 2, EntityCulling, ImmediatelyFast, NetherPortalFix.
- **Bug fixes**: `botania:terrasteel` → `terrasteel_ingot` + `#forge:ingots/iron` tag prefix in
  gtceu_progression_gates.js (Gun Smith Table + ME Controller gates were uncraftable).
- Verified: 12,588 quest ids duplicate-free, 71 snbt files brace-balanced, namespace sweep clean,
  all custom server scripts parse.

### 🔴 ALL in-game testing now lives in `in_game_testing.md` (supersedes the lists below)
### 🟠 MBD2 build specs for the 7 Orb Forge machines: `orb_forge_build_spec.md`

---

## ✅ 2026-07-01 GAP-FIX SESSION (see pack_gap_analysis.md for the audit)

- **9 mods added** (packwiz metafiles, index/pack hashes rebuilt): Stargate Journey, BOMD Forge (+CERBON's API), Aquamirae, Illager Invasion, LootJS, Expanded AE, Ex Nihilo Sequentia (+NovaCore). **Tetra + mutil removed** (weapons policy), config/tetra.toml deleted.
- **All broken quest references fixed** — the audit found ~40 namespaces referenced by quests with no backing mod. Big-3 boss mods installed; everything else retargeted to installed equivalents or converted to checkmarks (start_core 105 refs, campaign small-mods, quality_of_life, storage_solutions RS→AE2 full rewrite, simplehats→tiered coins). Zero broken namespace refs remain.
- **Star Tech kubejs content layer PORTED** from THETA-1-HOTFIX-3 (normal mode): `kubejs/{startup,server,client}_scripts/star_tech/`, merged assets (1,457 files incl. quest-lang `assets/ftbquestlocalizer` — quest text was showing raw `{ftbquests.csg.*}` keys before), data (incl. sgjourney structures + ruined portal replacements), `kubejs/config` (packmode=default). ~300 previously-phantom `kubejs:` items + all custom `gtceu:` machines now registered. Supremacy's 5 adapted compat scripts retired to `kubejs_retired/` (superseded by ST originals). Configs copied for sgjourney/exnihilo/expandedae. Dead ST scripts for absent mods removed (project_red, solar_energy, xycraft).
- **MnS XP rewards**: 2,635 quests across 46 chapters now grant `/mine_and_slash give xp_times_lvl` (50 early / 100 mid / 150 late). Broken `ftb_ph:exp` icons (FTB Placeholders not installed) replaced with experience bottle.
- **MnS entity configs**: 16 boss/mob mods tuned in `mmorpg_entity/all_mobs_in_mod/` (hp/dmg/loot/exp multipliers + min-level floors; cataclysm 4×HP floor-40 down to alexsmobs 1.3×).
- **Ad Astra woven into Main Story**: 7 new quests in the_stars_await (NASA workbench → rocket → Moon → Desh → Mars → "Echoes of the Gate"); finale now requires the rocket arc. Ad Astra is the mechanism that leads into Stargate Journey.
- **weapon_disable.js extended**: MCDW recipes removed mod-wide (+ loot stripped via LootJS). RoE kept (it's Recreation of Exile — MnS ecosystem). TACZ kept playable per decision.
- **starter_cleanup.js rewritten**: wipe-then-regrant (quest book granted after wipe, 100-tick delay, new persistentData key `supremacy_starter_cleanup`).
- **loot_drops.js written** (LootJS): all 9 Orb Forge inputs wired; structure chests sweetened with tiered coins.
- Quest files were CRLF; edited files are now LF (cosmetic; explains large git diffs).

### 🔴 NEW ITEMS REQUIRING IN-GAME TESTING (2026-07-01)
1. **Boot test the ST layer** — expect nonfatal KubeJS log errors from ST scripts referencing absent mods (thermal.js/systeams, tags.js, recipe_helpers.js, sieving.js, mass_removals.js). Confirm packmode reads as `default`.
2. **NovaCore jar is tagged NeoForge on Modrinth** (1.20.1 NeoForge = Forge-compatible); confirm it loads under Forge 47.
3. **BOMD Forge port namespace** — quests use `bosses_of_mass_destruction:`; confirm the Forge port keeps it.
4. **ST recipe philosophy tensions** (from ST `mass_removals.js`, now active): vanilla **Eye of Ender recipe removed** (conflicts with Campaign act_v End access timing — ST re-adds a gated path; verify players can reach the End at MnS act-v level), **create:andesite_alloy removed** (interacts with playtest note about early Create), **AE2 inscriber/charger recipe types removed** (GT-gated — conflicts with Logbook ae2.snbt teaching vanilla inscriber), thermal machines GT-gated.
5. **LootJS verification** — `matchDimension` condition + loot table paths (`blue_skies:entities/summoner` etc.) need JEI/log confirmation; MnS `mmorpg:` item ids for chest injection still TODO (coins are placeholder).
6. **Retargeted item/entity IDs to spot-check in JEI**: `mowziesmobs:naga_fang`, `functionalstorage:controller_extension`, `rftoolsbuilder:builder`, `thermal:dynamo_stirling`, `waystones:warp_scroll`/`warp_stone`, `supplementaries:notice_board`, `ad_astra:*` (space suit pieces, moon/mars stones), `gtceu:luv/zpm/uv_fusion_reactor`.
7. **Starter kit** — verify wipe-then-regrant grants the quest book and nothing else is lost (existing playtest worlds will re-trigger the wipe once due to the new key).

---

## ✅ COMPLETED (do not re-do)

- **Main Story quest tab** — 8 chapters complete (soul_land_awakening → the_stars_await)
- **Campaign tab** — act_0–act_v, ascendancy, campaign_talent_rewards, epilogue, repeatables — all ported from C2E2 (identical)
- **Logbook tab** — magical_flora and storage_solutions — ported from C2E2 (identical)
- **Adventure tab** — biome_hopper (24 quests) and structures (19 quests) written
- **Home Sweet Home tab** — farming (C2E2 port) + homestead (19 quests) + culinary_arts (13 quests) + professions (15 quests) + fishing (20 quests, Aquaculture 2 integration)
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
- **Star Technology config diff** — All 46 overlapping configs evaluated. Three gtceu.yaml fixes applied (`highTierContent: true`, `ulvComponentsEnabled: true`, `enableWorldAccelerators: false`). All other differences were either intentional (fluxnetworks GTCEu integration, MA inferium drops/ore gen) or mod-version formatting changes with no gameplay effect.
- **KubeJS compat scripts** — ae2_gtceu_compat, thermal_compat, functional_storage_recipes, flux_networks_recipes, general_compat (adapted from Star Tech THETA-1; Star Tech custom materials excluded)
- **AE2 channels** — set to `infinite` in config/ae2/common.json
- **kubejs:coin replaced** — all 1,268 phantom `kubejs:coin` references across 27 Star Tech chapter files replaced with tiered `lightmanscurrency:coin_*` (iron → gold → emerald → diamond → netherite by progression stage). Kill tasks confirmed native FTBQuests (`type: "kill"`), no extra mod needed.
- **Iron's Spells fixed** — installed Mine and Slash Compatibility Addon; switched `mine_and_slash_compatibility-server.toml` from ORIGINAL_MODE → COMPATIBLE_MODE so Iron's Spells spells properly convert to MnS damage.
- **TF uncrafting disabled** — `disableUncrafting = true` in `config/twilightforest-common.toml` (prevents recipe reversal exploits, matches C2E2).
- **Blue Skies gated** — created `config/blue_skies-common.toml` with `zeal_lighter_cost = 32` (4× default cost to enter Everbright/Everdawn; matches C2E2 gate timing). Born in Chaos mobs allowed to spawn in Blue Skies dims.
- **TF origin dimension intentionally OVERWORLD** — C2E2 gates TF behind Deeper Darker, but Supremacy's GT progression gates REQUIRE TF trophies (Naga Scale for Cupronickel Coil, Lich Trophy for HV Hull). Must remain accessible from overworld.

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

#### `alchemy.snbt` — COMPLETE (18 quests)
Four branches: Soul Land (qi_crystal → soul_crystal → soul_forged_ingot), Blood Magic (altar → blank_slate → sigils → ritual_diviner → living_armor), Ars Nouveau (source_gem → enchanting_apparatus → alchemist's_crown), MnS Alchemy (station → first batch → apprentice). Grand Alchemist diamond completion.

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

All five chapters complete: farming, homestead, culinary_arts, professions, fishing. Aquaculture 2 (v2.5.7) added as mod; Excalibur + Aquaculture 2 Excalibur Support resource packs added.

### Adventure Tab (274C28999D7BBD26)

Both existing chapters now have content but consider adding:

4. **Dungeons chapter** — COMPLETE. 12 quests: Map Creator → Map Setup → Enter Map → Boss Room; Library Portal → Map Affixes; Ancient Obelisk → Wave Encounters; The Harvest (checkmark); Uber Fragment; Master Delver diamond. IDs: DG01000000000001–DG01000000000012.

### Ungrouped Chapters
- `mechanics.snbt` — assigned to Star Tech: Main group `1E0FC4EA21F735F7` ✅
- `welcome.snbt` — intentionally ungrouped (welcome screens work without a tab in FTB Quests)

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

**RESOLVED (WS6, 2026-07):** All 9 items are wired in `kubejs/server_scripts/loot_drops.js`; target loot-table/dimension ids verified against the shipped mod jars, and the LootJS 2.13.1 API calls were corrected file-wide (`addLootTableModifier` / `anyDimension` / `addWeightedLoot`). `kubejs:endgame_boss_token` additionally comes from the repeatable Convergence Gateway (`kubejs/data/gateways/gateways/supremacy_endgame.json`). Caveat: the Blue Skies trophies depended on `mods/blue-skies.pw.toml`, which pointed at the wrong CurseForge project (a modpack zip, not the mod) — corrected to the real mod (Modrinth `DOSy3C4M` v1.3.31) plus its required dependency `mods/structure-gel-api.pw.toml`; needs `packwiz refresh` at integration. Original table kept for reference:

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

---

## 🔴 BALANCE — REQUIRES ACTION

### No Anti-Mob-Farm System
C2E2 uses a dedicated `anti_mob_farm` mod that requires players to deal ≥50% of total damage for loot, with per-chunk kill penalties regenerating over time. Without it, any AoE or spawner farm trivially grinds gear. The mod may not be publicly available — check the C2E2 mod list. If unavailable, partially mitigate with InControl spawning density limits.

### No MnS Item Injection into Mod Structure Chests
C2E2 injects MnS items (salvage stones, orbs, runes) into Better Dungeons/Better Desert Temples/Better Ocean Monuments/Blue Skies/Undergarden chest loot tables via OpenLoader data overlays. Supremacy has no loot table overlays — mod structure chests feel empty relative to what C2E2 players expect. Fix: create `kubejs/data/<mod>/loot_tables/` overrides or use LootJS to inject MnS currency into structure chests.

### No InControl Mob Spawning Rules
C2E2 blocks Born in Chaos bosses (Lifestealer, Nightmare Stalker, Supreme Bonescaller) from Overworld spawning and forces them only into Blue Skies dimensions. Without this, these ultra-hard bosses spawn at overworld mob levels where players aren't ready. Add InControl rules to `config/incontrol/` (if InControl is installed).

### Attribute Cap Verification Needed (In-Game)
C2E2 uses AttributesFix to raise `generic.max_health`/`armor`/`attack_damage` to 1,000,000. Supremacy has Apothic Attributes (successor mod) which should handle this automatically, but must be verified in-game at high MnS levels.

### soul_forged_ingot — Two Intentional Recipes (Not a Bug)
Both `convergence_recipes.js` (magic path: charged_qi_crystal + manasteel + soul_crystal + soul_rune) and `gtceu_progression_gates.js` (tech path: spirit_iron + stainless_steel + qi_crystal × 8 → 2 ingots) define recipes. These are two valid crafting paths for different player routes. JEI will show both.

## 🟡 QUEST BOOK — MISSING COIN REWARDS (chapters with 0 coins despite 15+ quests)

These chapters have content but no coin rewards at all. Consider adding `lightmanscurrency:coin_*` rewards at the appropriate tier:

| Chapter | Quest Count | Suggested Tier | Notes |
|---|---|---|---|
| `ae2.snbt` | 35 | diamond | AE2 is endgame |
| `armor.snbt` | 19 | gold/emerald | Mix by armor tier (diamond=gold, netherite=emerald) |
| `dungeons.snbt` | 20 | emerald | M&S endgame content |
| `nuclear_chemistry.snbt` | 25 | emerald/diamond | GT chemistry |
| `mystical_agriculture_gregified.snbt` | 25 | gold | MA crops are mid-game |
| `biome_hopper.snbt` | 24 | iron/gold | Exploration, early-mid |
| `fishing.snbt` | ~20 | iron | Home Sweet Home, casual |
| `culinary_arts.snbt` | 13 | iron | Home Sweet Home |
| `homestead.snbt` | 19 | iron | Home Sweet Home |
| `professions.snbt` | 15 | iron | Home Sweet Home |
| `structures.snbt` | 19 | iron/gold | Adventure |

## 🟡 QUEST BOOK — GAP ANALYSIS vs C2E2 and Star Technology

### Chapters to add (high priority)
- **Power Generation chapter** — Star Tech `power.snbt` covers Stirling/Compression/Steam dynamos + GT generators + boilers + rotor holders + Flux Networks tier by tier (22 quests). Supremacy has no dedicated power chapter. Suggested group: Main Story or Logbook.
- **GTCEu Mechanics reference tab** — Star Tech `mechanics.snbt` (21 checkmark quests): multiblock wall sharing, distinct buses, overclocking, ghost circuits, machine modes, threading, parallels, throughput boosting, wireless power. All-checkmark, no rewards needed.

### Chapters to add (medium priority)
- **Campaign Shop (gem/coin shop)** — C2E2 has `gem_shop.snbt` (11 quests, all `can_repeat: true`): spend Lightman's coins to buy choice rewards (gear loot tables, gem boxes, rune boxes). Currency sink. Supremacy has `shop.snbt` (Star Tech bulk resources shop) but no ARPG-gear shop equivalent.
- **Exploration chapter** — C2E2 `exploration.snbt` (42 quests): biome visits, structure finds, dimension entries. Supremacy has `biome_hopper` (24) and `structures` (19) but C2E2's are deeper.
- **AE2 deep-dive** — Star Tech `applied_energistics.snbt` (25 quests) covers GT-AE2 hatches, MEGA cells, Quantum Link, assembler matrices, spatial storage. Supremacy's `storage_solutions` is shallower; check if it covers these systems.

### Chapters to add (low priority)
- **Chemistry chain reference (pl1–pl3)** — Dense GT chemistry chain docs (sulfur dioxide, chlorine, benzene, PCB coolant, PEEK, superalloy loops). Supremacy's `industrial_soul_refinement` covers soul materials but not GT chemistry fundamentals.
- **QoL/Utility chapter** — Star Tech `quality_of_life.snbt` (22 quests): Effortless Building, Travel Anchors, Functional Storage, LaserIO, Tom's Storage, decorative block mods.

### MnS XP rewards missing from Star Tech chapters
Star Tech chapters ported to Supremacy (early_game, industrial_revolution, pl1–pl5, etc.) have **no Mine & Slash XP command rewards**. C2E2 awards `/mine_and_slash give xp_times_lvl @p <multiplier>` on every side-content quest. Consider adding `type: "command"` XP rewards to non-Main-Story chapters to keep ARPG progression flowing.

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
  Home Sweet (1E24DF): farming, homestead, culinary_arts, professions, fishing
  Godlike (4FE047):    alchemy, armor, jewlery, soul_land_weapons
  Campaign (1E3C4B):   act_0-v, ascendancy, campaign_talent_rewards, epilogue, repeatables
  Logbook (5F2CCE):    magical_flora, storage_solutions
  Star Tech tabs:      READ-ONLY — never edit
```


