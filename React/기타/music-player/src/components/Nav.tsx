import React, { Dispatch, memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

type Props = {
  libraryStatus: boolean
  setLibraryStatus: Dispatch<React.SetStateAction<boolean>>
}

const Nav: React.FC<Props> = ({ libraryStatus, setLibraryStatus }) => {
return (
    <nav>
      <h1>Waves</h1>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  )
}

export default memo(Nav)