// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: null
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
})


/* NEED HELP CHECKING THESE WORK CORRECT, DO THEY NEED FOREIGN KEYS ASWELL?*/

// Products belongToMany Tags (through ProductTag)
Product.belongsTo(Tag, { through: 'ProductTag' });
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(ProductTag, { through: 'ProductTag' });
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
