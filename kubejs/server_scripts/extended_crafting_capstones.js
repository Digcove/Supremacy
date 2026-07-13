// EXTENDED CRAFTING — CAPSTONE LAYER ("extreme crafting")
//
// Extended Crafting tables are the pack's extreme-crafting layer: every capstone
// item is a 5x5 / 7x7 / 9x9 recipe that pulls from tech AND magic simultaneously.
// That is the pack thesis — GregTech alone builds the grid, but only the mage-
// engineer who walks both roads assembles the machines that matter.
//
// Structure of this file:
//   1. Table gates    — the four EC tables are re-recipe'd onto the GT ladder
//                       (Basic=MV, Advanced=HV, Elite=IV, Ultimate=ZPM). Each
//                       table requires the previous one as its core.
//   2. Capstones      — the 7 Orb Forge controllers (5x5 -> 9x9 ladder), the
//                       Triune Catalyst (migrated here from the Enchanting
//                       Apparatus — see ars_nouveau_recipes.js), a Botania bulk
//                       terrasteel route, a MEGA bulk cell-component route, and
//                       the Epilogue's Uber Fragment.
//
// Design rules honored throughout:
//   - Every capstone mixes >=1 GT ingredient and >=1 magic ingredient.
//   - kubejs:blood_tempered_coil appears in every controller recipe of EC tier
//     3+ (this finally wires the previously dead-end Blood Altar T4 item).
//   - EC material recipes (frames, black iron, catalysts) are left vanilla —
//     they feed nothing that bypasses the gates below. Auto Tables inherit the
//     gate because each consumes its matching table.
//
// Syntax note: the Extended Crafting jar is not present locally, so all table
// recipes use event.custom({ type: 'extendedcrafting:shaped_table', ... }) —
// the datapack JSON format, guaranteed compatible with EC 6.0.10 (1.20.1).
// Tiers: 2 = Advanced (5x5), 3 = Elite (7x7), 4 = Ultimate (9x9).

