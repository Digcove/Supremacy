# WS5 Report — New & Rewritten Chapters (Armory, Commerce, Welcome, fills)

## Files created
- `config/ftbquests/quests/chapters/armory.snbt` — NEW, 23 quests, group `274C28999D7BBD26` (Adventure), order_index 3, icon `tacz:gun_smith_table`, chapter id `5C5CC00000000000`.
- `config/ftbquests/quests/chapters/commerce.snbt` — NEW, 17 quests, group `1E24DF067925061D` (Home Sweet Home), order_index 5, icon `lightmanscurrency:coin_gold`, chapter id `5E5EC00000000000`.

## Files modified
- `config/ftbquests/quests/chapters/welcome.snbt` — full rewrite, 10 quests (was 9 incl. 3 DEV NOTE stubs). Chapter id `75840ED996FEA6DB` kept; `autofocus_id` now `5D5D000000000001`; chapter title keeps the `{ftbquests.welcome.title}` lang key.
- `config/ftbquests/quests/chapters/jewlery.snbt` — +1 quest (`5F5F000000000001` "Sockets and Gems"), dep on Curios Slots quest. Existing quests untouched.
- `config/ftbquests/quests/chapters/armor.snbt` — +1 quest (`5F5F000000000002` "Weapons Are Elsewhere"), dep on Armor Paths root. Existing quests untouched.

## Armory design (as built)
- Intro arc: Firepower Doctrine (flat DPS vs MnS melee scaling, honest teaching) → The Terrasteel Toll (`botania:terrasteel_ingot` task; teaches the spirit-iron→manasteel→terrasteel gate) → Gun Smith Table (item task) → Controls and Handling (checkmark; only key named literally is R, everything else points at Options→Controls→TACZ).
- Tier ladder, 8 quests in two parallel chains, matching `tasks/02_guns.md` (no 02_report.md existed at time of writing):
  - HV Sidearms (`gtceu:stainless_steel_plate` x4) / HV Scatterguns (`gtceu:hv_electric_motor`)
  - EV SMGs (`gtceu:titanium_plate` x4) / EV Assault Rifles (`gtceu:ev_electric_motor`)
  - IV Marksman Rifles (`gtceu:tungsten_steel_plate` x4) / LuV Machine Guns (`gtceu:iv_electric_motor`)
  - ZPM Precision Rifles (`gtceu:zpm_electric_motor`) / ZPM Ordnance (`gtceu:zpm_field_generator`)
  - Each pairs the GT component item task with a checkmark "craft any X" (avoids NBT-exact matching on gun items).
- Ammo logistics: Ammunition Works (item task `tacz:ammo`, teaches brass GT-ification), The Ammo Box (`tacz:ammo_box`; covers Curios for Ammo Box + Applied Ammo Box AE2 link), Feeding the War Machine (automation checkmark).
- Attachments (`tacz:attachment` item task) + Weapon Leveling (checkmark, tacz-weapon-leveling).
- Drop-only arsenal: header "Relics of Distant Wars" + exactly FOUR themed packs per WS1 report — Destiny, Helldivers (zeta), Warhammer 40K Darktide, Fakelorant. No Ghoul's/hamster references anywhere. Each names the three sources (Cataclysm/BOMD boss drops, MnS Atlas maps, Gem Shop Armory Crate) without rates.
- Capstone "Supremacy Through Firepower": kill task `cataclysm:the_harbinger` 1x, `coin_netherite` reward.
- Every quest carries the MnS XP 150 template; item rewards are emerald/diamond coins, ammo bundles (`tacz:ammo` + `AmmoId` NBT), and brass.

## Commerce design (as built)
Currency 101 root (item task: hold an iron coin) → Coin Mint → ATM → Wallets; shop chain Display Case → Vending Machine → Trading Terminal; Goblin Traders (checkmark) → villager trading (advancement task `minecraft:adventure/trade`); FTB Teams → FTB Chunks (checkmarks; Teams quest teaches that quest progress is per-team); Waystones (item, rewards a waystone) → Warp Stone/scrolls; 3 builder's-showcase quests (Macaw's / Handcrafted / Supplementaries+Amendments, checkmarks with decorative-bundle rewards); capstone "Pillar of the Community" (self-certify checkmark, 3 diamond coins). MnS XP 50 template on every quest.

