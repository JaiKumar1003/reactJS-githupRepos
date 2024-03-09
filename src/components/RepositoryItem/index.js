// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {eachItem} = props
  const {name, avatarUrl, starsCount, forksCount, issuesCount} = eachItem
  return (
    <li className="repos-item">
      <div className="repos-item-card">
        <img className="repos-avatar-img" src={avatarUrl} alt={name} />
        <h1 className="repos-item-heading">{name}</h1>
        <div className="repos-stars-issues-forks-card">
          <img
            className="repos-item-icon"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p className="repos-item-count">{`${starsCount} stars`}</p>
        </div>
        <div className="repos-stars-issues-forks-card">
          <img
            className="repos-item-icon"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
          />
          <p className="repos-item-count">{`${forksCount} forks`}</p>
        </div>
        <div className="repos-stars-issues-forks-card">
          <img
            className="repos-item-icon"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
          />
          <p className="repos-item-count">{`${issuesCount} open issues`}</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
