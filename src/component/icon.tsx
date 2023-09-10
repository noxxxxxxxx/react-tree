const Icon = ({ Icom, node }) => {
  if (typeof Icom === 'string') {
    return (
      <i className="icon">
        <img src={Icom} />
      </i>
    )
  }
  if (typeof Icom === 'object') return <>{Icom}</>
  if (typeof Icon === 'function') return <Icom {...node}></Icom>
}

export default Icon
