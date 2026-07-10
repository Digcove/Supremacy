# WS6 — In Control Rules + Spawn/Loot Balance

Read `tasks/00_conventions.md` first. ID prefix (only if quest edits needed): `6D6D`.

## Deliverable 1: `config/incontrol/spawn.json` (NEW)

Copy C2E2's rules (source, READ-ONLY: `~/Library/Application Support/PrismLauncher/instances/Craft to Exile 2 (VR Support)/minecraft/config/incontrol/spawn.json`):
- Deny `born_in_chaos_v1:lifestealer`, `lifestealer_true_form`, `nightmare_stalker`, `supreme_bonescaller` `onjoin` in `minecraft:overworld` (they remain legal in Blue Skies dims — Supremacy config already allows BiC spawns there).
- Deny `born_in_chaos_v1:mother_spider` below height 25 in overworld.
- Deny `minecraft:snow_golem` in the nether.
Verify the `born_in_chaos_v1` namespace against this pack's Born in Chaos version (grep the mod jar name in `index.toml` / check entity ids in `kubejs/data/mmorpg/mmorpg_entity/all_mobs_in_mod/` which already has a born-in-chaos config). Copy any other C2E2 rules that reference mods THIS pack also has; skip rules for absent mods.

## Deliverable 2: Orb Forge loot verification

`kubejs/server_scripts/loot_drops.js` claims to wire all 9 Orb Forge inputs; an older dev_notes table says unwired. Reconcile:
1. For each of the 9 items (`kubejs:blaze_touched_residue`, `undergarden_reagent`, `undergarden_boss_drop`, `everbright_trophy`, `everdawn_trophy`, `hidden_chest_relic`, `map_completion_token`, `map_boss_drop`, `endgame_boss_token`) confirm loot_drops.js has a working source whose target loot-table/entity ids actually exist (grep the relevant mod data in the live instance `mods/` jars or `kubejs/`).
2. Fix broken/missing ones in place (LootJS style consistent with the file). Intended sources are documented in `dev_notes.md` §"ORB FORGE — UNWIRED LOOT DROPS".
3. `map_completion_token` / `map_boss_drop` must come via MnS map mechanics (`kubejs/data/mmorpg/loot_tables/` overrides) — NOT structure chests. Remember the constraint: no MnS gear into structure chests; these kubejs items are pack currency, LootJS entity/boss drops are fine.

## Deliverable 3: `kubejs:endgame_boss_token` → Gateways to Eternity

Give the token its defined source: a Gateways wave.
1. Check how Gateways defines gates: datapack JSON `data/gateways/gateways/*.json` (see the mod jar in the live instance for schema/examples).
2. Create `kubejs/data/gateways/gateways/supremacy_endgame.json`: an endgame wave gate (3–5 waves of high-tier bosses from installed mods — BiC/BOMD/Cataclysm entities, MnS-scaled), rewarding `kubejs:endgame_boss_token` (+ netherite coins).
3. Give the GATE OPENER item a crafting path: a KubeJS recipe (append to `kubejs/server_scripts/convergence_recipes.js`, matching its style) crafting the `gateways:gate_pearl` with NBT for this gate from endgame materials. Verify pearl NBT format from the mod's examples.
4. If `dungeons.snbt`'s "Uber Fragment"/endgame quests should point at this gate, add ONE teaching quest to `dungeons.snbt` (prefix `6D6D`) explaining the gate → token → Orb Forge chain.

## Deliverable 4: leftover fix

- `kubejs/server_scripts/dimension_return.js:6` — spawn coords are placeholder `{0,64,0}`. Leave the value but improve the comment to state it MUST be set to server spawn pre-launch, and add it to your report's in-game list.

## Verification
- `spawn.json` is valid JSON; entity ids grep-verified.
- Gateways JSON validates against the mod's schema (compare field-by-field with a jar example).
- Report → `tasks/reports/06_report.md`.
