import { Jutsu } from '../types/naruto';

export const BASIC_JUTSU: Jutsu[] = [
  {
    name: 'Transformation Technique',
    rank: 'D',
    chakraCost: 3,
    description: 'Transform into another person or object',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 1 hour',
    keywords: ['Ninjutsu'],
    effects: [
      'Transform into a creature or object of your size or one size larger or smaller',
      'Gain a +5 bonus to Deception checks while transformed',
      'The transformation ends if you take damage'
    ]
  },
  {
    name: 'Clone Technique',
    rank: 'D',
    chakraCost: 2,
    description: 'Create illusory duplicates of yourself',
    components: ['HS'],
    castingTime: '1 Action',
    range: 'Self',
    duration: '1 minute',
    keywords: ['Ninjutsu'],
    effects: [
      'Create 1d4 illusory duplicates within 5 feet of you',
      'Clones mimic your actions but cannot interact with objects',
      'Clones disappear when struck'
    ]
  },
  {
    name: 'Body Replacement Technique',
    rank: 'D',
    chakraCost: 2,
    description: 'Quickly swap places with a nearby object',
    components: ['HS'],
    castingTime: '1 Reaction',
    range: '30 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    effects: [
      'When targeted by an attack, swap places with an object within range',
      'The attack hits the object instead',
      'You appear in the space the object occupied'
    ]
  },
  {
    name: 'Fireball Jutsu',
    rank: 'C',
    chakraCost: 5,
    description: 'Launch a massive ball of fire',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Fire',
    effects: [
      'Create a 20-foot radius sphere of fire',
      'Creatures in the area must make a Dexterity saving throw',
      'Take 6d6 fire damage on failed save, half on success'
    ]
  },
  {
    name: 'Water Dragon Jutsu',
    rank: 'B',
    chakraCost: 8,
    description: 'Summon a dragon made of water',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '90 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Water',
    effects: [
      'Create a dragon of water that strikes targets in a line',
      'Creatures in a 10-foot wide, 90-foot line must make a Dexterity save',
      'Take 8d6 water damage on failed save, half on success',
      'Targets are pushed back 15 feet on failed save'
    ]
  },
 // Fire Element Jutsu
  {
    name: 'Flame Burst',
    rank: 'D',
    chakraCost: 5,
    description: 'Unleash a small burst of flames at a target.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Instantaneous',
    keywords: ['Ninjutsu'],
    nature: 'Fire',
    effects: [
      'Deal 2d6 fire damage to a target',
      'Ignite flammable objects that aren\'t being worn or carried'
    ]
  },
  {
    name: 'Inferno Wave',
    rank: 'B',
    chakraCost: 15,
    description: 'Create a wave of fire that sweeps across the battlefield.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instantaneous',
    keywords: ['Ninjutsu'],
    nature: 'Fire',
    effects: [
      'Deal 6d8 fire damage to all creatures in a 30-foot line',
      'Each creature must make a Dexterity saving throw, taking half damage on a success'
    ]
  },
  {
    name: 'Phoenix Fire Technique',
    rank: 'A',
    chakraCost: 20,
    description: 'Summon a barrage of fireballs that home in on targets.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '120 feet',
    duration: 'Instantaneous',
    keywords: ['Ninjutsu'],
    nature: 'Fire',
    effects: [
      'Launch 3 fireballs that each deal 4d6 fire damage',
      'Each fireball can target a different creature within range'
    ]
  },
  {
    name: 'Blazing Inferno',
    rank: 'S',
    chakraCost: 30,
    description: 'Create a massive explosion of fire in a large area.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '150 feet',
    duration: 'Instantaneous',
    keywords: ['Ninjutsu'],
    nature: 'Fire',
    effects: [
      'Deal 12d10 fire damage in a 60-foot radius',
      'All creatures must make a Dexterity saving throw, taking half damage on a success'
    ]
  },
  {
    name: 'Ember Shield',
    rank: 'C',
    chakraCost: 10,
    description: 'Surround yourself with a shield of embers that burns attackers.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 10 minutes',
    keywords: ['Ninjutsu'],
    nature: 'Fire',
    effects: [
      'Gain +2 AC while the shield is active',
      'Any creature that hits you with a melee attack takes 2d4 fire damage'
    ]
  },

  // Water Element Jutsu
  {
    name: 'Water Dragon Jutsu',
    rank: 'B',
    chakraCost: 8,
    description: 'Summon a dragon made of water.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '90 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Water',
    effects: [
      'Create a dragon of water that strikes targets in a line',
      'Creatures in a 10-foot wide, 90-foot line must make a Dexterity save',
      'Take 8d6 water damage on failed save, half on success',
      'Targets are pushed back 15 feet on failed save'
    ]
  },
  {
    name: 'Tidal Wave',
    rank: 'B',
    chakraCost: 15,
    description: 'Summon a wave of water to crash down on enemies.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instantaneous',
    keywords: ['Ninjutsu'],
    nature: 'Water',
    effects: [
      'Deal 6d8 bludgeoning damage to all creatures in a 30-foot cone',
      'Each creature must make a Dexterity saving throw, taking half damage on a success'
    ]
  },
  {
    name: 'Water Prison Technique',
    rank: 'A',
    chakraCost: 25,
    description: 'Trap a target in a sphere of water, immobilizing them.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Ninjutsu'],
    nature: 'Water',
    effects: [
      'Target must succeed on a Strength saving throw or be restrained',
      'The target can repeat the saving throw at the end of each of its turns'
    ]
  },
  {
    name: 'Ocean\'s Wrath',
    rank: 'S',
    chakraCost: 35,
    description: 'Summon a massive tidal wave that engulfs the battlefield.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '150 feet',
    duration: 'Instantaneous',
    keywords: ['Ninjutsu'],
    nature: 'Water',
    effects: [
      'Deal 15d10 bludgeoning damage in a 100-foot radius',
      'All creatures must make a Strength saving throw, taking half damage on a success'
    ]
  },
  {
    name: 'Mist Cloak',
    rank: 'C',
    chakraCost: 12,
    description: 'Surround yourself with a thick mist, obscuring vision.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 10 minutes',
    keywords: ['Ninjutsu'],
    nature: 'Water',
    effects: [
      'Gain advantage on Stealth checks while in the mist',
      'Creatures have disadvantage on attack rolls against you'
    ]
  },

  // Earth Element Jutsu
  {
    name: 'Stone Spike',
    rank: 'D',
    chakraCost: 5,
    description: 'Create a spike of stone that impales a target.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Instantaneous',
    keywords: ['Ninjutsu'],
    nature: 'Earth',
    effects: [
      'Deal 3d8 piercing damage to a target',
      'The target must make a Dexterity saving throw or be knocked prone'
    ]
  },
  {
    name: 'Earthquake',
    rank: 'B',
    chakraCost: 15,
    description: 'Create a tremor that shakes the ground beneath your enemies.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instantaneous',
    keywords: ['Ninjutsu'],
    nature: 'Earth',
    effects: [
      'Deal 6d6 bludgeoning damage to all creatures in a 20-foot radius',
      'Each creature must make a Dexterity saving throw, taking half damage on a success'
    ]
  },
  {
    name: 'Stone Golem Summon',
    rank: 'A',
    chakraCost: 25,
    description: 'Summon a stone golem to fight for you.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Concentration, up to 1 hour',
    keywords: ['Ninjutsu'],
    nature: 'Earth',
    effects: [
      'Summon a golem with hit points equal to 5d10 + your level',
      'The golem acts on your initiative and follows your commands'
    ]
  },
  {
    name: 'Mountain\'s Might',
    rank: 'S',
    chakraCost: 35,
    description: 'Transform the ground into a massive mountain, crushing enemies.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '150 feet',
    duration: 'Instantaneous',
    keywords: ['Ninjutsu'],
    nature: 'Earth',
    effects: [
      'Deal 12d10 bludgeoning damage in a 60-foot radius',
      'All creatures must make a Strength saving throw, taking half damage on a success'
    ]
  },
  {
    name: 'Earthen Armor',
    rank: 'C',
    chakraCost: 10,
    description: 'Cover yourself in a layer of earth for protection.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 10 minutes',
    keywords: ['Ninjutsu'],
    nature: 'Earth',
    effects: [
      'Gain +3 AC while the armor is active',
      'Resistance to bludgeoning damage'
    ]
  },

  // Wind Element Jutsu
  {
    name: 'Gust',
    rank: 'D',
    chakraCost: 4,
    description: 'Create a small gust of wind to push objects.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Instantaneous',
    keywords: ['Ninjutsu'],
    nature: 'Wind',
    effects: [
      'Push a small object or creature up to 15 feet away',
      'Can extinguish small flames'
    ]
  },
  {
    name: 'Cyclone Slash',
    rank: 'B',
    chakraCost: 15,
    description: 'Create a blade of wind that slices through enemies.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instantaneous',
    keywords: ['Ninjutsu'],
    nature: 'Wind',
    effects: [
      'Deal 6d8 slashing damage to a target',
      'The target must make a Dexterity saving throw, taking half damage on a success'
    ]
  },
  {
    name: 'Tornado Fury',
    rank: 'A',
    chakraCost: 25,
    description: 'Summon a tornado that sweeps away enemies.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '120 feet',
    duration: 'Instantaneous',
    keywords: ['Ninjutsu'],
    nature: 'Wind',
    effects: [
      'Deal 8d10 slashing damage in a 30-foot radius',
      'All creatures must make a Strength saving throw, taking half damage on a success'
    ]
  },
  {
    name: 'Hurricane\'s Eye',
    rank: 'S',
    chakraCost: 35,
    description: 'Create a massive hurricane that devastates the area.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '150 feet',
    duration: 'Instantaneous',
    keywords: ['Ninjutsu'],
    nature: 'Wind',
    effects: [
      'Deal 15d10 slashing damage in a 100-foot radius',
      'All creatures must make a Strength saving throw, taking half damage on a success'
    ]
  },
  {
    name: 'Wind Barrier',
    rank: 'C',
    chakraCost: 10,
    description: 'Create a barrier of wind that deflects projectiles.',
    components: ['HS'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 10 minutes',
    keywords: ['Ninjutsu'],
    nature: 'Wind',
    effects: [
      'Gain +3 AC against ranged attacks',
      'Deflect one ranged attack per turn back at the attacker'
    ]
  },

  // Fuinjutsu
  {
    name: 'Basic Seal',
    rank: 'D',
    chakraCost: 3,
    description: 'Create a simple seal to contain a small object.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Touch',
    duration: 'Permanent',
    keywords: ['Fuinjutsu'],
    effects: [
      'Contain a small object within the seal',
      'The seal can be broken by a creature with a successful Strength check'
    ]
  },
  {
    name: 'Binding Seal',
    rank: 'B',
    chakraCost: 12,
    description: 'Seal a creature in place, preventing movement.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Fuinjutsu'],
    effects: [
      'Target must succeed on a Strength saving throw or be restrained',
      'The target can repeat the saving throw at the end of each of its turns'
    ]
  },
  {
    name: 'Sealing Technique: Storage',
    rank: 'A',
    chakraCost: 20,
    description: 'Store objects in a special seal for later use.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Touch',
    duration: 'Permanent',
    keywords: ['Fuinjutsu'],
    effects: [
      'Store up to 10 objects within the seal',
      'The seal can be opened at any time to retrieve the objects'
    ]
  },
  {
    name: 'Demon Sealing Technique',
    rank: 'S',
    chakraCost: 30,
    description: 'Seal a powerful entity within a designated area.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Permanent',
    keywords: ['Fuinjutsu'],
    effects: [
      'Target must succeed on a Wisdom saving throw or be sealed',
      'The seal can only be broken by a specific ritual'
    ]
  },
  {
    name: 'Barrier Seal',
    rank: 'C',
    chakraCost: 10,
    description: 'Create a barrier that protects against attacks.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 10 minutes',
    keywords: ['Fuinjutsu'],
    effects: [
      'Gain +3 AC while the barrier is active',
      'The barrier absorbs up to 15 damage before breaking'
    ]
  },

  // Bukijutsu
  {
    name: 'Basic Sword Technique',
    rank: 'D',
    chakraCost: 3,
    description: 'Perform a basic slash with a sword.',
    components: ['HS'],
    castingTime: '1 Action',
    range: 'Melee',
    duration: 'Instantaneous',
    keywords: ['Bukijutsu'],
    effects: [
      'Deal 2d6 slashing damage',
      'Add your proficiency bonus to the attack roll'
    ]
  },
  {
    name: 'Twin Blade Dance',
    rank: 'B',
    chakraCost: 12,
    description: 'Perform a series of slashes with two blades.',
    components: ['HS'],
    castingTime: '1 Action',
    range: 'Melee',
    duration: 'Instantaneous',
    keywords: ['Bukijutsu'],
    effects: [
      'Make two melee attacks with your blades',
      'Each attack deals 2d8 slashing damage'
    ]
  },
  {
    name: 'Spear Thrust',
    rank: 'A',
    chakraCost: 20,
    description: 'Thrust a spear with great force, piercing through enemies.',
    components: ['HS'],
    castingTime: '1 Action',
    range: 'Melee',
    duration: 'Instantaneous',
    keywords: ['Bukijutsu'],
    effects: [
      'Deal 5d8 piercing damage',
      'If the target is below half health, deal an additional 2d8 damage'
    ]
  },
  {
    name: 'Blade Storm',
    rank: 'S',
    chakraCost: 30,
    description: 'Unleash a flurry of slashes in a wide area.',
    components: ['HS'],
    castingTime: '1 Action',
    range: 'Melee',
    duration: 'Instantaneous',
    keywords: ['Bukijutsu'],
    effects: [
      'Make a melee attack against all creatures within 10 feet',
      'Each attack deals 3d6 slashing damage'
    ]
  },
  {
    name: 'Weapon Mastery',
    rank: 'C',
    chakraCost: 10,
    description: 'Enhance your weapon skills for a short duration.',
    components: ['HS'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 10 minutes',
    keywords: ['Bukijutsu'],
    effects: [
      'Gain a +3 bonus to attack rolls with weapons',
      'Ignore disadvantage on ranged attacks'
    ]
  },

  // Genjutsu
  {
    name: 'Illusionary Image',
    rank: 'D',
    chakraCost: 3,
    description: 'Create a simple illusion to distract enemies.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Genjutsu'],
    effects: [
      'Create an illusion of an object or creature within range',
      'Creatures must succeed on an Intelligence saving throw to see through the illusion'
    ]
  },
  {
    name: 'Nightmare',
    rank: 'B',
    chakraCost: 12,
    description: 'Induce a terrifying nightmare in a target\'s mind.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Genjutsu'],
    effects: [
      'Target must succeed on a Wisdom saving throw or take 4d6 psychic damage each turn',
      'The target is frightened for the duration'
    ]
  },
  {
    name: 'Phantom Pain',
    rank: 'A',
    chakraCost: 20,
    description: 'Create an illusion of pain that affects the target.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Genjutsu'],
    effects: [
      'Target must succeed on a Wisdom saving throw or take 5d8 psychic damage',
      'The target has disadvantage on attack rolls for the duration'
    ]
  },
  {
    name: 'Mind Control',
    rank: 'S',
    chakraCost: 30,
    description: 'Take control of a target\'s mind for a short time.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Genjutsu'],
    effects: [
      'Target must succeed on a Wisdom saving throw or be charmed',
      'You can control the target\'s actions on your turn'
    ]
  },
  {
    name: 'Illusory Terrain',
    rank: 'C',
    chakraCost: 10,
    description: 'Create an illusion of difficult terrain.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Concentration, up to 10 minutes',
    keywords: ['Genjutsu'],
    effects: [
      'Create an illusion of difficult terrain in a 20-foot radius',
      'Creatures must succeed on an Intelligence saving throw to see through the illusion'
    ]
  },

  // Taijutsu
  {
    name: 'Basic Strike',
    rank: 'D',
    chakraCost: 2,
    description: 'Deliver a basic punch or kick.',
    components: ['HS'],
    castingTime: '1 Action',
    range: 'Melee',
    duration: 'Instantaneous',
    keywords: ['Taijutsu'],
    effects: [
      'Deal 2d4 bludgeoning damage',
      'Add your proficiency bonus to the attack roll'
    ]
  },
  {
    name: 'Flurry of Blows',
    rank: 'B',
    chakraCost: 10,
    description: 'Unleash a series of rapid strikes.',
    components: ['HS'],
    castingTime: '1 Action',
    range: 'Melee',
    duration: 'Instantaneous',
    keywords: ['Taijutsu'],
    effects: [
      'Make two unarmed strikes, each dealing 2d6 damage',
      'If both attacks hit, the target is stunned until the end of your next turn'
    ]
  },
  {
    name: 'Spinning Kick',
    rank: 'A',
    chakraCost: 15,
    description: 'Perform a powerful spinning kick that knocks back enemies.',
    components: ['HS'],
    castingTime: '1 Action',
    range: 'Melee',
    duration: 'Instantaneous',
    keywords: ['Taijutsu'],
    effects: [
      'Deal 5d6 bludgeoning damage',
      'The target must make a Strength saving throw or be pushed back 15 feet'
    ]
  },
  {
    name: 'Dragon Fist',
    rank: 'S',
    chakraCost: 25,
    description: 'Channel your chakra into a devastating punch.',
    components: ['HS'],
    castingTime: '1 Action',
    range: 'Melee',
    duration: 'Instantaneous',
    keywords: ['Taijutsu'],
    effects: [
      'Deal 8d10 bludgeoning damage',
      'If the target is below half health, deal an additional 3d10 damage'
    ]
  },
  {
    name: 'Martial Arts Mastery',
    rank: 'C',
    chakraCost: 10,
    description: 'Enhance your martial arts skills for a short duration.',
    components: ['HS'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 10 minutes',
    keywords: ['Taijutsu'],
    effects: [
      'Gain a +3 bonus to attack rolls with unarmed strikes',
      'Ignore disadvantage on attacks made while grappling'
    ]
  },
  {
    name: 'Ember Spike',
    rank: 'D',
    chakraCost: 3,
    description: 'Launch a concentrated spike of fiery embers.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Fire',
    effects: [
      'Single target must make a Dexterity saving throw.',
      'Take 5d6 fire damage on failed save, half on success.'
    ]
  },
  {
    name: 'Blazing Whip',
    rank: 'C',
    chakraCost: 5,
    description: 'Summon a whip of flames to strike multiple foes.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '40 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Fire',
    effects: [
      'Create a 15-foot cone of fire.',
      'Creatures in the area must make a Dexterity saving throw.',
      'Take 8d6 fire damage on failed save, half on success.'
    ]
  },
  {
    name: 'Inferno Cyclone',
    rank: 'B',
    chakraCost: 7,
    description: 'Create a swirling cyclone of fire that damages over time.',
    components: ['HS', 'CM', 'SM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Ninjutsu'],
    nature: 'Fire',
    effects: [
      'Create a 20-foot radius cyclone of fire.',
      'Creatures in the area must make a Dexterity saving throw.',
      'Take 12d6 fire damage on failed save, half on success.',
      'Take ongoing 4d6 fire damage at the start of their turns.'
    ]
  },
  {
    name: 'Solar Flare Detonation',
    rank: 'A',
    chakraCost: 10,
    description: 'Unleash a massive explosion of solar energy.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Fire',
    effects: [
      'Create a 60-foot radius explosion.',
      'Creatures in the area must make a Dexterity saving throw.',
      'Take 15d6 fire damage on failed save, half on success.'
    ]
  },
  {
    name: 'Cremation Nova',
    rank: 'S',
    chakraCost: 15,
    description: 'Release a cataclysmic wave of fire that engulfs everything.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '120 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Fire',
    effects: [
      'Create a 100-foot radius wave of fire.',
      'Creatures in the area must make a Dexterity saving throw.',
      'Take 20d6 fire damage on failed save, half on success.',
      'All creatures in the area are ignited, taking 2d6 fire damage at the start of their turns for 1 minute.'
    ]
  },
  {
    name: 'Aqua Dart',
    rank: 'D',
    chakraCost: 3,
    description: 'Shoot a dart of water that pierces through enemies.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Water',
    effects: [
      'Single target must make a Dexterity saving throw.',
      'Take 6d4 water damage on failed save.'
    ]
  },
  {
    name: 'Tidal Wave',
    rank: 'C',
    chakraCost: 5,
    description: 'Create a wave of water that crashes down on foes.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '40 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Water',
    effects: [
      'Create a 15-foot cone of water.',
      'Creatures in the area must make a Dexterity saving throw.',
      'Take 8d6 water damage on failed save, half on success.'
    ]
  },
  {
    name: 'Riptide Grasp',
    rank: 'B',
    chakraCost: 7,
    description: 'Summon tendrils of water to ensnare and crush enemies.',
    components: ['HS', 'CM', 'SM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Ninjutsu'],
    nature: 'Water',
    effects: [
      'Create a 20-foot radius of water tendrils.',
      'Creatures in the area must make a Dexterity saving throw.',
      'Take 12d6 water damage on failed save, half on success.',
      'Creatures are restrained until the end of their next turn.'
    ]
  },
  {
    name: 'Tsunami Surge',
    rank: 'A',
    chakraCost: 10,
    description: 'Unleash a massive wave that sweeps away everything in its path.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Water',
    effects: [
      'Create a 60-foot line of water.',
      'Creatures in the area must make a Dexterity saving throw.',
      'Take 15d6 water damage on failed save, half on success.',
      'Creatures are knocked prone.'
    ]
  },
  {
    name: 'Leviathan\'s Wrath',
    rank: 'S',
    chakraCost: 15,
    description: 'Call forth the spirit of the ocean to unleash a devastating flood.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '120 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Water',
    effects: [
      'Create a 100-foot radius flood.',
      'Creatures in the area must make a Dexterity saving throw.',
      'Take 20d6 water damage on failed save, half on success.',
      'All creatures are submerged, taking 2d6 water damage at the start of their turns for 1 minute.'
    ]
  },
  {
    name: 'Pebble Shot',
    rank: 'D',
    chakraCost: 3,
    description: 'Launch a small stone projectile at an enemy.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Earth',
    effects: [
      'Single target must make a Dexterity saving throw.',
      'Take 6d4 bludgeoning damage on failed save.'
    ]
  },
  {
    name: 'Stone Barrier',
    rank: 'C',
    chakraCost: 5,
    description: 'Raise a wall of stone to protect against attacks.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Ninjutsu'],
    nature: 'Earth',
    effects: [
      'Create a barrier with 20 hit points, absorbing damage until destroyed.'
    ]
  },
  {
    name: 'Quake Stomp',
    rank: 'B',
    chakraCost: 7,
    description: 'Create a localized earthquake that shakes the ground.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Earth',
    effects: [
      'Create a 20-foot radius earthquake.',
      'Creatures in the area must make a Dexterity saving throw.',
      'Take 12d6 bludgeoning damage on failed save, half on success.',
      'All creatures in the area are knocked prone.'
    ]
  },
  {
    name: 'Mountain\'s Embrace',
    rank: 'A',
    chakraCost: 10,
    description: 'Summon a massive wall of earth to crush foes.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Earth',
    effects: [
      'Create a 60-foot line of earth.',
      'Creatures in the area must make a Dexterity saving throw.',
      'Take 15d6 bludgeoning damage on failed save, half on success.',
      'Targets are restrained until the end of their next turn.'
    ]
  },
  {
    name: 'Terra Cataclysm',
    rank: 'S',
    chakraCost: 15,
    description: 'Unleash a devastating eruption of earth and stone.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '120 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Earth',
    effects: [
      'Create a 100-foot radius eruption.',
      'Creatures in the area must make a Dexterity saving throw.',
      'Take 20d6 bludgeoning damage on failed save, half on success.',
      'All creatures are buried, taking 2d6 bludgeoning damage at the start of their turns for 1 minute.'
    ]
  },
  {
    name: 'Gale Burst',
    rank: 'D',
    chakraCost: 3,
    description: 'Release a small burst of wind that pushes enemies back.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Wind',
    effects: [
      'Single target must make a Dexterity saving throw.',
      'Take 6d4 slashing damage on failed save.'
    ]
  },
  {
    name: 'Cyclone Blade',
    rank: 'C',
    chakraCost: 5,
    description: 'Create a blade of wind that slices through foes.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '40 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Wind',
    effects: [
      'Create a 15-foot cone of wind.',
      'Creatures in the area must make a Dexterity saving throw.',
      'Take 8d6 slashing damage on failed save, half on success.'
    ]
  },
  {
    name: 'Tempest Shield',
    rank: 'B',
    chakraCost: 7,
    description: 'Surround yourself with a barrier of swirling winds.',
    components: ['HS', 'CM', 'SM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Ninjutsu'],
    nature: 'Wind',
    effects: [
      'Grants +2 AC.',
      'Any creature that hits you takes 4d6 slashing damage.'
    ]
  },
  {
    name: 'Hurricane\'s Fury',
    rank: 'A',
    chakraCost: 10,
    description: 'Summon a powerful hurricane that devastates the battlefield.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Wind',
    effects: [
      'Create a 60-foot radius hurricane.',
      'Creatures in the area must make a Dexterity saving throw.',
      'Take 15d6 slashing damage on failed save, half on success.',
      'All creatures are pushed 30 feet away.'
    ]
  },
  {
    name: 'Eye of the Storm',
    rank: 'S',
    chakraCost: 15,
    description: 'Create a massive storm that engulfs the area in chaos.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '120 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Wind',
    effects: [
      'Create a 100-foot radius storm.',
      'Creatures in the area must make a Dexterity saving throw.',
      'Take 20d6 slashing damage on failed save, half on success.',
      'All creatures are blinded until the end of their next turn.'
    ]
  },
  {
    name: 'Spark Bolt',
    rank: 'D',
    chakraCost: 3,
    description: 'Launch a small bolt of lightning at a target.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Lightning',
    effects: [
      'Single target must make a Dexterity saving throw.',
      'Take 6d4 lightning damage on failed save.'
    ]
  },
  {
    name: 'Thunderclap',
    rank: 'C',
    chakraCost: 5,
    description: 'Create a loud clap of thunder that disorients foes.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '40 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Lightning',
    effects: [
      'Create a 15-foot cone of thunder.',
      'Creatures in the area must make a Dexterity saving throw.',
      'Take 8d6 lightning damage on failed save, half on success.',
      'Targets are deafened until the end of their next turn.'
    ]
  },
  {
    name: 'Chain Lightning',
    rank: 'B',
    chakraCost: 7,
    description: 'Unleash a bolt of lightning that arcs between multiple targets.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Lightning',
    effects: [
      'Choose up to three targets within range.',
      'Each must make a Dexterity saving throw.',
      'Take 12d6 lightning damage on failed save, half on success.'
    ]
  },
  {
    name: 'Stormcaller',
    rank: 'A',
    chakraCost: 10,
    description: 'Summon a storm that strikes foes with lightning.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Lightning',
    effects: [
      'Create a 60-foot radius storm.',
      'Creatures in the area must make a Dexterity saving throw.',
      'Take 15d6 lightning damage on failed save, half on success.',
      'All creatures are stunned until the end of their next turn.'
    ]
  },
  {
    name: 'Tempest\'s Wrath',
    rank: 'S',
    chakraCost: 15,
    description: 'Unleash the full fury of a lightning storm upon the battlefield.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '120 feet',
    duration: 'Instant',
    keywords: ['Ninjutsu'],
    nature: 'Lightning',
    effects: [
      'Create a 100-foot radius lightning storm.',
      'Creatures in the area must make a Dexterity saving throw.',
      'Take 20d6 lightning damage on failed save, half on success.',
      'All creatures are paralyzed until the end of their next turn.'
    ]
  },
    {
      name: 'Explosive Tag Seal',
      rank: 'D',
      chakraCost: 3,
      description: 'Imbues a scroll tag with explosive chakra',
      components: ['HS', 'CI'],
      castingTime: '1 Action',
      range: 'Touch',
      duration: '1 Minute',
      keywords: ['Fuinjutsu'],
      effects: [
        'Place seal on object/surface',
        'Detonates for 6d4 fire damage when triggered',
        'Creatures within 10 feet must make a Dexterity saving throw',
        'Take full damage on failed save, half on success'
      ]
    },
    {
      name: 'Barrier Binding Seal',
      rank: 'C',
      chakraCost: 5,
      description: 'Creates a barrier that restrains a target',
      components: ['HS', 'CM'],
      castingTime: '1 Action',
      range: '30 feet',
      duration: 'Concentration, up to 1 minute',
      keywords: ['Fuinjutsu'],
      effects: [
        'Target must succeed on a Strength saving throw or be restrained',
        'While restrained, the target takes 2d6 force damage at the start of each of its turns'
      ]
    },
    {
      name: 'Chakra Leech Seal',
      rank: 'B',
      chakraCost: 7,
      description: 'Drains chakra from the target over time',
      components: ['HS', 'CI'],
      castingTime: '1 Action',
      range: 'Touch',
      duration: 'Concentration, up to 1 minute',
      keywords: ['Fuinjutsu', 'Medical'],
      effects: [
        'Target loses 1d8 chakra at the start of each of its turns',
        'You regain half the amount lost as temporary hit points'
      ]
    },
    {
      name: 'Void Prison Seal',
      rank: 'A',
      chakraCost: 10,
      description: 'Seals a target in a void dimension',
      components: ['HS', 'CM'],
      castingTime: '1 Action',
      range: '60 feet',
      duration: 'Concentration, up to 1 minute',
      keywords: ['Fuinjutsu'],
      effects: [
        'Target must make a Wisdom saving throw or be banished to a void',
        'While banished, the target takes 15d6 force damage at the end of each of its turns'
      ]
    },
    {
      name: 'Chakra Disruption Seal',
      rank: 'B',
      chakraCost: 6,
      description: 'Disrupts the flow of chakra in a target',
      components: ['HS', 'CI'],
      castingTime: '1 Action',
      range: '30 feet',
      duration: '1 Minute',
      keywords: ['Fuinjutsu'],
      effects: [
        'Target must make a Constitution saving throw or have disadvantage on all chakra-based actions',
        'If the target fails, it takes 4d8 psychic damage'
      ]
    },
    {
      name: 'Deflecting Strike',
      rank: 'D',
      chakraCost: 2,
      description: 'A quick maneuver to deflect incoming projectiles',
      components: ['W'],
      castingTime: '1 Reaction',
      range: 'Self',
      duration: 'Instant',
      keywords: ['Bukijutsu'],
      effects: [
        'Deflect one ranged attack targeting you',
        'If successful, the attack misses and can hit another target within 10 feet'
      ]
    },
    {
      name: 'Spectral Blade Summon',
      rank: 'C',
      chakraCost: 4,
      description: 'Summons a blade of pure chakra to strike enemies',
      components: ['W'],
      castingTime: '1 Action',
      range: '30 feet',
      duration: 'Concentration, up to 1 minute',
      keywords: ['Bukijutsu'],
      effects: [
        'Make a melee spell attack against a target',
        'On a hit, deal 8d6 force damage'
      ]
    },
    {
      name: 'Whirlwind Slash',
      rank: 'B',
      chakraCost: 6,
      description: 'A spinning attack that damages all nearby foes',
      components: ['W'],
      castingTime: '1 Action',
      range: 'Self',
      duration: 'Instant',
      keywords: ['Bukijutsu'],
      effects: [
        'All creatures within 10 feet must make a Dexterity saving throw',
        'Take 7d10 slashing damage on a failed save, half on success'
      ]
    },
    {
      name: 'Rending Strike',
      rank: 'A',
      chakraCost: 8,
      description: 'A powerful strike that rends the target’s defenses',
      components: ['W'],
      castingTime: '1 Action',
      range: 'Melee',
      duration: 'Instant',
      keywords: ['Bukijutsu'],
      effects: [
        'Make a melee attack roll',
        'On a hit, deal 11d8 slashing damage and reduce the target’s AC by 2 until the end of its next turn'
      ]
    },
    {
      name: 'Ph antom Blade Barrage',
      rank: 'B',
      chakraCost: 7,
      description: 'Unleashes a flurry of phantom blades at multiple targets',
      components: ['W'],
      castingTime: '1 Action',
      range: '60 feet',
      duration: 'Instant',
      keywords: ['Bukijutsu'],
      effects: [
        'Choose up to three targets within range',
        'Make a ranged spell attack against each target',
        'On a hit, deal 6d8 force damage'
      ]
    },
    {
      name: 'Flickering Shadows',
      rank: 'D',
      chakraCost: 2,
      description: 'Creates brief illusions that disorient the target',
      components: ['HS', 'CM'],
      castingTime: '1 Action',
      range: '30 feet',
      duration: '1 Minute',
      keywords: ['Genjutsu'],
      effects: [
        'Target must succeed on a Wisdom saving throw or be blinded until the end of its next turn',
        'If the target fails, it takes 1d6 psychic damage'
      ]
    },
    {
      name: 'Illusory Terrain',
      rank: 'C',
      chakraCost: 4,
      description: 'Creates an illusory landscape that confuses enemies',
      components: ['HS', 'CM'],
      castingTime: '1 Action',
      range: '60 feet',
      duration: 'Concentration, up to 10 minutes',
      keywords: ['Genjutsu'],
      effects: [
        'Creatures within the area must make an Intelligence saving throw',
        'On a failed save, they perceive the terrain as difficult and take 2d6 psychic damage'
      ]
    },
    {
      name: 'Mental Prison',
      rank: 'A',
      chakraCost: 8,
      description: 'Traps the target in a mental illusion of their worst fears',
      components: ['HS', 'CM'],
      castingTime: '1 Action',
      range: '60 feet',
      duration: 'Concentration, up to 1 minute',
      keywords: ['Genjutsu'],
      effects: [
        'Target must make a Wisdom saving throw or be incapacitated',
        'While incapacitated, the target takes 9d10 psychic damage at the end of each of its turns'
      ]
    },
    {
      name: 'Echoing Whispers',
      rank: 'B',
      chakraCost: 6,
      description: 'Fills the target’s mind with disorienting whispers',
      components: ['HS', 'CM'],
      castingTime: '1 Action',
      range: '30 feet',
      duration: '1 Minute',
      keywords: ['Genjutsu'],
      effects: [
        'Target must make a Wisdom saving throw or have disadvantage on all Wisdom saving throws for the duration',
        'If the target fails, it takes 4d8 psychic damage'
      ]
    },
    {
      name: 'Phantom Nightmares',
      rank: 'B',
      chakraCost: 5,
      description: 'Induces terrifying visions that sap the target’s will',
      components: ['HS', 'CM'],
      castingTime: '1 Action',
      range: '30 feet',
      duration: 'Concentration, up to 1 minute',
      keywords: ['Genjutsu'],
      effects: [
        'Target must succeed on a Wisdom saving throw or be frightened for the duration',
        'If frightened, the target takes 3d6 psychic damage at the start of each of its turns'
      ]
    },

    {
      name: 'Quick Jab',
      rank: 'D',
      chakraCost: 1,
      description: 'A rapid jab that catches the opponent off guard',
      components: ['Physical'],
      castingTime: '1 Action',
      range: 'Melee',
      duration: 'Instant',
      keywords: ['Taijutsu'],
      effects: [
        'Make a melee attack roll',
        'On a hit, deal 1d6 bludgeoning damage'
      ]
    },
    {
      name: 'Pressure Point Strike',
      rank: 'C',
      chakraCost: 3,
      description: 'Targets a pressure point to incapacitate the opponent',
      components: ['Physical'],
      castingTime: '1 Action',
      range: 'Melee',
      duration: 'Instant',
      keywords: ['Taijutsu'],
      effects: [
        'Make a melee attack roll',
        'On a hit, the target must succeed on a Constitution saving throw or be stunned until the end of its next turn'
      ]
    },
    {
      name: 'Spinning Kick',
      rank: 'B',
      chakraCost: 5,
      description : 'A powerful spinning kick that can knock back opponents',
      components: ['Physical'],
      castingTime: '1 Action',
      range: 'Melee',
      duration: 'Instant',
      keywords: ['Taijutsu'],
      effects: [
        'Make a melee attack roll',
        'On a hit, deal 2d8 bludgeoning damage and push the target back 10 feet'
      ]
    },
    {
      name: 'Earthshaker Stomp',
      rank: 'A',
      chakraCost: 7,
      description: 'A ground-shaking stomp that affects all nearby foes',
      components: ['Physical'],
      castingTime: '1 Action',
      range: 'Self',
      duration: 'Instant',
      keywords: ['Taijutsu'],
      effects: [
        'All creatures within 15 feet must make a Dexterity saving throw',
        'Take 9d10 bludgeoning damage on a failed save, half on success'
      ]
    },
    {
      name: 'Fist of Fury',
      rank: 'B',
      chakraCost: 6,
      description: 'A flurry of punches that overwhelm the target',
      components: ['Physical'],
      castingTime: '1 Action',
      range: 'Melee',
      duration: 'Instant',
      keywords: ['Taijutsu'],
      effects: [
        'Make three melee attack rolls',
        'On a hit, each attack deals 1d8 bludgeoning damage'
      ]
    },

    {
      name: 'Force Push',
      rank: 'D',
      chakraCost: 2,
      description: 'A simple push of energy that knocks back foes',
      components: ['CM'],
      castingTime: '1 Action',
      range: '30 feet',
      duration: 'Instant',
      keywords: ['Ninjutsu'],
      effects: [
        'Target must make a Strength saving throw or be pushed back 10 feet',
        'If pushed, the target takes 1d6 force damage'
      ]
    },
    {
      name: 'Protective Barrier',
      rank: 'C',
      chakraCost: 4,
      description: 'Creates a barrier that absorbs damage',
      components: ['CM'],
      castingTime: '1 Action',
      range: 'Self',
      duration: 'Concentration, up to 1 minute',
      keywords: ['Ninjutsu'],
      effects: [
        'Gain temporary hit points equal to 10 + your spellcasting ability modifier',
        'While the barrier is active, you take no damage from the first attack that hits you'
      ]
    },
    {
      name: 'Energy Wave',
      rank: 'B',
      chakraCost: 6,
      description: 'Unleashes a wave of energy that damages all in its path',
      components: ['CM'],
      castingTime: '1 Action',
      range: '60 feet',
      duration: 'Instant',
      keywords: ['Ninjutsu'],
      effects: [
        'All creatures in a 30-foot line must make a Dexterity saving throw',
        'Take 8d6 force damage on a failed save, half on success'
      ]
    },
    {
      name: 'Gravity Well',
      rank: 'A',
      chakraCost: 8,
      description: 'Creates a localized gravity field that pulls enemies in',
      components: ['CM'],
      castingTime: '1 Action',
      range: '60 feet',
      duration: 'Concentration, up to 1 minute',
      keywords: ['Ninjutsu'],
      effects: [
        'Creatures within a 20-foot radius must make a Strength saving throw or be pulled 15 feet towards the center',
        'On a failed save, they take 10d8 force damage'
      ]
    },
    {
      name: 'Temporal Shift',
      rank: 'B',
      chakraCost: 7,
      description: 'Temporarily slows down time for a target',
      components: ['CM'],
      castingTime: '1 Action',
      range: '30 feet',
      duration: 'Concentration, up to 1 minute',
      keywords: ['Ninjutsu'],
      effects: [
        'Target must make a Wisdom saving throw or have disadvantage on all attack rolls and saving throws for the duration',
        'If the target fails, it takes 4d10 force damage'
      ]
    },
];