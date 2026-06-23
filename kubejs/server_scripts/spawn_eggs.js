ServerEvents.recipes(event => {

    // === SPAWN EGG RECIPES ===

    // Horseshoe — 7 iron ingots in a U shape
    event.shaped('kubejs:horseshoe', [
        'I I',
        'I I',
        'III'
    ], {
        I: 'minecraft:iron_ingot'
    })

    // Horse — "A Man's Best Friend"
    // Requires: 1 Apple + 1 Horseshoe
    event.shapeless('minecraft:horse_spawn_egg', [
        'minecraft:apple',
        'kubejs:horseshoe'
    ])

})
