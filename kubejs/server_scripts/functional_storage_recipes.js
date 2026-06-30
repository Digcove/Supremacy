// Functional Storage recipe overhaul — gate upgrades and core blocks behind GTCEu materials
// Adapted from Star Technology THETA-1 functional_storage.js
// Removes vanilla/basic recipes and replaces them with GT-appropriate crafting paths.
ServerEvents.recipes(event => {

    // Remove vanilla upgrade recipes and re-add with GTCEu materials
    event.remove({ output: /functionalstorage:.*grade/ });
    event.remove({ output: 'functionalstorage:ender_drawer' });
    event.remove({ output: 'functionalstorage:storage_controller' });
    event.remove({ output: 'functionalstorage:controller_extension' });
    event.remove({ output: 'functionalstorage:compacting_drawer' });
    event.remove({ output: 'functionalstorage:simple_compacting_drawer' });
    event.remove({ output: 'functionalstorage:collector_upgrade' });
    event.remove({ output: 'functionalstorage:puller_upgrade' });
    event.remove({ output: 'functionalstorage:pusher_upgrade' });

    // Copper Upgrade (size 1 → 2 stacks per slot)
    event.shaped('functionalstorage:copper_upgrade', [
        ' C ',
        'CTC',
        ' C '
    ], {
        C: 'gtceu:double_copper_plate',
        T: 'gtceu:tin_plate'
    }).id('supremacy:functionalstorage/copper_upgrade');

    // Iron Downgrade (reduce size, recover materials)
    event.shaped('functionalstorage:iron_downgrade', [
        ' C ',
        'CTC',
        ' C '
    ], {
        C: 'gtceu:iron_plate',
        T: 'gtceu:tin_plate'
    }).id('supremacy:functionalstorage/iron_downgrade');

    // Void Upgrade (deletes overflow)
    event.shaped('functionalstorage:void_upgrade', [
        ' O ',
        'OSO',
        ' O '
    ], {
        O: 'minecraft:obsidian',
        S: 'gtceu:soul_infused_plate'
    }).id('supremacy:functionalstorage/void_upgrade');

    // Puller Upgrade (pulls items into drawers from adjacent inventories)
    event.shaped('functionalstorage:puller_upgrade', [
        ' C ',
        'TRT',
        ' T '
    ], {
        C: 'gtceu:lv_conveyor_module',
        T: 'gtceu:tin_plate',
        R: 'minecraft:redstone'
    }).id('supremacy:functionalstorage/puller_upgrade');

    // Pusher Upgrade (pushes items out of drawers)
    event.shaped('functionalstorage:pusher_upgrade', [
        ' T ',
        'TRT',
        ' C '
    ], {
        C: 'gtceu:lv_conveyor_module',
        T: 'gtceu:tin_plate',
        R: 'minecraft:redstone'
    }).id('supremacy:functionalstorage/pusher_upgrade');

    // Redstone Upgrade (comparator output from drawer fill level)
    event.shaped('functionalstorage:redstone_upgrade', [
        ' R ',
        'PCP',
        ' R '
    ], {
        R: '#forge:dusts/redstone',
        C: 'minecraft:comparator',
        P: '#forge:plates/iron'
    }).id('supremacy:functionalstorage/redstone_upgrade');

    // Storage Controller (links drawers into a network)
    event.shaped('functionalstorage:storage_controller', [
        'SSS',
        'GCG',
        'SSS'
    ], {
        S: 'minecraft:stone',
        G: '#forge:glass',
        C: '#gtceu:circuits/lv'
    }).id('supremacy:functionalstorage/storage_controller');

    // Ender Drawer (cross-dimensional access via ender pearl link)
    event.shaped('2x functionalstorage:ender_drawer', [
        'OOO',
        'GPG',
        'OCO'
    ], {
        O: 'minecraft:obsidian',
        G: '#forge:glass',
        P: 'minecraft:ender_pearl',
        C: '#gtceu:circuits/lv'
    }).id('supremacy:functionalstorage/ender_drawer');

    // Flip puller/pusher with screwdriver (reversible)
    event.shapeless('functionalstorage:pusher_upgrade', [
        Item.of('functionalstorage:puller_upgrade'), '#forge:tools/screwdrivers'
    ]).id('supremacy:functionalstorage/pusher_flip');

    event.shapeless('functionalstorage:puller_upgrade', [
        Item.of('functionalstorage:pusher_upgrade'), '#forge:tools/screwdrivers'
    ]).id('supremacy:functionalstorage/puller_flip');

});
