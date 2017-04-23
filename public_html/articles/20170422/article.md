---
title:    I'm making a rogue-like
subtitle: and it's definitely not CC3K
image:    cc3k.png
author:   Cam
date:     2017/04/22
tags:     game,plan,roguelike
keywords: c,c++,cpp,project,cc3k,waterloo,cs246
---
# {{ title }}
## {{ subtitle }}

// {{ author }} &mdash; {{ date }}

The final project for CS246 was to make a game
in C++ using a number of the object-oriented design patterns we learned during
the term. It was to be a group project for 2 -- 3 people, and my group-mates were
also my house-mates, Yeva and Jacky. There were a few projects to choose from -
lame Tetris, Waterloo Catan, and CC3K (the one we chose).

The task for CC3K ("Chamber Crawler 3000") was to create a Rogue-like, or
dungeon crawler on the Linux terminal. There were some rules we had to follow,
and some required features, but once those were all finished, we could add on
whatever additional content ("DLC" they called it) we wanted for bonus marks.

// The only marks we lost were for planning&hellip;

I guess some groups struggled with this, for both skill reasons or bad group
member reasons. My group, however, did well. The required content was complete
within a week, and then there was practically another week left for DLC. By the
end we had added tons of extra stuff, and got a final mark of 109% (out of a
possible 110%).

The school didn't let us release the source code publicly since the project is
the IP of the instructors and future students can copy it, fair enough. I still
kind of want to have it listed somewhere as something I did though, so I have
decided to do it again, without all the dumb required features, and without any
of the mistakes we made last time (not that there were all that many).

Plus, without the deadlines there is no rush. I'm hoping that with this freedom
I can add more interesting game mechanics, rather than just the hollow shells of
big features that were in the original version.

### The plan

1.  Get random dungeon layout generation working

    Though it was a DLC last time, random dungeons will be a core feature of
    this game. Having the same rooms every floor is pretty lame.

2.  Add player movement and the goal

    Kind of important, for obvious reasons.

3.  Gradually reveal the dungeon as you move around

    Another of the DLC I added to CC3K. It's not very hard to add, can easily be
    disabled for testing everything else, and makes the game much more
    interesting.

4.  Add monsters and gold drops

    Another obvious important feature. Monsters will just follow the player
    around at this point, or maybe even just wander. Fighting will be pretty
    monotonous, just pressing attack and hoping you win. These will be improved
    later. The gold drops will be primarily for keeping score, but also later
    used with the shops I will eventually add.

5.  Add friendly creatures and potions

    Potions were in the old CC3K and, though the original system was pretty
    unforgiving, they were pretty fun so I will add something similar. Friendly
    creatures will be something new, and could be fun to work with. Maybe they
    can fight for you, or maybe you can fight them and side with the bad guys.

6.  Add some more item types and an inventory

    Another DLC from CC3K. Who drinks potions off the ground anyway. It makes
    more sense to be able to pick them up and keep them for when you need it.
    I'm not really sure what other items I'll add yet, but I'll just make sure
    they *can* be added by this point.

7.  Add shops and usable equipment

    Shops were in the CC3K DLC, but equipment was not. I wanted it to be, but it
    seemed like more of a time investment than we had, so this time I'll be sure
    to add it in. Equipment is always fun to design when you don't have to
    visibly design it.

8.  Add some sort of graphics

    We added ASCII art graphics to CC3K, and it made the game a lot more lively,
    so by this point it is probably time to invest in some eye candy.

9.  Improve the monster AI

    Make some follow, some have ranged attacks, some guard things, etc.
    Something to both make the game more fun and more fair.

10. Tell a story of some sort

    I guess at this point I'll have some idea of how the game is looking, and
    what resources I have available. Telling a story *should* be possible, and I
    need more practice actually telling good stories in game, so I want to try
    and add one. Maybe it will fall apart and just go back to dungeon crawling.

11. Make fighting a bit more exciting

    Not really sure how this will work. Maybe allow for different weapon
    classes, magic, combos, or a full turn based Final Fantasy like fight
    system. Whatever it is, it has to be more exciting than mashing the attack
    key.

12. Add boss fights

    Because boss fights are cool. And hopefully can take advantage of whatever
    improved fighting system I come up with.

### Keeping up

Right now, I am somewhere in the middle of step 1. I'll try and update the
[repository] regularly, and discuss some of the systems I decide to use as I go.
Hopefully this game will be playable by the end of summer? I've done it in two
weeks before, so I can probably do it a second time in 4 months.

[repository]: https://github.com/oinkiguana/roguelike
