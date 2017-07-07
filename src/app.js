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
    }
}

const loginForm = blessed.form({
  parent: screen,
  keys: true,
  top: 'center',
  left: 'center',
  width: '20%',
  height: '20%',
  bg: 'gray',
  content: 'Login'
})

const loginButtons = {
    submit: {
        parent: loginForm,
        left: 10,
        bottom: 1,
        name: 'submit',
        content: 'Submit',
        style: {
            bg: 'blue',
            focus: { bg: 'red' },
            hover: { bg: 'red' }
        }   
    },
    cancel: {
        parent: loginForm,
        left: 20,
        bottom: 1,
        name: 'cancel',
        content: 'Cancel',
        style: {
            bg: 'blue',
            focus: { bg: 'red' },
            hover: { bg: 'red' }
        }   
    }
}

const loginTexts = {
    name: {
        parent: loginForm,
        value: 'Name:',
        top: 1,
        left: 'center',
        width: '50%',
        height: '10%',
        style: { bg: 'gray' }
    },
    password: {
        parent: loginForm,
        value: 'Password:',
        top: 4,
        left: 'center',
        width: '50%',
        height: '10%',
        style: { bg: 'gray' }
    }
}

const loginInputs = {
    name: {
        parent: loginForm,
        top: 2,
        left: 'center',
        width: '50%',
        height: '10%',
        tags: true,
        mouse: true,
        keys: true,
        inputOnFocus: true,
        name: 'name',
        content: 'Name',
        style: { fg: 'white' }
    },
    password: {
        parent: loginForm,
        top: 5,
        left: 'center',
        width: '50%',
        height: '10%',
        tags: true,
        mouse: true,
        keys: true,
        inputOnFocus: true,
        censor: true,
        name: 'password',
        content: 'Password',
        style: { fg: 'white' }
    }
}

const renderButtonsLogin = render(loginButtons, buttonDefaultProps, 'Button')
const renderInputsLogin = render(loginInputs, {}, 'textbox')
const renderLoginText = render(loginTexts, {}, 'textarea')

addListener(renderButtonsLogin, 'submit', 'press', () => loginForm.submit())
addListener(renderButtonsLogin, 'cancel', 'press', () => loginForm.reset())

loginForm.on('submit', data => {
  loginForm.setContent('Submitted.')
  screen.render()
})

loginForm.on('reset', data => {
  loginForm.setContent('Canceled.')
  screen.render()
})

screen.key([ 'q', 'escape' ], () => process.exit(0))

screen.render()