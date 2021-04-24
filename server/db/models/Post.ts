import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { toDate } from '../../routes/shared/utils/datetimefunc'

@Table({ tableName: 'posts' })
export class Post extends Model {
  @Column({ type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
  id!: number
  @Column({ type: DataTypes.STRING, allowNull: false })
  content!: string
  @Column({ type: DataTypes.STRING, allowNull: false })
  title!: string
  @Column({ type: DataTypes.STRING, allowNull: false })
  description!: string
  @Column({ type: DataTypes.STRING, allowNull: false })
  preview!: string
  @Column({ type: DataTypes.DATE, allowNull: false })
  createdAt!: Date
  @Column({ type: DataTypes.VIRTUAL })
  get date(): string {
    const rawValue = this.getDataValue('createdAt')
    return toDate(rawValue)
  }

  @Column({ type: DataTypes.DATE, allowNull: false })
  updatedAt!: Date
}
