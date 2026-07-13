# WS6 Report — In Control Rules + Spawn/Loot Balance

## Files created

- `config/incontrol/spawn.json` — verbatim copy of C2E2's three rules (BiC boss overworld deny, mother_spider height rule, nether snow golem deny). C2E2's spawn.json contains ONLY these three rules — there were no other rules to filter for mod presence. All five `born_in_chaos_v1` entity ids verified against the pack's `born_in_chaos_[Forge]1.20.1_1.7.5.jar` lang file (`lifestealer`, `lifestealer_true_form`, `nightmare_stalker`, `supreme_bonescaller`, `mother_spider`). Valid JSON. C2E2 runs In Control 9.4.1; we ship 9.4.6 (same 9.4.x line, same schema).
- `kubejs/data/gateways/gateways/supremacy_endgame.json` — "Convergence Gateway", the repeatable endgame wave fight. 4 waves: (1) supreme_bonescaller ×2 + nightmare_stalker ×2, (2) BOMD lich + gauntlet, (3) cataclysm ancient_remnant + lifestealer ×2, (4) cataclysm ignis. Gate rewards: `kubejs:endgame_boss_token` ×1 + `lightmanscurrency:coin_netherite` ×4; per-wave diamond-coin and entity_loot payouts (entity_loot only on entities that actually ship entity loot tables — verified: nightmare_stalker, lich, ancient_remnant, ignis). Failures: griefless explosion + nightmare_stalker summon. Schema compared field-by-field with `data/gateways/gateways/hellish_fortress.json` inside `GatewaysToEternity-1.20.1-4.2.6.jar` (size/color/waves/entities/modifiers/rewards/max_wave_time/setup_time/rewards/failures all match the jar's shapes). Valid JSON.
- `mods/structure-gel-api.pw.toml` — Structure Gel API 2.16.2 (Modrinth `T8TGycIQ`, sha512 verified from API). Required dependency of Blue Skies; see deviation below.

## Files modified

- `kubejs/server_scripts/loot_drops.js`
  - **Critical fix:** the file was written against the LootJS 3.x API but the pack ships **LootJS 2.13.1**. Verified against the jar (`javap` on `LootModificationEventJS` / `LootConditionsContainer` / `LootEntry`): `addTableModifier` does not exist (2.x is `addLootTableModifier`), `matchDimension` does not exist (2.x is `anyDimension`), `LootEntry.setCount` does not exist in 2.x. Any of these throws at script load and kills every modifier in the file — i.e. before this fix, *none* of the loot wiring (Orb Forge, WS2 guns, WS3 strip, coin sweetening) actually worked. Renamed all 20 `addTableModifier` calls, all 4 `matchDimension` calls (3 Orb Forge + 1 in WS2's map-gun loop), and rewrote the 3 coin `setCount([a,b])` calls as `addWeightedLoot([a,b], [LootEntry.of(...)])` (same expected drop range). `node --check` passes.
  - Header rewritten to document the API audit + verification results; short WS6 section appended at the end (no new drops added there — Orb Forge entries were fixed in place per the spec).
  - All 9 Orb Forge input sources reconciled against mod jars: undergarden entity tables incl. `forgotten_guardian` (The_Undergarden-0.8.14), blue_skies boss tables `summoner`/`starlit_crusher`/`alchemist`/`arachnarch` (real mod jar 1.3.31, see below), cataclysm boss tables (L_Enders_Cataclysm-3.31), dimensions `dungeon_realm:dungeon` / `the_harvest:harvest` / `ancient_obelisks:obelisk` (each mod's `data/<ns>/dimension/` folder). `map_completion_token`/`map_boss_drop` stay on the dimension-scoped LootJS entity path — the MnS jar ships only salvage-recipe loot tables (no map-completion table to override), and the spec explicitly allows LootJS entity drops. No structure-chest MnS injection anywhere.
- `mods/blue-skies.pw.toml` — **critical pack bug found during verification:** the entry pointed at CurseForge project 1177439, which is someone's *modpack* named "Blue Skies" (the downloaded "jar" is a modpack export zip with manifest.json/overrides/, no mods.toml). The Blue Skies dimension mod was therefore never actually installed, making both trophies unobtainable and all Blue Skies content absent. Replaced with the real mod: Modrinth `DOSy3C4M`, `blue_skies-1.20.1-1.3.31.jar` (sha512 verified by downloading the file). Its required dependency Structure Gel API was also missing → added (file above).
- `kubejs/server_scripts/convergence_recipes.js` — appended WS6 gate-pearl recipe inside the existing `ServerEvents.recipes` block, matching file style: shaped `gateways:gate_pearl` with NBT `{gateway:"gateways:supremacy_endgame"}` from ancient_anima ×4 (BOMD) + witherite_ingot ×2 + ignitium_ingot ×2 (Cataclysm) + charged_ender_pearl (Obsidilith drop) — one clear of each endgame boss line, then farmable. Pearl NBT key verified by decompiling `GatePearlItem` in the Gateways jar (stores the gate id under the `gateway` string tag; the mod's own `gate_recipe` serializer sets the same). All ingredient item ids verified via jar lang files. `node --check` passes.
- `config/ftbquests/quests/chapters/dungeons.snbt` — one teaching quest "The Convergence Gateway" (id `6D6D4F8A2C1E9B37`, task `6D6D7D3E5A0C8F21`, rewards `6D6DB94E6F2A1D58`/`6D6D1C7F8E4B0A96`), dependent on Master Delver, at (0, -18), explaining pearl recipe → gate waves → token → Orb Forge UEV/UIV chain. Task: obtain `kubejs:endgame_boss_token` (consume: false). Rewards: 150×Lv MnS XP + 2 netherite coins (no progression items). Tabs/LF, no trailing whitespace, ids unique repo-wide (grep-checked).
- `kubejs/server_scripts/dimension_return.js` — placeholder `SPAWN_COORDS {0,64,0}` kept; comment upgraded to a hard MUST-set-before-launch warning.
- `dev_notes.md` — "ORB FORGE — UNWIRED LOOT DROPS" section marked RESOLVED with a summary; original table kept.

## Decisions

- Kept C2E2's `mother_spider` rule verbatim (`minheight: 25` + deny) rather than the spec prose's "below height 25" — the task says copy C2E2's rules, and C2E2 is the proven-working reference.
- `endgame_boss_token` retains its Cataclysm-boss drop wiring *and* gains the Gateway as the repeatable, on-demand source (dev_notes asked to "define which one" — answer: the Convergence Gateway).
- Wave modifiers use only `generic.*` attributes (no attributeslib dependency in the gate JSON) since MnS already scales the mobs.
- Did not touch `config/incontrol/` beyond spawn.json (C2E2's other incontrol files — loot/effects/etc. — were out of scope per the task file).

## Deviations from the task file

1. **Fixed code outside the strict WS6 scope in `loot_drops.js`:** WS2's `matchDimension` calls and the pre-existing `setCount` coin calls. Justification: LootJS aborts the whole modifiers callback on the first bad call, so leaving them broken would have kept my 9 Orb Forge drops dead too.
2. **Mod-level fix (blue-skies.pw.toml replacement + structure-gel-api.pw.toml addition).** Not in the spec, but Deliverable 2 requires the trophy loot tables to "actually exist" — they cannot while the pack ships the wrong project. Documented fully above.
3. `index.toml` was NOT touched (conventions: no `packwiz refresh` from workstreams). **Integration MUST run `/Users/evancyrulik/go/bin/packwiz refresh`** so the corrected blue-skies entry and the new structure-gel-api entry are indexed and ship; until then the live instance still has the wrong zip.

## In-game verification list

1. KubeJS startup log: `loot_drops.js` loads with zero errors (this is the canary for the whole LootJS API migration); confirm iron-coin chest sweetening rolls 2–8 coins.
2. `removeLoot('@mcdw')` — pre-existing mod-prefix ItemFilter string; could not be verified against the 2.13.1 jar signatures. Confirm MCDW weapons are absent from a dungeon chest.
3. In Control: BiC bosses no longer join in the overworld; confirm they still appear in Blue Skies dims; snow golems denied in nether.
4. Convergence Gateway: open with a crafted pearl on flat ground — confirm Cataclysm/BOMD bosses spawn, are tracked (they have scripted arena AI; Gateways generally handles bosses, but this needs a live run), waves advance, and the token + coin payout fires. Confirm max_wave_time (90s–3min per wave) is enough at MnS scaling; tune upward if players time out.
5. NBT-crafted gate pearl shows the gate name/tooltip correctly (crafted via KubeJS shaped recipe rather than the mod's native `gate_recipe` type).
6. Blue Skies 1.3.31 + Structure Gel 2.16.2 load together after refresh; kill Summoner/Starlit Crusher and Alchemist/Arachnarch to confirm trophy drops.
7. `dimension_return.js` `SPAWN_COORDS` — **must be set to the real server spawn before launch** (still `{0, 64, 0}`).
8. Quest "The Convergence Gateway" renders under Dungeons below Master Delver and completes on holding a token.
