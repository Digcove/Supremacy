// Items to keep on first join. Everything else is wiped.
// Add item IDs here if a specific item should survive the cleanup.
const SPAWN_WHITELIST = []

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
            if (!stack.isEmpty() && !SPAWN_WHITELIST.includes(stack.id)) {
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
