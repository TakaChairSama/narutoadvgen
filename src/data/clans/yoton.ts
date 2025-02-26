import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const YOTON_FEATURES: ClanFeature[] = [
  {
    name: 'Lava Skin',
    description:
      'You have resistance to fire damage and immunity to being burned. Your unarmed strikes deal an additional 1d4 fire damage, and you can walk on hot surfaces without taking damage.',
    level: 1,
  },
  {
    name: 'Molten Armor',
    description:
      'When hit by an attack, use your reaction and spend 2 chakra to coat yourself in lava. Until the start of your next turn, you have +3 AC and attackers that hit you with melee attacks take 2d6 fire damage.',
    level: 3,
    chakraCost: 2,
  },
  {
    name: 'Magma Control',
    description:
      'As an action, create a 15-foot radius pool of lava. The area becomes difficult terrain, and creatures that enter or start their turn there take 3d6 fire damage. The lava remains for 1 minute.',
    level: 7,
  },
];

export const YOTON_JUTSU: ClanJutsu[] = [
  {
    name: 'Lava Release: Lava Stream',
    rank: 'D',
    chakraCost: 5,
    description:
      'Combines Fire and Earth Release Chakra to release a stream of lava in a cone, damaging and burning creatures in its path.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (20-foot cone)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Earth Release', 'Fire Release'],
    effects: [
      'Creatures in the cone must make a Dexterity saving throw.',
      'On a failed save, the target takes 2d6 fire damage and 2d6 earth damage and is burned.',
      'On a successful save, the target takes half damage and is not burned.',
      'At Higher Ranks: Increase cost by 3, damage by 1d6 of each type, and range by 10 feet per rank above D.',
    ],
  },
  {
    name: 'Lava Release: Lava Rock',
    rank: 'D',
    chakraCost: 4,
    description:
      'Combines Fire and Earth Release Chakra to launch a mass of lava at a target, dealing damage and splashing outwards.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Earth Release', 'Fire Release', 'Clash'],
    effects: [
      'Make a ranged ninjutsu attack against a target within range.',
      'On a hit, deal 2d8 fire damage and 2d8 earth damage.',
      'Creatures within 10 feet of the original target must make a Dexterity saving throw.',
      'On a failed save, those creatures take 1d6 fire damage and 1d6 earth damage.',
      'At Higher Ranks: Increase cost by 3, attack damage by 1d8, and splash damage by 1d6 of each type per rank above D.',
    ],
  },
  {
    name: 'Lava Release: Rubber Ball',
    rank: 'C',
    chakraCost: 7,
    description:
      'Quickly spits out a blob of rubber to protect a target, granting temporary hit points and potentially pushing back attackers.',
    components: ['HS', 'CM'],
    castingTime: '1 Reaction (when an ally or object is targeted)',
    range: '30 feet',
    duration: '1 Round',
    keywords: ['Hijutsu', 'Ninjutsu', 'Earth Release', 'Fire Release'],
    effects: [
      'The target gains 20 temporary hit points until the beginning of their next turn.',
      'If the target was targeted by a melee attack, the attacker makes a Strength check vs your Ninjutsu save DC.',
      'On a failed check, the attacker is pushed back 15 feet.',
      'At Higher Ranks: Increase cost by 3 and temporary hit points by 10 per rank above C.',
    ],
  },
  {
    name: 'Lava Release: Expanding Flame Rings',
    rank: 'C',
    chakraCost: 7,
    description:
      'Augments a shuriken or chakram with Lava Release Chakra, turning it into a fiery projectile that explodes on impact.',
    components: ['HS', 'CM', 'W (any Shuriken or Chakram)'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instant',
    keywords: [
      'Hijutsu',
      'Ninjutsu',
      'Bukijutsu',
      'Earth Release',
      'Fire Release',
    ],
    effects: [
      'Make a ranged Ninjutsu (or Taijutsu) attack.',
      'On a hit, deal weapon damage + 3d10 fire damage.',
      'Creatures within 10 feet of the target (excluding you) must make a Dexterity saving throw.',
      'On a failed save, those creatures take 2d10 fire damage.',
      'If a shuriken is used, reduce ammunition die by 1 step.',
      'At Higher Ranks: Increase cost by 3 and damage by 2d10 per rank above C.',
    ],
  },
  {
    name: 'Lava Release: Lava Chakra Mode',
    rank: 'B',
    chakraCost: 11,
    description:
      'Coats the body in Lava Release Chakra, granting numerous benefits including increased AC, temporary hit points, and resistances.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Earth Release', 'Fire Release'],
    effects: [
      'Cannot lose concentration due to damage.',
      '+2 bonus to AC.',
      'Gain 10 temporary hit points at the beginning of each turn.',
      'Immunity to fire and earth damage.',
      'Resistance to bludgeoning, piercing, slashing, and wind damage.',
      'Vulnerability to cold damage.',
      'Counts as an Earthen construct.',
      'Adjacent creatures of your choice take 5 fire damage at the end of each turn (ignores DR).',
      'Unarmed damage becomes 2d6 fire damage.',
      'Successful melee attacks against you deal 10 damage to the attacker (ignores DR).',
      'Yoton clan Hijutsu damage die increases by 1 step.',
      'When creating difficult terrain with Earth Release, spaces become lava pools dealing 1d10 fire damage to creatures who start their turn there.',
    ],
  },
  {
    name: 'Lava Release: Planet-Branding Blast',
    rank: 'A',
    chakraCost: 20,
    description:
      'Punches the ground to conjure an eruption of lava and magma, damaging and afflicting creatures in a large cube and creating hazardous terrain.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (45-foot Cube)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Earth Release', 'Fire Release'],
    effects: [
      'Creatures in range must make a Dexterity saving throw.',
      'On a failed save, take 10d10 fire damage and gain 1 rank of burned, corroded, and bruised.',
      'On a successful save, take half damage.',
      'The affected area becomes hazardous terrain filled with lava for 10 minutes.',
      'Creatures, structures, and constructs that start, end, or enter the hazardous area take 1d10 fire damage and gain 1 rank of burned and weakened.',
      'At Higher Ranks: Increase cost by 3, damage by 2d10, and cube size by 15 feet per rank above A.',
    ],
  },
];

export const YOTON_REQUIREMENTS = {
  abilityScores: {
    Constitution: 13,
  },
  features: ['Must possess Lava Release kekkei genkai'],
  restrictions: ['Vulnerable to water techniques'],
};
