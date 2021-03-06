export const filename = __filename
import { Doc } from '@frontarm/doc'
import { NavLink } from 'react-navi'
import styles from './start-here.module.scss'

<div className={styles.StartHere}>

<Doc.Image aside className={styles['top-logo']} src={require('../logo.svg')} />

Navi
====

<Doc.Block className={styles['pitch']}>

**A JavaScript library for declaratively mapping URLs to asynchronous content.**

Navi lets you use functions and `async`/`await` to map your app's URLs to its data and views. It comes with a set of modern React components to render your routes using Suspense and Hooks. And as icing on the cake, it makes static rendering for SEO a breeze.

And the best part? You get all this without any vendor lock-in. *You don't even need to eject from create-react-app!*

<div className={styles['buttons']}>
<NavLink href='./guides/getting-started' className={styles['primary']}>Get Started</NavLink>
<a href='https://github.com/frontarm/navi' className={styles['github']}>
  <img src={require('../github-icon.png')} alt="GitHub icon" /> 
  GitHub
</a>
<a href='https://github.com/frontarm/navi/blob/master/LICENSE.md' className={styles['license']}>
  MIT Licensed
</a>
</div>

</Doc.Block>

<hr />

<Doc.Aside className={styles['maj']}>
<Doc.Gutter>
<aside>
<h4>Navi ❤️ <code>async</code>/<code>await</code></h4>

To get the most out of Navi, you'll need a solid understanding of JavaScript Promises and the new `async`/`await` syntax.

If you want to improve your `async`/`await` and Promises skills, Frontend Armory's [Mastering Async JavaScript](https://frontarm.com/courses/async-javascript/) course will guide you through everything you need to know.

</aside>
</Doc.Gutter>
</Doc.Aside>

## Try Navi.

Navi is just a library, and so it works great with both new and existing apps.

```bash
npm install navi react-navi
```

The quickest way to try Navi is to play with the embedded editor below. It demonstrates how to implement this documentation site, including the basics of routing, linking, code splitting, generating a list of a site's pages, and SEO.

To try Navi in a new site, you can use a create-react-app based starter:

-   [create-react-navi-app](/create-react-navi-app/#create-react-navi-app)<br />
    *Creates a project skeleton using create-react-app, then adds static rendering to the build script, and two routes to get you started.*

-   [create-react-blog](/create-react-navi-app/#create-react-blog)<br />
    *Creates a project skeleton using create-react-app, then adds routing, static rendering, pagination, tags, [MDX](https://mdxjs.com), an RSS feed, a Netlify deploy script, and a theme based on Dan Abramov's [overreacted.io](http://overreacted.io), for a ready-to-go blog.*

Or if you'd like to see how simple it is to add Navi to your own create-react-app project, head on over to [the minimal example](./guides/minimal-example/).

Oh, and if you already have an app built with react-router? Then adding Navi is ridiculously easy -- just mount your Navi routes within a react-router `<Route>`. For details, see the guide to [integrating with react-router](./integrations/react-router).

## This site uses Navi. Here's how it works.

```jsx
//--- index.js
import React, { Suspense } from 'react'
import { Navi } from 'react-navi'
import Layout from './Layout'
import routes from './routes'

ReactDOM.render(
  <Suspense fallback={<Layout />}>
    <Navi routes={routes} />
  </Suspense>,
  document.getElementById('root')
)
//--- routes.js 
import { map, route } from 'navi'

export default map({
  '/': route({
    title: 'Start Here',
  }),

  '/motivation': route({
    title: 'Why Navi?',
  })

  '/getting-started': route({
    title: 'Getting Started',
  })
})
```

[See this site's source on GitHub &raquo;](https://github.com/frontarm/navi-website)

</div>