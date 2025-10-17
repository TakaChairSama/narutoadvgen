/* Chakra Weapons Library
   - Parses the provided raw list (from pasted.txt) and exports a searchable library.
   - Only blocks that are weapons are included (e.g., "Weapon (...)" headers and known weapon-like entries).
*/

export interface ChakraWeapon {
  name: string;
  type?: string;        // e.g., "Katana", "any sword", "Tanto"
  rank?: string;        // "E-Rank"..."S-Rank"
  attunement?: boolean;
  attunementText?: string;
  description: string;
}

// Heuristic parser for the pasted list
function parseChakraWeaponsLibrary(text: string): Record<string, ChakraWeapon> {
  // Split into logical blocks separated by double newlines
  const blocks = text
    .split(/\n{2,}/g)
    .map((b) => b.trim())
    .filter(Boolean);

  const lib: Record<string, ChakraWeapon> = {};

  const weaponHeaderRegex = /^Weapon\b/i;
  const headerRankRegex =
    /\b([ESABCD])\s*-\s*Rank\b|\b([ESABCD])\s*rank\b|\b([ESABCD])\s*-\s*rank\b/i;
  const typeRegex = /Weapon\s*\(([^)]+)\)/i;

  for (const block of blocks) {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length < 2) continue;

    const name = lines[0];
    const header = lines[1];

    // Determine if this block is a "weapon"
    const isWeapon =
      weaponHeaderRegex.test(header) ||
      /Weapon\s*\(/i.test(header) ||
      /Gunbai\s+Uchiwa/i.test(name) ||
      /Seven Ninja Swords/i.test(name) ||
      /Odachi/i.test(header) ||
      /Tanto/i.test(header) ||
      /Tetsubo/i.test(header) ||
      /Broadsword/i.test(header) ||
      /Katana/i.test(header) ||
      /Trident|Greataxe|Battleaxe|Sword|Longbow/i.test(header);

    if (!isWeapon) continue;

    // Extract type if present
    let type: string | undefined;
    const typeMatch = header.match(typeRegex);
    if (typeMatch) type = typeMatch[1].trim();

    // Extract rank symbol
    let rank: string | undefined;
    const rankMatch = header.match(headerRankRegex);
    if (rankMatch) {
      const r = (rankMatch[1] || rankMatch[2] || rankMatch[3] || '').toUpperCase();
      if (['E', 'D', 'C', 'B', 'A', 'S'].includes(r)) {
        rank = `${r}-Rank`;
      }
    } else {
      const alt = header.match(/\b([ESABCD])\s*-?\s*rank\b/i);
      if (alt) {
        const r = (alt[1] || '').toUpperCase();
        if (['E', 'D', 'C', 'B', 'A', 'S'].includes(r)) rank = `${r}-Rank`;
      }
    }

    // Attunement
    const attunement = /requires\s+attunement/i.test(header);

    const description = lines.slice(2).join('\n').trim();

    lib[name] = {
      name,
      type,
      rank,
      attunement,
      attunementText: attunement ? 'Requires attunement' : undefined,
      description,
    };
  }

  return lib;
}

