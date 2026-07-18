ServerEvents.recipes(event => {

    // Primitive Blast Furnace: swap Firebricks for Precision Mechanism to gate behind Create
    event.replaceInput(
        { output: 'gtceu:primitive_blast_furnace' },
        'gtceu:firebricks',
        'create:precision_mechanism'
    )

    // LV Machine Hull: manasteel gate (requires completing Chapter 6 Botania)
    event.remove({ output: 'gtceu:lv_machine_hull' })
    event.shaped('gtceu:lv_machine_hull', [
        'MMM',
        'MCM',
        'MMM'
    ], {
        M: 'botania:manasteel_ingot',
        C: 'gtceu:tin_single_cable'
    })

    // MV Machine Hull: EBF aluminium plates + Epic M&S stone core
    event.remove({ output: 'gtceu:mv_machine_hull' })
    event.shaped('gtceu:mv_machine_hull', [
        'AAA',
        'AEA',
        'AAA'
    ], {
        A: 'gtceu:aluminium_plate',
        E: 'mmorpg:stone/2'
    })

    // Cupronickel Coil Block (EBF coil): Naga Scales combat gate (Twilight Forest boss)
    event.remove({ output: 'gtceu:cupronickel_coil_block' })
    event.shaped('gtceu:cupronickel_coil_block', [
        'NWN',
        'W W',
        'NWN'
    ], {
        N: 'twilightforest:naga_scale',
        W: 'gtceu:cupronickel_single_wire'
    })

    // Gun Smith Table: Terrasteel gate (TaCZ firearms unlock at Botania Ch6)
    event.remove({ output: 'tacz:gun_smith_table' })
    event.shaped('tacz:gun_smith_table', [
        'LLL',
        'ITI',
        'I I'
    ], {
        L: '#minecraft:logs',
        I: '#forge:ingots/iron',
        T: 'botania:terrasteel_ingot'
    })

    // ME Controller: Terrasteel (Botania Ch6) + Titanium Plate (EBF Ch7) gate
    event.remove({ output: 'ae2:me_controller' })
    event.shaped('ae2:me_controller', [
        'TtT',
        'tFt',
        'TtT'
    ], {
        T: 'botania:terrasteel_ingot',
        t: 'gtceu:titanium_plate',
        F: 'ae2:fluix_crystal'
    })

    // HV Machine Hull: Stainless Steel plates + Twilight Lich trophy combat gate
    event.remove({ output: 'gtceu:hv_machine_hull' })
    event.shaped('gtceu:hv_machine_hull', [
        'SSS',
        'SLS',
        'SSS'
    ], {
        S: 'gtceu:stainless_steel_plate',
        L: 'twilightforest:lich_trophy'
    })

    // EV Machine Hull: Titanium plates + Ur-Ghast Trophy combat gate
    event.remove({ output: 'gtceu:ev_machine_hull' })
    event.shaped('gtceu:ev_machine_hull', [
        'TTT',
        'TUT',
        'TTT'
    ], {
        T: 'gtceu:titanium_plate',
        U: 'twilightforest:ur_ghast_trophy'
    })

    // Pressure Chamber Wall: Fiery Ingot gate (Hydra required to start PneumaticCraft)
    event.remove({ output: 'pneumaticcraft:pressure_chamber_wall' })
    event.shaped('pneumaticcraft:pressure_chamber_wall', [
        'III',
        'IFI',
        'III'
    ], {
        I: 'minecraft:iron_ingot',
        F: 'twilightforest:fiery_ingot'
    }, 8)

    // IV Machine Hull: Tungsten plates + Snow Queen Trophy (Twilight Forest Aurora Palace)
    event.remove({ output: 'gtceu:iv_machine_hull' })
    event.shaped('gtceu:iv_machine_hull', [
        'TTT',
        'TST',
        'TTT'
    ], {
        T: 'gtceu:tungsten_plate',
        S: 'twilightforest:ice_bomb'  // Snow Queen drop — TODO: verify exact item ID in-game
    })

    // UV Machine Hull: Neutronium plates + Dragon Head (End Ship loot, post-dragon kill)
    event.remove({ output: 'gtceu:uv_machine_hull' })
    event.shaped('gtceu:uv_machine_hull', [
        'NNN',
        'NDN',
        'NNN'
    ], {
        N: 'gtceu:neutronium_plate',
        D: 'minecraft:dragon_head'
    })

    // UHV Machine Hull: Osmiridium plates + Echo Shard (Ancient City, Warden territory)
    event.remove({ output: 'gtceu:uhv_machine_hull' })
    event.shaped('gtceu:uhv_machine_hull', [
        'OOO',
        'OEO',
        'OOO'
    ], {
        O: 'gtceu:osmiridium_plate',
        E: 'minecraft:echo_shard'
    })

})
