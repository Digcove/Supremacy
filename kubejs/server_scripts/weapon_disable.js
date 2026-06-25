ServerEvents.recipes(event => {

    // Tinkers Construct weapons
    [
        'tconstruct:broad_sword',
        'tconstruct:cleaver',
        'tconstruct:dagger',
        'tconstruct:hand_axe',
        'tconstruct:scythe',
    ].forEach(id => event.remove({ output: id }))


})
