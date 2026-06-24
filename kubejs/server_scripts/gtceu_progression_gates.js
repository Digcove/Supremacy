ServerEvents.recipes(event => {

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

    // ME Controller: Terrasteel (Botania Ch6) + Titanium Plate (EBF Ch7) gate
    event.remove({ output: 'ae2:me_controller' })
    event.shaped('ae2:me_controller', [
        'TtT',
        'tFt',
        'TtT'
    ], {
        T: 'botania:terrasteel',
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

    // Soul Forged Ingot: Stainless Steel (HV tier gate) + Spirit Iron + Qi Crystal
    event.shaped('soulland:soul_forged_ingot', [
        'ISI',
        'SQS',
        'ISI'
    ], {
        I: 'soulland:spirit_iron_ingot',
        S: 'gtceu:stainless_steel_ingot',
        Q: 'soulland:qi_crystal'
    }, 2)

})
