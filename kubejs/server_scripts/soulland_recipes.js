ServerEvents.recipes(event => {

    // Cultivation Altar — early meditation station, made from spirit iron
    event.shaped('soulland:cultivation_altar', [
        ' I ',
        'III',
        ' I '
    ], {
        I: 'soulland:spirit_iron_ingot'
    })

    // Qi Crystal — spirit iron + amethyst fused into a Qi-resonant gem; diamond depth
    event.shapeless('soulland:qi_crystal', [
        'soulland:spirit_iron_ingot',
        'soulland:spirit_iron_ingot',
        'minecraft:amethyst_shard'
    ])

    // Nature's Compass — gate behind Spirit Iron Ingot instead of vanilla iron
    event.replaceInput(
        { output: 'naturescompass:naturescompass' },
        'minecraft:iron_ingot',
        'soulland:spirit_iron_ingot'
    )

    // Explorer's Compass — copper ingot instead of cracked stone bricks
    event.replaceInput(
        { output: 'explorerscompass:explorerscompass' },
        'minecraft:cracked_stone_bricks',
        'minecraft:copper_ingot'
    )

})
