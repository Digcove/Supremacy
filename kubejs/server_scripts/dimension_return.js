// Dimension return system — saves player coords before entering instanced dimensions
// and teleports them back out via the Library of Exile return block or the home pearl item.
// Ported from C2E2; adapted for Supremacy's dimlist (dungeon_realm, the_harvest, ancient_obelisks).

// ========= CONFIGURATION ========= //
const SPAWN_COORDS = { x: 0, y: 64, z: 0 }; // TODO: set actual spawn coords
const SPAWN_DIMENSION = "minecraft:overworld";

const INPUT_DEVICES = {
    "dungeon_realm:map_device": "dungeon_realm:dungeon",
    "the_harvest:harvest": "the_harvest:harvest",
    "ancient_obelisks:obelisk": "ancient_obelisks:obelisk",
    "dungeon_realm:reward_teleport": "dungeon_realm:reward_teleport",
    "dungeon_realm:boss_teleport": "dungeon_realm:boss_teleport",
    "dungeon_realm:uber_teleport": "dungeon_realm:uber_teleport"
};

const MESSAGES = {
    NO_LOCATION:       "§cNo saved location! Sending you to spawn…",
    TELEPORT_TO_SPAWN: "§aTeleported to spawn!",
    SAME_DIMENSION:    "§cYou can not return to the same dimension!",
    NO_TAG:            "§cNo tag associated with player!",
    NO_MAP:            "§cYou must be in a map to use this!",
    TELEPORT_SUCCESS:  "§aTeleported you back to your last location!",
    TELEPORT_ERROR:    "§cError teleporting to saved location!"
};
// ======= END CONFIGURATION ======= //

const TELEPORT_BLOCK_ID  = "library_of_exile:teleport_back";
const TREASURE_BLOCK_ID  = "dungeon_realm:reward_teleport";
const BOSS_BLOCK_ID      = "dungeon_realm:boss_teleport";
const U_BOSS_BLOCK_ID    = "dungeon_realm:uber_teleport";
const MAP_BLOCK_ID       = "dungeon_realm:map_device";
const MAP_RETURN_ITEM    = "dungeon_realm:home_pearl";

