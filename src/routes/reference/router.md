export const filename = __filename

# `router` objects

Within a Navi app, the `Router` class is tasked with matching URLs to [`Route`](../data-types/#route) objects, and is also able to produce a [`SiteMap`](../data-types/#sitemap) that maps all possible URLs to their corresponding `Route` objects.

To access a `router` object, you can use the `navigation.router` property of your [`navigation`](../navigation) store. Or to use a router when declaring your routes, you can access the [`Env`](../declarations/#env-objects) object's `env.router` property.

## `router.resolve()`

```typescript
router.resolve(url, options?: {
  followRedirects?: boolean,
  withContent?: boolean,
})
```

Returns a `Promise<Route>`

## `router.resolveSiteMap()`

```typescript
router.resolveSiteMap(url, options? :{
  followRedirects?: boolean,
  maxDepth?: number,
  predicate?: (segment: Segment) => boolean,
})
```

Returns a `Promise<`[`SiteMap`]()`>` that maps each of the URLs under and including `url` to a [Route object](../data-types/#route).

This is useful for automatically generating lists of content, e.g. for a blog's index page, a static rendering tool, or a sidebar. In fact, this site's navigation sidebars are all generated using the result of `router.resolveSiteMap()`.
