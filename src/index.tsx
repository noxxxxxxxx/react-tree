import 'lu2/theme/edge/css/common/ui/Checkbox.css'
import 'lu2/theme/edge/css/common/ui/LightTip.css'
import 'lu2/theme/edge/js/common/ui/LightTip.js'
import 'lu2/theme/edge/css/common/ui/Radio.css'
import { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'
import Tree from './component/index'
import { Store } from './store'
import '@/style/style.scss'

const Entry: FC<Props & ConfigProps> = (props): ReactElement => {
  return (
    <Provider store={Store}>
      <Tree {...props}></Tree>
    </Provider>
  )
}

export default Entry
