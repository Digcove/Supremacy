ServerEvents.recipes(event => {

    // Compressed Stick — 9 sticks compressed into 1
    event.shaped('kubejs:compressed_stick', [
        'SSS',
        'SSS',
        'SSS'
    ], { S: 'minecraft:stick' })

    // Stoner Spear — Stone Spear reinforced with compressed cobblestone and a compressed stick
    event.shaped(
        Item.of('kubejs:stoner_spear', '{Enchantments:[{id:"minecraft:unbreaking",lvl:5s},{id:"minecraft:knockback",lvl:3s}]}'),
        [
            ' C ',
            'CPC',
            ' S '
        ], {
            C: 'rcc:cobblestone_one',
            P: 'spartanweaponry:stone_spear',
            S: 'kubejs:compressed_stick'
        }
    )

})
