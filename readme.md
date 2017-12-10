# Personal portfolio site

Created by Pavel Davydov

# TODO

- [ ] Update all dependencies (jss, react-jss, etc.)
  - [ ] Rewrite code to use JssProvider
  - [ ] Rewrite code to use ThemeProvider. Refactore theme
  - [ ] Ensure that SSR still work fine
  - [x] Fix lint-staged
- [ ] Redesign
  - [ ] Change fonts
  - [ ] Change brand colors
  - [ ] Redesign menu
  - [ ] Redesign CSS animation on home screen
- [ ] Create new animation for main section
  - [ ] Update pixi.js dependency. Search if there is any way to avoid importing all pixi js in bundle
  - [ ] Noise background animation
  - [ ] Circular animation in center
  - [ ] Add floating figures
  - [ ] Make that floating figures don't collide with circular animations
- [ ] "Contact Me" content
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