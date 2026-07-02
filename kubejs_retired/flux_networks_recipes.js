// Flux Networks recipe integration
// Flux Dust is expensive to produce in large quantities via crafting.
// The Large Chemical Reactor route converts redstone + lava into bulk flux dust efficiently.
ServerEvents.recipes(event => {

    event.recipes.gtceu.large_chemical_reactor('supremacy:fluxnetworks/flux_dust')
        .itemInputs('32x minecraft:redstone')
        .inputFluids('minecraft:lava 64000')
        .itemOutputs('64x fluxnetworks:flux_dust')
        .duration(2400)
        .EUt(1024)
        .circuit(1);

});
