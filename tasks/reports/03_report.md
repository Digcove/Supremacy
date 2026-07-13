# WS3 Report — Quest Reward Audit + Playtest-2 Edits

ID prefix used: `3A3A` (all new quest/task/reward ids). No commits made, no packwiz refresh run.

## Files modified

Quest chapters (`config/ftbquests/quests/chapters/`):
- `ae2.snbt` — extra task re-IDs + 25 diamond coin rewards
- `armor.snbt`, `dungeons.snbt`, `nuclear_chemistry.snbt`, `mystical_agriculture_gregified.snbt`, `biome_hopper.snbt`, `fishing.snbt`, `culinary_arts.snbt`, `homestead.snbt`, `professions.snbt`, `structures.snbt` — Part B coin rewards
- `multiblock_mechanics.snbt`, `nuclear_chemistry.snbt` — Part C duplicate-`rewards:`-key merge (pre-existing bug)
- `soul_land_weapons.snbt` — D3 Ironbound Tome fix; D4 Tang Clan fixes + 4 new quests
- `act_0.snbt` — D5: 3 Soul Land bridge quests
- `sovereign_circuits.snbt` — pre-existing duplicate task id fixed (found by the dup sweep)

Other:
- `kubejs/assets/ftbquestlocalizer/lang/en_us.json` — D1 andesite alloy description rewrite (key preserved)
- `kubejs/server_scripts/loot_drops.js` — D6 WS3 section appended after the WS2 section
- `kubejs/data/kubejs/forge/loot_modifiers/remove_compressed_iron.json` — D6 wrong-item-id fix

## Extra task — AE01 duplicate quest ids (crash-critical)

`AE01000000000001`–`09` were defined in BOTH `ae2.snbt` (Logbook) and `voltage_and_vitality.snbt` (Main Story). Re-ID'd the nine quests in `ae2.snbt`; `voltage_and_vitality.snbt` keeps the originals. Mapping:

| Old (kept in V&V) | New (ae2.snbt) |
|---|---|
| AE01000000000001 | 3A3AA1EBEA96F96D |
| AE01000000000002 | 3A3AD58DCD5BB221 |
| AE01000000000003 | 3A3AA5EAB1BE9CB8 |
| AE01000000000004 | 3A3ADB9605FCB7D5 |
| AE01000000000005 | 3A3AAAF0CF8B8B9B |
| AE01000000000006 | 3A3A5B74B81A2685 |
| AE01000000000007 | 3A3A6920E4FBE6E5 |
| AE01000000000008 | 3A3AA374D9F495EA |
| AE01000000000009 | 3A3AD1D28D629131 |

All references updated. Grep before/after confirmed the only other referencer is `sovereign_circuits.snbt` (`dependencies: ["AE01000000000007"]`), which is a Main Story chapter following voltage_and_vitality — it correctly keeps pointing at the V&V copy and was left untouched.

## Part A — MnS XP gap fill

Audit script (brace-tracking, tab/LF preserving) in session scratchpad (`snbt_tools.py`, not committed). Result: **all 22 target chapters already have 100% `xp_times_lvl` coverage except `mechanics`** (0/19). Every `mechanics` quest is a checkmark-only lore node with an empty/absent rewards array — per spec these keep zero rewards, so **no injections were made**. Deviation from the "≥80% coverage" verification line: `mechanics` fails it by design; all other 21 chapters are at 100%.

## Part B — Coin rewards (225 injected)

One coin reward per meaningful quest; intro/lore/trivial quests skipped; chapter-completion quests ~2×. Coverage per chapter:

| Chapter | Tier | Rewards | Coverage |
|---|---|---|---|
| ae2 | diamond 1–3, completion 6 | 25 | 78% |
| armor | gold 3–5 (≤diamond-tier) / emerald 2–5 (netherite+/late GT) | 14 | 82% |
| dungeons | emerald 2–4, completion 8 | 10 | 83% |
| nuclear_chemistry | emerald 2–5 → diamond 1–3 at the fissile line, completion 4 | 17 | 77% |
| mystical_agriculture_gregified | gold 3–8, completion 12 | 72 | 68% |
| biome_hopper | iron 5–15 → gold 2–4 (other-dimension biomes), completion 8 gold | 20 | 80% |
| fishing | iron 5–15, completion 30 | 16 | 80% |
| culinary_arts | iron 5–12, completion 25 | 10 | 76% |
| homestead | iron 5–10, completion 20 | 14 | 73% |
| professions | iron 5–10, completion 25 | 12 | 80% |
| structures | iron 5–15 + gold for AE2 Meteorite/completion | 15 | 78% |

Note: `mystical_agriculture_gregified` is a Star Tech chapter — only rewards were touched (allowed by task file); content untouched.

## Part C — Logbook dedupe audit

- The 5 Star Tech counterpart tabs (`applied_energistics`, `quality_of_life`, `power`, `mechanics`, `nuclear_fission`) reward **only coins and XP — zero `type:"item"` non-coin rewards**. So no Logbook item reward hands out the same item as a Star Tech quest; the Logbook `mmorpg:` consumable rewards (Mirror of Splendor, salvage stones) were all kept. **No strips performed.**
- Real bug found and fixed instead: every quest in `multiblock_mechanics.snbt` (16) and `nuclear_chemistry.snbt` (22) had **two `rewards:` keys** — a stray injected XP-only array plus the original array which already contained the same XP reward (double-pay + undefined snbt duplicate-key behavior). Merged each into a single array, dropping the duplicated XP reward and keeping the original XP + item rewards (and Part B coins).

## Part D — Playtest-2 edits

