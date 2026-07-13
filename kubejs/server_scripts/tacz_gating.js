// TACZ gun gating — guns are THE late-game weapon of Supremacy.
//
// Design:
//   * The Gun Smith Table itself is terrasteel-gated in gtceu_progression_gates.js
//     (do NOT touch that recipe here).
//   * Themed gun packs (Destiny, Helldivers/zeta, Warhammer 40k, Fakelorant) are
//     DROP-ONLY: every recipe in their namespaces is removed, which also removes
//     their vanilla-type workbench recipes (e.g. destiny:destiny_workbench) —
//     intended. Their guns come from endgame boss kills (see loot_drops.js).
//     A fallback recipe_filters pack lives at tacz/supremacy_gunpack/ in case a
//     pack update sneaks recipes past the RecipeManager.
//   * All 53 default TACZ gun recipes are removed and re-added with GTCEu
//     materials, tiered by weapon class:
//       HV  — pistols, revolvers, shotguns          (stainless steel)
//       EV  — SMGs, assault rifles, carbines        (titanium)
//       IV  — DMRs, battle rifles, bolt rifles      (tungsten steel)
//       LuV — LMGs                                  (tungsten steel + LuV parts)
//       ZPM — sniper rifles, launchers, minigun     (naquadah alloy)
//   * Ammo stays craftable but steps up one material: copper -> any brass
//     (Create or GT brass both work via forge:ingots/brass), iron casings on
//     explosives -> steel. Output counts unchanged — ammo must stay cheap enough
//     to mass-produce or the late-game gun fantasy dies.
//   * Attachments: untouched.
//
// VERIFY IN-GAME: default-pack recipe ids ("tacz:ak47" vs "tacz:gun/ak47" — both
// forms are removed defensively) and the gtceu component ids flagged in
// tasks/reports/02_report.md.

// Ingredient helper: '#'-prefixed ids become tag ingredients.
const taczMat = (id, count) => ({
	item: id.startsWith('#') ? { tag: id.substring(1) } : { item: id },
	count: count
})

