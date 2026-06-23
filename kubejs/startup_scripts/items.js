StartupEvents.registry('item', event => {

    // === CUSTOM ITEMS ===

    // Horseshoe (spawn egg crafting)
    event.create('horseshoe')
        .displayName('Horseshoe')
        .texture('kubejs:item/horseshoe')

    // --- Flint Knapping ---

    // Bone Knapping Tool — used to shape flint tool heads
    event.create('bone_knapping_tool')
        .displayName('Bone Knapping Tool')
        .maxDamage(32)
        .texture('kubejs:item/bone_knapping_tool')

    // Flint tool heads (intermediate crafting components)
    event.create('flint_pickaxe_head').displayName('Flint Pickaxe Head').texture('kubejs:item/flint_pickaxe_head')
    event.create('flint_axe_head').displayName('Flint Axe Head').texture('kubejs:item/flint_axe_head')
    event.create('flint_shovel_head').displayName('Flint Shovel Head').texture('kubejs:item/flint_shovel_head')
    event.create('flint_sword_blade').displayName('Flint Sword Blade').texture('kubejs:item/flint_sword_blade')
    event.create('flint_hoe_head').displayName('Flint Hoe Head').texture('kubejs:item/flint_hoe_head')

    // Flint tools (final items)
    event.create('flint_pickaxe')
        .displayName('Flint Pickaxe')
        .maxDamage(200)
        .texture('kubejs:item/flint_pickaxe')
        .tag('forge:tools/pickaxes')

    event.create('flint_axe')
        .displayName('Flint Axe')
        .maxDamage(200)
        .texture('kubejs:item/flint_axe')
        .tag('forge:tools/axes')

    event.create('flint_shovel')
        .displayName('Flint Shovel')
        .maxDamage(200)
        .texture('kubejs:item/flint_shovel')
        .tag('forge:tools/shovels')

    event.create('flint_sword')
        .displayName('Flint Sword')
        .maxDamage(200)
        .texture('kubejs:item/flint_sword')
        .tag('forge:tools/swords')

    event.create('flint_hoe')
        .displayName('Flint Hoe')
        .maxDamage(200)
        .texture('kubejs:item/flint_hoe')
        .tag('forge:tools/hoes')

    // Flint Compass — points toward nearest gravel deposit
    event.create('flint_compass')
        .displayName('Flint Compass')
        .texture('kubejs:item/flint_compass')

})
