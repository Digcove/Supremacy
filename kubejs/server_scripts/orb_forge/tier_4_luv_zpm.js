// ORB FORGE — Tier 4: LuV → ZPM
// C2E2 Gate: Act V threshold / early Maps (Lv. 50–60+)
// Station: quantum_exaltation_array (Multiblocked2 — consumes Map token AND quantum batch together)
//
// Stone IDs confirmed: mmorpg:stone/5 = Mythic
// kubejs:map_completion_token registered in startup_scripts/orb_forge_items.js
//
// Currency outputs confirmed from data files:
//   upgrade_common_affix — upgrades a Common affix on a Rare to higher tier (Exalted Orb equivalent)
//   base_number_reroll   — rerolls base stats on any gear                    (Orb of Introspection)
//
// This is the first tier requiring deliberate sustained investment from both tracks.
// Add a standalone quest chapter introduction here in FTB Quests.
//
// TODO: define "quantum_exaltation_array" in Multiblocked2 before these recipes go live
// TODO: implement loot injection for kubejs:map_completion_token
//         — drop it from the M&S map boss (Acts V maps) via a KubeJS LootJS rule or
//           mmorpg loot table override in data/mmorpg/loot_tables/
// TODO: verify ZPM Assembly Line output item in GTCEu Modern 7.5.x via JEI:
//         likely gtceu:zpm_integrated_circuit or gtceu:zpm_mainframe

ServerEvents.recipes(event => {

    // Exalted Orb (upgrades a Common-tier affix on a Rare to a higher rarity tier)
    // Combat: Mythic Stone + Map Completion Token (any Act V map)
    // Tech:   ZPM Assembly Line output (quantum component batch)
    event.custom({
        type: 'modpack:quantum_exaltation_array',
        duration: 400,
        inputs: {
            item: [
                { item: 'mmorpg:stone/5', count: 1 },
                { item: 'kubejs:map_completion_token', count: 1 },
                { item: 'gtceu:zpm_integrated_circuit', count: 1 }  // TODO: verify ID
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/upgrade_common_affix', count: 1 }] }
    })

    // Orb of Introspection (rerolls base stat values on gear)
    // Combat: Mythic Stone + Map Completion Token
    // Tech:   ZPM Assembly Line output (alternate quantum batch — use different ZPM component if available)
    event.custom({
        type: 'modpack:quantum_exaltation_array',
        duration: 400,
        inputs: {
            item: [
                { item: 'mmorpg:stone/5', count: 1 },
                { item: 'kubejs:map_completion_token', count: 1 },
                { item: 'gtceu:zpm_mainframe', count: 1 }  // TODO: verify ID; must differ from Exalted Orb recipe
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/base_number_reroll', count: 1 }] }
    })

})
