import { BelongsTo, Column, HasMany, HasOne, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { Order } from './Order'
import { User } from '.'

@Table({ tableName: 'customers', timestamps: false })
export class Customer extends Model {
  @HasMany(() => Order, { foreignKey: 'customer_id', onDelete: 'set null', onUpdate: 'set null' })
  orders!: Order[]

  @BelongsTo(() => User, { foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' })
  user!: User

  @Column
  user_id!: number

  @Column({ type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
  id!: number

  @Column({ type: DataTypes.STRING, allowNull: false })
  name!: string

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  surname!: string

  @Column({ type: DataTypes.VIRTUAL })
  get email(): string {
    return this.getDataValue('user')?.email || ''
  }

  @Column({ type: DataTypes.VIRTUAL })
  get fullName(): string {
    return `${this.name} ${this.surname}`
  }
}
