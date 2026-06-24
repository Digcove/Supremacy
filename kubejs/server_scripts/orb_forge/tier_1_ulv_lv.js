// ORB FORGE — Tier 1: ULV → LV
// C2E2 Gate: Prologue → Act I (Overworld, Lv. 1–15)
// Station: basic_modify_station (Multiblocked2 — define machine before enabling recipes here)
//
// Stone IDs confirmed from mmorpg JAR: mmorpg:stone/0 = Common
// Tech gate: any LV GregTech machine output dust — confirmed gtceu namespace, dust IDs need in-game check
//
// TODO: define "basic_modify_station" in Multiblocked2 before these recipes go live
// TODO: verify these gtceu dust item IDs are real in GTCEu Modern 7.5.x:
//         gtceu:iron_dust, gtceu:ash_dust, gtceu:wood_pulp
// TODO: verify if Library of Exile has scroll_of_wisdom / portal_scroll items
//         (check library_of_exile namespace in JEI) — if not, swap outputs below

ServerEvents.recipes(event => {

    // Scroll of Wisdom — identify / quality boost
    // Combat: Common Salvage Stone | Tech: LV Macerator dust (any base ore)
    // NOTE: mmorpg:currency/orb_of_quality is the closest M&S equivalent; swap if LoE has its own scroll
    event.custom({
        type: 'multiblocked2:recipe',
        machine: 'modpack:basic_modify_station',
        duration: 100,
        inputs:  { item: [{ item: 'mmorpg:stone/0', count: 1 }, { item: 'gtceu:iron_dust', count: 2 }] },
        outputs: { item: [{ item: 'mmorpg:currency/orb_of_quality', count: 1 }] }
    })

    // Portal Scroll — map/teleport utility
    // Combat: Common Salvage Stone | Tech: LV paper/dye byproduct dust
    // NOTE: mmorpg:map_creator is the closest M&S utility item; verify in JEI
    event.custom({
        type: 'multiblocked2:recipe',
        machine: 'modpack:basic_modify_station',
        duration: 100,
        inputs:  { item: [{ item: 'mmorpg:stone/0', count: 1 }, { item: 'gtceu:ash_dust', count: 2 }] },
        outputs: { item: [{ item: 'mmorpg:map_creator', count: 1 }] }
    })

    // Orb of Transmutation (adds/rerolls a common affix)
    // Combat: Common Salvage Stone | Tech: LV Mixer output (basic catalyst — wood pulp as proxy)
    event.custom({
        type: 'multiblocked2:recipe',
        machine: 'modpack:basic_modify_station',
        duration: 100,
        inputs:  { item: [{ item: 'mmorpg:stone/0', count: 1 }, { item: 'gtceu:wood_pulp', count: 4 }] },
        outputs: { item: [{ item: 'mmorpg:currency/affix_common_reroll', count: 1 }] }
    })

})
