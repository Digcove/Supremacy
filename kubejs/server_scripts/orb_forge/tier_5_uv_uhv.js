// ORB FORGE — Tier 5: UV → UHV
// C2E2 Gate: Maps / endgame Atlas-equivalent (Lv. 55+)
// Station: fusion_forge (Multiblocked2 — kubejs:map_boss_drop consumed as plasma seed)
//
// Stone IDs confirmed: mmorpg:stone/4 = Legendary
// kubejs:map_boss_drop registered in startup_scripts/orb_forge_items.js
//
// Currency outputs confirmed from data files:
//   common_to_runed        — Common → Runed (25% destroy_item chance built into the currency itself)
//   affix_random_mythic_reroll — randomizes ALL affixes to mythic tier (Orb of Rebirth)
//   prefix_reroll_all      — rerolls WHICH prefixes (not just values)   (Sinistral Rebirth)
//   suffix_reroll_all      — rerolls WHICH suffixes (not just values)   (Dextral Rebirth)
//
// NOTE: common_to_runed has a native 25% destroy_item chance in its library_of_exile data definition.
//       No extra destroy mechanic needed in the recipe — the currency handles it.
//
// NOTE: prefix_reroll_all / suffix_reroll_all change WHICH affixes, not the values.
//       prefix_number_reroll / suffix_number_reroll (used in Tier 3) change VALUES only.
//
// TODO: define "fusion_forge" in Multiblocked2 before these recipes go live
// TODO: wire drop for kubejs:map_boss_drop onto M&S map bosses (endgame maps)
// TODO: verify Fusion Reactor / UHV Assembly Line output items in GTCEu Modern 7.5.x:
//         Plasma batch: gtceu:iron_plasma_bucket or gtceu:helium_plasma_bucket
//         UHV component: gtceu:uhv_integrated_circuit or gtceu:uhv_mainframe

ServerEvents.recipes(event => {

    // Orb of Runic Invocation (Common → Runed — 25% destroy chance is native to this currency)
    // Combat: Legendary Stone + Map Boss Drop (consumed as fusion seed)
    // Tech:   Fusion Reactor Mk1 plasma batch
    event.custom({
        type: 'modpack:fusion_forge',
        duration: 500,
        inputs: {
            item: [
                { item: 'mmorpg:stone/4', count: 1 },
                { item: 'kubejs:map_boss_drop', count: 1 },
                { item: 'gtceu:helium_plasma_bucket', count: 1 }  // TODO: verify — or iron_plasma_bucket
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/common_to_runed', count: 1 }] }
    })

    // Orb of Rebirth (randomize ALL affixes to mythic-tier — highest reroll)
    // Combat: Legendary Stone + Map Boss Drop
    // Tech:   UHV Component Assembly Line output
    event.custom({
        type: 'modpack:fusion_forge',
        duration: 500,
        inputs: {
            item: [
                { item: 'mmorpg:stone/4', count: 1 },
                { item: 'kubejs:map_boss_drop', count: 1 },
                { item: 'gtceu:uhv_integrated_circuit', count: 1 }  // TODO: verify ID
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/affix_random_mythic_reroll', count: 1 }] }
    })

    // Sinistral Rebirth (reroll WHICH prefixes — new affixes, not just new values)
    // Combat: Legendary Stone + Map Boss Drop
    // Tech:   UHV Assembly Line output (prefix-filter variant)
    event.custom({
        type: 'modpack:fusion_forge',
        duration: 500,
        inputs: {
            item: [
                { item: 'mmorpg:stone/4', count: 1 },
                { item: 'kubejs:map_boss_drop', count: 1 },
                { item: 'gtceu:uhv_mainframe', count: 1 }  // TODO: verify ID; must differ from Orb of Rebirth
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/prefix_reroll_all', count: 1 }] }
    })

    // Dextral Rebirth (reroll WHICH suffixes — new affixes, not just new values)
    // Combat: Legendary Stone + Map Boss Drop
    // Tech:   UHV Assembly Line output (suffix-filter variant)
    event.custom({
        type: 'modpack:fusion_forge',
        duration: 500,
        inputs: {
            item: [
                { item: 'mmorpg:stone/4', count: 1 },
                { item: 'kubejs:map_boss_drop', count: 1 },
                { item: 'gtceu:uhv_field_generator', count: 1 }  // TODO: verify ID; must differ from other UHV recipes
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/suffix_reroll_all', count: 1 }] }
    })

})
