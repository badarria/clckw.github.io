import { BelongsTo, Column, HasMany, HasOne, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { Order } from './Order'
import { User } from '.'

@Table({ tableName: 'customers', timestamps: false })
export class Customer extends Model {
  @HasMany(() => Order, 'id')
  orders!: Order[]

  @HasOne(() => User, 'id')
  user!: User
  @Column({ type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
  id!: number

  @Column({ type: DataTypes.STRING, allowNull: false })
  name!: string

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  surname!: string

  @Column({
    type: DataTypes.CITEXT,
    unique: true,
    allowNull: false,
  })
  email!: string

  @Column({ type: DataTypes.VIRTUAL })
  get fullName(): string {
    return `${this.name} ${this.surname}`
  }
}
