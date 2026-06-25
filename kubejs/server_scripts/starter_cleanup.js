// Items to keep on first join. Everything else is wiped.
// Add item IDs here if a specific item should survive the cleanup.
const SPAWN_WHITELIST = []

// Ticks to wait after login before clearing — gives mods time to finish distributing starter items
const CLEANUP_DELAY_TICKS = 100

let pendingFirstJoin = {}  // uuid -> ticks remaining

PlayerEvents.loggedIn(event => {
    const player = event.player
    if (player.level.isClientSide()) return
    if (!player.persistentData.getBoolean('c2e2_starter_cleanup')) {
        pendingFirstJoin[player.uuid.toString()] = CLEANUP_DELAY_TICKS
    }
})

PlayerEvents.tick(event => {
    const player = event.getPlayer()
    if (player.level.isClientSide()) return
    const uuid = player.uuid.toString()

    if (uuid in pendingFirstJoin) {
        pendingFirstJoin[uuid]--
        if (pendingFirstJoin[uuid] <= 0) {
            delete pendingFirstJoin[uuid]
            player.persistentData.putBoolean('c2e2_starter_cleanup', true)
            const inv = player.getInventory()
            for (let i = 0; i < inv.containerSize; i++) {
                const stack = inv.getItem(i)
                if (!stack.isEmpty() && !SPAWN_WHITELIST.includes(stack.id)) {
                    inv.setItem(i, Item.of('minecraft:air'))
                }
            }
        }
    }
})
