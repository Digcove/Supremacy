// ORB FORGE — Tier 2: MV → HV
// C2E2 Gate: Act II–III (Nether / Undergarden, Lv. 10–40)
// Station: hybrid_refinery_bench (Multiblocked2 — requires simultaneous HV Centrifuge + Salvage feed)
//
// Stone IDs confirmed from mmorpg JAR:
//   mmorpg:stone/1 = Uncommon,  mmorpg:stone/2 = Rare
// Custom gate items (kubejs:) registered in startup_scripts/orb_forge_items.js
//
// Currency outputs confirmed from library_of_exile data files:
//   gear_rarity_random  — Common → random rarity  (Orb of Colors)
//   gear_rarity_upgrade — rarity +1               (Orb of Ascension)
//   affix_reroll_all    — reroll ALL affixes       (Chaos Orb equivalent)
//
// TODO: define "hybrid_refinery_bench" in Multiblocked2 before these recipes go live
// TODO: verify HV machine output items in GTCEu Modern 7.5.x via JEI:
//         gtceu:gold_dust (Centrifuge), gtceu:sodium_dust (Electrolyzer),
//         gtceu:sulfuric_acid_bucket (Chem Reactor — or a dry item if fluid not supported)
// TODO: wire drop for kubejs:blaze_touched_residue onto Nether mob loot tables
// TODO: wire drop for kubejs:undergarden_reagent onto Undergarden mob loot tables
// TODO: wire drop for kubejs:undergarden_boss_drop onto Undergarden miniboss (Grottol/Forgotten)

ServerEvents.recipes(event => {

    // Orb of Colors (Common → random rarity)
    // Combat: Uncommon Stone + Blaze-Touched Residue (Nether-exclusive)
    // Tech:   HV Centrifuge output — gold dust as proxy for "sorted rarity catalyst"
    event.custom({
        type: 'modpack:hybrid_refinery_bench',
        duration: 200,
        inputs: {
            item: [
                { item: 'mmorpg:stone/1', count: 1 },
                { item: 'kubejs:blaze_touched_residue', count: 1 },
                { item: 'gtceu:gold_dust', count: 2 }
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/gear_rarity_random', count: 1 }] }
    })

    // Orb of Ascension (Rarity +1)
    // Combat: Rare Stone + Undergarden-exclusive Reagent
    // Tech:   HV Electrolyzer output — sodium dust as proxy for "refined catalyst"
    event.custom({
        type: 'modpack:hybrid_refinery_bench',
        duration: 200,
        inputs: {
            item: [
                { item: 'mmorpg:stone/2', count: 1 },
                { item: 'kubejs:undergarden_reagent', count: 1 },
                { item: 'gtceu:sodium_dust', count: 2 }
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/gear_rarity_upgrade', count: 1 }] }
    })

    // Chaos Orb (reroll ALL affixes on any gear)
    // Combat: Rare Stone + named Undergarden miniboss drop
    // Tech:   HV Chemical Reactor output — sulfur dust as proxy for "unstable reagent"
    event.custom({
        type: 'modpack:hybrid_refinery_bench',
        duration: 200,
        inputs: {
            item: [
                { item: 'mmorpg:stone/2', count: 1 },
                { item: 'kubejs:undergarden_boss_drop', count: 1 },
                { item: 'gtceu:sulfur_dust', count: 2 }
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/affix_reroll_all', count: 1 }] }
    })

})