BlockEvents.rightClicked(event => {
    const player = event.player;
    const block  = event.block;
    if (!player || !block) return;

    let storagePrefix = "";

    if (block.id === TELEPORT_BLOCK_ID) {
        const hasHarvest  = player.tags.contains("Harvest");
        const hasObelisk  = player.tags.contains("Obelisk");
        const hasBoss     = player.tags.contains("Boss");
        const hasUBoss    = player.tags.contains("UBoss");
        const hasTreasure = player.tags.contains("Treasure");

        if (!hasHarvest && !hasObelisk && !hasBoss && !hasTreasure && !hasUBoss) {
            player.tell(MESSAGES.NO_TAG);
            event.cancel();
            return;
        }

        storagePrefix = "";
        if (hasBoss)     storagePrefix = "boss";
        if (hasUBoss)    storagePrefix = "uboss";
        if (hasTreasure) storagePrefix = "treasure";
        if (hasObelisk)  storagePrefix = "obelisk";
        if (hasHarvest)  storagePrefix = "harvest";

        const savedDim = player.persistentData.getString(`${storagePrefix}_dim`);
        const x = player.persistentData.getDouble(`${storagePrefix}_x`);
        const y = player.persistentData.getDouble(`${storagePrefix}_y`);
        const z = player.persistentData.getDouble(`${storagePrefix}_z`);

        const success = event.server.runCommandSilent(`execute in ${savedDim} run tp ${player.name.string} ${x} ${y} ${z}`);
        if (success) {
            player.tell(MESSAGES.TELEPORT_SUCCESS);
            event.server.runCommandSilent(`execute as ${player.name.string} at @s run playsound minecraft:entity.enderman.teleport player @s ~ ~ ~ 1 1`);
            event.server.runCommandSilent(`execute as ${player.name.string} at @s run particle minecraft:portal ~ ~1 ~ 0.5 0.5 0.5 0.1 30`);
            if (storagePrefix === "treasure") player.tags.remove("Treasure");
            else if (storagePrefix === "boss")     player.tags.remove("Boss");
            else if (storagePrefix === "uboss")    player.tags.remove("UBoss");
            else if (storagePrefix === "obelisk")  player.tags.remove("Obelisk");
            else if (storagePrefix === "harvest")  player.tags.remove("Harvest");
            player.persistentData.remove(`${storagePrefix}_dim`);
            player.persistentData.remove(`${storagePrefix}_x`);
            player.persistentData.remove(`${storagePrefix}_y`);
            player.persistentData.remove(`${storagePrefix}_z`);
        } else {
            player.tell(MESSAGES.TELEPORT_ERROR);
        }
        event.cancel();
        return;
    }

    const targetDimension = INPUT_DEVICES[block.id];
    if (!targetDimension) return;

    storagePrefix = "";

    if (block.id === MAP_BLOCK_ID) {
        if (player.tags.contains("Map")) {
            const sp  = "map";
            const dim = player.persistentData.getString(`${sp}_dim`);
            const x   = player.persistentData.getDouble(`${sp}_x`);
            const y   = player.persistentData.getDouble(`${sp}_y`);
            const z   = player.persistentData.getDouble(`${sp}_z`);
            const ok  = event.server.runCommandSilent(`execute in ${dim} run tp ${player.name.string} ${x} ${y} ${z}`);
            if (ok) {
                player.tell(MESSAGES.TELEPORT_SUCCESS);
                event.server.runCommandSilent(`execute as ${player.name.string} at @s run playsound minecraft:entity.enderman.teleport player @s ~ ~ ~ 1 1`);
                player.tags.remove("Map");
                player.persistentData.remove(`${sp}_dim`);
                player.persistentData.remove(`${sp}_x`);
                player.persistentData.remove(`${sp}_y`);
                player.persistentData.remove(`${sp}_z`);
            } else {
                player.tell(MESSAGES.TELEPORT_ERROR);
            }
            event.cancel();
            return;
        }
        storagePrefix = "map";
    }
    if (block.id === TREASURE_BLOCK_ID) { storagePrefix = "treasure"; player.tags.add("Treasure"); }
    if (block.id === BOSS_BLOCK_ID)     { storagePrefix = "boss";     player.tags.add("Boss"); }
    if (block.id === U_BOSS_BLOCK_ID)   { storagePrefix = "uboss";    player.tags.add("UBoss"); }
    if (block.id.includes("obelisk"))   { storagePrefix = "obelisk"; }
    if (block.id.includes("harvest"))   { storagePrefix = "harvest"; }

    if (storagePrefix) {
        player.persistentData.putDouble(`${storagePrefix}_x`, player.x);
        player.persistentData.putDouble(`${storagePrefix}_y`, player.y);
        player.persistentData.putDouble(`${storagePrefix}_z`, player.z);
        player.persistentData.putString(`${storagePrefix}_dim`, player.level.dimension.toString());
    }
});

ItemEvents.rightClicked(event => {
    const player = event.player;
    const item   = event.item;
    if (!player || item.id !== MAP_RETURN_ITEM) return;

    if (!player.tags.contains("Map")) {
        player.tell(MESSAGES.NO_MAP);
        event.cancel();
        return;
    }

    const sp  = "map";
    const dim = player.persistentData.getString(`${sp}_dim`);
    const x   = player.persistentData.getDouble(`${sp}_x`);
    const y   = player.persistentData.getDouble(`${sp}_y`);
    const z   = player.persistentData.getDouble(`${sp}_z`);
    const ok  = event.server.runCommandSilent(`execute in ${dim} run tp ${player.name.string} ${x} ${y} ${z}`);
    if (ok) {
        player.tell(MESSAGES.TELEPORT_SUCCESS);
        event.server.runCommandSilent(`execute as ${player.name.string} at @s run playsound minecraft:entity.enderman.teleport player @s ~ ~ ~ 1 1`);
        player.tags.remove("Map");
        item.count--;
        player.persistentData.remove(`${sp}_dim`);
        player.persistentData.remove(`${sp}_x`);
        player.persistentData.remove(`${sp}_y`);
        player.persistentData.remove(`${sp}_z`);
    } else {
        player.tell(MESSAGES.TELEPORT_ERROR);
    }
    event.cancel();
});

EntityEvents.death(event => {
    const entity = event.entity;
    if (!entity.isPlayer()) return;
    entity.tags.remove("Map");
    entity.tags.remove("Treasure");
    entity.tags.remove("Boss");
    entity.tags.remove("UBoss");
    entity.tags.remove("Obelisk");
    entity.tags.remove("Harvest");
});
