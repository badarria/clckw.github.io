import { Column, Model, Table, HasOne } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { Master } from '.'
import { Customer } from './Customer'

@Table({ timestamps: false, tableName: 'users' })
export class User extends Model {
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    onDelete: 'cascade',
    onUpdate: 'cascade',
  })
  id!: number
  @HasOne(() => Master || Customer, { foreignKey: 'user_id' })
  user!: Master | Customer
  @Column({ type: DataTypes.TEXT, allowNull: false })
  role!: 'admin' | 'master' | 'customer'
  @Column({ type: DataTypes.TEXT, allowNull: false, unique: true })
  email!: string
  @Column({ type: DataTypes.TEXT, allowNull: false })
  pass!: string
  @Column({ type: DataTypes.TEXT, allowNull: false })
  salt!: string
  @Column({ type: DataTypes.TEXT, allowNull: false })
  token!: string
}
