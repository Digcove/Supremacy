// Combat identity: weapons come from Spartan Weaponry, Iron's Spells, RoE and MnS gear.
// Tinkers is tools-only; MC Dungeons Weapons is disabled entirely (recipes here,
// loot in loot_drops.js). TACZ guns are intentionally left playable — note that gun
// damage does not convert to MnS damage.

ServerEvents.recipes(event => {

    // Tinkers Construct weapons
    [
        'tconstruct:broad_sword',
        'tconstruct:cleaver',
        'tconstruct:dagger',
        'tconstruct:hand_axe',
        'tconstruct:scythe',
    ].forEach(id => event.remove({ output: id }))

    // MC Dungeons Weapons — remove every recipe from the mod
    event.remove({ mod: 'mcdw' })

})
