// ORB FORGE — Master: The Orb Forge (orb_forge)
// All tier 1–6 recipes duplicated at 4x speed (duration ÷ 4).
// Inputs and combat gates are IDENTICAL to the tier stations — no reduced cost.
// The reward for building the Orb Forge is throughput, not cheaper materials.
//
// Tier speed reference:
//   Tier 1 (basic_modify_station):        100 ticks → 25 here
//   Tier 2 (hybrid_refinery_bench):       200 ticks → 50 here
//   Tier 3 (cipher_engraving_table):      300 ticks → 75 here
//   Tier 4 (quantum_exaltation_array):    400 ticks → 100 here
//   Tier 5 (fusion_forge):                500 ticks → 125 here
//   Tier 6 (nano_reliquary):              600 ticks → 150 here
//
// TODO: define "orb_forge" multiblock structure in MBD2 editor before enabling
// TODO: all item IDs carry the same TODO flags as their source tier scripts

ServerEvents.recipes(event => {

    // ── TIER 1 RECIPES ────────────────────────────────────────────────────────

    event.custom({
        type: 'modpack:orb_forge',
        duration: 25,
        inputs:  { item: [{ item: 'mmorpg:stone/0', count: 1 }, { item: 'gtceu:iron_dust', count: 2 }] },
        outputs: { item: [{ item: 'mmorpg:currency/orb_of_quality', count: 1 }] }
    })

    event.custom({
        type: 'modpack:orb_forge',
        duration: 25,
        inputs:  { item: [{ item: 'mmorpg:stone/0', count: 1 }, { item: 'gtceu:ash_dust', count: 2 }] },
        outputs: { item: [{ item: 'mmorpg:map_creator', count: 1 }] }
    })

    event.custom({
        type: 'modpack:orb_forge',
        duration: 25,
        inputs:  { item: [{ item: 'mmorpg:stone/0', count: 1 }, { item: 'gtceu:wood_pulp', count: 4 }] },
        outputs: { item: [{ item: 'mmorpg:currency/affix_common_reroll', count: 1 }] }
    })

    // ── TIER 2 RECIPES ────────────────────────────────────────────────────────

    event.custom({
        type: 'modpack:orb_forge',
        duration: 50,
        inputs: {
            item: [
                { item: 'mmorpg:stone/1', count: 1 },
                { item: 'kubejs:blaze_touched_residue', count: 1 },
                { item: 'gtceu:gold_dust', count: 2 }
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/gear_rarity_random', count: 1 }] }
    })

    event.custom({
        type: 'modpack:orb_forge',
        duration: 50,
        inputs: {
            item: [
                { item: 'mmorpg:stone/2', count: 1 },
                { item: 'kubejs:undergarden_reagent', count: 1 },
                { item: 'gtceu:sodium_dust', count: 2 }
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/gear_rarity_upgrade', count: 1 }] }
    })

    event.custom({
        type: 'modpack:orb_forge',
        duration: 50,
        inputs: {
            item: [
                { item: 'mmorpg:stone/2', count: 1 },
                { item: 'kubejs:undergarden_boss_drop', count: 1 },
                { item: 'gtceu:sulfur_dust', count: 2 }
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/affix_reroll_all', count: 1 }] }
    })

    // ── TIER 3 RECIPES ────────────────────────────────────────────────────────

    event.custom({
        type: 'modpack:orb_forge',
        duration: 75,
        inputs: {
            item: [
                { item: 'mmorpg:stone/3', count: 1 },
                { item: 'kubejs:everbright_trophy', count: 1 },
                { item: 'gtceu:ev_integrated_circuit', count: 1 }
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/prefix_number_reroll', count: 1 }] }
    })

    event.custom({
        type: 'modpack:orb_forge',
        duration: 75,
        inputs: {
            item: [
                { item: 'mmorpg:stone/3', count: 1 },
                { item: 'kubejs:everdawn_trophy', count: 1 },
                { item: 'gtceu:ev_integrated_circuit', count: 1 }
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/suffix_number_reroll', count: 1 }] }
    })

    event.custom({
        type: 'modpack:orb_forge',
        duration: 75,
        inputs: {
            item: [
                { item: 'mmorpg:stone/3', count: 1 },
                { item: 'kubejs:hidden_chest_relic', count: 1 },
                { item: 'gtceu:iv_sensor', count: 1 }
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/implicit_affix_reroll', count: 1 }] }
    })

    // ── TIER 4 RECIPES ────────────────────────────────────────────────────────

    event.custom({
        type: 'modpack:orb_forge',
        duration: 100,
        inputs: {
            item: [
                { item: 'mmorpg:stone/5', count: 1 },
                { item: 'kubejs:map_completion_token', count: 1 },
                { item: 'gtceu:zpm_integrated_circuit', count: 1 }
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/upgrade_common_affix', count: 1 }] }
    })

    event.custom({
        type: 'modpack:orb_forge',
        duration: 100,
        inputs: {
            item: [
                { item: 'mmorpg:stone/5', count: 1 },
                { item: 'kubejs:map_completion_token', count: 1 },
                { item: 'gtceu:zpm_mainframe', count: 1 }
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/base_number_reroll', count: 1 }] }
    })

    // ── TIER 5 RECIPES ────────────────────────────────────────────────────────

    event.custom({
        type: 'modpack:orb_forge',
        duration: 125,
        inputs: {
            item: [
                { item: 'mmorpg:stone/4', count: 1 },
                { item: 'kubejs:map_boss_drop', count: 1 },
                { item: 'gtceu:helium_plasma_bucket', count: 1 }
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/common_to_runed', count: 1 }] }
    })

    event.custom({
        type: 'modpack:orb_forge',
        duration: 125,
        inputs: {
            item: [
                { item: 'mmorpg:stone/4', count: 1 },
                { item: 'kubejs:map_boss_drop', count: 1 },
                { item: 'gtceu:uhv_integrated_circuit', count: 1 }
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/affix_random_mythic_reroll', count: 1 }] }
    })

    event.custom({
        type: 'modpack:orb_forge',
        duration: 125,
        inputs: {
            item: [
                { item: 'mmorpg:stone/4', count: 1 },
                { item: 'kubejs:map_boss_drop', count: 1 },
                { item: 'gtceu:uhv_mainframe', count: 1 }
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/prefix_reroll_all', count: 1 }] }
    })

    event.custom({
        type: 'modpack:orb_forge',
        duration: 125,
        inputs: {
            item: [
                { item: 'mmorpg:stone/4', count: 1 },
                { item: 'kubejs:map_boss_drop', count: 1 },
                { item: 'gtceu:uhv_field_generator', count: 1 }
            ]
        },
        outputs: { item: [{ item: 'mmorpg:currency/suffix_reroll_all', count: 1 }] }
    })

    // ── TIER 6 RECIPES ────────────────────────────────────────────────────────

    event.custom({
        type: 'modpack:orb_forge',
        duration: 150,
        inputs: {
            item: [
                { item: 'mmorpg:stone/5', count: 1 },
                { item: 'kubejs:endgame_boss_token', count: 1 },
                { item: 'gtceu:uiv_integrated_circuit', count: 1 }
            ]
        },
        outputs: { item: [{ item: 'dungeon_realm:uber_upgrade', count: 1 }] }
    })

})
