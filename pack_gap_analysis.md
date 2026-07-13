# Supremacy — Critical Gap Analysis

_Generated 2026-07-01. Independent audit of the pack vs Craft to Exile 2 (v1.1.3) and Star Technology (THETA-1)._

> **STATUS UPDATE (2026-07-01 fix session):** §1–8, §11 and most of §12 are FIXED — 9 mods added, all broken quest refs repaired, the full Star Tech kubejs content layer ported (which also fixed ~300 phantom `kubejs:` items and the quest-lang keys this audit missed), MnS XP + entity configs added, weapon/starter/loot scripts rewritten, Ad Astra woven into the Main Story. See the dated session block at the top of `dev_notes.md` for details and the new in-game verification list. Still open: Orb Forge MBD2 structures + 22 textures (§12), gem shop/economy pass (§9–10), tab restructure (§10, deferred by decision), playtest-2 backlog (§13), ops/performance mods (§15), worldgen consolidation (§16)._

> **STATUS UPDATE (2026-07-12 finish pass):** §7 (weapon policy — TACZ hybrid-gated, guns are THE
> late-game weapon with an Armory chapter), §9–10 (gem shop + reward tables + coin pass; ST tabs keep
> XP, Logbook keeps coins), §12 (Orb Forge loot wired on LootJS 2.x; EC recipes for controllers;
> MBD2 build spec written — only the in-game editor step and 22 textures remain), §13 (playtest-2
> applied, professions kept), §15 (ops/perf mods added), §17 (blood_tempered_coil wired,
> In Control rules, endgame_boss_token → Gateways) are DONE. A deeper namespace sweep than §5's found
> and fixed 30+ more broken refs (incl. Blue Skies never actually being installed). Remaining:
> **worldgen consolidation (§16 — open DECISION)**, MBD2 in-game builds, textures, and the live-server
> economy re-price. Testing list: `in_game_testing.md`. Session details: `dev_notes.md` top block._

---

## 🔴 CRITICAL — The pack is currently unfinishable

### 1. Main Story requires Stargate Journey — mod not installed
`preparing_for_dimensional_travel.snbt`, `through_the_veil.snbt`, and `event_horizon.snbt` contain **14 `sgjourney:` item tasks** (stargate base/ring/chevron blocks, DHD, crystal interface — the "Chevron Nine... Locked" climax). `sgjourney` appears nowhere in `index.toml` or `mods/`. **Three of eight flagship story chapters cannot be progressed.** This is the worst hole in the pack.

**Fix:** install Stargate Journey (it exists for 1.20.1 Forge), or rewrite the three chapters around Ad Astra rockets (currently unused — see §14).

### 2. `sovereign_circuits.snbt` requires Star Tech's private mod
Task `IV0200000000001A` requires `start_core:luv_fusion_reactor` (also the chapter icon). `start_core` is Star Tech's internal core mod, deliberately excluded — this item will never exist. Should point at the GTCEu Modern fusion reactor. `start_core:` appears **83 times across 10 chapters** total.

### 3. C2E2 Campaign ported "identical" — but its boss mods weren't
The acts are mechanically faithful and functionally broken:

| Chapter | Broken requirement | Mod status |
|---|---|---|
| `epilogue.snbt` | Kill Void Blossom, Gauntlet, Lich, Obsidilith + 2× Brimstone Nectar | Bosses of Mass Destruction — **not installed** |
| `act_iii.snbt` | Kill Captain Cornelia, Maze Mother, Maw, Eel, Tortured Soul | Aquamirae — **not installed** |
| `act_v.snbt` | Remnant Bosses kills, Outer End items | **not installed** |
| Acts I–V, repeatables | Illager Invasion (8 refs), Monster Plus, Realm RPG Wyrms, Stalwart Dungeons, Kobolds, Risk of Rain Mobs, Sea Dwellers, Friends & Foes, Chococraft, Comforts, Bountiful, Transmog, Global XP, Target Dummy, DisenchantingForge | **none installed** |

**Fix:** per mod, decide install vs rewrite. BOMD, Aquamirae, and Illager Invasion carry the most tasks — installing those three repairs most of the campaign.

### 4. `storage_solutions.snbt` (Logbook) is a Refined Storage chapter
18 `refinedstorage:` item tasks. C2E2 is an RS pack; Supremacy is an AE2 pack. The chapter needs a rewrite against AE2 (and can absorb the Star Tech AE2 material listed in dev notes), not a port.

### 5. Star Tech tabs carry the same disease
- `expandedae` — 27 refs across `ae2.snbt` + `applied_energistics.snbt`
- `exnihilosequentia` — 18 refs including **`early_game.snbt`, the first Star Tech chapter players open**
- `systeams` (6, `power.snbt`), `createdieselgenerators` + `createlowheated` + `vintage` (`early_game.snbt`), `create_hypertube`, `thermal_extra`
- `quality_of_life.snbt`: Tom's Storage, LaserIO, Travel Anchors, Building Gadgets 2, Item Collectors, Project Red, Komaru, Bingus, XTones
- `the_stars_await_greatness.snbt`: `placeablemaxwell` (5)

