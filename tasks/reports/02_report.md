# WS2 Report — TACZ Gun Gating

## Files created / modified

- **Created** `kubejs/server_scripts/tacz_gating.js` — themed-namespace recipe removal, all 53 default gun recipes removed + re-added with GT-tier materials, all 24 ammo recipes GT-ified.
- **Modified** `kubejs/server_scripts/loot_drops.js` — appended a clearly-fenced `WS2 — TACZ themed guns are DROP-ONLY` section at the end of the `LootJS.modifiers` block (nothing above it touched; later workstreams can append after the `end WS2` marker).
- **Created** fallback filter pack `tacz/supremacy_gunpack/`:
  - `gunpack.meta.json` (`{"namespace": "supremacy"}` — same marker-file format as `tacz_default_gun`)
  - `data/tacz/recipe_filters/default.json` — blacklist `["tacz:test", "^destiny:.*$", "^zeta:.*$", "^warhammer:.*$", "^fakelorant:.*$"]`
  - `data/destiny/recipe_filters/destiny_workbench.json` — `{"blacklist": ["^.*$"]}`
  - `data/zeta/recipe_filters/terminal.json` — `{"blacklist": ["^.*$"]}`
  - (No warhammer/fakelorant workbench filters: both are legacy 1.0-format packs with no `data/<ns>/recipe_filters/` workbench of their own — warhammer's recipes never enter RecipeManager; fakelorant ships no recipes at all, per WS1.)
  - `packwiz refresh` NOT run (per coordination instructions — integration pass owns it).

## Namespaces (per WS1 report)

Drop-only themed namespaces: `destiny`, `zeta`, `warhammer`, `fakelorant` (4 total — Ghoul's Guns removed from pack; no `hamster` namespace anywhere). The KubeJS removal regex and the filter-pack blacklist both cover exactly these four.

## Recipe removal strategy

- Themed packs: `event.remove({ id: /^(destiny|zeta|warhammer|fakelorant):.*/ })` — also removes their vanilla-type workbench recipes (destiny workbench, zeta terminal) as designed.
- Default guns/ammo: removed by exact id **in both plausible forms** (`tacz:ak47` AND `tacz:gun/ak47`; `tacz:9mm` AND `tacz:ammo/9mm`) since TACZ's folder-pack id scheme couldn't be confirmed statically. Extra removes are harmless no-ops. Attachments untouched; `tacz:gun_smith_table` block recipe untouched (owned by `gtceu_progression_gates.js`).

## Gun → tier → materials table (all 53 defaults)

Common per tier — HV: `gtceu:stainless_steel_plate` + `gtceu:hv_electric_motor` + `gtceu:stainless_steel_screw`; EV: `gtceu:titanium_plate` + `gtceu:ev_electric_motor` + `gtceu:ev_voltage_coil` + `gtceu:titanium_screw`; IV: `gtceu:tungsten_steel_plate` + `gtceu:iv_electric_motor` + `gtceu:iv_emitter` + `gtceu:tungsten_steel_screw`; LuV: tungsten steel plates/screws + `gtceu:luv_electric_motor` + `gtceu:luv_emitter`; ZPM: `gtceu:naquadah_alloy_plate` + `gtceu:zpm_electric_motor` + `gtceu:zpm_field_generator`. "Feel" column keeps each gun's original flavor input (tags).

| Gun | Tier | Plates | Motor | 3rd component | Screws | Feel materials |
|---|---|---|---|---|---|---|
| glock_17 | HV | 6 | 1 | — | 4 | iron 4 |
| m9a4 | HV | 6 | 1 | — | 4 | iron 4 |
| cz75 | HV | 6 | 1 | — | 4 | iron 4 |
| m1911 | HV | 6 | 1 | — | 4 | logs 4 |
| b93r | HV | 7 | 1 | — | 4 | logs 4, lapis 2 |
| p320 | HV | 8 | 1 | — | 4 | gold 4, lapis 2 |
| hk_mk23 | HV | 9 | 1 | — | 4 | gold 4, lapis 2 |
| deagle | HV | 10 | 1 | — | 4 | gold 6, diamond 2 |
| deagle_golden | HV | 6 | 1 | — | 4 | gold 24, diamond 1 |
| rhino357 | HV | 8 | 1 | — | 4 | logs 4, gold 4 |
| taurus500 | HV | 14 | 1 | — | 6 | gold 16, diamond 4 |
| lonetrail | HV | 10 | 1 | — | 4 | gold 4, lapis 8 |
| springfield1873 | HV | 4 | 1 | — | 2 | logs 8 |
| db_short | HV | 5 | 1 | — | 2 | logs 6 |
| db_long | HV | 6 | 1 | — | 2 | logs 8 |
| m870 | HV | 8 | 1 | — | 4 | logs 8 |
| m1014 | HV | 12 | 1 | — | 6 | gold 6, diamond 1 |
| spas_12 | HV | 16 | 1 | — | 6 | gold 8, diamond 2 |
| aa12 | HV | 16 | 2 | — | 6 | gold 8, diamond 2 |
| uzi | EV | 8 | 1 | coil 1 | 4 | iron 8 |
| hk_mp5a5 | EV | 9 | 1 | coil 1 | 4 | iron 8 |
| ump45 | EV | 10 | 1 | coil 1 | 4 | iron 12 |
| vector45 | EV | 12 | 1 | coil 2 | 6 | diamond 4 |
| p90 | EV | 12 | 1 | coil 2 | 6 | diamond 2 |
| ak47 | EV | 10 | 1 | coil 1 | 4 | logs 8 |
| m4a1 | EV | 10 | 1 | coil 1 | 4 | logs 6 |
| m16a1 | EV | 9 | 1 | coil 1 | 4 | logs 6 |
| m16a4 | EV | 10 | 1 | coil 1 | 4 | logs 6 |
| aug | EV | 10 | 1 | coil 1 | 4 | amethyst 1 |
| g36k | EV | 12 | 1 | coil 1 | 6 | quartz 8 |
| hk416d | EV | 12 | 1 | coil 1 | 6 | quartz 8 |
| qbz_95 | EV | 10 | 1 | coil 1 | 4 | logs 6 |
| qbz_191 | EV | 12 | 1 | coil 2 | 6 | quartz 8 |
| type_81 | EV | 9 | 1 | coil 1 | 4 | logs 8 |
| scar_l | EV | 11 | 1 | coil 1 | 4 | quartz 3 |
| sks_tactical | EV | 10 | 1 | coil 1 | 4 | logs 10 |
| fn_fal | IV | 10 | 1 | iv_emitter 1 | 4 | logs 12 |
| hk_g3 | IV | 11 | 1 | iv_emitter 1 | 4 | quartz 5 |
| scar_h | IV | 12 | 1 | iv_emitter 1 | 6 | diamond 2 |
| mk14 | IV | 12 | 1 | iv_emitter 1 | 6 | diamond 4 |
| spr15hb | IV | 11 | 1 | iv_emitter 1 | 6 | diamond 2 |
| timeless50 | IV | 10 | 1 | iv_emitter 1 | 4 | gold 6 |
| kar98 | IV | 8 | 1 | iv_emitter 1 | 4 | logs 24 |
| m700 | IV | 10 | 1 | iv_emitter 1 | 4 | diamond 1 |
| rpk | LuV | 14 | luv 1 | luv_emitter 1 | 6 | logs 10 |
| m249 | LuV | 18 | luv 1 | luv_emitter 1 | 8 | diamond 4 |
| fn_evolys | LuV | 20 | luv 1 | luv_emitter 1 | 8 | diamond 6 |
| ai_awp | ZPM | 12 | 1 | field_gen 1 | — | diamond 8, gold 16 |
| m95 | ZPM | 14 | 1 | field_gen 1 | — | netherite 2, diamond 8 |
| m107 | ZPM | 16 | 1 | field_gen 1 | — | netherite 2, diamond 8 |
| minigun | ZPM | 24 | 2 | field_gen 2 | — | netherite 4, diamond 12 |
| rpg7 | ZPM | 10 | 1 | field_gen 1 | — | logs 8, gold 8 |
| m320 | ZPM | 8 | 1 | field_gen 1 | — | gold 8 |

Classification calls (task file left them ambiguous): bolt rifles kar98/m700 and the .50 pistol timeless50 → IV (DMR bucket), not ZPM — their default costs are mid-tier and ZPM would orphan them; grenade/rocket launchers m320/rpg7 and the minigun → ZPM ("RPG/heavy"); auto-shotguns spas_12/m1014/aa12 stay HV per the class mapping (shotguns), compensated with higher plate counts.

## Ammo (all 24 re-added, same output counts and `group` fields as default)

`forge:ingots/copper` → `#forge:ingots/brass` tag (Create brass AND GT brass both satisfy it — ammo unlocks at Create brass age, guns themselves gate on GT). Iron casing stock on `40mm`/`rpg_rocket` → `#forge:ingots/steel`. Gunpowder/lapis/iron-nugget/blaze-rod inputs and all counts unchanged.

## Loot wiring (loot_drops.js WS2 section)

Item form: `Item.of('tacz:modern_kinetic_gun', '{GunId:"<ns>:<gun>"}')`. No guns added to any chest loot type.

| Loot table / path | Drops |
|---|---|
| `cataclysm:entities/ignis` | warhammer:locke 25%, artemia_iii 20%, kantrael_xii 20%, force_staff_ii 10% |
| `cataclysm:entities/the_harbinger` | zeta:las98 25%, mgx42 20%, railgun 15%, quasar 10% |
| `cataclysm:entities/ender_guardian` | destiny:thorn 25%, ice_breaker 20%, sleeper_simulant 12% |
| `cataclysm:entities/the_leviathan` | destiny:gjallarhorn 25%, zeta:quasar 20% |
| entity `bosses_of_mass_destruction:void_blossom` | fakelorant:sheriff 30% (killedByPlayer) |
| entity `bosses_of_mass_destruction:gauntlet` | fakelorant:operator 30% (killedByPlayer) |
| entity `bosses_of_mass_destruction:lich` | fakelorant:phantom 30% (killedByPlayer) |
| entity `bosses_of_mass_destruction:obsidilith` | fakelorant:vandal 30% (killedByPlayer) |
| ENTITY kills in `dungeon_realm:dungeon`, `the_harvest:harvest`, `ancient_obelisks:obelisk` | 8-gun pool (2 per namespace), 0.1% per gun per kill (~0.8% aggregate) |

All four cataclysm boss loot-table paths confirmed present in `L_Enders_Cataclysm-3.31.jar`. All 14 themed gun ids confirmed against the packs' `guns/` data folders (fakelorant ids per WS1 report).

**MnS Atlas deviation (spec-sanctioned fallback):** the Mine & Slash jar exposes only `data/mmorpg/loot_tables/{currencies,gems,runes}_salvage_recipe.json` — no chest/map-boss loot table safe to override, and `kubejs/data/mmorpg/loot_tables/` holds only profession-station block tables. Atlas gun drops therefore ride the dimension-scoped LootJS path (same mechanism as the existing `map_boss_drop`), NOT a datapack override.

## gtceu id verification

Verified directly in `kubejs/{server,startup}_scripts/star_tech/` (or `config/`): `stainless_steel_plate`, `titanium_plate`, `iv_electric_motor`, `iv_emitter`, `luv_electric_motor`, `luv_emitter`, `naquadah_alloy_plate`, `zpm_electric_motor`, `zpm_field_generator`, `steel_plate/ingot`, `brass_plate/rod/screw`.

**In-game verification list** (pattern-inferred — tier/material patterns are verified, exact id not seen in repo):
- `gtceu:hv_electric_motor`, `gtceu:ev_electric_motor` (lv/iv/luv/zpm/uv/uhv/uev/uiv motors all appear in repo; hv/ev are standard GTCEu)
- `gtceu:ev_voltage_coil` (zpm/uv voltage coils appear in repo)
- `gtceu:stainless_steel_screw`, `gtceu:titanium_screw`, `gtceu:tungsten_steel_screw` (brass/steel/iron/wrought_iron screws appear; GTCEu generates screws for all metals)
- `gtceu:tungsten_steel_plate` (tungsten_steel frame/ring/drum/crate appear)

## Other in-game verification items

1. Default-pack recipe id form (`tacz:ak47` vs `tacz:gun/ak47`) — both removed defensively; confirm the gun smith table shows ONLY the new GT recipes (no duplicate old recipe surviving).
2. BoMD `gauntlet`/`obsidilith`: their jar ships entity loot tables only for `lich` and `void_blossom` — LootJS entity modifiers on the other two may not fire if the entities have no loot table to attach to. If so, move those two drops to an In Control!/datapack path (In Control! was added by WS1).
3. `tacz/supremacy_gunpack` recipe-filter conflict semantics: the Destiny zip ships its own `data/destiny/recipe_filters/destiny_workbench.json` (whitelist `^destiny:.*$`); confirm TACZ resolves our blacklist-all alongside it (blacklist should win). This filter pack is belt-and-braces anyway — the KubeJS removal already empties those workbenches.
4. Themed workbench blocks are now unobtainable (their crafting recipes were namespace-removed) — intended; confirm no quest references them (flagged to WS5 armory).
5. Filter pack ships once packwiz refresh runs in the integration pass (NOT run here, per instructions).