// ---------------------------------------------------------------------------
// Default gun recipes, re-tiered. Key = gun id, value = GT material list.
// ---------------------------------------------------------------------------
const TACZ_GUN_RECIPES = {
	// ---- HV — pistols (stainless steel) ----
	'tacz:glock_17': [taczMat('gtceu:stainless_steel_plate', 6), taczMat('gtceu:hv_electric_motor', 1), taczMat('gtceu:stainless_steel_screw', 4), taczMat('#forge:ingots/iron', 4)],
	'tacz:m9a4': [taczMat('gtceu:stainless_steel_plate', 6), taczMat('gtceu:hv_electric_motor', 1), taczMat('gtceu:stainless_steel_screw', 4), taczMat('#forge:ingots/iron', 4)],
	'tacz:cz75': [taczMat('gtceu:stainless_steel_plate', 6), taczMat('gtceu:hv_electric_motor', 1), taczMat('gtceu:stainless_steel_screw', 4), taczMat('#forge:ingots/iron', 4)],
	'tacz:m1911': [taczMat('gtceu:stainless_steel_plate', 6), taczMat('gtceu:hv_electric_motor', 1), taczMat('gtceu:stainless_steel_screw', 4), taczMat('#minecraft:logs', 4)],
	'tacz:b93r': [taczMat('gtceu:stainless_steel_plate', 7), taczMat('gtceu:hv_electric_motor', 1), taczMat('gtceu:stainless_steel_screw', 4), taczMat('#minecraft:logs', 4), taczMat('#forge:gems/lapis', 2)],
	'tacz:p320': [taczMat('gtceu:stainless_steel_plate', 8), taczMat('gtceu:hv_electric_motor', 1), taczMat('gtceu:stainless_steel_screw', 4), taczMat('#forge:ingots/gold', 4), taczMat('#forge:gems/lapis', 2)],
	'tacz:hk_mk23': [taczMat('gtceu:stainless_steel_plate', 9), taczMat('gtceu:hv_electric_motor', 1), taczMat('gtceu:stainless_steel_screw', 4), taczMat('#forge:ingots/gold', 4), taczMat('#forge:gems/lapis', 2)],
	'tacz:deagle': [taczMat('gtceu:stainless_steel_plate', 10), taczMat('gtceu:hv_electric_motor', 1), taczMat('gtceu:stainless_steel_screw', 4), taczMat('#forge:ingots/gold', 6), taczMat('#forge:gems/diamond', 2)],
	'tacz:deagle_golden': [taczMat('gtceu:stainless_steel_plate', 6), taczMat('gtceu:hv_electric_motor', 1), taczMat('gtceu:stainless_steel_screw', 4), taczMat('#forge:ingots/gold', 24), taczMat('#forge:gems/diamond', 1)],
	// ---- HV — revolvers / lever guns ----
	'tacz:rhino357': [taczMat('gtceu:stainless_steel_plate', 8), taczMat('gtceu:hv_electric_motor', 1), taczMat('gtceu:stainless_steel_screw', 4), taczMat('#minecraft:logs', 4), taczMat('#forge:ingots/gold', 4)],
	'tacz:taurus500': [taczMat('gtceu:stainless_steel_plate', 14), taczMat('gtceu:hv_electric_motor', 1), taczMat('gtceu:stainless_steel_screw', 6), taczMat('#forge:ingots/gold', 16), taczMat('#forge:gems/diamond', 4)],
	'tacz:lonetrail': [taczMat('gtceu:stainless_steel_plate', 10), taczMat('gtceu:hv_electric_motor', 1), taczMat('gtceu:stainless_steel_screw', 4), taczMat('#forge:ingots/gold', 4), taczMat('#forge:gems/lapis', 8)],
	'tacz:springfield1873': [taczMat('gtceu:stainless_steel_plate', 4), taczMat('gtceu:hv_electric_motor', 1), taczMat('gtceu:stainless_steel_screw', 2), taczMat('#minecraft:logs', 8)],
	// ---- HV — shotguns ----
	'tacz:db_short': [taczMat('gtceu:stainless_steel_plate', 5), taczMat('gtceu:hv_electric_motor', 1), taczMat('gtceu:stainless_steel_screw', 2), taczMat('#minecraft:logs', 6)],
	'tacz:db_long': [taczMat('gtceu:stainless_steel_plate', 6), taczMat('gtceu:hv_electric_motor', 1), taczMat('gtceu:stainless_steel_screw', 2), taczMat('#minecraft:logs', 8)],
	'tacz:m870': [taczMat('gtceu:stainless_steel_plate', 8), taczMat('gtceu:hv_electric_motor', 1), taczMat('gtceu:stainless_steel_screw', 4), taczMat('#minecraft:logs', 8)],
	'tacz:m1014': [taczMat('gtceu:stainless_steel_plate', 12), taczMat('gtceu:hv_electric_motor', 1), taczMat('gtceu:stainless_steel_screw', 6), taczMat('#forge:ingots/gold', 6), taczMat('#forge:gems/diamond', 1)],
	'tacz:spas_12': [taczMat('gtceu:stainless_steel_plate', 16), taczMat('gtceu:hv_electric_motor', 1), taczMat('gtceu:stainless_steel_screw', 6), taczMat('#forge:ingots/gold', 8), taczMat('#forge:gems/diamond', 2)],
	'tacz:aa12': [taczMat('gtceu:stainless_steel_plate', 16), taczMat('gtceu:hv_electric_motor', 2), taczMat('gtceu:stainless_steel_screw', 6), taczMat('#forge:ingots/gold', 8), taczMat('#forge:gems/diamond', 2)],
	// ---- EV — SMGs (titanium) ----
	'tacz:uzi': [taczMat('gtceu:titanium_plate', 8), taczMat('gtceu:ev_electric_motor', 1), taczMat('gtceu:ev_voltage_coil', 1), taczMat('gtceu:titanium_screw', 4), taczMat('#forge:ingots/iron', 8)],
	'tacz:hk_mp5a5': [taczMat('gtceu:titanium_plate', 9), taczMat('gtceu:ev_electric_motor', 1), taczMat('gtceu:ev_voltage_coil', 1), taczMat('gtceu:titanium_screw', 4), taczMat('#forge:ingots/iron', 8)],
	'tacz:ump45': [taczMat('gtceu:titanium_plate', 10), taczMat('gtceu:ev_electric_motor', 1), taczMat('gtceu:ev_voltage_coil', 1), taczMat('gtceu:titanium_screw', 4), taczMat('#forge:ingots/iron', 12)],
	'tacz:vector45': [taczMat('gtceu:titanium_plate', 12), taczMat('gtceu:ev_electric_motor', 1), taczMat('gtceu:ev_voltage_coil', 2), taczMat('gtceu:titanium_screw', 6), taczMat('#forge:gems/diamond', 4)],
	'tacz:p90': [taczMat('gtceu:titanium_plate', 12), taczMat('gtceu:ev_electric_motor', 1), taczMat('gtceu:ev_voltage_coil', 2), taczMat('gtceu:titanium_screw', 6), taczMat('#forge:gems/diamond', 2)],
	// ---- EV — assault rifles / carbines ----
	'tacz:ak47': [taczMat('gtceu:titanium_plate', 10), taczMat('gtceu:ev_electric_motor', 1), taczMat('gtceu:ev_voltage_coil', 1), taczMat('gtceu:titanium_screw', 4), taczMat('#minecraft:logs', 8)],
	'tacz:m4a1': [taczMat('gtceu:titanium_plate', 10), taczMat('gtceu:ev_electric_motor', 1), taczMat('gtceu:ev_voltage_coil', 1), taczMat('gtceu:titanium_screw', 4), taczMat('#minecraft:logs', 6)],
	'tacz:m16a1': [taczMat('gtceu:titanium_plate', 9), taczMat('gtceu:ev_electric_motor', 1), taczMat('gtceu:ev_voltage_coil', 1), taczMat('gtceu:titanium_screw', 4), taczMat('#minecraft:logs', 6)],
	'tacz:m16a4': [taczMat('gtceu:titanium_plate', 10), taczMat('gtceu:ev_electric_motor', 1), taczMat('gtceu:ev_voltage_coil', 1), taczMat('gtceu:titanium_screw', 4), taczMat('#minecraft:logs', 6)],
	'tacz:aug': [taczMat('gtceu:titanium_plate', 10), taczMat('gtceu:ev_electric_motor', 1), taczMat('gtceu:ev_voltage_coil', 1), taczMat('gtceu:titanium_screw', 4), taczMat('#forge:gems/amethyst', 1)],
	'tacz:g36k': [taczMat('gtceu:titanium_plate', 12), taczMat('gtceu:ev_electric_motor', 1), taczMat('gtceu:ev_voltage_coil', 1), taczMat('gtceu:titanium_screw', 6), taczMat('#forge:gems/quartz', 8)],
	'tacz:hk416d': [taczMat('gtceu:titanium_plate', 12), taczMat('gtceu:ev_electric_motor', 1), taczMat('gtceu:ev_voltage_coil', 1), taczMat('gtceu:titanium_screw', 6), taczMat('#forge:gems/quartz', 8)],
	'tacz:qbz_95': [taczMat('gtceu:titanium_plate', 10), taczMat('gtceu:ev_electric_motor', 1), taczMat('gtceu:ev_voltage_coil', 1), taczMat('gtceu:titanium_screw', 4), taczMat('#minecraft:logs', 6)],
	'tacz:qbz_191': [taczMat('gtceu:titanium_plate', 12), taczMat('gtceu:ev_electric_motor', 1), taczMat('gtceu:ev_voltage_coil', 2), taczMat('gtceu:titanium_screw', 6), taczMat('#forge:gems/quartz', 8)],
	'tacz:type_81': [taczMat('gtceu:titanium_plate', 9), taczMat('gtceu:ev_electric_motor', 1), taczMat('gtceu:ev_voltage_coil', 1), taczMat('gtceu:titanium_screw', 4), taczMat('#minecraft:logs', 8)],
	'tacz:scar_l': [taczMat('gtceu:titanium_plate', 11), taczMat('gtceu:ev_electric_motor', 1), taczMat('gtceu:ev_voltage_coil', 1), taczMat('gtceu:titanium_screw', 4), taczMat('#forge:gems/quartz', 3)],
	'tacz:sks_tactical': [taczMat('gtceu:titanium_plate', 10), taczMat('gtceu:ev_electric_motor', 1), taczMat('gtceu:ev_voltage_coil', 1), taczMat('gtceu:titanium_screw', 4), taczMat('#minecraft:logs', 10)],
	// ---- IV — battle rifles / DMRs / bolt rifles (tungsten steel) ----
	'tacz:fn_fal': [taczMat('gtceu:tungsten_steel_plate', 10), taczMat('gtceu:iv_electric_motor', 1), taczMat('gtceu:iv_emitter', 1), taczMat('gtceu:tungsten_steel_screw', 4), taczMat('#minecraft:logs', 12)],
	'tacz:hk_g3': [taczMat('gtceu:tungsten_steel_plate', 11), taczMat('gtceu:iv_electric_motor', 1), taczMat('gtceu:iv_emitter', 1), taczMat('gtceu:tungsten_steel_screw', 4), taczMat('#forge:gems/quartz', 5)],
	'tacz:scar_h': [taczMat('gtceu:tungsten_steel_plate', 12), taczMat('gtceu:iv_electric_motor', 1), taczMat('gtceu:iv_emitter', 1), taczMat('gtceu:tungsten_steel_screw', 6), taczMat('#forge:gems/diamond', 2)],
	'tacz:mk14': [taczMat('gtceu:tungsten_steel_plate', 12), taczMat('gtceu:iv_electric_motor', 1), taczMat('gtceu:iv_emitter', 1), taczMat('gtceu:tungsten_steel_screw', 6), taczMat('#forge:gems/diamond', 4)],
	'tacz:spr15hb': [taczMat('gtceu:tungsten_steel_plate', 11), taczMat('gtceu:iv_electric_motor', 1), taczMat('gtceu:iv_emitter', 1), taczMat('gtceu:tungsten_steel_screw', 6), taczMat('#forge:gems/diamond', 2)],
	'tacz:timeless50': [taczMat('gtceu:tungsten_steel_plate', 10), taczMat('gtceu:iv_electric_motor', 1), taczMat('gtceu:iv_emitter', 1), taczMat('gtceu:tungsten_steel_screw', 4), taczMat('#forge:ingots/gold', 6)],
	'tacz:kar98': [taczMat('gtceu:tungsten_steel_plate', 8), taczMat('gtceu:iv_electric_motor', 1), taczMat('gtceu:iv_emitter', 1), taczMat('gtceu:tungsten_steel_screw', 4), taczMat('#minecraft:logs', 24)],
	'tacz:m700': [taczMat('gtceu:tungsten_steel_plate', 10), taczMat('gtceu:iv_electric_motor', 1), taczMat('gtceu:iv_emitter', 1), taczMat('gtceu:tungsten_steel_screw', 4), taczMat('#forge:gems/diamond', 1)],
	// ---- LuV — LMGs (tungsten steel + LuV parts) ----
	'tacz:rpk': [taczMat('gtceu:tungsten_steel_plate', 14), taczMat('gtceu:luv_electric_motor', 1), taczMat('gtceu:luv_emitter', 1), taczMat('gtceu:tungsten_steel_screw', 6), taczMat('#minecraft:logs', 10)],
	'tacz:m249': [taczMat('gtceu:tungsten_steel_plate', 18), taczMat('gtceu:luv_electric_motor', 1), taczMat('gtceu:luv_emitter', 1), taczMat('gtceu:tungsten_steel_screw', 8), taczMat('#forge:gems/diamond', 4)],
	'tacz:fn_evolys': [taczMat('gtceu:tungsten_steel_plate', 20), taczMat('gtceu:luv_electric_motor', 1), taczMat('gtceu:luv_emitter', 1), taczMat('gtceu:tungsten_steel_screw', 8), taczMat('#forge:gems/diamond', 6)],
	// ---- ZPM — sniper rifles / launchers / minigun (naquadah alloy) ----
	'tacz:ai_awp': [taczMat('gtceu:naquadah_alloy_plate', 12), taczMat('gtceu:zpm_electric_motor', 1), taczMat('gtceu:zpm_field_generator', 1), taczMat('#forge:gems/diamond', 8), taczMat('#forge:ingots/gold', 16)],
	'tacz:m95': [taczMat('gtceu:naquadah_alloy_plate', 14), taczMat('gtceu:zpm_electric_motor', 1), taczMat('gtceu:zpm_field_generator', 1), taczMat('#forge:ingots/netherite', 2), taczMat('#forge:gems/diamond', 8)],
	'tacz:m107': [taczMat('gtceu:naquadah_alloy_plate', 16), taczMat('gtceu:zpm_electric_motor', 1), taczMat('gtceu:zpm_field_generator', 1), taczMat('#forge:ingots/netherite', 2), taczMat('#forge:gems/diamond', 8)],
	'tacz:minigun': [taczMat('gtceu:naquadah_alloy_plate', 24), taczMat('gtceu:zpm_electric_motor', 2), taczMat('gtceu:zpm_field_generator', 2), taczMat('#forge:ingots/netherite', 4), taczMat('#forge:gems/diamond', 12)],
	'tacz:rpg7': [taczMat('gtceu:naquadah_alloy_plate', 10), taczMat('gtceu:zpm_electric_motor', 1), taczMat('gtceu:zpm_field_generator', 1), taczMat('#minecraft:logs', 8), taczMat('#forge:ingots/gold', 8)],
	'tacz:m320': [taczMat('gtceu:naquadah_alloy_plate', 8), taczMat('gtceu:zpm_electric_motor', 1), taczMat('gtceu:zpm_field_generator', 1), taczMat('#forge:ingots/gold', 8)]
}

