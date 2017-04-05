---
title:    A blog in 3 days
subtitle: or at least most of one
image:    cover.jpg
author:   Cam
date:     2017/04/04
tags:     meta,javascript,react
keywords: bem,callback hell,handler threading
---
# A blog in 3 days
## or at least most of one

// {{ author }} &mdash; {{ date }}

Yeah, it only took 3 days. Maybe I see the benefits of using a framework now.
There are still some improvements to be made, but those can wait until another
time.

### React

// A trimmed down version of the root component

```jsx
class Blog extends React.Component {
  state = { article: null, page: 1, search: '' };

  render() {
    return (
      <div className="page">
        <BlogHeader />
        <BlogListings page={ this.state.page }
                      search={ this.state.search } />
        <BlogFooter />
      </div>
    )
  }
}
```

I guess the biggest issue I run into on most projects is encapsulating the HTML
with its behaviour and style. React's components did a good job of keeping the
HTML with its functionality (that is what they advertise I suppose&hellip;), so
that ended up saving me a lot more time than I expected.

For the components that had to communicate, however, it was as painful as I
thought it would be. Passing props and event handlers in to the child components, which
then passed their own child components more event handlers, just to be able to
send information back out to the parents has been the main turn-off for me from
these frameworks.

// Admittedly I can't think of any better way to do it right now, but maybe someday
// someone will find the promises and async functions of one-way data binding.

Maybe some of this could be avoided by careful planning, but this "handler threading"
just seems like the new "callback hell". While the delegation and encapsulation
ideas behind event handlers and one-way data binding are certainly very valid,
it seems to me that the syntax we have chosen for it is unnecessarily verbose
and generally inelegant. It works great for small, reusable components, but
my experience leads me to believe that a lot of components just end up being
wrappers around other components, each of which are used only once and
require passing wrappers around event handlers many levels deep.

In the end I only used 10 components, some of which did nothing, and even the
ones that did things were pretty simple. There's not a lot blogs have to do,
which may be why they are so often done as static sites. It makes a lot more
sense that way. I regret nothing.

### BEM

// Part of the styles for the pagination buttons which (I&nbsp;think) are a
// pretty good example of BEM

```scss
.pagination {
  display: flex;
  .pagination__button {
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
  .pagination__button_back {
    margin-right: auto;
  }
  .pagination__button_next {
    margin-left: auto;
  }
}
```

As for keeping the styles with their respective components, React provides no
such system. I decided to go with the [BEM](http://getbem.com/) methodology,
where the "blocks" try to be related to the components.

Pretty much every project before this one I have tried to just be organized
with my stylesheets, but it has never really turned out all that well. This was
the first time I followed any sort of formal methodology and even with such a
small project I can see the benefits already.

With BEM in particular they suggest rejecting the cascading part of cascading
style sheets. While this seemed kind of wasteful at first, leading to a lot of
repetition, it did save me from having to deal with "mysterious styles"
cascading from far off style definitions.

While the encapsulated nature of BEM naming conventions did function as
advertised, and for this project it seems that it was well suited, I'm not sure
if I'd choose it again --- the repetition of styles and long class names go
against what I like about CSS. I'll be trying out a few more methodologies for
now.

### Challenges

The hardest part was probably the user experience. Using React it seemed only
natural for this to be done as some sort of single-page
application, but blogs rely on navigability and sharability -- two things SPAs
don't do too well. To counteract that, I had to implement some sort of URL
manager and handle the forward and back buttons of the browser manually. This
was the only real "new territory" I had to enter.

The JavaScript wasn't too bad. A few path parsing functions to determine the
content that should be displayed and some events to do the displaying were all
that was needed. After wrestling with React for a little while, we reached a
reasonably good agreement. The server, however, was another story.

// I know Apache is probably running in the background all the time anyway, but
// I just can't be bothered to figure it out

The production website is hosted on a regular Apache server, but in my
development environment I am just using [http-server](https://www.npmjs.com/package/http-server)
from NPM. This means that the `.htaccess` file has no relevance on my local
machine. Neither do the Ruby scripts that find the posts. And neither do the
URLs generated by the in-app navigator. Basically, testing both on my machine
and on the server causes a lot of pain.

Writing and testing `.htaccess` files is also new to me and, since I didn't
bother to set up my own Apache server, it was not a fun task. Before last week I
knew next to nothing about them. Now I still feel like I know nothing, but at
least I got this one to do what I want. Mostly.

The other challenge was to do with the backend. The ancient version of Ruby
installed on the server somehow doesn't work with the JSON gem so I had to
output all the JSON data by hand. Not that that was hard at all, but there were
so many little typos&hellip; My commit history for today has a rapid fire bunch
of super tiny changes, each fixing between 0 and 2 bugs in various scripts I
couldn't properly test on my local environment.

The moral of the story here is to just set everything up properly. I'm pretty
sure it will still be a long time before I get around to it though.
