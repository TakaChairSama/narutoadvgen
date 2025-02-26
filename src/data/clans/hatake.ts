import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const HATAKE_FEATURES: ClanFeature[] = [
  {
    name: 'White Chakra',
    description:
      'You can channel White Chakra to enhance your lightning techniques. When you cast a jutsu with the Lightning Release keyword, you can add your proficiency bonus to the damage roll.',
    level: 1,
  },
  {
    name: 'Lightning Reflexes',
    description:
      'You gain advantage on Dexterity saving throws against effects that you can see, such as traps and spells.',
    level: 3,
  },
  {
    name: 'Chakra Surge',
    description:
      'As a reaction, when you take damage, you can spend 2 chakra to reduce the damage by an amount equal to your level.',
    level: 7,
  },
];

export const HATAKE_JUTSU: ClanJutsu[] = [
  {
    name: 'Spark of Foresight',
    rank: 'D',
    chakraCost: 3,
    description:
      'A quick burst of white chakra enhances perception, granting a brief glimpse into the immediate future, making the user incredibly difficult to surprise or deceive.',
    components: ['HS', 'CM'],
    castingTime: '1 Reaction',
    range: 'Self',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Gain advantage on the next Intelligence (Insight) or Wisdom (Perception) check you make within the next minute. Additionally, for the next minute, you are aware of the intentions of any creature within 30 feet that is actively trying to deceive or ambush you (DM’s discretion). You do not gain access to their thoughts, but you can sense their malicious intent.',
    ],
  },
  {
    name: 'White Lightning Armor',
    rank: 'C',
    chakraCost: 8,
    description:
      'Envelop yourself in a shimmering white lightning aura, offering substantial offense and defense, making you a dangerous foe in close combat.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: '1 minute',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Gain +3 to AC.',
      'Any creature that hits you with a melee attack takes 2d8 lightning damage.',
      'While active, your movement speed is reduced by 5 feet. However, you gain advantage on saving throws against being grappled or restrained.',
    ],
  },
  {
    name: 'Piercing White Lightning Spear',
    rank: 'B',
    chakraCost: 14,
    description:
      'Channel white chakra to create a concentrated bolt of lightning that pierces through targets with incredible precision, capable of disabling or even killing weaker opponents outright.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Make a ranged ninjutsu attack against one target.  The attack deals 6d10 lightning damage.',
      'If the attack hits, the lightning pierces through the target and can strike a second creature within 10 feet of the first. The second creature makes a Dexterity saving throw or takes 3d8 lightning damage and is stunned until the end of their next turn.',
      'Higher ranks: +2d10 damage to the primary target and +1d8 to the secondary target per rank.',
    ],
  },
  {
    name: 'Wrath of the White Heavens',
    rank: 'A',
    chakraCost: 24,
    description:
      'Unleash the full might of white chakra, summoning a devastating storm of pure lightning from the heavens, capable of obliterating entire squads of enemies.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '120 feet (30-foot radius cylinder)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'A pillar of white lightning descends from the sky, striking a point you can see within range.',
      'Creatures in the area must make a Dexterity saving throw.',
      'On a failed save, they take 10d12 lightning damage, are knocked prone, and are stunned until the end of your next turn.',
      'On a successful save, they take half damage and are not knocked prone or stunned.',
      'At the start of your next turn, three smaller bolts of lightning strike random points within the initial area, each dealing 5d10 lightning damage to any creature caught in the blast.  No saving throw is allowed against these secondary strikes.',
      'Higher ranks: +2d12 damage to the initial strike and +1d10 to the secondary strikes per rank.',
    ],
  },
];

export const HATAKE_REQUIREMENTS = {
  abilityScores: {
    Intelligence: 13,
    Dexterity: 13,
  },
  features: ['Must possess the Hatake clan techniques'],
  restrictions: ['Cannot use jutsu that require a different chakra nature'],
};
