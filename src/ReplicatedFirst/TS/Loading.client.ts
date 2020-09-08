
// Copyright (c) Happion Laboratories - see license at https://github.com/JamieFristrom/dungeonlife/blob/master/LICENSE.md

import { Workspace, RunService } from "@rbxts/services"
warn("DUNGEON LIFE 9/7/2020 6:30PM PST")
warn("Various polish and fixes++")

let loadingStructure = script.Parent!.Parent!.WaitForChild<Part>("LoadingStructure")
let waitingImage = loadingStructure.WaitForChild("BillboardGui").WaitForChild("LogoFrame").WaitForChild<ImageLabel>("WaitingImage")
loadingStructure.Parent = Workspace
RunService.RenderStepped.Connect(() => {
	let currentCamera = Workspace.CurrentCamera!
	currentCamera.CFrame = loadingStructure.CFrame
	waitingImage.Rotation = tick() * 10 % 360;
})


let starterGui = game.WaitForChild<StarterGui>("StarterGui")
starterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Backpack, false)
starterGui.SetCoreGuiEnabled(Enum.CoreGuiType.PlayerList, false)
