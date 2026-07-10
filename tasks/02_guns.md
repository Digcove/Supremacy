# WS2 — TACZ Gun Gating (guns are THE late-game weapon)

Read `tasks/00_conventions.md` first. Depends on WS1's report (`tasks/reports/01_report.md`) for the Ghoul's/Fakelorant namespaces — if it doesn't exist yet, use placeholder namespaces `hamster` and `fakelorant` and flag it.

## Background

- TACZ (`tacz:gun_smith_table_crafting`) recipes are ordinary datapack recipes in the vanilla RecipeManager → KubeJS `ServerEvents.recipes` can remove and re-add them.
- Default pack recipes live in the live instance at `~/Library/Application Support/PrismLauncher/instances/Unnamed Pack-0.1.0/minecraft/tacz/tacz_default_gun/data/tacz/recipes/{gun,ammo,attachments}/` — 53 gun, 24 ammo, 95 attachment JSONs. READ these for exact recipe ids/format; do not edit that instance.
- Recipe JSON shape: `{"materials":[{"item":{...ingredient...},"count":N}],"result":{"type":"gun","id":"tacz:ak47"},"type":"tacz:gun_smith_table_crafting"}`.
- Themed pack namespaces: `destiny`, `zeta` (Helldivers), `warhammer` (legacy 1.0 format — may not be in RecipeManager), plus Ghoul's + Fakelorant namespaces from WS1 report.
- The Gun Smith Table itself is already terrasteel-gated (`kubejs/server_scripts/gtceu_progression_gates.js:44-52`) — leave that.

## Deliverable 1: `kubejs/server_scripts/tacz_gating.js`

Follow the style of the existing top-level server scripts (header comment block explaining the design, `ServerEvents.recipes(event => {...})`).

1. **Remove themed-pack recipes**: `event.remove({ id: /^(destiny|zeta|warhammer|<ns4>|<ns5>):.*/ })`. This also kills their vanilla-type workbench recipes (e.g. `destiny:destiny_workbench`) — intended: themed workbenches/guns are drop-only.
2. **Remove all 53 default gun recipes** by exact id list (read them from the live instance dir; ids look like `tacz:ak47` under `data/tacz/recipes/gun/`). Remove by id, not by type, so ammo/attachment recipes survive.
3. **Re-add every default gun** via `event.custom({...})` with the same JSON shape but GT materials. Tier mapping (gun class → GT tier ingredients; 4–6 materials each, always include the original gun's "feel" material like planks/iron where sensible):
   - **HV** — pistols, shotguns, revolvers: `gtceu:stainless_steel_plate`, `gtceu:hv_electric_motor`, `gtceu:stainless_steel_screw`, vanilla wood/leather.
   - **EV** — SMGs, assault rifles, carbines: `gtceu:titanium_plate`, `gtceu:ev_electric_motor`, `gtceu:ev_voltage_coil` or springs, `gtceu:titanium_screw`.
   - **IV/LuV** — DMRs, LMGs, battle rifles: `gtceu:tungsten_steel_plate`, `gtceu:iv_electric_motor`, `gtceu:iv_emitter` (verify id), luv components for LMGs.
   - **ZPM** — sniper rifles, RPG/heavy: `gtceu:naquadah_alloy_plate` (verify), `gtceu:zpm_electric_motor`, `gtceu:zpm_field_generator` (verify).
   Verify every `gtceu:` id with a grep across `kubejs/server_scripts/star_tech/` (the ported layer uses real ids); anything unverifiable goes in the report's verification list.
4. **Ammo**: keep craftable but GT-ify lightly — replace copper/iron inputs with one GT material step up (e.g. `gtceu:brass_ingot`/`gtceu:gunpowder`-adjacent). Cheap enough to mass-produce; ammo scarcity must not kill the late-game gun fantasy. Attachments: untouched.
5. Do NOT touch `tacz:gun_smith_table` block recipe (owned by gtceu_progression_gates.js).

## Deliverable 2: fallback filter pack `tacz/supremacy_gunpack/`

Folder gun pack (packwiz will index the static files; do not run refresh):
- `tacz/supremacy_gunpack/data/tacz/recipe_filters/default.json` — blacklist: `["tacz:test", "^destiny:.*$", "^zeta:.*$", "^warhammer:.*$", "^<ns4>:.*$", "^<ns5>:.*$"]` (regex list, mirror the format used by the Destiny pack's `data/tacz/recipe_filters/default.json` in the live instance — read it first).
- Per-themed-workbench blacklist-all files: `data/destiny/recipe_filters/destiny_workbench.json` and `data/zeta/recipe_filters/terminal.json` with `"blacklist": ["^.*$"]` (confirm exact workbench filter filenames by inspecting the themed pack zips in the live instance `tacz/` folder).
- Minimal pack metadata if TACZ folder packs require one (check `tacz_default_gun/` for the marker files a folder pack carries).

## Deliverable 3: drop-only wiring in `kubejs/server_scripts/loot_drops.js`

Extend the existing LootJS script (match its style):
- Endgame boss drops: themed guns as `Item.of('tacz:modern_kinetic_gun', '{GunId:"<ns>:<gun>"}')` with low-ish chance from Cataclysm bosses (`cataclysm:ender_guardian`, `cataclysm:ignis`, `cataclysm:the_harbinger`, `cataclysm:the_leviathan` — verify entity/loot-table ids) and Bosses of Mass Destruction (`bosses_of_mass_destruction:void_blossom`, `gauntlet`, `lich`, `obsidilith`). Pick 2–4 signature guns per themed pack (read gun ids from each pack's `data/<ns>/data/guns/` or `guns/` folder in the live instance).
- MnS Atlas map loot: gun drops via `kubejs/data/mmorpg/loot_tables/` overrides — first CHECK what mmorpg loot tables exist in `kubejs/data/mmorpg/` and in the mmorpg jar's data (live instance mods folder) to find the right table to override. If no safe override point exists, put Atlas gun drops on the map-boss LootJS path instead and note it.
- Guns must NOT go into generic structure chests.

## Report
`tasks/reports/02_report.md` per conventions — include: full gun→tier→materials table, unverified `gtceu:` ids, the filter-pack file list, and every loot table touched.
