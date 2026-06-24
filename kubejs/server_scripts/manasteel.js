ServerEvents.recipes(event => {

    // Replace iron ingot → manasteel with spirit steel → manasteel (Soul Land integration)
    event.remove({ output: 'botania:manasteel_ingot', type: 'botania:mana_infusion' })

    event.recipes.botania.manaInfusion('botania:manasteel_ingot', 'soulland:spirit_steel_ingot', 3000)

})
