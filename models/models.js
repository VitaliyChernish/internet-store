const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    nickName: { type: DataTypes.STRING, unique: true },
    company: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING },
    instagramm: { type: DataTypes.STRING },
    telegramm: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "HR" },
    token: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING },
});

const ClientBase = sequelize.define('clientBase', {
    buttonPlace: { type: DataTypes.STRING },
    offerLink: { type: DataTypes.STRING },
    clientName: { type: DataTypes.STRING },
    clientPhone: { type: DataTypes.INTEGER },
    clientEmail: { type: DataTypes.STRING },
    clientTelegram: { type: DataTypes.STRING },
    clientOffer: { type: DataTypes.TEXT },
    offerConfirmation: { type: DataTypes.STRING },
    offerDetails: { type: DataTypes.TEXT },
    offerComments: {type: DataTypes.TEXT},
    date: { type: DataTypes.STRING }
})

const Offers = sequelize.define('offers', {
    name: { type: DataTypes.STRING },
    buyingPrice: { type: DataTypes.INTEGER },
    oldPrice: { type: DataTypes.INTEGER },
    newPrice: { type: DataTypes.INTEGER },
    setDiscontPrice: { type: DataTypes.INTEGER },
    setDiscontPersent: { type: DataTypes.INTEGER },
    discontSum: { type: DataTypes.INTEGER },
    link: { type: DataTypes.STRING },
    setTimer: { type: DataTypes.INTEGER },
    forBought: { type: DataTypes.INTEGER },
    forPromotions: { type: DataTypes.INTEGER },
    forDeliveryReturned: { type: DataTypes.INTEGER },
    others: { type: DataTypes.INTEGER },
    success: { type: DataTypes.INTEGER },
    image: {type: DataTypes.STRING},
    description: {type: DataTypes.TEXT}
});

const Visits = sequelize.define('visit', {
    ip: { type: DataTypes.STRING },
    userAgent: { type: DataTypes.STRING }
});

module.exports = {
    User,
    ClientBase,
    Offers,
    Visits,
};