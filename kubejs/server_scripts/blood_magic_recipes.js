ServerEvents.recipes(event => {

    event.recipes.bloodmagic.altar(
        'kubejs:soul_rune',
        'soulland:spirit_steel_ingot',
        3,
        10000,
        50,
        50
    )

    event.recipes.bloodmagic.altar(
        'kubejs:living_circuit_board',
        'gtceu:lv_circuit_board',
        2,
        5000,
        20,
        20
    )

    // Blood Altar T4: Kanthal Coil Block + 50k LP → Blood-Tempered Coil (higher EBF temp ceiling)
    event.recipes.bloodmagic.altar(
        'kubejs:blood_tempered_coil',
        'gtceu:kanthal_coil_block',
        4,
        50000,
        100,
        100
    )

})