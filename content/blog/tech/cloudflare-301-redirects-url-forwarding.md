---
slug: /cloudflare-301-redirects-url-forwarding/
title: Cloudflare 301 Redirects
date: '2023-01-17'
categories:
  - seo
tags:
  - web-development
category: TypeScript
---

# Cloudflare Redirects: How to Setup 301 Redirects (URL Forwarding) Using CloudFlare's DNS & Page Rules

So you have a super popular "how to poop standing up" article 💩, butt you just got a new domain hooked up on CloudFlare and are worried that all those people who bookmarked the old URL might not be able to find thew new one...

Sounds like you need to setup some 301s!

Unfortunately, setting up a 301 redirect at CloudFlare isn’t that self-explanatory…

And since nobody likes reading documentation I figured that a true hero needed to step up and make this easy on the rest of the world.

So here I am, hero of the internet, come to make your life easier once again – with an article, video & SOP for you to save and use later!

<iframe width="560" height="315" src="https://www.youtube.com/embed/NcZYnZHl4w8?si=JD-x0oKbR-1QG5Uj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

- [Cloudflare Redirects: How to Setup 301 Redirects (URL Forwarding) Using CloudFlare's DNS & Page Rules](#cloudflare-redirects-how-to-setup-301-redirects-url-forwarding-using-cloud-flares-dns-amp-page-rules)
    - [How to setup a CloudFlare 301 redirect using "page rules":](#how-to-setup-a-cloud-flare-301-redirect-using-page-rules)
        - [1\. Add Domain to CloudFlare](#1-add-domain-to-cloud-flare)
        - [2\. Update NameServers](#2-update-name-servers)
        - [3\. Update CloudFlare DNS](#3-update-cloud-flare-dns)
        - [4\. Setup Page Rules for URL Forwarding](#4-setup-page-rules-for-url-forwarding)
    - [🎁 Free Gifts](#🎁-free-gifts)

## How to setup a CloudFlare 301 redirect using "page rules":

The process of setting up redirects using Cloudflare's DNS is pretty simple. You add your domain, point the CloudFlare DNS records (A record & CNAME record) to Cloudflare's server, and then setup a URL forwarding rule. That's pretty much it.

The first two steps of this walkthrough have nothing to do with the actual CloudFlare 301 setup. They are the things you need to do _before_ any of this works. So, if you've already added your domain to your CF account and pointed your domain registrar's nameservers to it - you can skip them and start at [Step 3](#cloudflare-dns).

### 1\. Add Domain to CloudFlare

At the dashboard ([dash.cloudflare.com](https://dash.cloudflare.com)) of your CloudFlare account click the "Add a site" button, and enter your domain on the next screen.

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/cloudflare-dashboard-add-site.png)

Once you do that, you'll be presented with pricing options. Just choose the free one (bottom of screen) and move on.

Cloudflare will scan for existing DNS records and bring them over.

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/Screen-Shot-2023-01-17-at-08.34.28-1024x637.png)

Keep them or delete them - the choice is yours (and depends on what you're trying to do).

Click continue, and you'll get your account's nameservers.

You'll need to update your current domain's nameservers, which you can find at the domain registrar - aka the place where you login to see your domain, and probably where you purchased it.

### 2\. Update NameServers

I can't make a tutorial for updating nameservers at every web hosting company, because there's like a trillion of them.

But you'll just need to go to your account > select your domain > choose 'edit nameservers' or something similar > paste in the nameservers that Cloudflare gave you in the last step.

Now, it will take anywhere from 10 minutes to 48 hours for those changes to take effect. This is called propagation.

But you don't have to wait for that to continue. You will have to wait for it for all the things you do next to _work,_ however.

### 3\. Update CloudFlare DNS

This is where the actual process starts.

Go to your domain settings in CloudFlare and choose "DNS".

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/cloudflare-DNS-recorrds-1024x685.png)

If redirecting the whole domain I usually start with deleting the current DNS records that CloudFlare ported over. Don't do that if you have records in there you need.

Yes, captain obvious I know but... Common sense isn't always so common in these extremely tense IT settings...

Next, we're going to add in the CloudFlare DNS records you need for your URL Forwarding to work.

Click 'Add record' and add the following information, and click the 'Save' button:

- **Type**: A

- **Name**: @

- **IPv4 Address**: 192.0.2.1

Now, click the 'Add record' button again, add the following information, and click the 'Save' button:

- Type: CNAME

- **Name**: www

- **Target**: @

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/setup-CF-dns-for-301-url-forwarding-1024x564.png)

### 4\. Setup Page Rules for URL Forwarding

Navigate to the "Rules" area on the sidebar, then click "Page Rules" and click the 'Create Page Rule\` button.

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/cloudflare-page-rules-1024x700.png)

Now it's time to set your 301s!

I'm going to setup a 301 redirect to forward all traffic coming to 'domain A' to 'domain B', but you can easily just change the URL & destination to fit your needs.

**Follow these steps:**

1. Enter the URL pattern you want 301ing

3. Click the dropdown and choose 'URL Forwarding'

5. Select your 'Status Code' from the drop down (probably 301)

7. Enter the destination

9. Click 'Save and Deploy Page Rule'

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/setup_cloudflare_page_rules_for_URL_forwarding-1024x923.png)

I entered the root domain, and put an asterisk ( \* ) at the end, which means that if anyone goes to an inner url, like "domain.com/whatever-asdfadf" it will also get redirected.

You can setup inner URL specific 301s too.

Now, I'm simply going to do the exact same thing again - but this time add the www. version.

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/setup_cloudflare_page_rules_for_URL_forwarding-with-www-1024x873.png)

**Same steps from above:**

1. Enter the URL pattern you want 301ing

3. Click the dropdown and choose 'URL Forwarding'

5. Select your 'Status Code' from the drop down (probably 301)

7. Enter the destination

9. Click 'Save and Deploy Page Rule'

![](https://raw.githubusercontent.com/devinschumacher/uploads/main/images/CF-page-rules-done-1024x902.png)

That's it! You're done!

You should be able to go to your forwarded domain, and be taken to the destination.

If it doesn't work, make sure:

1. You've given enough time for your nameservers to propagate (see step #2)

3. You clear the CloudFlare cache (if you transferred your domain from another Cloudflare account)

5. You clear your browser cache, or try in 'incognito mode' (press `shift` + `command` + `n` on most browsers (MAC) to open an incognito window)

## 🎁 Free Gifts

👉 Get the free **[How to setup a Cloudflare 301 Redirect checklist](https://serp.ly/ps-cloudflare-redirects)**, and run it anytime you need to repeat this process.
