// Thermal Expansion + GTCEu integration
// Adapted from Star Technology THETA-1 thermal.js
// Gates dynamo crafting behind GTCEu materials; registers GTCEu fuels for Thermal engines;
// fixes several recipe conflicts between Thermal and GTCEu processing chains.
ServerEvents.recipes(event => {

    // === Dynamo Recipe Overhaul ===
    // Remove all vanilla dynamo crafting recipes and replace with GT-materials-based versions.
    event.remove({ output: /thermal:dynamo.*/ });

    // RF Coil — core component for all dynamos
    event.shaped('thermal:rf_coil', [
        ' RP',
        'RBR',
        'PR '
    ], {
        R: 'gtceu:gold_rod',
        P: 'gtceu:gold_plate',
        B: 'minecraft:redstone_block'
    }).id('supremacy:thermal/rf_coil');

    // Stirling Dynamo — burns solid fuels
    event.shaped('thermal:dynamo_stirling', [
        ' C ',
        'PGP',
        'SRS'
    ], {
        C: 'thermal:rf_coil',
        P: 'gtceu:iron_plate',
        G: 'gtceu:iron_gear',
        S: 'gtceu:steel_plate',
        R: 'gtceu:lv_machine_hull'
    }).id('supremacy:thermal/stirling_dynamo');

    event.recipes.gtceu.assembler('supremacy:thermal/stirling_dynamo_assembler')
        .itemInputs('thermal:rf_coil', 'gtceu:iron_gear', 'gtceu:lv_machine_hull')
        .itemOutputs('thermal:dynamo_stirling')
        .inputFluids('gtceu:tin_alloy 144')
        .duration(300)
        .EUt(16);

    // Lapidary Dynamo — burns gems
    event.recipes.gtceu.assembler('supremacy:thermal/lapidary_dynamo')
        .itemInputs('thermal:rf_coil', 'gtceu:cobalt_brass_gear', 'gtceu:lv_machine_hull')
        .itemOutputs('thermal:dynamo_lapidary')
        .inputFluids('gtceu:tin_alloy 288')
        .duration(300)
        .EUt(30);

    // Compression Dynamo — burns liquid fuels
    event.recipes.gtceu.assembler('supremacy:thermal/compression_dynamo')
        .itemInputs('thermal:rf_coil', 'gtceu:bronze_gear', 'gtceu:lv_machine_hull')
        .itemOutputs('thermal:dynamo_compression')
        .inputFluids('gtceu:tin_alloy 432')
        .duration(300)
        .EUt(30);

    // === GTCEu Fuels for Compression Dynamo ===
    // Remove Thermal's own tree_oil and refined_fuel (GT equivalents exist)
    event.remove({ type: 'thermal:compression_fuel', input: 'thermal:tree_oil' });
    event.remove({ type: 'thermal:compression_fuel', input: 'thermal:refined_fuel' });

    // Register GTCEu petroleum fuels as Thermal compression fuels (RF per bucket)
    event.recipes.thermal.compression_fuel('gtceu:bio_diesel', 512000);
    event.recipes.thermal.compression_fuel('gtceu:naphtha', 480000);
    event.recipes.thermal.compression_fuel('gtceu:diesel', 960000);
    event.recipes.thermal.compression_fuel('gtceu:cetane_boosted_diesel', 1280000);
    event.recipes.thermal.compression_fuel('gtceu:gasoline', 3200000);
    event.recipes.thermal.compression_fuel('gtceu:high_octane_gasoline', 6400000);

    // Fix GTCEu naphtha combustion generator recipe (naphtha should also burn in GT engines)
    event.remove({ id: 'gtceu:combustion_generator/naphtha' });
    event.recipes.gtceu.combustion_generator('supremacy:thermal/naphtha_combustion')
        .inputFluids('gtceu:naphtha 4')
        .duration(30)
        .EUt(-32);

    // === Lapidary Dynamo Gem Fuel ===
    // Diamond is intentionally nerfed to incentivize GTCEu gem processing
    event.remove({ type: 'thermal:lapidary_fuel', input: 'minecraft:diamond' });
    event.recipes.thermal.lapidary_fuel('minecraft:diamond', 300000);

    // === Device Fixes — GT-integrated material requirements ===
    // Water Generator now requires lead (heavier, more realistic)
    event.replaceInput({ id: 'thermal:device_water_gen' }, 'minecraft:copper_ingot', 'gtceu:lead_ingot');
    event.replaceInput({ id: 'thermal:device_water_gen' }, 'minecraft:iron_ingot', 'minecraft:copper_ingot');

    // Fisher and Rock Generator gears → Bronze (stronger, GT-appropriate)
    event.replaceInput({ id: 'thermal:device_fisher' }, '#forge:gears/copper', 'gtceu:bronze_gear');
    event.replaceInput({ id: 'thermal:device_rock_gen' }, '#forge:gears/constantan', 'gtceu:bronze_gear');
    event.replaceInput({ id: 'thermal:device_potion_diffuser' }, '#forge:gears/constantan', 'gtceu:bronze_gear');

    // === Molten Ender extraction ===
    event.recipes.gtceu.extractor('supremacy:thermal/molten_ender')
        .itemInputs('minecraft:ender_pearl')
        .outputFluids('thermal:ender 250')
        .duration(600)
        .EUt(28);

    // === Energy Cell Frame ===
    event.shaped('thermal:energy_cell_frame', [
        'LEL',
        'E E',
        'LEL'
    ], {
        L: 'gtceu:lead_plate',
        E: 'gtceu:electrum_plate'
    }).id('supremacy:thermal/energy_cell_frame');

    // Quick-assemble Energy Cell and Fluid Cell via GT machines
    event.recipes.gtceu.alloy_smelter('supremacy:thermal/energy_cell')
        .itemInputs('thermal:energy_cell_frame', 'minecraft:redstone_block')
        .itemOutputs('thermal:energy_cell')
        .duration(80)
        .EUt(28);

    event.recipes.gtceu.alloy_smelter('supremacy:thermal/fluid_cell')
        .itemInputs('thermal:fluid_cell_frame', 'create:fluid_tank')
        .itemOutputs('thermal:fluid_cell')
        .duration(80)
        .EUt(28);

    // Redstone Servo — required for many Thermal devices
    event.remove({ id: 'thermal:redstone_servo' });
    event.shaped('thermal:redstone_servo', [
        ' R ',
        'RGR',
        ' R '
    ], {
        R: 'minecraft:redstone',
        G: 'gtceu:gold_plate'
    }).id('supremacy:thermal/redstone_servo');

});