ServerEvents.recipes(event => {

    // ------------------------------------------------------------------
    // 1. TABLE GATES
    // Remove EC's default (black iron) table recipes by output id — NOT by
    // mod, so frames/catalysts/components keep their stock recipes.
    // ------------------------------------------------------------------
    event.remove({ output: 'extendedcrafting:basic_table' })
    event.remove({ output: 'extendedcrafting:advanced_table' })
    event.remove({ output: 'extendedcrafting:elite_table' })
    event.remove({ output: 'extendedcrafting:ultimate_table' })

    // Basic Table (3x3+): MV — aluminium hulls the frame, Create precision
    // mechanisms drive it, a plain crafting table sits at its heart.
    event.shaped('extendedcrafting:basic_table', [
        'PPP',
        'MCM',
        'PPP'
    ], {
        P: 'gtceu:aluminium_plate',
        M: 'create:precision_mechanism',
        C: 'minecraft:crafting_table'
    })

    // Advanced Table (5x5): HV — stainless steel, manasteel, and the first
    // convergence item (Charged Qi Crystal) around a Basic Table core.
    event.shaped('extendedcrafting:advanced_table', [
        'SNS',
        'QBQ',
        'SNS'
    ], {
        S: 'gtceu:stainless_steel_plate',
        N: 'botania:manasteel_ingot',
        Q: 'kubejs:charged_qi_crystal',
        B: 'extendedcrafting:basic_table'
    })

    // Elite Table (7x7): IV — tungsten steel, Living Circuit Boards, and
    // Demonic Slate (Blood Altar T4; no "master slate" exists in Blood Magic
    // 1.20.1 — demonslate is the tier-4 slate) around an Advanced Table core.
    event.shaped('extendedcrafting:elite_table', [
        'TDT',
        'LAL',
        'TDT'
    ], {
        T: 'gtceu:tungsten_steel_plate',
        D: 'bloodmagic:demonslate',
        L: 'kubejs:living_circuit_board',
        A: 'extendedcrafting:advanced_table'
    })

    // Ultimate Table (9x9): ZPM — naquadah alloy, Wilden Tribute, and the
    // Triune Catalyst around an Elite Table core.
    event.shaped('extendedcrafting:ultimate_table', [
        'NWN',
        'KEK',
        'NWN'
    ], {
        N: 'gtceu:naquadah_alloy_plate',
        W: 'ars_nouveau:wilden_tribute',
        K: 'kubejs:triune_catalyst',
        E: 'extendedcrafting:elite_table'
    })

    // ------------------------------------------------------------------
    // 2. CAPSTONES — ORB FORGE CONTROLLERS (recipes 1-7)
    // The seven Multiblocked2 controllers had no crafting recipes at all;
    // these are their only routes. Grid size climbs with machine tier.
    // ------------------------------------------------------------------

    // (1) Basic Modify Station — ULV/LV forge. 5x5 (Advanced Table).
    event.custom({
        type: 'extendedcrafting:shaped_table',
        tier: 2,
        pattern: [
            'SPCPS',
            'PMRMP',
            'CRHRC',
            'PMRMP',
            'SPCPS'
        ],
        key: {
            S: { item: 'mmorpg:stone/1' },
            P: { item: 'gtceu:steel_plate' },
            C: { item: 'gtceu:basic_electronic_circuit' },
            M: { item: 'botania:manasteel_ingot' },
            R: { item: 'kubejs:soul_rune' },
            H: { item: 'gtceu:lv_machine_hull' }
        },
        result: { item: 'modpack:basic_modify_station', count: 1 }
    })

    // (2) Hybrid Refinery Bench — MV/HV forge. 5x5 (Advanced Table).
    event.custom({
        type: 'extendedcrafting:shaped_table',
        tier: 2,
        pattern: [
            'SPCPS',
            'PQGQP',
            'CGHGC',
            'PQGQP',
            'SPCPS'
        ],
        key: {
            S: { item: 'mmorpg:stone/2' },
            P: { item: 'gtceu:stainless_steel_plate' },
            C: { item: 'gtceu:good_electronic_circuit' },
            Q: { item: 'kubejs:charged_qi_crystal' },
            G: { item: 'botania:mana_pearl' },
            H: { item: 'gtceu:mv_machine_hull' }
        },
        result: { item: 'modpack:hybrid_refinery_bench', count: 1 }
    })

    // (3) Cipher Engraving Table — EV/IV forge. 7x7 (Elite Table).
    // First appearance of the Blood-Tempered Coil (required tier 3+).
    event.custom({
        type: 'extendedcrafting:shaped_table',
        tier: 3,
        pattern: [
            'S  C  S',
            ' PPBPP ',
            ' PLRLP ',
            'CBRHRBC',
            ' PLRLP ',
            ' PPBPP ',
            'S  C  S'
        ],
        key: {
            S: { item: 'mmorpg:stone/3' },
            P: { item: 'gtceu:titanium_plate' },
            C: { item: 'gtceu:quantum_processor' },
            B: { item: 'kubejs:blood_tempered_coil' },
            L: { item: 'kubejs:living_circuit_board' },
            R: { item: 'kubejs:soul_rune' },
            H: { item: 'gtceu:ev_machine_hull' }
        },
        result: { item: 'modpack:cipher_engraving_table', count: 1 }
    })

    // (4) Quantum Exaltation Array — LuV/ZPM forge. 7x7 (Elite Table).
    event.custom({
        type: 'extendedcrafting:shaped_table',
        tier: 3,
        pattern: [
            'S  C  S',
            ' PPBPP ',
            ' PMQMP ',
            'CBQHQBC',
            ' PMQMP ',
            ' PPBPP ',
            'S  C  S'
        ],
        key: {
            S: { item: 'mmorpg:stone/4' },
            P: { item: 'gtceu:naquadah_alloy_plate' },
            C: { item: 'gtceu:wetware_processor' },
            B: { item: 'kubejs:blood_tempered_coil' },
            M: { item: 'kubejs:living_mana_core' },
            Q: { item: 'kubejs:charged_qi_crystal' },
            H: { item: 'gtceu:luv_machine_hull' }
        },
        result: { item: 'modpack:quantum_exaltation_array', count: 1 }
    })

    // (5) Fusion Forge — UV/UHV forge. 7x7 (Elite Table).
    // Gaia Spirit Ingots put a Gaia Guardian kill on the critical path.
    event.custom({
        type: 'extendedcrafting:shaped_table',
        tier: 3,
        pattern: [
            'S  C  S',
            ' PPBPP ',
            ' PGMGP ',
            'CBMHMBC',
            ' PGMGP ',
            ' PPBPP ',
            'S  C  S'
        ],
        key: {
            S: { item: 'mmorpg:stone/5' },
            P: { item: 'gtceu:neutronium_plate' },
            C: { item: 'gtceu:wetware_processor_computer' },
            B: { item: 'kubejs:blood_tempered_coil' },
            G: { item: 'botania:gaia_ingot' },
            M: { item: 'kubejs:living_mana_core' },
            H: { item: 'gtceu:uv_machine_hull' }
        },
        result: { item: 'modpack:fusion_forge', count: 1 }
    })

    // (6) Nano Reliquary — UEV/UIV forge. 9x9 (Ultimate Table).
    event.custom({
        type: 'extendedcrafting:shaped_table',
        tier: 4,
        pattern: [
            'PPPPPPPPP',
            'PS  C  SP',
            'P BGWGB P',
            'P GQTQG P',
            'PCWTHTWCP',
            'P GQTQG P',
            'P BGWGB P',
            'PS  C  SP',
            'PPPPPPPPP'
        ],
        key: {
            P: { item: 'gtceu:neutronium_plate' },
            S: { item: 'mmorpg:stone/5' },
            C: { item: 'gtceu:wetware_processor_mainframe' },
            B: { item: 'kubejs:blood_tempered_coil' },
            G: { item: 'botania:gaia_ingot' },
            W: { item: 'ars_nouveau:wilden_tribute' },
            Q: { item: 'kubejs:charged_qi_crystal' },
            T: { item: 'kubejs:triune_catalyst' },
            H: { item: 'gtceu:uev_machine_hull' }
        },
        result: { item: 'modpack:nano_reliquary', count: 1 }
    })

    // (7) Orb Forge — the master machine (runs every tier at 4x speed).
    // 9x9 (Ultimate Table). Demands ALL five convergence items at once.
    event.custom({
        type: 'extendedcrafting:shaped_table',
        tier: 4,
        pattern: [
            'PPPPCPPPP',
            'PS BRB SP',
            'P QLMLQ P',
            'PBL T LBP',
            'CRMTHTMRC',
            'PBL T LBP',
            'P QLMLQ P',
            'PS BRB SP',
            'PPPPCPPPP'
        ],
        key: {
            P: { item: 'gtceu:naquadah_alloy_plate' },
            C: { item: 'gtceu:wetware_processor_mainframe' },
            S: { item: 'mmorpg:stone/5' },
            B: { item: 'kubejs:blood_tempered_coil' },
            R: { item: 'kubejs:soul_rune' },
            Q: { item: 'kubejs:charged_qi_crystal' },
            L: { item: 'kubejs:living_circuit_board' },
            M: { item: 'kubejs:living_mana_core' },
            T: { item: 'kubejs:triune_catalyst' },
            H: { item: 'gtceu:uiv_machine_hull' }
        },
        result: { item: 'modpack:orb_forge', count: 1 }
    })

    // ------------------------------------------------------------------
    // (8) TRIUNE CATALYST — migrated from the Enchanting Apparatus.
    // Old recipe (4x source gem + 4x blank slate around a Soul Crystal) lived
    // in ars_nouveau_recipes.js and is commented out there with a pointer to
    // this file. The catalyst now demands all three magic schools at once:
    // Botania terrasteel, Blood Magic slates, Ars Nouveau source — still
    // formed around a Soul Land Soul Crystal. Yields 2, since the Ultimate
    // Table and both 9x9 controllers each consume several.
    // 7x7 (Elite Table).
    // ------------------------------------------------------------------
    event.custom({
        type: 'extendedcrafting:shaped_table',
        tier: 3,
        pattern: [
            'T  A  T',
            ' GSSSG ',
            ' SDBDS ',
            'ASBCBSA',
            ' SDBDS ',
            ' GSSSG ',
            'T  A  T'
        ],
        key: {
            T: { item: 'botania:terrasteel_ingot' },
            A: { item: 'ars_nouveau:wilden_horn' },
            G: { item: 'botania:mana_pearl' },
            S: { item: 'ars_nouveau:source_gem' },
            D: { item: 'bloodmagic:demonslate' },
            B: { item: 'bloodmagic:blankslate' },
            C: { item: 'soulland:soul_crystal' }
        },
        result: { item: 'kubejs:triune_catalyst', count: 2 }
    })

    // ------------------------------------------------------------------
    // (9) BOTANIA CAPSTONE — bulk Terrasteel Blocks. 7x7 (Elite Table).
    // 18 terrasteel ingots + 8 elementium + fine platinum wire + a mana pearl
    // -> 3 blocks (27 ingots): a 50% terrasteel yield bonus for players who
    // reach the Elite Table. Terrasteel must still be bootstrapped normally,
    // so Botania's own progression stays intact — this only amplifies it.
    // ------------------------------------------------------------------
    event.custom({
        type: 'extendedcrafting:shaped_table',
        tier: 3,
        pattern: [
            'F  E  F',
            ' ETTTE ',
            ' TTTTT ',
            'E TWT E',
            ' TTTTT ',
            ' ETTTE ',
            'F  E  F'
        ],
        key: {
            F: { item: 'gtceu:fine_platinum_wire' },
            E: { item: 'botania:elementium_ingot' },
            T: { item: 'botania:terrasteel_ingot' },
            W: { item: 'botania:mana_pearl' }
        },
        result: { item: 'botania:terrasteel_block', count: 3 }
    })

    // ------------------------------------------------------------------
    // (10) AE2 ENDGAME — bulk MEGA 256M Cell Components. 9x9 (Ultimate).
    // Alternate route, 2x output: eight 64M components (exactly two 256M
    // components' worth) plus singularity cores and Living Mana Cores skip
    // the intermediate assembly entirely. Component-cost neutral — the
    // catalysts buy the bulk shortcut. MEGA's stock recipe is untouched.
    // ------------------------------------------------------------------
    event.custom({
        type: 'extendedcrafting:shaped_table',
        tier: 4,
        pattern: [
            'QFFFCFFFQ',
            'FS     SF',
            'F MM MM F',
            'F G E G F',
            'C   S   C',
            'F G E G F',
            'F MM MM F',
            'FS     SF',
            'QFFFCFFFQ'
        ],
        key: {
            Q: { item: 'ae2:quartz_block' },
            F: { item: 'ae2:fluix_block' },
            C: { item: 'gtceu:wetware_processor_mainframe' },
            S: { item: 'ae2:singularity' },
            M: { item: 'megacells:cell_component_64m' },
            G: { item: 'kubejs:living_mana_core' },
            E: { item: 'ae2:quantum_entangled_singularity' }
        },
        result: { item: 'megacells:cell_component_256m', count: 2 }
    })

    // ------------------------------------------------------------------
    // (11) EPILOGUE TROPHY — Uber Fragment. 9x9 (Ultimate Table).
    // The Epilogue chapter opens by demanding four Dungeon Realm Uber
    // Fragments, normally pure dungeon RNG. This route crafts one from one
    // circuit of EVERY GT tier (LV through UHV) plus one ingredient from
    // EVERY magic mod in the pack — the literal sum of the Supremacy tech
    // and magic trees. (The Snow Queen trophy quest was deliberately NOT
    // given a recipe: crafting a boss trophy would bypass a combat gate.)
    // ------------------------------------------------------------------
    event.custom({
        type: 'extendedcrafting:shaped_table',
        tier: 4,
        pattern: [
            'A   I   B',
            ' T     N ',
            '  C   D  ',
            ' M  S  O ',
            '  E U F  ',
            ' W  S  X ',
            '  G   H  ',
            ' T     N ',
            'A   I   B'
        ],
        key: {
            A: { item: 'gtceu:basic_electronic_circuit' },       // LV
            B: { item: 'gtceu:good_electronic_circuit' },        // MV
            C: { item: 'gtceu:advanced_integrated_circuit' },    // HV
            D: { item: 'gtceu:quantum_processor' },              // EV
            E: { item: 'gtceu:crystal_processor' },              // IV
            F: { item: 'gtceu:wetware_processor' },              // LuV
            G: { item: 'gtceu:wetware_processor_assembly' },     // ZPM
            H: { item: 'gtceu:wetware_processor_computer' },     // UV
            I: { item: 'gtceu:wetware_processor_mainframe' },    // UHV
            T: { item: 'botania:terrasteel_ingot' },             // Botania
            N: { item: 'naturesaura:sky_ingot' },                // Nature's Aura
            M: { item: 'bloodmagic:demonslate' },                // Blood Magic
            O: { item: 'occultism:afrit_essence' },              // Occultism
            S: { item: 'soulland:soul_forged_ingot' },           // Soul Land
            W: { item: 'ars_nouveau:wilden_tribute' },           // Ars Nouveau
            X: { item: 'forbidden_arcanus:stellarite_piece' },   // Forbidden Arcanus
            U: { item: 'mmorpg:stone/5' }                        // MnS Mythic core
        },
        result: { item: 'dungeon_realm:uber_fragment', count: 1 }
    })

})
