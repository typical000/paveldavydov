# Personal portfolio site

Created by Pavel Davydov

# TODO

- [x] Update all dependencies (jss, react-jss, etc.)
  - [x] Rewrite code to use JssProvider
  - [x] Rewrite code to use ThemeProvider. Refactore theme
  - [x] Ensure that SSR still work fine
  - [x] Fix lint-staged
  - [x] Add sourcemaps
- [x] Redesign
  - [x] Change fonts
  - [x] Change brand colors
  - [x] Redesign CSS animation on home screen
- [ ] Create new animation for main section
  - [ ] Update pixi.js dependency. Search if there is any way to avoid importing all pixi js in bundle
  - [x] Noise background animation
  - [x] Circular animation in center
  - [x] Add floating figures with animations
- [x] "Contact Me" content
- [ ] "About Me" content
- [ ] Functional `setState` as separated modules
- [ ] "Work" content
  - [ ] Layout
  - [ ] Works or single work presentation
- [ ] Tests for components (jest)
  - [ ] Unit testing
  - [ ] Integration tests
- [ ] React-helmet
- [ ] Add loader
- [ ] Decrease bundle size
  - [x] Add `webpack-bundle-analyzer`
  - [x] Replace GSAP with Tween.js
  - [ ] Pixi.js. Maybe there is any lighweight alternative