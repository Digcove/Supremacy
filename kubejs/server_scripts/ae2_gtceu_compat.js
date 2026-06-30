// AE2 + GTCEu integration recipes
// Adapted from Star Technology THETA-1 ae2_qol.js and gt_compat.js
// Adds cable coloring via Chemical Bath, rubber covering, and GT-native AE2 processing paths.
ServerEvents.recipes(event => {

    // === Cable Coloring / Uncoloring via Chemical Bath ===
    const colours = ['black', 'blue', 'brown', 'cyan', 'green', 'gray', 'lime', 'light_blue', 'light_gray', 'magenta', 'orange', 'purple', 'red', 'white', 'yellow', 'pink'];
    const cableTypes = ['glass_cable', 'covered_cable', 'covered_dense_cable', 'smart_cable', 'smart_dense_cable'];

    colours.forEach(colour => {
        cableTypes.forEach(type => {
            event.recipes.gtceu.chemical_bath(`supremacy:ae2/colour_${colour}_${type}`)
                .itemInputs(`8x ae2:fluix_${type}`)
                .inputFluids(`gtceu:${colour}_dye 36`)
                .itemOutputs(`8x ae2:${colour}_${type}`)
                .duration(280)
                .EUt(100);

            event.recipes.gtceu.chemical_bath(`supremacy:ae2/uncolour_${colour}_${type}`)
                .itemInputs(`8x ae2:${colour}_${type}`)
                .inputFluids('gtceu:chlorine 100')
                .itemOutputs(`8x ae2:fluix_${type}`)
                .duration(280)
                .EUt(100);
        });
    });

    // === Covered Cable from Glass Cable + Rubber ===
    const rubberTypes = [
        { fluid: 'thermal:latex', amount: 288 },
        { fluid: 'gtceu:rubber', amount: 144 },
        { fluid: 'gtceu:silicone_rubber', amount: 72 },
        { fluid: 'gtceu:styrene_butadiene_rubber', amount: 36 },
        { fluid: 'gtceu:perfluoroelastomer_rubber', amount: 18 }
    ];

    rubberTypes.forEach(r => {
        const suffix = r.fluid.replace(':', '_').replace('/', '_');
        event.recipes.gtceu.assembler(`supremacy:ae2/covered_cable_${suffix}`)
            .itemInputs('ae2:fluix_glass_cable')
            .inputFluids(`${r.fluid} ${r.amount}`)
            .itemOutputs('ae2:fluix_covered_cable')
            .duration(100)
            .EUt(69);
    });

    // === GTCEu-native AE2 Processing Paths ===

    // Quartz Fiber via Wire Mill (3 per quartz)
    event.recipes.gtceu.wiremill('supremacy:ae2/quartz_fiber')
        .itemInputs('minecraft:quartz')
        .itemOutputs('3x ae2:quartz_fiber')
        .duration(80)
        .EUt(16);

    // Fluix Crystal dust via Macerator
    event.recipes.gtceu.macerator('supremacy:ae2/fluix_dust')
        .itemInputs('ae2:fluix_crystal')
        .itemOutputs('ae2:fluix_dust')
        .duration(88)
        .EUt(2);

    // Sky Stone dust via Macerator
    event.recipes.gtceu.macerator('supremacy:ae2/sky_stone_dust')
        .itemInputs('ae2:sky_stone_block')
        .itemOutputs('ae2:sky_dust')
        .duration(88)
        .EUt(2);

    // Charged Certus via Polarizer (no waiting for natural charge)
    event.recipes.gtceu.polarizer('supremacy:ae2/charged_certus')
        .itemInputs('ae2:certus_quartz_crystal')
        .itemOutputs('ae2:charged_certus_quartz_crystal')
        .duration(200)
        .EUt(10);

    // Fluix Crystal synthesis via Mixer
    event.recipes.gtceu.mixer('supremacy:ae2/fluix_crystal')
        .itemInputs('ae2:charged_certus_quartz_crystal', 'minecraft:redstone', 'minecraft:quartz')
        .inputFluids('minecraft:water 250')
        .itemOutputs('2x ae2:fluix_crystal')
        .duration(200)
        .EUt(65);

    // Certus Quartz unification — route all tag-based certus quartz to ae2 items
    [
        { filter: '#forge:dusts/certus_quartz', replacement: 'gtceu:certus_quartz_dust' },
        { filter: '#forge:gems/certus_quartz', replacement: 'ae2:certus_quartz_crystal' }
    ].forEach(pair => {
        event.replaceInput({ input: pair.filter }, pair.filter, pair.replacement);
        event.replaceOutput({ output: pair.filter }, pair.filter, pair.replacement);
    });

    // GTCEu Cutter yields 2 certus crystals per cut (normally 1)
    event.replaceOutput({ type: 'gtceu:cutter' }, 'ae2:certus_quartz_crystal', '2x ae2:certus_quartz_crystal');

});
