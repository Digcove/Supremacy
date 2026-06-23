ServerEvents.recipes(event => {

    // Block of Pure Vitamin C — 9 oranges in a 3x3
    event.shaped('kubejs:block_of_pure_vitamin_c', [
        'OOO',
        'OOO',
        'OOO'
    ], {
        O: 'pamhc2trees:orangeitem'
    })

    // Bannana Pickaxe — 3 bananas + 2 sticks
    event.shaped('pamhc2trees:bananaitem_pickaxe', [
        'BBB',
        ' S ',
        ' S '
    ], {
        B: 'pamhc2trees:bananaitem',
        S: 'minecraft:stick'
    })

    // Banana Helmet — 5 bananas in helmet shape
    event.shaped('pamhc2trees:bananaitem_helmet', [
        'BBB',
        'B B',
        '   '
    ], {
        B: 'pamhc2trees:bananaitem'
    })

})

// Block of Pure Vitamin C thrown into water → Banana
EntityEvents.tick('minecraft:item', event => {
    const entity = event.entity
    if (entity.level.isClientSide) return
    if (entity.item.getId() != 'kubejs:block_of_pure_vitamin_c') return
    if (!entity.isInWater()) return

    entity.setItem(Item.of('pamhc2trees:bananaitem'))
})

// Bannana Pickaxe grants permanent Haste I while held in main hand
PlayerEvents.tick(event => {
    const player = event.getPlayer()
    if (player.level.isClientSide) return
    if (player.getMainHandItem().getId() != 'pamhc2trees:bananaitem_pickaxe') return

    player.potionEffects.add('minecraft:haste', 40, 0, false, false)
})

// Bannana Pickaxe can be eaten (right-click in air) to Remove 50 durability
PlayerEvents.rightClickItem(event => {
    const player = event.getPlayer()
    const item = event.getItem()
    if (item.getId() != 'pamhc2trees:bananaitem_pickaxe') return
    if (item.getDamageValue() == 0) return

    item.setDamageValue(Math.max(0, item.getDamageValue() - 50))
    event.cancel()
})