## Welcome rewrite (as built)
Intro (autofocused, size 3) → How to Read This Book / Death & Recovery (Corpse mod) / MnS 5-minute primer (points at Campaign Act 0) → 5 FAQ checkmarks (Twilight opens early because GT needs trophies; two soul_forged_ingot recipes = two valid paths; AE2 channels infinite — confirmed in `config/ae2/common.json` `channels: "infinite"`; Tinkers tools-only; guns come late → Armory pointer) → Server Etiquette (points at Commerce).
- Dropped: all 3 DEV NOTE quests, all 5 AE2 channel-mode command quests, and the invisible positioner. Rationale: channels are infinite by shipped config, so channel-mode toggles teach a dead system; the FAQ quest documents the divergence instead. The `ftbquests.welcome.*x_channels` lang keys are now unused but were NOT removed from `kubejs/assets/ftbquestlocalizer/lang/en_us.json` (per conventions, don't break keys).

## Deviations from task file
1. **Deliverable 4 was mostly pre-done.** Commit `368dcce` ("Expand armor and jewelry chapters") already added the Curios-slots explainer, Soul-Land-vs-MnS rings, and unique-jewelry quests to jewlery.snbt (ids `JW01…`) and the armor-paths intro + full GT plate chain (rubber→bronze→steel→aluminium→titanium, ids `AR01…`) to armor.snbt. I added only the genuinely missing pieces: the socket-orbs pointer (jewlery) and the weapons-are-elsewhere note (armor). Net +1 per file instead of +4/+3.
2. Armory is 23 quests (spec ~22–28) with the drop-only section covering 4 packs, not 5, per WS1.
3. WS2's report didn't exist; the tier ladder mirrors the mapping in `tasks/02_guns.md` directly, as instructed.

## Flagged for in-game verification
- `gtceu:tungsten_steel_plate` — material `tungsten_steel` confirmed in the GTCEu 7.5.3 jar (crate/drum entries), but the plate item is runtime-generated so the exact id couldn't be grepped. Used per spec; verify in JEI.
- `cataclysm:the_harbinger` kill-task entity id — loot table `data/cataclysm/loot_tables/entities/the_harbinger.json` confirms the path; verify the entity registry id matches.
- Quest icons using `tacz:modern_kinetic_gun` + `{GunId:...}` NBT (and `tacz:ammo` + `{AmmoId:...}` rewards) — NBT key names `GunId`/`AmmoId`/`AttachmentId` verified against TACZ 1.1.8 class constants; verify the gun icons render in the quest UI (TACZ items are geckolib-rendered).
- `fakelorant:vandal` GunId — from WS1's verified gun list; the live instance still has the stale (Ghoul's-asset) fakelorant zip, so it couldn't be re-verified locally.
- Themed icons `destiny:gjallarhorn`, `zeta:mgx42`, `warhammer:kantrael_xii` — verified against pack zip index files.
- `tacz:attachment` and `tacz:ammo` bare item tasks (no NBT) — confirm FTBQ's default fuzzy match accepts NBT-carrying drops.

## Pre-existing issues flagged (NOT touched — outside my spec)
- **Duplicate quest IDs `AE01000000000001`–`AE01000000000009` are DEFINED in both `ae2.snbt` and `voltage_and_vitality.snbt`.** Per conventions a duplicate id crashes the book on load. Needs the integration pass (one file's definitions must be re-id'd or the duplicate chapter content removed).
- The Gun Smith Table gate recipe (`kubejs/server_scripts/gtceu_progression_gates.js:52`) uses ingredient `botania:terrasteel` — the Botania item id is `botania:terrasteel_ingot` (block is `terrasteel_block`). If `botania:terrasteel` resolves to nothing, the table is uncraftable. Owned by the gating workstream; verify in-game.
- Legacy non-hex quest ids (`DG01…`, `JW01…`, `AR01…` contain non-hex letters G/J/R/W) exist in committed chapters and apparently load fine; all WS5 ids are strict uppercase hex per conventions.

## Verification run
- Duplicate-ID check across the whole book: my four prefixes (5C5C/5D5D/5E5E/5F5F) are collision-free; only the pre-existing AE01 duplicates above were found.
- Brace/bracket balance (string-aware) passes on all five touched files.
- Tab indentation, LF endings, no trailing whitespace confirmed on all five files.
- Every item id used in tasks/icons/rewards greps to a mod jar model, kubejs script, pack zip index, or vanilla (list above for the runtime-generated exceptions).
- No packwiz refresh run, no commits made, no other chapters edited.