1. **Andesite Alloy** — the anchor quests "Out of the Stone Age" / "Cogs and Shafts" do not exist anywhere in the current book (searched all chapters + lang; they belonged to the pre-restructure book). An andesite alloy quest already exists in `early_game.snbt` (id `039D327E919878BF`, item task `create:andesite_alloy`, wired off the Create-path entry `4EBEB19735285EF4`). **Action taken:** rewrote its lang description (`ftbquests.early_game.andesite_alloy.description`) to teach the actual Star Tech path — vanilla recipe removed by `star_tech/common/mass_removals.js`; replacements in `star_tech/default/modifications/create/base.js` (2× alloy from 2 iron nuggets + 2 Ex Nihilo andesite pebbles; 16× from 4 andesite + 5 iron nuggets). No structural quest changes needed.
2. **JEI Creative Tab reward / Key Mods quest** — both lived in the legacy `reference_welcome.snbt` (reward item `jei:jei_creative_tab`, quest "Key Mods"), which was deleted wholesale in the quest-book restructure (commit 48dabfc). Verified absent from the entire current book (chapters, reward_tables, lang). **Nothing to remove.**
3. **Ironbound Tome** — quest `5976D1DDED910B15` ("Iron's Spellbook", `soul_land_weapons.snbt`) had a plain detect item task. Added `only_from_crafting: true` to task `3F2B5D7A9C1E3F81` (field confirmed present in ftb-quests-forge-2001.4.22) and extended the description to say the quest completes only on craft. Confirmed the tome is craftable (mod recipe: chains/leather/paper) and **no reward anywhere hands out the tome**.
4. **Tang Clan quests** — `soul_land_weapons.snbt` already had a 9-quest Tang Sect section, with two **broken task item ids** now fixed: `soulland:sleeve_dart` → `soulland:silent_sleeve_dart`, `soulland:buddha_fury_tang_lotus` → `soulland:buddhas_fury_tang_lotus` (verified against soulland-1.0.0.jar lang/registry). Also gave the previously floating "Buddha's Fury Tang Lotus" quest a dependency on Continental Tournament. Added 4 new quests (all item ids jar-verified): **Tang Sect Regalia** (4-piece armor set), **Needles and Shadows** (bone_piercing_needle / tense_back_crossbow / powder_shooting_shadow), **Sect Inheritance Token** (recipe taught from the mod's actual shapeless recipe), **Legendary Hidden Weapons** (yamas_invitation + bodhi_blood). All optional, laid out on the existing grid.
5. **Soul Land in act_0** — added 3 bridge quests to `act_0.snbt` ("Prologue", Campaign), placed off the main chain at x=8.5: **A Second Path: Soul Land** (dependency-free checkmark pointing at the Soul Land Awakening / Main Story tab), **Reading the Beasts** (`soulland:spirit_detector` item task), **Your First Soul Ring** (`soulland:white_soul_ring` item task). Internal chain only; no hooks into the CTE2 page chain; act_0 house style (`&` codes, plain-text tone) matched.
6. **Compressed iron late-gating** — root cause found: the pre-existing forge global loot modifier `kubejs/data/kubejs/forge/loot_modifiers/remove_compressed_iron.json` targeted `pneumaticcraft:compressed_iron_ingot`, an id that **does not exist** (real id: `pneumaticcraft:ingot_iron_compressed`, verified from the PNC:R 6.0.22 jar) — it was a silent no-op, which is why playtest 2 still saw the ingot in chests. Fixed the JSON id AND appended a clearly-commented WS3 section at the end of `loot_drops.js` (after the WS2 section) stripping `pneumaticcraft:ingot_iron_compressed` and `pneumaticcraft:compressed_iron_block` from all `LootType.CHEST` tables.

## Bonus fix (found by verification)

- `sovereign_circuits.snbt` had a pre-existing duplicate id `IV0200000000001A` (two task objects: hpca_heat_sink_component and luv_fusion_reactor). Re-ID'd the luv_fusion_reactor task to `3A3AE1B7096C44D2`. This was the same crash class as the AE01 issue.

## Verification results

- Brace/bracket balance: PASS on all 73 snbt files under `config/ftbquests/` (chapters + reward_tables + data + chapter_groups).
- Duplicate-ID sweep: PASS — 12,598 id declarations, zero duplicates (includes the new WS4/WS5 chapters and reward_tables).
- Dependency resolution: every dependency ref in every chapter resolves to an existing object id (note: some deps intentionally point at *task* ids, which FTBQ allows).
- Tabs/LF/trailing-whitespace: clean in all touched files; lang JSON and loot-modifier JSON parse; `node --check` passes on `loot_drops.js`.
- Part A coverage: 100% in all chapters except `mechanics` (all-lore, by design).

## Flagged for in-game verification

1. `only_from_crafting` on the Ironbound Tome task — confirm it fires from a crafting-table craft (and consider whether shift-click bulk crafting registers).
2. Tang Sect mid-tier hidden weapons (`bone_piercing_needle`, `tense_back_crossbow`, `powder_shooting_shadow`) — confirm they are obtainable via the Forging Table in-game (they have no datapack recipes; the forging system is custom code). The "Needles and Shadows" descriptions phrase their mechanics from novel canon — sanity-check against actual tooltips.
3. act_0 uses `progression_mode: "linear"` — confirm the three dependency-free bridge quests are visible/completable immediately.
4. Compressed iron: confirm chests no longer roll it. If PNC's injection somehow bypasses LootJS CHEST-type matching, the fallback is `enable_dungeon_loot = false` in `config/pneumaticcraft-common.toml`.
5. `soulland:sect_inheritance_token` ingredients (`jade_phosphor_moss`, `heaven_blue_vine`, `immortal_herb`) — ids read from the mod jar recipe; confirm herb availability in the pack's worldgen.

## Deviations from task file

- Part A required zero injections (previous passes already covered everything); the injection tooling was still written and used for auditing/Part B.
- Part D1 adapted: anchor quests named in the spec don't exist; upgraded the existing andesite quest's lang description instead of inserting a duplicate quest.
- Part D2 was already satisfied by the earlier book restructure; verified rather than edited.
- Part C performed no item strips (nothing qualified) but fixed the duplicate-`rewards:`-key double-pay bug in the two affected Logbook chapters.
- Playtest note "Remove professions quests" was NOT actioned — task file explicitly says the professions chapter stays (it received iron coins per Part B).
