ServerEvents.recipes(event => {

    // Tinkers Construct weapons
    [
        'tconstruct:broad_sword',
        'tconstruct:cleaver',
        'tconstruct:dagger',
        'tconstruct:hand_axe',
        'tconstruct:scythe',
    ].forEach(id => event.remove({ output: id }))

    // Silent Gear weapons
    [
        'silentgear:sword',
        'silentgear:dagger',
        'silentgear:greatsword',
        'silentgear:katana',
        'silentgear:machete',
        'silentgear:spear',
        'silentgear:trident',
    ].forEach(id => event.remove({ output: id }))

})
