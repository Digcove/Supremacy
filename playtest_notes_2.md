# Playtest 2 Notes

_Resolved 2026-07-12 finish pass except where noted. Remaining items live in `in_game_testing.md`._

## Bugs / Fixes
- [ ] Master Bag cannot be equipped in Curios — need a mod to add a slot for it (STILL OPEN — in_game_testing.md §6)
- [ ] Inventory still full of items on spawn; item in main hand is deleted on first spawn (starter_cleanup rewritten 07-01; verify in game)
- [ ] Logs are still not detecting correctly (STILL OPEN — needs in-game repro)
- [x] Raw Spirit Iron is still the wrong ID
- [ ] Cultivation Altar is still not findable in JEI (verify in game)
- [ ] Mine and Slash Data Pack issues on load (verify in game)

## Content Changes
- [x] Add quests for Tang Clan items (4 quests + 2 id fixes, soul_land_weapons.snbt)
- [x] Soul Land needs to be explained further and woven into the early quest book (3 bridge quests in act_0)
- [x] Compressed Iron Ingot found in loot chest — needs to be way later gated (LootJS chest strip; root cause was a loot modifier targeting a nonexistent id)
- [x] Add Andesite Alloy quest between "Out of the Stone Age" and "Cogs and Shafts" (quest already existed; description now teaches the star_tech recipe path)
- [x] Remove Silent Gear (was never in the pack)
- [x] Remove flint compass (never registered; cut from texture checklist)
- [KEPT] Remove professions quests — user decision 2026-07-11: professions chapter stays (fits community/economy pillar)
- [x] Get rid of JEI Creative Tab reward (died with legacy reference_welcome.snbt; verified absent)
- [x] Get rid of Key Mods quest (same)
- [x] Have players craft Ironbound Tome (`only_from_crafting: true`)

## Notes
- Mining tab looks good
