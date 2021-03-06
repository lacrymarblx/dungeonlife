
// Copyright (c) Happion Laboratories - see license at https://github.com/JamieFristrom/dungeonlife/blob/master/LICENSE.md

import { DebugXL, LogArea, LogLevel } from 'ReplicatedStorage/TS/DebugXLTS'
DebugXL.logI(LogArea.Executed, script.GetFullName())

import { PCClient } from "ReplicatedStorage/TS/PCClient"

////const GameAnalyticsClient = require( game.ReplicatedStorage.Standard.GameAnalyticsClient )

import * as MathXL from "ReplicatedStorage/Standard/MathXL"

// don't have the Gui set to reset on spawn because we'll often want to fade out on death before the respawn

// start out black

// could wait for or use events to fade in or out but what if you die while fading in, etc. It's the classic curtain problem
// I blogged about
import { GuiXL } from "ReplicatedStorage/TS/GuiXLTS"

import { Workspace, Players, Teams, RunService, Lighting } from '@rbxts/services'

GuiXL.waitForLoadingGoo()

DebugXL.logI(LogArea.UI, "Fade curtain activated")

const playerGui = script.Parent!.Parent! as PlayerGui

playerGui.SetTopbarTransparency(0)
// we want to show our cool ReplicatedFirst logo first

const curtainGui = (playerGui.WaitForChild("CurtainGui") as ScreenGui)
const curtain = (curtainGui.WaitForChild("Curtain") as Frame)

curtain.BackgroundTransparency = 0


let firstFadeInDone = false

let deltaFrames = 0

const localPlayer = Players.LocalPlayer
const gameManagement = (Workspace.WaitForChild("GameManagement") as Folder)
const unassignedTeam = (Teams.WaitForChild("Unassigned") as Team)
const monstersTeam = (Teams.WaitForChild("Monsters") as Team)
const preparationCountdownObj = (gameManagement.WaitForChild("PreparationCountdown") as NumberValue)

RunService.RenderStepped.Connect(() => {
    deltaFrames = deltaFrames + 1
    // goal is if your character isn't spawned keep things black

    if (localPlayer.Team !== unassignedTeam &&
        (localPlayer.Team === monstersTeam || preparationCountdownObj.Value <= 0) &&
        localPlayer.Character &&
        localPlayer.Character.Parent &&
        !localPlayer.Character.FindFirstChild("HideCharacter") &&
        localPlayer.Character.FindFirstChild("Humanoid") &&
        (localPlayer.Character.FindFirstChild("Humanoid") as Humanoid|undefined)!.Health > 0 &&
        PCClient.pc &&
        PCClient.pc.getClass() !== "NullClass") {
            
        curtain.BackgroundTransparency = MathXL.Lerp(curtain.BackgroundTransparency, 1, 0.02)
    }
    else {
        curtain.BackgroundTransparency = MathXL.Lerp(curtain.BackgroundTransparency, 0, 0.02)
    }

    (Lighting.FindFirstChild("Blur") as BlurEffect|undefined)!.Size = (1-curtain.BackgroundTransparency)*25

    if (curtain.BackgroundTransparency >= 0.99) {
        playerGui.SetTopbarTransparency(0.5)
        if (!firstFadeInDone) {
            firstFadeInDone = true
            //			GameAnalyticsClient.RecordDesignEvent( "LoadFinished" )
        }
        else {
            playerGui.SetTopbarTransparency(0)
        }
    }
})

