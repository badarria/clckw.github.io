import { Column, HasMany, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { Order } from './Order'

@Table({ tableName: 'services', timestamps: false })
export class Service extends Model {
  @HasMany(() => Order, { foreignKey: 'service_id', onDelete: 'set null', onUpdate: 'set null' })
  services!: Order[]
  @Column({ type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
  id?: string
  @Column({ type: DataTypes.STRING, unique: true, allowNull: false })
  name!: string
  @Column({ type: DataTypes.TEXT, allowNull: false })
  time!: string
}
