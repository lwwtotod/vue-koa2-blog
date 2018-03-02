import '../../env'
import Sequelize from 'sequelize'

const Test = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost/test`, {
  define: {
    timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
  }
})

export default {
  Test // 将Todolist暴露出接口方便Model调用
}
