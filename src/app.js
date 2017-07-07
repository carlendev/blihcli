const blessed = require('blessed')
const contrib = require('blessed-contrib')

const addProps = props => Object.assign({}, props)

const render = (objects, props, fnName) => Object.keys(objects).map(e => blessed[fnName](Object.assign({}, objects[e], Object.assign({}, props))))

const addListener = (objects, name, action, fn) => objects.find(e => e.name === name).on(action, fn)

const screen = blessed.screen()

const buttonDefaultProps = {
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
        left: 1,
        right: 1
    },
    style: {
        bg: 'blue',
        focus: { bg: 'red' },
        hover: { bg: 'red' }
    }
}

const form = blessed.form({
  parent: screen,
  keys: true,
  top: 'center',
  left: 'center',
  width: '20%',
  height: '20%',
  bg: 'gray',
  content: 'Login'
})

const formButtons = {
    submit: {
        parent: form,
        left: 10,
        bottom: 1,
        name: 'submit',
        content: 'Submit',
    },
    cancel: {
        parent: form,
        left: 20,
        bottom: 1,
        name: 'cancel',
        content: 'Cancel',
    }
}

const renderObjects = render(formButtons, buttonDefaultProps, 'Button')

addListener(renderObjects, 'submit', 'press', () => form.submit())
addListener(renderObjects, 'cancel', 'press', () => form.reset())


form.on('submit', data => {
  form.setContent('Submitted.')
  screen.render()
})

form.on('reset', data => {
  form.setContent('Canceled.')
  screen.render()
})

screen.key('q', () => process.exit(0))

screen.render()