import React from "react";
import { NavContent, NavLink } from "react-navi";
import { Doc } from "@frontarm/doc";
import classNames from "classnames/bind";
import { Nav } from "./Nav";
import styles from "./Layout.module.scss";

const cx = classNames.bind(styles);

export function Layout({
  routeMap,
  repositoryRoot,
  rootPathname,
  isAuthenticated,
  isPro
}) {
  return (
    <NavContent>
      {(content, route) => {
        let tableOfContents =
          content && content.tableOfContents && content.tableOfContents();

        // TODO:
        // - if this is a pro page, and the user isn't authenticated or isn't a pro member,
        //   then display an appropriate message

        let mainContent = route && (
          // The `<Document>` component's renderers can be set via a
          // `<DocumentProvider>` context, allowing this app's theme to
          // be set by a parent application.
          <>
            <Doc
              MDXComponent={content.Component}
              components={{
                headingLink: props => (
                  <NavLink {...props} className={cx("headingLink")}>
                    <LinkIcon />
                  </NavLink>
                ),
                hr: () => (
                  <Doc.Block>
                    <hr />
                  </Doc.Block>
                ),
                Beware: ({ className = "", title, children, ...props }) => (
                  <Doc.Block
                    marginSize="half"
                    className={cx("Beware") + " " + className}
                    {...props}
                  >
                    <Doc.Gutter half horizontal>
                      <header>
                        <h4>{title}</h4>
                      </header>
                      {children}
                    </Doc.Gutter>
                  </Doc.Block>
                ),
                Details: ({ className = "", title, children, ...props }) => (
                  <Doc.Block
                    marginSize="half"
                    className={cx("Details") + " " + className}
                    {...props}
                  >
                    <Doc.Gutter half horizontal>
                      <h4>{title}</h4>
                      {children}
                    </Doc.Gutter>
                  </Doc.Block>
                ),
                Image: ({ className = "", alt, style, ...props }) => (
                  <Doc.Block
                    className={cx("Image") + " " + className}
                    style={style}
                  >
                    <img {...props} alt={alt} />
                  </Doc.Block>
                ),
                ...content.documentComponents
              }}
              canAccessRestrictedContent={isPro}
              className={cx("document")}
              demoboardHelpers={content.demoboardHelpers}
            />
            <footer>
              <a
                className={cx("edit-link")}
                href={
                  "https://github.com/frontarm/navi-website/edit/master/" +
                  content.filename.replace(repositoryRoot, "")
                }
              >
                Edit this page on GitHub
              </a>
            </footer>
          </>
        );

        if (!isPro && route.data.exclusiveTo) {
          mainContent = (
            <Doc className={cx("document")}>
              <Doc.Block>
                <h1>This guide is exclusive to Pro members.</h1>
                <p>
                  <NavLink href="/pricing">Unlock all content &raquo;</NavLink>
                </p>
                {!isAuthenticated && (
                  <p>
                    <em>Already a member?</em>{" "}
                    <NavLink
                      href={
                        "/members/login/?redirectTo=" +
                        encodeURIComponent(route.url.pathname)
                      }
                    >
                      Log in
                    </NavLink>
                  </p>
                )}
              </Doc.Block>
            </Doc>
          );
        }

        return (
          <div className={cx("Layout")}>
            <Nav
              className={cx("nav")}
              routeMap={routeMap}
              rootPathname={rootPathname}
              tableOfContents={tableOfContents}
              renderToggle={({ onToggleOpen, isOpen }) => (
                <button className={cx("hamburger")} onClick={onToggleOpen}>
                  <div className={cx("icon")} />
                </button>
              )}
            />
            <main className={cx("content")}>{mainContent}</main>
          </div>
        );
      }}
    </NavContent>
  );
}

// Pulled from React documentation.
export const LinkIcon = () => (
  <svg
    aria-hidden="true"
    height="16"
    version="1.1"
    viewBox="0 0 16 16"
    width="16"
  >
    <path
      fill="evenodd"
      d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
    />
  </svg>
);
