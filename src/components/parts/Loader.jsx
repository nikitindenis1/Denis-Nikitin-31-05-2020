import React  from 'react'

const Loader = ({className}) => {
    return <div className={className ? `${className} loader` : 'loader'}>
        <aside></aside>
    </div>
}
export default Loader