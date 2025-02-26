import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const SHIKIGAMI_FEATURES: ClanFeature[] = [
  {
    name: 'Papercraft',
    description: `When you would gain the benefits of a short or long rest, you can craft up to two of the following with no additional resources required: Breaching Tag, Paper Bomb, Explosive Tag Ball, Flash Tag, Poison Gas Tag. Ninja tools crafted this way do not have any bulk and last for 24 hours before becoming inert.`,
    level: 1,
  },
  {
    name: 'Paper Expert',
    description: `When you would use a Breaching Tag, Paper Bomb, Explosive Tag Ball, Flash Tag, or Poison Gas Tag, the DC of these Tags are modified and are now equal to your Ninjutsu Save DC, if your Ninjutsu save DC would be higher than the listed Ninja tools Save DC.`,
    level: 3,
  },
  {
    name: 'Paper Reservoir',
    description: `You may reduce the chakra cost of Jutsu with the Chakra Seal Component (CS) by 1. This reduction increases to 2 at 11th level and 3 at 15th level (Min 1).`,
    level: 7,
  },
  {
    name: 'Divine Shikigami',
    description: `You may expend paper-based ninja tools (Breaching Tag, Paper Bomb, Explosive Tag Ball, Flash Tag, or Poison Gas Tag) to enhance the power of your Hijutsu. When you would cast a Shikigami Clan Hijutsu, you may spend one of the aforementioned ninja tools, incorporating them into your jutsu. Your Jutsu is enhanced using the following effects, based on the ninja tools used.`,
    level: 11,
  },
];

export const SHIKIGAMI_JUTSU: ClanJutsu[] = [
  {
    name: 'Paper Shuriken',
    rank: 'D',
    chakraCost: 4,
    description:
      'Create and launch three razor-sharp paper shuriken at one or more targets.',
    components: ['CS'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Make a ranged ninjutsu attack for each shuriken.',
      'On a hit, deal 1d4+1 slashing damage.',
      'Target gains 1 rank of bleeding for each shuriken that hits.',
      'While under the effects of Dance of Shikigami, this jutsu can be cast as a bonus action.',
      'At Higher Ranks: Increase the cost by 3 and create two additional shuriken for each rank above D.',
    ],
  },
  {
    name: 'Tracking Tag',
    rank: 'D',
    chakraCost: 4,
    description:
      'Attach a chakra-infused paper tag to a target to track its location.',
    components: ['CS'],
    castingTime: '1 Action',
    range: 'Touch',
    duration: '24 hours',
    keywords: ['Hijutsu', 'Ninjutsu', 'Sensory'],
    effects: [
      'Attach a paper tag to a target.',
      'Detect the general location of the tag from up to a mile away.',
      'Detect the exact location of the tag when within 500 feet.',
    ],
  },
  {
    name: 'Paper Trap',
    rank: 'D',
    chakraCost: 10,
    description:
      'Create two paper traps that detonate for fire damage. Costs 5 chakra to activate each trap.',
    components: ['CS'],
    castingTime: '10 Minutes',
    range: 'Self',
    duration: 'Until Triggered or Dispelled',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Create two paper traps infused with chakra.',
      'Traps must be prepped and set on a solid surface.',
      'Traps are activated as a reaction.',
      'Creatures within 30 feet of the trap when detonated must make a Dexterity saving throw.',
      'On a failed save, take 4d6 fire damage and suffer a -2 penalty to subsequent saving throws against Paper Traps (stacks).',
      'At Higher Ranks: N/A',
    ],
  },
  {
    name: 'Paper Clone',
    rank: 'C',
    chakraCost: 8,
    description:
      'Create up to two paper clones that are resistant to physical damage and vulnerable to fire. Clones can cast up to two C-Rank and lower Shikigami Clan Hijutsu. Clones cannot create clones of their own and cannot concentrate on jutsu. Costs 8 chakra per clone.',
    components: ['CS'],
    castingTime: '1 Action',
    range: 'Self (10 feet)',
    duration: 'Concentration, up to 1 hour',
    keywords: ['Hijutsu', 'Ninjutsu', 'Clone'],
    effects: [
      'Create up to two paper clones, each costing 8 chakra.',
      'Clones have immunity to bludgeoning, piercing, and slashing damage.',
      'Clones have vulnerability to fire damage.',
      'Clones can cast up to two C-Rank and lower Shikigami Clan Hijutsu.',
      'Clones cannot create clones of their own.',
      'Clones cannot concentrate on jutsu.',
      'If a clone casts a jutsu with multiple attack rolls, it makes only one.',
      'If multiple clones attack the same target, choose a lead clone that gains a +1d4 bonus to its damage roll for each additional aiding clone.',
      'Clones can change their color to blend in with any surface as an Action and make a Stealth check.',
      'Clones are automatically dispelled if they enter a body of water.',
      'Clones can make a melee weapon attack for 1d8 slashing damage.',
      'At Higher Ranks: N/A',
    ],
  },
  {
    name: 'Paper Coffin',
    rank: 'B',
    chakraCost: 14,
    description:
      'Trap a target in paper, restricting their movements and suffocating them.',
    components: ['CS'],
    castingTime: '1 Action',
    range: '80 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Target must make a Dexterity saving throw.',
      'On a failed save, the target is restrained and suffocating.',
      'While trapped, the target cannot cast jutsu requiring hand signs, draw or stow weapons, or make complex body movements like weapon attacks.',
      "At the start of each of the suffocating creature's turns, it takes 5d6+15 necrotic damage (cannot be reduced).",
      'A creature that does not need to breathe is immune to this damage.',
      'The target cannot speak, but you can allow it to speak, halting the suffocation for one round.',
      'At the end of its turn, the target can make a Strength saving throw to break free.',
      "The Paper Coffin has an AC equal to your Ninjutsu save DC, 25 hit points, and vulnerability to fire damage. If the Paper Coffin's hit points are reduced to 0, this jutsu ends.",
      'At Higher Ranks: N/A',
    ],
  },
  {
    name: 'Dance of the Shikigami',
    rank: 'A',
    chakraCost: 18,
    description:
      'Transform into a paper angel, gaining resistance to physical damage, flight, and the ability to attack with paper projectiles.',
    components: ['CS'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 10 minutes',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Gain resistance to bludgeoning, piercing, and slashing damage.',
      'Gain a flying speed of 60 feet.',
      'As a bonus action, select a space within 60 feet. Creatures in a 15-foot cube centered on that space must make a Dexterity saving throw.',
      'On a failed save, creatures take 4d8 piercing damage and gain the Bleeding condition, or half as much damage on a successful save.',
      'At Higher Ranks: N/A',
    ],
  },
];

export const SHIKIGAMI_REQUIREMENTS = {
  abilityScores: {
    Intelligence: 13,
    Dexterity: 13,
  },
  features: ['Must train in Papercraft techniques'],
  restrictions: ['Cannot use jutsu that require a different chakra nature'],
};
