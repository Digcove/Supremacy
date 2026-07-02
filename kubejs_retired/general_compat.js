// General recipe compatibility fixes — nugget unification, minor recipe adjustments
// Adapted from Star Technology THETA-1 general.js
// Unifies duplicate metal nuggets from Create and Thermal into GTCEu items;
// fixes minor recipe conflicts and makes some items more GT-appropriate.
ServerEvents.recipes(event => {

    // === Nugget Unification ===
    // Create and Thermal both register copper, zinc, and brass nuggets that conflict with GTCEu.
    // Route all their outputs and inputs to the GTCEu canonical nuggets.
    const unifyNuggets = (mod) => {
        ['copper', 'zinc', 'brass'].forEach(metal => {
            event.replaceOutput({ output: `${mod}:${metal}_nugget` }, `${mod}:${metal}_nugget`, `gtceu:${metal}_nugget`);
            event.replaceInput({ input: `${mod}:${metal}_nugget` }, `${mod}:${metal}_nugget`, `gtceu:${metal}_nugget`);
        });
    };

    unifyNuggets('create');
    unifyNuggets('thermal');

    // === Farmer's Delight — Onion Tag Fix ===
    // Some FD recipes hard-code the item instead of the tag; fix both directions.
    event.replaceInput({ input: 'farmersdelight:onion' }, 'farmersdelight:onion', '#forge:crops/onion');

    // === Create Recipe Fixes ===
    // Goggles use copper plate instead of gold plate (gold is more scarce and GT-appropriate)
    event.replaceInput({ id: 'create:crafting/kinetics/goggles' }, '#forge:plates/gold', 'gtceu:copper_plate');

    // Remove Create glass pane smelting (avoids cluttering JEI with redundant routes)
    event.remove({ id: 'create:splashing/stained_glass' });
    ['tiled', 'framed', 'horizontal_framed', 'vertical_framed'].forEach(type => {
        event.remove({ id: `create:smelting/glass_pane_from_${type}_glass_pane` });
    });

    // Andesite Alloy block decomp — shapeless 9 alloy from a storage block
    event.shapeless('9x create:andesite_alloy', ['create:andesite_alloy_block'])
        .id('supremacy:general/andesite_alloy_block_decomp');

    // === Functional Storage — Remove Alternate Drawer Recipes ===
    // Alternate recipes clutter JEI; the main recipes are fine.
    [1, 2, 4].forEach(size => {
        event.remove({ id: `functionalstorage:oak_drawer_alternate_x${size}` });
    });

    // === Modular Routers — Speed Upgrade Fix ===
    // Gold is too cheap for something this powerful; electrum plate is more appropriate.
    // Blaze rod → sugar to avoid requiring nether access for a basic upgrade.
    event.replaceInput({ id: 'modularrouters:speed_upgrade' }, 'minecraft:gold_ingot', 'gtceu:electrum_plate');
    event.replaceInput({ id: 'modularrouters:speed_upgrade' }, 'minecraft:blaze_rod', 'minecraft:sugar');

});
