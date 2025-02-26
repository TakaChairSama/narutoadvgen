import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const HOSHIGAKI_FEATURES: ClanFeature[] = [
  {
    name: 'Aquatic Adaptation',
    description:
      'You have a Swimming and Water walking speed equal to your walking speed.',
    level: 1,
  },
  {
    name: 'Amphibious',
    description: 'You can breathe air and Water.',
    level: 1,
  },
  {
    name: 'Water Release Simplicity',
    description:
      'When creating or learning Ninjutsu with the Water Release affinity reduce the time it takes to complete the task by half. This does not stack with other similar effects.',
    level: 1,
  },
  {
    name: 'Commander of the Deep',
    description: `Beginning at 1st level, aquatic creatures have an affinity with people of your clan. You can communicate simple ideas with beasts that can breathe Water. They can understand the meaning of your words, though you have no special ability to control them directly. Additionally, when you summon sharks, they are summoned in a large bubble of Water that they use for land travel, using their swimming speed to traverse the land. If they ever end their turns more than 60 feet away from you and they are not in a body of Water that is not this bubble, they are automatically unsummoned.`,
    level: 1,
  },
  {
    name: 'Brute Strength',
    description: `Your immense strength lets you wield weapons in ways that others would find impossible. You always add your strength modifier to the damage rolls of to Bukijutsu you cast, unless otherwise specified. While you have temporary chakra as a result of the Ravenous Chakra clan feature, you may add your proficiency bonus to damage rolls that use your strength twice per turn.`,
    level: 1,
  },
  {
    name: 'Ravenous Chakra',
    description: `Your body yearns to consume the Chakra of others. The stronger your enemies, the stronger you can become, using their energy to fuel you. Beginning at 3rd level, when you cast a jutsu with the Water release keyword, the jutsu also deals Chakra damage equal to the result. You gain a number of temporary Chakra points equal to the rank of the Jutsu cast (D-Rank: 2, C-Rank: 3, B-Rank: 4, A-Rank: 5, S-Rank: 6). You can use this feature three times per initiative roll. If you would clash with a jutsu while using this feature, you gain a bonus to the clash check equal to 1d6. If you win the clash check, your jutsu deals additional damage equal to twice the losing Jutsu's cost.`,
    level: 3,
  },
  {
    name: 'Shark Skinned Predator',
    description: `As a bonus action on your turn, you enter a shark like form, growing large gills on your neck, large wing like fins grow from your shoulders down to your wrists, you grow webs between your fingers, your hair, if any fuses into your scalp, as your head, shoulders, and neck fuse into each other as your spine also grows into a long tail like appendage. You cannot cast Ninjutsu that does not have the Water Release Keyword. For the next minute you gain the following benefits;
• You can as an action perform a special action known as the Apex Gaze against a single creature you can see within 60 feet of you.
Apex Gaze. Targets must make a Wisdom saving throw vs your Taijutsu or Ninjutsu save DC (Your choice). On a failure, the target gains 2 ranks of Demoralized.
• You have advantage on Strength & Constitution Checks.
• You gain a +2 bonus on Strength & Constitution Saving throws.
• You gain a swim speed and Water walking speed of twice your movement speed.
• You gain 30 feet of true sight while submerged underwater
• When you make a melee attack using strength, you gain a bonus to damage equal to your Constitution modifier.
• You have resistance to Bludgeoning, Piercing, or Slashing damage. (Pick 2, This can’t be changed later).
Once you enter this form, you must complete a rest before you are able to enter this form again. You gain an additional use of this form beginning at 18th level.`,
    level: 11,
  },
];

export const HOSHIGAKI_JUTSU: ClanJutsu[] = [
  {
    name: 'Water Prison',
    rank: 'D',
    chakraCost: 4,
    description: 'Create a sphere of water to trap enemies.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Water'],
    effects: [
      'Target makes STR save or is trapped in water sphere.',
      'Restrained and cannot breathe while trapped.',
      'Must maintain contact with sphere.',
      'Sphere has AC 10, 15 HP.',
      'Higher ranks: +10 HP per rank, can trap additional targets.',
    ],
  },
  {
    name: 'Shark Projectile',
    rank: 'C',
    chakraCost: 6,
    description: 'Launch a water shark at your enemies.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Water'],
    effects: [
      'Ranged attack deals 6d6 bludgeoning damage.',
      'Target knocked prone on failed STR save.',
      'Double damage to objects.',
      'Can be used underwater without disadvantage.',
      'Higher ranks: +2d6 damage per rank.',
    ],
  },
  {
    name: 'Summoning Technique (Shark Tribe)',
    rank: 'D',
    chakraCost: 5, // Adjust as needed
    description:
      'Summon a shark from the Hoshigaki clan’s unique shark tribe. These sharks are more powerful than normal sharks of their rank, gaining bonus ASI points.',
    components: ['HS', 'CM', 'Blood Sacrifice'], // Add blood sacrifice
    castingTime: '1 Action',
    range: '30 feet', // Or specify a different range
    duration: 'Concentration, up to 1 hour', // Or specify a different duration
    keywords: ['Hijutsu', 'Ninjutsu', 'Summoning', 'Water'],
    effects: [
      'Summoned shark appears in a large bubble of water.',
      'Shark uses swimming speed on land via water bubble.',
      'Shark gains bonus ASI points based on rank (D:+2, C:+3, B:+4, A:+5, S:+6).',
      'If the shark moves more than 60 feet away from the caster and it is not in a body of water (natural or created by the caster), it is unsummoned.',
      'Caster maintains concentration.',
      'Higher Ranks: Summons higher rank sharks with increased ASI bonuses.',
    ],
  },
  {
    name: 'Water Style: Great Shark Technique',
    rank: 'B',
    chakraCost: 10,
    description:
      'A massive shark made of water is created to overwhelm the target.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Water'],
    effects: [
      'Ranged attack deals 8d8 + Strength modifier bludgeoning damage.',
      'Target is grappled (escape DC equal to jutsu save DC) by the water shark.',
      'While grappled, the target is considered to be underwater.',
      'At the start of each of your turns, you can choose to have the shark attempt to swallow the target. The target must make a Strength saving throw against your jutsu save DC. On a failure, they are swallowed and take 4d6 acid damage at the start of each of their turns while inside the shark. A swallowed creature can use their action to attempt to burst free with a successful Strength check against the jutsu save DC.',
      'Higher Ranks: +2d8 damage per rank.',
    ],
  },
];

export const HOSHIGAKI_REQUIREMENTS = {
  abilityScores: {
    Strength: 13, // Matches Brute Strength feature
    Constitution: 13, // Matches Shark Skinned Predator
  },
  features: ['Sharks'],
  restrictions: ['None'],
};
