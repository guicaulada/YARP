var Control;
(function (Control) {
    Control[Control["INPUT_NEXT_CAMERA"] = 0] = "INPUT_NEXT_CAMERA";
    Control[Control["INPUT_LOOK_LR"] = 1] = "INPUT_LOOK_LR";
    Control[Control["INPUT_LOOK_UD"] = 2] = "INPUT_LOOK_UD";
    Control[Control["INPUT_LOOK_UP_ONLY"] = 3] = "INPUT_LOOK_UP_ONLY";
    Control[Control["INPUT_LOOK_DOWN_ONLY"] = 4] = "INPUT_LOOK_DOWN_ONLY";
    Control[Control["INPUT_LOOK_LEFT_ONLY"] = 5] = "INPUT_LOOK_LEFT_ONLY";
    Control[Control["INPUT_LOOK_RIGHT_ONLY"] = 6] = "INPUT_LOOK_RIGHT_ONLY";
    Control[Control["INPUT_CINEMATIC_SLOWMO"] = 7] = "INPUT_CINEMATIC_SLOWMO";
    Control[Control["INPUT_SCRIPTED_FLY_UD"] = 8] = "INPUT_SCRIPTED_FLY_UD";
    Control[Control["INPUT_SCRIPTED_FLY_LR"] = 9] = "INPUT_SCRIPTED_FLY_LR";
    Control[Control["INPUT_SCRIPTED_FLY_ZUP"] = 10] = "INPUT_SCRIPTED_FLY_ZUP";
    Control[Control["INPUT_SCRIPTED_FLY_ZDOWN"] = 11] = "INPUT_SCRIPTED_FLY_ZDOWN";
    Control[Control["INPUT_WEAPON_WHEEL_UD"] = 12] = "INPUT_WEAPON_WHEEL_UD";
    Control[Control["INPUT_WEAPON_WHEEL_LR"] = 13] = "INPUT_WEAPON_WHEEL_LR";
    Control[Control["INPUT_WEAPON_WHEEL_NEXT"] = 14] = "INPUT_WEAPON_WHEEL_NEXT";
    Control[Control["INPUT_WEAPON_WHEEL_PREV"] = 15] = "INPUT_WEAPON_WHEEL_PREV";
    Control[Control["INPUT_SELECT_NEXT_WEAPON"] = 16] = "INPUT_SELECT_NEXT_WEAPON";
    Control[Control["INPUT_SELECT_PREV_WEAPON"] = 17] = "INPUT_SELECT_PREV_WEAPON";
    Control[Control["INPUT_SKIP_CUTSCENE"] = 18] = "INPUT_SKIP_CUTSCENE";
    Control[Control["INPUT_CHARACTER_WHEEL"] = 19] = "INPUT_CHARACTER_WHEEL";
    Control[Control["INPUT_MULTIPLAYER_INFO"] = 20] = "INPUT_MULTIPLAYER_INFO";
    Control[Control["INPUT_SPRINT"] = 21] = "INPUT_SPRINT";
    Control[Control["INPUT_JUMP"] = 22] = "INPUT_JUMP";
    Control[Control["INPUT_ENTER"] = 23] = "INPUT_ENTER";
    Control[Control["INPUT_ATTACK"] = 24] = "INPUT_ATTACK";
    Control[Control["INPUT_AIM"] = 25] = "INPUT_AIM";
    Control[Control["INPUT_LOOK_BEHIND"] = 26] = "INPUT_LOOK_BEHIND";
    Control[Control["INPUT_PHONE"] = 27] = "INPUT_PHONE";
    Control[Control["INPUT_SPECIAL_ABILITY"] = 28] = "INPUT_SPECIAL_ABILITY";
    Control[Control["INPUT_SPECIAL_ABILITY_SECONDARY"] = 29] = "INPUT_SPECIAL_ABILITY_SECONDARY";
    Control[Control["INPUT_MOVE_LR"] = 30] = "INPUT_MOVE_LR";
    Control[Control["INPUT_MOVE_UD"] = 31] = "INPUT_MOVE_UD";
    Control[Control["INPUT_MOVE_UP_ONLY"] = 32] = "INPUT_MOVE_UP_ONLY";
    Control[Control["INPUT_MOVE_DOWN_ONLY"] = 33] = "INPUT_MOVE_DOWN_ONLY";
    Control[Control["INPUT_MOVE_LEFT_ONLY"] = 34] = "INPUT_MOVE_LEFT_ONLY";
    Control[Control["INPUT_MOVE_RIGHT_ONLY"] = 35] = "INPUT_MOVE_RIGHT_ONLY";
    Control[Control["INPUT_DUCK"] = 36] = "INPUT_DUCK";
    Control[Control["INPUT_SELECT_WEAPON"] = 37] = "INPUT_SELECT_WEAPON";
    Control[Control["INPUT_PICKUP"] = 38] = "INPUT_PICKUP";
    Control[Control["INPUT_SNIPER_ZOOM"] = 39] = "INPUT_SNIPER_ZOOM";
    Control[Control["INPUT_SNIPER_ZOOM_IN_ONLY"] = 40] = "INPUT_SNIPER_ZOOM_IN_ONLY";
    Control[Control["INPUT_SNIPER_ZOOM_OUT_ONLY"] = 41] = "INPUT_SNIPER_ZOOM_OUT_ONLY";
    Control[Control["INPUT_SNIPER_ZOOM_IN_SECONDARY"] = 42] = "INPUT_SNIPER_ZOOM_IN_SECONDARY";
    Control[Control["INPUT_SNIPER_ZOOM_OUT_SECONDARY"] = 43] = "INPUT_SNIPER_ZOOM_OUT_SECONDARY";
    Control[Control["INPUT_COVER"] = 44] = "INPUT_COVER";
    Control[Control["INPUT_RELOAD"] = 45] = "INPUT_RELOAD";
    Control[Control["INPUT_TALK"] = 46] = "INPUT_TALK";
    Control[Control["INPUT_DETONATE"] = 47] = "INPUT_DETONATE";
    Control[Control["INPUT_HUD_SPECIAL"] = 48] = "INPUT_HUD_SPECIAL";
    Control[Control["INPUT_ARREST"] = 49] = "INPUT_ARREST";
    Control[Control["INPUT_ACCURATE_AIM"] = 50] = "INPUT_ACCURATE_AIM";
    Control[Control["INPUT_CONTEXT"] = 51] = "INPUT_CONTEXT";
    Control[Control["INPUT_CONTEXT_SECONDARY"] = 52] = "INPUT_CONTEXT_SECONDARY";
    Control[Control["INPUT_WEAPON_SPECIAL"] = 53] = "INPUT_WEAPON_SPECIAL";
    Control[Control["INPUT_WEAPON_SPECIAL_TWO"] = 54] = "INPUT_WEAPON_SPECIAL_TWO";
    Control[Control["INPUT_DIVE"] = 55] = "INPUT_DIVE";
    Control[Control["INPUT_DROP_WEAPON"] = 56] = "INPUT_DROP_WEAPON";
    Control[Control["INPUT_DROP_AMMO"] = 57] = "INPUT_DROP_AMMO";
    Control[Control["INPUT_THROW_GRENADE"] = 58] = "INPUT_THROW_GRENADE";
    Control[Control["INPUT_VEH_MOVE_LR"] = 59] = "INPUT_VEH_MOVE_LR";
    Control[Control["INPUT_VEH_MOVE_UD"] = 60] = "INPUT_VEH_MOVE_UD";
    Control[Control["INPUT_VEH_MOVE_UP_ONLY"] = 61] = "INPUT_VEH_MOVE_UP_ONLY";
    Control[Control["INPUT_VEH_MOVE_DOWN_ONLY"] = 62] = "INPUT_VEH_MOVE_DOWN_ONLY";
    Control[Control["INPUT_VEH_MOVE_LEFT_ONLY"] = 63] = "INPUT_VEH_MOVE_LEFT_ONLY";
    Control[Control["INPUT_VEH_MOVE_RIGHT_ONLY"] = 64] = "INPUT_VEH_MOVE_RIGHT_ONLY";
    Control[Control["INPUT_VEH_SPECIAL"] = 65] = "INPUT_VEH_SPECIAL";
    Control[Control["INPUT_VEH_GUN_LR"] = 66] = "INPUT_VEH_GUN_LR";
    Control[Control["INPUT_VEH_GUN_UD"] = 67] = "INPUT_VEH_GUN_UD";
    Control[Control["INPUT_VEH_AIM"] = 68] = "INPUT_VEH_AIM";
    Control[Control["INPUT_VEH_ATTACK"] = 69] = "INPUT_VEH_ATTACK";
    Control[Control["INPUT_VEH_ATTACK2"] = 70] = "INPUT_VEH_ATTACK2";
    Control[Control["INPUT_VEH_ACCELERATE"] = 71] = "INPUT_VEH_ACCELERATE";
    Control[Control["INPUT_VEH_BRAKE"] = 72] = "INPUT_VEH_BRAKE";
    Control[Control["INPUT_VEH_DUCK"] = 73] = "INPUT_VEH_DUCK";
    Control[Control["INPUT_VEH_HEADLIGHT"] = 74] = "INPUT_VEH_HEADLIGHT";
    Control[Control["INPUT_VEH_EXIT"] = 75] = "INPUT_VEH_EXIT";
    Control[Control["INPUT_VEH_HANDBRAKE"] = 76] = "INPUT_VEH_HANDBRAKE";
    Control[Control["INPUT_VEH_HOTWIRE_LEFT"] = 77] = "INPUT_VEH_HOTWIRE_LEFT";
    Control[Control["INPUT_VEH_HOTWIRE_RIGHT"] = 78] = "INPUT_VEH_HOTWIRE_RIGHT";
    Control[Control["INPUT_VEH_LOOK_BEHIND"] = 79] = "INPUT_VEH_LOOK_BEHIND";
    Control[Control["INPUT_VEH_CIN_CAM"] = 80] = "INPUT_VEH_CIN_CAM";
    Control[Control["INPUT_VEH_NEXT_RADIO"] = 81] = "INPUT_VEH_NEXT_RADIO";
    Control[Control["INPUT_VEH_PREV_RADIO"] = 82] = "INPUT_VEH_PREV_RADIO";
    Control[Control["INPUT_VEH_NEXT_RADIO_TRACK"] = 83] = "INPUT_VEH_NEXT_RADIO_TRACK";
    Control[Control["INPUT_VEH_PREV_RADIO_TRACK"] = 84] = "INPUT_VEH_PREV_RADIO_TRACK";
    Control[Control["INPUT_VEH_RADIO_WHEEL"] = 85] = "INPUT_VEH_RADIO_WHEEL";
    Control[Control["INPUT_VEH_HORN"] = 86] = "INPUT_VEH_HORN";
    Control[Control["INPUT_VEH_FLY_THROTTLE_UP"] = 87] = "INPUT_VEH_FLY_THROTTLE_UP";
    Control[Control["INPUT_VEH_FLY_THROTTLE_DOWN"] = 88] = "INPUT_VEH_FLY_THROTTLE_DOWN";
    Control[Control["INPUT_VEH_FLY_YAW_LEFT"] = 89] = "INPUT_VEH_FLY_YAW_LEFT";
    Control[Control["INPUT_VEH_FLY_YAW_RIGHT"] = 90] = "INPUT_VEH_FLY_YAW_RIGHT";
    Control[Control["INPUT_VEH_PASSENGER_AIM"] = 91] = "INPUT_VEH_PASSENGER_AIM";
    Control[Control["INPUT_VEH_PASSENGER_ATTACK"] = 92] = "INPUT_VEH_PASSENGER_ATTACK";
    Control[Control["INPUT_VEH_SPECIAL_ABILITY_FRANKLIN"] = 93] = "INPUT_VEH_SPECIAL_ABILITY_FRANKLIN";
    Control[Control["INPUT_VEH_STUNT_UD"] = 94] = "INPUT_VEH_STUNT_UD";
    Control[Control["INPUT_VEH_CINEMATIC_UD"] = 95] = "INPUT_VEH_CINEMATIC_UD";
    Control[Control["INPUT_VEH_CINEMATIC_UP_ONLY"] = 96] = "INPUT_VEH_CINEMATIC_UP_ONLY";
    Control[Control["INPUT_VEH_CINEMATIC_DOWN_ONLY"] = 97] = "INPUT_VEH_CINEMATIC_DOWN_ONLY";
    Control[Control["INPUT_VEH_CINEMATIC_LR"] = 98] = "INPUT_VEH_CINEMATIC_LR";
    Control[Control["INPUT_VEH_SELECT_NEXT_WEAPON"] = 99] = "INPUT_VEH_SELECT_NEXT_WEAPON";
    Control[Control["INPUT_VEH_SELECT_PREV_WEAPON"] = 100] = "INPUT_VEH_SELECT_PREV_WEAPON";
    Control[Control["INPUT_VEH_ROOF"] = 101] = "INPUT_VEH_ROOF";
    Control[Control["INPUT_VEH_JUMP"] = 102] = "INPUT_VEH_JUMP";
    Control[Control["INPUT_VEH_GRAPPLING_HOOK"] = 103] = "INPUT_VEH_GRAPPLING_HOOK";
    Control[Control["INPUT_VEH_SHUFFLE"] = 104] = "INPUT_VEH_SHUFFLE";
    Control[Control["INPUT_VEH_DROP_PROJECTILE"] = 105] = "INPUT_VEH_DROP_PROJECTILE";
    Control[Control["INPUT_VEH_MOUSE_CONTROL_OVERRIDE"] = 106] = "INPUT_VEH_MOUSE_CONTROL_OVERRIDE";
    Control[Control["INPUT_VEH_FLY_ROLL_LR"] = 107] = "INPUT_VEH_FLY_ROLL_LR";
    Control[Control["INPUT_VEH_FLY_ROLL_LEFT_ONLY"] = 108] = "INPUT_VEH_FLY_ROLL_LEFT_ONLY";
    Control[Control["INPUT_VEH_FLY_ROLL_RIGHT_ONLY"] = 109] = "INPUT_VEH_FLY_ROLL_RIGHT_ONLY";
    Control[Control["INPUT_VEH_FLY_PITCH_UD"] = 110] = "INPUT_VEH_FLY_PITCH_UD";
    Control[Control["INPUT_VEH_FLY_PITCH_UP_ONLY"] = 111] = "INPUT_VEH_FLY_PITCH_UP_ONLY";
    Control[Control["INPUT_VEH_FLY_PITCH_DOWN_ONLY"] = 112] = "INPUT_VEH_FLY_PITCH_DOWN_ONLY";
    Control[Control["INPUT_VEH_FLY_UNDERCARRIAGE"] = 113] = "INPUT_VEH_FLY_UNDERCARRIAGE";
    Control[Control["INPUT_VEH_FLY_ATTACK"] = 114] = "INPUT_VEH_FLY_ATTACK";
    Control[Control["INPUT_VEH_FLY_SELECT_NEXT_WEAPON"] = 115] = "INPUT_VEH_FLY_SELECT_NEXT_WEAPON";
    Control[Control["INPUT_VEH_FLY_SELECT_PREV_WEAPON"] = 116] = "INPUT_VEH_FLY_SELECT_PREV_WEAPON";
    Control[Control["INPUT_VEH_FLY_SELECT_TARGET_LEFT"] = 117] = "INPUT_VEH_FLY_SELECT_TARGET_LEFT";
    Control[Control["INPUT_VEH_FLY_SELECT_TARGET_RIGHT"] = 118] = "INPUT_VEH_FLY_SELECT_TARGET_RIGHT";
    Control[Control["INPUT_VEH_FLY_VERTICAL_FLIGHT_MODE"] = 119] = "INPUT_VEH_FLY_VERTICAL_FLIGHT_MODE";
    Control[Control["INPUT_VEH_FLY_DUCK"] = 120] = "INPUT_VEH_FLY_DUCK";
    Control[Control["INPUT_VEH_FLY_ATTACK_CAMERA"] = 121] = "INPUT_VEH_FLY_ATTACK_CAMERA";
    Control[Control["INPUT_VEH_FLY_MOUSE_CONTROL_OVERRIDE"] = 122] = "INPUT_VEH_FLY_MOUSE_CONTROL_OVERRIDE";
    Control[Control["INPUT_VEH_SUB_TURN_LR"] = 123] = "INPUT_VEH_SUB_TURN_LR";
    Control[Control["INPUT_VEH_SUB_TURN_LEFT_ONLY"] = 124] = "INPUT_VEH_SUB_TURN_LEFT_ONLY";
    Control[Control["INPUT_VEH_SUB_TURN_RIGHT_ONLY"] = 125] = "INPUT_VEH_SUB_TURN_RIGHT_ONLY";
    Control[Control["INPUT_VEH_SUB_PITCH_UD"] = 126] = "INPUT_VEH_SUB_PITCH_UD";
    Control[Control["INPUT_VEH_SUB_PITCH_UP_ONLY"] = 127] = "INPUT_VEH_SUB_PITCH_UP_ONLY";
    Control[Control["INPUT_VEH_SUB_PITCH_DOWN_ONLY"] = 128] = "INPUT_VEH_SUB_PITCH_DOWN_ONLY";
    Control[Control["INPUT_VEH_SUB_THROTTLE_UP"] = 129] = "INPUT_VEH_SUB_THROTTLE_UP";
    Control[Control["INPUT_VEH_SUB_THROTTLE_DOWN"] = 130] = "INPUT_VEH_SUB_THROTTLE_DOWN";
    Control[Control["INPUT_VEH_SUB_ASCEND"] = 131] = "INPUT_VEH_SUB_ASCEND";
    Control[Control["INPUT_VEH_SUB_DESCEND"] = 132] = "INPUT_VEH_SUB_DESCEND";
    Control[Control["INPUT_VEH_SUB_TURN_HARD_LEFT"] = 133] = "INPUT_VEH_SUB_TURN_HARD_LEFT";
    Control[Control["INPUT_VEH_SUB_TURN_HARD_RIGHT"] = 134] = "INPUT_VEH_SUB_TURN_HARD_RIGHT";
    Control[Control["INPUT_VEH_SUB_MOUSE_CONTROL_OVERRIDE"] = 135] = "INPUT_VEH_SUB_MOUSE_CONTROL_OVERRIDE";
    Control[Control["INPUT_VEH_PUSHBIKE_PEDAL"] = 136] = "INPUT_VEH_PUSHBIKE_PEDAL";
    Control[Control["INPUT_VEH_PUSHBIKE_SPRINT"] = 137] = "INPUT_VEH_PUSHBIKE_SPRINT";
    Control[Control["INPUT_VEH_PUSHBIKE_FRONT_BRAKE"] = 138] = "INPUT_VEH_PUSHBIKE_FRONT_BRAKE";
    Control[Control["INPUT_VEH_PUSHBIKE_REAR_BRAKE"] = 139] = "INPUT_VEH_PUSHBIKE_REAR_BRAKE";
    Control[Control["INPUT_MELEE_ATTACK_LIGHT"] = 140] = "INPUT_MELEE_ATTACK_LIGHT";
    Control[Control["INPUT_MELEE_ATTACK_HEAVY"] = 141] = "INPUT_MELEE_ATTACK_HEAVY";
    Control[Control["INPUT_MELEE_ATTACK_ALTERNATE"] = 142] = "INPUT_MELEE_ATTACK_ALTERNATE";
    Control[Control["INPUT_MELEE_BLOCK"] = 143] = "INPUT_MELEE_BLOCK";
    Control[Control["INPUT_PARACHUTE_DEPLOY"] = 144] = "INPUT_PARACHUTE_DEPLOY";
    Control[Control["INPUT_PARACHUTE_DETACH"] = 145] = "INPUT_PARACHUTE_DETACH";
    Control[Control["INPUT_PARACHUTE_TURN_LR"] = 146] = "INPUT_PARACHUTE_TURN_LR";
    Control[Control["INPUT_PARACHUTE_TURN_LEFT_ONLY"] = 147] = "INPUT_PARACHUTE_TURN_LEFT_ONLY";
    Control[Control["INPUT_PARACHUTE_TURN_RIGHT_ONLY"] = 148] = "INPUT_PARACHUTE_TURN_RIGHT_ONLY";
    Control[Control["INPUT_PARACHUTE_PITCH_UD"] = 149] = "INPUT_PARACHUTE_PITCH_UD";
    Control[Control["INPUT_PARACHUTE_PITCH_UP_ONLY"] = 150] = "INPUT_PARACHUTE_PITCH_UP_ONLY";
    Control[Control["INPUT_PARACHUTE_PITCH_DOWN_ONLY"] = 151] = "INPUT_PARACHUTE_PITCH_DOWN_ONLY";
    Control[Control["INPUT_PARACHUTE_BRAKE_LEFT"] = 152] = "INPUT_PARACHUTE_BRAKE_LEFT";
    Control[Control["INPUT_PARACHUTE_BRAKE_RIGHT"] = 153] = "INPUT_PARACHUTE_BRAKE_RIGHT";
    Control[Control["INPUT_PARACHUTE_SMOKE"] = 154] = "INPUT_PARACHUTE_SMOKE";
    Control[Control["INPUT_PARACHUTE_PRECISION_LANDING"] = 155] = "INPUT_PARACHUTE_PRECISION_LANDING";
    Control[Control["INPUT_MAP"] = 156] = "INPUT_MAP";
    Control[Control["INPUT_SELECT_WEAPON_UNARMED"] = 157] = "INPUT_SELECT_WEAPON_UNARMED";
    Control[Control["INPUT_SELECT_WEAPON_MELEE"] = 158] = "INPUT_SELECT_WEAPON_MELEE";
    Control[Control["INPUT_SELECT_WEAPON_HANDGUN"] = 159] = "INPUT_SELECT_WEAPON_HANDGUN";
    Control[Control["INPUT_SELECT_WEAPON_SHOTGUN"] = 160] = "INPUT_SELECT_WEAPON_SHOTGUN";
    Control[Control["INPUT_SELECT_WEAPON_SMG"] = 161] = "INPUT_SELECT_WEAPON_SMG";
    Control[Control["INPUT_SELECT_WEAPON_AUTO_RIFLE"] = 162] = "INPUT_SELECT_WEAPON_AUTO_RIFLE";
    Control[Control["INPUT_SELECT_WEAPON_SNIPER"] = 163] = "INPUT_SELECT_WEAPON_SNIPER";
    Control[Control["INPUT_SELECT_WEAPON_HEAVY"] = 164] = "INPUT_SELECT_WEAPON_HEAVY";
    Control[Control["INPUT_SELECT_WEAPON_SPECIAL"] = 165] = "INPUT_SELECT_WEAPON_SPECIAL";
    Control[Control["INPUT_SELECT_CHARACTER_MICHAEL"] = 166] = "INPUT_SELECT_CHARACTER_MICHAEL";
    Control[Control["INPUT_SELECT_CHARACTER_FRANKLIN"] = 167] = "INPUT_SELECT_CHARACTER_FRANKLIN";
    Control[Control["INPUT_SELECT_CHARACTER_TREVOR"] = 168] = "INPUT_SELECT_CHARACTER_TREVOR";
    Control[Control["INPUT_SELECT_CHARACTER_MULTIPLAYER"] = 169] = "INPUT_SELECT_CHARACTER_MULTIPLAYER";
    Control[Control["INPUT_SAVE_REPLAY_CLIP"] = 170] = "INPUT_SAVE_REPLAY_CLIP";
    Control[Control["INPUT_SPECIAL_ABILITY_PC"] = 171] = "INPUT_SPECIAL_ABILITY_PC";
    Control[Control["INPUT_CELLPHONE_UP"] = 172] = "INPUT_CELLPHONE_UP";
    Control[Control["INPUT_CELLPHONE_DOWN"] = 173] = "INPUT_CELLPHONE_DOWN";
    Control[Control["INPUT_CELLPHONE_LEFT"] = 174] = "INPUT_CELLPHONE_LEFT";
    Control[Control["INPUT_CELLPHONE_RIGHT"] = 175] = "INPUT_CELLPHONE_RIGHT";
    Control[Control["INPUT_CELLPHONE_SELECT"] = 176] = "INPUT_CELLPHONE_SELECT";
    Control[Control["INPUT_CELLPHONE_CANCEL"] = 177] = "INPUT_CELLPHONE_CANCEL";
    Control[Control["INPUT_CELLPHONE_OPTION"] = 178] = "INPUT_CELLPHONE_OPTION";
    Control[Control["INPUT_CELLPHONE_EXTRA_OPTION"] = 179] = "INPUT_CELLPHONE_EXTRA_OPTION";
    Control[Control["INPUT_CELLPHONE_SCROLL_FORWARD"] = 180] = "INPUT_CELLPHONE_SCROLL_FORWARD";
    Control[Control["INPUT_CELLPHONE_SCROLL_BACKWARD"] = 181] = "INPUT_CELLPHONE_SCROLL_BACKWARD";
    Control[Control["INPUT_CELLPHONE_CAMERA_FOCUS_LOCK"] = 182] = "INPUT_CELLPHONE_CAMERA_FOCUS_LOCK";
    Control[Control["INPUT_CELLPHONE_CAMERA_GRID"] = 183] = "INPUT_CELLPHONE_CAMERA_GRID";
    Control[Control["INPUT_CELLPHONE_CAMERA_SELFIE"] = 184] = "INPUT_CELLPHONE_CAMERA_SELFIE";
    Control[Control["INPUT_CELLPHONE_CAMERA_DOF"] = 185] = "INPUT_CELLPHONE_CAMERA_DOF";
    Control[Control["INPUT_CELLPHONE_CAMERA_EXPRESSION"] = 186] = "INPUT_CELLPHONE_CAMERA_EXPRESSION";
    Control[Control["INPUT_FRONTEND_DOWN"] = 187] = "INPUT_FRONTEND_DOWN";
    Control[Control["INPUT_FRONTEND_UP"] = 188] = "INPUT_FRONTEND_UP";
    Control[Control["INPUT_FRONTEND_LEFT"] = 189] = "INPUT_FRONTEND_LEFT";
    Control[Control["INPUT_FRONTEND_RIGHT"] = 190] = "INPUT_FRONTEND_RIGHT";
    Control[Control["INPUT_FRONTEND_RDOWN"] = 191] = "INPUT_FRONTEND_RDOWN";
    Control[Control["INPUT_FRONTEND_RUP"] = 192] = "INPUT_FRONTEND_RUP";
    Control[Control["INPUT_FRONTEND_RLEFT"] = 193] = "INPUT_FRONTEND_RLEFT";
    Control[Control["INPUT_FRONTEND_RRIGHT"] = 194] = "INPUT_FRONTEND_RRIGHT";
    Control[Control["INPUT_FRONTEND_AXIS_X"] = 195] = "INPUT_FRONTEND_AXIS_X";
    Control[Control["INPUT_FRONTEND_AXIS_Y"] = 196] = "INPUT_FRONTEND_AXIS_Y";
    Control[Control["INPUT_FRONTEND_RIGHT_AXIS_X"] = 197] = "INPUT_FRONTEND_RIGHT_AXIS_X";
    Control[Control["INPUT_FRONTEND_RIGHT_AXIS_Y"] = 198] = "INPUT_FRONTEND_RIGHT_AXIS_Y";
    Control[Control["INPUT_FRONTEND_PAUSE"] = 199] = "INPUT_FRONTEND_PAUSE";
    Control[Control["INPUT_FRONTEND_PAUSE_ALTERNATE"] = 200] = "INPUT_FRONTEND_PAUSE_ALTERNATE";
    Control[Control["INPUT_FRONTEND_ACCEPT"] = 201] = "INPUT_FRONTEND_ACCEPT";
    Control[Control["INPUT_FRONTEND_CANCEL"] = 202] = "INPUT_FRONTEND_CANCEL";
    Control[Control["INPUT_FRONTEND_X"] = 203] = "INPUT_FRONTEND_X";
    Control[Control["INPUT_FRONTEND_Y"] = 204] = "INPUT_FRONTEND_Y";
    Control[Control["INPUT_FRONTEND_LB"] = 205] = "INPUT_FRONTEND_LB";
    Control[Control["INPUT_FRONTEND_RB"] = 206] = "INPUT_FRONTEND_RB";
    Control[Control["INPUT_FRONTEND_LT"] = 207] = "INPUT_FRONTEND_LT";
    Control[Control["INPUT_FRONTEND_RT"] = 208] = "INPUT_FRONTEND_RT";
    Control[Control["INPUT_FRONTEND_LS"] = 209] = "INPUT_FRONTEND_LS";
    Control[Control["INPUT_FRONTEND_RS"] = 210] = "INPUT_FRONTEND_RS";
    Control[Control["INPUT_FRONTEND_LEADERBOARD"] = 211] = "INPUT_FRONTEND_LEADERBOARD";
    Control[Control["INPUT_FRONTEND_SOCIAL_CLUB"] = 212] = "INPUT_FRONTEND_SOCIAL_CLUB";
    Control[Control["INPUT_FRONTEND_SOCIAL_CLUB_SECONDARY"] = 213] = "INPUT_FRONTEND_SOCIAL_CLUB_SECONDARY";
    Control[Control["INPUT_FRONTEND_DELETE"] = 214] = "INPUT_FRONTEND_DELETE";
    Control[Control["INPUT_FRONTEND_ENDSCREEN_ACCEPT"] = 215] = "INPUT_FRONTEND_ENDSCREEN_ACCEPT";
    Control[Control["INPUT_FRONTEND_ENDSCREEN_EXPAND"] = 216] = "INPUT_FRONTEND_ENDSCREEN_EXPAND";
    Control[Control["INPUT_FRONTEND_SELECT"] = 217] = "INPUT_FRONTEND_SELECT";
    Control[Control["INPUT_SCRIPT_LEFT_AXIS_X"] = 218] = "INPUT_SCRIPT_LEFT_AXIS_X";
    Control[Control["INPUT_SCRIPT_LEFT_AXIS_Y"] = 219] = "INPUT_SCRIPT_LEFT_AXIS_Y";
    Control[Control["INPUT_SCRIPT_RIGHT_AXIS_X"] = 220] = "INPUT_SCRIPT_RIGHT_AXIS_X";
    Control[Control["INPUT_SCRIPT_RIGHT_AXIS_Y"] = 221] = "INPUT_SCRIPT_RIGHT_AXIS_Y";
    Control[Control["INPUT_SCRIPT_RUP"] = 222] = "INPUT_SCRIPT_RUP";
    Control[Control["INPUT_SCRIPT_RDOWN"] = 223] = "INPUT_SCRIPT_RDOWN";
    Control[Control["INPUT_SCRIPT_RLEFT"] = 224] = "INPUT_SCRIPT_RLEFT";
    Control[Control["INPUT_SCRIPT_RRIGHT"] = 225] = "INPUT_SCRIPT_RRIGHT";
    Control[Control["INPUT_SCRIPT_LB"] = 226] = "INPUT_SCRIPT_LB";
    Control[Control["INPUT_SCRIPT_RB"] = 227] = "INPUT_SCRIPT_RB";
    Control[Control["INPUT_SCRIPT_LT"] = 228] = "INPUT_SCRIPT_LT";
    Control[Control["INPUT_SCRIPT_RT"] = 229] = "INPUT_SCRIPT_RT";
    Control[Control["INPUT_SCRIPT_LS"] = 230] = "INPUT_SCRIPT_LS";
    Control[Control["INPUT_SCRIPT_RS"] = 231] = "INPUT_SCRIPT_RS";
    Control[Control["INPUT_SCRIPT_PAD_UP"] = 232] = "INPUT_SCRIPT_PAD_UP";
    Control[Control["INPUT_SCRIPT_PAD_DOWN"] = 233] = "INPUT_SCRIPT_PAD_DOWN";
    Control[Control["INPUT_SCRIPT_PAD_LEFT"] = 234] = "INPUT_SCRIPT_PAD_LEFT";
    Control[Control["INPUT_SCRIPT_PAD_RIGHT"] = 235] = "INPUT_SCRIPT_PAD_RIGHT";
    Control[Control["INPUT_SCRIPT_SELECT"] = 236] = "INPUT_SCRIPT_SELECT";
    Control[Control["INPUT_CURSOR_ACCEPT"] = 237] = "INPUT_CURSOR_ACCEPT";
    Control[Control["INPUT_CURSOR_CANCEL"] = 238] = "INPUT_CURSOR_CANCEL";
    Control[Control["INPUT_CURSOR_X"] = 239] = "INPUT_CURSOR_X";
    Control[Control["INPUT_CURSOR_Y"] = 240] = "INPUT_CURSOR_Y";
    Control[Control["INPUT_CURSOR_SCROLL_UP"] = 241] = "INPUT_CURSOR_SCROLL_UP";
    Control[Control["INPUT_CURSOR_SCROLL_DOWN"] = 242] = "INPUT_CURSOR_SCROLL_DOWN";
    Control[Control["INPUT_ENTER_CHEAT_CODE"] = 243] = "INPUT_ENTER_CHEAT_CODE";
    Control[Control["INPUT_INTERACTION_MENU"] = 244] = "INPUT_INTERACTION_MENU";
    Control[Control["INPUT_MP_TEXT_CHAT_ALL"] = 245] = "INPUT_MP_TEXT_CHAT_ALL";
    Control[Control["INPUT_MP_TEXT_CHAT_TEAM"] = 246] = "INPUT_MP_TEXT_CHAT_TEAM";
    Control[Control["INPUT_MP_TEXT_CHAT_FRIENDS"] = 247] = "INPUT_MP_TEXT_CHAT_FRIENDS";
    Control[Control["INPUT_MP_TEXT_CHAT_CREW"] = 248] = "INPUT_MP_TEXT_CHAT_CREW";
    Control[Control["INPUT_PUSH_TO_TALK"] = 249] = "INPUT_PUSH_TO_TALK";
    Control[Control["INPUT_CREATOR_LS"] = 250] = "INPUT_CREATOR_LS";
    Control[Control["INPUT_CREATOR_RS"] = 251] = "INPUT_CREATOR_RS";
    Control[Control["INPUT_CREATOR_LT"] = 252] = "INPUT_CREATOR_LT";
    Control[Control["INPUT_CREATOR_RT"] = 253] = "INPUT_CREATOR_RT";
    Control[Control["INPUT_CREATOR_MENU_TOGGLE"] = 254] = "INPUT_CREATOR_MENU_TOGGLE";
    Control[Control["INPUT_CREATOR_ACCEPT"] = 255] = "INPUT_CREATOR_ACCEPT";
    Control[Control["INPUT_CREATOR_DELETE"] = 256] = "INPUT_CREATOR_DELETE";
    Control[Control["INPUT_ATTACK2"] = 257] = "INPUT_ATTACK2";
    Control[Control["INPUT_RAPPEL_JUMP"] = 258] = "INPUT_RAPPEL_JUMP";
    Control[Control["INPUT_RAPPEL_LONG_JUMP"] = 259] = "INPUT_RAPPEL_LONG_JUMP";
    Control[Control["INPUT_RAPPEL_SMASH_WINDOW"] = 260] = "INPUT_RAPPEL_SMASH_WINDOW";
    Control[Control["INPUT_PREV_WEAPON"] = 261] = "INPUT_PREV_WEAPON";
    Control[Control["INPUT_NEXT_WEAPON"] = 262] = "INPUT_NEXT_WEAPON";
    Control[Control["INPUT_MELEE_ATTACK1"] = 263] = "INPUT_MELEE_ATTACK1";
    Control[Control["INPUT_MELEE_ATTACK2"] = 264] = "INPUT_MELEE_ATTACK2";
    Control[Control["INPUT_WHISTLE"] = 265] = "INPUT_WHISTLE";
    Control[Control["INPUT_MOVE_LEFT"] = 266] = "INPUT_MOVE_LEFT";
    Control[Control["INPUT_MOVE_RIGHT"] = 267] = "INPUT_MOVE_RIGHT";
    Control[Control["INPUT_MOVE_UP"] = 268] = "INPUT_MOVE_UP";
    Control[Control["INPUT_MOVE_DOWN"] = 269] = "INPUT_MOVE_DOWN";
    Control[Control["INPUT_LOOK_LEFT"] = 270] = "INPUT_LOOK_LEFT";
    Control[Control["INPUT_LOOK_RIGHT"] = 271] = "INPUT_LOOK_RIGHT";
    Control[Control["INPUT_LOOK_UP"] = 272] = "INPUT_LOOK_UP";
    Control[Control["INPUT_LOOK_DOWN"] = 273] = "INPUT_LOOK_DOWN";
    Control[Control["INPUT_SNIPER_ZOOM_IN"] = 274] = "INPUT_SNIPER_ZOOM_IN";
    Control[Control["INPUT_SNIPER_ZOOM_OUT"] = 275] = "INPUT_SNIPER_ZOOM_OUT";
    Control[Control["INPUT_SNIPER_ZOOM_IN_ALTERNATE"] = 276] = "INPUT_SNIPER_ZOOM_IN_ALTERNATE";
    Control[Control["INPUT_SNIPER_ZOOM_OUT_ALTERNATE"] = 277] = "INPUT_SNIPER_ZOOM_OUT_ALTERNATE";
    Control[Control["INPUT_VEH_MOVE_LEFT"] = 278] = "INPUT_VEH_MOVE_LEFT";
    Control[Control["INPUT_VEH_MOVE_RIGHT"] = 279] = "INPUT_VEH_MOVE_RIGHT";
    Control[Control["INPUT_VEH_MOVE_UP"] = 280] = "INPUT_VEH_MOVE_UP";
    Control[Control["INPUT_VEH_MOVE_DOWN"] = 281] = "INPUT_VEH_MOVE_DOWN";
    Control[Control["INPUT_VEH_GUN_LEFT"] = 282] = "INPUT_VEH_GUN_LEFT";
    Control[Control["INPUT_VEH_GUN_RIGHT"] = 283] = "INPUT_VEH_GUN_RIGHT";
    Control[Control["INPUT_VEH_GUN_UP"] = 284] = "INPUT_VEH_GUN_UP";
    Control[Control["INPUT_VEH_GUN_DOWN"] = 285] = "INPUT_VEH_GUN_DOWN";
    Control[Control["INPUT_VEH_LOOK_LEFT"] = 286] = "INPUT_VEH_LOOK_LEFT";
    Control[Control["INPUT_VEH_LOOK_RIGHT"] = 287] = "INPUT_VEH_LOOK_RIGHT";
    Control[Control["INPUT_REPLAY_START_STOP_RECORDING"] = 288] = "INPUT_REPLAY_START_STOP_RECORDING";
    Control[Control["INPUT_REPLAY_START_STOP_RECORDING_SECONDARY"] = 289] = "INPUT_REPLAY_START_STOP_RECORDING_SECONDARY";
    Control[Control["INPUT_SCALED_LOOK_LR"] = 290] = "INPUT_SCALED_LOOK_LR";
    Control[Control["INPUT_SCALED_LOOK_UD"] = 291] = "INPUT_SCALED_LOOK_UD";
    Control[Control["INPUT_SCALED_LOOK_UP_ONLY"] = 292] = "INPUT_SCALED_LOOK_UP_ONLY";
    Control[Control["INPUT_SCALED_LOOK_DOWN_ONLY"] = 293] = "INPUT_SCALED_LOOK_DOWN_ONLY";
    Control[Control["INPUT_SCALED_LOOK_LEFT_ONLY"] = 294] = "INPUT_SCALED_LOOK_LEFT_ONLY";
    Control[Control["INPUT_SCALED_LOOK_RIGHT_ONLY"] = 295] = "INPUT_SCALED_LOOK_RIGHT_ONLY";
    Control[Control["INPUT_REPLAY_MARKER_DELETE"] = 296] = "INPUT_REPLAY_MARKER_DELETE";
    Control[Control["INPUT_REPLAY_CLIP_DELETE"] = 297] = "INPUT_REPLAY_CLIP_DELETE";
    Control[Control["INPUT_REPLAY_PAUSE"] = 298] = "INPUT_REPLAY_PAUSE";
    Control[Control["INPUT_REPLAY_REWIND"] = 299] = "INPUT_REPLAY_REWIND";
    Control[Control["INPUT_REPLAY_FFWD"] = 300] = "INPUT_REPLAY_FFWD";
    Control[Control["INPUT_REPLAY_NEWMARKER"] = 301] = "INPUT_REPLAY_NEWMARKER";
    Control[Control["INPUT_REPLAY_RECORD"] = 302] = "INPUT_REPLAY_RECORD";
    Control[Control["INPUT_REPLAY_SCREENSHOT"] = 303] = "INPUT_REPLAY_SCREENSHOT";
    Control[Control["INPUT_REPLAY_HIDEHUD"] = 304] = "INPUT_REPLAY_HIDEHUD";
    Control[Control["INPUT_REPLAY_STARTPOINT"] = 305] = "INPUT_REPLAY_STARTPOINT";
    Control[Control["INPUT_REPLAY_ENDPOINT"] = 306] = "INPUT_REPLAY_ENDPOINT";
    Control[Control["INPUT_REPLAY_ADVANCE"] = 307] = "INPUT_REPLAY_ADVANCE";
    Control[Control["INPUT_REPLAY_BACK"] = 308] = "INPUT_REPLAY_BACK";
    Control[Control["INPUT_REPLAY_TOOLS"] = 309] = "INPUT_REPLAY_TOOLS";
    Control[Control["INPUT_REPLAY_RESTART"] = 310] = "INPUT_REPLAY_RESTART";
    Control[Control["INPUT_REPLAY_SHOWHOTKEY"] = 311] = "INPUT_REPLAY_SHOWHOTKEY";
    Control[Control["INPUT_REPLAY_CYCLEMARKERLEFT"] = 312] = "INPUT_REPLAY_CYCLEMARKERLEFT";
    Control[Control["INPUT_REPLAY_CYCLEMARKERRIGHT"] = 313] = "INPUT_REPLAY_CYCLEMARKERRIGHT";
    Control[Control["INPUT_REPLAY_FOVINCREASE"] = 314] = "INPUT_REPLAY_FOVINCREASE";
    Control[Control["INPUT_REPLAY_FOVDECREASE"] = 315] = "INPUT_REPLAY_FOVDECREASE";
    Control[Control["INPUT_REPLAY_CAMERAUP"] = 316] = "INPUT_REPLAY_CAMERAUP";
    Control[Control["INPUT_REPLAY_CAMERADOWN"] = 317] = "INPUT_REPLAY_CAMERADOWN";
    Control[Control["INPUT_REPLAY_SAVE"] = 318] = "INPUT_REPLAY_SAVE";
    Control[Control["INPUT_REPLAY_TOGGLETIME"] = 319] = "INPUT_REPLAY_TOGGLETIME";
    Control[Control["INPUT_REPLAY_TOGGLETIPS"] = 320] = "INPUT_REPLAY_TOGGLETIPS";
    Control[Control["INPUT_REPLAY_PREVIEW"] = 321] = "INPUT_REPLAY_PREVIEW";
    Control[Control["INPUT_REPLAY_TOGGLE_TIMELINE"] = 322] = "INPUT_REPLAY_TOGGLE_TIMELINE";
    Control[Control["INPUT_REPLAY_TIMELINE_PICKUP_CLIP"] = 323] = "INPUT_REPLAY_TIMELINE_PICKUP_CLIP";
    Control[Control["INPUT_REPLAY_TIMELINE_DUPLICATE_CLIP"] = 324] = "INPUT_REPLAY_TIMELINE_DUPLICATE_CLIP";
    Control[Control["INPUT_REPLAY_TIMELINE_PLACE_CLIP"] = 325] = "INPUT_REPLAY_TIMELINE_PLACE_CLIP";
    Control[Control["INPUT_REPLAY_CTRL"] = 326] = "INPUT_REPLAY_CTRL";
    Control[Control["INPUT_REPLAY_TIMELINE_SAVE"] = 327] = "INPUT_REPLAY_TIMELINE_SAVE";
    Control[Control["INPUT_REPLAY_PREVIEW_AUDIO"] = 328] = "INPUT_REPLAY_PREVIEW_AUDIO";
    Control[Control["INPUT_VEH_DRIVE_LOOK"] = 329] = "INPUT_VEH_DRIVE_LOOK";
    Control[Control["INPUT_VEH_DRIVE_LOOK2"] = 330] = "INPUT_VEH_DRIVE_LOOK2";
    Control[Control["INPUT_VEH_FLY_ATTACK2"] = 331] = "INPUT_VEH_FLY_ATTACK2";
    Control[Control["INPUT_RADIO_WHEEL_UD"] = 332] = "INPUT_RADIO_WHEEL_UD";
    Control[Control["INPUT_RADIO_WHEEL_LR"] = 333] = "INPUT_RADIO_WHEEL_LR";
    Control[Control["INPUT_VEH_SLOWMO_UD"] = 334] = "INPUT_VEH_SLOWMO_UD";
    Control[Control["INPUT_VEH_SLOWMO_UP_ONLY"] = 335] = "INPUT_VEH_SLOWMO_UP_ONLY";
    Control[Control["INPUT_VEH_SLOWMO_DOWN_ONLY"] = 336] = "INPUT_VEH_SLOWMO_DOWN_ONLY";
    Control[Control["INPUT_VEH_HYDRAULICS_CONTROL_TOGGLE"] = 337] = "INPUT_VEH_HYDRAULICS_CONTROL_TOGGLE";
    Control[Control["INPUT_VEH_HYDRAULICS_CONTROL_LEFT"] = 338] = "INPUT_VEH_HYDRAULICS_CONTROL_LEFT";
    Control[Control["INPUT_VEH_HYDRAULICS_CONTROL_RIGHT"] = 339] = "INPUT_VEH_HYDRAULICS_CONTROL_RIGHT";
    Control[Control["INPUT_VEH_HYDRAULICS_CONTROL_UP"] = 340] = "INPUT_VEH_HYDRAULICS_CONTROL_UP";
    Control[Control["INPUT_VEH_HYDRAULICS_CONTROL_DOWN"] = 341] = "INPUT_VEH_HYDRAULICS_CONTROL_DOWN";
    Control[Control["INPUT_VEH_HYDRAULICS_CONTROL_LR"] = 342] = "INPUT_VEH_HYDRAULICS_CONTROL_LR";
    Control[Control["INPUT_VEH_HYDRAULICS_CONTROL_UD"] = 343] = "INPUT_VEH_HYDRAULICS_CONTROL_UD";
    Control[Control["INPUT_SWITCH_VISOR"] = 344] = "INPUT_SWITCH_VISOR";
    Control[Control["INPUT_VEH_MELEE_HOLD"] = 345] = "INPUT_VEH_MELEE_HOLD";
    Control[Control["INPUT_VEH_MELEE_LEFT"] = 346] = "INPUT_VEH_MELEE_LEFT";
    Control[Control["INPUT_VEH_MELEE_RIGHT"] = 347] = "INPUT_VEH_MELEE_RIGHT";
    Control[Control["INPUT_MAP_POI"] = 348] = "INPUT_MAP_POI";
    Control[Control["INPUT_REPLAY_SNAPMATIC_PHOTO"] = 349] = "INPUT_REPLAY_SNAPMATIC_PHOTO";
    Control[Control["INPUT_VEH_CAR_JUMP"] = 350] = "INPUT_VEH_CAR_JUMP";
    Control[Control["INPUT_VEH_ROCKET_BOOST"] = 351] = "INPUT_VEH_ROCKET_BOOST";
    Control[Control["INPUT_VEH_PARACHUTE"] = 352] = "INPUT_VEH_PARACHUTE";
    Control[Control["INPUT_VEH_BIKE_WINGS"] = 353] = "INPUT_VEH_BIKE_WINGS";
    Control[Control["INPUT_VEH_FLY_BOMB_BAY"] = 354] = "INPUT_VEH_FLY_BOMB_BAY";
    Control[Control["INPUT_VEH_FLY_COUNTER"] = 355] = "INPUT_VEH_FLY_COUNTER";
    Control[Control["INPUT_VEH_TRANSFORM"] = 356] = "INPUT_VEH_TRANSFORM";
    Control[Control["MAX_INPUTS"] = 357] = "MAX_INPUTS";
    Control[Control["UNDEFINED_INPUT"] = -1] = "UNDEFINED_INPUT";
})(Control || (Control = {}));
;
class Color {
    constructor(red = 255, green = 255, blue = 255, alpha = 255) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }
}
class TextureDictionary {
    constructor(textureDict, textures) {
        this.textureDictionary = textureDict;
        this.textures = textures;
    }
    draw(textureName, screenX, screenY, scaleX, scaleY, color = new Color(255, 255, 255), heading = 0) {
        if (this.textures.indexOf(textureName) !== -1) {
            if (mp.game.graphics.hasStreamedTextureDictLoaded(this.textureDictionary) == false) {
                mp.game.graphics.requestStreamedTextureDict(this.textureDictionary, true);
            }
            mp.game.graphics.drawSprite(this.textureDictionary, textureName, screenX, screenY, scaleX, scaleY, heading, color.red, color.green, color.blue, color.alpha);
        }
    }
}
function drawText(text, position = [], color, font = 0, scale = [0.35, 0.35], isTextCenter = false) {
    mp.game.ui.setTextFont(font);
    mp.game.ui.setTextScale(scale[0] * MainMenu.SCREEN_RATIO_WIDTH, scale[1] * MainMenu.SCREEN_RATIO_HEIGHT);
    mp.game.ui.setTextColour(color.red, color.green, color.blue, color.alpha);
    mp.game.ui.setTextCentre(isTextCenter);
    mp.game.ui.setTextEntry("STRING");
    mp.game.ui.addTextComponentSubstringPlayerName(text);
    mp.game.ui.drawText(position[0], position[1]);
}
function getTextWidth(text, font = 0, scale = [0.35, 0.35]) {
    mp.game.ui.setTextFont(font);
    mp.game.ui.setTextScale(scale[0], scale[1]);
    mp.game.ui.setTextEntryForWidth("STRING");
    mp.game.ui.addTextComponentSubstringPlayerName(text);
    return mp.game.ui.getTextScreenWidth(true);
}
class Sound {
    constructor(audioName, audioRef = "HUD_FRONTEND_DEFAULT_SOUNDSET", soundId = -1, p3 = false, p4 = 0, p5 = true) {
        this.soundId = soundId;
        this.audioName = audioName;
        this.audioRef = audioRef;
        this.p3 = p3;
        this.p4 = p4;
        this.p5 = p5;
    }
    playSound() {
        mp.game.audio.playSound(this.soundId, this.audioName, this.audioRef, this.p3, this.p4, this.p5);
    }
}
class MenuPool {
    constructor() { }
    static getCurrentMenu() {
        let visibleMenus = MenuPool.MenuInstances.filter(value => value.isVisible);
        return visibleMenus[visibleMenus.length - 1];
    }
    static displaySubMenu(menu) {
        if (MenuPool.MenuInstances.indexOf(menu) == -1) {
            MenuPool.MenuInstances.push(menu);
        }
        menu.isVisible = true;
    }
    static removeSubMenu(menu) {
        if (MenuPool.MenuInstances.indexOf(menu) != -1) {
            MenuPool.MenuInstances.splice(MenuPool.MenuInstances.indexOf(menu), 1);
            menu.isVisible = false;
        }
    }
}
MenuPool.MenuInstances = [];
var MenuBadge;
(function (MenuBadge) {
    MenuBadge[MenuBadge["MEDAL_BRONZE"] = 0] = "MEDAL_BRONZE";
    MenuBadge[MenuBadge["MEDAL_GOLD"] = 1] = "MEDAL_GOLD";
    MenuBadge[MenuBadge["MEDAL_SILVER"] = 2] = "MEDAL_SILVER";
    MenuBadge[MenuBadge["MP_ALERTTRIANGLE"] = 3] = "MP_ALERTTRIANGLE";
    MenuBadge[MenuBadge["MP_HOSTCROWN"] = 4] = "MP_HOSTCROWN";
    MenuBadge[MenuBadge["MP_MEDAL_BRONZE"] = 5] = "MP_MEDAL_BRONZE";
    MenuBadge[MenuBadge["MP_MEDAL_GOLD"] = 6] = "MP_MEDAL_GOLD";
    MenuBadge[MenuBadge["MP_MEDAL_SILVER"] = 7] = "MP_MEDAL_SILVER";
    MenuBadge[MenuBadge["MP_SPECITEM_CASH"] = 8] = "MP_SPECITEM_CASH";
    MenuBadge[MenuBadge["MP_SPECITEM_COKE"] = 9] = "MP_SPECITEM_COKE";
    MenuBadge[MenuBadge["MP_SPECITEM_HEROIN"] = 10] = "MP_SPECITEM_HEROIN";
    MenuBadge[MenuBadge["MP_SPECITEM_METH"] = 11] = "MP_SPECITEM_METH";
    MenuBadge[MenuBadge["MP_SPECITEM_WEED"] = 12] = "MP_SPECITEM_WEED";
    MenuBadge[MenuBadge["SHOP_AMMO"] = 13] = "SHOP_AMMO";
    MenuBadge[MenuBadge["SHOP_ARMOUR"] = 14] = "SHOP_ARMOUR";
    MenuBadge[MenuBadge["SHOP_ARROWS_UPANDDOWN"] = 15] = "SHOP_ARROWS_UPANDDOWN";
    MenuBadge[MenuBadge["SHOP_BARBER"] = 16] = "SHOP_BARBER";
    MenuBadge[MenuBadge["SHOP_BOX_BLANK"] = 17] = "SHOP_BOX_BLANK";
    MenuBadge[MenuBadge["SHOP_BOX_CROSS"] = 18] = "SHOP_BOX_CROSS";
    MenuBadge[MenuBadge["SHOP_BOX_TICK"] = 19] = "SHOP_BOX_TICK";
    MenuBadge[MenuBadge["SHOP_CLOTHING"] = 20] = "SHOP_CLOTHING";
    MenuBadge[MenuBadge["SHOP_FRANKLIN"] = 21] = "SHOP_FRANKLIN";
    MenuBadge[MenuBadge["SHOP_GARAGE_BIKE"] = 22] = "SHOP_GARAGE_BIKE";
    MenuBadge[MenuBadge["SHOP_GARAGE"] = 23] = "SHOP_GARAGE";
    MenuBadge[MenuBadge["SHOP_GUNCLUB"] = 24] = "SHOP_GUNCLUB";
    MenuBadge[MenuBadge["SHOP_HEALTH"] = 25] = "SHOP_HEALTH";
    MenuBadge[MenuBadge["SHOP_LOCK"] = 26] = "SHOP_LOCK";
    MenuBadge[MenuBadge["SHOP_MAKEUP"] = 27] = "SHOP_MAKEUP";
    MenuBadge[MenuBadge["SHOP_MASK"] = 28] = "SHOP_MASK";
    MenuBadge[MenuBadge["SHOP_MICHAEL"] = 29] = "SHOP_MICHAEL";
    MenuBadge[MenuBadge["SHOP_NEW_STAR"] = 30] = "SHOP_NEW_STAR";
    MenuBadge[MenuBadge["SHOP_TATTOOS"] = 31] = "SHOP_TATTOOS";
    MenuBadge[MenuBadge["SHOP_TICK_ICON"] = 32] = "SHOP_TICK_ICON";
    MenuBadge[MenuBadge["SHOP_TREVOR"] = 33] = "SHOP_TREVOR";
})(MenuBadge || (MenuBadge = {}));
function MenuBadgeToSpriteName(badge, isHover = false) {
    let result = MenuBadge[badge].toString().toLowerCase();
    switch (badge) {
        case MenuBadge.SHOP_AMMO:
        case MenuBadge.SHOP_ARMOUR:
        case MenuBadge.SHOP_ARROWS_UPANDDOWN:
        case MenuBadge.SHOP_BARBER:
        case MenuBadge.SHOP_CLOTHING:
        case MenuBadge.SHOP_FRANKLIN:
        case MenuBadge.SHOP_GARAGE_BIKE:
        case MenuBadge.SHOP_GARAGE:
        case MenuBadge.SHOP_GUNCLUB:
        case MenuBadge.SHOP_HEALTH:
        case MenuBadge.SHOP_MAKEUP:
        case MenuBadge.SHOP_MASK:
        case MenuBadge.SHOP_MICHAEL:
        case MenuBadge.SHOP_TATTOOS:
        case MenuBadge.SHOP_TREVOR:
            return isHover ? result + "_icon_a" : result + "_icon_b";
        case MenuBadge.SHOP_BOX_BLANK:
        case MenuBadge.SHOP_BOX_CROSS:
        case MenuBadge.SHOP_BOX_TICK:
            return isHover ? result + "b" : result;
        default:
            return result;
    }
}
const CommonMenuTexture = new TextureDictionary("commonmenu", [
    "arrowleft",
    "arrowright",
    "bettingbox_centre",
    "bettingbox_left",
    "bettingbox_right",
    "common_medal",
    "gradient_bgd",
    "gradient_nav",
    "header_gradient_script",
    "interaction_bgd",
    "medal_bronze",
    "medal_gold",
    "medal_silver",
    "mp_alerttriangle",
    "mp_hostcrown",
    "mp_medal_bronze",
    "mp_medal_gold",
    "mp_medal_silver",
    "mp_specitem_cash",
    "mp_specitem_coke",
    "mp_specitem_heroin",
    "mp_specitem_meth",
    "mp_specitem_weed",
    "shop_ammo_icon_a",
    "shop_ammo_icon_b",
    "shop_armour_icon_a",
    "shop_armour_icon_b",
    "shop_arrows_upanddown",
    "shop_barber_icon_a",
    "shop_barber_icon_b",
    "shop_box_blank",
    "shop_box_blankb",
    "shop_box_cross",
    "shop_box_crossb",
    "shop_box_tick",
    "shop_box_tickb",
    "shop_clothing_icon_a",
    "shop_clothing_icon_b",
    "shop_franklin_icon_a",
    "shop_franklin_icon_b",
    "shop_garage_bike_icon_a",
    "shop_garage_bike_icon_b",
    "shop_garage_icon_a",
    "shop_garage_icon_b",
    "shop_gunclub_icon_a",
    "shop_gunclub_icon_b",
    "shop_health_icon_a",
    "shop_health_icon_b",
    "shop_lock",
    "shop_makeup_icon_a",
    "shop_makeup_icon_b",
    "shop_mask_icon_a",
    "shop_mask_icon_b",
    "shop_michael_icon_a",
    "shop_michael_icon_b",
    "shop_new_star",
    "shop_tattoos_icon_a",
    "shop_tattoos_icon_b",
    "shop_tick_icon",
    "shop_trevor_icon_a",
    "shop_trevor_icon_b"
]);
const SOUND_SELECT = new Sound("SELECT");
const SOUND_BACK = new Sound("BACK");
const SOUND_NAV_LEFT_RIGHT = new Sound("NAV_LEFT_RIGHT");
const SOUND_NAV_UP_DOWN = new Sound("NAV_UP_DOWN");
class MenuItem {
    constructor(displayText, data, caption = "", badge = NaN, textColor = new Color(255, 255, 255, 240), backgroundColor = new Color(0, 0, 0, 120), hoverTextColor = new Color(0, 0, 0, 240), hoverBackgroundColor = new Color(255, 255, 255, 170)) {
        this.displayText = displayText;
        this.data = data;
        this.caption = caption;
        this.badge = badge;
        this._textColor = textColor;
        this._backgroundColor = backgroundColor;
        this._hoverTextColor = hoverTextColor;
        this._hoverBackgroundColor = hoverBackgroundColor;
        this._isSelect = false;
        this.onClickEvents = [];
        this.onSelectEvents = [];
    }
    set isSelect(value) {
        this._isSelect = value;
        if (this._isSelect && !(this instanceof CloseMenuItem)) {
            this.onSelectEvents.forEach(event => {
                event.trigger(this instanceof ListMenuItem ? this.data[this.dataCurrentIndex] : this.data);
            });
            let currentMenuInstance = MenuPool.getCurrentMenu();
            if (currentMenuInstance.onEventMenu != null && typeof currentMenuInstance.onEventMenu.select !== "undefined") {
                currentMenuInstance.onEventMenu.select(this, this instanceof ListMenuItem ? this.data[this.dataCurrentIndex] : this.data);
            }
        }
    }
    addOnClickEvent(onClickEvent) {
        this.onClickEvents.push(onClickEvent);
    }
    addOnSelectEvent(onSelectEvent) {
        this.onSelectEvents.push(onSelectEvent);
    }
    render(x, y, yCaption) {
        this.draw(x, y, yCaption);
        if (this._isSelect && Date.now() - MainMenu.CONTROL_TICK_TIME_MS > MainMenu.LAST_TICK_TIME) {
            if (mp.game.controls.isControlJustReleased(0, Control.INPUT_FRONTEND_ACCEPT)) {
                SOUND_SELECT.playSound();
                this.onClickEvents.forEach(event => {
                    event.trigger(this instanceof ListMenuItem ? this.data[this.dataCurrentIndex] : this.data);
                });
                if (!(this instanceof CloseMenuItem)) {
                    let currentMenuInstance = MenuPool.getCurrentMenu();
                    if (currentMenuInstance.onEventMenu != null && typeof currentMenuInstance.onEventMenu.click !== "undefined") {
                        currentMenuInstance.onEventMenu.click(this, this instanceof ListMenuItem ? this.data[this.dataCurrentIndex] : this.data);
                    }
                }
                MainMenu.LAST_TICK_TIME = Date.now();
            }
        }
    }
    draw(x, y, yCaption) {
        mp.game.graphics.drawRect(x, y + MainMenu.MENU_DRAW_OFFSET_Y, MainMenu.MENU_WIDTH, MainMenu.MENU_HEIGHT, this.backgroundColor.red, this.backgroundColor.green, this.backgroundColor.blue, this.backgroundColor.alpha);
        let xOffset = x - MainMenu.MENU_DRAW_OFFSET_X + (0.004 * MainMenu.SCREEN_RATIO_WIDTH);
        if (!isNaN(this.badge)) {
            CommonMenuTexture.draw(MenuBadgeToSpriteName(this.badge, this._isSelect), x - MainMenu.MENU_DRAW_OFFSET_X + (0.015 * MainMenu.SCREEN_RATIO_WIDTH), y + MainMenu.MENU_DRAW_OFFSET_Y, (0.025 * MainMenu.SCREEN_RATIO_WIDTH), (0.035 * MainMenu.SCREEN_RATIO_HEIGHT), new Color(160, 160, 160), 0);
            xOffset += (0.023 * MainMenu.SCREEN_RATIO_WIDTH);
        }
        drawText(this.displayText, [xOffset, y + (0.005 * MainMenu.SCREEN_RATIO_HEIGHT)], this.textColor);
        if (this._isSelect && this.caption.length > 0) {
            let numberOfLine = Math.ceil(getTextWidth(this.caption) / MainMenu.MENU_WIDTH);
            let textLengthPerLine = this.caption.length / numberOfLine;
            let textureHeight = MainMenu.MENU_HEIGHT * numberOfLine;
            CommonMenuTexture.draw("gradient_nav", x, yCaption + textureHeight / 2, MainMenu.MENU_WIDTH, textureHeight, new Color(this._backgroundColor.red, this._backgroundColor.green, this._backgroundColor.blue, 220), 270);
            for (let i = 0; i < numberOfLine; i++) {
                drawText(this.caption.substring(i * textLengthPerLine, (i + 1) * textLengthPerLine), [x - MainMenu.MENU_DRAW_OFFSET_X + (0.004 * MainMenu.SCREEN_RATIO_WIDTH), yCaption + (0.005 * MainMenu.SCREEN_RATIO_HEIGHT) + i * MainMenu.MENU_HEIGHT], this._textColor);
            }
        }
    }
    get hoverTextColor() {
        return this._hoverTextColor;
    }
    set hoverTextColor(value) {
        this._hoverTextColor = value;
    }
    get hoverBackgroundColor() {
        return this._hoverBackgroundColor;
    }
    set hoverBackgroundColor(value) {
        this._hoverBackgroundColor = value;
    }
    get textColor() {
        return this._isSelect ? this._hoverTextColor : this._textColor;
    }
    set textColor(value) {
        this._textColor = value;
    }
    get backgroundColor() {
        return this._isSelect ? this._hoverBackgroundColor : this._backgroundColor;
    }
    set backgroundColor(value) {
        this._backgroundColor = value;
    }
}
class TextMenuItem extends MenuItem {
}
class CheckboxMenuItem extends MenuItem {
    constructor(displayText, data = false, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor) {
        super(displayText, data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor);
        this.addOnClickEvent({
            trigger: data => {
                this.data = !this.data;
            }
        });
    }
    ;
    draw(x, y, yCaption) {
        super.draw(x, y, yCaption);
        CommonMenuTexture.draw(this.data ? "shop_box_tick" : "shop_box_blank", x + MainMenu.MENU_DRAW_OFFSET_X - (0.015 * MainMenu.SCREEN_RATIO_WIDTH), y + MainMenu.MENU_DRAW_OFFSET_Y, (0.025 * MainMenu.SCREEN_RATIO_WIDTH), (0.035 * MainMenu.SCREEN_RATIO_HEIGHT), new Color(), 0);
    }
}
class ListMenuItem extends MenuItem {
    constructor(displayText, data, defaultIndex = 0, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor) {
        super(displayText, data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor);
        this.onChangeEvents = [];
        this.firstRender = true;
        this.defaultIndex = defaultIndex;
    }
    addOnChangeEvent(onChangeEvent) {
        this.onChangeEvents.push(onChangeEvent);
    }
    render(x, y, yCaption) {
        if (this.data.length > 0) {
            if (this.firstRender) {
                this.setToItem(this.defaultIndex, false);
                this.firstRender = false;
            }
            if (this._isSelect && Date.now() - MainMenu.CONTROL_TICK_TIME_MS > MainMenu.LAST_TICK_TIME) {
                let newIndex = NaN;
                if (mp.game.controls.isControlPressed(0, Control.INPUT_CELLPHONE_RIGHT)) {
                    this.setToItem(this.dataCurrentIndex + 1);
                }
                else {
                    if (mp.game.controls.isControlPressed(0, Control.INPUT_CELLPHONE_LEFT)) {
                        this.setToItem(this.dataCurrentIndex - 1);
                    }
                }
            }
        }
        super.render(x, y, yCaption);
    }
    draw(x, y, yCaption) {
        super.draw(x, y, yCaption);
        if (this.data.length > 0) {
            if (!isNaN(this.dataCurrentIndex) && this.data[this.dataCurrentIndex].displayText != null) {
                let xRightArrowPosition = x + MainMenu.MENU_DRAW_OFFSET_X - (0.015 * MainMenu.SCREEN_RATIO_WIDTH);
                let xLeftArrowPosition = xRightArrowPosition - getTextWidth(this.data[this.dataCurrentIndex].displayText) - (0.015 * MainMenu.SCREEN_RATIO_WIDTH);
                CommonMenuTexture.draw("arrowleft", xLeftArrowPosition, y + MainMenu.MENU_DRAW_OFFSET_Y, (0.025 * MainMenu.SCREEN_RATIO_WIDTH), (0.035 * MainMenu.SCREEN_RATIO_HEIGHT), this.textColor, 0);
                CommonMenuTexture.draw("arrowright", xRightArrowPosition, y + MainMenu.MENU_DRAW_OFFSET_Y, (0.025 * MainMenu.SCREEN_RATIO_WIDTH), (0.035 * MainMenu.SCREEN_RATIO_HEIGHT), this.textColor, 0);
                drawText(this.data[this.dataCurrentIndex].displayText, [(xLeftArrowPosition + xRightArrowPosition) / 2, y + (0.005 * MainMenu.SCREEN_RATIO_HEIGHT)], this.textColor, (0.025 * MainMenu.SCREEN_RATIO_WIDTH), [0.35, 0.35], true);
            }
        }
    }
    setToItem(newIndex, withSound = true) {
        if (newIndex < 0) {
            this.dataCurrentIndex = this.data.length - 1;
        }
        else {
            this.dataCurrentIndex = newIndex % this.data.length;
        }
        if (withSound) {
            SOUND_NAV_LEFT_RIGHT.playSound();
        }
        MainMenu.LAST_TICK_TIME = Date.now();
        this.onChangeEvents.forEach(value => {
            value.trigger(this.data[this.dataCurrentIndex]);
        });
    }
}
class SliderMenuItem extends MenuItem {
    constructor(displayText, min, max, step, data = NaN, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor) {
        super(displayText, data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor);
        this.min = min;
        this.max = max;
        this.step = step;
        if (isNaN(data)) {
            this.data = Math.floor((this.min + this.max) / 2);
        }
        this.firstRender = true;
        this.onChangeEvents = [];
    }
    ;
    addOnChangeEvent(onChangeEvent) {
        this.onChangeEvents.push(onChangeEvent);
    }
    render(x, y, yCaption) {
        if (this.firstRender) {
            this.setToValue(this.data, false);
            this.firstRender = false;
        }
        if (this._isSelect && Date.now() - MainMenu.CONTROL_TICK_TIME_MS > MainMenu.LAST_TICK_TIME) {
            if (mp.game.controls.isControlPressed(0, Control.INPUT_CELLPHONE_RIGHT)) {
                this.setToValue(this.data + this.step);
            }
            else {
                if (mp.game.controls.isControlPressed(0, Control.INPUT_CELLPHONE_LEFT)) {
                    this.setToValue(this.data - this.step);
                }
            }
        }
        super.render(x, y, yCaption);
    }
    draw(x, y, yCaption) {
        super.draw(x, y, yCaption);
        let xMargin = (0.015 * MainMenu.SCREEN_RATIO_WIDTH);
        let xOffset = x + MainMenu.MENU_DRAW_OFFSET_X - xMargin;
        let sliderWidth = MainMenu.MENU_WIDTH / 2.5;
        let sliderHeight = MainMenu.MENU_HEIGHT / 4;
        let xPosition = xOffset - (sliderWidth / 2);
        mp.game.graphics.drawRect(xPosition, y + MainMenu.MENU_DRAW_OFFSET_Y, sliderWidth, sliderHeight, 52, 73, 94, 255);
        let xDataPosition = xOffset - sliderWidth + (sliderWidth / ((this.max - this.min) / this.step) * ((this.data + Math.abs(this.min)) / this.step));
        mp.game.graphics.drawRect(xDataPosition, y + MainMenu.MENU_DRAW_OFFSET_Y, 0.004, sliderHeight * 2, this.textColor.red, this.textColor.green, this.textColor.blue, this.textColor.alpha);
        let arrowWidth = (0.015 * MainMenu.SCREEN_RATIO_WIDTH);
        let xLeftArrowPosition = xOffset - sliderWidth - (arrowWidth / 2);
        CommonMenuTexture.draw("arrowleft", xLeftArrowPosition, y + MainMenu.MENU_DRAW_OFFSET_Y, arrowWidth, (0.025 * MainMenu.SCREEN_RATIO_HEIGHT), this.textColor, 0);
        CommonMenuTexture.draw("arrowright", xOffset + (arrowWidth / 2), y + MainMenu.MENU_DRAW_OFFSET_Y, arrowWidth, (0.025 * MainMenu.SCREEN_RATIO_HEIGHT), this.textColor, 0);
    }
    setToValue(newValue, withSound = true) {
        if (newValue < this.min) {
            this.data = this.max;
        }
        else {
            if (newValue > this.max) {
                this.data = this.min;
            }
            else {
                this.data = newValue;
            }
        }
        if (withSound) {
            SOUND_NAV_LEFT_RIGHT.playSound();
        }
        MainMenu.LAST_TICK_TIME = Date.now();
        this.onChangeEvents.forEach(value => {
            value.trigger(this.data);
        });
    }
}
class CloseMenuItem extends TextMenuItem {
    constructor(displayText, data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor) {
        super(displayText, data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor);
    }
}
class Menu {
    constructor(isVisible = true) {
        this.menuItems = [];
        this.currentIndexMenuItems = 0;
        this.onEventMenu = null;
        this._isVisible = isVisible;
        MenuPool.MenuInstances.push(this);
    }
    add(menuItem) {
        this.menuItems.push(menuItem);
        if (menuItem instanceof CloseMenuItem) {
            menuItem.addOnClickEvent({
                trigger: () => {
                    this.isVisible = false;
                }
            });
        }
    }
    setEventMenu(eventMenu) {
        this.onEventMenu = eventMenu;
    }
    render(x, y) {
        this.draw(x, y);
    }
    draw(x, y) {
        if (this.currentIndexMenuItems >= MainMenu.MAX_MENU_DISPLAY) {
            CommonMenuTexture.draw("gradient_nav", x, y + MainMenu.MENU_ARROW_DOWN_HEIGHT / 2, MainMenu.MENU_WIDTH, MainMenu.MENU_ARROW_DOWN_HEIGHT, new Color(0, 0, 0, 190), 90);
            CommonMenuTexture.draw("arrowleft", x, y + MainMenu.MENU_ARROW_DOWN_HEIGHT / 2, (0.015 * MainMenu.SCREEN_RATIO_WIDTH), (0.025 * MainMenu.SCREEN_RATIO_HEIGHT), new Color(255, 255, 255, 200), 90);
            y += MainMenu.MENU_ARROW_DOWN_HEIGHT;
        }
        let i = Math.max(0, this.currentIndexMenuItems + 1 - MainMenu.MAX_MENU_DISPLAY);
        let to = Math.min(i + MainMenu.MAX_MENU_DISPLAY, this.menuItems.length);
        let captionYOffset = y + ((to - i) * MainMenu.MENU_HEIGHT) // + (0.02 * MainMenu.SCREEN_RATIO_HEIGHT);
        for (; i < to; i++) {
            this.menuItems[i].render(x, y, captionYOffset);
            y += MainMenu.MENU_HEIGHT;
        }
        if (this.menuItems.length > MainMenu.MAX_MENU_DISPLAY && this.currentIndexMenuItems < this.menuItems.length - 1) {
            CommonMenuTexture.draw("gradient_nav", x, y + MainMenu.MENU_ARROW_DOWN_HEIGHT / 2, MainMenu.MENU_WIDTH, MainMenu.MENU_ARROW_DOWN_HEIGHT, new Color(0, 0, 0, 190), 270);
            CommonMenuTexture.draw("arrowleft", x, y + MainMenu.MENU_ARROW_DOWN_HEIGHT / 2, (0.015 * MainMenu.SCREEN_RATIO_WIDTH), (0.025 * MainMenu.SCREEN_RATIO_HEIGHT), new Color(255, 255, 255, 200), 270);
        }
    }
    get isVisible() {
        return this._isVisible;
    }
    set isVisible(value) {
        this._isVisible = value;
        if (value) {
            this.setToItem(0);
            SOUND_NAV_LEFT_RIGHT.playSound();
        }
        else {
            this.menuItems[this.currentIndexMenuItems].isSelect = false;
            SOUND_BACK.playSound();
        }
    }
    setToItem(newIndex, withSound = true) {
        if (this.menuItems.length > 0) {
            this.menuItems[this.currentIndexMenuItems].isSelect = false;
            if (newIndex < 0) {
                newIndex = this.menuItems.length - 1;
            }
            else {
                newIndex %= this.menuItems.length;
            }
            if (withSound) {
                SOUND_NAV_UP_DOWN.playSound();
            }
            this.currentIndexMenuItems = newIndex;
            this.menuItems[this.currentIndexMenuItems].isSelect = true;
            MainMenu.LAST_TICK_TIME = new Date().getTime();
        }
    }
}
class SubMenuItem extends MenuItem {
    constructor(displayText, data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor) {
        super(displayText, data, caption, badge, textColor, backgroundColor, hoverTextColor, hoverBackgroundColor);
        this.menu = new Menu(false);
    }
    add(menuItem) {
        this.menu.add(menuItem);
    }
    render(x, y, yCaption) {
        if (this._isSelect) {
            this.menu.render(x + MainMenu.MENU_WIDTH, y);
            if (Date.now() - MainMenu.CONTROL_TICK_TIME_MS > MainMenu.LAST_TICK_TIME) {
                if (mp.game.controls.isControlPressed(0, Control.INPUT_CELLPHONE_RIGHT)) {
                    MenuPool.displaySubMenu(this.menu);
                }
                else {
                    if (mp.game.controls.isControlPressed(0, Control.INPUT_CELLPHONE_LEFT)) {
                        MenuPool.removeSubMenu(this.menu);
                        MainMenu.LAST_TICK_TIME = Date.now();
                    }
                }
            }
        }
        this.draw(x, y, yCaption);
    }
    draw(x, y, yCaption) {
        super.draw(x, y, yCaption);
        CommonMenuTexture.draw("arrowright", x + MainMenu.MENU_DRAW_OFFSET_X - (0.015 * MainMenu.SCREEN_RATIO_WIDTH), y + MainMenu.MENU_DRAW_OFFSET_Y, (0.025 * MainMenu.SCREEN_RATIO_WIDTH), (0.035 * MainMenu.SCREEN_RATIO_HEIGHT), this.textColor, 0);
    }
}
class MainMenu extends Menu {
    constructor(title = "", isVisible = true) {
        super(isVisible);
        this.title = title;
        this.firstRender = true;
        this.textureDict = CommonMenuTexture;
        this.textureSprite = "interaction_bgd"
    }
    set title(value) {
        this._title = value;
    }
    setTitleTexture(dict, sprite) {
        this.textureDict = new TextureDictionary(dict, [sprite]);
        this.textureSprite = sprite;
    }
    render(x, y) {
        if (this.isVisible) {
            if (this.firstRender) {
                this.setToItem(0, false);
                this.firstRender = false;
            }
            this.setResolutionRatio();
            if (x < MainMenu.MENU_DRAW_OFFSET_X) {
                x += MainMenu.MENU_DRAW_OFFSET_X;
            }
            if (y < MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y) {
                y += MainMenu.MAIN_MENU_HEIGHT;
            }
            x = Math.min(x, 1 - MainMenu.MENU_DRAW_OFFSET_X);
            y = Math.min(y, 1 - MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y);
            this.textureDict.draw(this.textureSprite, x, y, MainMenu.MENU_WIDTH, MainMenu.MAIN_MENU_HEIGHT, new Color(255, 255, 255, 255), 0);
            drawText(this._title, [x, y - (MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y / 2)], new Color(), 1, [1, 1], true);
            y += (MainMenu.MAIN_MENU_HEIGHT / 2);
            if (Date.now() - MainMenu.CONTROL_TICK_TIME_MS > MainMenu.LAST_TICK_TIME) {
                if (mp.game.controls.isControlPressed(0, Control.INPUT_CELLPHONE_DOWN)) {
                    let menuInstance = MenuPool.getCurrentMenu();
                    menuInstance.setToItem(menuInstance.currentIndexMenuItems + 1);
                }
                else {
                    if (mp.game.controls.isControlPressed(0, Control.INPUT_CELLPHONE_UP)) {
                        let menuInstance = MenuPool.getCurrentMenu();
                        menuInstance.setToItem(menuInstance.currentIndexMenuItems - 1);
                    }
                }
            }
            super.render(x, y);
        }
    }
    open() {
        this.isVisible = true;
    }
    close() {
        this.isVisible = false;
    }
    setResolutionRatio() {
        MainMenu.SCREEN_RATIO_WIDTH = 1024 / mp.game.graphics.getScreenActiveResolution(0, 0).x;
        MainMenu.SCREEN_RATIO_HEIGHT = 768 / mp.game.graphics.getScreenActiveResolution(0, 0).y;
        MainMenu.MENU_WIDTH = 0.27 * MainMenu.SCREEN_RATIO_WIDTH;
        MainMenu.MENU_WIDTH = Math.max(MainMenu.MENU_WIDTH, getTextWidth(this._title, 1, [1, 1]) + MainMenu.MENU_WIDTH / 5);
        MainMenu.MENU_HEIGHT = 0.04 * MainMenu.SCREEN_RATIO_HEIGHT;
        MainMenu.MAIN_MENU_HEIGHT = MainMenu.MENU_HEIGHT * 2.5;
        MainMenu.MENU_DRAW_OFFSET_X = MainMenu.MENU_WIDTH / 2;
        MainMenu.MENU_DRAW_OFFSET_Y = MainMenu.MENU_HEIGHT / 2;
        MainMenu.MAIN_MENU_HEIGHT_OFFSET_Y = MainMenu.MAIN_MENU_HEIGHT / 2;
        MainMenu.MENU_ARROW_DOWN_HEIGHT = MainMenu.MENU_HEIGHT / 3;
    }
}
MainMenu.MAX_MENU_DISPLAY = 8;
MainMenu.CONTROL_TICK_TIME_MS = 150;
MainMenu.LAST_TICK_TIME = Date.now();

exports = {
    Color: Color,
    TextureDictionary: TextureDictionary,
    MenuPool: MenuPool,
    MenuItem: MenuItem,
    TextMenuItem: TextMenuItem,
    CheckboxMenuItem: CheckboxMenuItem,
    ListMenuItem: ListMenuItem,
    SliderMenuItem: SliderMenuItem,
    CloseMenuItem: CloseMenuItem,
    Menu: Menu,
    SubMenuItem: SubMenuItem,
    MainMenu: MainMenu,
}
