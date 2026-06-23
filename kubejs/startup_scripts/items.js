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

    // === SOCK SYSTEM ===

    event.create('sock')
        .displayName('Sock')
        .texture('kubejs:item/sock')

    event.create('soaked_sock')
        .displayName('Bull Cum Soaked Sock')
        .texture('kubejs:item/soaked_sock')

    // === BANANA SYSTEM ===

    event.create('orange')
        .displayName('Orange')
        .texture('kubejs:item/orange')

    event.create('block_of_pure_vitamin_c')
        .displayName('Block of Pure Vitamin C')
        .texture('kubejs:item/block_of_pure_vitamin_c')

    event.create('banana_pickaxe', 'pickaxe')
        .displayName('Bannana Pickaxe')
        .texture('kubejs:item/banana_pickaxe')
        .tier(tier => {
            tier.uses = 1561            // Diamond durability
            tier.speed = 4.0           // Stone mining speed
            tier.attackDamageBonus = 1.0
            tier.level = 2             // Can mine iron-level blocks
            tier.enchantmentValue = 5
            tier.repairIngredient = 'pamhc2trees:bananaitem'
        })

    event.create('banana_helmet', 'helmet')
        .displayName('Banana Helmet')
        .texture('kubejs:item/banana_helmet')
        .tier(tier => {
            tier.durabilityFactor = 10
            tier.slotProtections = [1, 3, 5, 2]  // [boots, legs, chest, head] — gold values
            tier.enchantmentValue = 12
            tier.toughness = 0.0
            tier.knockbackResistance = 0.0
            tier.repairIngredient = 'pamhc2trees:bananaitem'
        })

})
