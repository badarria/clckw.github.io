import { BelongsTo, Column, Model, Table, HasOne } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { Master } from '.'
import { Customer } from './Customer'

@Table({ timestamps: false, tableName: 'users' })
export class User extends Model {
  @Column({ type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
  id!: number
  @BelongsTo(() => Master || Customer, 'user_id')
  user!: Master | Customer
  @Column
  user_id!: number
  @Column({ type: DataTypes.TEXT, allowNull: false })
  role!: 'admin' | 'master' | 'customer'
  @Column({ type: DataTypes.TEXT, allowNull: false })
  name!: string
  @Column({ type: DataTypes.TEXT, allowNull: false })
  pass!: string
  @Column({ type: DataTypes.TEXT, allowNull: false })
  salt!: string
  @Column({ type: DataTypes.UUID, allowNull: false })
  token!: string
}
