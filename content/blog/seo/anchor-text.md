---
title: "anchor text"
date: "2022-08-25T12:00:00.000Z"
slug: "anchor-text"
category: "SEO"
---

Anchor text is one of the most powerful (and underutilized) areas of SEO if you want to crush your competitors' rankings while skyrocketing your own.

Anchor text provides a great deal of context to search engines regarding the topic of a hyperlink's destination.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr"><a href="https://x.com/JohnMu?ref_src=twsrc%5Etfw">@JohnMu</a> <a href="https://x.com/methode?ref_src=twsrc%5Etfw">@methode</a> Is a link <a href="..."></a> without text or IMG as anchor (img displayed via CSS) good for Google ? Thx</p>— O.Andrieu Abondance (@abondance_com) <a href="https://x.com/abondance_com/status/864092490118422529?ref_src=twsrc%5Etfw">May 15, 2017</a></blockquote>

In this article, we (quickly) cover what anchor text is, and then (meticulously) cover how to use it for maximum SEO impact.

You will not want to overlook this content.

Buckle up, buttercup.

## What is anchor text?

Anchor Text is the "clickable" portion of a link, usually found somewhere in a piece of content or on a webpage.

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/anchor-text-example-1.png)

You probably clicked on some anchor text to get to this article.

When we talk about anchor text we are referring to the clickable part of the text.

**Example 1**: [SERP Co](https://devinschumacher.com/) is a digital marketing company.

In this first example, the anchor text would be "SERP Co".

**Example 2**: [SERP Co is a digital marketing company](https://devinschumacher.com/).

In this second example, the anchor text would be "SERP Co is a digital marketing company".

From the perspective of us lovely humans, it is the part of a hyperlink that we click on.

From the perspective of a bot, like a search engine that reads HTML (among other things), it would look like this:

`<a href="https://devinschumacher.com">SERP Co</a>`

Let's break this down real quick by looking at the full hyperlink structure in the example above.

## Anchor text HTML

A simple hyperlink is made up of 3 parts:

1. **The anchor tags**: `<a>`and`</a>`
2. **The link destination**: href="https://devinschumacher.com"
3. **The anchor text**: SERP Co

We will illustrate this example:

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/1.png)

The first part of this hyperlink in HTML is the "anchor" tags. They look like this:

`<a> </a>`

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/2.png)

The `<a>` HTML tag creates the code that is used to define a hyperlink.

As we know a hyperlink connects (or "links") to web pages together, so the next logical part of creating a link is to answer the question "where will this link take us?"

We do this by putting a URL in between the anchor tags.

The HTML to say "let's take someone to this URL" is denoted with:

`href=""`

We put the actual URL of the link destination in between the quotation marks.

`href="https://devinschumacher.com"`

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/3.png)

This href part goes inside of the anchor tags, so it ends up looking like:

`
<a href="https://devinschumacher.com"></a>
`

Now we simply need to add in what we want the clickable text to be, in this case, "SERP Co" which we put in between the >&lt; symbols.

`
SERP Co
`

So, the whole enchilada looks like this:

`
<a href="https://devinschumacher.com">SERP Co</a>
`

To summarize the structure of a link:

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/html-anchor-text.png)

**Note**: There are many more attributes you can add to a hyperlink, like telling it to "open in a new tab" or be "nofollow", but that doesn't really matter for what we are trying to learn in this article.

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/the-parts-of-a-link.png)

## Why is anchor text important?

The clickable part of a link, which we now know is called "anchor text", gives humans (and also search engines) more _context_ about where this link is going.

Think about it - if you were on a website and you saw these two links, which one would give you more information about where you would be taken to after clicking the link:

