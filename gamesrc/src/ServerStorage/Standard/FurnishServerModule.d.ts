
// Copyright (c) Happion Laboratories - see license at https://github.com/JamieFristrom/dungeonlife/blob/master/LICENSE.md

import { PossessionDatumI } from "ReplicatedStorage/Standard/PossessionDataStd"

import { ServerContextI } from "ServerStorage/TS/ServerContext"
import { StructureI } from "ServerStorage/TS/Structure"

import { DungeonMap } from "ReplicatedStorage/TS/DungeonMap"

import { FloorInfoI } from "ReplicatedStorage/TS/FloorInfoI"

declare class FurnishServerClass {
    PlaceSpawns(currentFloorInfo: FloorInfoI, spawnFromList: PossessionDatumI[], howManyToSpawn: number): void
    FurnishWithRandomSpawns(): void
    GetMonsterSpawners(): Part[]
    Furnish(context: ServerContextI, currentFloorInfo: FloorInfoI, map: DungeonMap, player: Player, id: string, pos: Vector3, rotation: number): [Model, StructureI]
}

declare let FurnishServer: FurnishServerClass

export = FurnishServer