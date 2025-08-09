---
title: "no follow links"
date: "2022-08-25T12:00:00.000Z"
slug: "no-follow-links"
category: "SEO"
---

If you don't already know about [Off Page SEO](https://devinschumacher.com/off-page-seo/), know this:

- Links are one of the most important [ranking factors for SEO](https://devinschumacher.com/google-ranking-factors/).
- Getting links from other websites will help your website become more trusted, authoritative, rank higher, bring in more traffic, and make more sales. Period.

Google's OG algorithm used backlinks (links from other websites pointing to your website) as a way to determine which sites were "popular" and thus, trustworthy.

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/a-definition-of-pagerank-to-help-understand-what-a-nofollowl-link-is-1024x147-1.png)

When a website accumulates "PageRank" (aka trust, authority, etc.) it ranks more easily for keywords on the search results.

The key thing to understand about links is that they pass PageRank from one site to another. This was how Google originally decided which websites were trustworthy.

Understanding this concept will help you answer questions like:

- What is a nofollow link
- What is rel="nofollow"
- Why is nofollow important for SEO
- How to check if links are nofollow
- When to use nofollow links
- When not to use nofollow links

...and much, much more!

So, let's get started with everything you need to know about No Follow Links.

## A Quick Intro on Link RELs

Not all links are created equal.

In fact, every hyperlink has a "rel" property, which is an HTML property that tells search engines a little more information about that link.

This article focuses on the rel="nofollow" property, but just for you curious folk, here are some of the other possible rel attributes:

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/link-html-tag-rel-attributes-1024x520-1.png)

And just recently (late 2019) Google added some NEW rel attributes:

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/googles-new-link-rel-attributes-1024x519-1.png)

## What Are Nofollow Links?

For certain links on your website, you will want to give Search Engines a better understand about the relationship between your website and the page you are linking to.

The way we communicate this, is through HTML tags using something called a rel attribute. A rel attribute is a value that lives inside of an HTML anchor `<a>` tag.

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/what-does-a-nofollow-link-look-like-in-html-1024x62-1.png)

It is an additional "property" of a hyperlink that gives more info about the link.

In the case of the "nofollow" rel attribute, nofollow means that you are telling search engines to not follow the link.

Search engines find pages and websites by "crawling" (the robot equivalent of clicking) links and seeing where they end up.

But, when your link is marked as "nofollow" you are telling the web crawler to not follow the link.

The converse of a nofollow link is a dofollow link. If a hyperlink is marked as dofollow you are telling search engines to follow that link.

## Nofollow vs. Dofollow

Understanding the difference between nofollow links & dofollow links will significantly help your SEO progress, so let's start with an example of both.

In this sentence, when we say say [click here](https://devinschumacher.com), you will be taken to the the homepage of SERP Co - from a dofollow link.

In HTML, this link would look something like this:

`
<a href="https://devinschumacher.com">click here</a>
`

But, in this sentence, when we say [click here](https://devinschumacher.com), we will still take you to the homepage of SERP Co, but this link is marked as nofollow.

In HTML, this link would look something like this:

`
<a href="https://devinschumacher.com" rel="nofollow">click here</a>
`

The key difference between nofollow links & dofollow links is that a DOFOLLOW link will pass trust/authority to the destination, but a NOFOLLOW link will not pass trust/authority to the link destination.

Every backlink you get pointing to your site (assuming its from a good website, and is DOFOLLOW) is kind of like scoring a goal for your website.

If you get a backlink from another (relevant & quality) website and it is marked as DOFOLLOW, it will help your site ranking higher for all those awesome keywords you're going after.

Got a dofollow link? **GOAL!**

<figure>

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/getting-a-do-follow-link-.gif)

<figcaption>

Real life example of _SEOs scoring a dofollow link_

</figcaption>

</figure>

However, if you get a backlink from another website and it is marked as NOFOLLOW, it will NOT\* help your rankings. Got a nofollow link? **No Goal.**

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/getting-a-nofollow-link.gif)

_\* I put an asterisk here because this is actually a highly debated topic, and there are some merits to getting nofollow links. But for a beginner, **the general rule is: try to get DOFOLLOW links from good websites.**_

## A Brief History of No Follow Links

SEOs love spamming (especially when it helps to increase rankings).

Believe it or not, back in the earlier days of Google Search, spamming actually worked quite well.

