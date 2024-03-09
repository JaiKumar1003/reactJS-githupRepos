// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguage, onClickLanguageButton, currentLanguage} = props
  const {id, language} = eachLanguage

  const addBtnStyle = currentLanguage === id ? 'add-btn-style' : ''

  const onClickLanguage = () => {
    onClickLanguageButton(id)
  }
  return (
    <li className="language-item">
      <button
        onClick={onClickLanguage}
        className={`language-button ${addBtnStyle}`}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
