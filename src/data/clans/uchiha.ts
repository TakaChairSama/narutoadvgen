import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const UCHIHA_FEATURES: ClanFeature[] = [
  {
    name: 'Sharingan',
    description:
      "As a bonus action, activate your Sharingan for 1 minute. While active:\n- Advantage on Perception checks and can't be surprised\n- When a creature you can see casts a jutsu, you can use your reaction to copy it if you meet its requirements\n- Advantage on attacks against creatures within 5 feet\nCosts 2 chakra per round to maintain.",
    level: 1,
    chakraCost: 2,
  },
  {
    name: 'Fire Mastery',
    description:
      'You know the Fire Ball jutsu. When you cast a fire jutsu, you can reroll any number of damage dice, but must use the new results. Your fire jutsu ignore fire resistance.',
    level: 3,
  },
  {
    name: 'Genjutsu Expert',
    description:
      'While your Sharingan is active, you can cast genjutsu as a bonus action. Creatures have disadvantage on saves against your genjutsu, and you have advantage on saves against genjutsu.',
    level: 7,
  },
];

export const UCHIHA_JUTSU: ClanJutsu[] = [
  {
    name: 'Genjutsu: Sharingan',
    rank: 'D',
    chakraCost: 5,
    description:
      'Using the Sharingan, cast a D-Rank or lower genjutsu with a 1 action or bonus action casting time on a creature you make eye contact with within 30 feet.',
    components: ['CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Genjutsu', 'Visual'],
    effects: [
      'Requires active Sharingan.',
      'Make eye contact with a creature within range.',
      'Cast a D-Rank or lower genjutsu (no additional chakra cost) that meets the specified criteria (no M, CS, W, NT components, range not Self).',
      "The chosen genjutsu's range becomes the range of this jutsu and can only affect the target creature.",
      'At Higher Ranks: For each rank above D, increase the chakra cost by 4 and the rank of the genjutsu that can be cast by 1 (D>C>B>A>S).',
    ],
  },
  {
    name: 'Uchiha Ember Bullet',
    rank: 'D',
    chakraCost: 5,
    description:
      'Make a ranged ninjutsu attack that deals 5d6 + 5 damage and inflicts 1 rank of Burned.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Fire Release'],
    effects: [
      'Make a ranged ninjutsu attack against a target creature within range.',
      'On a hit, the target takes 5d6 + 5 damage and gains 1 rank of Burned.',
      'At Higher Ranks: For each rank above D, increase the chakra cost by 3 and the damage by 2d6+2.',
    ],
  },
  {
    name: 'Genjutsu: Deflect',
    rank: 'C',
    chakraCost: 8,
    description:
      'Using the Sharingan, deflect a genjutsu affecting you or another creature, redirecting it to a new target within 30 feet.',
    components: ['CM'],
    castingTime: '1 Reaction',
    range: '30 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Genjutsu', 'Visual'],
    effects: [
      'Requires active Sharingan.',
      'Use this reaction when you or another creature within range is affected by a genjutsu.',
      'Make a standard jutsu ability check (Genjutsu Ability modifier) vs. the triggering genjutsu.',
      'On a success, the genjutsu is deflected.',
      'Choose a new target within range and make eye contact.',
      'The target must make a Wisdom saving throw.',
      "On a failure, the target suffers the original genjutsu's failure effect.",
      "On a critical failure, the target suffers the original genjutsu's critical failure effect (or is Restrained if there is no critical failure effect).",
    ],
  },
  {
    name: 'Genjutsu: Red Star',
    rank: 'C',
    chakraCost: 9,
    description:
      'Place creatures in a 20-foot radius sphere under a genjutsu where the sun turns red and approaches, causing fear and driving them into darkness.',
    components: ['CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Genjutsu', 'Visual', 'Unaware'],
    effects: [
      'Select a space within range.',
      'Creatures in a 20-foot radius sphere centered on the space must make a Wisdom saving throw.',
      'On a failure, the creature gains 2 ranks of fear and tries to escape light sources, taking 5d8 psychic damage if starting their turn in light and remaking the save at the end of each turn.',
      'On a critical failure, the creature suffers the failure effects and takes an additional 2d8 psychic damage for each rank of fear at the start of their turn.',
    ],
  },
  {
    name: 'Uchiha Flame Flower',
    rank: 'B',
    chakraCost: 14,
    description:
      'Create 8 floating fire spheres that can be launched as bonus actions to deal 4d8+4 fire damage.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '120 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Fire Release'],
    effects: [
      'Create 8 fire spheres within range.',
      'As a bonus action, command a sphere to attack a creature within range (make a ninjutsu attack; on a hit, the target takes 4d8+4 fire damage and the sphere is lost).',
      'Missing with a sphere still destroys it.',
    ],
  },
  {
    name: 'Uchiha Flame Spiral',
    rank: 'A',
    chakraCost: 20,
    description:
      'Using the Sharingan, conjure three flaming tornados that deal 10d10+10 fire damage and can be moved as a bonus action. ',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '120 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Fire Release'],
    effects: [
      'Requires active Sharingan.',
      'Conjure three flaming tornados (5-foot radius, 30-foot height).',
      "Creatures within the tornados' areas and those whose space the tornados pass through must make a Dexterity saving throw, taking 10d10+10 fire damage on a failure or half as much on a success.",
      'Creatures making a saving throw against this jutsu must also make a Constitution saving throw to avoid being burned.',
      'As a bonus action, move each tornado up to 60 feet (tornados cannot occupy the same space).',
      'A creature cannot be affected by more than one tornado per turn.',
      'The flaming tornados have an AC equal to your Ninjutsu save DC and HP equal to ten times your Ninjutsu Ability Modifier. They count as flaming constructs, are vulnerable to cold damage, and regain HP equal to wind damage dealt to them.',
    ],
  },
];

export const UCHIHA_REQUIREMENTS = {
  abilityScores: {
    Intelligence: 13,
    Dexterity: 13,
  },
  features: ['Must possess Sharingan'],
  restrictions: [
    'Must protect clan secrets',
    'Emotional trauma can awaken powers',
  ],
};