So, in 2005, Google introduced the re="nofollow" HTML tag to combat a very common [Black Hat SEO](https://devinschumacher.com/black-hat-seo/) technique: comment spam.

> _If you’re a blogger (or a blog reader), you’re painfully familiar with people who try to raise their own websites’ search engine rankings by submitting linked blog comments like “Visit my discount pharmaceuticals site.” This is called comment spam, we don’t like it either, and we’ve been testing a new tag that blocks it. From now on, when Google sees the attribute (rel="“nofollow”)" on hyperlinks,_ **those links won’t get any credit when we rank websites in our search results**_. This isn’t a negative vote for the site where the comment was posted; it’s just a way to make sure that spammers get no benefit from abusing public areas like blog comments, trackbacks, and referrer lists._
>
> \- [Google](https://googleblog.blogspot.com/2005/01/preventing-comment-spam.html)

Other Search engines soon followed suit (no pun intended), although they each interpret the rel attribute slightly differently:

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/screen-shot-2019-10-16-at-12.58.59-pm-1024x217-1.png)

SEOs are pretty creative, I will admit that. So, when this information started to become prevalent us SEOs used it to our advantage, and thus was born the concept of "PageRank Sculpting".

### PageRank Sculpting

Since we know that PageRank (aka trust, power, link juice, authority, etc.) is passed via links from one page to another and that the more trust a page has the easier it will rank, SEOs began to use this knowledge to their advantage.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">DYK that after 18 years we're still using PageRank (and 100s of other signals) in ranking?<br /><br />Wanna know how it works?<a href="https://t.co/CfOlxGauGF">https://t.co/CfOlxGauGF</a> <a href="https://t.co/3YJeNbXLml">pic.twitter.com/3YJeNbXLml</a></p>— Gary "鯨理" Illyes (@methode) <a href="https://twitter.com/methode/status/829755916895535104?ref_src=twsrc%5Etfw">February 9, 2017</a></blockquote>

#### PageRank Sculpting: Pre 2009

If you had 3 links on a web page, & two of the links were dofollow, but one of the links was nofollow, then the total PageRank was split between the 2 dofollow links.

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/0-how-pagerank-sculpting-used-to-work-2-794x1024-1.png)

Knowing this, SEOs would find pages on their website with a lot of links, and link from that page to another page on their website site (internal linking) that they wanted to pass power to, and then they would nofollow the internal links to other pages on their website they didn't want to waste sending link juice to (link a contact page, privacy policy, etc.).

So what Google did was just count all nofollow links against your page points.

Here is an example in practice:

> _So what happens when you have a page with “ten PageRank points” and ten outgoing links, and five of those links are nofollowed? \[…\] Originally, the five links without nofollow would have flowed two points of PageRank each \[…\] More than a year ago,_ **Google changed how the PageRank flows so that the five links without nofollow would flow one point of PageRank each.** 
>
> \- [Google](https://www.mattcutts.com/blog/pagerank-sculpting/)

## Do Nofollow Links Help With SEO?

The short answer is "No".

- Nofollow links are hyperlinks that tell Google not to crawl them.
- Nofollow links are generally accepted to not pass link power.

The complex answer is Yes. Nofollow links from very high authority websites should still be considered a win.

- **Links Bring Traffic:** Humans click on nofollow links, so they can still bring you traffic (which is a [ranking factor](https://devinschumacher.com/google-ranking-factors/)).
- **Natural Link Profile:** Nofollow links are a natural part of a website's link profile, so having them is a good sign in the sense that you want your backlink profile to be natural as well.
- **Expected Websites**: Many major websites (that Google expects you to have a presence on and links from) like Facebook, Google My Business, Yelp, Twitter, etc. are nofollow links, so having those are good.
- **Awareness Attracts Links**: Getting a nofollow link on a legit website does still get your website in front of real people, who might like your content and then drop you a dofollow link!
- **Links Can Make Sales**: Imagine get a link to your product page from a huge influencer recommending your product. Dofollow or nofollow, you're still probably going to make some sales!

We put the "No" in that ' The short answer is "No". ' part because they do help.

Google's official stance is that "we do not follow nofollow links".

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/download-11-1.gif)

Google is a tyrant. They want to know everything about the internet.

Here's my personal stance: They absolutely DO follow nofollow links because they want/need to know what's on the other side. If they didn't follow them they would be giving up a piece of information and control - so no f\*\*king now.

But, that being said their algorithm is definitely setup in a way that they do not pass full power for a no follow link. So, that means it's time for a pro-tip.

**Protip**: Make your life easier by not worrying about the exactly correct answer to this and just focus on getting dofollow links from good websites, not nofollow links. But, if you do get a nofollow link from a quality link, you can still do a little celebration.

## When You Should Nofollow Outgoing Links on YOUR Website?

There are a number of times when Google actually wants you to nofollow outgoing links on your website.

1. Advertisements
2. Sponsored Posts
3. Affiliate Links
4. Websites you don't know 100% that you trust the quality of

## How Do You Check If a Link is Nofollow?

This is quite easy. Let me show you the hard way first:

When you're on a website, simply right-click and choose "Inspect"

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/screen_shot_2019-10-16_at_11_09_38_pm-1024x499-1.png)

Then, you can click on an element and look down at the code. In this example on our post about [SEO Keyword Research](https://devinschumacher.com/keyword-research/), you will see us "inspecting" a link and in the screenshot, you will see inside the HTML of the link it says rel="nofollow"

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/screen_shot_2019-10-16_at_11_07_06_pm-1024x604-1.png)

Thanks for suffering through that, now ill show you the easy way - a browser plugin!

Notice how in my first screenshot you see a red border around the anchor text "rabbit hole" (which is our nofollow link)?

This is from a Google Chrome extension called [NoFollow](https://chrome.google.com/webstore/detail/nofollow/dfogidghaigoomjdeacndafapdijmiid?hl="en)" - it outlines all links on a page that are nofollow. Very handy!

## Final Thoughts

If you have any questions about what you read in this article (or if you just want help getting it done) join us, and hundreds of world-class marketers, who are making themselves & their clients make more money with online marketing - JOIN FREE: [SERP University](http://serp.university)
