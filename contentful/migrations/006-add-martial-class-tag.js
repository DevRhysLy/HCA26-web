module.exports = function (migration) {
  const martialClass = migration.editContentType("martialClass");

  martialClass
    .createField("tag")
    .name("Tag")
    .type("Symbol")
    .required(false);

  martialClass.changeFieldControl("tag", "builtin", "singleLine", {
    helpText:
      "Short timetable label shown on schedule cards, e.g. KIDS (Beg) or YOUTH & ADULTS. Age range is shown on hover only.",
  });
};
