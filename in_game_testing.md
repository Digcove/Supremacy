# Supremacy — In-Game Testing Checklist

_Consolidated 2026-07-12 after the WS1–WS8 finish pass. Everything on this list requires a running
game; nothing here is verifiable from the editor. Sources: tasks/reports/01–07 + dev_notes legacy lists._

## 0. Boot gate (do these first)

- [ ] **Clean boot**: no fatal KubeJS errors. Watch for: `tacz_gating.js`, `extended_crafting_capstones.js`,
      `loot_drops.js` (rewritten to LootJS 2.x API), `convergence_recipes.js` (gate pearl section).
- [ ] **Quest book loads** (12,588 IDs verified duplicate-free in-editor, but confirm) and the new
      chapters appear: Armory (Adventure), Commerce (Home Sweet Home), Gem Shop (Campaign), rewritten Welcome.
- [ ] **New mods load under Forge 47 / 1.20.1**: ImmediatelyFast (filename says +1.20.2 — packwiz
      selected it as 1.20.1-compatible), FTB Backups 2 + PolyLib, In Control 9.4.6, Extended Crafting,
      OpenLoader (+ the 167 MB C2E2 resources.zip — consider slimming it later, but it carries the
      mmorpg/lightmans custom textures our ported MnS data expects), SoLOnion (loose jar), Blue Skies
      1.3.31 + Structure Gel (the old metafile pointed at a MODPACK, not the mod — Blue Skies content
      was never actually loading before).
- [ ] **Fakelorant gun pack registers 10 guns** (namespace `fakelorant`). Ghoul's Guns was removed
      (upstream file is asset-only); re-add only if the author ships a data-bearing version.

## 1. Guns (WS2)

- [ ] Gun Smith Table craftable with `botania:terrasteel_ingot` gate (id was wrong pre-fix; also
      ME Controller gate re-check) and shows ONLY the new GT-material gun recipes — no old default
      recipe surviving (ids were removed defensively in both `tacz:x` and `tacz:gun/x` forms).
- [ ] Themed workbenches (Destiny/Helldivers) show zero recipes; `tacz/supremacy_gunpack` filter pack
      blacklists merge correctly against Destiny's own filter file.
- [ ] Boss drops fire: Ignis→Warhammer, Harbinger→Helldivers, Ender Guardian→Destiny, Leviathan→premium
      pool, 4 BoMD bosses→Fakelorant sidearms. **Known risk**: BoMD `gauntlet`/`obsidilith` ship no jar
      loot tables — if their LootJS entity modifiers don't fire, move those two to an In Control/datapack path.
- [ ] NBT gun drops (`tacz:modern_kinetic_gun` + `{GunId:…}`) equip and fire correctly.
- [ ] MnS map-dimension gun pool (0.1%/gun) drops inside the three map dimensions only.
- [ ] Pattern-inferred GT ids exist in JEI: `gtceu:hv_electric_motor`, `ev_electric_motor`,
      `ev_voltage_coil`, `stainless_steel_screw`, `titanium_screw`, `tungsten_steel_screw`, `tungsten_steel_plate`.
- [ ] Gun damage vs MnS-scaled HP at HV (first guns) and ZPM (snipers) — this is the core "guns are
      THE late-game weapon" balance check. TACZ flat damage bypasses MnS conversion.

## 2. Quest book (WS3/WS4/WS5)

- [ ] Gem Shop: coins are consumed, choice reward tables open, `table_id` linkage works (7 tables).
- [ ] Ironbound Tome task `only_from_crafting: true` actually requires crafting (FTBQ behavior check).
- [ ] Tang Clan quests: forging-table items obtainable at the quests' book position (soulland progression).
- [ ] act_0 Soul Land bridge quests + Welcome autofocus show correctly on a fresh character.
- [ ] Epilogue TF re-kill quests (converted from C2E2's private respawn-monument mechanic): kill tasks
      count a NEW boss kill after dependencies complete (naga/lich/ur_ghast/snow_queen/hydra).
- [ ] `#towns_and_towers:town` structure task and `betterfortresses:fortress` detect correctly.
- [ ] cte2 quest images render (need OpenLoader resources.zip loaded client-side).

## 3. Extreme crafting (WS7)

- [ ] All `extendedcrafting:` table/recipe ids valid (jar wasn't local; recipes use `event.custom` with
      `extendedcrafting:shaped_table`); JEI shows the 11 capstones, tables gate onto the GT ladder.
- [ ] Known adjacent bug (pre-existing, NOT fixed): `orb_forge/tier_*.js` reference nonexistent gtceu
      circuit ids (`ev_integrated_circuit`, `uhv_mainframe`, `sensor_iv`, …) — dev_notes has the
      uncertainty table; fix ids in JEI session, then the MBD2 recipes will match.

## 4. Balance & world (WS6)

- [ ] In Control: Born in Chaos bosses absent from overworld, present in Blue Skies dims;
      snow golems denied in nether; mother_spider denied below y=25.
- [ ] Gateways: craft the Convergence Gate Pearl (recipe in `convergence_recipes.js`), open the 4-wave
      `supremacy_endgame` gate, verify boss AI under Gateways tracking + `kubejs:endgame_boss_token` drops.
- [ ] All 9 Orb Forge inputs drop from their sources (LootJS 2.x rewrite — every path changed).
- [ ] **SET `SPAWN_COORDS` in `kubejs/server_scripts/dimension_return.js` to the real server spawn
      BEFORE LAUNCH** (placeholder {0,64,0}).
- [ ] Soul ring speed nerf (procedure in dev_notes: /data get the AttributeModifiers UUID, then
      startup-script override).
- [ ] Apothic Attributes caps at high MnS levels (C2E2 used AttributesFix @ 1M).

## 5. MBD2 (blocking the Orb Forge system)

- [ ] Build the 7 multiblocks in the MBD2 editor per `orb_forge_build_spec.md`, commit the
      `ldlib/mbd2/` files, trim `orb_forge_machines.js`.

## 6. Legacy dev_notes items still open

- [ ] Orechid apothecary recipe format (JEI check; fallback syntax in dev_notes)
- [ ] Spear shows as staff in MnS UI (`mmorpg_gear_slot/spear.json` model_num)
- [ ] Qi Crystal recipe JEI conflict check
- [ ] Snow Queen gate item `twilightforest:ice_bomb` vs actual drop id (gtceu_progression_gates.js)
- [ ] Starter kit wipe-then-regrant on fresh + existing worlds
- [ ] Master Bag Curios slot (playtest 2)
- [ ] MnS datapack load errors (playtest 2)

## Open DECISIONS (not bugs — need a human call)

1. **Worldgen consolidation** (gap analysis §16): Terralith + Regions Unexplored + BWG + Explorify
   still stack. Untouched because changing it breaks existing worlds. Decide before server launch.
2. **Economy pass 2**: five endgame chapters (the_stars_await, nuclear_fission, applied_energistics,
   draconic_age_part_1, event_horizon) hold ~89% of the ~1.04M-iron-value coin faucet. Gem shop is
   priced for the pre-Star-Tech curve; endgame players will be rich. Re-price after real server data.
3. **resources.zip size**: 167 MB. Could be slimmed to the mmorpg/lightmanscurrency/cte2/ftbquests
   namespaces (~cuts half). Left whole for correctness.