**In total ~40 quest-referenced namespaces have no backing mod.** Run this sweep after any mod change:

```bash
cd config/ftbquests/quests/chapters
grep -ohE '(item|entity): "[a-z_0-9]+:' *.snbt | grep -oE '"[a-z_0-9]+:' | tr -d '":' | sort -u
# diff the output against installed mod namespaces
```

---

## 🔴 CRITICAL — Systems that undermine the pack's identity

### 6. Mine & Slash has almost no entity tuning
`kubejs/data/mmorpg/mmorpg_entity/` contains exactly **one file** (`all_mobs_in_mod/soulland.json`). The pack ships L_Ender's Cataclysm, Ice and Fire, Mowzie's Mobs, Mutant Monsters, Born in Chaos, Alex's Caves/Mobs — all with vanilla-scale stats in an ARPG where player damage scales into the thousands. Without entity configs (boss rank, HP multipliers, level rules, loot tier), Ignis and the Ice Dragon are either one-shot trivia or stat-check walls, and drop no rank-appropriate loot. **This is the largest balance hole in the pack** — C2E2's entire feel comes from this tuning layer.

**Fix:** add `mmorpg_entity/all_mobs_in_mod/<namespace>.json` for every combat mod, plus `specific_mobs/` overrides for named bosses (boss rank, ×HP, min level).

