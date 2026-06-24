StartupEvents.registry('item', event => {

    // === ORB FORGE SYSTEM — Custom Gate Ingredients ===
    // Items here do NOT exist in Mine & Slash, GregTech, Blue Skies, or The Undergarden.
    // They are invented "bridge" ingredients that tie combat content to a specific location or boss.
    // Textures go in: kubejs/assets/kubejs/textures/item/orb_forge/

    // --- Tier MV→HV: Nether-Exclusive Reagent ---
    event.create('blaze_touched_residue')
        .displayName('Blaze-Touched Residue')
        .texture('kubejs:item/orb_forge/blaze_touched_residue')

    // --- Tier MV→HV: Undergarden-Exclusive Reagents ---
    event.create('undergarden_reagent')
        .displayName('Undergarden Reagent')
        .texture('kubejs:item/orb_forge/undergarden_reagent')

    // Named Undergarden miniboss drop (Grottol / Forgotten — confirm which boss is gating Chaos Orb)
    event.create('undergarden_boss_drop')
        .displayName('Undergarden Boss Trophy')
        .texture('kubejs:item/orb_forge/undergarden_boss_drop')

    // --- Tier EV→IV: Everbright / Everdawn Trophies (Blue Skies bosses) ---
    event.create('everbright_trophy')
        .displayName('Everbright Miniboss Trophy')
        .texture('kubejs:item/orb_forge/everbright_trophy')

    event.create('everdawn_trophy')
        .displayName('Everdawn Miniboss Trophy')
        .texture('kubejs:item/orb_forge/everdawn_trophy')

    // Hidden-chest-only relic for Orb of Revelation (EV→IV tier)
    event.create('hidden_chest_relic')
        .displayName('Hidden Chest Relic')
        .texture('kubejs:item/orb_forge/hidden_chest_relic')

    // --- Tier LuV→ZPM: Map Progression Token ---
    // Dropped on clearing an Act V Mine & Slash map — implement via loot table injection
    event.create('map_completion_token')
        .displayName('Map Completion Token')
        .texture('kubejs:item/orb_forge/map_completion_token')

    // --- Tier UV→UHV: Map Boss Drop (consumed as Fusion Reactor seed) ---
    event.create('map_boss_drop')
        .displayName('Map Boss Trophy')
        .texture('kubejs:item/orb_forge/map_boss_drop')

    // --- Tier UEV→UIV: Repeatable Endgame Boss Token ---
    // Intentionally repeatable — not a one-time unique, so it survives boss reworks
    event.create('endgame_boss_token')
        .displayName('Endgame Boss Token')
        .texture('kubejs:item/orb_forge/endgame_boss_token')

})
