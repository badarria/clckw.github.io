import { BelongsTo, Column, HasMany, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { Order } from './Order'

@Table({ tableName: 'photos', timestamps: false })
export class Photo extends Model {
  @Column({ type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
  id!: string
  @Column({ type: DataTypes.TEXT, allowNull: false })
  url!: string

  @HasMany(() => Order, { sourceKey: 'order_id', foreignKey: 'id', onDelete: 'set null', onUpdate: 'set null' })
  o!: Order[]

  @Column({ type: DataTypes.INTEGER, allowNull: false })
  order_id!: number
  @Column({ type: DataTypes.TEXT, allowNull: false })
  public_id!: string
  @Column({ type: DataTypes.TEXT, allowNull: false })
  resource_type!: string
}
