import musicApi from './music-api'
import Netease from './netease'
import QQ from './qq'
import Xiami from './xiami'
import neteaseInstance from './netease/instance/node'
import qqInstance from './qq/instance/node'
import xiamiInstance from './xiami/instance/node'
import xiamiNewApiInstance from './xiami/instance/node.new'

export const netease = Netease(neteaseInstance)
export const qq = QQ(qqInstance)
export const xiami = Xiami(xiamiInstance, xiamiNewApiInstance)

const app = musicApi(netease, qq, xiami)
app.netease = netease
app.qq = qq
app.xiami = xiami

export default app