export const filename = __filename
import { Doc } from '@frontarm/doc'
import Blurb from '../../components/Blurb'


The Motivation For Navi 🌏
=========================

<Blurb>

Navi lets you create big, fast, CDN-delivered apps with great SEO & SMO -- and all with vanilla create-react-app.

</Blurb>

It's Business Time
------------------

Apps live and die on their traffic. And on the modern web, the majority of **traffic comes from search engines and social media**. If you want your site to be seen by anyone, then you need to design for SEO and SMO -- and that means pre-rendering your app using [static or server rendering](https://frontarm.com/james-k-nelson/static-vs-server-rendering/).

There's just one problem: real-world apps are ***big***.

Imagine if Facebook sent all its data and JavaScript code with each request. *It'd break the internet.* Indeed, if you take a look around the industry, **the vast majority of real-world apps rely on some kind of asynchronous data** -- whether it's fetched from an API, pulled from a database, or dynamically imported from code-split bundles. For the most part, React handles this asynchronous data pretty well; hooks or lifecycle methods make it easy to show a loading spinner until the data is ready. But there's a catch.

<Doc.AsideTop>

**Outside of the browser, hooks and lifecycle methods don't work so well**. This is because React takes a completely different approach to rendering; on the browser, you call `ReactDOM.render()`, while on the server, you use `ReactDOMServer.renderToString()`. And while `renderToString()` will happily render your page's *initial* content, this doesn't help when the initial content is a loading spinner.

<Doc.Image
  src={require('./renderToString-to-loading.png')}
  alt="renderToString() results in a loading spinner"
/>

<Doc.Details aside title="What about React Suspense?">

Suspense is a new React API that allows React to suspend rendering until something happens. When [Suspense for Server Rendering](https://reactjs.org/blog/2018/11/27/react-16-roadmap.html#suspense-for-server-rendering) is released, it'll become much easier to statically render asynchronous content.

Of course, Navi does much more than waiting for content: it also gives you a way to compose mappings from URLs to data. *Suspense will just make Navi's job easier.* In fact, Navi already uses Suspense to wait for the initial render!

</Doc.Details>
</Doc.AsideTop>

Now as you probably know, the React ecosystem *does* have a number of tools that help with pre-rendering and asynchronous data. For example, Next.js gives you [`getInitialProps()`](https://nextjs.org/docs/#fetching-data-and-component-lifecycle), and Gatsby lets you hide the entire filesystem [behind GraphQL](https://www.gatsbyjs.org/docs/querying-with-graphql/). And while both of these approaches *work*, they're super complicated. They have their own framework and build systems, and are full-fledged ecosystems in their own right. Which is great and all, but...

**What if all you *really* needed was a way to get your page's content *before* calling `renderToString()`?**

<Doc.Image
  src={require('./renderToString-to-content.png')}
  alt="Navi allows you to await the content before calling renderToString()"
/>


A Router/Fetcher
----------------

Navi is a JavaScript library for mapping URLs to content; it's a router. But Navi has a difference from other routers: the content can be asynchronous, and it can be *anything*. It lets you map URLs to data, views, or even HTTP headers -- and then lets you easily compose these mappings. **It makes getting all of a URL's content as easy as waiting for a promise to resolve.**

```js
//--- navi.js
import { createMemoryNavigation, map, redirect } from 'navi'

// Set up your routes and URL
let routes = map({
  '/': redirect('/quotes/1'),
  '/quotes/:id': () => import('./quotePage')
})
let navigation = createMemoryNavigation({ routes, url: '/' })

// Wait for the content to load
let route = await navigation.getCurrentValue()

// Then render the route!
document.body.innerHtml = ReactDOMServer.renderToString(route.data)
```

The above example demonstrates why static and server rendering is so much easier with Navi: **it moves your routing and initial data fetching code out of synchronous React components, and into async functions.**

Of course, in a *real* app you'd also need to deal with:

- Nested layouts and routes
- Visualizing route transitions with a loading bar
- `<meta>` and `<title>` tags for SEO
- Updating scroll positions after content loads
- Building a list of your app's statically renderable URLs
- Creating HTML files for each of your statically renderable pages

Navi is flexible enough to handle all of this, but it again takes a different approach to existing frameworks. Where possible, **Navi integrates with existing tools and libraries:**

- It uses react-helmet to manage your `<title>` and `<head>`
- It can statically build create-react-app projects -- *without ejecting*
- It lets you gradually transition to static rendering, by working [alongside react-router](/integrations/react-router)

Here's a more full featured example of what Navi can do:

```js
//--- index.js
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Navi, NaviView } from 'react-navi'
import { composeMatchers, map, withHead, withView } from 'navi'
import Layout from './Layout'

let routes = composeMatchers(
  // Specify the top-level view for each subsequently matched route.
  // Any nested view can then be rendered with `<NaviView />`.
  withView(
    <Layout>
      <NaviView />  
    </Layout>
  ),
  // Specify a default title for the website. Navi will automatically
  // set the document title as the user navigates.
  withHead(
    <title>My Great Blog</title>
  ),
  map(
    // Lazily load code that is specific to each URL.
    '/': () => import('./indexPage'),
    '/launch-silos/:id': () => import('./siloPage'),
  )
)

ReactDOM.render(
  // If Navi's initial view isn't immediately available, it uses
  // Suspense to decide what to display until the route is ready.
  <Suspense fallback={<Layout />}>
    <Navi routes={routes} />
  </Suspense>,
  document.getElementById('root')
)
//--- indexPage.js
//--- siloPage.js
//--- Layout.js
//--- styles.css
```
