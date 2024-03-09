import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const reposStatusObject = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class GithubPopularRepos extends Component {
  state = {
    repositoryList: [],
    reposCurrentStatus: reposStatusObject.loading,
    currentLanguage: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getReposList()
  }

  getReposList = async () => {
    const {currentLanguage} = this.state

    const url = `https://apis.ccbp.in/popular-repos?language=${currentLanguage}`
    const option = {
      method: 'GET',
    }
    const response = await fetch(url, option)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
        starsCount: eachItem.stars_count,
      }))

      this.setState({
        repositoryList: updatedData,
        reposCurrentStatus: reposStatusObject.success,
      })
    } else {
      this.setState({reposCurrentStatus: reposStatusObject.failure})
    }
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailure = () => (
    <div className="failure-card">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderSuccess = () => {
    const {repositoryList} = this.state
    return (
      <ul className="repos-list">
        {repositoryList.map(eachItem => (
          <RepositoryItem eachItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderReposList = () => {
    const {reposCurrentStatus} = this.state

    switch (reposCurrentStatus) {
      case reposStatusObject.success:
        return this.renderSuccess()
      case reposStatusObject.failure:
        return this.renderFailure()
      case reposStatusObject.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  onClickLanguageButton = languageId => {
    this.setState(
      {
        currentLanguage: languageId,
        reposCurrentStatus: reposStatusObject.loading,
      },
      this.getReposList,
    )
  }

  render() {
    const {currentLanguage} = this.state

    return (
      <div className="app-container">
        <div className="github-repos-card">
          <h1 className="main-heading">Popular</h1>
          <ul className="language-list">
            {languageFiltersData.map(eachLanguage => (
              <LanguageFilterItem
                key={eachLanguage.id}
                eachLanguage={eachLanguage}
                onClickLanguageButton={this.onClickLanguageButton}
                currentLanguage={currentLanguage}
              />
            ))}
          </ul>
        </div>
        <div className="repos-list-card">{this.renderReposList()}</div>
      </div>
    )
  }
}

export default GithubPopularRepos
