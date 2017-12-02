export interface Killmail {
  killmail_id: number;
  killmail_time: string;
  solar_system_id: number;

  victim: Victim;
  attackers: Attacker[];
  zkb: Zkb;
}

export interface Victim {
  damage_taken: number;
  ship_type_id: number;
  character_id: number;
  corporation_id: number;
  alliance_id: number;
  items: any[];
  position: {
    x: number;
    y: number;
    z: number;
  };
}

export interface Attacker {
  security_status: number;
  final_blow: boolean;
  damage_done: number;
  character_id: number;
  corporation_id: number;
  ship_type_id: number;
  weapon_type_id: number;
}

export interface Zkb {
  locationID: number;
  hash: string;
  fittedValue: number;
  totalValue: number;
  points: number;
  npc: boolean;
  solo: boolean;
  awox: boolean;
}
