// LootJS wiring: Orb Forge input drops, MnS-flavored structure chest loot,
// and MC Dungeons Weapons loot removal.
// WS6 API audit (LootJS 2.13.1, verified against the jar):
//   - event method is addLootTableModifier (addTableModifier is LootJS 3.x)
//   - dimension condition is anyDimension (matchDimension does not exist)
//   - LootEntry has no setCount in 2.x; count ranges use addWeightedLoot(rolls, entries)
// Loot-table ids verified against mod jars: undergarden entities (incl.
// forgotten_guardian), blue_skies bosses (summoner/starlit_crusher/alchemist/
// arachnarch), cataclysm bosses, dungeon_realm:dungeon / the_harvest:harvest /
// ancient_obelisks:obelisk dimensions.
// NOTE: mods/blue-skies.pw.toml pointed at the wrong CurseForge project (a
// modpack zip, not the mod) — corrected by WS6; the blue_skies rules below
// are dead until the real mod jar ships.

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
    event.addLootTableModifier(/undergarden:entities\/.*/)
        .randomChance(0.15)
        .addLoot('kubejs:undergarden_reagent')

    // Undergarden Boss Drop — Forgotten Guardian (guaranteed)
    event.addLootTableModifier(/undergarden:entities\/forgotten_guardian/)
        .addLoot('kubejs:undergarden_boss_drop')

    // Blue Skies trophies — Everbright bosses / Everdawn bosses (guaranteed)
    event.addLootTableModifier(/blue_skies:entities\/(summoner|starlit_crusher)/)
        .addLoot('kubejs:everbright_trophy')
    event.addLootTableModifier(/blue_skies:entities\/(alchemist|arachnarch)/)
        .addLoot('kubejs:everdawn_trophy')

    // Hidden Chest Relic — 3% in any structure chest
    event.addLootTypeModifier(LootType.CHEST)
        .randomChance(0.03)
        .addLoot('kubejs:hidden_chest_relic')

    // Map Boss Drop — kills inside Dungeon Realm maps (3%)
    event.addLootTypeModifier(LootType.ENTITY)
        .anyDimension('dungeon_realm:dungeon')
        .randomChance(0.03)
        .addLoot('kubejs:map_boss_drop')

    // Map Completion Token — kills in The Harvest / Ancient Obelisks (3%)
    event.addLootTypeModifier(LootType.ENTITY)
        .anyDimension('the_harvest:harvest')
        .randomChance(0.03)
        .addLoot('kubejs:map_completion_token')
    event.addLootTypeModifier(LootType.ENTITY)
        .anyDimension('ancient_obelisks:obelisk')
        .randomChance(0.03)
        .addLoot('kubejs:map_completion_token')

    // Endgame Boss Token — L_Ender's Cataclysm bosses (guaranteed)
    event.addLootTableModifier(/cataclysm:entities\/(ignis|netherite_monstrosity|ender_guardian|the_harbinger|the_leviathan|ancient_remnant)/)
        .addLoot('kubejs:endgame_boss_token')

    // ---------- Structure chest sweetening (MnS economy) ----------
    // C2E2 injects salvage stones/orbs/runes; exact mmorpg: item ids need JEI
    // confirmation — until then, coins keep structure chests worth opening.

    // Vanilla-ish early structures: iron coins
    event.addLootTableModifier(/minecraft:chests\/(simple_dungeon|abandoned_mineshaft|desert_pyramid|jungle_temple|stronghold_corridor|stronghold_crossing)/)
        .randomChance(0.6)
        .addWeightedLoot([2, 8], [LootEntry.of('lightmanscurrency:coin_iron')])

    // YUNG's structures + When Dungeons Arise + Dungeon Crawl: gold coins
    event.addLootTableModifier(/(betterdungeons|betterdeserttemples|betterjungletemples|betteroceanmonuments|betterstrongholds|betterfortresses|dungeons_arise|dungeoncrawl):chests\/.*/)
        .randomChance(0.5)
        .addWeightedLoot([1, 4], [LootEntry.of('lightmanscurrency:coin_gold')])

    // Dimension mod structures: emerald coins
    event.addLootTableModifier(/(blue_skies|undergarden|aether|twilightforest|deeperdarker):chests\/.*/)
        .randomChance(0.4)
        .addWeightedLoot([1, 2], [LootEntry.of('lightmanscurrency:coin_emerald')])

    // ==================================================================
    // WS2 — TACZ themed guns are DROP-ONLY (see tacz_gating.js).
    // Themed-pack guns (destiny / zeta / warhammer / fakelorant) never
    // appear in generic structure chests — boss kills and MnS map
    // dimensions only.
    // VERIFY IN-GAME: bosses_of_mass_destruction gauntlet/obsidilith drops
    // (their jar ships no entity loot tables — entity modifiers may need a
    // datapack table to attach to).
    // ==================================================================

    const themedGun = id => Item.of('tacz:modern_kinetic_gun', `{GunId:"${id}"}`)

    // ---- Cataclysm endgame bosses: signature themed guns ----

    // Ignis (Cursed Citadel) — Warhammer 40k armory
    event.addLootTableModifier(/cataclysm:entities\/ignis/)
        .randomChance(0.25)
        .addLoot(themedGun('warhammer:locke'))
    event.addLootTableModifier(/cataclysm:entities\/ignis/)
        .randomChance(0.20)
        .addLoot(themedGun('warhammer:artemia_iii'))
    event.addLootTableModifier(/cataclysm:entities\/ignis/)
        .randomChance(0.20)
        .addLoot(themedGun('warhammer:kantrael_xii'))
    event.addLootTableModifier(/cataclysm:entities\/ignis/)
        .randomChance(0.10)
        .addLoot(themedGun('warhammer:force_staff_ii'))

    // The Harbinger (Ruined Factory) — Helldivers (zeta) arsenal
    event.addLootTableModifier(/cataclysm:entities\/the_harbinger/)
        .randomChance(0.25)
        .addLoot(themedGun('zeta:las98'))
    event.addLootTableModifier(/cataclysm:entities\/the_harbinger/)
        .randomChance(0.20)
        .addLoot(themedGun('zeta:mgx42'))
    event.addLootTableModifier(/cataclysm:entities\/the_harbinger/)
        .randomChance(0.15)
        .addLoot(themedGun('zeta:railgun'))
    event.addLootTableModifier(/cataclysm:entities\/the_harbinger/)
        .randomChance(0.10)
        .addLoot(themedGun('zeta:quasar'))

    // Ender Guardian (Ruined Citadel, the End) — Destiny exotics
    event.addLootTableModifier(/cataclysm:entities\/ender_guardian/)
        .randomChance(0.25)
        .addLoot(themedGun('destiny:thorn'))
    event.addLootTableModifier(/cataclysm:entities\/ender_guardian/)
        .randomChance(0.20)
        .addLoot(themedGun('destiny:ice_breaker'))
    event.addLootTableModifier(/cataclysm:entities\/ender_guardian/)
        .randomChance(0.12)
        .addLoot(themedGun('destiny:sleeper_simulant'))

    // The Leviathan (Sunken City) — premium heavy pool
    event.addLootTableModifier(/cataclysm:entities\/the_leviathan/)
        .randomChance(0.25)
        .addLoot(themedGun('destiny:gjallarhorn'))
    event.addLootTableModifier(/cataclysm:entities\/the_leviathan/)
        .randomChance(0.20)
        .addLoot(themedGun('zeta:quasar'))

    // ---- Bosses of Mass Destruction: Fakelorant sidearm trophies ----
    event.addEntityLootModifier('bosses_of_mass_destruction:void_blossom')
        .killedByPlayer()
        .randomChance(0.30)
        .addLoot(themedGun('fakelorant:sheriff'))
    event.addEntityLootModifier('bosses_of_mass_destruction:gauntlet')
        .killedByPlayer()
        .randomChance(0.30)
        .addLoot(themedGun('fakelorant:operator'))
    event.addEntityLootModifier('bosses_of_mass_destruction:lich')
        .killedByPlayer()
        .randomChance(0.30)
        .addLoot(themedGun('fakelorant:phantom'))
    event.addEntityLootModifier('bosses_of_mass_destruction:obsidilith')
        .killedByPlayer()
        .randomChance(0.30)
        .addLoot(themedGun('fakelorant:vandal'))

    // ---- MnS Atlas maps: rare themed-gun kills inside map dimensions ----
    // The mmorpg jar exposes no chest/boss loot table safe to override
    // (only salvage-recipe tables), so Atlas gun drops ride the same
    // dimension-scoped LootJS path as map_boss_drop above.
    const MAP_DIMENSIONS = ['dungeon_realm:dungeon', 'the_harvest:harvest', 'ancient_obelisks:obelisk']
    const MAP_GUN_POOL = [
        'destiny:thorn',
        'destiny:ice_breaker',
        'zeta:las98',
        'zeta:mgx42',
        'warhammer:kantrael_xii',
        'warhammer:artemia_iii',
        'fakelorant:vandal',
        'fakelorant:phantom'
    ]
    MAP_DIMENSIONS.forEach(dim => {
        MAP_GUN_POOL.forEach(gunId => {
            event.addLootTypeModifier(LootType.ENTITY)
                .anyDimension(dim)
                .randomChance(0.001)
                .addLoot(themedGun(gunId))
        })
    })

    // ================== end WS2 TACZ gun drops ==================

    // ================== WS3: compressed iron late-gating ==================
    // Playtest 2: pneumaticcraft:ingot_iron_compressed shows up in loot
    // chests far too early (PNC:R injects it into vanilla/structure chest
    // tables when enable_dungeon_loot is on). Strip it from ALL chest-type
    // loot tables; the intended acquisition stays the PneumaticCraft
    // explosion-crafting route at the proper progression point.
    // Note: the pre-existing forge loot modifier in
    // kubejs/data/kubejs/forge/loot_modifiers/remove_compressed_iron.json
    // targeted the wrong id ("compressed_iron_ingot") and was a no-op; it
    // has been corrected as well.
    event.addLootTypeModifier(LootType.CHEST)
        .removeLoot('pneumaticcraft:ingot_iron_compressed')
    // Also catch the compressed iron block, in case any table rolls it.
    event.addLootTypeModifier(LootType.CHEST)
        .removeLoot('pneumaticcraft:compressed_iron_block')
    // ================== end WS3 compressed iron late-gating ==================

    // ================== WS6: loot source audit ==================
    // No new drops added here. WS6 corrected the LootJS 2.13.1 API calls
    // file-wide (addTableModifier -> addLootTableModifier, matchDimension ->
    // anyDimension, setCount -> addWeightedLoot rolls) so every modifier in
    // this file actually registers; see the file header for verification
    // notes. kubejs:endgame_boss_token gains a second, repeatable source via
    // the Convergence Gateway (kubejs/data/gateways/gateways/
    // supremacy_endgame.json) — that reward is wired in the gateway JSON,
    // not in LootJS.
    // ================== end WS6 ==================

})
