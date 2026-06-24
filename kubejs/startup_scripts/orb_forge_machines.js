// ORB FORGE — Machine & Recipe Type Registration
// Registers MBDRecipeType entries and MultiblockMachineDefinition blocks via KubeJS.
//
// Java.type() is unavailable in KubeJS 6.5 startup scripts (JavaWrapper has no .type()).
// Strings are used for IDs — KubeJS auto-converts them to ResourceLocation.
// Recipe type ↔ machine linkage must be configured in the MBD2 editor for each machine.
//
// RECIPE FORMAT (in server_scripts/orb_forge/tier_X.js):
//   event.custom({ type: 'modpack:<machine_id>', duration: N, inputs: {...}, outputs: {...} })
//
// TODO: open each machine in the MBD2 editor to define block structure, recipe type, and model

const MACHINE_IDS = [
    'modpack:basic_modify_station',
    'modpack:hybrid_refinery_bench',
    'modpack:cipher_engraving_table',
    'modpack:quantum_exaltation_array',
    'modpack:fusion_forge',
    'modpack:nano_reliquary',
    'modpack:orb_forge'  // Master machine: runs all tier recipes at 4x speed
]

// Step 1: Register one MBDRecipeType per machine.
// KubeJS then exposes each as type: 'modpack:<id>' in event.custom() and JEI.
MBDRegistryEvents.recipeType(event => {
    MACHINE_IDS.forEach(id => {
        event.createRecipeType(id)
    })
})

// Step 2: Register MultiblockMachineDefinition blocks.
// KubeJS auto-converts strings to ResourceLocation; recipe type linkage is
// done via the MBD2 editor for each machine after initial registration.
MBDRegistryEvents.machine(event => {
    MACHINE_IDS.forEach(id => {
        event.create('multiblock', id).build()
    })
})
