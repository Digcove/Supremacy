ServerEvents.recipes(event => {
    const nbt = '{Enchantments:[{id:"minecraft:projectile_protection",lvl:2s},{id:"minecraft:unbreaking",lvl:3s}]}'

    event.shaped(Item.of('kubejs:boneanner_chestplate', nbt), [
        'BNB',
        'BNB',
        'B B'
    ], {
        B: 'minecraft:bone',
        N: 'pamhc2trees:bananaitem'
    })

    event.shaped(Item.of('kubejs:boneanner_leggings', nbt), [
        'BNB',
        'B B',
        'B B'
    ], {
        B: 'minecraft:bone',
        N: 'pamhc2trees:bananaitem'
    })

    event.shaped(Item.of('kubejs:boneanner_boots', nbt), [
        'BN',
        'BN'
    ], {
        B: 'minecraft:bone',
        N: 'pamhc2trees:bananaitem'
    })

})
