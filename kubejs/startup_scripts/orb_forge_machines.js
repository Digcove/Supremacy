// ORB FORGE — Machine & Recipe Type Registration
// Registers 6 MBDRecipeType entries and 6 MultiblockMachineDefinition blocks via KubeJS.
//
// Event group: MBDRegistryEvents  (from com.lowdragmc.mbd2.integration.kubejs.events.MBDStartupEvents)
//   MBDRegistryEvents.recipeType(...)  → registers MBDRecipeType per machine
//   MBDRegistryEvents.machine(...)     → registers MultiblockMachineDefinition block + item
//
// RECIPE FORMAT (in server_scripts/orb_forge/tier_X.js):
//   event.custom({ type: 'modpack:<machine_id>', duration: N, inputs: {...}, outputs: {...} })
//   No 'machine' field — the type field IS the machine's recipe type.
//
// MULTIBLOCK STRUCTURE:
//   The physical block pattern for each machine must be built in-game using the
//   MBD2 Machine Editor (use MBD Gadgets → Multiblock Builder).
//   Recipe logic (which recipe type the machine uses) IS wired here programmatically.
//
// TODO: open each machine in the MBD2 editor to define its block structure
// TODO: set visual model / block texture per machine in the MBD2 editor

const ConfigRecipeLogicSettings = Java.type('com.lowdragmc.mbd2.common.machine.definition.config.ConfigRecipeLogicSettings')
const ResourceLocation = Java.type('net.minecraft.resources.ResourceLocation')

const MACHINE_IDS = [
    ['modpack', 'basic_modify_station'],
    ['modpack', 'hybrid_refinery_bench'],
    ['modpack', 'cipher_engraving_table'],
    ['modpack', 'quantum_exaltation_array'],
    ['modpack', 'fusion_forge'],
    ['modpack', 'nano_reliquary']
]

// Step 1: Register one MBDRecipeType per machine.
// KubeJS then exposes each as type: 'modpack:<id>' in event.custom() and JEI.
MBDRegistryEvents.recipeType(event => {
    MACHINE_IDS.forEach(([ns, path]) => {
        event.createRecipeType(new ResourceLocation(ns, path))
    })
})

// Step 2: Register MultiblockMachineDefinition blocks.
// Each machine is linked to its recipe type via ConfigRecipeLogicSettings.
// Structure pattern is intentionally left default (1-block stub) until defined in the MBD2 editor.
MBDRegistryEvents.machine(event => {
    MACHINE_IDS.forEach(([ns, path]) => {
        const recipeTypeRL = new ResourceLocation(ns, path)
        const recipeLogic = ConfigRecipeLogicSettings.builder()
            .enable(true)
            .recipeType(recipeTypeRL)
            .build()

        event.create('multiblock', recipeTypeRL)
            .recipeLogicSettings(recipeLogic)
            .build()
    })
})
