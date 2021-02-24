const { DataTypes } = require('sequelize')
const { sequelize } = require('../db')
const { toTime, toDate, tsToLocale } = require('../../utils/datetimefunc')
const { DateTime } = require('luxon')
require('pg').types.setTypeParser(1114, (stringValue) => {
  return new Date(stringValue + '+0000')
  // e.g., UTC offset. Use any offset that you would like.
})

const Admin = sequelize.define(
  'admin',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
)

const City = sequelize.define(
  'city',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: false }
)

const Service = sequelize.define(
  'service',
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    time: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: false }
)

const Customer = sequelize.define(
  'customer',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.CITEXT,
      unique: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.name} ${this.surname}`
      },
      set(v) {
        throw new Error('Do not try to set the value!')
      },
    },
  },
  { timestamps: false }
)

const Master = sequelize.define(
  'master',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.name} ${this.surname}`
      },
      set(v) {
        throw new Error('Do not try to set')
      },
    },

    city: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue('ci')?.name
      },
    },
    rating: {
      type: DataTypes.VIRTUAL,
      get() {
        const orders = this.getDataValue('o')
        const sum = orders?.reduce(
          (acc, order) => {
            const rating = order?.dataValues.rating
            if (rating) {
              acc.count += 1
              acc.sum += rating
            }
            return acc
          },
          { count: 0, sum: 0 }
        )
        return Math.round(sum?.sum / sum?.count) || ''
      },
    },
    freeMasters: {
      type: DataTypes.VIRTUAL,
    },
  },
  { timestamps: false }
)

const Order = sequelize.define(
  'order',
  {
    rating: DataTypes.INTEGER,
    beginat: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    begin: {
      type: DataTypes.VIRTUAL,
      get() {
        const rawValue = this.getDataValue('beginat')
        return toTime(rawValue)
      },
    },
    finishat: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    finish: {
      type: DataTypes.VIRTUAL,
      get() {
        const rawValue = this.getDataValue('finishat')
        return toTime(rawValue)
      },
    },
    date: {
      type: DataTypes.VIRTUAL,
      get() {
        const rawValue = this.getDataValue('beginat')
        return toDate(rawValue)
      },
    },
    city: {
      type: DataTypes.VIRTUAL,
      get() {
        const rawValue = this.getDataValue('m')
        return rawValue?.dataValues.ci.dataValues.city
      },
    },
    master: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue('m')?.fullName
      },
    },
    customer: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue('c')?.fullName
      },
    },
    service: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue('s')?.dataValues.service
      },
    },
    service_time: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue('s')?.dataValues.service_time
      },
    },
  },
  {
    timestamps: false,
    scopes: {
      allIncl: {
        include: [
          {
            model: Master,
            as: 'm',
            attributes: ['id', 'name', 'surname', 'fullName'],
            include: {
              model: City,
              as: 'ci',
              attributes: [['name', 'city']],
            },
          },
          { model: Customer, as: 'c', attributes: ['id', 'name', 'surname', 'fullName'] },
          {
            model: Service,
            as: 's',
            attributes: ['id', ['name', 'service'], ['time', 'service_time']],
          },
        ],
      },
    },
  }
)

Master.hasMany(Order, {
  as: 'o',
  foreignKey: 'master_id',
  targetKey: 'id',
})

Customer.hasMany(Order, {
  targetKey: 'customer_id',
  foreignKey: 'id',
})
Service.hasMany(Order, {
  targetKey: 'service_id',
  foreignKey: 'id',
})

Order.belongsTo(Master, {
  as: 'm',
  foreignKey: 'master_id',
  onDelete: 'SET NULL',
  onUpdate: 'SET NULL',
})
Order.belongsTo(Customer, {
  as: 'c',
  foreignKey: 'customer_id',
  onDelete: 'SET NULL',
  onUpdate: 'SET NULL',
})
Order.belongsTo(Service, {
  as: 's',
  foreignKey: 'service_id',
  onDelete: 'SET NULL',
  onUpdate: 'SET NULL',
})

City.hasMany(Master, {
  targetKey: 'city_id',
  foreignKey: 'id',
})

Master.belongsTo(City, {
  as: 'ci',
  foreignKey: 'city_id',
  onDelete: 'SET NULL',
  onUpdate: 'SET NULL',
})

module.exports = { City, Service, Customer, Master, Order, Admin }
