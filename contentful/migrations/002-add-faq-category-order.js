module.exports = function (migration) {
  const faq = migration.editContentType("faq");

  faq.createField("category")
    .name("Category")
    .type("Symbol")
    .required(false);

  faq.createField("order")
    .name("Order")
    .type("Integer")
    .required(false);
};
