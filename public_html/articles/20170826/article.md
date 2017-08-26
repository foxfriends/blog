---
title:    I'm Making another Roguelike
subtitle: again?
image:    roguelike.png
author:   Cam
date:     2017/08/26
tags:     game,roguelike,plan
keywords: rust,cargo,project
---
# {{ title }}
## {{ subtitle }}

// {{ author }} &mdash; {{ date }}

Ok ok, I know I just started that [Roguelike] from a few months ago and then
gave up on it. Why would I be doing another one? Well what I realized is that no
matter how well you try to write your C++, it is still just C++. It really can't
be all *that* good. While the project may have been going pretty well, it just
wasn't fun to work with. Since then, I learned Rust, and that really changes
things.

Having now tried both Go and Rust (admittedly not a lot of Go compared to Rust),
I think I'll probably never go back to C++ if I can help it. It will always be
Rust. It's just a much nicer language. Sure it's a little young and still in
development, but that makes it even more fun to play with I think. When new
features come out you really get to appreciate them.

Though I wanted to learn Rust so that I could get more experience with writing
multi-threaded programs, maybe even to write a really cool game engine later on,
it seemed like a bit of a big task to take on as my first project. Instead, I'm
going back to that Roguelike again. It's a simple project with lots of
architectural choices to make, so it seems like a good fit. I'll admit there's
not a lot of opportunity for multi-threading with a game this simple and
completely linear by design, but that's alright. That stuff can come later. For
now I'll settle for just learning how to think in Rust.

### The architecture

Since there are no classes, and there's no classical inheritance in Rust, the
whole system kind of needs a redesign from the original C++ implementation.
Taking inspiration from functional ideas, I am now thinking of the game in a
more state-based mindset. At the beginning of each step I have one state and,
after processing an input and determining how all the actors will behave, I have
produced the new state. This state is basically a wrapper around the dungeon map
and holding a few numbers that represent the player's score, health, and money,
and what floor of the dungeon they are on.

The map is pretty similar to how it was before. A grid of tiles, each with a
type (floor, wall, etc) and space for one actor. The map itself is the one which
manages all the relationships between tiles, so there is no need for the tile to
know about its neighbours. It seems like thinking in Rust makes it a lot harder
to forget about proper encapsulation.

The actors in the tiles are actually just a trait. At no point in can any actor
know what type any of the other actors are, they must simply use the interface
that is provided to perform the desired actions. Though this is a little
unfamiliar to me, and challenging at times to deal with, it seems like this
level of abstraction is a good thing. As of now, the Actor trait is extremely
large and seems to be getting full of things I don't want to be there, so I
think I'll need to rethink this system somewhat soon, but I think I'm on the
right track.

As for generating the map and filling it with actors, I've decided to abstract
that away from the game engine itself. Instead, a generator and a populator can
be passed in to the engine, which it then uses to create dungeon floors. This
way the engine doesn't even need to know about the set of available actors but
is able to generically handle all of the many variations. For now, the map
generation is using essentially the same [algorithm] as before, just translated
into Rust, and population is hard coded, but switching these out will pose no
challenge in the future.

My favourite part of the system so far is the behavior trait. Behaviors are used
to represent the actions that an actor can take. Since actors don't (and can't)
know about the current state of the game, they can't make decisions based on
their surroundings. To get around this, they instead produce a behavior at each
step of the game. Behaviors can be chained and combined to produce pretty
complex... well, behaviours. Maybe I'll go into more detail about this system in
another article, because I think it's pretty cool.

There are some things that a behavior cannot represent, however, such as what to
do when the actor should die. Should it just disappear? Or drop some gold? These
actions that require knowledge and manipulation of the actual state of the game
must be performed at a higher level. In order to accomplish this, actors may be
given access to the messaging system, allowing them to emit messages which the
state can then act upon.

I think that's basically it then, at a high level. Hopefully I'll get a chance
to go into more detail about each system, once I've flushed out some more of
their flaws. Overall though, I am finding this engine much easier and much more
satisfying to develop and extend than it ever has been in C++. Rust is quickly
becoming my favourite lower-level language, so I suggest trying it out if you
get a chance!

[Roguelike]: /post/20170422
[algorithm]: /post/20170425
