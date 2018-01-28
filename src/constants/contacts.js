import {Skype, Email, Twitter, Github, Linkedin} from '../components/icons'

export const resumeUrl = 'http://some-url.com/resume'

/**
 * Site author contact data. Used both on
 * 'About' and 'Contact' pages.
 *
 * Keys 'component' is used on 'Contact' page to add
 * floating icon on background
 */
export const skype = {
  label: 'Skype',
  text: 'typical000',
  href: 'skype:typical000?chat',
  component: Skype,
}

export const email = {
  label: 'Email',
  text: 'typical000@gmail.com',
  href: 'mailto:typical000@gmail.com',
  component: Email,
}

export const twitter = {
  label: 'Twitter',
  text: '@typical001',
  href: 'https://twitter.com/typical001',
  component: Twitter,
}

export const github = {
  label: 'GitHub',
  text: 'typical000',
  href: 'https://github.com/typical000',
  component: Github,
}

export const linkedin = {
  label: 'Linkedin',
  text: 'PavelDavydov',
  href: 'https://www.linkedin.com/in/pavel-davydov-09892aa5/',
  component: Linkedin,
}

export default {
  skype,
  email,
  twitter,
  github,
  linkedin,
}