// ---------------------------------------------------------------------------
// Default ammo recipes, GT-ified one step: copper -> brass (Create or GT),
// iron casing stock on explosives -> steel. Counts identical to the default
// pack so ammo economics don't change.
// ---------------------------------------------------------------------------
const TACZ_AMMO_RECIPES = {
	'tacz:9mm': { group: 'pd_cartridges', count: 50, materials: [taczMat('#forge:ingots/brass', 10), taczMat('#forge:gunpowder', 2)] },
	'tacz:45acp': { group: 'pd_cartridges', count: 30, materials: [taczMat('#forge:ingots/brass', 10), taczMat('#forge:gunpowder', 2)] },
	'tacz:46x30': { group: 'pd_cartridges', count: 48, materials: [taczMat('#forge:ingots/brass', 12), taczMat('#forge:gunpowder', 2)] },
	'tacz:57x28': { group: 'pd_cartridges', count: 48, materials: [taczMat('#forge:ingots/brass', 15), taczMat('#forge:gems/lapis', 5), taczMat('#forge:gunpowder', 2)] },
	'tacz:762x25': { group: 'pd_cartridges', count: 45, materials: [taczMat('#forge:ingots/brass', 10), taczMat('#forge:gunpowder', 2)] },
	'tacz:22wmr': { group: 'pd_cartridges', count: 100, materials: [taczMat('#forge:ingots/brass', 10), taczMat('#forge:gunpowder', 2)] },
	'tacz:308': { group: 'ifp_rifle_cartridges', count: 60, materials: [taczMat('#forge:ingots/brass', 30), taczMat('#forge:gunpowder', 10), taczMat('#forge:gems/lapis', 1)] },
	'tacz:545x39': { group: 'ifp_rifle_cartridges', count: 45, materials: [taczMat('#forge:ingots/brass', 13), taczMat('#forge:gunpowder', 3)] },
	'tacz:556x45': { group: 'ifp_rifle_cartridges', count: 45, materials: [taczMat('#forge:ingots/brass', 15), taczMat('#forge:gunpowder', 3)] },
	'tacz:58x42': { group: 'ifp_rifle_cartridges', count: 40, materials: [taczMat('#forge:ingots/brass', 15), taczMat('#forge:gunpowder', 3)] },
	'tacz:68x51fury': { group: 'ifp_rifle_cartridges', count: 40, materials: [taczMat('#forge:ingots/brass', 15), taczMat('#forge:gunpowder', 5)] },
	'tacz:762x39': { group: 'ifp_rifle_cartridges', count: 35, materials: [taczMat('#forge:ingots/brass', 15), taczMat('#forge:gunpowder', 3)] },
	'tacz:762x54': { group: 'ifp_rifle_cartridges', count: 60, materials: [taczMat('#forge:ingots/brass', 25), taczMat('#forge:gunpowder', 8)] },
	'tacz:792x57': { group: 'ifp_rifle_cartridges', count: 48, materials: [taczMat('#forge:ingots/brass', 20), taczMat('#forge:gunpowder', 6)] },
	'tacz:30_06': { group: 'lc_specialized', count: 32, materials: [taczMat('#forge:ingots/brass', 20), taczMat('#forge:gunpowder', 6)] },
	'tacz:338': { group: 'lc_specialized', count: 18, materials: [taczMat('#forge:ingots/brass', 25), taczMat('#forge:gunpowder', 8), taczMat('#forge:gems/lapis', 4)] },
	'tacz:357mag': { group: 'lc_specialized', count: 48, materials: [taczMat('#forge:ingots/brass', 25), taczMat('#forge:gunpowder', 6)] },
	'tacz:45_70': { group: 'lc_specialized', count: 36, materials: [taczMat('#forge:ingots/brass', 30), taczMat('#forge:gunpowder', 7), taczMat('#forge:gems/lapis', 5)] },
	'tacz:500mag': { group: 'lc_specialized', count: 32, materials: [taczMat('#forge:ingots/brass', 40), taczMat('#forge:gunpowder', 10), taczMat('#forge:gems/lapis', 5)] },
	'tacz:50ae': { group: 'lc_specialized', count: 36, materials: [taczMat('#forge:ingots/brass', 30), taczMat('#forge:gunpowder', 7), taczMat('#forge:gems/lapis', 5)] },
	'tacz:50bmg': { group: 'lc_specialized', count: 24, materials: [taczMat('#forge:ingots/brass', 110), taczMat('#forge:gunpowder', 20), taczMat('#forge:gems/lapis', 12), taczMat('#forge:rods/blaze', 1)] },
	'tacz:12g': { group: 'shotgun_shells', count: 18, materials: [taczMat('#forge:ingots/brass', 15), taczMat('#forge:gunpowder', 6), taczMat('#forge:nuggets/iron', 18)] },
	'tacz:40mm': { group: 'explosives', count: 6, materials: [taczMat('#forge:ingots/steel', 3), taczMat('#forge:ingots/brass', 9), taczMat('#forge:gunpowder', 9)] },
	'tacz:rpg_rocket': { group: 'explosives', count: 3, materials: [taczMat('#forge:ingots/steel', 3), taczMat('#forge:ingots/brass', 30), taczMat('#forge:gunpowder', 12)] }
}

