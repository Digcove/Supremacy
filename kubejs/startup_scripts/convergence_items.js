StartupEvents.registry('item', event => {

    event.create('charged_qi_crystal')
        .displayName('Charged Qi Crystal')
        .texture('kubejs:item/charged_qi_crystal')
        .rarity('uncommon')
        .glow(true)

    event.create('soul_rune')
        .displayName('Blood-Forged Soul Rune')
        .texture('kubejs:item/soul_rune')
        .rarity('rare')
        .glow(true)

    event.create('living_circuit_board')
        .displayName('Living Circuit Board')
        .texture('kubejs:item/living_circuit_board')
        .rarity('uncommon')

    event.create('living_mana_core')
        .displayName('Living Mana Core')
        .texture('kubejs:item/living_mana_core')
        .rarity('rare')
        .glow(true)

    event.create('triune_catalyst')
        .displayName('Triune Catalyst')
        .texture('kubejs:item/triune_catalyst')
        .rarity('epic')
        .glow(true)
        .maxStackSize(16)

    event.create('blood_tempered_coil')
        .displayName('Blood-Tempered Coil')
        .texture('kubejs:item/blood_tempered_coil')
        .rarity('rare')
        .glow(true)

})