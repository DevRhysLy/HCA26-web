module.exports = function (migration) {
  const martialClass = migration.editContentType("martialClass");

  martialClass
    .createField("timetableVariant")
    .name("Timetable Variant")
    .type("Symbol")
    .required(false)
    .validations([
      {
        in: ["kids", "youth", "adults", "advanced", "generic"],
      },
    ]);

  martialClass.changeFieldControl(
    "timetableVariant",
    "builtin",
    "dropdown",
    {
      helpText:
        "Optional card colour on the schedule. Leave blank to infer from age range and title.",
    },
  );
};
