ServerEvents.recipes(event => {

    // Remove default Manasteel recipe
    event.remove({
        output: 'botania:manasteel_ingot',
        type: 'botania:mana_infusion'
    })

    // Soul Land -> Botania integration
    event.recipes.botania.manaInfusion(
        'botania:manasteel_ingot',
        'soulland:spirit_steel_ingot',
        3000
    )

    // Charged Qi Crystal
    event.recipes.botania.manaInfusion(
        'kubejs:charged_qi_crystal',
        'soulland:qi_crystal',
        2000
    )

    // Living Mana Core
    event.recipes.botania.manaInfusion(
        'kubejs:living_mana_core',
        'bloodmagic:living_armor_upgrade_core',
        3000
    )

})