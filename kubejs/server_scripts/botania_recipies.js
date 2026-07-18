ServerEvents.recipes(event => {

    // Gate Orechid behind Create (polished rose quartz) — removes GoG alternation and adds standard recipe
    event.remove({ type: 'botania:gog_alternation', output: 'botania:orechid' })
    event.recipes.botania.apothecary(
        'botania:orechid',
        [
            '#botania:petals/gray',
            '#botania:petals/gray',
            '#botania:petals/yellow',
            '#botania:petals/green',
            '#botania:petals/red',
            'botania:rune_pride',
            'botania:rune_greed',
            'botania:redstone_root',
            'botania:pixie_dust',
            'create:polished_rose_quartz'
        ]
    )

    // Remove default Manasteel recipe
    event.remove({
        output: 'botania:manasteel_ingot',
        type: 'botania:mana_infusion'
    })

    event.recipes.botania.manaInfusion(
        'botania:manasteel_ingot',
        'minecraft:iron_ingot',
        3000
    )

    // Charged Qi Crystal
    event.recipes.botania.manaInfusion(
        'kubejs:charged_qi_crystal',
        'minecraft:amethyst_shard',
        2000
    )

    // Living Mana Core
    event.recipes.botania.manaInfusion(
        'kubejs:living_mana_core',
        'bloodmagic:living_armor_upgrade_core',
        3000
    )

})