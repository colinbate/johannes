# Johannes

Johannes is a web content system. It is designed to be a content renderer, as well as a content production system. However, the latter can be used without the former with a simple API.

It is designed to give freedom to the designer and developer of the site but allow contextual editing of content for the content writer(s). It has influences from wikis, blogs and other content systems to combine into what people hopefully find to be a well balanced system.

**Goal:** Provide an easy way for content to take a front seat on a website.

## Principles

1. The experience of the content creator comes first.
2. There should be minimal to no need for a developer to help maintain the site.
3. Don't impose a fixed structure on the content creators or the designers.

## Features / Ideas

This is just a scratch pad for ideas at this point which is a bit more portable than writing them in a notebook by my desk.

 * Inline editing
 * Multiple content chunk types
     * Text section
     * List (of links)
     * More TBD
 * Markdown based syntax option
 * Very AJAX based, probably at most one page which is available out of context of the content itself
 * Self contained installation
     * Can write to the config.json
     * Can setup the database (locally or remotely?)
     * Creates an initial administrator
     * Creates the root page and adds example content
 * Potential to reuse content by linking it within multiple pages
 * Custom pages can be served from the file system if present
 * Multiple author support
 * Content versioning
 * Content curation (timed release, expiry, etc)
 * Content workflow

Some client side libraries that I'm using, or might use. I need to do something with my code organization.

 * jQuery
 * Backbone
 * ICanHaz
 * SimpleModal
 * jquery.form.js
 * guiders.js --- for helping people initially 

## Notes

This is a new project, born out of a frustration of using different content systems and not finding them able to answer my needs. Also as a chance to work on a node.js project in my (very minimal) spare time. 

I suspect that some of the content production features (multi author, workflow, etc.) will be done later as I don't have an immediate personal need for those things in my own sites.