### 7. The weapon policy is a sieve
Design rule: combat gear comes from Spartan Weaponry / Iron's Spells / MnS; Tinkers is tools-only. Reality:
- `weapon_disable.js` removes exactly **5 Tinkers recipes** — nothing else.
- **Tetra** is installed: full modular weapons built in its own workbench (recipe removal can't touch it), and it duplicates Tinkers' modular-tool niche too.
- **MC Dungeons Weapons** (`mcdw`): dozens of weapons, no MnS routing.
- **RoE Weapons** (`roe-weapons` + `roe-sfx`): same.
- **TACZ (Timeless and Classics Zero) + Destiny gun pack** (`tacz/destiny-gun-pack.pw.toml`): an entire gun system whose flat damage bypasses MnS conversion completely — guns will either trivialize early combat or be useless against MnS-scaled HP, and there is **zero quest coverage** for it either way.

**Fix:** pick a lane per mod — remove it, or give it real MnS compat (gear types / damage conversion) and quest coverage. Shipping four unregulated weapon systems in an MnS pack breaks the core loop.

### 8. `starter_cleanup.js` is broken and dangerous
Empty whitelist → first-join wipes **everything**, including the FTB Quests book and mod guide books; playtest confirms it deletes the main-hand item while *also* failing to clear starter clutter (both bugs still open). The bare tick-loop wipe is fragile.

**Fix:** wipe-then-regrant — clear inventory, then explicitly `give` the quest book and intended starter kit. Increase delay past 20 ticks (many mods grant items late) and whitelist by tag where possible.

---

## 🟠 HIGH — Economy and quest-book structure

### 9. Coin economy has taps but no drain
1,268 coin rewards injected into Star Tech chapters + Main Story coins, but no C2E2-style **gem shop**. `shop.snbt` is Star Tech's bulk-resource shop balanced for a different economy, and the iron→netherite tier mapping was mechanical — Lightman's fixed 10:1 exchange chain was never re-balanced against reward density. Players will drown in coins with nothing to buy.

**Fix:** port C2E2's `gem_shop.snbt` pattern (repeatable coin→gear/gem/rune-box trades), then do one holistic pricing pass across shop + rewards.

### 10. The book double-charges the same progression
Star Tech tabs and Main Story both reward the same GT milestones — craft one LV machine, collect coins twice. Duplicate chapter pairs: `ae2`/`applied_energistics`, `qol`/`quality_of_life`, `power_systems`/`power`, `multiblock_mechanics`/`mechanics`, `nuclear_chemistry`/`nuclear_fission`. ~60 chapters vs C2E2's 21 focused ones.

**Fix:** decide the Star Tech tabs' role. If reference → strip all rewards, rename tabs "Reference: …". If content → delete the Logbook duplicates. Don't ship both.

### 11. MnS XP starvation during tech stretches
The pack's thesis is ARPG × GregTech, but GT/Star Tech chapters award **zero MnS XP**. C2E2 pays `/mine_and_slash give xp_times_lvl @p <mult>` on nearly every quest. A player deep in an EBF grind gains no combat power for dozens of hours, then walks into MnS content underleveled. **This single change (command rewards across all tech chapters) does more for pack feel than any new chapter.**

### 12. Orb Forge — the signature system — exists only on paper
- 7 MBD2 machine recipe types registered, **zero multiblock structures built**
- 9 input items unobtainable — and **LootJS is not installed**, so `loot_drops.js` cannot be written as planned; nothing in the pack can inject loot tables (KubeJS data overrides replace whole tables only)
- 22 missing textures (see `texture_checklist.md`)

Until the machines exist this is a JEI ghost town of purple items. **Fix order:** install LootJS → wire the 9 drops → build `basic_modify_station` first and validate the recipe-type linkage → textures.

---

## 🟡 MEDIUM — Pack hygiene

### 13. Playtest 2 items almost all still open
- `professions.snbt` still shipped (playtest: remove)
- Tang Clan quests absent; Soul Land still siloed in its own tab instead of woven into the early book
- Andesite Alloy quest, Ironbound Tome craft, compressed-iron loot gating — all pending
- Cultivation Altar JEI visibility and Raw Spirit Iron ID unverified (`soulland_recipes.js` unchanged since playtest)

### 14. Ad Astra is installed but completely unquested
Zero `ad_astra` references in any chapter. A full space-dimension mod is dead weight — and it's the natural replacement if Stargate Journey (§1) isn't added. Either quest it (the_stars_await is thin at ~10 real quests) or cut it.

### 15. Server/ops layer is missing vs C2E2
No backup mod (FTB Backups 2 / Simple Backups), no **spark** profiler, no Login Protection, no NetherPortalFix. For 239 mods the performance layer is also thin: Embeddium/ModernFix/FerriteCore/Clumps present, but no Entity Culling, ImmediatelyFast, or network optimizer (Krypton/Canary class) — all standard in C2E2.

### 16. Worldgen stacking is untested
Terralith + Regions Unexplored + Oh The Biomes We've Gone + Explorify + Incendium + Nullscape + Towns & Towers + Structory (+Towers) + When Dungeons Arise + full YUNG's suite. Three overlapping biome overhauls dilute each other: `biome_hopper` targets get rarer, structure density balloons, and GT ore veins / MnS Atlas maps were never validated against this. C2E2 and Star Tech each commit to **one** worldgen identity. Also: **Spelunkery's** vanilla-ore overhaul next to GTCEu's ore system needs a deliberate compatibility decision.

### 17. Misc known items (tracked in dev_notes, still real)
- No In Control! — Born in Chaos bosses spawn at overworld levels
- No anti-mob-farm equivalent — AoE/spawner farms trivially grind MnS gear
- `blood_tempered_coil` — craftable dead-end item, wired to nothing
- `dimension_return.js` placeholder spawn coords
- GTCEu item-ID uncertainty table (orb forge tiers, Snow Queen `ice_bomb` gate)
- Master Bag has no Curios slot; log detection bug; MnS datapack load errors (playtest)

---

## ✅ What's genuinely solid
- Coin migration was thorough — zero `kubejs:coin` stragglers
- Star Tech config diff done properly (gtceu.yaml fixes, intentional divergences documented)
- TF / Blue Skies / Blood Magic / Botania / Orechid gates are coherent and documented
- MnS Compatibility Addon + COMPATIBLE_MODE was the right call for Iron's Spells
- Main Story arc (soul_land_awakening → the_stars_await) is a distinctive spine no other pack has
- Loose jars (amendments, entityjs, createaddition) are all tracked in `index.toml`

---

## 📋 Fix priority

1. **Missing-mod sweep** across all quest tasks (§1–5) — install-vs-rewrite decision per mod; sgjourney first (blocks your own story), then BOMD/Aquamirae/Illager Invasion (campaign), then Star Tech chapter edits
2. **MnS entity configs** for every boss/mob mod (§6)
3. **MnS XP command rewards** on all tech chapters (§11)
4. **Starter cleanup rewrite + weapon-mod policy** incl. TACZ decision (§7–8)
5. **Orb Forge**: LootJS → loot wiring → MBD2 structures → textures (§12)
6. **Economy sink** — gem shop + pricing pass (§9–10)
7. Playtest 2 backlog, Ad Astra decision, ops/performance mods, worldgen consolidation (§13–16)

Items 1–3 are the difference between "modpack" and "playable modpack."

---

## 💡 Further recommendations

- **Add a validation habit:** before every playtest, run the namespace sweep (§5 snippet) plus a `grep -c 'kubejs:'` check for items whose textures/recipes don't exist yet. Most of the critical findings here were mechanically detectable.
- **Gate tab visibility:** FTB Quests supports chapter visibility dependencies — hide Godlike Power and Star Tech tabs until their entry conditions are met so new players see 3 tabs, not 9.
- **Repeatable endgame loop:** C2E2's retention comes from `repeatables.snbt` + Atlas maps + gateways. Yours ports the repeatables but several reference missing mobs (§3); once fixed, wire `kubejs:endgame_boss_token` (§12) into a Gateways to Eternity wave as its defined source — that closes two open items with one mechanic.
- **Two teleport systems ship** (Waystones + Telepass, plus FTB Chunks map teleports if enabled) — pick one as canonical and quest it; disable or gate the rest to protect exploration content.
- **Death handling:** `corpse` is installed but ungated/unexplained — add a welcome-tab quest explaining corpse recovery, since MnS deaths will be frequent early.
- **Document the intentional divergences** (TF-from-overworld, dual soul_forged_ingot recipes, infinite AE2 channels) in a player-facing FAQ quest or the welcome tab — players coming from C2E2/Star Tech will file these as bugs otherwise.
- **CurseForge/Modrinth description risk:** the pack name in `pack.toml` is still "Unnamed Pack-0.1.0" per the root `.mrpack` — set real name/version before any distribution.
