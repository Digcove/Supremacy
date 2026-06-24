// ORB FORGE — Tier 6: UEV → UIV  (pack's current frontier)
// C2E2 Gate: Post-campaign / repeatable endgame loop
// Station: nano_reliquary (Multiblocked2 — frontier of GTCEu Modern supported content)
//
// Stone ID: mmorpg:stone/5 = Mythic (no "Mythic+" stone exists in mmorpg — using Mythic with extra token)
// kubejs:endgame_boss_token registered in startup_scripts/orb_forge_items.js
//
// Output confirmed from currencies_salvage_recipe.json loot table:
//   dungeon_realm:uber_upgrade — Stone of Hope (full item recreate, rarity floor preserved)
//
// The combat token is intentionally REPEATABLE (recurring boss reward, not a one-time unique).
// This keeps the recipe alive if the endgame boss is later reworked.
//
// Orb of Reflection (Mirror) is intentionally NOT included.
//   mmorpg:currency/mirror exists as an item but should remain drop-only.
//   Add a locked/greyed FTB Quests placeholder entry that explains it cannot be crafted.
//   See design doc: a mirror-equivalent needs a third non-stockpilable gate, not a harder dual-gate.
//
// TODO: define "nano_reliquary" in Multiblocked2 before this recipe goes live
// TODO: verify UIV nano-component item in GTCEu Modern 7.5.x via JEI:
//         likely gtceu:uiv_integrated_circuit or a UIV module item
// TODO: wire drop for kubejs:endgame_boss_token onto appropriate repeatable endgame boss
// TODO: confirm dungeon_realm mod is still in pack and uber_upgrade item ID unchanged

ServerEvents.recipes(event => {

    // Stone of Hope (full item recreate, keeps rarity floor — riskiest endgame crafting option)
    // Combat: Mythic Stone + repeatable Endgame Boss Token (extra token distinguishes Mythic+ tier)
    // Tech:   UIV Nano-component batch
    event.custom({
        type: 'modpack:nano_reliquary',
        duration: 600,
        inputs: {
            item: [
                { item: 'mmorpg:stone/5', count: 1 },
                { item: 'kubejs:endgame_boss_token', count: 1 },
                { item: 'gtceu:uiv_integrated_circuit', count: 1 }  // TODO: verify ID
            ]
        },
        outputs: { item: [{ item: 'dungeon_realm:uber_upgrade', count: 1 }] }
    })

    // --- Orb of Reflection: intentionally absent ---
    // mmorpg:currency/mirror exists but crafting it destroys the rare-item economy.
    // Leave a locked FTB Quests entry with flavor text instead.

})