ServerEvents.recipes(event => {

	// 1. Themed gun packs are drop-only: remove every recipe in their
	//    namespaces (gun smith recipes AND their vanilla-type workbench
	//    recipes — the workbench blocks themselves become unobtainable,
	//    which is intended).
	event.remove({ id: /^(destiny|zeta|warhammer|fakelorant):.*/ })

	// 2 + 3. Remove each default gun recipe by id (both plausible id forms)
	//        and re-add it with GT-tier materials.
	Object.keys(TACZ_GUN_RECIPES).forEach(gunId => {
		const path = gunId.split(':')[1]
		event.remove({ id: gunId })
		event.remove({ id: `tacz:gun/${path}` })
		event.custom({
			type: 'tacz:gun_smith_table_crafting',
			materials: TACZ_GUN_RECIPES[gunId],
			result: { type: 'gun', id: gunId }
		})
	})

	// 4. Ammo: remove defaults, re-add with brass/steel inputs.
	Object.keys(TACZ_AMMO_RECIPES).forEach(ammoId => {
		const path = ammoId.split(':')[1]
		const ammo = TACZ_AMMO_RECIPES[ammoId]
		event.remove({ id: ammoId })
		event.remove({ id: `tacz:ammo/${path}` })
		event.custom({
			type: 'tacz:gun_smith_table_crafting',
			materials: ammo.materials,
			result: { type: 'ammo', group: ammo.group, id: ammoId, count: ammo.count }
		})
	})

	// Attachments untouched; tacz:gun_smith_table block recipe owned by
	// gtceu_progression_gates.js.

})
