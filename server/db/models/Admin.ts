import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@Table({ timestamps: false, tableName: 'admin', freezeTableName: true })
export class Admin extends Model {
  @Column({ type: DataTypes.UUID, allowNull: false, primaryKey: true })
  id!: string
  @Column({ type: DataTypes.TEXT, allowNull: false })
  name!: string
  @Column({ type: DataTypes.TEXT, allowNull: false })
  password!: string
}
