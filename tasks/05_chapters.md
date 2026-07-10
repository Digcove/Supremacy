# WS5 — New & Rewritten Chapters (Armory, Commerce, Welcome, fills)

Read `tasks/00_conventions.md` first — especially the quest writing standard. This is the flagship "teaching quest book" workstream; quality bar is highest here. Style reference chapters: `dungeons.snbt` (structure), `alchemy.snbt` (multi-branch teaching), `act_i.snbt` (narrative voice).

## Deliverable 1: `config/ftbquests/quests/chapters/armory.snbt` (NEW)

Group `274C28999D7BBD26` (Adventure), order_index 3, ID prefix `5C5C`, icon `tacz:gun_smith_table`. ~22–28 quests.

Design (guns are THE late-game weapon — this chapter is their documentation):
1. **Intro arc**: why guns exist in Supremacy (flat DPS that bypasses melee scaling — honest teaching about when guns beat MnS melee), the Gun Smith Table (item task; its recipe is terrasteel-gated — explain the Botania prerequisite), TACZ controls (checkmark: reload, aim, fire-mode keys).
2. **Tier ladder** (mirrors WS2's gating — read `tasks/02_guns.md` and, if present, `tasks/reports/02_report.md` for the exact gun→tier map): HV sidearms → EV rifles → IV/LuV support weapons → ZPM snipers/heavy. One quest per class with an item task on a representative GT component (e.g. `gtceu:hv_electric_motor`) + a checkmark or item task on a representative gun. Teach the GT chain needed at each step.
3. **Ammo logistics**: crafting ammo at scale (GT assembler/Create), the ammo box curios.
4. **Attachments & gun leveling**: TACZ attachment system, tacz-weapon-leveling mod mechanics.
5. **Drop-only arsenal** (lore quests, checkmark or kill tasks): the five themed packs — Destiny, Helldivers, Warhammer 40K Darktide, Ghoul's, Fakelorant — each quest names WHERE they drop (endgame bosses: Cataclysm/BOMD; MnS Atlas maps; the Gem Shop's Armory crate) without spoiling exact rates.
6. **Capstone**: "Supremacy Through Firepower" — kill task on an endgame boss (e.g. `cataclysm:the_harbinger`) + netherite coin reward.
Rewards: coins (emerald/diamond tier), ammo bundles, GT components. MnS XP 150 template on each quest.

## Deliverable 2: `config/ftbquests/quests/chapters/commerce.snbt` (NEW)

Group `1E24DF067925061D` (Home Sweet Home), order_index 5, ID prefix `5E5E`, icon `lightmanscurrency:coin_gold`. ~15–18 quests. This is the server-community pillar.

1. **Currency 101**: Lightman's coin tiers and 10:1 exchange (item task: hold any coin; teach the ATM/coin mint).
2. **Your first shop**: Lightman's display case / vending machine / trader blocks — item tasks walking through placing a shop, setting prices, collecting earnings. Teach that OTHER PLAYERS are the economy.
3. **Trading posts**: Goblin Traders (find quest), villager trading hall basics.
4. **Team & land**: FTB Teams (join/create a team), FTB Chunks claiming (checkmark teaching claim UI), why claims matter on a server.
5. **Travel network**: Waystones as the canonical public-travel system (craft + activate tasks).
6. **Builder's showcase**: 3–4 quests on Macaw's/Handcrafted/Supplementaries/Amendments — teaching that shops and towns need to LOOK like shops and towns; reward decorative block bundles.
7. **Capstone**: "Pillar of the Community" — checkmark self-certify quest (built a public shop), diamond coin reward.
Rewards: iron/gold coins, decorative bundles, a Waystone. MnS XP 50 template.

## Deliverable 3: rewrite `config/ftbquests/quests/chapters/welcome.snbt`

ID prefix `5D5D` for NEW objects; keep existing functional quests' ids where retained. Replace the 3 DEV NOTE quests. Keep it ungrouped (welcome screen works without a tab). Target 10–14 quests:
1. **Welcome to Supremacy** — what the pack is: tech (GregTech) × magic (Botania/Ars/Blood/Soul Land) × DPS checks (MnS), on a community server. Autofocus this quest (`autofocus_id` in chapter header).
2. **How to read this book** — tab tour: Main Story (the spine), Campaign (ARPG leveling), Star Tech (GT bible), Home Sweet Home, Adventure, Godlike Power.
3. **Death & recovery** — Corpse mod: your grave keeps items; MnS deaths are frequent early; no item loss panic.
4. **Mine & Slash 5-minute primer** — levels, gear rarity, salvaging; point at Campaign act_0.
5. **FAQ / intentional divergences** (checkmark quests, teaching tone): Twilight Forest opens from the Overworld (GT needs its trophies); two soul_forged_ingot recipes = two valid paths (magic vs tech); AE2 channels are infinite here; Tinkers is TOOLS ONLY, weapons come from Spartan/Iron's/MnS/guns; guns are late-game — don't expect an early musket.
6. **Server etiquette** — claims, shops (point at Commerce chapter), no grief.
7. Keep the existing functional AE2/config-toggle quests if they still make sense; evaluate each (AE2 channels are infinite — drop any quest that teaches channel management).
8. Update `autofocus_id` to the new intro quest id.

## Deliverable 4: thin-chapter fills (ID prefix `5F5F`)

- `jewlery.snbt` +4: Curios slots explainer (how to equip rings/necklaces), Soul Land soul rings vs MnS jewelry (two systems, different slots), one unique-jewelry example quest, socket orbs pointer.
- `armor.snbt` +3: armor-paths intro as the new chapter root (physical/MnS vs Soul Land vs GT), GT plate armor quest chain entry (rubber→bronze→steel plates), a "weapons are elsewhere" teaching note (Tinkers tools-only).
Wire dependencies so new quests sit at the chapter's logical entry/branch points; don't reflow existing layout.

## Verification
- Duplicate-ID check (all four prefixes) across whole book.
- Brace-balance parse check on all touched files.
- Every item id used in tasks/icons greps to a real source (`mods/`, `kubejs/`, or vanilla).
- Report → `tasks/reports/05_report.md`.