// Raw pasted list (only weapon entries will be extracted)
const RAW_TEXT = `Armor of Gleaming
Armor (any medium or heavy), E-Rank
This armor never gets dirty.
Pill of Nourishment
Ninja Tool, E-Rank
This spongy, flavorless, gelatinous bead dissolves on your tongue and provides as much nourishment as 1 day of rations.
Bead of Refreshment
Ninja Tool, E-Rank
This spongy, flavorless, gelatinous bead dissolves in liquid, transforming up to a pint of the liquid into fresh, cold drinking water. The bead has no effect on chakra made liquids or harmful substances such as poison.
Boots of False Tracks
Ninja Tool, E-Rank
Only humanoids can wear these boots. While wearing the boots, you can choose to have them leave tracks like those of another kind of humanoid of your size.
Fuinjutsu Sealed Candle
Ninja Tool, E-Rank
The flame of this candle is not extinguished when immersed in water. It gives off light and heat like a normal candle.
Jizo's Die
Ninja Tool, E-Rank
Whenever you roll this six-sided die, you can control which number it rolls.
Cleansing Stone
Ninja Tool, E-Rank
A cleansing stone is a sphere 1 foot in diameter, engraved with chakra seals. When touching the stone, you can use an action to activate it and remove dirt and grime from your garments and your person. They take 3 hours to recharge and are usually reserved for emergency clean up.
Cloak of Billowing
Ninja Tool, E-Rank
While wearing this cloak, you can use a bonus action to make it billow dramatically.
Clockwork Amulet
Ninja Tool, C-Rank
This copper amulet contains a Space-Time Fuinjutsu seal, a seal of clockwork predictability. A creature that puts an ear to the amulet can hear faint ticking and whirring noises coming from within.
When you make an attack roll while wearing the amulet, you can forgo rolling the d20 to get a 10 on the die. Once used, this property can't be used until spend 15 chakra as a Action to recharge it.
Clothes of Mending
Clothing Set, E-Rank
This elegant outfit of traveler's clothes magically mends itself to counteract daily wear and tear. Pieces of the outfit that are destroyed can't be repaired in this way.
Helm of The Uchiha
Ninja Tool, E-Rank
This fearsome steel helm makes your eyes glow red while you wear it.
Ersatz Eye
Ninja Tool, E-Rank (requires attunement)
This artificial eye replaces a real one that was lost or removed. While the ersatz eye is embedded in your eye socket, it can't be removed by anyone other than you, and you can see through the tiny orb as though it were a normal eye.
Feather Token
Ninja Tool, E-Rank
This small metal disk is inscribed with the image of a feather. When you fall at least 20 feet while the token is on your person, you descend 60 feet per round and take no damage from falling. The token's magic is expended after you land, whereupon the disk becomes normal disk.
Glamerweave
Clothing Set, E-Rank or D-Rank
Glamerweave is clothing imbued with harmless illusory genjutsu. While wearing the common version of these clothes, you can use a bonus action to create a moving illusory pattern within the cloth.
D-Rank glamerweave can have the pattern rise from the cloth. For example, a glamerweave gown might be wreathed in harmless, illusory flames, while a glamerweave hat might have illusory butterflies fluttering around it.
When you make a Charisma (Performance) or Charisma (Persuasion) check while wearing the D-Rank version of glamerweave, you can roll a d6 and add the number rolled to the check. Once you use this property, it can't be used again until after the next rest.
Headband of Ninshou
Ninja Tool, E-Rank (requires attunement by Ninjutsu Specialist)
This headband is adorned with gold crescent moons and stars. While you are wearing it, you gain the following benefit:
You can try to cast a E-Rank Jutsu that you don't know. you must make a DC 8 Intelligence check. If the check succeeds, you cast the jutsu. If the check fails, so does the jutsu, and the action used to cast the Jutsu is wasted. In either case, the DC for this goes up by 2. It resets on a Long Rest
Horn of Silent Alarm
Ninja Tool, E-Rank
This horn has 4 charges. When you use an action to blow it, one creature of your choice can hear the horn's blare, provided the creature is within 600 feet of the horn and not deafened. No other creature hears sound coming from the horn. The horn regains 1d4 expended charges daily at dawn.
Instrument of Illusions
Ninja Tool, E-Rank( requires attunement)
While you are playing this musical instrument, you can create harmless, illusory visual effects within a 5-foot-radius sphere centered on the instrument. If you are a Genjutsu Specialist , the radius increases to 15 feet. Sample visual effects include luminous musical notes, a spectral dancer, butterflies, and gently falling snow. The magical effects have neither substance nor sound, and they are obviously illusory. The effects end when you stop playing.
Instrument of Scribing
Ninja Tool. E-Rank (requires attunement)
This musical instrument has 3 charges. While you are playing it, you can use an action to expend 1 charge from the instrument and write a message on a normal object or surface that you can see within 30 feet of you. The message can be up to six words long and is written in a language you know. If you are a Genjutsu Specialist, you can scribe an additional six words and choose to make the message glow faintly, allowing it to be seen in non-chakra enhanced darkness. Casting Chakra Dispel on the message erases it. Otherwise, the message fades away after 24 hours.
The instrument regains all expended charges daily at dawn.
Lock of Trickery
Ninja Tool, E-Rank
This lock appears to be an ordinary lock and comes with a single key. The tumblers in this lock adjust to thwart burglars. Dexterity checks made to pick the lock have disadvantage.
Uzumaki Mood Paint
Ninja Tool, E-Rank
This thick, black paint is stored in a small jar, containing enough paint to apply moodmarks to one creature. The paint is dabbed on the face in spots or markings that often resemble the eyes of insects or spiders. Applying the paint in this way takes 1 minute.
For the next 8 hours, the marks change to reflect your mental state. A creature that can see you and makes a successful DC 12 Wisdom (Insight) check can discern whether you are happy, sad, angry, disgusted, surprised, or afraid, as well as the main source of that emotion. For example, you might communicate fear caused by a monster you just saw around the corner, grief at the loss of a friend, or happiness derived from pride in your performance in combat. A dark elf has advantage on this check. It is used for festivals as a way to quickly guage someones mood and respond accordingly.
Tsukuyomi-Touched Sword
Weapon(Any Sword), E-Rank
In darkness, the unsheathed blade of this sword sheds moonlight, creating bright light in a 15-foot radius and dim light for an additional 15 feet.
Daikokuten Key
Ninja Tool, E-Rank
A question mark is worked into the head of this key. The key has a 5 percent chance of unlocking any lock into which it's inserted. It can only try once per lock. Once it unlocks something, the key disappears.
Smoldering Armor
Armor, E-Rank
Wisps of harmless, odorless smoke rise from this armor while it is worn.
Chakra-Forged Armor
Armor (medium or heavy), C-Rank
This set of armor is reinforced with Yang Chakra. While you're wearing it, any critical hit against you becomes a normal hit.
Ammunition, +1, +2, or +3
Weapon (any ammunition), D-rank (+1), B-rank (+2), or S-rank (+3)
You have a bonus to attack and damage rolls made with this piece of chakra-enhanced ammunition. The bonus is determined by the rarity of the ammunition. Once it hits a target, the ammunition is no longer chakra-enhanced.
Assassin Tabi
Ninja Tool, D-rank
While you wear these boots, your steps make no sound, regardless of the surface you are moving across. You also have advantage on Dexterity (Stealth) checks that rely on moving silently.
Bracers of the Kyudoka
Ninja Tool, D-rank(requires attunement)
While wearing these bracers, you have proficiency with the longbow and shortbow, and you gain a +2 bonus to damage rolls on ranged attacks made with such weapons.
Circlet of the Sun
Ninja Tool, D-rank
While wearing this circlet, you can use an action to cast the Fire Release: Scorching ray jutsu with it.The circlet can't be used this way again until the next dawn if it is left in the sun for an hour.
Dust of Disappearance
Ninja Tool, D-rank
Found in a small packet, this powder resembles very fine sand. There is enough of it for one use. When you use an action to throw the dust into the air, you and each creature and object within 10 feet of you become invisible for 2d4 minutes. The duration is the same for all subjects, and the dust is consumed when its chakra-enhanced takes effect. If a creature affected by the dust attacks or casts a spell, the invisibility ends for that creature.
Dust of Sneezing and Choking
Ninja Tool, E-rank
Found in a small container, this powder resembles very fine sand. It appears to be dust of disappearance, and an identify jutsu reveals it to be such. There is enough of it for one use. When you use an action to throw a handful of the dust into the air, you and each creature that needs to breathe within 30 feet of you must succeed on a DC 14 Constitution saving throw or become unable to breathe, while sneezing uncontrollably. A creature affected in this way is incapacitated and suffocating. As long as it is conscious, a creature can repeat the saving throw at the end of each of its turns, ending the effect on it on a success. The restoration jutsu can also end the effect on a creature.
Gloves of Swimming and Climbing
Ninja Tool, E-rank (requires attunement)
While wearing these gloves, climbing and swimming don't cost you extra movement, and you gain a +2 bonus to Strength (Athletics) checks made to climb or swim.
Goggles of Night
Ninja Tool, D-rank
While wearing these dark lenses, you have darkvision out to a range of 60 feet. If you already have darkvision, wearing the goggles increases its range by 60 feet.
Hat of Disguise
Ninja Tool, E-rank(requires attunement)
While wearing this hat, you can use an action to cast Transform from it at no chakra cost. If used this way it is cast as if you are Level 4.
Horn of The Siren
Ninja Tool, D-rank
You can use an action to blow the horn, which emits a thunderous blast in a 30-foot cone that is audible 600 feet away. Each creature in the cone must make a DC 14 Constitution saving throw. On a failed save, a creature takes 4d6 force damage and is deafened for 1 minute. On a successful save, a creature takes half as much damage and isn't deafened. Creatures and objects made of glass or crystal have disadvantage on the saving throw and take 10d6 force damage instead of 4d6. Each use of the horn's chakra-enhanced has a 30 percent chance of causing the horn to explode. The explosion deals 10d6 fire damage to the blower and destroys the horn.
Lantern of Revealing
Ninja Tool, D-rank
While lit, this hooded lantern burns for 6 hours on 1 pint of oil, shedding bright light in a 30-foot radius and dim light for an additional 30 feet. Invisible creatures and objects are visible as long as they are in the lantern's bright light. You can use an action to lower the hood, reducing the light to dim light in a 5-foot radius. A creature invisible via a jutsu above C-Rank cannot be rendered visible by this item.
Tetsubo of Disruption
Weapon (Tetsubo), D-rank (requires attunement)
When you hit a demon or zombie with this chakra weapon, that creature takes an extra 2d6 force damage. If the target has 25 hit points or fewer after taking this damage, it must succeed on a DC 15 Wisdom saving throw or be destroyed. On a successful save, the creature becomes frightened of you until the end of your next turn. While you hold this weapon, it sheds bright light in a 20-foot radius and dim light for an additional 20 feet.
Tetsubo of Terror
Weapon (mace), D-rank (requires attunement)
This chakra-enhanced weapon has 3 charges. While holding it, you can use an action and expend 1 charge to release a wave of terror. Each creature of your choice in a 30-foot radius extending from you must succeed on a DC 14 Wisdom saving throw or become frightened of you for 1 minute. While it is frightened in this way, a creature must spend its turns trying to move as far away from you as it can, and it can't willingly move to a space within 30 feet of you. It also can't take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If it has nowhere it can move, the creature can use the Dodge action. At the end of each of its turns, a creature can repeat the saving throw, ending the effect on itself on a success. The mace regains 1d3 expended charges daily at dawn.
Necklace of Adaptation
Ninja Tool, C-Rank (requires attunement)
While wearing this necklace, you have advantage on saving throws made against harmful gases and vapors (such as poison mist technique and stinking cloud effects, inhaled poisons, and the genjutsu with the Inhaled keyword).
Oil of Slipperiness
Potion, E-Rank
This sticky black unguent is thick and heavy in the container, but it flows quickly when poured. The oil can cover a Medium or smaller creature, along with the equipment it’s wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. For the next 8 hours, the affected creature is unaffected by difficult terrain, and jutsu and other chakra-based effects can neither reduce the creature’s speed nor cause the creature to be paralyzed or restrained. The creature can also spend 5 feet of movement to automatically escape from non-chakra enhanced restraints, such as manacles or a creature that has it grappled. Finally, being underwater imposes no penalties on the creature’s movement or attacks. Alternatively, the oil can be poured on the ground as an action, where it covers a 10-foot square, causing that area to become difficult terrain and forcing each creature standing in its area when it is poured to succeed on a DC 14 Dexterity saving throw or fall prone. A creature that enters the area or ends its turn there must also succeed on a Dexterity saving throw or fall prone. This effect lasts for the next 8 hours.
Pearl of Power
Ninja Tool, D-Rank (requires attunement)
You can use an action to speak this pearl’s command word and regain up to 10 expended chakra. Once you have used the pearl, it can’t be used again until the next dawn.
Periapt of Health
Ninja Tool, D-Rank
You are immune to contracting any natural disease while you wear this pendant. If you are already infected with a natural disease, the effects of the disease are suppressed while you wear the pendant.
Periapt of Wound Closure
Ninja Tool, B-Rank (requires attunement)
While you wear this pendant, you stabilize whenever you are dying at the start of your turn. In addition, whenever you roll a Hit Die to regain hit points, double the number of hit points it restores.
Philter of Love
Potion, D-Rank
The next time you see a creature within 10 minutes after drinking this philter, you become charmed by that creature for 1 hour. If the creature is of a species and gender you are normally attracted to, you regard it as your true love while you are charmed. This potion’s rose-hued, effervescent liquid contains one easy-to-miss bubble shaped like a heart.
Shakuhachi of Haunting
Ninja Tool, D-Rank
This shakuhachi has 3 charges. You can use an action to play it and expend 1 charge to create an eerie, spellbinding tune. Each creature within 30 feet of you that hears you play must succeed on a DC 16 Wisdom saving throw or gain 2 ranks of fear against you for 1 minute. If you wish, all creatures in the area that aren’t hostile toward you automatically succeed on the saving throw. A creature that fails the saving throw can repeat it at the end of each of its turns, ending the effect on itself on a success. A creature that succeeds on its saving throw is immune to the effect of this shakuhachi for 24 hours. The shakuhachi regains 1d3 expended charges daily at dawn.
Shakuhachi of the Sewers
Ninja Tool, D-Rank (requires attunement)
While you are attuned to this shakuhachi, ordinary rats and giant rats are indifferent toward you and will not attack you unless you threaten or harm them. This shakuhachi has 3 charges. If you play the shakuhachi as an action, you can use a bonus action to expend 1 to 3 charges, calling forth one swarm of rats (see the Bingo Book for their statistics) with each expended charge, provided that enough rats are within half a mile of you to be called in this fashion (as determined by the DM). If there aren’t enough rats to form a swarm, the charge is wasted. Called swarms move toward the music by the shortest available route but aren’t under your control otherwise. The shakuhachi regains 1d3 expended charges daily at dawn. Whenever a swarm of rats that isn’t under another creature’s control comes within 30 feet of you while you are playing the shakuhachi, you can make a Charisma check contested by the swarm’s Wisdom check. If you lose the contest, the swarm behaves as it normally would and can’t be swayed by the shakuhachi’s music for the next 24 hours. If you win the contest, the swarm is swayed by the shakuhachi’s music and becomes friendly to you and your companions for as long as you continue to play the shakuhachi each round as an action. A friendly swarm obeys your commands. If you issue no commands to a friendly swarm, it defends itself but otherwise takes no action. If a friendly swarm starts its turn and can’t hear the shakuhachi’s music, your control over that swarm ends, and the swarm behaves as it normally would and can’t be swayed by the shakuhachi’s music for the next 24 hours.
Pill of Animal Companion
Pill, D-Rank
When you eat this pill, you can cast the animal companion jutsu for 1 hour at half cost. You do not need to pay any chakra cost to maintain concentration on this jutsu when cast in this way.
Pill of Fire Breath
Pill, D-Rank
After eating this pill, you can use a bonus action to exhale fire at a target within 30 feet of you. The target must make a DC 14 Dexterity saving throw, taking 4d6 fire damage on a failed save, or half as much damage on a successful one. The effect ends after you exhale the fire three times or when 1 hour has passed.
Pill of Great Beast’s Strength
Pill, rank varies When you eat this pill, your Strength score changes for 1 hour. The type of beast determines the score (see the table below). The potion has no effect on you if your Strength is equal to or greater than that score. Any aadditional bonuses do not work with the pill.
Beast Pill
Type of Beast	Strength	Rarity
Fox	21	D-Rank
Tiger	23	C-Rank
Boar	25	C-Rank
Ox	27	B-Rank
Bijuu	29	A-Rank
Akimichi Imitation Pill
Pill, D-Rank
When you eat this pill, your size is increased by one size category for 1d4 hours. While your size is increased in this way, you have advantage on Strength checks and Strength saving throws, and whenever you would deal damage with a melee weapon attack, roll an additional 1d4 and add the result to the damage roll
Pill of Water Breathing
Pill, D-Rank
You can breathe underwater for 1 hour after eating this pill.
Quiver of Hachiman
Ninja Tool, D-Rank
Each of the quiver’s three compartments connects to an extradimensional space that allows the quiver to hold numerous items while never weighing more than 2 pounds. The shortest compartment can hold up to six ammunition stacks. The midsize compartment holds up to eighteen fuma-shuriken or similar objects. The longest compartment holds up to six long objects, such as bows, quarterstaffs, or similar objects. You can draw any item the quiver contains as if doing so from a regular quiver or scabbard.
Pill of Resistance
Pill, D-Rank
When you eat this pill, you gain resistance to one type of damage for 1 hour. The DM chooses the type or determines it randomly from the options below.
Resistances
d10	Damage Type
1	Acid
2	Cold
3	Earth
4	Fire
5	Force
6	Lightning
7	Necrotic
8	Poison
9	Pyschic
10	Wind
Blade of Wounding
Weapon (any sword), B-Rank (requires attunement)
Hit points lost to this weapon’s damage can be regained only through a short, long, or full rest, rather than by regeneration, jutsu, or any other means. Once per turn, when you hit a creature with an attack using the chakra enhanced weapon, you can inflict 1 rank of bleed on the target. A creature within 5 feet of the bleeding creature can also attempt to make the DC 20 Wisdom (Medicine) check to remove the condition.
Ring of Jumping
Ring, D-Rank (requires attunement)
While wearing this ring, you can use a bonus action to triple your jump distance for the next minute.
Ring of Mind Shielding
Ring, C-Rank (requires attunement)
While wearing this ring, you are immune to jutsu and other chakra-based effects that allow other creatures to read your thoughts, determine whether you are lying, know your alignment, or know your creature type. Creatures can telepathically communicate with you only if you allow it. You can use an action to cause the ring to become invisible until you use another action to make it visible, until you remove the ring, or until you die. If you die while wearing the ring, your soul enters it, unless it already houses a soul. You can remain in the ring or depart for the afterlife. As long as your soul is in the ring, you can telepathically communicate with any creature wearing it. A wearer can’t prevent this telepathic communication.
Ring of Warmth
Ring, D-Rank (requires attunement)
While wearing this ring, you have reduce cold damage by 1d4. In addition, you and everything you wear and carry are unharmed by temperatures as low as -50 degrees Fahrenheit.
Rod of the Illusionist
Rod, D-Rank (+1), B-Rank (+2), or S-Rank (+3) (requires attunement by a Genjutsu Specialist)
While holding this rod, you gain a bonus to genjutsu attack rolls and saving throws. The bonus is determined by the rod’s rank.
Rope of Climbing
Ninja Tool, D-Rank
This 60-foot length of silk rope weighs 3 pounds and can hold up to 3,000 pounds. If you hold one end of the rope and use an action to speak the command word, the rope animates. As a bonus action, you can command the other end to move toward a destination you choose. That end moves 10 feet on your turn when you first command it and 10 feet on each of your turns until reaching its destination, up to its maximum length away, or until you tell it to stop. You can also tell the rope to fasten itself securely to an object or to unfasten itself, to knot or unknot itself, or to coil itself for carrying. If you tell the rope to knot, large knots appear at 1-foot intervals along the rope. While knotted, the rope shortens to a 50-foot length and grants advantage on checks made to climb it. The rope has AC 20, 20 hit points, is resistant to all damage except psychic, and is immune to chakra absorption, chakra damage, and psychic damage. It regains 1 hit point every 5 minutes as long as it has at least 1 hit point. If the rope drops to 0 hit points, it is destroyed.
Scroll of Chakra Detection
Scroll, D-Rank
This scroll has 3 charges. While holding it, you can expend 1 charge as an action to cast the Sensing Technique jutsu from it. The scroll regains 1d3 expended charges daily at dawn.
Scroll of Secrets
Scroll, D-Rank
The scroll has 3 charges. While holding it, you can use an action to expend 1 of its charges, and if a secret door or trap is within 30 feet of you, the scroll flashes and points at the one nearest to you. The scroll regains 1d3 expended charges daily at dawn.
Scroll of the Shinobi, +1, +2, +3
Scroll, D-Rank (+1), B-Rank (+2), or S-Rank (+3) (requires attunement)
While holding this scroll, you gain a bonus to ninjutsu and genjutsu attack rolls determined by the scroll’s rank. In addition, you ignore half cover when making ninjutsu and genjutsu attacks.
Sending Stones
Ninja Tool, D-Rank
Sending stones come in pairs, with each smooth stone carved to match the other so the pairing is easily recognized. While you touch one stone, you can use an action to speak to the bearer of the other stone, no matter where they are in the world. You can only speak 25 words per action. If no creature bears the other stone, you know that fact as soon as you use the stone. Once you use a stone to speak to the other creature, they can’t be used again until the next dawn. If one of the stones in a pair is destroyed, the other one becomes non-chakra enhanced.
Staff of Swarming Insects
Staff, D-Rank (requires attunement)
This staff has 6 charges and regains 1d4+2 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, a swarm of insects consumes and destroys the staff, the disperses.
Insect Cloud: While holding the staff, you can use an action and expend 1 charge to cause a swarm of harmless flying insects to spread out in a 30-foot radius for you. The insects remain for 10 minutes, making the area heavily obscured for creatures other than you. The swarm moves with you, remaining centered on you. A wind of at least 10 miles per hour disperses the swarm and ends the effect.
Staff of the Adder
Staff, D-Rank (requires attunement by a medical-nin)
You can use a bonus action to speak this staff’s command word and make the head of the staff become that of an animate poisonous snake for 1 minute. By using another bonus action to speak the command word again, you return the staff to its normal inanimate form. You can make a melee attack using the snake head, which has a reach of 5 feet. Your proficiency bonus applies to the attack roll. On a hit, the target takes 1d6 piercing damage and must succeed on a DC 17 Constitution saving throw or take 3d6 poison damage. The snake head can be attacked while it is animate. It has an Armor Class of 18, 30 hit points, is resistant to all damage, and is immune to chakra absorption and chakra damage. If the head drops to 0 hit points, the staff is destroyed. As long as it’s not destroyed, the staff regains all lost hit points when it reverts to its inanimate form.
Jizo Stone
Ninja Tool, D-Rank (requires attunement)
While this polished agate is on your person, you gain a +1 bonus to ability checks and saving throws.
Blade of Vengeance
Weapon (any sword), D-Rank (requires attunement)
You gain a +1 bonus to attack and damage rolls made with this chakra enhanced weapon. Curse: This sword is cursed and possessed by a vengeful spirit. Becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the sword, keeping it on your person at all times. While attuned to this weapon, you have disadvantage on attack rolls made with weapons other than this one. In addition, while the sword is on your person, you must succeed on a DC 17 Wisdom saving throw whenever you take damage in combat. On a failed save, you must attack the creature that damaged you until you drop to 0 hit points or it does, or until you can’t reach the creature to make a melee attack against it. You can break the curse by casting Uzumaki break or genjutsu break on the sword. Alternatively, casting banishing seal or a similar jutsu on the sword forces the vengeful spirit to leave it. The sword then becomes a +1 weapon with no other properties.
Weapon, +1, +2, +3
Weapon (any), D-Rank (+1), B-Rank (+2), S-Rank (+3)
You have a bonus to attack and damage rolls made with this chakra enhanced weapon. The bonus is determined by the weapon’s rank.
Weapon of Warning
Weapon (any), D-Rank (requires attunement) This chakra enhanced weapon, warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can’t be surprised, except when incapacitated by something other than non-chakra-induced sleep. The weapon awakens you and your companions within range through your chakra connection if any of you are sleeping naturally when combat begins.
Wind Fan
Ninja Tool, D-Rank
While holding this fan, you can use an action to cast the violent whirlwind jutsu (save DC 14) from it. Once used, the fan shouldn’t be used again until the next dawn. Each time it is used again before then, it has a cumulative 20 percent chance of not working and tearing into useless, non-chakra enhanced tatters.
Winged Tabi
Ninja Tool, C-Rank (requires attunement)
While you wear these boots, you have a flying speed equal to your walking speed. You can use the boots to fly for up to 4 hours, all at once or in several shorter flights, each one using a minimum of 1 minute from the duration. If you are flying when the duration expires, you descend at a rate of 30 feet per round until you land. The boots regain 2 hours of flying capability for every 12 hours they aren’t in use.
Blood Spear
Weapon (spear), D-Rank (requires attunement)
When you hit with a melee attack using this spear and reduce the target to 0 hit points, you gain 2d6 temporary hit points.
Bijuu's Wrath Weapon
Weapon (Any), Rarity Varies (Requires Attunement)
This weapon is decorated with Bijuu heads, claws, wings, scales, or seals. It absorbs the energy of the bijuu’s breath weapon and deals damage of that type with its special properties.

Slumbering (D-Rank).: Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the bijuu’s breath weapon.

Stirring (C-Rank). The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the bijuu’s breath weapon.

Wakened (A-Rank). The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6. As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 18 Dexterity saving throw, taking 8d6 damage of the type dealt by the bijuu’s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can’t be used again until the next dawn.

Ascendant (S-Rank). The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.
The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 20, and the damage increases to 12d6.
Dust of Corrosion
Ninja Tool, D-Rank
As an action, you can throw this dust into the air, filling a 10-foot cube that extends out from you. Surfaces and objects made of non-chakra enhanced ferrous metal in the area instantly corrode and turn to dust, becoming useless and unsalvageable. Any creature in the area that is made wholly or partly out of ferrous metal must make a DC 13 Constitution saving throw, taking 4d8 necrotic damage on a failed save, or half as much damage on a successful one.
Found in a small packet, this dust is made from finely ground rust monster antennae. There is enough dust in each packet for one use.
Dust of Deliciousness
Ninja Tool, D-Rank
This reddish brown dust can be sprinkled over any edible substance to greatly improve the flavor. The dust also dulls the eater's senses: anyone eating food treated with this dust has disadvantage on Wisdom ability checks and Wisdom saving throws for 1 hour. There is enough dust to flavor six servings.
Izanagi Steel Blade
Weapon (any sword), C-Rank (requires attunement)
The black blade of this sword is crafted from a mysterious chakraful alloy found in deep caves. You gain a +1 bonus to attack and damage rolls made with this magic weapon. While the sword is on your person, you are immune to effects that turn undead.
Dark Blessing. While holding the sword, you can use an action to give yourself 1d4 + 4 temporary hit points. This property can't be used again until the next dusk.
Disheartening Strike. When you hit a creature with an attack using this weapon, you can fill the target with unsettling dread: the target has disadvantage on the next saving throw it makes before the end of your next turn. The creature ignores this effect if it's immune to the frightened condition. Once you use this property, you can't do so again until the next dusk.
Assassin’s Hood
Ninja Tool, C-rank (requires attunement)
While you wear this cloak with its hood up, Wisdom (Perception) checks made to see you have disadvantage, and you have advantage on Dexterity (Stealth) checks made to hide, as the cloak's color shifts to camouflage you. Pulling the hood up or down requires an action.
Cloak of Waterbreathing
Ninja Tool, C-rank
While wearing this cloak with its hood up, you can breathe underwater, and you have a swimming speed of 60 feet. Pulling the hood up or down requires an action.
Armor, +1, +2, or +3
Armor (light, medium, or heavy), C-Rank(+1), A-Rank(+2), or S-Rank (+3)
You have a bonus to AC while wearing this armor. The bonus is determined by its rarity.
Tanto of the Cobra
Weapon (Tanto), C-rank
You gain a +1 bonus to attack and damage rolls made with this chakra-infused weapon.
You can use an action to cause thick, black poison to coat the blade. The poison remains for 1 minute or until an attack using this weapon poisons a creature. That creature must succeed on a DC 16 Constitution saving throw or take 2d6 poison damage and become poisoned for 1 minute. On a success they take half damage can cannot be poisoned by this dagger until the next rest. The dagger can't be used this way again until the next dawn.
Shinobi Chain
Armor (Medium ), C-rank
You gain a +1 bonus to AC while you wear this armor. You are considered proficient with this armor even if you lack proficiency with medium armor.
Flame Tongue
Weapon (any sword), C-rank (requires attunement)
You can use a bonus action to cast Flame Coat at C-rank. When you cast Flame Coat using this weapon, you do not pay concentration cost and your concentration DC is lowered by 1.
Gauntlets of Oni Power
Ninja Tool, C-rank (requires attunement)
Your Strength score is 19 while you wear these gauntlets. They have no effect on you if your Strength is already 19 or higher.
Gem of Brightness
Ninja Tool, C-rank
This Fire Release infused prism has 50 charges. While you are holding it, you can, as an action, cause one of the following effects:

The first command word causes the gem to shed bright light in a 30-foot radius and dim light for an additional 30 feet. This effect doesn't expend a charge. It lasts until you use a bonus action to repeat the command word or until you use another function of the gem.

The second command word expends 1 charge and causes the gem to fire a brilliant beam of light at one creature you can see within 60 feet of you. The creature must succeed on a DC 15 Constitution saving throw or become blinded for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.

The third command word expends 5 charges and causes the gem to flare with blinding light in a 30- foot cone originating from it. Each creature in the cone must make a saving throw as if struck by the beam created with the second command word. When all of the gem's charges are expended, the gem becomes a normal jewel worth 500 Ryo
Giant Slayer
Weapon (any axe or sword), C-rank
You gain a +1 bonus to attack and damage rolls made with this chakra-enhanced weapon.
When you hit a Large or bigger creature with it, the target takes an extra 2d4 damage of the weapon's type and must succeed on a DC 17 Strength saving throw or fall prone.
Glamoured Studded Leather
Armor (studded leather), C-rank
While wearing this armor, you gain a +1 bonus to AC. You can also use a bonus action to speak the armor's command word and cause the armor to assume the appearance of a normal set of clothing or some other kind of armor. You decide what it looks like, including color, style, and accessories, but the armor retains its normal bulk and weight. The illusory appearance lasts until you use this property again or remove the armor.
Gloves of Missile Snaring
Ninja Tool, D-rank (requires attunement)
These gloves seem to almost meld into your hands when you don them. When a ranged weapon attack hits you while you're wearing them, you can use your reaction and spend 3 chakra to reduce the damage by 1d6 + your Dexterity modifier, provided that you have a free hand. If you reduce the damage to 0, you can catch the missile if it is small enough for you to hold in that hand.
Headband of Nara Intellect
Ninja Tool, B-rank (requires attunement)
Your Intelligence score is 19 while you wear this headband. It has no effect on you if your Intelligence is already 19 or higher
Tetsubo of Smiting
Weapon (Tetsubo), C-rank
You gain a +1 bonus to attack and damage rolls made with this chakra-enhanced weapon. The bonus increases to +3 when you use the tetsubo to attack a construct.
When you roll a 20 on an attack roll made with this weapon, the target takes an extra 2d6 bludgeoning damage, or 4d6 bludgeoning damage if it's a construct. If a construct has 50 hit points or fewer after taking this damage, it is destroyed.
Mantle of Ashura
Ninja Tool, C-rank (requires attunement)
You have advantage on saving throws against non-elemental Ninjutsu while you wear this cloak
Necklace of Fireballs
Ninja Tool, C-Rank
This necklace has 1d6+3 beads hanging from it. You can use an action to detach a bead and throw it up to 60 feet away. When it reaches the end of its trajectory, the bead detonates as a C-Rank Fire Release: Great Fireball jutsu (save DC 17). You can hurl multiple beads, or even the whole necklace, as one action. When you do so, increase the rank of the fire release: great fireball by 1 for every two beads beyond the first.
Pill of Gaseous Form
Pill, C-Rank
When you eat this pill, you gain the effect of the Water Release: Hiding in Mist jutsu for 1 hour (no concentration required) or until you end the effect as a bonus action.
Pill of Diminution
Pill, C-Rank
When you eat this pill, your size is reduced by one size category for 1d4 hours. While your size is reduced in this way, you have disadvantage on Strength checks and Strength saving throws, and whenever you would deal damage with a melee weapon attack, roll an additional 1d4 and subtract the result from the damage roll.
Pill of Heroism
Pill, C-Rank
For 1 hour after eating it, you gain 15 temporary hit points that last for 1 hour or until lost. For the same duration, you are under the effect of the Bless jutsu cast at D-Rank.
Necklace of Prayer Beads
Ninja Tool, C-Rank (requires attunement by a Medical-nin or Genjutsu specialist)
This necklace has 1d4+2 chakra enriched beads made from aquamarine, black pearl, or topaz. It also has many non-chakra enriched beads made from stones such as amber, bloodstone, citrine, coral, jade, pearl, or quartz. If a chakra enriched bead is removed from the necklace, that bead loses its chakra. Six types of chakra enriched beads exist. The DM decides the type of each bead on the necklace or determines it randomly. A necklace can have more than one bead of the same type. To use one, you must be wearing the necklace. Each bead contains a jutsu that you can cast from it as a bonus action (using a 16 as jutsu save DC of the appropriate type if a save is necessary). Once a chakra enriched bead’s jutsu is cast, that bead can’t be used again until the next dawn. Jutsu cast from a bead that requires concentration does not require chakra to maintain.
Beads
D20	Bead of:	Jutsu
1-6	Bravery	Bless
7-12	Curing	Healing Hands(C-Rank)
13-16	Favor	Restorative (B-Rank)
17-18	Smiting	Ensnaring Strike (C-Rank)
19	Summons	Summoning: Rashomon
20	Haze	Haze Clone
Periapt of Proof against Poison
Ninja Tool, C-Rank
This delicate silver chain has a brilliant-cut black gem pendant. While you wear it, you have advanatage to resist the poisoned condition and have resistance to poison damage
Robe of Eyes
Wondrous item, C-Rank (requires attunement)
This robe is adorned with eyelike patterns. While you wear the robe, you gain the following benefits:

The robe lets you see in all directions, and you have advantage on Wisdom (Perception) checks that rely on sight.
You have darkvision out to a range of 30 feet.
You can see invisible creatures and objects out to 30 feet.

The eyes on the robe can’t be closed or averted. Although you can close or avert your own eyes, you are never considered to be doing so while wearing this robe. A Light jutsu cast on the robe or a Flash jutsu cast within 5 feet of the robe causes you to be blinded for 1 minute. At the end of each of your turns, you can make a DC 16 Constitution saving throw, ending the blindness on a success.
Portable Hole
Ninja Tool, C-Rank
This fine black cloth, soft as silk, is folded up to the dimensions of a handkerchief. It unfolds into a circular sheet 6 feet in diameter. Infused with Space-Time Ninjutsu it can make a portable hole.
You can use an action to unfold a portable hole and place it on or against a solid surface, whereupon the portable hole creates an extradimensional hole 10 feet deep. The cylindrical space within the hole exists in a different dimension, so it can’t be used to create open passages. Any creature inside an open portable hole can exit the hole by climbing out of it.
You can use an action to close a portable hole by taking hold of the edges of the cloth and folding it up. Folding the cloth closes the hole, and any creatures or objects within remain in the extradimensional space. No matter what’s in it, the hole weighs next to nothing.
If the hole is folded up, a creature within the hole’s extradimensional space can use an action to make a DC 13 Strength check. On a successful check, the creature forces its way out and appears within 5 feet of the portable hole or the creature carrying it. A breathing creature within a closed portable hole can survive for up to 10 minutes, after which time it begins to suffocate.
Placing a portable hole inside an extradimensional space created by a bag of holding, handy haversack, or similar item instantly destroys both items and opens a gate to an Astral Dimension. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it and deposited in a random location in that Astral Dimension. The gate then closes. The gate is one-way only and can’t be reopened.
Pill of Invulnerability
Pill, C-Rank
For 1 minute after you eat this pill, you have resistance to all damage.
Ring of Protection
Ring, C-Rank (requires attunement)
You gain a +1 bonus to AC and saving throws while wearing this ring
Ring of the Ram
Ring, C-Rank (requires attunement)
This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing the ring, you can use an action to expend 1 to 3 of its charges to attack one creature you can see within feet of you. The ring produces a spectral ram’s head and makes its attack roll with a +8 bonus. On a hit, for each charge you spend, the target takes 2d10 force damage and is pushed 5 feet away from you. Alternatively, you can expend 1 to 3 of the ring’s charges as an action to try to break an object you can see within 60 feet of you that isn’t being worn or carried. The ring makes a Strength check with a +5 bonus for each charge you spen
Ring of X-Ray Vision
Ring, C-Rank (requires attunement)
While wearing this ring, you can use an action to speak its command word. When you do so, you can see into and through solid matter for 1 minute. This vision has a radius of 30 feet. To you, solid objects within that radius appear transparent and don’t prevent light from passing through them. The vision can penetrate 1 foot of stone, 1 inch of common metal, or up to 3 feet of wood or dirt. Thicker substances block the vision, as does a thin sheet of lead. Whenever you use the ring again before taking a long rest, you must succeed on a DC 17 Constitution saving throw or gain one level of exhaustion
Rod of Rulership
Rod, C-Rank (requires attunement)
You can use an action to present the rod and command obedience from each creature of your choice that you can see within 120 feet of you. Each target must succeed on a DC 16 Wisdom saving throw or gain 2 ranks of charm against you for 8 hours. While charmed in this way, the creature regards you as its trusted leader. If harmed by you or your companions, or commanded to do something contrary to its nature, a target ceases to be charmed in this way. The rod can’t be used again until the next dawn.
Rope of Entanglement
Ninja Tool, C-Rank
This rope is 30 feet long and weighs 3 pounds. If you hold one end of the rope and use an action to speak its command word, the other end darts forward to entangle a creature you can see within 20 feet of you. The target must succeed on a DC 17 Dexterity saving throw or become restrained. You can release the creature by using a bonus action to speak a second command word. A target restrained by the rope can use an action to make a DC 17 Strength or Dexterity check (target’s choice). On a success, the creature is no longer restrained by the rope. The rope has AC 20, 20 hit points, is resistant to all damage except psychic, and is immune to chakra absorption, chakra damage, and psychic damage. It regains 1 hit point every 5 minutes as long as it has at least 1 hit point. If the rope drops to 0 hit points, it is destroyed.
Weapon of Speed
Weapon(Any), B-Rank
You gain a +2 bonus to attack and damage rolls made with this chakra enhanced weapon. In addition, you can make one attack with it as a bonus action on each of your turns.
Sovereign Glue
Ninja Tool, S-Rank
This viscous, milky-white substance can form a permanent adhesive bond between any two objects. It must be stored in a jar or flask that has been coated inside with oil of slipperiness. When found, a container contains 1d6+1 ounces. One ounce of the glue can cover a 1-foot square surface. The glue takes 1 minute to set. Once it has done so, the bond it creates can be broken only by the application of universal solvent.
Universal Solvent
Ninja Tool, S-Rank
This tube holds milky liquid with a strong alcohol smell. You can use an action to pour the contents of the tube onto a surface within reach. The liquid instantly dissolves up to 1 square foot of adhesive it touches, including sovereign glue.
Scroll of Binding
Scroll, B-Rank (requires attunement)
This scroll has 7 charges for the following properties. It regains 1d6+1 expended charges daily at dawn. If you expend the scroll’s last charge, roll a d20. On a 1, the scroll crumbles into ashes and is destroyed.
Paralyze. While holding the scroll, you can use an action to expend 5 charges to cast Effortless Stun with a save DC of 17.
Assisted Escape. While holding the scroll, you can use your reaction to expend 1 charge and gain advantage on a saving throw you make to avoid being paralyzed or restrained, or you can expend 1 charge and gain advantage on any check you make to escape a grapple.
Scroll of Flame Bombs
Scroll, C-Rank (requires attunement)
This scroll has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the Fire Release: Dragon Flame Bombs jutsu (save DC 17) from it. For 1 charge, you cast the C-Rank version of the jutsu. You can increase the jutsu rank by one for each additional two charges you expend. The scroll regains 1d6+1 expended charges daily at dawn. If you expend the scroll’s last charge, roll a d20. On a 1, the scroll crumbles into ashes and is destroyed.
Scroll of Lightning Currents
Scroll, C-Rank (requires attunement)
This scroll has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the Lightning Release: Lightning Current jutsu (save DC 17) from it. For 1 charge, you cast the C-Rank version of the jutsu. You can increase the jutsu rank by one for each additional two charges you expend. The scroll regains 1d6+1 expended charges daily at dawn. If you expend the scroll’s last charge, roll a d20. On a 1, the scroll crumbles into ashes and is destroyed.
Wings of Flying
Ninja Tool, C-Rank (requires attunement)
While wearing this cloak, you can use an action to speak its command word. This turns the cloak into a pair of bat wings or bird wings on your back for 1 hour or until you repeat the command word as an action. The wings give you a flying speed of 30 feet. When they disappear, you can’t use them again for 1d12 hours.
Berserker Axe
Weapon (any axe), B-Rank (requires attunement)
You gain a +1 bonus to attack and damage rolls made with this chakra-infused weapon. In addition, while you are attuned to this weapon, your hit point maximum increases by 1 for each level you have attained.
Curse This axe is cursed, and becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the axe, keeping it within reach at all times. You also have disadvantage on attack rolls with weapons other than this one, unless no foe is within 60 feet of you that you can see or hear. Whenever a hostile creature damages you while the axe is in your possession, you must succeed on a DC 15 Wisdom saving throw or go berserk. While berserk, you must use your action each round to attack the creature nearest to you with the axe. If you can make extra attacks as part of the Attack action, you use those extra attacks, moving to attack the next nearest creature after you fell your current target. If you have multiple possible targets, you attack one at random. You are berserk until you start your turn with no creatures within 60 feet of you that you can see or hear.
Speed Sandals
Ninja Tool, B-rank(requires attunement)
While you wear these sandals, you can use a bonus action and click the sandals's heels together. If you do, the sandals double your walking speed, and any creature that makes an opportunity attack against you has disadvantage on the attack roll. If you click your heels together again, you end the effect. When the sandal's property has been used for a total of 10 minutes, the chakra-enhanced ceases to function until you finish a long rest.
Cloak of Displacement
Ninja Tool, B-rank (requires attunement)
While you wear this cloak, it projects an illusion that makes you appear to be standing in a place near your actual location, causing any creature to make a DC 18 Wisdom Saving throw when they target you with an attack, having disadvantage on attack rolls against you on a failed save until the end of their turn. If you take damage, the property ceases to function until you spend 5 chakra as a free action your turn to reset it. This property is suppressed while you are incapacitated, restrained, or otherwise unable to move.
Oni’s Armor
Armor (Heavy Armor), B-rank (requires attunement)
While wearing this armor, you gain a +1 bonus to AC. In addition, the armor's clawed gauntlets turn unarmed strikes with your hands into chakra weapons that deal slashing damage, with a +1 bonus to attack rolls and damage rolls and a damage die of 1d8. Curse. Once you don this cursed armor, you can't doff it unless you are targeted by the genjutsu break jutsu. While wearing the armor, you have disadvantage on attack rolls against demons and on saving throws against their spells and special abilities.
Space-Time Shackles
Ninja Tool, B-rank
You can use an action to place these shackles on an incapacitated creature. The shackles adjust to fit a creature of Small to Large size. In addition to serving as mundane manacles, the shackles prevent a creature bound by them from using any method of extradimensional movement, including teleportation or travel to a different plane of existence. They don't prevent the creature from passing through an interdimensional portal. You and any creature you designate when you use the shackles can use an action to remove them. Once every 30 days, the bound creature can make a DC 30 Strength (Athletics) check. On a success, the creature breaks free and destroys the shackles.
Oathbow
Weapon (longbow), B-Rank (requires attunement)
When you knock an arrow on this bow, it whispers in an ancient language, “Swift defeat to my enemies.” When you use this weapon to make a ranged attack, you can, as a command phrase, say, “Swift death to you who have wronged me.” The target of your attack becomes your sworn enemy until it dies or until dawn seven days later. You can have only one such sworn enemy at a time. When your sworn enemy dies, you can choose a new one after the next dawn. When you make a ranged attack roll with this weapon using your Attack Action against your sworn enemy, you have advantage on the roll. In addition, your target gains no benefit from cover, other than total cover, and you suffer no disadvantage due to long range. If the attack hits, your sworn enemy takes an extra 2d6 piercing damage. While your sworn enemy lives, you have disadvantage on attack rolls with all other weapons
Oil of Sharpness
Potion, B-Rank
This clear, gelatinous oil sparkles with tiny, ultrathin silver shards. The oil can coat one slashing or piercing weapon or one stack of slashing or piercing ammunition. Applying the oil takes 1 minute. For 1 hour, the coated item is chakra enhanced and has a +2 bonus to attack and damage rolls.
Pill of Speed
Pill, B-Rank
When you eat this pill, you gain the effect of the wind release: wind friction shatter jutsu for 1 minute (no concentration required).
Staff of Striking
Staff, B-Rank (requires attunement)
This staff can be wielded as a chakra enhanced quarterstaff that grants a +2 bonus to attack and damage rolls made with it. The staff has 10 charges. When you hit with a melee attack using it, you can expend up to 3 of its charges. For each charge you expend, the target takes an extra 1d6 force damage. The staff regains 1d4+2 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff becomes a non-chakra enhanced quarterstaff.
Sword of Sharpness
Weapon (any sword that deals slashing damage), B-Rank (requires attunement)
When you attack an object with this chakra enhanced sword and hit, maximize your weapon damage dice against the target. When you attack a creature with this weapon and roll a 20 on the attack roll, that target takes extra slashing damage equal to your proficiency bonus. Then roll another d20. If you roll a 20, you lop off one of the target’s limbs, with the effect of such loss determined by the DM. If the creature has no limb to sever, you lop off a portion of its body instead.
Staff of Thunder and Lightning
Staff, B-Rank (requires attunement)
This staff can be wielded as a chakra enhanced quarterstaff that grants a +2 bonus to attack and damage rolls made with it. It also has the following additional properties. When one of these properties is used, it can’t be used again until the next dawn.
Lightning. When you hit with a melee attack using the staff, you can cause the target to take an extra 3d6 lightning damage.
Thunder. When you hit with a melee attack using the staff, you can cause the staff to emit a crack of thunder, audible out to 300 feet. The target you hit must succeed on a DC 18 Constitution saving throw or become stunned until the end of your next turn.
Lightning Strike. You can use an action to cause a bolt of lightning to leap from the staff’s tip in a line that is 5 feet wide and 120 feet long. Each creature in that line must make a DC 18 Dexterity saving throw, taking 6d6 lightning damage on a failed save, or half as much damage on a successful one.
Thunderclap. You can use an action to cause the staff to issue a deafening thunderclap, audible out to 600 feet. Each creature within 60 feet of you (not including you) must make a DC 18 Constitution saving throw. On a failed save, a creature takes 4d6 wind damage and becomes deafened for 1 minute. On a successful save, a creature takes half damage and isn’t deafened.
Thunder and Lightning. You can use an action to use the Lightning Strike and Thunderclap properties at the same time. Doing so doesn’t expend the daily use of those properties, only the use of this one.
Bloodaxe
Weapon (greataxe),B-Rank (requires attunement)
You gain a +2 bonus to attack and damage rolls made with this magic axe. The axe deals an extra 1d6 necrotic damage to creatures that aren't constructs or undead. If you reduce such a creature to 0 hit points with an attack using this axe, you gain 10 temporary hit points.
Blade of the Medusa
Weapon (any sword), B-Rank (requires attunement)
When you attack a creature with this magic weapon and roll a 20 on the attack roll, the creature must make a DC 18 Constitution saving throw in addition to suffering the attack’s normal effects. On a failed save, the creature is restrained and must make another Constitution saving throw at the end of each of its turns. If it successfully saves against this effect three times, the effect ends. If it fails its saves three times, it is turned to stone and subjected to the petrified condition for 1 hour.
A creature is immune to this effect if it is immune to damage of the weapon’s type, does not have a body made of flesh, or has legendary actions.
Curse. This weapon is cursed, and becoming attuned to it extends the curse to you. You are unwilling to part with the weapon. Whenever you attack a creature with this weapon and roll a 1 on the attack roll, you must succeed on a DC 15 Constitution saving throw or be restrained and forced to make additional saves against being petrified, as above.
Chronolometer
Ninja Tool, B-Rank (requires attunement)
While attuned to this device, you have a +1 bonus to Intelligence saving throws. The first time you attune to the chronolometer, you choose one language you don't know. You subsequently know that language while attuned to the device.
Time Bandit. At the start of your turn, roll a d6 (no action required). On a 1-3, you slow down time, gaining an additional action on your turn and doubling your speed until the end of the turn. On a 4-6, you go forward in time to warn yourself of what is to come. The next time you fail a saving throw, attack roll, or ability check, you can reroll the check and take either result. Once you use this feature of the chronolometer, it cannot be used again until the next dawn.
Fate Swap. As a reaction when a creature you can see within 30 feet of you takes damage, that creature gains an additional action if it is the creature's turn, or can take an action immediately even though it isn't the creature's turn. Once you use this feature of the chronolometer, it cannot be used again until the next dawn.
Part of a Whole. While this component is not installed in the Orrery of the Wanderer, its magic might function sporadically or with unpredictable side effects, as determined by the DM.
Cloak of Arachnida
Ninja Tool, B-Rank (requires attunement)
This fine garment is made of black silk interwoven with faint silvery threads. While wearing it, you gain the following benefits:
You have resistance to poison damage.
You have a climbing speed equal to your walking speed.
You can move up, down, and across vertical surfaces and upside down along ceilings, while leaving your hands free.
You can't be caught in webs of any sort and can move through webs as if they were difficult terrain.
You can use an action to cast the SPIDER WEB WALL (save DC 17). The web created by the spell fills twice its normal area. Once used, this property of the cloak can't be used again until the next dawn.
Uzumaki Spatial Armor
Armor (light), B-Rank (requires attunement)
While wearing this armor, you gain a +1 bonus to AC. In addition, the armor’s animated straps can assist with the drawing and sheathing of weapons, such that you can draw or stow two one-handed weapons when you would normally be able to draw or stow only one.
This armor also has six pockets, each of which is an extradimensional space. Each pocket can hold up to 20 pounds of material, not exceeding a volume of 2 cubic feet. The armor always weighs 10 pounds, regardless of its pockets’ contents. Placing an object into one of the armor’s pockets follows the normal rules for interacting with objects. Retrieving an item from a pocket of the armor requires you to use an action. When you reach into a pocket for a specific item, the item is always magically on top.
Placing the armor inside an extradimensional space created by a Bag of Holding, a Heward’s Handy Haversack, or a similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it and deposited in a random location on the Astral Plane. The gate then closes. The gate is one-way only and can’t be reopened.
Hunter's Coat
Armor (leather), B-Rank (requires attunement)
You gain a +1 bonus to AC while wearing this armor.
The coat has 3 charges. When you hit a creature with an attack and that creature doesn't have all its hit points, you can expend 1 charge to deal an extra 1d10 necrotic damage to the target. The coat regains 1d3 expended charges daily at dawn.
Scroll of Bodily Health
Ninja Tool, A-Rank
This book contains health and diet tips, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practicing its guidelines, your Constitution score increases by 2, as does your maximum for that score. The manual then loses its chakra, but regains it in a century.
Scroll of Gainful Exercise
Ninja Tool, A-Rank
This book describes fitness exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practicing its guidelines, your Strength score increases by 2, as does your maximum for that score. The manual then loses its chakra, but regains it in a century.
Scroll of Quickness of Action
Ninja Tool, A-Rank
This book contains coordination and balance exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practicing its guidelines, your Dexterity score increases by 2, as does your maximum for that score. The manual then loses its magic, but regains it in a century.
Wheel of Stars
Ninja Tool, B-Rank
While attuned to this device, you have a +1 bonus to Wisdom saving throws.
Portent of the Stars. As a reaction when a creature you can see within 60 feet of you makes an attack roll, saving throw, or ability check, you make that creature roll a d10 and add or subtract the number rolled (your choice) from the roll. Once you use this feature of the wheel of stars, it cannot be used again until the next dawn.
Alter Gravity. As an action, you can gain a flight speed equal to your walking speed for 1 minute, Once you use this feature of the wheel of stars, it cannot be used again until the next dawn.
Part of a Whole. While this component is not installed in the Orrery of the Wanderer, its magic might function sporadically or with unpredictable side effects, as determined by the DM.
Crystal Ball
Ninja Tool, A-rank or S-rank (requires attunement)
The typical crystal ball, an A-rank item, is about 6 inches in diameter. While touching it, you can cast Kagura’s Mind Eye with it. If the jutsu is on your Known Jutsu list, you can cast it at half cost.
The following crystal ball variants are S-rank items and have additional properties.

Crystal Ball of Mind Reading. You can use an action to cast the detect thoughts (save DC 17,half chakra cost) while you are using Kagura’s Mind Eye with the crystal ball, targeting creatures you can see. You don't need to concentrate on this detect thoughts to maintain it during its duration, but it ends if Kagura’s Mind Eye ends.

Crystal Ball of Telepathy. While using Kagura’s Mind Eye with the crystal ball, you can communicate telepathically with creatures you can see within 30 feet of the jutsu's sensor. You can also use an action to cast the suggestion jutsu (save DC 17) through the sensor on one of those creatures. You don't need to concentrate on this suggestion to maintain it during its duration, but it ends if Kagura’s Mind Eye ends. Once used, the suggestion power of the crystal ball can't be used again until the next dawn.

Crystal Ball of True Seeing. While using Kagura’s Mind Eye with the crystal ball, you have truesight.
Dancing Sword
Weapon (any sword), A-rank (requires attunement)
You can use a bonus action to toss this chakra-enhanced sword into the air and speak the command word. When you do so, the sword begins to hover, flies up to 30 feet, and attacks one creature of your choice within 5 feet of it. The sword uses your attack roll and ability score modifier to damage rolls.
While the sword hovers, you can use a bonus action to cause it to fly up to 30 feet to another spot within 30 feet of you. As part of the same bonus action, you can cause the sword to attack one creature within 5 feet of it.
After the hovering sword attacks for the fourth time, it flies up to 30 feet and tries to return to your hand. If you have no hand free, it falls to the ground at your feet. If the sword has no unobstructed path to you, it moves as close to you as it can and then falls to the ground. It also ceases to hover if you grasp it or move more than 30 feet away from it.
Blade of the Yuki
Weapon (any sword), A-rank (requires attunement)
When you hit with an attack using this chakra-enhanced sword, the target takes an extra 2d6 cold damage. In addition, as a bonus action while you hold the sword, you gain resistance to fire damage for the next 1 minute.
While holding this weapon all jutsu with the Water Release keyword lose the (HS) component and are replaced with (W), being cast through this sword.
All Bukijutsu cast with this weapon gain the Water Release Keyword.
In freezing temperatures, the blade sheds bright light in a 10-foot radius and dim light for an additional 10 feet.
When you draw this weapon, you can extinguish all non-chakra made flames within 30 feet of you. This property can be used no more than once per hour.
Helm of the Fire Daimyo
Ninja Tool, A-rank (requires attunement)
This dazzling helm is set with 1d10 diamonds, 2d10 rubies, 3d10 fire opals, and 4d10 opals. Any gem pried from the helm crumbles to dust. When all the gems are removed or destroyed, the helm loses its chakra-enhanced.
You gain the following benefits while wearing it:
You can use an action to cast one of the following jutsu (save DC 19), using one of the helm's gems of the specified type as a component: Light (opal), Fireball (fire opal), Sunbeam (diamond), or Hellfire Rejection (ruby). The gem is destroyed when the jutsu is cast and disappears from the helm.
As long as it has at least one diamond, the helm emits dim light in a 30-foot radius when at least one undead is within that area.
As long as the helm has at least one ruby, you have resistance to fire damage.
As long as the helm has at least one fire opal, you can use an action and speak a command word to cause one weapon you are holding to burst into flames. The flames emit bright light in a 10-foot radius and dim light for an additional 10 feet. The flames are harmless to you and the weapon. When you hit with an attack using the blazing weapon, the target takes an extra 1d6 fire damage. The flames last until you use a bonus action to speak the command word again or 1 minute passes.
Roll a d20 if you are wearing the helm and take fire damage as a result of failing a saving throw against a jutsu. On a roll of 1, the helm emits beams of light from its remaining gems. Each creature within 60 feet of the helm other than you must succeed on a DC 17 Dexterity saving throw or be struck by a beam, taking radiant damage equal to the number of gems in the helm. The helm and its gems are then destroyed.
Shichifukujin Blade
Weapon (any sword), A-rank (requires attunement)
You gain a +1 bonus to attack and damage rolls made with this chakra-enhanced weapon. While the sword is on your person, you also gain a +1 bonus to saving throws. Luck. If the sword is on your person, you can call on its luck (no action required) to reroll one attack roll, ability check, or saving throw you dislike that was rolled by an ally. You must use the second roll. This blade has 2 charges of Luck. Whenever you roll a Nat 20 on a attack roll, ability check, or saving throw it regains 1 charge.
Gunbai Uchiwa
Heavy, Two-Handed. Reach 1, A-rank(can only be attuned to by an Uchiha)
The Gunbai Uchiwa gains an innate +2 to attack and damage rolls and deals 1d10+Taijutsu Mod Slashing Damage. Gunbai Uchiwa is a non-folding fan, carved from a unique spirit tree from which only ritualistic instruments are made. This Gunbai has been passed down between Uchiha clansmen for generations. is a wide fan with tomoe on it and has a long handle with bandages wrapped around the base, as well as having a long chain attached to it. It has the ability to convert incoming chakra into wind nature transformation, reflecting an opponent's attack back towards them. As a reaction to being targeted with a Melee Weapon, Taijutsu or Ninjutsu attack of B-rank or lower, make a Melee Attack Roll. If your roll is higher than the target's and is higher than their AC, the target would take damage equal to the damage of the attack, ignoring any additional effects of the triggering attack. If not, the attack is carried out as normal. As long as the attack hits, they also have to make also must make a Dexterity Saving Throw or be knocked back 15 ft.
Pill of Vitality
Pill, A-Rank
When you eat this pill, it removes any exhaustion you are suffering and cures any disease or poison affecting you. For the next 24 hours, you regain the maximum number of hit points for any Hit Die you spend
Armor of the Sarutobi
Armor (Light), A-Rank (requires attunement)
You have resistance to damage from Ninjutsu without a Elemental Keyword while you wear this armor. Additionally, you can use an action to make yourself resistance to damage from Ninjutsu with a Elemental keyword you have for 10 minutes or until you are no longer wearing the armor. Once this special action is used, it can't be used again until the next dawn.
Robe of the Shinobi God
Ninja Tool, A-Rank (requires attunement by a genjutsu specialist, or ninjutsu specialist)
This elegant garment is made from exquisite cloth of white, gray, or black and adorned with silvery characters. The robe’s color corresponds to the alignment for which the item was created. A white robe was made for good, gray for neutral, and black for evil. You can’t attune to a robe of the shinobi god that doesn’t correspond to your alignment. You gain these benefits while wearing the robe:

If you aren’t wearing armor, your base Armor Class is 16 + your Dexterity modifier + half your proficiency bonus.

You have advantage on saving throws against jutsu and other chakra-based effects.

Your ninjutsu and genjutsu save DC and attack bonus each increase by 2.
Scroll of Clear Thought
Ninja Tool, A-Rank
This book contains memory and logic exercises, and its words are charged with chakra. If you spend 48 hours over a period of 6 days or fewer studying the book’s contents and practicing its guidelines, your Intelligence score increases by 2, as does your maximum for that score. The manual then loses its chakra, but regains it in a century.
Scroll of Leadership and Influence
Ninja Tool, A-Rank
This book contains guidelines for influencing and charming others, and its words are charged with chakra. If you spend 48 hours over a period of 6 days or fewer studying the book’s contents and practicing its guidelines, your Charisma score increases by 2, as does your maximum for that score. The manual then loses its chakra, but regains it in a century.
Scroll of Understanding
Ninja Tool, A-Rank
This book contains intuition and insight exercises, and its words are charged with chakra. If you spend 48 hours over the period of 6 days or fewer studying the book’s contents and practicing its guidelines, your Wisdom score increases by 2, as does your maximum for that score. The manual then loses its chakra, but regains it in a century.
Ring of Asura
Ring, S-Rank (requires attunement)
While wearing this ring, you have advantage on saving throws against any jutsu that targets only you (not in an area of effect). In addition, if you roll a 20 for the save and the jutsu is B-Rank or lower, the jutsu has no effect on you and instead targets the caster, using the rank, save DC, attack bonus, and casting ability of the caster
Kagutsuchi's Dawn
Weapon (Katana), A-Rank (requires attunement by a creature of non-evil alignment)
Lost for ages,Kagutsuchi's Dawn appears to be a gilded longsword hilt. While grasping the hilt, you can use a bonus action to make a blade of pure radiance spring from the hilt, or cause the blade to disappear.
You gain a +2 bonus to attack and damage rolls made with this weapon, which deals fire damage instead of slashing damage. When you hit an undead with it, that target takes an extra 1d8 fire damage.
The sword's luminous blade emits bright light in a 15-foot radius and dim light for an additional 15 feet. The light is sunlight. While the blade persists, you can use an action to expand or reduce its radius of bright and dim light by 5 feet each, to a maximum of 30 feet each or a minimum of 10 feet each. While holding the weapon, you can use an action to touch a creature with the blade and cast Restoration on that creature. Once used, this ability can't be used again until the next dawn.

Sentience. Kagutsuchi's Dawn is a sentient neutral good weapon with an Intelligence of 12, a wisdom of 15, and a Charisma of 14. It has hearing and darkvision out to a range of 120 feet.

The sword can speak, read, and understand Common, and it can communicate with its wielder telepathically. Its voice is kind and feminine. It knows every language you know while you're attuned to it.

Personality. Forged by ancient sun worshippers, Kagutsuchi's Dawn is meant to bring light into darkness and to fight creatures of darkness. It is kind and compassionate to those in need, but fierce and destructive to its enemies.
Long years lost in darkness have made Dawn frightened of both the dark and abandonment. It prefers that its blade always be present and shedding light in areas of darkness, and it strongly resists being parted from its wielder for any length of time.
Sword of the Thunder God
Weapon (any sword), S-rank (requires attunement)
You gain a +3 bonus to attack and damage rolls made with this chakra-enhanced weapon. The Sword of the Thunder God deals lightning damage instead of the normal damage for its weapon type, and attacks made are treated as though they had the "clash" jutsu keyword. In addition, the wielder may spend chakra in order to activate the following effects:
5 Chakra: As a bonus action, until the end your next turn, your melee attacks made with this weapon deals an additional 3d8 lightning damage. While benefiting from this ability, a target hit must make a DC21 Con save or be Shocked until the end of their next turn.
10 Chakra: As an action, a target in melee range must make a DC22 Dex save or be Restrained and Shocked. They may make a DC22 Con save as an action in order to escape from this condition. At any point, while restrained by this ability, the wielder may throw the restrained individual up to 30 feet as an action.
Drown
Weapon (trident), A-Rank (requires attunement)
A steel trident decorated with bronze barnacles along the upper part of its haft, Drown has a sea-green jewel just below the tines and a silver shell at the end of its haft. It floats on the surface if dropped onto water, and it floats in place if it is released underwater. The trident is always cool to the touch, and it is immune to any damage due to exposure to water. Drown contains a spark of a evil Water Goddess
You gain a +1 bonus to attack and damage rolls you make with this mweapon. When you hit with it, the targets takes an extra 1d8 cold damage.
Water Mastery. You gain the following benefits while you hold Drown:
• You can speak with fish fluently.
• You have resistance to cold damage.
• You can cast Geas (save DC 19) on a water elemental. Once you have done so, Drown can’t be used this way again until the next dawn.
Flaw. Drown makes its wielder covetous. While attuned to the weapon, you gain the following flaw: “I demand and deserve the largest share of the spoils, and I refuse to part with anything that’s mine.” In addition, if you are attuned to Drown for 24 consecutive hours, barnacles form on your skin. The barnacles can be removed with a A-Rank Restoration jutsu or similar magic, but not while you are attuned to the weapon.
Fate-Eater
Weapon (battleaxe), legendary (requires attunement by an evil Medic Nin, Scout Nin, or Weapon Spec)
You gain a +3 bonus to attack and damage rolls with Fate-Eater. If you attack a creature with this weapon and roll a 20 on the attack roll, the creature takes an extra 2d8 necrotic damage, and you regain a number of hit points equal to the necrotic damage taken.
Holy Avenger
Weapon (any sword), S-rank(requires attunement by a Weapon Specialist)
You gain a +3 bonus to attack and damage rolls made with this chakra-enhanced weapon. When you hit a Demon or Zombie with it, that creature takes an extra 2d10 radiant damage. While you hold the drawn sword, it creates an aura in a 10-foot radius around you. You and all creatures friendly to you in the aura have advantage on saving throws against jutsu effects. If you have 17 or more levels in the Weapon Specialist class, the radius of the aura increases to 30 feet.
Ring of Invisibility
Ring, S-Rank (requires attunement)
While wearing this ring, you can turn invisible as an action. Anything you are wearing or carrying is invisible with you. You remain invisible until the ring is removed, until you attack or cast a jutsu, or until you use a bonus action to become visible again.
The Treasured Tools of the Sage of Six Paths
Also known as the Six Paths Sacred Treasures , are a set of powerful tools said to have once been wielded by the Sage of Six Paths himself. They are considered the most powerful ninja tools, and it is said those who demonstrate their power surpass even the Five Kage. However, their usage consumes an enormous amount of chakra, so much so that a normal human could die if they used them.
Bashōsen
Artifact, S-rank
As an Action, you swing the fan. When you swing it you may cast any non-self targeting, non-clone, Elemental Jutsu that doesn't require CS, NT, W, or M, regardless if known or not, for Triple the chakra cost.
Kōkinjō
Artifact, S-rank
When you hit a target with an unarmed melee attack you draw out the word soul of the target and mark it on Shichiseiken. While holding this weapon, your Chakra Maximum is reduced by 1/4 of the maximum. This reduction stays until you have released the weapon and completed a long rest.
Shichiseiken
Broadsword, S-rank
This weapon gains +2 on Attack and Damage Rolls. When a creature marked by Kokinjo starts its turn within 60 feet of Shichiseiken it must make an Intelligence Saving Throw against your Ninjutsu DC to avoid accidentally saying their cursed word. If they fail they are sucked into Benihisago. While holding this weapon, your Chakra Maximum is reduced by 1/4 of the maximum. This reduction stays until you have released the weapon and completed a long rest.
Benihisago
Artifact, S-Rank
When a creature triggers Shichiseiken's effect and are being sucked into Benihisago They must make 3 Consecutive Death Saving throws. If they fail 2 out of 3 they are sucked into Benihisago. If they succeed 2/3 or roll a 20 their cursed word changes and they do not get sucked in. While holding this weapon, your Chakra Maximum is reduced by 1/4 of the maximum. This reduction stays until you have released the weapon and completed a long rest.
Seven Ninja Swords
Samehada
Odachi, S-rank (requires attunement to use features)
You gain a +3 bonus to attack and damage rolls made with this weapon. It has the following additional properties.
Chakra Hungry: To attune to Samehada you must feed it your chakra for a full rest. At the end, reduce your chakra maximum by 20. This chakra is absorbed by Samehada as payment for its services. your chakra maximum returns to normal when attunement ends.
Devour Chakra: Samehada has the innate ability to absorb chakra. When this weapon deals damage roll 2d6 and absorb that much chakra from the target. This feature cannot give the user more than their maximum chakra. If Samehada absorbs 100+ your maximum chakra from a single target in a single encounter, both you and Samahada make a contested Charisma check. If Samehada wins this conflict it switches ownership to the triggering creature. This conflict is rolled at advantage if you have been attuned to this item for more than 6 months.
Shark Skin: As an action you can unwrap Samehada. While unwrapped it deals an extra 2d6 damage and absorbs an extra 1d6 of chakra.
Sentience: Samehada is a sentient chaotic neutral weapon with an Intelligence of 12, a Wisdom of 10, and a Charisma of 14. It has chakra sense out to a range of 120 feet. The weapon communicates by transmitting emotions, sending a tingling sensation through the wielder's hand when it wants to communicate something it has sensed.
Kubikiribōchō
Odachi S-rank (requires attunement to use features)
You gain a +3 bonus to attack and damage rolls made with this weapon. It has the following additional properties:
Killer Intent: The Critical Range of this weapon is 18-20, additionally, crits do x3 damage instead of x2.
The Executioner's Blade: When you attack a creature that has at least one head with this weapon and roll a 20 on the attack roll, you cut off one of the creature's heads. The creature dies if it can't survive without the lost head. A creature is immune to this effect if it is immune to slashing damage, doesn't have or need a head, has legendary actions, or the GM decides that the creature is too big for its head to be cut off with this weapon. Such a creature instead takes an extra 6d8 slashing damage from the hit.
Hiramekarei
Odachi, S-rank (requires attunement)
You gain a +3 bonus to attack and damage rolls made with this weapon. While attuned the user may disregard the Heavy feature of this weapon and it gains the Finesse trait. It has the following additional properties:
Store Chakra: During any rest you may spend 1 minute storing chakra into Hiramekarei. This chakra can only be spent to activate a Form of this weapon and pay concentration cost to maintain it. It can hold a maximum of 100 chakra at once.
The Blade of Legion: As an action you may switch this weapon's form. The new form lasts for 1 minute or until dispelled either by switching the form or dispelling it as a free action. The damage die and the type changes to match the new form. You must spend concentration from the blades storage to maintain the form.
Longsword(cost 5-10): This weapons damage die becomes a d10/slashingFor each 1 chakra spent after 5 increase the reach of this weapon by 5 feet
Hammer(cost 7-10): This weapons damage die becomes a 1d12/bludgeoning. For each 1 chakra spent over 7 increases the damage die by 1.
Twinsword(cost 4 chakra): the weapon splits into two broadswords. When you take the attack action to attack with this weapon, you may, as part of the same action, make an addtional attack.
Kabutowari
Great Ax, S-rank (Requires Attunement)
You gain a +3 bonus to attack and damage rolls made with this weapon. It has the following additional properties:
The Helm-Splitter: Attacks with this weapon instantly breaks Medium size structures. Additionally, as a reaction to landing a hit on an opponent wearing armor you may roll to attack again at disadvantage . On a hit lower their armor bonus by 1. This reduction is permanent until repaired and can stack. If this would lower their armor bonus to 0 the armor breaks and is useless until repaired. If this feature is used on an armorless target they take an additional 2d12 damage.
Nuibari
Katana, S-rank (requires attunement)
You gain a +3 bonus to attack and damage rolls made with this weapon. Nuibari also has the Thrown(30/60) and Grapple. Property and its damage changes to Piercing. It has the following additional properties:
Sew: On a hit the target must make a Con saving throw against your Taijutsu DC to avoid being Threaded. Once Threaded a target can use their action to make a Strength saving throw against your Bukijutsu DC to end the effect. A threaded creature may not move more than 60 feet from Nuibari.
Needle Throw: As an action, you may throw Nuibari in a 30 foot line. Make a Ranged Bukijutsu attack on all enemies in this line. On a hit they all take normal damage and all must make a Sew saving throw, the DC increasing by 1 for each enemy hit.
Threads of Fate: As a bonus action when two or more creatures suffer from being Threaded you may pull on the wire. Each creature is pulled to the midway point between them, taking Xd6 damage and becoming Grappled,losing the Threaded condition. X equals the number of creatures that are pulled.
Shibuki
Broadsword, S-rank (requires attunement)
You gain a +3 bonus to attack and damage rolls made with this weapon. It has the following additional properties:
The Splatter: When you roll to attack with Shibuki, you can, as a bonus action, cast Paper Bomb Barrage at half cost in a 20ft cone behind the target, who is included in the range. If the initial hit lands the target makes the saving throw at disadvantage.
Kiba
Tanto, S-rank (Requires Attunement)
You gain a +3 bonus to attack and damage rolls made with these weapons. Both blades count as one attunement slot. They have the following additional properties:
Thunderswords: While attuned to Kiba the user gains the Lighting Affinity. Reduce the cost of all Lightning Jutsu by 2(minimum of 1 chakra cost) and all Lightning Jutsu cast while Kiba is drawn loses the Hand Seals requirement. Furthermore, when a Lighting Jutsu would deal damage you may add your Ninjutsu Ability Modifier to the damage.
Thunderbolt: You may cast Lighting Release: Lighting Spear from Kiba once per Full Rest.`;

const CHAKRA_WEAPON_MAP_INTERNAL = parseChakraWeaponsLibrary(RAW_TEXT);

// Exported API
export const CHAKRA_WEAPON_MAP: Record<string, ChakraWeapon> = CHAKRA_WEAPON_MAP_INTERNAL;
export const CHAKRA_WEAPON_LIST: ChakraWeapon[] = Object.values(CHAKRA_WEAPON_MAP_INTERNAL).sort(
  (a, b) => a.name.localeCompare(b.name)
);
export const CHAKRA_WEAPON_NAMES: string[] = CHAKRA_WEAPON_LIST.map((w) => w.name);

export function getChakraWeaponByName(name: string): ChakraWeapon | undefined {
  return CHAKRA_WEAPON_MAP[name] || undefined;
}

export function searchChakraWeapons(query: string): ChakraWeapon[] {
  const q = query.trim().toLowerCase();
  if (!q) return CHAKRA_WEAPON_LIST;
  return CHAKRA_WEAPON_LIST.filter(
    (w) =>
      w.name.toLowerCase().includes(q) ||
      (w.type && w.type.toLowerCase().includes(q)) ||
      (w.rank && w.rank.toLowerCase().includes(q))
  );
}
