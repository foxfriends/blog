---
title:    Adventures in Functional Game Development
subtitle: or misadventures in OOP
author:   Cam
date:     2018/02/06
tags:     game,functional
keywords: haskell,stack
---
# {{ title }}
## {{ subtitle }}

// {{ author }} &mdash; {{ date }}

Having attempted numerous times to make games in imperative and somewhat object oriented languages
(C++, JavaScript, Rust...) I have realized that it never feels *right*. Now what is *right* you ask?
This is something I don't think anyone knows. I can't say for sure, having never looked inside a
real game studio's game engine, but I feel like theirs isn't exactly *right* either.

### The wrong

Much easier to put into words is what was wrong about the previous attempts, so I'll go from the
start:

#### Object oriented is a bad idea.

I'm sure this comes as no surprise. People have been saying that for years. I just had to go and
verify it myself anyway. Classic Java/C++ style OOP doesn't allow for enough proper composability.
In order to make things generic in a type-safe manner, everything has to branch out from a single
base class. Though it then becomes possible to make an array of every `GameObject` in the game, what
good is that when everything is just a `GameObject`. From there you'll have to start relying on
runtime type checking with `dynamic_cast`s or attaching strings to every `GameObject` "type".

Overall it leads to something that makes me and my love of type systems cringe. As bad as C++'s
excuse for a type system is, you're still better off not ignoring it, but with this object oriented
idea of a game, you'll eventually have to start ignoring it.

#### Manual memory management is also a bad idea

Another obvious one---people have been complaining about null pointers and memory leaks forever.
There are lots of arguments for why people like managing memory manually for games (no hanging for
the garbage collector to finish), and in the context of those top of the line, triple-A games, it
makes some sense.

For an independent developer, not so much. There's relatively *so little* going on in any game I
have ever tried to make, or ever plan to try to make, so there's no reason I should even have to
think about pointers or memory at all. The amount of effort that goes into even coming up and using
an API that makes proper use of references and pointers is not worth the benefit. After spending
hours thinking about how to load, store, and free my graphics in a reasonably painless manner then
still seeing `Segmentation fault (core dumped)` every time the game runs, I always end up with some
awkward `ImageManager` sort of class that doesn't actually optimize anything because I didn't feel
like optimizing once it even worked at all.

### So what to do

The closest I had found to whatever this *right* is was my component-entity based engine in Rust.
The type system is expressive enough, memory is managed automatically and (I think?) efficiently
enough, and there are no runtime errors to be seen. The component-entity system gets away from the
need for that overarching and meaningless `GameObject` type. Not going to go into that here and now,
since it was a long time ago and I forget how it works, but I do remember it being a refreshing
experience. Not perfect, but better.

// Are there even other ways to structure a functional program? Who knows

The last thing to try (that I know of yet anyway) was using a functional language, and of course the
only real option is Haskell. I'll admit, I don't know a lot about functional program architectures,
but diving right in as always I went with the only one I know: the one with the huge model tree
thing, some functions to update it, and some functions to render it. As for the actual library, I
just went along with SDL again, since I am familiar with it and the Haskell API seemed, though not
perfect, better than the C++ API.

After two (?) weeks, here are my findings:

#### Having a real type system helps

No longer is everything a `GameObject` with a few magic tricks. All the entities in the game are
just data. Writing functions that act on these game objects generically is as easy as in any other
Haskell program---just a bunch of patterns. Every time something I have written brings up that sad
feeling in me, the program just doesn't compile and I am forced to re-evaluate, always ending up
with a better solution.

That said, there are still some things that I think could be done better in my current attempt. At
least it feels like it is on the right track though. I'm sure if I keep going I'll (be forced to)
come up with something that works better. When this time comes, maybe I'll remember to write about
it. This is my next area of research---the first was in the use of...

#### Monads for state management

To load, store, and free resources is easily done by use of a state monad representing the rendering
context. For those familiar with state monads I'm sure this is no surprise, but this was my first
time actually using them, so I thought it was pretty cool. Here's how it goes

The `StateRC` is my monad, holding the `RenderingContext`

// Having a field for each resource would've been cool, but not very maintainable
```haskell
type StateRC a = StateT RenderingContext IO a

data RenderingContext = RenderingContext
  { textures :: Map String Texture
  , surfaces :: Map String Surface
  , fonts    :: Map String Font
  , renderer :: Renderer
  }
```

A resource is extracted from the state by use of its `Key`. The `Key` includes both the name of the
resource and an `IO` action that load said resource. This way it is always known how to retrieve any
asset whether it is loaded already or not, and the user never needs to think of it. This also
guarantees that there are no invalid map entries being requested.

```haskell
data Key a = Key String (IO a)
```

Finally it the actuall accessors. I'll choose fonts for the examples (the others are exactly the
same). Given a `Key`, the resource is retrieved from the state. If it is not there, it is loaded by
using the `Key`'s accessor and then put into the context for later.

```haskell
addFont :: String -> Font -> StateRC Font
addFont name font = do
  rc <- get
  put rc { fonts = Map.insert name font (fonts rc) }
  return font

getFont :: Key Font -> StateRC Font
getFont (Key name accessor) = do
  font <- gets (flip (!?) name . fonts)
  case font of
    Nothing   -> liftIO accessor >>= addFont name
    Just font -> return font

removeFont :: String -> StateRC ()
removeFont name = do
  rc <- get
  put rc { fonts = Map.delete name (fonts rc) }

freeFont :: Key Font -> StateRC ()
freeFont (Key (Key_ symbol _)) = do
  font <- gets (flip (!?) name . fonts)
  case font of
    Nothing   -> return ()
    Just font -> do
      free font
      removeFont symbol
```

In the end it becomes very simple to use. To create a surface with "Hello" written on it just like
this:

```haskell
defaultFont :: Key Font
defaultFont = Key "Default" (load "resources/fonts/ComicSansMS.ttf" 15)

drawHello :: StateRC Surface
drawHello = do
  font <- getFont defaultFont
  solid font black "Hello"
```

#### Concurrency is pretty good

// The game I am using for this experiment is a turn-based strategy game ([Fire Emblem-like][]), for
// those interested

Using the simple model-update-view architecture makes it easy to split rendering, audio, and user
interaction/model updates into separate threads. Though certainly not the most optimal solution, I
just stuck the whole model in an `MVar`. The updating thread acquires the model, updates it, and
puts it back for every action that is taken. Since the model will always be in a valid state, the
renderer can just render it whenever it chooses by borrowing and copying it. I'm not sure how well
this would work in a game that required every object to be rendered moving with equal priority, but
for a turn based game this seemed like a perfectly reasonable solution.

#### What I haven't solved yet

1.  Freeing dynamically generated surfaces/textures automatically. Resources that are not stored in
    the `RenderingContext` have to be recalculated every frame, and thus destroyed every frame as
    well. It would be nice to be able to cache and update these only when something has actually
    changed. With a better model this is probably doable.

2.  When to free the resources in the `RenderingContext`. This is a problem I have still never
    really tried to deal with ever. It'll be something to do with tagging resources by which scenes
    they are required in I'm sure.

3.  Something about the model doesn't feel right. I think this one will be solved in time though.
    Nothing too special here.

I'm sure these problems have solutions, I just haven't gotten to them yet. Overall, though, I think
pure functional game development definitely has some potential. I would like to look into how real
game companies do it still, but someday I hope to see a market quality game written in a functional
language.

[Fire Emblem-like]: (https://github.com/OinkIguana/definitely-not-fire-emblem)
