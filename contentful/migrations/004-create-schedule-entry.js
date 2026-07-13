module.exports = function (migration) {
  const scheduleEntry = migration
    .createContentType("scheduleEntry")
    .name("Schedule Entry")
    .description("A scheduled class session at a location, linked to one or more martial arts programs.");

  scheduleEntry
    .createField("internalName")
    .name("Internal Name")
    .type("Symbol")
    .required(true);

  scheduleEntry
    .createField("location")
    .name("Location")
    .type("Link")
    .linkType("Entry")
    .validations([{ linkContentType: ["location"] }])
    .required(true);

  scheduleEntry
    .createField("day")
    .name("Day")
    .type("Symbol")
    .required(true)
    .validations([
      {
        in: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
      },
    ]);

  scheduleEntry
    .createField("timeSlot")
    .name("Time Slot")
    .type("Symbol")
    .required(true);

  scheduleEntry
    .createField("durationMinutes")
    .name("Duration Minutes")
    .type("Integer")
    .required(false);

  scheduleEntry
    .createField("classes")
    .name("Classes")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["martialClass"] }],
    })
    .required(true);

  scheduleEntry
    .createField("instructor")
    .name("Instructor")
    .type("Link")
    .linkType("Entry")
    .validations([{ linkContentType: ["instructor"] }])
    .required(false);

  scheduleEntry
    .createField("order")
    .name("Order")
    .type("Integer")
    .required(false);

  scheduleEntry.changeFieldControl("internalName", "builtin", "singleLine", {
    helpText: "CMS label only, e.g. Croydon Mon 7pm Mixed",
  });

  scheduleEntry.changeFieldControl("classes", "builtin", "entryLinksEditor", {
    helpText: "Link one program or multiple for mixed sessions (e.g. youth + adults).",
    bulkEditing: false,
  });

  scheduleEntry.displayField("internalName");
};
