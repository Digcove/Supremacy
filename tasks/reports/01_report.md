# WS1 Report — Mods & Packwiz

## Mods added (packwiz, all 1.20.1 Forge)
- `mods/spark.pw.toml` — spark 1.10.53 (Modrinth)
- `mods/entityculling.pw.toml` — EntityCulling 1.10.5 (Modrinth)
- `mods/immediatelyfast.pw.toml` — ImmediatelyFast 1.2.7+1.20.2 (Modrinth; packwiz selected it as the 1.20.1-Forge-compatible build — the `+1.20.2` in the filename is the upstream naming for the 1.20.x range build; verify at boot)
- `mods/ftb-backups-2.pw.toml` — FTB Backups 2 1.0.23 (CurseForge; Modrinth doesn't host it) + dep `mods/polylib.pw.toml`
- `mods/netherportalfix.pw.toml` — NetherPortalFix 13.0.1 (Modrinth; reused existing `balm.pw.toml` dep, no duplicate)
- `mods/in-control.pw.toml` — In Control! 9.4.6 (Modrinth)
- `mods/extended-crafting.pw.toml` — Extended Crafting 6.0.10 (Modrinth; reused existing `cucumber.pw.toml` dep, no duplicate)

## Gun packs
- **Fakelorant FIXED**: `tacz/fakelorant-gunpack.pw.toml` re-added with its real sha1 (`b23f3d35…` — it previously carried a copy of Ghoul's hash, which made both zips identical/asset-only in the live instance). Verified zip contents: **legacy 1.0-format pack**, root folder `fakelorant_pack/`, namespace **`fakelorant`**, 10 guns (ares, classic, ghost, operator, phantom, sheriff, shorty, stinger, vandal, vandal_neo), ammo indexes present, **no crafting recipes in the pack** → it is already effectively drop-only; WS2's namespace regex should still include `fakelorant` defensively. Legacy format = its recipes (none) would not be in RecipeManager anyway; recipe_filters fallback should blacklist `^fakelorant:.*$`.
- **Ghoul's Guns REMOVED**: upstream CurseForge project 1508254 has exactly ONE file (7895105, `tacz_ghouls_guns-1.0.0.zip`) and it is asset-only — 13 files, only `assets/hamster/` models/textures for colt1873 + win1873, zero `data/` → registers zero guns. Not fixable from our side. Removed from the pack; re-add if the author ships a real data file. WS2/WS4/WS5 must NOT reference Ghoul's Guns or the `hamster` namespace.
- Removed a stray `tacz/timeless-and-classics-zero.pw.toml` that `packwiz cf add` created as a dependency (TACZ already tracked in `mods/timeless-and-classics-zero.pw.toml`).

## Pack identity
- `pack.toml`: name "Unnamed Pack" → **"Supremacy"**, version 0.1.0 → **1.0.0**.
- `packwiz refresh` ran clean; `index.toml` + pack hash updated.

## Namespaces for WS2 regexes
Themed drop-only namespaces: `destiny`, `zeta` (Helldivers), `warhammer`, `fakelorant`. (No 5th namespace — Ghoul's is gone; the themed-pack count is now 4.)

## In-game verification items
- ImmediatelyFast 1.2.7 loads under 1.20.1 Forge.
- FTB Backups 2 + PolyLib boot clean.
- Fakelorant guns appear in TACZ gun catalog (namespace `fakelorant`).
