// First-join starter kit: wipe the mod-granted clutter, then explicitly grant
// the intended kit. Wipe-then-regrant is deliberate — a bare whitelist wipe
// deleted the quest book and the held item (playtest 2 bugs).

// Items granted after the wipe. Add to this list to change the starter kit.
const STARTER_KIT = [
    'ftbquests:book',
]

// Wait longer than mods take to hand out their starter items.
const CLEANUP_DELAY_TICKS = 100

let pendingFirstJoin = {}

PlayerEvents.loggedIn(event => {
    const player = event.player
    if (player.level.isClientSide()) return
    if (!player.persistentData.getBoolean('supremacy_starter_cleanup')) {
        pendingFirstJoin[player.uuid.toString()] = CLEANUP_DELAY_TICKS
    }
})

PlayerEvents.tick(event => {
    const player = event.player
    if (player.level.isClientSide()) return
    const uuid = player.uuid.toString()
    if (!(uuid in pendingFirstJoin)) return

    pendingFirstJoin[uuid]--
    if (pendingFirstJoin[uuid] > 0) return

    delete pendingFirstJoin[uuid]
    player.persistentData.putBoolean('supremacy_starter_cleanup', true)

    const inv = player.getInventory()
    for (let i = 0; i < inv.containerSize; i++) {
        inv.setItem(i, Item.of('minecraft:air'))
    }
    STARTER_KIT.forEach(id => player.give(id))
    player.tell(Text.gold('Welcome to Supremacy. Open your quest book to begin.'))
})
