ServerEvents.recipes(event => {

    event.shaped(
        'soulland:soul_forged_ingot',
        [
            'ACA',
            'BDB',
            'ACA'
        ],
        {
            A: 'kubejs:charged_qi_crystal',
            B: 'botania:manasteel_ingot',
            C: 'soulland:soul_crystal',
            D: 'kubejs:soul_rune'
        }
    )

    // ================== WS6: Convergence Gateway pearl ==================
    // Opener for the repeatable endgame Gateways wave fight defined in
    // kubejs/data/gateways/gateways/supremacy_endgame.json. The gate is the
    // renewable source of kubejs:endgame_boss_token (Orb Forge UEV/UIV input).
    // Pearl NBT verified against GatewaysToEternity-1.20.1-4.2.6
    // (GatePearlItem stores the gate id under the "gateway" string tag).
    // Ingredients require one clear of each endgame boss line first:
    // ancient_anima (BOMD), witherite (Cataclysm wither line), ignitium
    // (Ignis), charged ender pearl (Obsidilith).
    event.shaped(
        Item.of('gateways:gate_pearl', '{gateway:"gateways:supremacy_endgame"}'),
        [
            'AWA',
            'IPI',
            'AWA'
        ],
        {
            A: 'bosses_of_mass_destruction:ancient_anima',
            W: 'cataclysm:witherite_ingot',
            I: 'cataclysm:ignitium_ingot',
            P: 'bosses_of_mass_destruction:charged_ender_pearl'
        }
    )
    // ================== end WS6 ==================

})