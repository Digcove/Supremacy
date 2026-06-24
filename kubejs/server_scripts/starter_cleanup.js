// Items removed from player inventory on first world join.
// Item IDs marked with (?) may need correction if the in-game ID differs.
const SPAWN_BLACKLIST = [
    'advancedperipherals:computer_book',   // Advanced Peripherals guide (?)
    'alexsmobs:animal_dictionary',          // Alex's Mobs animal dictionary
    'ars_nouveau:worn_notebook',            // Ars Nouveau worn notebook
    'soulland:cultivation_manual',          // Soul Land cultivation manual
    'tconstruct:materials_and_you',         // Tinkers' Construct guide (?)
    'ars_creo:book',                        // Ars Creo: On the Dynamics of Integration (?)
    'apotheosis:chronicle_of_shadows',      // Apotheosis guide (?)
    'apotheosis:ring_of_seven_curses',      // Apotheosis ring (?)
]

// Blueprint types to strip after a blueprint package is opened
const BLUEPRINT_BLACKLIST = [
    'silentgear:blueprint/sword',
    'silentgear:blueprint/knife',
]

let pendingFirstJoin = {}
let pendingBlueprintCleanup = {}

PlayerEvents.loggedIn(event => {
    const player = event.player
    if (player.level.isClientSide()) return
    if (!player.persistentData.getBoolean('c2e2_starter_cleanup')) {
        pendingFirstJoin[player.uuid.toString()] = true
    }
})

PlayerEvents.rightClickItem(event => {
    const item = event.getItem()
    if (item.getId() === 'silentgear:blueprint_package') {
        pendingBlueprintCleanup[event.getPlayer().uuid.toString()] = true
    }
})

PlayerEvents.tick(event => {
    const player = event.getPlayer()
    if (player.level.isClientSide()) return
    const uuid = player.uuid.toString()

    if (pendingFirstJoin[uuid]) {
        delete pendingFirstJoin[uuid]
        player.persistentData.putBoolean('c2e2_starter_cleanup', true)
        const inv = player.getInventory()
        for (let i = 0; i < inv.containerSize; i++) {
            const stack = inv.getItem(i)
            if (!stack.isEmpty() && SPAWN_BLACKLIST.includes(stack.id)) {
                stack.shrink(stack.count)
            }
        }
    }

    if (pendingBlueprintCleanup[uuid]) {
        delete pendingBlueprintCleanup[uuid]
        const inv = player.getInventory()
        for (let i = 0; i < inv.containerSize; i++) {
            const stack = inv.getItem(i)
            if (!stack.isEmpty() && BLUEPRINT_BLACKLIST.includes(stack.id)) {
                stack.shrink(stack.count)
            }
        }
    }
})
