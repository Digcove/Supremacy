// LootJS wiring: Orb Forge input drops, MnS-flavored structure chest loot,
// and MC Dungeons Weapons loot removal.
// VERIFY IN-GAME: matchDimension condition names and blue_skies/undergarden
// entity loot table paths (see dev_notes.md).

LootJS.modifiers(event => {

    // ---------- MC Dungeons Weapons: strip from all loot ----------
    event.addLootTypeModifier(LootType.CHEST, LootType.ENTITY, LootType.FISHING, LootType.GIFT)
        .removeLoot('@mcdw')

    // ---------- Orb Forge inputs ----------

    // Blaze-Touched Residue — Blazes (20%) and Wither Skeletons (10%)
    event.addEntityLootModifier('minecraft:blaze')
        .killedByPlayer()
        .randomChance(0.20)
        .addLoot('kubejs:blaze_touched_residue')
    event.addEntityLootModifier('minecraft:wither_skeleton')
        .killedByPlayer()
        .randomChance(0.10)
        .addLoot('kubejs:blaze_touched_residue')

    // Undergarden Reagent — any Undergarden mob (15%)
    event.addTableModifier(/undergarden:entities\/.*/)
        .randomChance(0.15)
        .addLoot('kubejs:undergarden_reagent')

    // Undergarden Boss Drop — Forgotten Guardian (guaranteed)
    event.addTableModifier(/undergarden:entities\/forgotten_guardian/)
        .addLoot('kubejs:undergarden_boss_drop')

    // Blue Skies trophies — Everbright bosses / Everdawn bosses (guaranteed)
    event.addTableModifier(/blue_skies:entities\/(summoner|starlit_crusher)/)
        .addLoot('kubejs:everbright_trophy')
    event.addTableModifier(/blue_skies:entities\/(alchemist|arachnarch)/)
        .addLoot('kubejs:everdawn_trophy')

    // Hidden Chest Relic — 3% in any structure chest
    event.addLootTypeModifier(LootType.CHEST)
        .randomChance(0.03)
        .addLoot('kubejs:hidden_chest_relic')

    // Map Boss Drop — kills inside Dungeon Realm maps (3%)
    event.addLootTypeModifier(LootType.ENTITY)
        .matchDimension('dungeon_realm:dungeon')
        .randomChance(0.03)
        .addLoot('kubejs:map_boss_drop')

    // Map Completion Token — kills in The Harvest / Ancient Obelisks (3%)
    event.addLootTypeModifier(LootType.ENTITY)
        .matchDimension('the_harvest:harvest')
        .randomChance(0.03)
        .addLoot('kubejs:map_completion_token')
    event.addLootTypeModifier(LootType.ENTITY)
        .matchDimension('ancient_obelisks:obelisk')
        .randomChance(0.03)
        .addLoot('kubejs:map_completion_token')

    // Endgame Boss Token — L_Ender's Cataclysm bosses (guaranteed)
    event.addTableModifier(/cataclysm:entities\/(ignis|netherite_monstrosity|ender_guardian|the_harbinger|the_leviathan|ancient_remnant)/)
        .addLoot('kubejs:endgame_boss_token')

    // ---------- Structure chest sweetening (MnS economy) ----------
    // C2E2 injects salvage stones/orbs/runes; exact mmorpg: item ids need JEI
    // confirmation — until then, coins keep structure chests worth opening.

    // Vanilla-ish early structures: iron coins
    event.addTableModifier(/minecraft:chests\/(simple_dungeon|abandoned_mineshaft|desert_pyramid|jungle_temple|stronghold_corridor|stronghold_crossing)/)
        .randomChance(0.6)
        .addLoot(LootEntry.of('lightmanscurrency:coin_iron').setCount([2, 8]))

    // YUNG's structures + When Dungeons Arise + Dungeon Crawl: gold coins
    event.addTableModifier(/(betterdungeons|betterdeserttemples|betterjungletemples|betteroceanmonuments|betterstrongholds|betterfortresses|dungeons_arise|dungeoncrawl):chests\/.*/)
        .randomChance(0.5)
        .addLoot(LootEntry.of('lightmanscurrency:coin_gold').setCount([1, 4]))

    // Dimension mod structures: emerald coins
    event.addTableModifier(/(blue_skies|undergarden|aether|twilightforest|deeperdarker):chests\/.*/)
        .randomChance(0.4)
        .addLoot(LootEntry.of('lightmanscurrency:coin_emerald').setCount([1, 2]))

})
