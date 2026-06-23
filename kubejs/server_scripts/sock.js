ServerEvents.recipes(event => {

    // Sock — 3 string
    event.shapeless('kubejs:sock', [
        'minecraft:string',
        'minecraft:string',
        'minecraft:string'
    ])

    // All beds require a Bull Cum Soaked Sock in the center wool slot
    const colors = [
        'white', 'orange', 'magenta', 'light_blue', 'yellow', 'lime', 'pink',
        'gray', 'light_gray', 'cyan', 'purple', 'blue', 'brown', 'green', 'red', 'black'
    ]

    colors.forEach(color => {
        event.remove({ output: `minecraft:${color}_bed` })
        event.shaped(`minecraft:${color}_bed`, [
            'WSW',
            'PPP',
            '   '
        ], {
            W: `minecraft:${color}_wool`,
            S: 'kubejs:soaked_sock',
            P: '#minecraft:planks'
        })
    })

})

// Shift right-click a Bison with a Sock → Bull Cum Soaked Sock
PlayerEvents.rightClickEntity(event => {
    const player = event.getPlayer()
    if (!player.isCrouching()) return
    if (event.getTarget().type != 'alexsmobs:bison') return

    const sock = player.getMainHandItem()
    if (sock.getId() != 'kubejs:sock') return

    sock.shrink(1)
    player.give(Item.of('kubejs:soaked_sock'))
    event.cancel()
})

// Shift right-click in air 5 times with a Sock → Bull Cum Soaked Sock
PlayerEvents.rightClickItem(event => {
    const player = event.getPlayer()
    if (!player.isCrouching()) return

    const item = event.getItem()
    if (item.getId() != 'kubejs:sock') return

    const data = player.persistentData
    const clicks = data.getInt('sock_soak_clicks') + 1

    if (clicks >= 5) {
        data.putInt('sock_soak_clicks', 0)
        item.shrink(1)
        player.give(Item.of('kubejs:soaked_sock'))
    } else {
        data.putInt('sock_soak_clicks', clicks)
    }
})
