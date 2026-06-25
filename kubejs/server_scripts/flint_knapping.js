ServerEvents.recipes(event => {

    // === FLINT KNAPPING SYSTEM ===
    // The Bone Knapping Tool is consumed in each head recipe.
    // Players craft a new one cheaply from bone + stick.

    // Bone Knapping Tool
    event.shaped('kubejs:bone_knapping_tool', [
        ' B ',
        ' S ',
        '   '
    ], {
        B: 'minecraft:bone',
        S: 'minecraft:stick'
    })

    // --- Flint Tool Heads ---
    // K = Bone Knapping Tool (consumed), F = Flint

    // Pickaxe Head  (3 flint across top, knapping tool below center)
    event.shaped('kubejs:flint_pickaxe_head', [
        'FFF',
        ' K ',
        '   '
    ], { F: 'minecraft:flint', K: 'kubejs:bone_knapping_tool' })

    // Axe Head  (2x2 flint block, knapping tool bottom-right)
    event.shaped('kubejs:flint_axe_head', [
        'FF ',
        'FK ',
        '   '
    ], { F: 'minecraft:flint', K: 'kubejs:bone_knapping_tool' })

    // Shovel Head  (single flint above knapping tool)
    event.shaped('kubejs:flint_shovel_head', [
        ' F ',
        ' K ',
        '   '
    ], { F: 'minecraft:flint', K: 'kubejs:bone_knapping_tool' })

    // Sword Blade  (two flint stacked above knapping tool)
    event.shaped('kubejs:flint_sword_blade', [
        ' F ',
        ' F ',
        ' K '
    ], { F: 'minecraft:flint', K: 'kubejs:bone_knapping_tool' })

    // Hoe Head  (two flint side by side, knapping tool below-left)
    event.shaped('kubejs:flint_hoe_head', [
        'FF ',
        'K  ',
        '   '
    ], { F: 'minecraft:flint', K: 'kubejs:bone_knapping_tool' })

    // --- Flint Tool Assembly (head + sticks) ---

    // Flint Pickaxe
    event.shaped('kubejs:flint_pickaxe', [
        ' H ',
        ' S ',
        ' S '
    ], { H: 'kubejs:flint_pickaxe_head', S: 'minecraft:stick' })

    // Flint Axe
    event.shaped('kubejs:flint_axe', [
        'HS ',
        'S  ',
        '   '
    ], { H: 'kubejs:flint_axe_head', S: 'minecraft:stick' })

    // Flint Shovel
    event.shaped('kubejs:flint_shovel', [
        ' H ',
        ' S ',
        ' S '
    ], { H: 'kubejs:flint_shovel_head', S: 'minecraft:stick' })

    // Flint Sword
    event.shaped('kubejs:flint_sword', [
        ' B ',
        ' B ',
        ' S '
    ], { B: 'kubejs:flint_sword_blade', S: 'minecraft:stick' })

    // Flint Hoe
    event.shaped('kubejs:flint_hoe', [
        'H  ',
        'S  ',
        'S  '
    ], { H: 'kubejs:flint_hoe_head', S: 'minecraft:stick' })

})
