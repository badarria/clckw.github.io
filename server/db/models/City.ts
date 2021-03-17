import { Column, HasMany, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { Master } from './Master'

@Table({ timestamps: false, tableName: 'cities' })
export class City extends Model {
  @HasMany(() => Master, 'city_id')
  masters!: Master[]

  @Column({ type: DataTypes.TEXT, allowNull: false, primaryKey: true, autoIncrement: true })
  id!: string

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string
}
