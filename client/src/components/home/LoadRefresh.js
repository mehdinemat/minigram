import React from 'react'

const LoadRefresh = ({refresh , load}) => {
  return (
    <div>
    { !load ? <i className='fa fa-redo refreshIcon' onClick={refresh}></i> : <div class="spinner-border spinner-border-sm" role="status">
  <span class="sr-only">Loading...</span>
</div>}
    </div>
  )
}

export default LoadRefresh
