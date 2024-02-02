// import Dungeon from "@mikewesthad/dungeon";
import TILES from "./tile-mapping.js";

export class DungeonManager {
	static preload(scene) {
		scene.load.image("tiles", "../assets/buch-tileset-48px-extruded.png");
		scene.load.spritesheet("characters", "../assets/buch-characters-64px-extruded.png", {
			frameWidth: 64,
			frameHeight: 64,
			margin: 1,
			spacing: 2
		});
	}

	constructor(scene) {
		this.scene = scene;
		this.dungeon = null;
		this.layer = null;
		this.map = null;
	}

	create() { // Generate a random world
		this.dungeon = new Dungeon({
			width: 50,
			height: 50,
      doorPadding: 2,
			rooms: {
				width: {
					min: 7,
					max: 15
				},
				height: {
					min: 7,
					max: 15
				},
				maxRooms: 12
			}
		});

		// Create a blank tilemap with dimensions matching the dungeon
		const map = this.scene.make.tilemap({tileWidth: 48, tileHeight: 48, width: this.dungeon.width, height: this.dungeon.height});
		this.map = map;
		const tileset = map.addTilesetImage("tiles", null, 48, 48, 1, 2);
		// 1px margin, 2px spacing


		/*
    *  GROUND LAYER =================================================
    */

		this.groundLayer = map.createBlankLayer("groundLayer", tileset);
		this.groundLayer.fill(TILES.BLANK);

		// Use the array of rooms generated to place tiles in the map
		// Note: using an arrow function here so that "this" still refers to our scene
		this.dungeon.rooms.forEach((room) => {
			const {
				x,
				y,
				width,
				height,
				left,
				right,
				top,
				bottom
			} = room;

			// Fill the floor with mostly clean tiles
			this.groundLayer.weightedRandomize(TILES.FLOOR, x + 1, y + 1, width - 2, height - 2);

			// Place the room corners tiles
			this.groundLayer.putTileAt(TILES.WALL.TOP_LEFT, left, top);
			this.groundLayer.putTileAt(TILES.WALL.TOP_RIGHT, right, top);
			this.groundLayer.putTileAt(TILES.WALL.BOTTOM_RIGHT, right, bottom);
			this.groundLayer.putTileAt(TILES.WALL.BOTTOM_LEFT, left, bottom);

			// Fill the walls with mostly clean tiles
			this.groundLayer.weightedRandomize(TILES.WALL.TOP, left + 1, top, width - 2, 1);
			this.groundLayer.weightedRandomize(TILES.WALL.BOTTOM, left + 1, bottom, width - 2, 1);
			this.groundLayer.weightedRandomize(TILES.WALL.LEFT, left, top + 1, 1, height - 2);
			this.groundLayer.weightedRandomize(TILES.WALL.RIGHT, right, top + 1, 1, height - 2);

			// Dungeons have rooms that are connected with doors. Each door has an x & y relative to the
			// room's location. Each direction has a different door to tile mapping.
			const doors = room.getDoorLocations(); // → Returns an array of {x, y} objects
			for (let i = 0; i < doors.length; i++) {
				if (doors[i].y === 0) {
					this.groundLayer.putTilesAt(TILES.DOOR.TOP, x + doors[i].x - 1, y + doors[i].y);
				} else if (doors[i].y === room.height - 1) {
					this.groundLayer.putTilesAt(TILES.DOOR.BOTTOM, x + doors[i].x - 1, y + doors[i].y);
				} else if (doors[i].x === 0) {
					this.groundLayer.putTilesAt(TILES.DOOR.LEFT, x + doors[i].x, y + doors[i].y - 1);
				} else if (doors[i].x === room.width - 1) {
					this.groundLayer.putTilesAt(TILES.DOOR.RIGHT, x + doors[i].x, y + doors[i].y - 1);
				}
			}
		});

		// Not exactly correct for the tileset since there are more possible floor tiles, but this will
		// do for the example.
		this.groundLayer.setCollisionByExclusion([
			-1,
			6,
			7,
			8,
			26
		]);

		/*
    *  STUFF LAYER =================================================
    */
    this.stuffLayer = map.createBlankDynamicLayer("Stuff", tileset);
    this.stuffLayer.fill(TILES.BLANK);
		// Separate out the rooms into:
		// - The starting room (index = 0)
		// - A random room to be designated as the end room (with stairs and nothing else)
		// - An array of 90% of the remaining rooms, for placing random stuff (leaving 10% empty)
		const rooms = this.dungeon.rooms.slice();
		const startRoom = rooms.shift();
		const endRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
		const otherRooms = Phaser.Utils.Array.Shuffle(rooms).slice(0, rooms.length * 0.9);

		// Place the stairs
		this.stuffLayer.putTileAt(TILES.STAIRS, endRoom.centerX, endRoom.centerY);

		// Place stuff in the 90% "otherRooms"
		otherRooms.forEach(room => {
			const rand = Math.random();
			if (rand <= 0.25) { // 25% chance of chest
				this.stuffLayer.putTileAt(TILES.CHEST, room.centerX, room.centerY);
			} else if (rand <= 0.5) { // 50% chance of a pot anywhere in the room... except don't block a door!
				const x = Phaser.Math.Between(room.left + 2, room.right - 2);
				const y = Phaser.Math.Between(room.top + 2, room.bottom - 2);
				this.stuffLayer.weightedRandomize(x, y, 1, 1, TILES.POT);
			} else { // 25% of either 2 or 4 towers, depending on the room size
				if (room.height >= 9) {
					this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY + 1);
					this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY + 1);
					this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY - 2);
					this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY - 2);
				} else {
					this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY - 1);
					this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY - 1);
				}
			}
		});

		// Watch the player and ground layer for collisions, for the duration of the scene:
		// this.physics.add.collider(this.player.sprite, this.groundLayer);

		// Phaser supports multiple cameras, but you can access the default camera like this:
		const camera = this.scene.cameras.main;

		// Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
		camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
	}
	update() {
		// if (this.dungeon) {
		//     this.dungeon.update();
		// }
	}
}
