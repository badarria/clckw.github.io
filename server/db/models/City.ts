import { Column, HasMany, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { Master } from './Master'

@Table({ timestamps: false, tableName: 'cities' })
export class City extends Model {
  @HasMany(() => Master, { foreignKey: 'city_id', onDelete: 'set null', onUpdate: 'set null' })
  masters!: Master[]

  @Column({ type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true })
  id!: string

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string
}
