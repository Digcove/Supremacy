// Flint Compass — right-click to locate the nearest gravel block within 32 blocks
// (horizontal) and ±16 blocks (vertical). Reports direction and coordinates.
// Minecraft axes: +X = East, -X = West, +Z = South, -Z = North

ItemEvents.rightClicked('kubejs:flint_compass', event => {
    if (event.level.isClientSide()) return

    let player = event.player
    let level = event.level
    let pos = player.blockPosition()
    let px = pos.x, py = pos.y, pz = pos.z

    let nearestX = null, nearestY = null, nearestZ = null
    let nearestDistSq = Infinity
    let hRadius = 32
    let yRange = 16

    for (let x = -hRadius; x <= hRadius; x++) {
        for (let z = -hRadius; z <= hRadius; z++) {
            for (let y = -yRange; y <= yRange; y++) {
                if (level.getBlock(px + x, py + y, pz + z).id === 'minecraft:gravel') {
                    let distSq = x * x + y * y + z * z
                    if (distSq < nearestDistSq) {
                        nearestDistSq = distSq
                        nearestX = px + x
                        nearestY = py + y
                        nearestZ = pz + z
                    }
                }
            }
        }
    }

    if (nearestX !== null) {
        let dist = Math.round(Math.sqrt(nearestDistSq))
        let dx = nearestX - px
        let dz = nearestZ - pz
        let angle = Math.atan2(dz, dx) * 180 / Math.PI

        let dir
        if      (angle > -22.5  && angle <=  22.5)  dir = 'East'
        else if (angle >  22.5  && angle <=  67.5)  dir = 'Southeast'
        else if (angle >  67.5  && angle <= 112.5)  dir = 'South'
        else if (angle > 112.5  && angle <= 157.5)  dir = 'Southwest'
        else if (angle >  157.5 || angle <= -157.5) dir = 'West'
        else if (angle > -157.5 && angle <= -112.5) dir = 'Northwest'
        else if (angle > -112.5 && angle <=  -67.5) dir = 'North'
        else                                          dir = 'Northeast'

        player.tell(Text.literal('§6[Flint Compass] §eGravel detected to the ' + dir + ' — ' + dist + ' blocks away (' + nearestX + ', ' + nearestY + ', ' + nearestZ + ')'))
    } else {
        player.tell(Text.literal('§7[Flint Compass] No gravel detected within range.'))
    }
})