[Click here.](https://devinschumacher.com/)

[Click here to be taken to one of the world's best digital marketing agencies.](https://devinschumacher.com/)

Both links go to the same place, but the second link is far more descriptive.

The point is: Googlebot reads anchor text & uses it to understand & determine what the link destination (webpage) is about, and therefore what keywords it should rank for.

> Google employs a number of techniques to improve search quality including page rank, **anchor text**, and proximity information.
>
> Source: [http://infolab.stanford.edu/~backrub/google.html#pr](http://infolab.stanford.edu/~backrub/google.html#pr)

Yes, we agree with that one.

Having relevant keywords in the anchor text of the links pointing to your page is a very important [search engine ranking factor](https://devinschumacher.com/google-ranking-factors/).

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/how-anchor-texts-helps-ranking.png)

Now, in many of these examples we have been linking to another page on our site (interlinking), which is quite easy to manipulate the anchor text because after all, I am the one writing this blog post.

But, when there are other websites linking to you (aka you are acquiring backlinks) then Google sees this like other "impartial/unbiased 3rd parties" giving their feedback/opinion on what your site is about.

For example, if we linked to our application that helps you track, manage & improve your SEO campaigns (called SERP App) with the anchor text " [seo management application](https://serp.app) ", that would tell Google that link destination very probably has something to do with being an application that helps with SEO management.

And, since the link is coming FROM a page ABOUT SEO, it gives the link a little more weight.

If other websites as also linking to SERP App with similar anchor texts, then that just continues to provide more signals to Google regarding what the page is about, and helps to increase Google’s confidence that the SERP App website should rank for “seo management application”.

Because what is the probability that multiple unrelated websites all link to the same page AND are using the same (or very similar) anchor text if that page actually is not a web application to help you manage your SEO campaigns? Unlikely.

This is what makes anchor text such a strong ranking factor.

## Anchor text types

There are many different types of anchor texts, and they all serve a purpose.

- [Branded](#4-branded-anchors)
- [Keyword](#6-keyword-anchors)
- [Page Title](#8-page-title-anchors)
- [Sentence](#10-sentence-anchors)
- [Naked](#12-naked-anchors)
- [Generic](#14-generic-anchors)
- [Image](#16-image-anchor-text)
- [Variations](#17-variations)

### Branded Anchors

Anchor text that uses your brand name or even a variation of the brand name.

We also like to include key people in branded anchors, so it could be the owner's name, etc. After all, a "personal brand" is a very real thing these days.

#### Branded Anchor Text Examples:

- SERP Co
- SERP Company
- serpco
- SERPCO
- Devin Schumacher
- Devin

### Keyword Anchors

Keyword anchor texts can really help propel your SEO rankings.

They can also get you into serious trouble if you overdo it, but staying safe with these is actually not that difficult.

**Pro tips for staying safe**:

- Use variations of keywords, not the same one over and over again.
- Keep all the combinations of keyword anchor text within a small/reasonable % of your overall anchor text profile (compare to other competitors in the industry for your benchmark).
- Use the high search volume keywords more often than lower search volume keywords.

Keyword anchor texts can also be broken down into subcategories as well:

- **Exact match**: This would be a match to an exact keyword that your page is trying to rank for.
- **Partial match**: This would be a partial match to a keyword that your page is trying to rank for
- **Market level**: One of your target keywords with no geo modifiers (ex: seo company)
- **Geo modified**: One of your target keywords with geo modifiers (ex: seo company los angeles)

#### Keyword Anchor Text Examples:

- [Digital marketing agency](https://devinschumacher.com/)
- [SEO services](https://devinschumacher.com/)
- [law firm marketing company](https://devinschumacher.com/services/marketing/lawyers/)
- [seo company los angeles, ca](https://devinschumacher.com//los-angeles/)
- etc.

### Page Title Anchors

Page title anchor text is a cool anchor text type that a lot of people don't talk about.

It would be getting a link to your page where the anchor text is simply the page title.

They are great because page title usually includes keywords, and are very descriptive, but it's still very normal for someone to link to a page using the page title.

For example, you are reading this article right now and if we were to mention our post about [HTTP vs. HTTPS](https://devinschumacher.com/http-vs-https/) and link to it using the page title, that wouldn't really seem all that weird, would it?

#### Page Title Anchor Text Examples:

You will see page title anchor texts pop up frequently on those "recommended reading" sections on blog posts. They look something like. this:

**Recommended Additional Reading:**

- [SEO Keywords: What Are Keywords for SEO & How to Choose The Good Ones](https://devinschumacher.com-keywords/)


Those would be examples of using a page title as the anchor text. Totally rad!

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/download-14.gif)

### Sentence Anchors

Sentence anchor texts are a nice way to keep things natural, get some keyword variations in your anchor text and stay diversified.

Why? Simply because there is an infinite number of ways to write sentences.

#### Sentence Anchor Text Examples:

- [This company has published studies that show how local business owners in Los Angeles can grow by generating more leads and sales using digital marketing strategies.](https://devinschumacher.com/services/marketing/los-angeles/)

### Naked Anchors

A "naked" anchor text refers to the use of just the URL as the anchor text.

Naked anchor texts are very natural links for websites to get.

And, if you have done your URL structure right they will include keywords within them. **_Muy Bien for SEO._**

Muy Bien??

https://www.youtube.com/watch?v=uOpjYE-iPnY

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/screen-shot-2019-10-18-at-2.51.26-pm.png)

There are a lot of ways to write a URL, and since most websites are now set up to redirect all variations to one primary URL protocol, there are a lot of different naked URL variations you can get.

#### Naked Anchor Text Examples:

- [devinschumacher.com](https://devinschumacher.com/)
- [www.devinschumacher.com](https://devinschumacher.com/)
- [https://devinschumacher.com](https://devinschumacher.com)
- [http://www.devinschumacher.com](http://www.devinschumacher.com)
- [https://devinschumacher.com](https://devinschumacher.com)
- [https://www.devinschumacher.com](https://www.devinschumacher.com)

and...

- [devinschumacher.com/](https://devinschumacher.com/)
- [www.devinschumacher.com/](https://devinschumacher.com/)
- [https://devinschumacher.com/](https://devinschumacher.com/)
- [http://www.devinschumacher.com/](http://www.devinschumacher.com/)
- [https://devinschumacher.com/](https://devinschumacher.com/)
- [https://www.devinschumacher.com/](https://www.devinschumacher.com/)

**Pro tip**: Utilize all these different types of naked URL variations. It's a great way to keep your anchor profile text varied so it doesn't look like you are trying to cheat the system).

### Generic Anchors

Generic (aka "misc", "miscellaneous", or "random") anchors are just random words that people use when linking somewhere.

#### Generic Anchor Text Examples:

- [click here](https://devinschumacher.com/)
- [here](https://devinschumacher.com/)
- [found here](https://devinschumacher.com/)
- [this article](https://devinschumacher.com/carpet-cleaning-marketing-ideas/)
- [super cool](http://instagram.com/dvnschmchr)
- etc.

### Image Anchor Text

Whenever an image links out somewhere, Google will automatically use the image alt-text as the link's anchor text.

Since most people don't fill this out, you will get a "blank" anchor text, that looks like this: **`<a>`no text`</a>`**

### Variations

This is not an actually definable anchor text type but I wanted to include it because variations of your anchor texts (and anchor text types) are how you keep things natural, strategic and diversified.

Here are some common anchor text variations (with examples) that we like to use:

- **Brand + Keyword**: [SERP Co - Digital Marketing](https://devinschumacher.com/)
- **Generic + Keyword**: [click here to visit this marketing agency](https://devinschumacher.com/)
- **Naked + Keyword**: [https://devinschumacher.com - an online marketing firm](https://devinschumacher.com/)

## Anchor text profile

Your anchor text profile (aka anchor text ratio) is quite literally the entire make-up of all the anchor texts of all the backlinks pointing to your page.

For example, if our website SERP Co had 4 links pointing to it with these anchor texts:

- devinschumacher.com
- SERP Co
- click here
- digital marketing company

Then our anchor text ratio (aka profile) would be:

- 25%: Naked anchor text
- 25%: Branded anchor text
- 25%: Generic anchor text
- 25%: Keyword anchor text

This is obviously a very simple example, but the point is that you want your anchor text profile to be natural.

Our actual anchor text profile, at the time of writing this, looks more like this:

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/anchor_text_profile_for_serp_co-1024x740-1.png)

To be honest, our anchor text profile is quite shit right now - but we just barely started building links and we purchased a couple of smaller SEO companies that ended up getting 301'd into our domain, so I'm not surprised that it's kind of weird.

Your focus should be to make sure you never have an anchor text ratio with a distribution that looks manipulated and will potentially be getting the attention of Google's algorithm.

If all of your anchor texts are keyword-based, it is pretty obvious for the algorithm to know that you are manipulating your anchor text to try and rank your website higher - because it is not normal for a website to receive all keyword anchor texts.

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/anchor-text-distribution-infographic.png)

## How to evaluate your anchor text profile

Whenever you are trying to evaluate pretty much anything in SEO it's usually a good idea to start with a relevant benchmark.

What does this mean in practice?

Find & analyze the competition who is winning where you want to be winning.

**Step 1: Make a list of your hyper-relevant competitors**

- Competitor1.com
- Competitor2.com
- Competitor3.com

**Step 2: Add your website to "Ahrefs > Anchors" & Export to CSV**

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/screen_shot_2019-10-18_at_8_08_31_pm-1024x536-1.png)

**Step 3: Repeat Step 2 for each of your competitors**

Step 4: Open the CSV and categorize the anchor text types**

**Pro tip**: Instead of using a spreadsheet for this, use SERP App for this. Everytime you get new links you can add an anchor text type to it and the software will begin to keep track of everything and give you recommendations.

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/categorizing-anchor-text-types-1-1024x845-1.png)

**Step 5: Create a simple pie chart, and voila!**

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/screen-shot-2019-10-18-at-8.32.19-pm-1024x470-1.png)

If you do this for each of the top competitors who are ranking for a keyword you want (and ideally you would do this with a page on your website, not your entire domain like I did in the example) you will quickly see the anchor text ratios of the top guys, and use it as a benchmark for your anchor text profile.

## Anchor text best practices

**Warning**: Improperly using anchor text can get you into serious trouble.

**Un-warning**: Follow what we tell you and you'll be just fine kiddo. And if you have questions or want an expert opinion before you do something to your site, you can always ask us [in the SERP University group](http://serp.university).

### Quick history lesson

Originally rolling out in 2012, and now part of the core Google algorithm, the "Penguin Algorithm Update" was an update by Google to improve the quality of their search results and try to eliminate spammers.

Specifically, the Penguin algorithm targeted "link schemes" and any websites that seemed to be intentionally manipulating aspects of backlinks to improve their search engine rankings.

Manipulating your anchor text definitely falls into the category of Penguin, but can also fall into the Panda algorithm as well.

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/anchor-text-penalty-1.png)

If you don't know what that is don't worry about it right now. The point is - always use anchor text best practices to avoid peril.

So anyway, now that the boring history lesson part of the show is done, let's kick off these best practices with a screenshot from Google about anchor text best practices.

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/googles-best-practices-on-anchor-text.png)

Now, I think we know by now that half of what Google says publicly is total BS and we need to take it with a grain of salt. We prefer to go by our personal tests to see what's working - not what some Google monkey has been told to tell us.

Some things Google says we will confirm, some we vehemently oppose.

As our good friend the Dalai Lama once said: “Know the rules well, so you can break them effectively.”

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/download-16.gif)

### Anchor text best-practice summary from our own research

- Keep your anchor text profile natural.
- Try to save your keyword anchor texts for your most powerful links.
- Don't over-optimize your anchor text (this isn't natural).
- Don't build links with the same anchor text consecutively (this isn't natural).
- Look to other websites in your industry and see how your anchor text profile matches up to theirs.
- Get the surrounding words/sentences before and after your anchor text to be hyper-relevant to the topic so a little extra push (this is called co-occurrence).
- If you want to stay as safe as possible use more naked URL & generic anchors.
- Use keyword anchors last in your link building arsenal - many times you can rank without them.
- Remember that the anchor text of internal links should be taken into account when thinking about a specific page's anchor text profile.

In general, we like to our most powerful links (links from high DR & UR sites) to have the closest to the exact match keyword anchor text as possible.

Use your less powerful links to help diversify your anchor text, and use your more powerful links for keyword anchor texts.

## What do I do if I have an over-optimized anchor text profile?

This is actually pretty easy to deal with.

If you think you're rankings are suffering or you are potentially setting yourself up for a nice big Google slap, you can quite easily "de-optimize" (otherwise known as "dilute") your anchor text.

And in case you were wondering, we have located actual footage of a Google slap in action on someone who over-optimized their anchor text:

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/download-18.gif)

Definitely something you want to avoid at all costs.

So, how do you do it? How do you dilute your anchor text?

- **Build more links**: The easiest way is to build more links! Make sure to build links with the "safe" types of anchors - naked, branded, generic.
- **Disavow**: If you have a ton of links AND they are low quality, then it will probably be easier to just disavow them.

Here are some great link types you can build to dilute your pages anchor text:

- Socials
- Directories
- Press Releases
- Blog comments
- Forum comments
- etc.

Now, a lot of these are nofollow - so if you are trying to dilute your dofollow anchor text then you need to be a bit more creative. But I think you get the overall concept.

Once again, if you need help with this you are welcome to ask your questions in the **comments** below, or in the [SERP University Group](https://serp.university).

## Final Thoughts

This article probably destroyed our internal anchor text ratio, but as long as it helped you learn it was all worth it.

Getting good at "sculpting" your anchor text takes time and practice, and there is no better place to practice (and get real-life feedback + advice) than SERP University.

Click here to join [SERP University](http://serp.university)

**Pop Quiz** - What kind of anchor text was that? ???

Answer in the comments below ???
