import { BelongsTo, Column, HasMany, Model, Table, HasOne } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

import { User, Order, City } from '.'

@Table({ tableName: 'masters', timestamps: false })
export class Master extends Model {
  @HasMany(() => Order, { foreignKey: 'master_id' })
  o!: Order[]

  @HasOne(() => User, 'id')
  user!: User
  @Column({ type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
  id!: number

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  name!: string

  @Column({ type: DataTypes.STRING, allowNull: false })
  surname!: string

  @BelongsTo(() => City, 'city_id')
  ci!: City[]

  @Column({ type: DataTypes.INTEGER })
  city_id!: number

  @Column({ type: DataTypes.VIRTUAL })
  get fullName(): string {
    return `${this.name} ${this.surname}`
  }

  @Column({ type: DataTypes.VIRTUAL })
  get city(): string {
    return this.getDataValue('ci')?.name
  }

  @Column({ type: DataTypes.VIRTUAL })
  get rating(): number {
    const orders = this.getDataValue('o')
    const sum = orders?.reduce(
      (acc: { sum: number; count: number }, order: any) => {
        const rating = order?.dataValues.rating
        if (rating) {
          acc.count += 1
          acc.sum += rating
        }
        return acc
      },
      { count: 0, sum: 0 }
    )
    return Math.round(sum?.sum / sum?.count) || 0
  }
}
