import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as applicationActions from '../actions/application'
import MenuListItem from './MenuListItem'

const GITHUB_REPO =
  'https://github.com/'
const menuItems = [
  { text: 'Stargazers', link: '/stargazers/emmenko', icon: 'fa fa-star', role: 'admin' },
  { text: 'Account', link: '/account', icon: 'fa fa-user' },
  { text: 'About', link: '/about', icon: 'fa fa-dot-circle-o' },
  { text: 'Fork Me', link: GITHUB_REPO, icon: 'fa fa-github', isExternal: true }
]

class Menu extends React.Component {

  static propTypes = {
    activeClass: PropTypes.string.isRequired,
    application: PropTypes.object.isRequired,
    switchLocale: PropTypes.func.isRequired
  };

  constructor (props, context) {
    super (props, context)
    this.handleLanguageSwitch = this.handleLanguageSwitch.bind (this)
  }

  handleLanguageSwitch (evt) {
    this.props.switchLocale (evt.target.value)
  }

  render () {
    const { application: { locale, token } } = this.props
    return (
      <div id='menu' ref='menu' className={this.props.activeClass}>
        <div className='pure-menu'>
          <Link to='/' className='pure-menu-heading'>Scheduler</Link>

          {(()=> {
            if (token)
              return (
                <ul className='pure-menu-list'>
                  {menuItems.map ((item, i) => {
                    if (item.role === 'admin')
                      return <MenuListItem {...item} key={i}/>

                    if (item.role !== 'admin')
                      return <MenuListItem {...item} key={i}/>

                  }) }
                </ul>
              )
          }) ()}
          <form className='pure-form language-switcher'>
            <fieldset>
              <select ref='langSwitcher' value={locale}
                      onChange={this.handleLanguageSwitch}>
                <option value='en'>EN</option>
                <option value='de'>DE</option>
                <option value='ru'>RU</option>
              </select>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
}

export default connect (
  ({ application }) => ({ application }),
  applicationActions
) (Menu)
