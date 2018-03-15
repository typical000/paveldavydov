import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'css-functions'
import {H2, H3} from '../typography'
import injectSheet from '../../utils/jss'

const styles = (theme) => ({
  spacing: {
    padding: 20,
  },
  header: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
  },
  image: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 'auto',
    height: '100%',
    transform: translate('-50%', '-50%'),
  },
  holder: {
    composes: '$spacing',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    // TODO: Check if we need it or we need maybe some overlay over it
    color: theme.text.light,
  },
  content: {
    composes: '$spacing',
  },
})

const Work = ({classes, imageLarge, title, info}) => (
  <div className={classes.work}>
    <div className={classes.header}>
      <img className={classes.image} src={imageLarge} role="presentation" />
      {/* TODO: Add holder appearing animation on component mount */}
      <div className={classes.holder}>
        <H2 className={classes.title}>{title}</H2>
        <H3 className={classes.info}>{info}</H3>
      </div>
    </div>
    <div className={classes.content}>
      {`
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum tincidunt interdum. Aliquam ullamcorper urna a velit posuere accumsan. Nulla fermentum leo sit amet condimentum eleifend. Proin non tincidunt erat. Vivamus quis nulla ut metus gravida mattis vel in tellus. Suspendisse at placerat diam. Integer non libero quis nunc molestie mattis vitae eget nulla. Vivamus at felis vel mi commodo vulputate. Phasellus eu vehicula nisl. Praesent orci dolor, semper ut rutrum viverra, euismod quis arcu. Mauris laoreet placerat lacus, quis rutrum metus ornare eu. Aenean fermentum, dui a finibus feugiat, tortor ante commodo nulla, ut pharetra quam risus nec lorem.
        Sed at libero eget turpis volutpat iaculis et sed elit. Donec sapien lacus, scelerisque sit amet turpis id, accumsan volutpat sapien. Nam ultrices tortor quis massa placerat, laoreet dignissim turpis pharetra. Donec pellentesque lobortis diam. Vivamus porta condimentum massa ultrices vehicula. In quis dolor eget lacus commodo vestibulum. Integer cursus ipsum vitae orci fermentum lacinia. Nam consequat vitae odio nec rhoncus. Quisque ut ullamcorper leo. Nam id varius orci. Donec vitae rutrum lacus. Maecenas cursus, felis sit amet finibus fringilla, lacus elit laoreet ante, vitae finibus felis diam nec mauris. Fusce nisl arcu, bibendum laoreet augue eget, facilisis vulputate massa. Etiam condimentum eros eget magna placerat congue.
        Nam sit amet odio mauris. Morbi volutpat at nulla et accumsan. Mauris vulputate a neque non efficitur. Integer sit amet urna vitae justo bibendum iaculis. Nulla in justo a ipsum lacinia feugiat ut vel nulla. Cras vestibulum, lorem sed sagittis viverra, arcu justo lobortis magna, id pretium ante sem et ligula. Maecenas bibendum magna ante, fringilla vulputate ipsum elementum accumsan. Pellentesque porta ex cursus, finibus lacus eu, consequat justo. Nunc condimentum mattis quam quis rhoncus. In interdum ultricies pharetra. Curabitur iaculis leo ac enim tincidunt semper. In consectetur vestibulum commodo. Nam pharetra pharetra massa mattis viverra. Fusce in diam nec velit vehicula bibendum a ut risus. Nullam sit amet ligula in neque varius pulvinar eu at quam. Vivamus tempor, sem et varius interdum, ipsum sapien ultrices risus, vel pulvinar sem ex at augue.
        Praesent euismod mattis sapien, a accumsan risus consequat vel. Integer quis gravida leo. Morbi a mi pharetra, sagittis eros vitae, sollicitudin odio. Nam elementum gravida nulla at fermentum. Nam ut odio a massa dictum auctor. Sed sollicitudin ultrices tellus id venenatis. Suspendisse cursus tempor velit, sed pharetra libero ultrices sit amet. Aliquam in facilisis leo.
        Suspendisse consectetur, lorem eget condimentum faucibus, purus turpis placerat ante, ac rutrum massa neque sit amet justo. Pellentesque pulvinar justo nec nisl facilisis mollis. Duis hendrerit, diam non pretium ornare, risus lorem molestie metus, ut dictum lectus enim laoreet ex. Ut pulvinar mauris vel cursus elementum. Morbi luctus bibendum lorem eget convallis. Aliquam erat volutpat. Curabitur eu luctus mauris, id blandit neque. Nullam eget porta lacus, in faucibus purus. Vestibulum sed imperdiet turpis. Suspendisse eget mattis felis, in tempor orci. Donec pellentesque mauris metus, at placerat felis tempus eu.
      `}
    </div>
  </div>
)

Work.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  imageLarge: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
}

export default injectSheet(styles)(Work)
