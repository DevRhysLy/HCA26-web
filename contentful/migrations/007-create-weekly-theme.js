module.exports = function (migration) {
  const weeklyTheme = migration
    .createContentType("weeklyTheme")
    .name("Weekly Theme")
    .description(
      "Training week theme spanning Monday through Saturday. Set weekStartDate to the Monday of that week.",
    );

  weeklyTheme
    .createField("title")
    .name("Title")
    .type("Symbol")
    .required(true);

  weeklyTheme.createField("description").name("Description").type("Text");

  weeklyTheme
    .createField("weekStartDate")
    .name("Week Start Date")
    .type("Date")
    .required(true);

  weeklyTheme.createField("location").name("Location").type("Symbol");

  weeklyTheme.displayField("title");
};
