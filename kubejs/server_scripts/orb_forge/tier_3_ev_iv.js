// ORB FORGE — Tier 3: EV → IV
// C2E2 Gate: Act III–IV (Everbright / Everdawn via Blue Skies, Lv. 35–55)
// Station: cipher_engraving_table (Multiblocked2 — needs live IV Sensor + boss trophy input)
//
// Stone IDs confirmed: mmorpg:stone/3 = Epic
// Custom gate items registered in startup_scripts/orb_forge_items.js
//
// Currency outputs confirmed from data files:
//   prefix_number_reroll  — reroll the VALUES of existing prefixes  (Western Ciphers)
//   suffix_number_reroll  — reroll the VALUES of existing suffixes  (Eastern Ciphers)
//   implicit_affix_reroll — randomize the implicit stat             (Orb of Revelation)
//
// NOTE: "reroll Prefix VALUES" maps to prefix_number_reroll, NOT prefix_reroll_all.
//       prefix_reroll_all is used for Sinistral Rebirth (Tier 5) which randomizes WHICH prefixes.
//
// TODO: define "cipher_engraving_table" in Multiblocked2 before these recipes go live
// TODO: verify EV circuit item IDs in GTCEu Modern 7.5.x via JEI:
//         likely gtceu:ev_integrated_circuit or gtceu:good_circuit_board (check both)
// TODO: verify IV sensor item ID: likely gtceu:iv_sensor (component, not machine)
// TODO: wire drops for kubejs:everbright_trophy and kubejs:everdawn_trophy
//         onto Blue Skies dimension minibosses
// TODO: wire drop for kubejs:hidden_chest_relic onto a hidden chest loot table
//         (Dungeon Crawl / When Dungeons Arise structure chests are good candidates)

ServerEvents.recipes(event => {

    // Orb of Western Ciphers (reroll Prefix VALUES — not which, just the numbers)
    // Combat: Epic Stone + Everbright miniboss trophy (Blue Skies)
    // Tech:   EV Circuit Assembler output (logic-pattern circuit)
    event.custom({
        type: 'modpack:cipher_engraving_table',
        duration: 300,
        inputs: {
            item: [
                { item: 'mmorpg:stone/3', count: 1 },
                { item: 'kubejs:everbright_trophy', count: 1 },
                { item: 'gtceu:ev_integrated_circuit', count: 1 }  // TODO: verify ID
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/prefix_number_reroll', count: 1 }] }
    })

    // Orb of Eastern Ciphers (reroll Suffix VALUES)
    // Combat: Epic Stone + Everdawn miniboss trophy (Blue Skies)
    // Tech:   EV Circuit Assembler output (mirrored-pattern circuit)
    event.custom({
        type: 'modpack:cipher_engraving_table',
        duration: 300,
        inputs: {
            item: [
                { item: 'mmorpg:stone/3', count: 1 },
                { item: 'kubejs:everdawn_trophy', count: 1 },
                { item: 'gtceu:ev_integrated_circuit', count: 1 }  // TODO: verify ID; use different circuit variant if available
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/suffix_number_reroll', count: 1 }] }
    })

    // Orb of Revelation (randomize implicit stat)
    // Combat: Epic Stone + Hidden Chest Relic
    // Tech:   IV Sensor-grade component
    event.custom({
        type: 'modpack:cipher_engraving_table',
        duration: 300,
        inputs: {
            item: [
                { item: 'mmorpg:stone/3', count: 1 },
                { item: 'kubejs:hidden_chest_relic', count: 1 },
                { item: 'gtceu:iv_sensor', count: 1 }  // TODO: verify ID — might be gtceu:sensor_iv
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/implicit_affix_reroll', count: 1 }] }
    })

})
