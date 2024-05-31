const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const PriceCards = sequelize.define('pricecards', {
    index: {type: DataTypes.NUMBER},
    name: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    price: {type: DataTypes.STRING},
    option1: {type: DataTypes.STRING},
    option2: {type: DataTypes.STRING},
    option3: {type: DataTypes.STRING},
    option4: {type: DataTypes.STRING},
    option5: {type: DataTypes.STRING},
    option6: {type: DataTypes.STRING},
    moreInfo: {type: DataTypes.TEXT},
    backgroundBtn: {type: DataTypes.STRING},
    styleBack: {type: DataTypes.STRING},
    styleFront: {type: DataTypes.STRING},
    showDiscountCard: {type: DataTypes.BOOLEAN, defaultValue: false },
    image: {type: DataTypes.STRING},
})

const UsersStats = sequelize.define('userstats', {
    index: {type: DataTypes.NUMBER, unique: true},
    ipAdress: {type: DataTypes.STRING},
    device: {type: DataTypes.STRING},
    firstVisit: {type: DataTypes.STRING},
    lastVisit: {type: DataTypes.STRING},
    visitsCount: {type: DataTypes.INTEGER},
    navigator_userAgent: {type: DataTypes.STRING},
    screenSize: {type: DataTypes.STRING},
    navigator_platform: {type: DataTypes.STRING},
    userLocation: {type: DataTypes.STRING},
    visitDuration: {type: DataTypes.STRING},
    pagesVievs:  {type: DataTypes.STRING},
})

const Busket = sequelize.define('userstats', {
    index: {type: DataTypes.NUMBER, unique: true},
    createdAt: {type: DataTypes.STRING},
    updatedAt: {type: DataTypes.STRING},
})

const Pages = sequelize.define('pages', {
    index: {type: DataTypes.NUMBER, unique: true},
    createdAt: {type: DataTypes.STRING},
    updatedAt: {type: DataTypes.STRING},
    percentOfPageViev: {type: DataTypes.STRING},
})

const Articles = sequelize.define('articles', {
    index: {type: DataTypes.NUMBER, unique: true},
    articleName: {type: DataTypes.STRING},
    createdAt: {type: DataTypes.STRING},
    updatedAt: {type: DataTypes.STRING},
    vievs: {type: DataTypes.STRING},
    clicks: {type: DataTypes.STRING},
})

const Cards = sequelize.define('cards', {
    index: {type: DataTypes.NUMBER, unique: true},
    articleName: {type: DataTypes.STRING},
    createdAt: {type: DataTypes.STRING},
    updatedAt: {type: DataTypes.STRING},
    clicks: {type: DataTypes.STRING},
})

const Settings = sequelize.define('settings', {
    index: {type: DataTypes.NUMBER, unique: true},
    currency: {type: DataTypes.STRING},
    coeficient: {type: DataTypes.STRING},
})

const Buttons = sequelize.define('buttons', {
    index: {type: DataTypes.NUMBER},
    buttonName: {type: DataTypes.STRING},
    clicks: {type: DataTypes.STRING},
})

const EditableElements = sequelize.define('editableelements', {
    editableElementName: {type: DataTypes.STRING},
    editable: {type: DataTypes.BOOLEAN}
})

const GlobalEdits = sequelize.define('globalEdits', {
    markUp: {type: DataTypes.BOOLEAN},
    sales: {type: DataTypes.BOOLEAN},
    salesBanner: {type: DataTypes.BOOLEAN},
})

const PhotoGallery = sequelize.define('photoGallery', {
    index: {type: DataTypes.NUMBER},
    name: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    optionDescription: {type: DataTypes.STRING}
});

const Photo = sequelize.define('photo', {
    filename: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    imageUrl: {type: DataTypes.STRING}
});

PhotoGallery.hasMany(Photo)
Photo.belongsTo(PhotoGallery)

const MarkUp = sequelize.define('markUp', {
    index: {type: DataTypes.NUMBER},
    position: {type: DataTypes.BOOLEAN},
    percent: {type: DataTypes.NUMBER},
})

const Discount = sequelize.define('discount', {
    index: {type: DataTypes.NUMBER},
    position: {type: DataTypes.BOOLEAN},
    percent: {type: DataTypes.NUMBER},
})

const DiscountCard = sequelize.define('discountcard', {
    index: {type: DataTypes.NUMBER},
    position: {type: DataTypes.BOOLEAN},
})

const Calendar = sequelize.define('calendar', {
    index: {type: DataTypes.NUMBER},
    date: {type: DataTypes.STRING},
    isOffered: {type: DataTypes.BOOLEAN},
    isAvailable: {type: DataTypes.BOOLEAN},
    identificator: {type: DataTypes.NUMBER},
    time: {type: DataTypes.STRING},
    description: {type: DataTypes.TEXT},
})

const User = sequelize.define('user', {
    identificator: {type: DataTypes.NUMBER},
    name: { type: DataTypes.STRING },
    company: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    instagramm: { type: DataTypes.STRING },
    telegramm: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "customer" },
    token: { type: DataTypes.STRING},
    avatar: { type: DataTypes.STRING },
});

User.hasMany(Calendar)
Calendar.belongsTo(User)

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
    PriceCards,
    UsersStats,
    Pages,
    Articles,
    Cards,
    Settings,
    Buttons,
    Busket,
    EditableElements,
    GlobalEdits,
    PhotoGallery,
    Photo,
    User,
    ClientBase,
    Offers,
    Visits,
    MarkUp,
    Discount,
    DiscountCard,
    Calendar
};