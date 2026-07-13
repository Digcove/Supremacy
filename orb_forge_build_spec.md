# Orb Forge — MBD2 Multiblock Build Spec

_The one piece of Supremacy that cannot be authored from the repo._ MBD2 (Multiblocked2) machine
definitions are binary NBT project files created in the in-game visual editor. This document is the
complete build spec; follow the workflow at the bottom to get the results back into the repo.

## What already exists (do not redo)

- Recipe types + bare machine registrations: `kubejs/startup_scripts/orb_forge_machines.js`
- All tier recipes: `kubejs/server_scripts/orb_forge/tier_1…7.js` (`type: 'modpack:<machine_id>'`)
- Extended Crafting recipes FOR the controllers: `kubejs/server_scripts/extended_crafting_capstones.js`
- All 9 input items + loot sources (LootJS): `kubejs/server_scripts/loot_drops.js`
- Item registrations: `kubejs/startup_scripts/orb_forge_items.js`
- Textures: still missing (9 PNGs, see `texture_checklist.md`) — machines work without them.

## The 7 machines

| Machine ID | Tier | Suggested casing palette | Suggested footprint |
|---|---|---|---|
| `modpack:basic_modify_station` | ULV/LV | GT `gtceu:steel_machine_casing` + steel frame | 3×3×3, controller front-center |
| `modpack:hybrid_refinery_bench` | MV/HV | `gtceu:stainless_evaporation_casing` or clean stainless | 3×3×4 |
| `modpack:cipher_engraving_table` | EV/IV | `gtceu:titanium_turbine_casing` + assembly line glass | 5×3×3 |
| `modpack:quantum_exaltation_array` | LuV/ZPM | `gtceu:fusion_casing` accents + tungstensteel | 5×5×5 hollow |
| `modpack:fusion_forge` | UV/UHV | `gtceu:fusion_casing_mk2` ring | 5×5×5 |
| `modpack:nano_reliquary` | UEV/UIV | `gtceu:computer_casing` + advanced computer casing | 5×5×7 |
| `modpack:orb_forge` | Master | mixed: one ring of each lower casing (monument feel) | 7×7×7 |

Build guidance (applies to all):
1. Each machine needs: controller block, item input bus, item output bus, energy input hatch
   (GT-compatible), and its casing pattern. Use MBD2's GT trait/proxy parts so GT cables can power it.
2. Recipe type linkage: in the editor, set each machine's recipe type to its own `modpack:<machine_id>`.
   **The `modpack:orb_forge` master must accept ALL SEVEN recipe types and run them at 4× speed**
   (recipe modifier: duration ×0.25).
3. Energy: recipes carry EU costs in the tier scripts — make sure the energy hatch tier matches the
   machine's stated GT tier or recipes will not run.
4. Aesthetics are free — the palette column is a suggestion that matches each tier's GT look.

## Round-trip workflow (per machine, ~10 min each)

1. Launch the pack (Prism instance) with a creative test world.
2. Open the MBD2 editor (`/mbd2` or the MBD2 item), create/edit the machine matching the ID above
   — the bare registration from `orb_forge_machines.js` should appear; give it structure, model, recipe type.
3. Save. MBD2 writes binary project files to `<gamedir>/ldlib/mbd2/{machine,recipe_type}/*.mb|*.rt`.
4. Copy those files into the repo at `ldlib/mbd2/…` (create the folder), run
   `/Users/evancyrulik/go/bin/packwiz refresh`, commit.
5. **IMPORTANT**: once editor-authored definitions exist for a machine, remove its entry from the
   `MBDRegistryEvents.machine` block in `kubejs/startup_scripts/orb_forge_machines.js` (keep the
   recipeType block!) — duplicate machine registration will crash or shadow the editor version.
6. Test order: `basic_modify_station` first (validates the recipe-type ↔ machine linkage end to end),
   then the other six.

## Validation checklist per machine

- [ ] Multiblock forms (structure highlight completes)
- [ ] JEI shows the tier's orb recipes under the machine
- [ ] A recipe runs with GT power and consumes/produces correctly
- [ ] `modpack:orb_forge` runs a tier-1 recipe at 4× speed
