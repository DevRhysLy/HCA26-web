module.exports = function (migration) {
  const martialClass = migration.editContentType("martialClass");

  martialClass.createField("order")
    .name("Order")
    .type("Integer")
    .required(false);

  const location = migration.editContentType("location");

  location.createField("order")
    .name("Order")
    .type("Integer")
    .required(false);
};
