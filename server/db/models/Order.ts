import { BelongsTo, Column, Model, Scopes, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { Customer, City, Master, Service } from '.'
import { toDate, toTime } from '../../utils/datetimefunc'

@Scopes(() => ({
  allIncl: {
    include: [
      {
        model: Master,
        attributes: ['id', 'name', 'surname', 'fullName'],
        include: [{ model: City, as: 'ci', attributes: [['name', 'city']] }],
      },
      { model: Customer, attributes: ['id', 'name', 'surname', 'fullName'] },
      { model: Service, attributes: ['id', ['name', 'service'], ['time', 'service_time']] },
    ],
  },
}))
@Table({ tableName: 'orders', timestamps: false })
export class Order extends Model {
  @Column({ type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
  id?: number
  @Column
  rating!: number
  @Column({ type: DataTypes.DATE, allowNull: false })
  beginat!: Date
  @Column({ type: DataTypes.VIRTUAL })
  get begin(): string {
    const rawValue = this.getDataValue('beginat')
    return toTime(rawValue)
  }
  @Column({ type: DataTypes.DATE, allowNull: false })
  finishat!: Date
  @Column({ type: DataTypes.VIRTUAL })
  get finish(): string {
    const rawValue = this.getDataValue('finishat')
    return toTime(rawValue)
  }

  @BelongsTo(() => Master, { onDelete: 'SET NULL', onUpdate: 'SET NULL', foreignKey: 'master_id' })
  m!: Master[]
  @Column
  master_id!: number

  @BelongsTo(() => Customer, { onDelete: 'SET NULL', onUpdate: 'SET NULL', foreignKey: 'customer_id' })
  c!: Customer[]
  @Column
  customer_id!: number

  @BelongsTo(() => Service, { onDelete: 'SET NULL', onUpdate: 'SET NULL', foreignKey: 'service_id' })
  s!: Service[]
  @Column
  service_id!: number

  @Column({ type: DataTypes.VIRTUAL })
  get date(): string {
    const rawValue = this.getDataValue('beginat')
    return toDate(rawValue)
  }
  @Column({ type: DataTypes.VIRTUAL })
  get city(): string {
    const rawValue = this.getDataValue('m')
    return rawValue?.dataValues.ci.dataValues.city
  }
  @Column({ type: DataTypes.VIRTUAL })
  get master(): string {
    return this.getDataValue('m')?.fullName
  }
  @Column({ type: DataTypes.VIRTUAL })
  get customer(): string {
    return this.getDataValue('c')?.fullName
  }
  @Column({ type: DataTypes.VIRTUAL })
  get service(): string {
    return this.getDataValue('s')?.dataValues.service
  }
  @Column({ type: DataTypes.VIRTUAL })
  get service_time(): string {
    return this.getDataValue('s')?.dataValues.service_time
  }
}
