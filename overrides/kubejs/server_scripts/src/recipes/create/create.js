//Create mod related recipes.

ServerEvents.recipes((e) => {
	//redoing all create recipes from SCRATCH!
	e.remove({ mod: 'create' });

	//materials

	COPYCAT_BLOCKS.forEach((block) => {
		e.recipes.tfc
			.anvil('16x ' + block, 'tfc:metal/sheet/zinc', [
				'hit_last',
				'hit_second_last',
				'hit_third_last',
			])
			.tier(1);
	});

	e.shapeless('2x kubejs:unfired_andesite_alloy', [
		'2x #kubejs:metal_powders',
		'2x minecraft:clay_ball',
	]);

	e.recipes.tfc
		.heating('kubejs:unfired_andesite_alloy', 1080)
		.resultItem('create:andesite_alloy');

	e.recipes.tfc
		.anvil('create:brass_hand', 'tfc:metal/double_ingot/brass', [
			'punch_last',
			'bend_any',
			'draw_not_last',
		])
		.tier(2);

	e.recipes.tfc
		.anvil('create:propeller', 'tfc:metal/double_sheet/wrought_iron', [
			'draw_last',
			'punch_any',
			'draw_not_last',
		])
		.tier(3);

	e.recipes.tfc
		.anvil('create:whisk', 'tfc:metal/double_sheet/wrought_iron', [
			'bend_last',
			'draw_any',
			'bend_not_last',
		])
		.tier(3);

	e.shapeless('create:electron_tube', [
		'tfc:lamp_glass',
		'kubejs:chromium_wire',
		'tfc:metal/ingot/zinc',
	]);

	e.recipes.create
		.sequenced_assembly(
			[Item.of('create:precision_mechanism')],
			'tfc:metal/sheet/gold',
			[
				// 'create:golden_sheet' is the input
				// the transitional item set by `transitionalItem('create:incomplete_large_cogwheel')` is the item used during the intermediate stages of the assembly
				e.recipes.createDeploying(
					'create:incomplete_precision_mechanism',
					[
						'create:incomplete_precision_mechanism',
						'tfc:brass_mechanisms',
					]
				),
				// like a normal recipe function, is used as a sequence step in this array. Input and output have the transitional item
				e.recipes.createDeploying(
					'create:incomplete_precision_mechanism',
					[
						'create:incomplete_precision_mechanism',
						'tfc:brass_mechanisms',
					]
				),
				e.recipes.createDeploying(
					'create:incomplete_precision_mechanism',
					[
						'create:incomplete_precision_mechanism',
						'create:andesite_alloy',
					]
				),
			]
		)
		.transitionalItem('create:incomplete_precision_mechanism')
		.loops(2); // set the transitional item and the number of loops

	//kinetics

	e.shaped('8x create:shaft', ['S', 'S'], {
		S: 'create:andesite_alloy',
	});

	e.shapeless('create:cogwheel', [
		'create:shaft',
		'#minecraft:planks',
		'#tfc:saws',
	]).damageIngredient('#tfc:saws', 1);

	e.shapeless('create:large_cogwheel', [
		'create:shaft',
		'2x #minecraft:planks',
		'#tfc:saws',
	]).damageIngredient('#tfc:saws', 1);

	e.shaped('4x create:belt_connector', [' C ', 'CGC', ' C '], {
		C: 'afc:rubber_bar',
		G: 'tfc:glue',
	});

	e.shaped('3x create:andesite_casing', ['ARA', 'PPP', 'ARA'], {
		A: 'create:andesite_alloy',
		R: 'tfc:metal/rod/zinc',
		P: '#minecraft:planks',
	});

	e.shaped('create:gearbox', [' C ', 'CBC', ' C '], {
		C: 'create:cogwheel',
		B: '#minecraft:planks',
	});

	e.shapeless('create:vertical_gearbox', ['create:gearbox']);
	e.shapeless('create:gearbox', ['create:vertical_gearbox']);

	e.shapeless('create:clutch', [
		'create:andesite_casing',
		'create:shaft',
		'redstone',
	]);
	e.shapeless('create:gearshift', [
		'create:andesite_casing',
		'create:cogwheel',
		'redstone',
	]);

	e.shapeless('2x create:encased_chain_drive', [
		'4x #kubejs:chains',
		'create:andesite_casing',
	]);

	e.shapeless('create:adjustable_chain_gearshift', [
		'create:encased_chain_drive',
		'tfc:brass_mechanisms',
		'redstone',
	]);

	e.shaped('create:water_wheel', ['TWT', 'WCW', 'TWT'], {
		T: 'firmalife:treated_lumber',
		W: '#minecraft:planks',
		C: 'create:shaft',
	});

	e.shaped('create:large_water_wheel', ['TWT', 'WCW', 'TWT'], {
		T: 'firmalife:treated_lumber',
		W: '#minecraft:planks',
		C: 'create:water_wheel',
	});

	e.shaped('create:hand_crank', ['  A', 'LLL'], {
		A: 'create:andesite_alloy',
		L: '#tfc:lumber',
	});

	//i/o

	e.shaped('2x create:andesite_tunnel', [' A ', 'ALA'], {
		A: 'create:andesite_alloy',
		L: 'afc:rubber_bar',
	});

	e.shaped('2x create:andesite_funnel', ['A', 'L'], {
		A: 'create:andesite_alloy',
		L: 'afc:rubber_bar',
	});

	e.shaped('3x create:item_vault', [' S ', 'CCC', ' S '], {
		S: 'tfc:metal/sheet/steel',
		C: '#forge:chests/wooden',
	});

	e.shaped('create:portable_storage_interface', ['CSL'], {
		C: 'create:andesite_casing',
		S: 'create:chute',
		L: 'afc:rubber_bar',
	});

	e.shaped('create:basin', ['A A', 'AAA'], {
		A: 'create:andesite_alloy',
	});

	e.shapeless('create:depot', [
		'create:andesite_casing',
		'create:andesite_alloy',
	]);
	e.shapeless('create:weighted_ejector', [
		'create:depot',
		'create:cogwheel',
		'tfc:brass_mechanisms',
	]);

	e.shaped('8x create:chute', ['A', 'S', 'A'], {
		A: 'create:andesite_alloy',
		S: 'tfc:metal/sheet/cast_iron',
	});

	e.shapeless('create:smart_chute', [
		'create:chute',
		'tfc:brass_mechanisms',
		'create:electron_tube',
	]);

	//contraptions

	e.shaped('create:rope_pulley', ['C', 'R', 'S'], {
		C: 'create:andesite_casing',
		R: 'quark:rope',
		S: 'tfc:metal/sheet/cast_iron',
	});

	e.shaped('create:mechanical_bearing', ['LTL', 'SMS',], {
		T: 'create:turntable',
		L: '#tfc:lumber',
		S: 'create:andesite_alloy',
        M: 'create:shaft'
	});

	e.shaped('create:clockwork_bearing', ['T', 'M', 'S'], {
		T: 'create:turntable',
		M: 'tfc:brass_mechanisms',
		S: 'create:brass_casing',
	});

	e.shaped('create:windmill_bearing', ['STS', 'SMS'], {
		T: 'create:turntable',
		M: 'create:shaft',
		S: 'create:andesite_alloy',
	});

	e.shaped('create:mechanical_piston', ['LLL', 'CMC', 'AAA'], {
		L: '#tfc:lumber',
		C: 'create:cogwheel',
		M: 'tfc:brass_mechanisms',
		A: 'create:andesite_alloy',
	});
	e.shapeless('create:sticky_mechanical_piston', [
		'create:mechanical_piston',
		'tfc:glue',
	]);

	e.shaped('create:turntable', ['LLL', ' A '], {
		L: '#tfc:lumber',
		A: 'create:andesite_alloy',
	});

	e.shaped('4x create:white_sail', ['LSL', 'SCS', 'LSL'], {
		L: '#tfc:lumber',
		S: '#forge:rods/wooden',
		C: ['#tfc:high_quality_cloth', 'tfc:burlap_cloth'],
	});

	e.shapeless('create:sail_frame', ['create:white_sail']);
	e.shapeless('create:white_sail', ['create:sail_frame']);

	e.shaped('8x create:piston_extension_pole', ['L', 'A', 'L'], {
		L: '#tfc:lumber',
		A: 'create:andesite_alloy',
	});

	e.shaped('8x create:gantry_shaft', [' A ', 'RCR', ' A '], {
		A: 'create:andesite_alloy',
		R: 'redstone',
		C: 'tfc:metal/rod/copper',
	});

	e.shaped('create:gantry_carriage', [' A ', 'CMC'], {
		A: 'create:andesite_casing',
		C: 'create:cogwheel',
		M: 'tfc:brass_mechanisms',
	});

	e.shaped('create:cart_assembler', ['ASA', 'ARA'], {
		A: 'create:andesite_alloy',
		R: 'redstone',
		S: 'tfc:metal/sheet/cast_iron',
	});

	e.shaped('3x create:linear_chassis', [' A ', 'PPP', ' A '], {
		A: 'create:andesite_alloy',
		P: '#minecraft:planks',
	});

	e.shaped('3x create:radial_chassis', [' P ', 'APA', ' P '], {
		A: 'create:andesite_alloy',
		P: '#minecraft:planks',
	});

	e.shapeless('create:secondary_linear_chassis', ['create:linear_chassis']);
	e.shapeless('create:linear_chassis', ['create:secondary_linear_chassis']);

	e.shaped('create:contraption_controls', ['ABA', 'LRL'], {
		A: 'create:andesite_alloy',
		B: '#minecraft:stone_buttons',
		L: '#tfc:lumber',
		R: 'redstone',
	});

	e.shaped('create:sticker', ['GGG', 'ARA', 'CMC'], {
		G: 'tfc:glue',
		A: 'create:andesite_alloy',
		R: 'tfc:metal/rod/copper',
		C: '#forge:cobblestone',
		M: 'tfc:brass_mechanisms',
	});

	e.shaped('create:redstone_contact', ['AGA', 'ARA'], {
		A: 'create:andesite_alloy',
		G: 'tfc:metal/sheet/gold',
		R: 'redstone',
	});

	e.shapeless('create:deployer', [
		'create:andesite_casing',
		'create:brass_hand',
		'create:electron_tube',
	]);
	e.shaped('create:mechanical_plough', ['ACA', 'ASA'], {
		A: 'create:andesite_alloy',
		C: 'create:andesite_casing',
		S: 'tfc:metal/double_sheet/cast_iron',
	});

	//TODO: drill/saw blade items smithing?
	/*e.shaped('create:mechanical_drill', [' P ', 'SAS', ' C '], {
        P: '#tfc:gem_powders',
        S: 'tfc:metal/sheet/steel',
        A: 'create:andesite_alloy',
        C: 'create:andesite_casing',
    });

    e.shaped('create:mechanical_saw', [' S ', 'SAS', ' C '], {
        S: 'tfc:metal/sheet/wrought_iron',
        A: 'create:andesite_alloy',
        C: 'create:andesite_casing',
    });*/

	e.shapeless('create:mechanical_drill', [
		'create:andesite_casing',
		'thermal:drill_head',
	]);

	e.shapeless('create:mechanical_saw', [
		'create:andesite_casing',
		'thermal:saw_blade',
	]);

	e.shaped('create:mechanical_harvester', [' R ', 'RAR', ' C '], {
		R: 'tfc:metal/rod/wrought_iron',
		A: 'create:andesite_alloy',
		C: 'create:andesite_casing',
	});

	e.shapeless('create_connected:inverted_clutch', [
		'create:clutch',
		'redstone_torch',
	]);
	e.shapeless('create_connected:inverted_gearshift', [
		'create:gearshift',
		'redstone_torch',
	]);

	e.shaped('create:millstone', [' L ', 'SSS', 'RRR'], {
		L: '#tfc:lumber',
		S: '#tfc:rock/smooth',
		R: '#tfc:rock/raw',
	});

	e.recipes.create.mechanical_crafting(
		'2x create:crushing_wheel',
		[' AAA ', 'AALAA', 'ARSRA', 'AALAA', ' AAA '],
		{
			A: 'create:andesite_alloy',
			L: '#tfc:lumber',
			S: 'create:shaft',
			R: 'tfc:metal/rod/wrought_iron',
		}
	);

	e.shaped('create:flywheel', [' B ', 'RSR', ' B '], {
		B: 'tfc:metal/sheet/brass',
		R: 'tfc:metal/rod/brass',
		S: 'create:shaft',
	});

	e.shaped('create:mechanical_arm', ['SR', 'MR', 'C '], {
		S: 'tfc:metal/sheet/steel',
		R: 'tfc:metal/rod/brass',
		M: 'create:precision_mechanism',
		C: 'create:brass_casing',
	});

	e.shaped('create:nozzle', [' C ', 'AAA'], {
		A: 'create:andesite_alloy',
		C: '#tfc:high_quality_cloth',
	});

	e.shaped('4x create:brass_tunnel', [' E ', 'BLB'], {
		B: 'tfc:metal/sheet/brass',
		L: 'afc:rubber_bar',
		E: 'create:electron_tube',
	});

	e.shaped('2x create:brass_funnel', ['E', 'B', 'L'], {
		B: 'tfc:metal/sheet/brass',
		L: 'afc:rubber_bar',
		E: 'create:electron_tube',
	});

	e.shaped('create:mechanical_press', [' S ', 'RCR', ' D '], {
		S: 'create:shaft',
		R: 'tfc:metal/rod/cast_iron',
		C: 'create:andesite_casing',
		D: 'tfc:metal/double_sheet/wrought_iron',
	});

	e.shaped('create:mechanical_mixer', [' G ', 'RCR', ' W '], {
		G: 'create:cogwheel',
		C: 'create:andesite_casing',
		R: 'tfc:metal/rod/cast_iron',
		W: 'create:whisk',
	});

	e.shapeless('create:encased_fan', [
		'create:andesite_casing',
		'create:shaft',
		'create:propeller',
	]);

	e.shaped('16x create:controller_rail', ['RDR', 'RMR', 'RDR'], {
		R: 'tfc:metal/rod/gold',
		D: 'redstone',
		M: 'tfc:brass_mechanisms',
	});

	e.shapeless('create:speedometer', [
		'create:andesite_casing',
		'create:shaft',
		'tfc:metal/rod/cast_iron',
	]);
	e.shapeless('create:stressometer', ['create:speedometer']);
	e.shapeless('create:speedometer', ['create:stressometer']);

	e.recipes.tfc
		.anvil('16x create:metal_bracket', 'tfc:metal/double_ingot/cast_iron', [
			'upset_last',
			'draw_second_last',
			'punch_third_last',
		])
		.tier(3);

	e.recipes.tfc
		.anvil('8x create:metal_bracket', 'tfc:metal/ingot/cast_iron', [
			'upset_last',
			'draw_second_last',
			'punch_third_last',
		])
		.tier(3);

	e.shapeless('create:wooden_bracket', [
		'create:metal_bracket',
		'#tfc:lumber',
	]);

	e.shapeless('create:nixie_tube', ['2x create:electron_tube']);
	e.shapeless('2x create:electron_tube', ['create:nixie_tube']);

	e.shaped('3x create:mechanical_crafter', [' E ', 'PCP', ' T '], {
		E: 'create:electron_tube',
		P: 'create:precision_mechanism',
		C: 'create:brass_casing',
		T: '#tfc:workbenches',
	});

	e.shaped('create:display_link', [' G ', 'SCT'], {
		G: 'tfc:metal/sheet/gold',
		S: 'createaddition:copper_spool',
		C: 'create:brass_casing',
		T: 'create:electron_tube',
	});

	e.shaped('create:display_board', [' C ', 'ATA'], {
		C: 'create:cogwheel',
		A: 'create:andesite_alloy',
		T: 'create:nixie_tube',
	});

	e.shapeless('create:content_observer', [
		'observer',
		'create:precision_mechanism',
	]);

	e.shapeless('create:sequenced_gearshift', [
		'create:gearshift',
		'create:electron_tube',
		'create:brass_casing',
	]);

	e.shapeless('create:elevator_pulley', [
		'create:rope_pulley',
		'create:brass_casing',
		'create:electron_tube',
	]);

	e.shaped('create:stockpile_switch', [' T ', 'PCR'], {
		T: 'create:electron_tube',
		P: 'create:precision_mechanism',
		C: 'create:brass_casing',
		R: 'redstone',
	});

	e.shapeless('create:mechanical_roller', [
		'create:andesite_casing',
		'create:crushing_wheel',
		'tfc:metal/double_sheet/cast_iron',
	]);

	e.recipes.tfc
		.anvil('2x create:minecart_coupling', 'tfc:metal/rod/wrought_iron', [
			'punch_last',
			'punch_second_last',
			'draw_third_last',
		])
		.tier(3);

	e.shaped('create:super_glue', ['GG', 'RR'], {
		G: 'tfc:glue',
		R: 'tfc:metal/rod/wrought_iron',
	});

	e.recipes.tfc
		.anvil('8x create:crafter_slot_cover', 'tfc:metal/ingot/brass', [
			'hit_any',
			'hit_any',
			'hit_any',
		])
		.tier(2);

	//fluids

	e.shaped('create:hose_pulley', ['PCS', ' L ', ' L '], {
		C: 'create:copper_casing',
		P: 'create:fluid_pipe',
		L: 'afc:rubber_bar',
		S: 'create:shaft',
	});

	e.recipes.tfc
		.anvil('8x create:fluid_pipe', 'tfc:metal/sheet/copper', [
			'bend_last',
			'bend_any',
			'draw_not_last',
		])
		.tier(1);

	e.shapeless('create:mechanical_pump', [
		'create:fluid_pipe',
		'create:cogwheel',
	]);
	e.shapeless('create:smart_fluid_pipe', [
		'create:fluid_pipe',
		'tfc:brass_mechanisms',
	]);

	e.recipes.tfc
		.anvil('create:copper_valve_handle', 'tfc:metal/ingot/copper', [
			'bend_last',
			'upset_any',
			'upset_any',
		])
		.tier(1);

	e.shapeless('create:fluid_tank', [
		'2x tfc:metal/sheet/copper',
		'#tfc:barrels',
	]);

	e.shapeless('create:fluid_valve', [
		'create:fluid_pipe',
		'create:shaft',
		'create:andesite_alloy',
	]);

	e.shaped('3x create:copper_casing', ['RLR', 'WWW', 'RLR'], {
		L: 'firmalife:treated_lumber',
		R: 'tfc:metal/rod/copper',
		W: 'firmalife:treated_wood',
	});

	e.shapeless('create:item_drain', [
		'create:copper_casing',
		'#kubejs:metal_bars',
	]);

	e.shaped('create:spout', ['C', 'G', 'L'], {
		C: 'create:copper_casing',
		G: 'tfc:brass_mechanisms',
		L: 'afc:rubber_bar',
	});

	e.shaped('create:portable_fluid_interface', ['CSL'], {
		C: 'create:copper_casing',
		S: 'create:chute',
		L: 'afc:rubber_bar',
	});

	e.shaped('create:steam_engine', [' R ', ' M ', 'DRD'], {
		R: 'tfc:metal/rod/steel',
		M: 'tfc:brass_mechanisms',
		D: 'tfc:metal/double_sheet/copper',
	});

	e.shapeless('create:steam_whistle', [
		'tfc:metal/sheet/copper',
		'tfc:metal/rod/gold',
	]);

	e.shaped('3x create:brass_casing', ['RMR', 'WWW', 'RMR'], {
		R: 'tfc:metal/rod/brass',
		W: '#minecraft:planks',
		M: 'tfc:brass_mechanisms',
	});


	e.shaped('create:track_observer', ['P', 'C'], {
		P: 'minecraft:heavy_weighted_pressure_plate',
		C: 'create:railway_casing',
	});

	e.shapeless('create:rotation_speed_controller', [
		'create:brass_casing',
		'create:precision_mechanism',
	]);

	e.shaped('create:cuckoo_clock', [' L ', 'LCL', 'PSP'], {
		L: '#tfc:lumber',
		C: 'clock',
		P: '#minecraft:planks',
		S: 'create:shaft',
	});

	e.shaped('create:pulse_repeater', [' GT', 'SSS'], {
		G: 'tfc:metal/sheet/gold',
		T: 'redstone_torch',
		S: '#forge:smooth_stone',
	});

	e.shaped('create:pulse_extender', ['TGT', 'SSS'], {
		G: 'tfc:metal/sheet/gold',
		T: 'redstone_torch',
		S: '#forge:smooth_stone',
	});

	e.shaped('create:powered_latch', ['T L', 'SSS'], {
		L: 'lever',
		T: 'redstone_torch',
		S: '#forge:smooth_stone',
	});

	e.shaped('create:powered_toggle_latch', ['TRL', 'SSS'], {
		L: 'lever',
		T: 'redstone_torch',
		S: '#forge:smooth_stone',
		R: 'redstone',
	});

	e.shapeless('create:redstone_link', [
		'create:brass_casing',
		'createaddition:copper_spool',
		'redstone',
	]);

	e.shaped('create:linked_controller', ['BBB', 'SCR', 'BBB'], {
		B: '#minecraft:buttons',
		S: 'createaddition:copper_spool',
		C: 'create:brass_casing',
		R: 'redstone',
	});

	e.shapeless('create:analog_lever', ['lever', 'tfc:brass_mechanisms']);

	//equipment

	e.recipes.tfc.welding(
		'create:copper_diving_helmet',
		'tfc:metal/unfinished_helmet/copper',
		'firmalife:reinforced_glass'
	);
	e.recipes.tfc.welding(
		'create:copper_diving_boots',
		'tfc:metal/unfinished_boots/copper',
		'create:andesite_alloy'
	);

	e.shaped('create:copper_backtank', [' S ', 'PDP', ' P '], {
		S: 'create:shaft',
		P: 'tfc:metal/sheet/copper',
		D: 'tfc:metal/double_ingot/copper',
	});

	e.shaped('create:goggles', [' S ', 'LGL'], {
		S: '#tfc:leather_knapping',
		L: 'tfc:lens',
		G: 'tfc:metal/rod/gold',
	});

	e.shapeless('create:clipboard', [
		'minecraft:paper',
		'#tfc:lumber',
		'create:andesite_alloy',
	]);

	e.shaped('create:brown_toolbox', [' R ', 'SCS', 'LRL'], {
		R: 'tfc:metal/rod/gold',
		S: '#tfc:leather_knapping',
		C: '#forge:chests',
		L: '#tfc:lumber',
	});

	e.shaped('create:wrench', ['G', 'L', 'S'], {
		G: 'tfc:metal/rod/brass',
		L: '#tfc:lumber',
		S: '#forge:rods/wooden',
	});

	e.custom({
		type: 'create:mechanical_crafting',
		acceptMirrored: false,
		key: {
			H: {
				item: 'create:brass_hand',
			},
			L: {
				tag: 'forge:ingots/brass',
			},
			R: {
				item: 'create:precision_mechanism',
			},
			S: {
				tag: 'forge:rods/wooden',
			},
		},
		pattern: [' L ', ' R ', 'SSS', 'SSS', ' H '],
		result: {
			item: 'create:extendo_grip',
		},
	});

	//misc

	e.recipes.tfc
		.anvil('8x create:brass_bars', 'tfc:metal/sheet/brass', [
			'upset_last',
			'punch_second_last',
			'punch_third_last',
		])
		.tier(2);

	e.recipes.tfc
		.anvil('16x create:brass_bars', 'tfc:metal/double_sheet/brass', [
			'upset_last',
			'punch_second_last',
			'punch_third_last',
		])
		.tier(2);

	e.shaped('create:placard', [' B ', 'IPI', ' B '], {
		B: 'tfc:metal/rod/brass',
		I: 'create:andesite_alloy',
		P: 'paper',
	});

	e.shapeless('create:filter', [
		'#tfc:high_quality_cloth',
		'tfc:metal/rod/nickel',
	]);
	e.shapeless('create:attribute_filter', [
		'#tfc:high_quality_cloth',
		'tfc:metal/rod/gold',
	]);

	e.shapeless('create:crafting_blueprint', [
		'2x paper',
		'light_blue_dye',
		'firmalife:beeswax',
	]);

	e.recipes.tfc
		.anvil('16x create:metal_girder', 'tfc:metal/double_ingot/cast_iron', [
			'upset_last',
			'punch_second_last',
			'draw_third_last',
		])
		.tier(3);

	e.recipes.tfc
		.anvil('8x create:metal_girder', 'tfc:metal/ingot/cast_iron', [
			'upset_last',
			'punch_second_last',
			'draw_third_last',
		])
		.tier(3);

	e.shaped('8x create:framed_glass', ['GGG', 'GSG', 'GGG'], {
		G: '#forge:glass/colorless',
		S: 'tfc:gem_saw',
	}).damageIngredient('tfc:gem_saw', 8);

	e.shaped('4x create:tiled_glass', ['GGS', 'GG '], {
		G: '#forge:glass/colorless',
		S: 'tfc:gem_saw',
	}).damageIngredient('tfc:gem_saw', 4);

	e.shaped('3x create:vertical_framed_glass', [' G ', ' GS', ' G '], {
		G: '#forge:glass/colorless',
		S: 'tfc:gem_saw',
	}).damageIngredient('tfc:gem_saw', 3);

	e.shaped('3x create:horizontal_framed_glass', [' S ', 'GGG'], {
		G: '#forge:glass/colorless',
		S: 'tfc:gem_saw',
	}).damageIngredient('tfc:gem_saw', 3);

	e.shaped('3x create:framed_glass_trapdoor', ['GGG', 'GGG'], {
		G: '#forge:glass/colorless',
	});

	e.shaped('2x create:framed_glass_door', ['GG', 'GG', 'GG'], {
		G: '#forge:glass/colorless',
	});

	e.shaped('2x create:andesite_door', ['CC', 'GG', 'CC'], {
		C: 'create:andesite_casing',
		G: '#forge:glass/colorless',
	});

	e.shaped('2x create:train_door', ['CC', 'GG', 'CC'], {
		C: 'create:railway_casing',
		G: '#forge:glass/colorless',
	});

	e.shaped('3x create:train_trapdoor', ['CCC', 'CCC'], {
		C: 'create:railway_casing',
	});

	e.shaped('3x create:railway_casing', ['RPR', 'WWW', 'RPR'], {
		R: 'tfc:metal/rod/brass',
		P: 'tfc:metal/sheet/black_steel',
		W: '#minecraft:planks',
	});

	e.shaped('2x create:brass_door', ['CC', 'GG', 'CC'], {
		C: 'create:brass_casing',
		G: '#forge:glass/colorless',
	});

	e.shaped('2x create:copper_door', ['CC', 'GG', 'CC'], {
		C: 'create:copper_casing',
		G: '#forge:glass/colorless',
	});

	e.shaped('2x create:rose_quartz_lamp', [' E ', 'EAE', ' E '], {
		E: 'create:electron_tube',
		A: 'create:andesite_alloy',
	});

	e.shaped('4x create:ornate_iron_window', [' R ', 'RGR', 'GGG'], {
		R: 'tfc:metal/rod/cast_iron',
		G: '#forge:glass/colorless',
	});

	e.shaped('16x create:ornate_iron_window_pane', ['GGG', 'GGG'], {
		G: 'create:ornate_iron_window',
	});

	e.shaped('create:white_seat', ['C', 'L'], {
		C: '#tfc:high_quality_cloth',
		L: '#tfc:lumber',
	});

	e.shapeless('create:controls', [
		'create:railway_casing',
		'create:precision_mechanism',
	]);

	e.shapeless('2x create:track_station', [
		'create:railway_casing',
		'tfc:brass_mechanisms',
	]);
	e.shapeless('4x create:track_signal', [
		'create:railway_casing',
		'create:electron_tube',
	]);

	e.remove({ mod: 'moreburners' });
	e.shaped('moreburners:electric_burner', ['AAA', 'BCB', ' D '], {
		A: 'createaddition:gold_spool',
		B: 'tfc:metal/sheet/black_steel',
		C: 'thermal:machine_frame',
		D: 'tfc:metal/double_sheet/brass',
	});

	e.remove({ type: 'liquidburner:liquidburning' });

	e.custom({
		type: 'liquidburner:liquidburning',
		fluid: 'createdieselgenerators:gasoline',
		burntime: '10000',
		superheattime: '0',
	});
    e.custom({
		type: 'liquidburner:liquidburning',
		fluid: 'createdieselgenerators:ethanol',
		burntime: '10000',
		superheattime: '0',
	});
	e.custom({
		type: 'liquidburner:liquidburning',
		fluid: 'kubejs:kerosene',
		burntime: '0',
		superheattime: '10000',
	});

	e.shaped('create:blaze_burner', ['A A', 'B B', 'CDC'], {
		A: 'tfc:metal/sheet/black_steel',
		B: 'tfc:metal/double_sheet/black_steel',
		C: 'afc:rubber_bar',
		D: 'create:fluid_pipe',
	});
});

