import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const SENJU_FEATURES: ClanFeature[] = [
  {
    name: 'Thousand Skills',
    description:
      "You gain proficiency in one additional skill of your choice. Additionally, when you make an ability check using a skill you're proficient in, you can spend 2 chakra to gain advantage on the roll.",
    level: 1,
    chakraCost: 2,
  },
  {
    name: 'Enhanced Life Force',
    description:
      'When you roll Hit Dice to recover HP, you can reroll any 1s or 2s. You must use the new roll. Additionally, you have advantage on saves against disease and poison.',
    level: 3,
  },
  {
    name: 'Chakra Mastery',
    description:
      'Your chakra control surpasses normal limits. You can maintain concentration on two jutsu simultaneously. If you fail a concentration check, you can choose which jutsu to maintain.',
    level: 7,
  },
];

export const SENJU_JUTSU: ClanJutsu[] = [
  {
    name: 'Wood Release: Great Forest Technique',
    rank: 'D',
    chakraCost: 5,
    description:
      'Transform your arm or leg into chakra-enhanced wood branches for a melee attack that can grapple the target.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Earth Release', 'Water Release'],
    effects: [
      'Make a melee Ninjutsu attack against a creature within range.',
      'On a hit, deal 2d8 Earth damage.',
      'The target must make a Strength saving throw.',
      'On a failed save, the target is grappled.',
      'As a bonus action, pull the grappled creature 10 feet closer.',
      'A grappled creature can spend its action to retry the Strength saving throw to escape.',
      'At Higher Ranks: Increase cost by 3, damage by 2d8, and range by 10 feet per rank above D.',
    ],
  },
  {
    name: 'Wood Release: World of Trees',
    rank: 'D',
    chakraCost: 5,
    description:
      'Inject chakra into the ground to create a 30-foot cube of difficult terrain filled with roots and plants, hindering movement and actions. Senju clan Hijutsu ignores temporary hit points and damage interception structures within the area.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (30-foot Cube)',
    duration: '1 Minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Earth Release', 'Water Release'],
    effects: [
      'Fill a 30-foot cube originating from you with difficult terrain.',
      'Creatures within the area cannot take the Dash or Dodge actions.',
      'Senju clan Hijutsu cast within the area ignores temporary hit points and structures that intercept damage.',
      'At Higher Ranks: Increase cost by 3 and the cube size by 10 feet per rank above D.',
    ],
  },
  {
    name: 'Wood Release: Great Spear Tree',
    rank: 'C',
    chakraCost: 8,
    description:
      'Summon a large, leafless tree with sharpened branches in a 15-foot cube, dealing damage and potentially restraining targets. The tree remains for 1 hour and counts as an Earthen Construct.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet (15-foot Cube)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Earth Release', 'Water Release'],
    effects: [
      'Choose a space within range.',
      'A large tree explodes from the ground.',
      'Creatures within the area must make a Dexterity saving throw.',
      'On a failed save, take 8d4 Earth damage and are restrained.',
      'On a successful save, take half damage and are not restrained.',
      'Restrained creatures can make Strength saving throws to escape at the end of their turns.',
      'The tree has an AC equal to your Ninjutsu Save DC, 40 hit points, and counts as an Earthen Construct. It remains for 1 hour.',
      'At Higher Ranks: Increase cost by 3 and summon an additional tree in a different space within range per rank above C. A creature can only be affected by one instance of this jutsu.',
    ],
  },
  {
    name: 'Wood Release: Wood Clone',
    rank: 'B',
    chakraCost: 10,
    description:
      'Create up to 6 wood clones, each costing 10 chakra, that act simultaneously and can use C-Rank or lower Senjutsu Hijutsu twice each. Clones have 15 hit points and deal 1d10 + Ninjutsu ability modifier Earth damage with their attacks.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Instant',
    keywords: [
      'Hijutsu',
      'Ninjutsu',
      'Earth Release',
      'Water Release',
      'Clone',
    ],
    effects: [
      'Create up to 6 Wood Clones, each costing 10 chakra.',
      'Clones act simultaneously and can only help the summoner with the help action.',
      'Clones have 15 hit points and use your Constitution saving throw bonus.',
      'Clones deal 1d10 + Ninjutsu ability modifier Earth damage with attacks.',
      'Clones can use C-Rank or lower Senjutsu Hijutsu twice each.',
      'The jutsu ends when a clone reaches 0 hit points, performs 2 Senju clan Hijutsu, or is dismissed as a bonus action.',
    ],
  },
  {
    name: 'Wood Release: Wood Dragon Summoning',
    rank: 'B',
    chakraCost: 14,
    description:
      'Summon a massive wooden serpentine dragon that you command. The dragon acts at the end of your turns and has powerful stats including a detonation ability.',
    components: ['HS', 'CM', 'CS'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Concentration, Up to 1 minute',
    keywords: [
      'Hijutsu',
      'Ninjutsu',
      'Fuinjutsu',
      'Earth Release',
      'Water Release',
    ],
    effects: [
      'Summon a massive wooden serpentine dragon.',
      'The dragon acts at the end of your turns and is proficient in all saving throws.',
      'As a bonus action or reaction, the dragon can use its Detonation ability.',
      'The dragon has the provided stat block.',
      'The dragon cannot be dispelled by jutsu of B-Rank or lower and is immune to form-altering effects.',
    ],
  },
  {
    name: 'Wood Release: Tree Bind Flourishing Burial',
    rank: 'A',
    chakraCost: 20,
    description:
      'Summon a massive 90-foot tall tree that attempts to capture and restrain creatures within a 30-foot cylinder, dealing damage and sealing their chakra. This jutsu counts as an Earthen Construct.',
    components: ['HS', 'CM', 'CS'],
    castingTime: 'Full Round Action',
    range: '90 feet (30-foot cylinder)',
    duration: 'Until Dispelled or Destroyed',
    keywords: [
      'Hijutsu',
      'Ninjutsu',
      'Fuinjutsu',
      'Earth Release',
      'Water Release',
    ],
    effects: [
      'Summon a 90-foot tall, 30-foot wide tree.',
      'Creatures within the cylinder must make a Strength saving throw.',
      'On a failed save, they are restrained, gain 3 ranks of Sealed, have total cover, and take 7d8 Earth and Chakra damage at the beginning of each of their turns.',
      'A restrained creature can use an action to make a Strength saving throw to escape. Two successful saves are required.',
      'A creature whose hit points reach 0 while under this effect becomes part of the tree.',
      'The tree has 100 hit points and 25 AC and remains until dispelled or destroyed.',
    ],
  },
];

export const SENJU_REQUIREMENTS = {
  abilityScores: {
    Constitution: 13,
  },
  features: ['Must possess Senju bloodline'],
  restrictions: ["Must uphold clan's peaceful ideals"],
};
